#! /bin/bash

locust -f locustfile.py \
  -H http://suse-order-processor.open-cloud.net \
  --no-web -c 1 -r 1 \
  --print-stats \
  --logfile locust.log -L DEBUG
