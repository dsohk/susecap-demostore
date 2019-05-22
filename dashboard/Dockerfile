FROM node:8.11.1-alpine
RUN mkdir -p /usr/src/dashboard
WORKDIR /usr/src/dashboard
# Copy dashboard source into image.
COPY . /usr/src/dashboard
RUN npm install
# Exposing ports.
EXPOSE 3300
# start app.
# Starting server.
CMD ["npm", "start"]

