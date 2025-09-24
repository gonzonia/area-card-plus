<a name="top"></a>
This is a fork of the Area Card Plus created by <a href="https://github.com/xbourner">xbourner</a>. I wanted to add cusom buttons with ability to execute scripts and launch scenes. This also turned into the ability execute JS so that a script could be launched and  the dashboard changed from a single click. This write up is a slightly modified version of what <a href="https://github.com/xbourner">xbourner</a> wrote on the main README.

The fork was developed with the assistance of AI tools. I found Claude to be the best at generating working code.


# Area Card Plus

[![(https://hacs.xyz)](https://img.shields.io/badge/hacs-default-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/gonzonia/area-card-plus/total?style=for-the-badge)
[![GitHub release](https://img.shields.io/github/release/gonzonia/area-card-plus?style=for-the-badge)](https://github.com/gonzonia/area-card-plus/releases/)
[![stars - area-card-plus](https://img.shields.io/github/stars/gonzonia/area-card-plus?style=for-the-badge)](https://github.com/gonzonia/area-card-plus)
[![GitHub issues](https://img.shields.io/github/issues/gonzonia/area-card-plus?style=for-the-badge)](https://github.com/gonzonia/area-card-plus/issues)

<img src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/area-card-header.png" alt="Area Card Plus Header" width="100%">

# Support Xbourner's work
This card was developed by <a href="https://github.com/xbourner">xbourner</a>. If you like the card, it would be nice to support it!

You can also join <a href="https://github.com/xbourner">xbourner</a>'s Discord Server to leave a feedback, get help or contribute with ideas unrelated to the custom buttons:) 

[![Discord](https://img.shields.io/discord/1341456711835455609?style=for-the-badge&logo=discord&logoColor=%237289da&label=Discord&color=%237289da)](https://discord.gg/RfVx7hmZD3)
[![Buy Them A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?&logo=buy-me-a-coffee&logoColor=black&style=for-the-badge)](https://www.buymeacoffee.com/bourner)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20on%20GitHub-30363d?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sponsors/xBourner)
[![PayPal](https://img.shields.io/badge/PayPal-003087?logo=paypal&logoColor=fff&style=for-the-badge)](https://www.paypal.me/gibgas123)

# Overview

An **Area Card** for your Home Assistant Dashboard

@xbourner always thought the area card has so much more potential so they made their own one. <br>
The card will show all entities/devices grouped into domains or device classes that are linked to your area. <br>
To make sure this card will work like it should please check if your relevant entities are assigned to the correct domain.

This card is highly influenced by [Dwains Dashboard](https://github.com/dwainscheeren/dwains-lovelace-dashboard). So now you can use this great idea as a single card in all of your Dashboards

<p align="center">
  <img alt="Light" src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/area-single-light.png" width="49%">
&nbsp; 
  <img alt="Dark" src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/area-single-dark.png" width="49%">
</p>

<p align="center">
  <img alt="Light" src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/area-multi-light.png" width="49%">
&nbsp; 
  <img alt="Dark" src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/area-multi-dark.png" width="49%">
</p>

**Vertical Mode**
<p align="center">
  <img alt="Light" src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/area-vertical-light.png" width="49%">
&nbsp; 
  <img alt="Dark" src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/area-vertical-dark.png" width="49%">
</p>

**V2 Theme**
<p align="center">
  <img alt="Light" src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/area-multi-light-v2.png" width="49%">
&nbsp; 
  <img alt="Dark" src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/area-multi-dark-v2.png" width="49%">
</p>


### How it works
 - 🤖 **Auto generating card** - Works when entities/devices are assigned to areas
 - ✅ **Based on entity states** - Shows entities that are in a on/active state
 - 📚 **Automatic Grouping** - Entities grouped by domain/device_class
 - 🎨 Available in **Two Designs**
 - 📑 **Popup View** - Entities will render as Tile Cards in a new view
 - 🧠 **GUI Editor** - No code or scripts needed
 - 🔧 **Highly customizable** - almost everything customizable
 - 📱 **Optimized for desktop and phones**
 - 🌍 **Available in all HA languages**

<br>

<p align="right">
  <a href="#top">
    <img src="https://github.com/gonzonia/area-card-plus/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>

## Installation

###  HACS Installation (Recommended)

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=gonzonia&repository=area-card-plus&category=plugin)

#### Steps:

1. Make sure **[HACS](https://hacs.xyz)** is installed.
3. Go to **HACS → Custom Repositories**.
4. Add this repository: `https://github.com/gonzonia/area-card-plus` as type `Dashboard`
5. Install **Status Card**.
6. **Clear your browser cache** and reload (F5) Home Assistant.

For more info look at [How to add Custom Repositories](https://hacs.xyz/docs/faq/custom_repositories/)

#### Usage:

After adding the repository to your HA instance you need to add the card to one of your dashboards. <br>
Just choose an area an the card will do the rest. <br>
The card needs to work with your areas so you need to assign your relevant devices/entities to your areas.


<p align="right">
  <a href="#top">
    <img src="https://github.com/gonzonia/area-card-plus/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>


# Screenshots & Explanation

<details>
<summary>Show Content</summary>

### More Info/ Popup View

<img src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/popup-view.png" alt="Area Card Plus Header" width="100%">

  - **Popup View** - Displays all entities in the area
  - **Tile Cards** - Shows controllable cards at default
  - **Columns** - Specify how many columns will be shown in the popup (still one on mobile view)



### Appearance


<img src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/appearance_area.png" alt="Area Card Plus Appearance" width="40%">

- **Theme** - Choose a theme for the card.
- **Vertical/Horizontal** - Choose the layout of the card. Default is vertical. See top screenshots.
- **V1/V2** - Choose the design of the card. Default is V1. See top screenshots.
- **Mirror Card Layout** - Display content on the right side instead of the left. <br>
  <img src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/mirror.png" alt="Area Card Plus Appearance" width="40%">
- **Show Icon** - Choose if you want to see icon, picture of both. Also wotks when camera feed is shown. <br>
  <img src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/image.png" alt="Area Card Plus Appearance" width="40%">
- **Show Camera Feed instead of area picture** - Will show an assigned camera feed instead of icon/picture.
- **Area Icon** - Choose the icon to be shown. Default is the icon you specified in your HA area settings.
- **Area Icon Color** - Choose the icon color. Default is the primary color of your theme.
- **Area Name** - Choose a different name if you like. Default is the name in your HA area settings.
- **Area Icon Color** - Choose the name color. Default is the primary text color of your theme.
- **CSS** - You can add some CSS to the card directly. You can add css properties to the name and icon.
- **Tap, Double Tap & Hold Behavior** - Specify which action will happen if you click the card.


### Alert Classes

<img src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/alert-classes.png" alt="Area Card Plus Alert Classes" width="40%">

- **Alert Classes** - Specify the device_classes of binary sensors to show in the card. Default are all available classes of the area.
- **Color** - Change all icon colors for device_classes (binary_sensor) at once.
- **Alert CSS** - Change all CSS properties for device_classes (binary_sensor) at once. For example font-size.
- **Add Feature** - See below for more information about Customization

### Cover

<img src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/cover.png" alt="Area Card Plus Cover" width="40%">

- **Cover** - Specify the device_classes of covers to show in the card. Default are all available classes of the area.
- **Color** - Change all icon colors for device_classes (covers) at once.
- **Cover CSS** - Change all CSS properties for device_classes (cover) at once. For example font-size.
- **Add Feature** - See below for more information about Customization

### Sensor Classes

<img src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/sensor.png" alt="Area Card Plus Sensor Classes" width="40%">

- **Sensor Classes** - Specify the device_classes of sensors to show in the card. Default are all available classes of the area.
- **Color** - Change all icon colors for device_classes (sensors) at once.
- **Add Feature** - See below for more information about Customization

### Domain

<img src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/domain.png" alt="Area Card Plus Domain" width="40%">

- **Domain** - Specify the domains to show in the card. Default are all available domains of the area.
- **Color** - Change all icon colors for all domains at once.
- **Domain CSS** - Change all CSS properties for all domains at once. For example font-size.
- **Hide State Off** - Will hide the domains without an active entity to save some space.
- **Add Feature** - See below for more information about Customization

### Popup

<img src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/popup.png" alt="Area Card Plus Popup" width="40%">

- **Number of Columns** - Specify the amount of columns you will see in the popup
- **Popup Domain** - Specify the domains to show in the popup. Default are all available domains of the area.
- **Edit Filter** - Add filters to only show entities that have the same label.
- **Hide Entities** - Lets you hide entities you dont want to show in the popup. All available entities from your chosen area should be listed here.
- **Add Entities** - If you miss any entity or you can't assign them with the correct area. You can add it here to the popup.

### Customization

<img src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/customization-area.png" alt="Area Card Plus Customization" width="40%">

- **Icon** - Choose a different icon for the individual domain/device_class.
- **Color** - Choose a different icon color for the individual domain/device_class.
- **CSS** - Apply some CSS to the complete box of the individual domain/device_class.
- **Icon CSS** -  Apply some CSS to the icon only for the individual domain/device_class. For example animation for the icons.
- **Tap, Double Tap & Hold Behavior** - Specify which action will happen if you click the individual domain/device_class.

### Custom Buttons
<img src="https://raw.githubusercontent.com/gonzonia/area-card-plus/main/.github/img/custom-buttons.png" alt="Area Card Plus Custom Buttons" width="40%">

- **Area/Name** - Text to display as a label for the button, leave blank to only show an icon. 
- **Icon** - Choose a different icon for the custom button. 
- **Color** - Choose a different icon color for the individual domain/device_class.
- **Tap, Double Tap & Hold Behavior** - Specify which action will happen if you click the custom button.

### Experimental
This feature is experimental and YAML only (for now)

Add this code

```yaml
customization_popup:  
  - type: light                           # change it to the domain you want
    card: |-
      type: custom:mushroom-light-card    # change card type to the card you want
      show_brightness_control: true       # use optional card features (not everything tested)
      show_color_control: true
      show_color_temp_control: true
      use_light_color: true
```

```yaml
custom_buttons:                          # change it to the icon you want
  - icon: mdi:apple                    
    tap_action:
      action: custom                    # set action to custom to use JS
      custom_code: >                    
        hass.callService('script', 'turn_on', { entity_id:
        'script.livingroomtoggleappletv' }); window.history.pushState(null, '',
        '/a-v-main/living-room-apple'); wind
```

The custom_code field accepts JavaScript as a string. The system takes that string and executes it using JavaScript's Function constructor with a safe execution context. The execution context provides these variables/functions that you can use in your JavaScript:

hass - Full Home Assistant object for service calls, state access, etc.
config - The card's configuration
states - All entity states (hass.states)
entity(entityId) - Helper to get a specific entity state
callService(domain, service, data) - Direct service call helper
navigate(path) - Navigation helper
fireEvent(type, detail) - Custom event helper



#### Animations

Add this (or other animation css code) to your yaml config.

```yaml
card_mod:
  style: |
    @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }}
```

And into one of the icon customizations:

```yaml
animation: rotation 1s linear infinite;
  ```  

<p align="right">
  <a href="#top">
    <img src="https://github.com/gonzonia/area-card-plus/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>

</details>


# Settings

All settings are optional. The card should work without setting any parameters in yaml or via GUI. 

```yaml
type: custom:area-card-plus    ### type of the card
area: living-room              ### choose your area
show_camera: true              ### choose if you want to show a camera entity
camera_view: live              ### choose camera mode
theme: sand                    ### choose your theme
tap_action:                    ### choose tap_action
  action: more-info
double_tap_action:             ### choose double_tap_action
  action: more-info
hold_action:                   ### choose hold_action
  action: more-info
mirrored: true                 ### lets you mirror the card layout
alert_classes:                 ### choose the alert classes (motion & window are default)
  - motion
  - window
sensor_classes:                ### choose your sensor classes (temperature & humidity are default)
  - temperature
  - humidity
toggle_domains: []             ### choose your toggle_domains (all possible values will be shown at default)
popup_domains:                 ### choose the domains which are shown in popup view (all possible values will be shown at default)
  - person
  - update
  - calendar
columns: 4                     ### how many columns will be shown in popup view
customization_domain: []       ### choose the customization for toggle_domains
customization_alert: []        ### choose the customization for alert_domains
customization_sensor: []       ### choose the customization for sensor_domains
custom_buttons: []             ### add the custom buttons for the card
hide_unavailable: true         ### only shows entities that are NOT in state "unavilable"
layout: vertical               ### choose horizontal/vertical layout (vertical works best in section view smaller 3)
```

<p align="right">
  <a href="#top">
    <img src="https://github.com/gonzonia/area-card-plus/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>

# Feedback

To see the latest changes from Xbourner please look at: [Releases](https://github.com/xBourner/area-card-plus/releases)
To see the latest changes from me, please look at: [Releases](https://github.com/gonzonia/area-card-plus/releases)


Thank you for using the custom card. Please leave some feedback or a star.
If you have any problems, suggestions for improvements or want to connect with Xbourner you can join Xbourner's discord: https://discord.gg/RfVx7hmZD3
Any changes/suggestions regarding the custom buttons, please open an issue. 

<p align="right">
  <a href="#top">
    <img src="https://github.com/gonzonia/area-card-plus/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>



