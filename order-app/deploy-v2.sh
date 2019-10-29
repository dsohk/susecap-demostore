#! /bin/bash

cp demo/v2 src/app/paymethods.ts
ng build --prod
cp Staticfile dist/
cp manifest.yml dist/
cd dist
cf push suse-order-app-v2 -f manifest.yml
