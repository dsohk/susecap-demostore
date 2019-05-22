FROM node:8.11.1-alpine
RUN mkdir -p /usr/src/order-processor
WORKDIR /usr/src/order-processor
# Copy order-processor source into image.
COPY . /usr/src/order-processor
RUN npm install
# Exposing ports.
EXPOSE 3000
# start app.
# Starting server.
CMD ["node", "server.js"]

