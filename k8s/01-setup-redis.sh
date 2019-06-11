#! /bin/bash -ex

helm install stable/redis --name redis --namespace suse --values redis-prod.yaml
