#! /bin/bash +x

ng build --prod
cp Staticfile dist/
cp manifest.yml dist/
cd dist
cf push suse-order-app-v2 -f manifest.yml
