# SUSE Shop Demo for SUSE Cloud Application Platform

![SUSE Shop Demo](/docs/images/demo.png)

This is a fictitious case study demonstrating how a company can leverage SUSE Cloud Application Platform (SUSE CAP) to provide agility infrastructure to scale their business as demands suddenly surge.

There are 2 parts in this demo.

## Demo 1

A QR code is provided to attendees, which is the URL for the shopping cart application. As of this writing, SUSE CAP is deployed on AWS, and may be subjected to changes in the future.
Attendees will use their mobile phones to browse to that page and start the ordering.
This document provides additional information, so go through the powerpoint presentation first.

## Demo 2

This demo will showcase how easy it is to update the software.
This is where some requirements need to be met before you can present this demo. The code is modified locally to present the additional payment method (bitcoin), and will need to be compiled locally before uploading the new application to AWS.

To understand how the demo is supposed to execute by the presenters to a group of audience on the stage floor, please visit the [demo guide](https://microfocusinternational-my.sharepoint.com/:p:/g/personal/derek_so_suse_com/EQlWW14TqphMqQ1a4zzRaM0BeJ3KR6XAJNwJ285Wtgy71A?e=eeysz2) (Access is limited to SUSE Employee only)

# SUSE eShop Demo Environment

This eshop demo application is hosted on SUSE Cloud Application Platform on public cloud.

* [SUSE Cloud Application Platform console](https://console.open-cloud.net)
* [Prometheus Metrics Query UI](http://metrics.open-cloud.net)

> Login is required to access to the SUSE CAP and prometheus Query UI. Please visit to this [link](https://microfocusinternational-my.sharepoint.com/:w:/g/personal/derek_so_suse_com/EcB6kMwMprBKlwnUgXuw89kBtldoCfFllPg2VfW_S0L2xw?e=Hya5Eo) for the credentials (Access is limited to SUSE employee only)

# SUSE eShop Architecture

The demo application is comprised of a simple micro-services based architecture:

| Component                           | Description                           | URL                                                                                      |
| :---------------------------------- | :------------------------------------ | :--------------------------------------------------------------------------------------- |
| [suse-expert-day](startpage/) | QR Code For Access To order app | [QR code for display](http://suse-expert-day.open-cloud.net/) |
| [order-app](order-app/)             | Mobile-friendly web-order application | [http://suse-order-app.open-cloud.net/](http://suse-order-app.open-cloud.net/)           |
| [order-processor](order-processor/) | Shop API service                      |                                                                                          |
| [dashboard](dashboard/)             | Store Shop Owner Business Dashboard   | [http://suse-order-dashboard.open-cloud.net](http://suse-order-dashboard.open-cloud.net) |

![SUSE Shop Demo Software Architecture](/docs/images/arch.png)

# Presenter's Setup Guide

> NOTE: This demo is hosted in public cloud which mean internet access is required for both the presenter and audience.

## Setup OS

Assuming the presenter will be using OS `openSUSE 15 installed with GNOME`, the initial setup will be as follows.

```
sudo zypper -n in git-core vim nodejs8 nodejs10 cf-cli
cd ~
git clone https://github.com/dsohk/susecap-demostore
cd ~/susecap-demostore/order-app
npm install --save-dev
npm audit fix
```

## Setup CF CLI

To access to the SUSE CAP via CLI, please follow the steps below.

1. Set SUSE CAP API endpoint for `cf-cli`

```
cf login -a https://api.open-cloud.net --skip-ssl-validation -u admin
```

2. Enter admin password to continue
3. Select Organization: `demo`
4. Select space: `dev`
5. List all apps under `demo/dev` space with `cf apps` command like the example below.

```
$ cf apps
Getting apps in org demo / space dev as admin...
OK

name                   requested state   instances   memory   disk   urls
suse-order-dashboard   started           1/1         512M     1G     suse-order-dashboard.open-cloud.net
suse-order-app         started           1/1         64M      1G     suse-order-app.open-cloud.net
suse-order-processor   started           1/1         512M     1G     suse-order-processor.open-cloud.net
suse-expert-day        started           1/1         64M      1G     suse-expert-day.open-cloud.net
```

## Demo 2 - Blue/green deployment and rollback

There are 2 versions of the order app:

* v1 - order-app with cash and credit card payment options only
* v2 - order-app with cash, credit card and bitcoin payment options.

1. Before demo, deploy the first version of order-app

Make sure the order-app-v1 has been deployed to SUSE CAP. If not, execute the following commands.

```
cd ~/susecap-demostore/order-app
./deploy-v1.sh
```

2. Demo code change (by adding bitcoin payment option in the order-app) and deploy v2

```
cd ~/susecap-demostore/order-app
vi src/app/paymethods.ts
```

Uncomment the 3rd payment option and ensure a comma has been added to the 2nd payment option like below.

```ts
import { Paymethod } from './paymethod'

export const PAYMETHODS: Paymethod[] =[
    {id: 1, name: 'Cash', image: 'fa fa-dollar-sign'},
    {id: 2, name: 'Credit Card', image: 'fa fa-credit-card'},
    {id: 3, name: 'SUSE Coin', image: 'fab fa-btc'}
]
```

Save the file and deploy the change to SUSE CAP

```
sh ./deploy.sh
```

At this stage, both v1 and v2 will be running on SUSE CAP with the v1 still serving.

3. Switch the route to serve v2 (new app) instead of v1.

```
./switch-version.sh v1 v2
```

At this point, the audience should see the order-app-v2 on their mobile phone.

4. Rollback from v2 to v1

```
./switch-version.sh v2 v1
```

Ask the audience to check if their mobile phone is showing order-app-v1 (no
bitcoin) option.

# Reset the demo environment

After the demo has been completed, please reset the demo environment with the steps below.

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

# Feedback

Please submit an issue ticket to help us improve the demo application.

# Credits

Special thanks to @byuenhb for their contribution.


