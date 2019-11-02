
# Order Processor API Service

This is order processor API service.

## Get Started

This application is written with node.js. To get started to develop this application, follow the steps below.

```
npm install --save-dev
```

## Add Redis Backing Service

```
cf marketplace
cf create-service redis 5-0-5 my-redis
cf services
```

## Deploy to SUSE CAP

```
cf push --no-start
```

## Bind Redis and Start suse-order-processor

```
cf bind-service suse-order-processor my-redis
cf env suse-order-processor
cf start suse-order-processor
```

