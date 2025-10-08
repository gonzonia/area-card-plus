<a name="top"></a>
This is a fork of the Area Card Plus created by <a href="https://github.com/xbourner">xbourner</a>. I wanted to add cusom buttons with ability to execute scripts and launch scenes. This also turned into the ability execute JS so that a script could be launched and  the dashboard changed from a single click. This write up is a slightly modified version of what <a href="https://github.com/xbourner">xbourner</a> wrote on the main README.

The fork was developed with the assistance of AI tools. I found Claude to be the best at generating working code.

<h1 id="top">Area Card Plus</h1>

[![(https://hacs.xyz)](https://img.shields.io/badge/hacs-default-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/xBourner/area-card-plus/total?style=for-the-badge)
[![GitHub release](https://img.shields.io/github/release/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card/releases/)
[![stars - status-card](https://img.shields.io/github/stars/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card)
[![GitHub issues](https://img.shields.io/github/issues/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card/issues)

<img src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-card-header.png" alt="Area Card Plus Header" width="100%">

# Support my work

This card was developed by <a href="https://github.com/xbourner">xbourner</a>. If you like the card, it would be nice to support it!  You don't have to but this will keep xbourner motivated and xbourner will appreciate it much! <br>

You can also join xbourner Discord Server to leave feedback, get help or contribute with ideas :) 

[![Discord](https://img.shields.io/discord/1341456711835455609?style=for-the-badge&logo=discord&logoColor=%237289da&label=Discord&color=%237289da)](https://discord.gg/RfVx7hmZD3)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?&logo=buy-me-a-coffee&logoColor=black&style=for-the-badge)](https://www.buymeacoffee.com/bourner)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20on%20GitHub-30363d?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sponsors/xBourner)
[![PayPal](https://img.shields.io/badge/PayPal-003087?logo=paypal&logoColor=fff&style=for-the-badge)](https://www.paypal.me/gibgas123)

# Overview

An **Area Card** for your Home Assistant Dashboard

xbourner always thought the area card has so much more potential so xbourner made their own one. <br>
The card will show all entities/devices grouped into domains or device classes that are linked to your area. <br>
To make sure this card will work like it should please check if your relevant entities are assigned to the correct domain.

This card is highly influenced by [Dwains Dashboard](https://github.com/dwainscheeren/dwains-lovelace-dashboard). So now you can use this great idea as a single card in all of your Dashboards

<p align="center">
  <img alt="Light" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-single-light.png" width="49%">
&nbsp; 
  <img alt="Dark" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-single-dark.png" width="49%">
</p>

<p align="center">
  <img alt="Light" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-multi-light.png" width="49%">
&nbsp; 
  <img alt="Dark" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-multi-dark.png" width="49%">
</p>

**Vertical Mode**
<p align="center">
  <img alt="Light" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-vertical-light.png" width="49%">
&nbsp; 
  <img alt="Dark" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-vertical-dark.png" width="49%">
</p>

**V2 Theme**
<p align="center">
  <img alt="Light" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-multi-light-v2.png" width="49%">
&nbsp; 
  <img alt="Dark" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-multi-dark-v2.png" width="49%">
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

## Installation

###  HACS Installation (Recommended)

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=xBourner&repository=area-card-plus&category=plugin)

#### Steps:

1. Make sure **[HACS](https://hacs.xyz)** is installed.
3. Go to **HACS → Custom Repositories**.
4. Add this repository: `https://github.com/xBourner/area-card-plus` as type `Dashboard`
5. Install **Status Card**.
6. **Clear your browser cache** and reload (F5) Home Assistant.

For more info look at [How to add Custom Repositories](https://hacs.xyz/docs/faq/custom_repositories/)

### Usage:

After adding the repository to your HA instance you need to add the card to one of your dashboards. <br>
Just choose an area an the card will do the rest. <br>
The card needs to work with your areas so you need to assign your relevant devices/entities to your areas.

### Configuration:

See more in [Wiki](https://github.com/xBourner/area-card-plus/wiki)


### Experimental
This feature is experimental and YAML only. This is only available in this fork. 

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

hass - Full Home Assistant object for service calls, state access, etc. <br>
config - The card's configuration <br>
states - All entity states (hass.states) <br>
entity(entityId) - Helper to get a specific entity state <br>
callService(domain, service, data) - Direct service call helper <br>
navigate(path) - Navigation helper <br>
fireEvent(type, detail) - Custom event helper

# Feedback

To see the latest changes please look at: [Releases](https://github.com/xBourner/area-card-plus/releases)


Thank you for using my custom cards. Please leave some feedback or a star.
If you have any problems, suggestions for improvements or want to connect with me you can joing my discord: https://discord.gg/RfVx7hmZD3

<br><hr>

[🔝 Back to top](#top)



