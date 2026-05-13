import { handleAction, hasAction } from "./ha";
import { actionHandler } from "./ha";

// CUSTOM BUTTON INTEGRATION: Add custom JavaScript execution function
export const executeCustomAction = (card: any, customCode: string) => {
if (!customCode || typeof customCode !== 'string') {
    console.error('Custom action code is empty or invalid');
    return;
  }

  try {
    const context = {
      hass: card.hass,
      config: card._config,
      states: card.hass.states,
      entity: (entityId: string) => card.hass.states[entityId],
      callService: (domain: string, service: string, serviceData?: any) =>
        card.hass.callService(domain, service, serviceData),
      navigate: (path: string) => {
        window.history.pushState(null, '', path);
        window.dispatchEvent(new CustomEvent('location-changed'));
      },
      fireEvent: (type: string, detail?: any) => {
        card.dispatchEvent(new CustomEvent(type, { detail }));
      }
    };

    const func = new Function(...Object.keys(context), customCode);
    func(...Object.values(context));

  } catch (error) {
    console.error('Error executing custom action:', error);
    card.hass.callService('system_log', 'write', {
      message: `Custom button action error: ${(error as Error).message}`,
      level: 'error',
    });
  }
};

export const handleDomainAction = (
  card: any,
  domain: string
): ((ev: CustomEvent) => void) => {
  const key = `domain|${domain}`;
  if (!card._actionHandlerCache.has(key)) {
    card._actionHandlerCache.set(
      key,
      makeActionHandler(card, "domain", domain)
    );
  }
  return card._actionHandlerCache.get(key)!;
};

export const handleAlertAction = (
  card: any,
  domain: string,
  deviceClass: string
): ((ev: CustomEvent) => void) => {
  const key = `alert|${domain}|${deviceClass}`;
  if (!card._actionHandlerCache.has(key)) {
    card._actionHandlerCache.set(
      key,
      makeActionHandler(card, "alert", domain, deviceClass)
    );
  }
  return card._actionHandlerCache.get(key)!;
};

export const handleCoverAction = (
  card: any,
  domain: string,
  deviceClass: string
): ((ev: CustomEvent) => void) => {
  const key = `cover|${domain}|${deviceClass}`;
  if (!card._actionHandlerCache.has(key)) {
    card._actionHandlerCache.set(
      key,
      makeActionHandler(card, "cover", domain, deviceClass)
    );
  }
  return card._actionHandlerCache.get(key)!;
};

export const handleSensorAction = (
  card: any,
  domain: string,
  deviceClass: string
): ((ev: CustomEvent) => void) => {
  const key = `sensor|${domain}|${deviceClass}`;
  if (!card._actionHandlerCache.has(key)) {
    card._actionHandlerCache.set(
      key,
      makeActionHandler(card, "sensor", domain, deviceClass)
    );
  }
  return card._actionHandlerCache.get(key)!;
};

export const makeActionHandler = (
  card: any,
  kind: "domain" | "alert" | "cover" | "sensor" | "custom_button",
  domain: string,
  deviceClass?: string,
  customButton?: any
): ((ev: CustomEvent) => void) => {
  return (ev: CustomEvent) => {
    ev.stopPropagation();

    let customization: any;
    if (kind === "domain") {
      customization = card._customizationDomainMap.get(domain);
    } else if (kind === "alert") {
      customization = card._customizationAlertMap.get(deviceClass || "");
    } else if (kind === "cover") {
      customization = card._customizationCoverMap.get(deviceClass || "");
    } else if (kind === "sensor") {
      customization = card._customizationSensorMap.get(deviceClass || "");
    } else if (kind === "custom_button") {
      customization = customButton;
    }

    const actionConfig =
      ev.detail.action === "tap"
        ? customization?.tap_action
        : ev.detail.action === "hold"
          ? customization?.hold_action
          : ev.detail.action === "double_tap"
            ? customization?.double_tap_action
            : null;

    // CUSTOM BUTTON INTEGRATION: Handle custom JavaScript execution
    if (kind === "custom_button" && actionConfig?.action === "custom") {
      try {
        executeCustomAction(card, actionConfig.custom_code);
        return;
      } catch (error) {
        console.error("Error in custom button action:", error);
        return;
      }
    }

    if (kind === "domain") {
      const isToggle =
        actionConfig === "toggle" || actionConfig?.action === "toggle";
      const isMoreInfo =
        actionConfig === "more-info" || actionConfig?.action === "more-info";

      if (isToggle) {
        if (domain === "media_player") {
          card.hass.callService(
            domain,
            card._isOn(domain, undefined, card._getOrganizedEntities(
              card._getAreaEntityIds(
                card._config.area,
                card._devicesInArea(card._config.area, card.hass.devices),
                card.hass.entities,
                card._hiddenEntitiesSet,
                card._config.label
              ),
              card.hass.states,
              card._deviceClasses
            ).byDomain) ? "media_pause" : "media_play",
            undefined,
            { area_id: card._config!.area }
          );
        } else if (domain === "lock") {
          card.hass.callService(
            domain,
            card._isOn(domain, undefined, card._getOrganizedEntities(
              card._getAreaEntityIds(
                card._config.area,
                card._devicesInArea(card._config.area, card.hass.devices),
                card.hass.entities,
                card._hiddenEntitiesSet,
                card._config.label
              ),
              card.hass.states,
              card._deviceClasses
            ).byDomain) ? "lock" : "unlock",
            undefined,
            { area_id: card._config!.area }
          );
        } else if (domain === "vacuum") {
          card.hass.callService(
            domain,
            card._isOn(domain, undefined, card._getOrganizedEntities(
              card._getAreaEntityIds(
                card._config.area,
                card._devicesInArea(card._config.area, card.hass.devices),
                card.hass.entities,
                card._hiddenEntitiesSet,
                card._config.label
              ),
              card.hass.states,
              card._deviceClasses
            ).byDomain) ? "stop" : "start",
            undefined,
            { area_id: card._config!.area }
          );
        } else {
          card.hass.callService(
            domain,
            card._isOn(domain, undefined, card._getOrganizedEntities(
              card._getAreaEntityIds(
                card._config.area,
                card._devicesInArea(card._config.area, card.hass.devices),
                card.hass.entities,
                card._hiddenEntitiesSet,
                card._config.label
              ),
              card.hass.states,
              card._deviceClasses
            ).byDomain) ? "turn_off" : "turn_on",
            undefined,
            { area_id: card._config!.area }
          );
        }
        return;
      } else if (isMoreInfo || actionConfig === undefined) {
        if (domain !== "binary_sensor" && domain !== "sensor") {
          if (domain === "climate") {
            const climateCustomization = card._config?.customization_domain?.find(
              (item: { type: string }) => item.type === "climate"
            );
            const displayMode = (climateCustomization as any)?.display_mode;
            if (displayMode === "icon" || displayMode === "text_icon") {
              card._showPopupForDomain(domain);
            }
          } else {
            card._showPopupForDomain(domain);
          }
        }
        return;
      }

      const config = {
        tap_action: customization?.tap_action,
        hold_action: customization?.hold_action,
        double_tap_action: customization?.double_tap_action,
      };

      handleAction(card, card.hass!, config, ev.detail.action!);
      return;
    }

    const isMoreInfo =
      actionConfig === "more-info" || actionConfig?.action === "more-info";

    if (kind === "alert") {
      if (isMoreInfo || actionConfig === undefined) {
        if (domain === "binary_sensor") {
          card._showPopupForDomain(domain, deviceClass);
        }
        return;
      }
    } else if (kind === "cover") {
      if (isMoreInfo || actionConfig === undefined) {
        if (domain === "cover") {
          card._showPopupForDomain(domain, deviceClass);
        }
        return;
      }
    } else if (kind === "sensor") {
      if (isMoreInfo) {
        if (domain === "sensor") {
          card._showPopupForDomain(domain, deviceClass);
        }
        return;
      }
      if (ev.detail.action === "tap" && !customization?.tap_action) {
        return;
      }
    }

    const config = {
      entity: customization?.entity,
      tap_action: customization?.tap_action,
      hold_action: customization?.hold_action,
      double_tap_action: customization?.double_tap_action,
    };

    // CUSTOM BUTTON INTEGRATION: Handle more-info for entity-based custom buttons
    if (kind === "custom_button" && customButton?.entity) {
      if (isMoreInfo) {
        const entityId = customButton.entity;
        const event = new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId },
        });
        card.dispatchEvent(event);
        return;
      }
    }

    handleAction(card, card.hass!, config, ev.detail.action!);
  };
};

export const renderActionHandler = (
  customization: any,
  defaultConfig?: any
) => {
  return actionHandler({
    hasHold: hasAction(
      customization?.hold_action || defaultConfig?.hold_action
    ),
    hasDoubleClick: hasAction(
      customization?.double_tap_action || defaultConfig?.double_tap_action
    ),
  });
};