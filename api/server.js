/**
 * @server Used to declare the server and set all back-end functionallity
 */

// call the packages we need
var express = require('express'); // call express
var bodyParser = require('body-parser');
// here we declare all functions we use for the standart user interface
var cache = require('./cache');
var dbFinder = require('./dbFinder');
var dbUpdator = require('./dbUpdator');
var validator = require('./validator');
// we connect to the db using the credentials and fetch the db localy
dbFinder.connectDb();
dbFinder.setCache(cache);
dbUpdator.connectDb();
dbUpdator.setCache(cache);
// define our app using express
var app = express();
// this will let us get nv.PORT || 8080;        // set our port
var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
// START THE SERVER
// =============================================================================
app.listen(port);
app.use(bodyParser());

// CORS header security off.
// TODO: !!!!IMPORTANT!!!! When we have specific domain we MUST enable it!
app.all('/*', function(req, res, next) {
    // we allow everyone to make calls ( we can easy block it to single domain where it is deployed )
    res.header("Access-Control-Allow-Origin", "*");
    // allow all methods
    // TODO: OPTIONS is not implemented to return all options. Do it!
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // allow the request for the scripts
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    // we call the real root
    next();
});
// when we call from the fetcher service we return the products
app.get('/api/products', function(req, res) {
    dbFinder.fetchAllProducts(req, res);
});
// when we call from the fetcher service we send product
app.put('/api/products', function(req, res) {
    if(validator.validate(req.body.loginData)) {
        dbUpdator.updateProduct(req.body.product, res);
    }
});
// when we call from the fetcher service we send id and we delete the product
app.delete('/api/products', function(req, res) {
    var loginData = {
        username: req.param('username'),
        password: req.param('password')
    };
    if(validator.validate(loginData)) {
        dbUpdator.deleteProduct(req.param('product'), res);
    }
});
// when we call from the fetcher service we return the categories
app.get('/api/categories', function(req, res) {
    dbFinder.fetchAllCategories(req, res);
});
// when we call from the fetcher service we send array with categories and we update them all
app.put('/api/categories', function(req, res) {
    if(validator.validate(req.body.loginData)) {
        dbUpdator.updateCategories(req.body.categories, res);
    }
});
// when we call from the fetcher service we send id and we delete the category ( whitout ) deleting the products
app.delete('/api/categories', function(req, res) {
    var loginData = {
        username: req.param('username'),
        password: req.param('password')
    };
    if(validator.validate(loginData)) {
        dbUpdator.deleteCategory(req.param('category'), res);
    }
});
// when we call from the fetcher service we return the products and categories
app.get('/api/productsAndCategories', function(req, res) {
    dbFinder.fetchAllProductsAndCategories(req, res);
});
// when we call from the fetcher service we return all messages
app.get('/api/message', function(req, res) {
    var loginData = {
        username: req.param('username'),
        password: req.param('password')
    };
    if(validator.validate(loginData)) {
        dbFinder.fetchAllMessages(req, res);
    }
});
// when we call from the fetcher service we recieve the message, save it to the db and send back status
app.post('/api/message', function(req, res) {
    dbUpdator.saveMessage(req, res);
});
// when we want to delete message
// status: Working correctly
app.delete('/api/message', function(req, res) {
    var loginData = {
        username: req.param('username'),
        password: req.param('password')
    };
    if(validator.validate(loginData)) {
        dbUpdator.deleteMessage(req.param('message'), res);
    }
});
// used to log in as administrator
app.post('/api/admin/login', function(req, res) {
    if(validator.validate(req.body)) {
        res.json(200, {
            'success': true,
            'reason': null
        });
    } else {
        res.json(404, {
            'success': false,
            'reason': 'Wrong Data'
        });
    }
});

console.log('Server is UP at ' + port);
