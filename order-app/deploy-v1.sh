#! /bin/bash

cp demo/v1 src/app/paymethods.ts
ng build --prod
cp Staticfile dist/
cp manifest.yml dist/
cd dist
cf push suse-order-app-v1 -f manifest.yml
