#! /bin/bash

curl -vvv -X -H "Content-Type: application/json" \
  -d '{ "customer": "Derek", "paymenthod_id": 2, "product_id": 1, "price": 50 }' \
  http://suse-order-processor.open-cloud.net/api/order
