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


# Presenter's Setup Guide

> NOTE: As CAP used for this demo is in AWS, Internet access for the presenter including the audience needs to be included.

Assuming the presenter will be using OS `openSUSE 15 installed with GNOME`, the initial setup will be as follows.

```
sudo zypper -n in git-core vim nodejs8 nodejs10 cf-cli
cd ~
git clone https://github.com/dsohk/susecap-demostore
cd ~/susecap-demostore/order-app
npm install --save-dev
npm audit fix
```


# Useful URLS

* [SUSE Cloud Application Platform console](https://console.open-cloud.net)
* [Source Code](https://gitlab.geeko.land/suseapj/eshop2019)
* Demo URLs
  * [QR code for display](http://suse-expert-day.open-cloud.net/)
  * [Shopping cart app](http://suse-order-app.open-cloud.net/)
  * [Dashboard](http://suse-order-dashboard.open-cloud.net)
  * [Metrics](http://metrics.open-cloud-net)

# Reset the environment

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






# Behind the scene

Sample micro-services based application for SUSE Demo

1. order-app  => Simple order form (angular)
2. order-processor => API server (node.js)
3. dashboard => admin dashboard (vudash)

