
FROM node:10-alpine

COPY . /app

WORKDIR /app
RUN npm install

EXPOSE 3300

ENV SERVER_URL http://localhost:3300

CMD npm start
