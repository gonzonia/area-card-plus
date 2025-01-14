import { LitElement, TemplateResult, html, css, CSSResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { HomeAssistant } from 'custom-card-helpers';

import { Settings, } from './helpers';

import { CardConfig } from './editor'

import memoizeOne from "memoize-one";


@customElement('item-editor')
export class ItemEditor extends LitElement {
  @property({ attribute: false }) config?: Settings;
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Boolean }) useSensorSchema: boolean = false;
  @state() private _config?: CardConfig;

  private _schema = memoizeOne(() => [
    { name: "color", selector: { ui_color: { default_color: "state", include_state: true } } },
    { name: "icon", selector: { icon: {} } },
  ]);

  private _schemasensor = memoizeOne(() => [
    { name: "color", selector: { ui_color: { default_color: "state", include_state: true } } },
  ]);

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    const schema = this.useSensorSchema ? this._schemasensor() : this._schema();

    const data = {
      ...this._config,
    };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>
    `;
  }

  private _valueChangedSchema(event: CustomEvent): void {
    if (!this.config) {
      return;
    }

    const updatedConfig = {
      ...this.config,
      ...event.detail.value,
    };

    this._config = updatedConfig;

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: updatedConfig,
      })
    );
  }

  static get styles(): CSSResult {
    return css`
      .checkbox {
        display: flex;
        align-items: center;
        padding: 8px 0;
      }
      .checkbox input {
        height: 20px;
        width: 20px;
        margin-left: 0;
        margin-right: 8px;
      }
      h3 {
        margin-bottom: 0.5em;
      }
      .row {
        margin-bottom: 12px;
        margin-top: 12px;
        display: block;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 4px;
      }
    `;
  }
}
