#! /bin/bash

if [ "$#" -ne 2 ]; then
  echo "Usage: ./switch-version.sh <from-version> <to-version>"
  echo "Example: ./switch-version.sh v1 v2"
  exit
fi

# switch version
cf map-route suse-order-app-$2 open-cloud.net -n suse-order-app
cf unmap-route suse-order-app-$1 open-cloud.net -n suse-order-app

# print result
cf apps
