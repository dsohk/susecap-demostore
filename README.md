# SUSE CAP - Shopping Cart Demo

This is a fictitious case study demonstrating how a company can leverage SUSE Cloud Application Platform (SUSE CAP) to provide agility infrastructure to scale their business as demands suddenly surge.

There are 2 parts in this demo.

## Demo 1

A QR code is provided to attendees, which is the URL for the shopping cart application. As of this writing, SUSE CAP is deployed on AWS, and may be subjected to changes in the future.
Attendees will use their mobile phones to browse to that page and start the ordering.
This document provides additional information, so go through the powerpoint presentation first.

## Demo 2

This demo will showcase how easy it is to update the software.
This is where some requirements need to be met before you can present this demo. The code is modified locally to present the additional payment method (bitcoin), and will need to be compiled locally before uploading the new application to AWS.

## See demo guide

https://microfocusinternational-my.sharepoint.com/:p:/g/personal/derek_so_suse_com/EQlWW14TqphMqQ1a4zzRaM0BeJ3KR6XAJNwJ285Wtgy71A?e=eeysz2

# SUSE eShop Demo Environment

This eshop demo application is hosted on SUSE Cloud Application Platform on public cloud.

* [SUSE Cloud Application Platform console](https://console.open-cloud.net)
* [Prometheus Metrics Query UI](http://metrics.open-cloud.net)

> Login is required to access to the SUSE CAP and prometheus Query UI. Please visit to this [link](https://microfocusinternational-my.sharepoint.com/:p:/g/personal/derek_so_suse_com/EQlWW14TqphMqQ1a4zzRaM0BeJ3KR6XAJNwJ285Wtgy71A?e=eeysz2) for the credentials (Access is limited to SUSE employee only)

# SUSE eShop Architecture

The demo application is comprised of a simple micro-services based architecture:

| Component                           | Description                           | URL                                                                                      |
| :---------------------------------- | :------------------------------------ | :--------------------------------------------------------------------------------------- |
| [suse-expert-day](startpage/) | QR Code For Access To order app | [QR code for display](http://suse-expert-day.open-cloud.net/) |
| [order-app](order-app/)             | Mobile-friendly web-order application | [http://suse-order-app.open-cloud.net/](http://suse-order-app.open-cloud.net/)           |
| [order-processor](order-processor/) | Shop API service                      |                                                                                          |
| [dashboard](dashboard/)             | Store Shop Owner Business Dashboard   | [http://suse-order-dashboard.open-cloud.net](http://suse-order-dashboard.open-cloud.net) |

![GitHub Logo](/docs/images/arch.png)

# Presenter's Setup Guide

> NOTE: This demo is hosted in public cloud which mean internet access is required for both the presenter and audience.

Assuming the presenter will be using OS `openSUSE 15 installed with GNOME`, the initial setup will be as follows.

```
sudo zypper -n in git-core vim nodejs8 nodejs10 cf-cli
cd ~
git clone https://github.com/dsohk/susecap-demostore
cd ~/susecap-demostore/order-app
npm install --save-dev
npm audit fix
```

# Reset the demo environment

To reset the demo environment, please follow the steps below.

1. To clear all the data in dashboard, execute the following command line in your linux host.

```bash
curl http://suse-order-processor.open-cloud.net/api/reset
```

2. To reset payment to 2 options only

```bash
cd ~/susecap-demostore/order-app
vi src/app/paymethods.ts
```

3. Comment out the 3rd payment options as shown below and save the file. Please ensure no comma at the end of the 2nd payment option.

```ts
import { Paymethod } from './paymethod'

export const PAYMETHODS: Paymethod[] =[
    {id: 1, name: 'Cash', image: 'fa fa-dollar-sign'},
    {id: 2, name: 'Credit Card', image: 'fa fa-credit-card'}
    // {id: 3, name: 'SUSE Coin', image: 'fab fa-btc'}
]
```

4. Redeploy the `order-app` to SUSE CAP on AWS

```bash
cf login
cd ~/susecap-demostore/order-app
sh ./deploy.sh
```



