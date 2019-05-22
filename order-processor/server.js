// Import the installed modules.
const express = require('express');
const bodyParser = require("body-parser");
const responseTime = require('response-time')
const redis = require('redis');

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL;

// create and connect redis client to local instance.
const client = redis.createClient(REDIS_URL);

// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});

// middleware
app.use(responseTime());
app.use(bodyParser.urlencoded({extended : true}));

// accept order
app.post('/order', (req, res) => {
  console.log(req.body);
});


// return stats to dashboard
app.get('/stats', (req, res) => {
  // return data to dashboard
});

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT);
});
