/**
 * @server Used to declare the server and set all back-end functionallity
 */

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
// here we declare all functions we use for the standart user interface
var dbUpdator = require('./dbUpdator');
var dbFinder = require('./dbFinder');
// we connect to the db using the credentials and fetch the db localy
dbFinder.connectDb();
dbUpdator.connectDb();
// this will let us get nv.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================

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
// when we call from the fetcher service we return the result
app.get('/api/getProducts', function(req, res) {
    dbFinder.fetchAllProducts(req, res);
});
// when we call from the fetcher service we return the result
app.get('/api/getCategories', function(req, res) {
    dbFinder.fetchAllCategories(req, res);
});

console.log('Server is UP at ' + port);