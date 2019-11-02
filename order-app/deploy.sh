#! /bin/bash -x

# zero-downtime deployment strategy

# deploy to CAP so that v1 and v2 co-exists with URL still point to v1
ng build --prod
cp Staticfile dist/
cp manifest.yml dist/
cd dist
cf push suse-order-app-v2 -f manifest.yml

# switch URL point to v2
cf map-route suse-order-app-v2 open-cloud.net -n suse-order-app
cf unmap-route suse-order-app-v1 open-cloud.net -n suse-order-app

# print result
cf apps
