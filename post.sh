#! /bin/bash -ex

curl -X POST -H "Content-Type: application/json" \
  -d '{ "customer": 'Derek', timestamp: "2019-29-20 04:29:27", price: "100", paymethod: "Credit Card", product: "Cup" }' \
  http://sales-order-processor.open-cloud.net/api/order

