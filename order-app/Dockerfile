### STAGE 1: Build ###
FROM node:8.11.1-alpine as builder
RUN mkdir -p /usr/src/order-app
WORKDIR /usr/src/order-app
COPY package*.json /usr/src/order-app/
RUN npm install
# Copy order-app source into image.
COPY . /usr/src/order-app
# Building app.
RUN npm run-script buildprod

### STAGE 2: Setup ###
FROM nginx:1.13.12-alpine
# Removing nginx default page.
RUN rm -rf /usr/share/nginx/html/*
# Copying nginx configuration.
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Copying order-app source into web server root.
COPY --from=builder /usr/src/order-app/dist/angular-suse-shop /usr/share/nginx/html
# Exposing ports.
EXPOSE 80
# Starting server.
CMD ["nginx", "-g", "daemon off;"]
