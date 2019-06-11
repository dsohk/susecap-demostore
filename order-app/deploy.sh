#! /bin/bash

npm run-script buildprod
cp Staticfile dist/angular-suse-shop/
cp manifest.yml dist/angular-suse-shop/
cd dist/angular-suse-shop
cf push
