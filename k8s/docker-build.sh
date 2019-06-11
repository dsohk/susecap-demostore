#! /bin/bash -ex

cd order-processor
docker build -t dso814/order-processor:v1.0 .
cd ..

cd order-app
docker build -t dso814/order-app:v1.0 .
cd ..

cd dashboard
docker build -t dso814/order-dashboard:v1.0 .
cd ..


