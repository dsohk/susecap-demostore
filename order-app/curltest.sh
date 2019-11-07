#! /bin/bash

# To test continuously the availability of order-app site
# during zero-downtime deployment.

while true; do
  curl --head http://suse-order-app.open-cloud.net
  # sleep 1
done
