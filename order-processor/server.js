var redis=require('redis');
var async=require('async');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL;

var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
var uri = vcap_services.redis[0].credentials.uri;
var client = redis.createClient(uri);


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(bodyParser.json());
app.options('*', cors(corsOptions));
//app.use(cors(corsOptions));

app.listen(process.env.VCAP_APP_PORT ||8001, function () {
    console.log ("Server started!");
});


app.post('/api/order', cors(), (req, res, next) => {

    console.log(req.body);

    // increment orders
    client.hincrby("orders", "count", 1);
    client.hincrby("orders", "total", req.body.price);

    // increment products
    client.hsetnx("products:"+req.body.product, "name",req.body.product);
    client.hincrby("products:"+req.body.product,"total",req.body.price);
    client.hincrby("products:"+req.body.product,"count",1);
    client.sadd("all_products", req.body.product);

    // increment pay methods
    client.hsetnx("pays:"+req.body.paymethod, "name",req.body.paymethod);
    client.hincrby("pays:"+req.body.paymethod,"total",req.body.price);
    client.hincrby("pays:"+req.body.paymethod,"count",1);
    client.sadd("all_pays", req.body.paymethod);


    //increment customer
    client.zincrby("customers",1, req.body.customer);
    res.status('201').send(req.body);
})


app.get('/api/sales', (req, res) => {

    client.HGETALL("orders", (err, value) => {

        res.json(value);
    });
});

app.get("/api/getTop/type/:cat", (req, res) => {

    var cat = req.params["cat"];

    switch(cat){
        case "item":
            getItemByNo(req, res);
            break;
        case "pay":
            getPayByNo(req, res);
            break;
        case "cust":
            getCustomer(req, res);
            break;;
    }

});

app.get("/api/getTop/type/:cat/sales", (req, res) => {

    var cat = req.params["cat"];

    switch(cat){
        case "item":
            getItemBySales(req, res);
            break;
        case "pay":
            getPayBySales(req, res);
            break;
    }

});

function getItemByNo(req, res){

    client.smembers("all_products", (err, reply) => {


        async.eachSeries(reply, (item, callback) => {

            client.hget("products:"+item, "count", (err, reply) => {

                client.zadd("top_products_no", reply, item);
                callback();
            });
        },
        (err) => {
            client.zrevrangebyscore ("top_products_no", '+inf', '-inf', 'withscores',
                    (err, reply) => {
                        res.json(reply);
                });

            }
        );

    });
}

function getItemBySales(req, res){

    client.smembers("all_products", (err, reply) => {


        async.eachSeries(reply, (item, callback) => {

                client.hget("products:"+item, "total", (err, reply) => {

                    client.zadd("top_products_sales", reply, item);
                    callback();
                });
            },
            (err) => {
                client.zrevrangebyscore ("top_products_sales", '+inf', '-inf', 'withscores',
                    (err, reply) => {
                        res.json(reply);
                });
            }
        );

    });
}

function getPayByNo(req, res){

    client.smembers("all_pays", (err, reply) => {


        async.eachSeries(reply, (item, callback) => {

            client.hget("pays:"+item, "count", (err, reply) => {

                client.zadd("top_pays_no", reply, item);
                callback();
            });
        },
        (err) => {
            client.zrevrangebyscore ("top_pays_no", '+inf', '-inf', 'withscores',
                    (err, reply) => {
                        res.json(reply);
                });

            }
        );

    });
}

function getPayBySales(req, res){

    client.smembers("all_pays", (err, reply) => {


        async.eachSeries(reply, (item, callback) => {

                client.hget("pays:"+item, "total", (err, reply) => {

                    client.zadd("top_pays_sales", reply, item);
                    callback();
                });
            },
            (err) => {
                client.zrevrangebyscore ("top_pays_sales", '+inf', '-inf', 'withscores',
                    (err, reply) => {
                        res.json(reply);
                });
            }
        );

    });
}

function getCustomer(req, res){
    client.zrevrangebyscore("customers",  '+inf', '-inf', "withscores", "limit",0,3, (err,value) => {
        res.json(value);
    });
}

app.get('/api/reset', (req, res) => {
    reset();
    res.send("Done!");
});

var reset = function () {

    client.HMSET("orders",{"count": 0, "total": 0});

    client.HMSET ("products:T-shirt", {"count":0, "total": 0});
    client.HMSET("products:Geeko", {"count":0, "total": 0});
    client.HMSET("products:Cup", {"count":0, "total": 0});
    client.del("all_products");
    client.del("products*");
    client.del("pays*");

    client.HMSET ("pays:Cash", {"count":0, "total": 0});
    client.HMSET("pays:Credit Card", {"count":0, "total": 0});
    client.HMSET("pays:Bitcoin", {"count":0, "total": 0});
    client.del("all_pays");


    client.del("customers");
}

