#! /bin/bash -e

echo "Visit http://localhost:8089 for Locust web console ..."

locust -f locustfile.py \
  -H http://suse-order-processor.open-cloud.net \
  --logfile locust.log -L DEBUG

