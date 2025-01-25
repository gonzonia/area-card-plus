import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { computeDomain, HomeAssistant, LovelaceCardEditor, LovelaceCardConfig } from "custom-card-helpers";
import memoizeOne from "memoize-one";
import { caseInsensitiveStringCompare, getSensorNumericDeviceClasses, HassCustomElement, SubElementConfig, Settings, fireEvent } from "./helpers";
import { DEVICE_CLASSES, TOGGLE_DOMAINS, CLIMATE_DOMAINS, domainOrder } from "./card";
import { mdiPalette, mdiAlert, mdiChartBoxMultiple, mdiCube, mdiViewDashboardVariant } from "@mdi/js";
import './items-editor';
import './item-editor';

export interface CardConfig extends LovelaceCardConfig {
  area: string;
  navigation_path?: string;
}

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

interface Schema {
  name: string;
  selector?: any;
  required?: boolean;

  default?: any;
  type?: string;
}

interface SubElementEditor {
  index?: number;
}

@customElement("custom-area-card-editor")
export class CustomAreaCardEditor extends LitElement implements LovelaceCardEditor {

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: CardConfig;
  @state() private _numericDeviceClasses?: string[];
  @state() private _subElementEditorDomain: SubElementConfig | undefined = undefined;
  @state() private _subElementEditorAlert: SubElementConfig | undefined = undefined;
  @state() private _subElementEditorSensor: SubElementConfig | undefined = undefined;


  private _schema = memoizeOne(() => [
    { name: "area", selector: { area: {} } },
    {
      name: "",
      type: "grid",
      schema: [
        {
          name: "navigation_path",
          required: false,
          selector: { navigation: {} },
        },
        { name: "theme", required: false, selector: { theme: {} } },
      ],
    },
    {
      name: "appearance",
      flatten: true,
      type: "expandable",
      icon: "mdi:palette",
      schema: [
        { name: "area_icon", selector: { icon: {} } },
        { name: "area_icon_color", selector: { ui_color: { default_color: "state", include_state: true } } },
        { name: "area_name", selector: { text: {} } },
        { name: "area_name_color", selector: { ui_color: { default_color: "state", include_state: true } } },
      ]
    },
  ]);

  private _binaryschema = memoizeOne((binaryClasses: SelectOption[]) => [
    {
      name: "alert_classes",
      selector: {
        select: {
          reorder: true,
          multiple: true,
          custom_value: true,
          options: binaryClasses,
        },
      },
    },
    { name: "alert_color", selector: { ui_color: { default_color: "state", include_state: true } } },
  ]);

  private _sensorschema = memoizeOne((sensorClasses: SelectOption[]) => [
    {
      name: "sensor_classes",
      selector: {
        select: {
          reorder: true,
          multiple: true,
          custom_value: true,
          options: sensorClasses,
        },
      },
    },
    { name: "sensor_color", selector: { ui_color: { default_color: "state", include_state: true } } },
  ]);

  private _toggleschema = memoizeOne((toggleDomains: SelectOption[]) => [
    {
      name: "toggle_domains",
      selector: {
        select: {
          reorder: true,
          multiple: true,
          custom_value: true,
          options: toggleDomains,
        },
      },
    },
    { name: "domain_color", selector: { ui_color: { default_color: "state", include_state: true } } },
    { name: "show_active", selector: { boolean: {} } },
  ]);

  private _popupschema = memoizeOne((allDomains: SelectOption[]) => [
    { name: "columns", selector: { number: { min: 1, max: 4, mode: "box"} } },
    {
      name: "popup_domains",
      selector: {
        select: {
          reorder: true,
          multiple: true,
          custom_value: true,
          options: allDomains,
        },
      },
    },
    { name: "hidden_entities", selector: { entity: { multiple: true	 } } },
    { name: "extra_entities", selector: { entity: { multiple: true	 } } },
    { name: "hide_unavailable", selector: { boolean: { } } },
  ]);

  protected async firstUpdated(): Promise<void> {
    if (!customElements.get('ha-form') || !customElements.get('hui-action-editor')) {
      (customElements.get('hui-button-card') as HassCustomElement)?.getConfigElement();
    }

    if (!customElements.get('ha-entity-picker')) {
      (customElements.get('hui-entities-card') as HassCustomElement)?.getConfigElement();
    }
  }

  private _binaryClassesForArea = memoizeOne((area: string): string[] =>
    this._classesForArea(area, "binary_sensor")
  );

  private _sensorClassesForArea = memoizeOne(
    (area: string, numericDeviceClasses?: string[]): string[] =>
      this._classesForArea(area, "sensor", numericDeviceClasses)
  );

  private _toggleDomainsForArea = memoizeOne((area: string): string[] =>
    this._classesForArea(area, "toggle")
  );

  private _allDomainsForArea = memoizeOne((area: string): string[] =>
    this._classesForArea(area, "all")
  );
  

  private _classesForArea(
    area: string,
    domain: "sensor" | "binary_sensor" | "toggle" | "all",
    numericDeviceClasses?: string[] | undefined
  ): string[] {
    let entities;
  
    if (domain === "toggle") {
      // Filter für TOGGLE_DOMAINS
      entities = Object.values(this.hass!.entities).filter(
        (e) =>
          (TOGGLE_DOMAINS.includes(computeDomain(e.entity_id)) || CLIMATE_DOMAINS.includes(computeDomain(e.entity_id))) &&
          !e.hidden &&
          (e.area_id === area ||
            (e.device_id && this.hass!.devices[e.device_id]?.area_id === area))
      );
      
  
      return [...new Set(entities.map((e) => computeDomain(e.entity_id)))];
  
    } else if (domain === "all") {
      // Alle Domains in der Area ohne Filter
      const extraEntities = this._config?.extra_entities || [];
    
      // Filtere die Entitäten basierend auf der Area
      let entities = Object.values(this.hass!.entities).filter(
        (e) =>
          !e.hidden &&
          (e.area_id === area ||
            (e.device_id && this.hass!.devices[e.device_id]?.area_id === area))
      );
    
      // Füge die extra_entities hinzu
      const extraEntityObjects = extraEntities
        .map((entityId: string) => this.hass!.states[entityId])
        .filter((stateObj: string) => stateObj !== undefined); // Filtere ungültige States
    
      entities = [...entities, ...extraEntityObjects];
    
      // Gib die einzigartigen Domains der Entitäten zurück
      return [...new Set(entities.map((e) => computeDomain(e.entity_id)))];
    
  
    } else {
      // Standard-Filter für spezifische Domains
      entities = Object.values(this.hass!.entities).filter(
        (e) =>
          computeDomain(e.entity_id) === domain &&
          !e.entity_category &&
          !e.hidden &&
          (e.area_id === area ||
            (e.device_id && this.hass!.devices[e.device_id]?.area_id === area))
      );
  
      const classes = entities
        .map((e) => this.hass!.states[e.entity_id]?.attributes.device_class || "")
        .filter(
          (c) =>
            c &&
            (domain !== "sensor" ||
              !numericDeviceClasses ||
              numericDeviceClasses.includes(c))
        );
  
      return [...new Set(classes)];
    }
  }
  

  private _buildBinaryOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("binary_sensor", possibleClasses, currentClasses)
  );

  private _buildSensorOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("sensor", possibleClasses, currentClasses)
  );

  private _buildToggleOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("toggle", possibleClasses, currentClasses)
  );

  private _buildAllOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("all", possibleClasses, currentClasses)
  );
  

  private _buildOptions(
    type: "sensor" | "binary_sensor" | "toggle" | "all",
    possibleClasses: string[],
    currentClasses: string[]
  ): SelectOption[] {
    // Alle möglichen Klassen sammeln
    const allClasses = [...new Set([...possibleClasses, ...currentClasses])];
  
    const options = allClasses.map((domain) => ({
      value: domain,
      label:
        domain === "scene"
          ? "Scene" // Spezifischer Wert für die Domain "scene"
          : type === "toggle" || type === "all"
          ? this.hass!.localize(`component.${domain}.entity_component._.name`) || domain
          : this.hass!.localize(`component.${type}.entity_component.${domain}.name`) || domain,
    }));
  
    // Optionen alphabetisch sortieren
    options.sort((a, b) =>
      caseInsensitiveStringCompare(a.label, b.label, this.hass!.locale.language)
    );
  
    return options;
  }
  


  setConfig(config: CardConfig): void {
    this._config = {
      ...config,
      columns: config.columns || 4,
      customization_domain: config.customization_domain || [],
      customization_alert: config.customization_alert || [],
      customization_sensor: config.customization_sensor || []
    };
  }

  protected async updated(changedProperties: Map<string | number | symbol, unknown>): Promise<void> {
    super.updated(changedProperties);
  
    if (!this.hass || !this._config) {
      return;
    }
  
    if (changedProperties.has("_config")) {
      const previousConfig = changedProperties.get("_config") as CardConfig | undefined;
      const previousArea = previousConfig?.area;
      const currentArea = this._config.area;
  
      const previousExtraEntities = previousConfig?.extra_entities;
      const currentExtraEntities = this._config.extra_entities;
  
      // Überprüfen, ob sich extra_entities geändert haben
      const extraEntitiesChanged =
        previousExtraEntities.length !== currentExtraEntities.length ||
        !previousExtraEntities.every((entity: string) => currentExtraEntities.includes(entity));
  
      if (previousArea !== currentArea  ) {
        // Neu berechnen von Domains bei Änderungen an area oder extra_entities
        const possibleToggleDomains = this._toggleDomainsForArea(currentArea);
  
        const possibleDomains = this._allDomainsForArea(currentArea);
  

  
        const sortedToggleDomains = possibleToggleDomains.sort(
          (a, b) => TOGGLE_DOMAINS.indexOf(a) - TOGGLE_DOMAINS.indexOf(b)
        );
  
        const sortedDomains = possibleDomains.sort(
          (a, b) => domainOrder.indexOf(a) - domainOrder.indexOf(b)
        );
  
        this._config.toggle_domains = [...sortedToggleDomains];
        this._config.popup_domains = [...sortedDomains];
  
        this.requestUpdate();
      }

     if (extraEntitiesChanged) {
        // Hinzufügen von Domains aus extra_entities
        for (const entity of currentExtraEntities) {
          const domain = computeDomain(entity);
          if (!this._config.popup_domains.includes(domain)) {
            this._config.popup_domains.push(domain);
          }
          this.requestUpdate();
        }

      } 
    }
  
    if (!this._numericDeviceClasses) {
      const { numeric_device_classes: sensorNumericDeviceClasses } =
        await getSensorNumericDeviceClasses(this.hass);
      this._numericDeviceClasses = sensorNumericDeviceClasses;
    }
  }
  
  private _valueChanged(event: CustomEvent) {
    this._config = event.detail.value;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
      })
    );
  }


  private _computeLabelCallback = (schema: Schema): string => {
    switch (schema.name) {
      case "theme":
        return `${this.hass!.localize(
          "ui.panel.lovelace.editor.card.generic.theme"
        )} (${this.hass!.localize(
          "ui.panel.lovelace.editor.card.config.optional"
        )})`;
      case "area":
        return this.hass!.localize("ui.panel.lovelace.editor.card.area.name");
      case "navigation_path":
        return this.hass!.localize(
          "ui.panel.lovelace.editor.action-editor.navigation_path"
        );
      case "area_name":
        return this.hass!.localize("ui.panel.lovelace.editor.card.area.name")  + " " + this.hass!.localize(`ui.panel.lovelace.editor.card.generic.name`);
      case "area_icon":
        return this.hass!.localize("ui.panel.lovelace.editor.card.area.name")  + " " + this.hass!.localize(`ui.panel.lovelace.editor.card.generic.icon`);
      case "area_name_color":
        return this.hass!.localize("ui.panel.lovelace.editor.card.area.name")  + " " + this.hass!.localize(`ui.panel.lovelace.editor.card.generic.name`) + " " + this.hass!.localize(`ui.panel.lovelace.editor.card.tile.color`);
      case "area_icon_color":
        return this.hass!.localize("ui.panel.lovelace.editor.card.area.name")  + " " + this.hass!.localize(`ui.panel.lovelace.editor.card.generic.icon`)+ " " +  this.hass!.localize(`ui.panel.lovelace.editor.card.tile.color`);      
      case "alert_color":
      case "sensor_color":
      case "domain_color":    
        return this.hass!.localize(`ui.panel.lovelace.editor.card.tile.color`);  
      case "columns":
        return this.hass!.localize(`ui.components.grid-size-picker.columns`);  
      case "appearance":
        return this.hass!.localize(`ui.panel.lovelace.editor.card.tile.appearance`);
      case "toggle_domains":
        return this.hass!.localize(`ui.panel.lovelace.editor.cardpicker.domain`);
        case "popup":
          return "Popup";        
      case "popup_domains":
        return "Popup" + " " + this.hass!.localize(`ui.panel.lovelace.editor.cardpicker.domain`);
      case "extra_entities":
        return this.hass!.localize(`ui.common.add`) + " " + this.hass!.localize(`ui.panel.lovelace.editor.card.generic.entities`) + ":"; 
      case "hidden_entities":
        return this.hass!.localize(`ui.common.hide`) + " " + this.hass!.localize(`ui.panel.lovelace.editor.card.generic.entities`) + ":";  
      case "hide_unavailable":
        return this.hass!.localize(`ui.common.hide`)  + " " + this.hass!.localize(`state.default.unavailable`) ; 
      case "show_active":
        return this.hass!.localize(`ui.common.hide`) + " " + this.hass!.localize(`ui.components.entity.entity-state-picker.state`) + " " + this.hass!.localize(`component.binary_sensor.entity_component._.state.off`);
      default:
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.area.${schema.name}`
        );
    }
  };


  private _editItem(
    ev: CustomEvent<number>,
    editorKey: 'Domain' | 'Alert' | 'Sensor'
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    const index = ev.detail;

    this[`_subElementEditor${editorKey}`] = { index };
  }

  private _edit_itemDomain(ev: CustomEvent<number>): void {
    this._editItem(ev, 'Domain');
  }

  private _edit_itemAlert(ev: CustomEvent<number>): void {
    this._editItem(ev, 'Alert');
  }

  private _edit_itemSensor(ev: CustomEvent<number>): void {
    this._editItem(ev, 'Sensor');
  }


  private _customizationChanged(
    ev: CustomEvent<Settings[]>,
    customizationKey: 'domain' | 'alert' | 'sensor'
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    fireEvent(this, 'config-changed', {
      config: {
        ...this._config,
        [`customization_${customizationKey}`]: ev.detail,
      } as CardConfig,
    });
  }

  private _customizationChangedDomain(ev: CustomEvent<Settings[]>): void {
    this._customizationChanged(ev, 'domain');
  }

  private _customizationChangedAlert(ev: CustomEvent<Settings[]>): void {
    this._customizationChanged(ev, 'alert');
  }

  private _customizationChangedSensor(ev: CustomEvent<Settings[]>): void {
    this._customizationChanged(ev, 'sensor');
  }


  private _renderSubElementEditor(
    editorKey: 'domain' | 'alert' | 'sensor',
    goBackHandler: () => void,
    itemChangedHandler: (ev: CustomEvent<Settings>) => void
  ) {
    const editorName = `_subElementEditor${editorKey.charAt(0).toUpperCase() + editorKey.slice(1)}` as keyof this;
    const editor = this[editorName] as SubElementEditor | undefined;
  
    return html`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${goBackHandler}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </mwc-icon-button>
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .config=${this._config?.[`customization_${editorKey}`]?.[editor?.index ?? 0] ?? {}}
        .getSchema=${editorKey} 
        @config-changed=${itemChangedHandler}
      >
      </item-editor>
    `;
  }
  

  private _renderSubElementEditorDomain() {
    return this._renderSubElementEditor('domain', this._goBackDomain, this._itemChangedDomain);
  }

  private _renderSubElementEditorAlert() {
    return this._renderSubElementEditor('alert', this._goBackAlert, this._itemChangedAlert);
  }

  private _renderSubElementEditorSensor() {
    return this._renderSubElementEditor(
      'sensor',
      this._goBackSensor,
      this._itemChangedSensor
    );
  }

  private _goBackDomain(): void {
    this._subElementEditorDomain = undefined;
  }

  private _goBackAlert(): void {
    this._subElementEditorAlert = undefined;
  }

  private _goBackSensor(): void {
    this._subElementEditorSensor = undefined;
  }


  private _itemChanged(
    ev: CustomEvent<Settings>,
    editorTarget: { index?: number } | undefined,
    customizationKey: 'customization_domain' | 'customization_alert' | 'customization_sensor'
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    const index = editorTarget?.index;
    if (index != undefined) {
      const customization = [...this._config[customizationKey]];
      customization[index] = ev.detail;
      fireEvent(this, 'config-changed', { config: { ...this._config, [customizationKey]: customization } });
    }
  }

  private _itemChangedDomain(ev: CustomEvent<Settings>): void {
    this._itemChanged(ev, this._subElementEditorDomain, 'customization_domain');
  }

  private _itemChangedAlert(ev: CustomEvent<Settings>): void {
    this._itemChanged(ev, this._subElementEditorAlert, 'customization_alert');
  }

  private _itemChangedSensor(ev: CustomEvent<Settings>): void {
    this._itemChanged(ev, this._subElementEditorSensor, 'customization_sensor');
  }


  public get toggleSelectOptions(): SelectOption[] {
    return this._buildToggleOptions(
      this._toggleDomainsForArea(this._config!.area || ""),
      this._config?.toggle_domains || this._toggleDomainsForArea(this._config!.area || "")
    );
  }

  public get AllSelectOptions(): SelectOption[] {
    return this._buildAllOptions(
      this._allDomainsForArea(this._config!.area || ""),
      this._config?.popup_domains || this._allDomainsForArea(this._config!.area || "")
    );
  }

  public get binarySelectOptions(): SelectOption[] {
    return this._buildBinaryOptions(
      this._binaryClassesForArea(this._config!.area || ""),
      this._config?.alert_classes || this._binaryClassesForArea(this._config!.area || "")
    );
  }

  public get sensorSelectOptions(): SelectOption[] {
    return this._buildSensorOptions(
      this._sensorClassesForArea(this._config!.area || ""),
      this._config?.sensor_classes || this._sensorClassesForArea(this._config!.area || "")
    );
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    const possibleToggleDomains = this._toggleDomainsForArea(
      this._config.area || ""
    );

    const possibleDomains = this._allDomainsForArea(
      this._config.area || ""
    );    

    const schema = this._schema();

    const binaryschema = this._binaryschema(
      this.binarySelectOptions
    );

    const sensorschema = this._sensorschema(
      this.sensorSelectOptions
    );

    const toggleschema = this._toggleschema(
      this.toggleSelectOptions
    );

    const popupschema = this._popupschema(
      this.AllSelectOptions
    );

    const data = {
      alert_classes: DEVICE_CLASSES.binary_sensor,
      sensor_classes: DEVICE_CLASSES.sensor,
      toggle_domains: possibleToggleDomains,
      popup_domains: possibleDomains,
      ...this._config,
    };

    if (this._subElementEditorDomain) return this._renderSubElementEditorDomain();
    if (this._subElementEditorAlert) return this._renderSubElementEditorAlert();
    if (this._subElementEditorSensor) return this._renderSubElementEditorSensor();

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${mdiAlert}></ha-svg-icon>
          ${this._computeLabelCallback({ name: "alert_classes" })}
        </div>
        <div class="content">
          <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${binaryschema}
          .computeLabel=${this._computeLabelCallback}
          @value-changed=${this._valueChanged}
          ></ha-form>
          <alert-items-editor
            .hass=${this.hass}
            .customization_alert=${this._config.customization_alert}
            .SelectOptions=${this.binarySelectOptions}
            @edit-item=${this._edit_itemAlert}
            @config-changed=${this._customizationChangedAlert}>
          </alert-items-editor>          
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${mdiChartBoxMultiple}></ha-svg-icon>
          ${this._computeLabelCallback({ name: "sensor_classes" })}
        </div>
        <div class="content">
          <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${sensorschema}
          .computeLabel=${this._computeLabelCallback}
          @value-changed=${this._valueChanged}
          ></ha-form>
          <sensor-items-editor
            .hass=${this.hass}
            .customization_sensor=${this._config.customization_sensor}
            .SelectOptions=${this.sensorSelectOptions}
            @edit-item=${this._edit_itemSensor}
            @config-changed=${this._customizationChangedSensor}>
          </sensor-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main" .name="toggle_domains">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${mdiCube}></ha-svg-icon>
            ${this._computeLabelCallback({ name: "toggle_domains" })}
        </div>
        <div class="content">
          <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${toggleschema}
          .computeLabel=${this._computeLabelCallback}
          @value-changed=${this._valueChanged}
          ></ha-form>
          <domain-items-editor
            .hass=${this.hass}
            .customization_domain=${this._config.customization_domain}
            .SelectOptions=${this.toggleSelectOptions}
            @edit-item=${this._edit_itemDomain}
            @config-changed=${this._customizationChangedDomain}>
          </domain-items-editor>
        </div>
      </ha-expansion-panel>      
   
      <ha-expansion-panel outlined class="main" .name="popup">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${mdiViewDashboardVariant}></ha-svg-icon>
            ${this._computeLabelCallback({ name: "popup" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${data}
            .schema=${popupschema}
            .computeLabel=${this._computeLabelCallback}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>
      </ha-expansion-panel>     
    `;
  }

  static styles = css`
  :host {
    display: block;
  }
  select {
    padding: 5px;
    font-size: 14px;
  } 
  ha-svg-icon {
    color: var(--secondary-text-color);
  }
  .main {
    --ha-card-border-radius: 6px;
    border-radius: 6px;
    margin-top: 24px;
  }   
  ha-svg-icon {
    color: var(--secondary-text-color);
  }
  .content { 
    padding: 12px 4px;
  }  
`;

}

