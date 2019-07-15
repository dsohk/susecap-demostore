

# redis in local docker

start a service

docker run --name my-redis -d redis

start a client

docker run -it --name redis-client --rm --link my-redis:redis redis redis-cli -h redis -p 6379


# build docker

docker build -t dso814/suse-order-processor:latest .


