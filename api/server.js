/**
 * @server Used to declare the server and set all back-end functionallity
 */

// call the packages we need
const express = require('express'); // call express
// we set the multer
const multer  = require('multer');
const fs = require('fs');
const config = require('./config').getConfig();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../img/')
  },
  filename: function (req, file, cb) {
    let name = file.originalname.replace('.jpg', '.png');
    cb(null, name) //Appending .png
  }
});
const upload = multer({ storage: storage });
const bodyParser = require('body-parser');
// here we declare all functions we use for the standart user interface
const cache = require('./cache');
const dbFinder = require('./dbFinder');
const dbUpdator = require('./dbUpdator');
const imageUpdator = require('./imageUpdator');
const dbMigrationHelper = require('./dbMigrationHelper');
const validator = require('./validator');
// we connect to the db using the credentials and fetch the db localy
dbFinder.connectDb();
dbFinder.setCache(cache);
dbUpdator.connectDb();
dbUpdator.setCache(cache);
// define our app using express
const app = express();
// this will let us get nv.PORT || 8080;        // set our port
const port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); // get an instance of the express Router
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
// USED ONLY FOR TESTING PURPOSES. REMOVE IT WHEN RDY

app.get('/api/test', function(req, res) {
    // imageUpdator.optimiseImages(req, res);
    dbMigrationHelper.changeMainImageField();
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
// when we call from the fetcher service we send product
var cpUpload = upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'other_images', maxCount: 8 }]);
app.post('/api/products', cpUpload, function(req, res) {
    let data = JSON.parse(req.body.body);
    let loginData = {
        username: data.username,
        password: data.password
    };
    if(validator.validate(loginData)) {
        if(data.product._id !== undefined) {
            dbUpdator.updateProduct(data.product, req.files, res);
        } else {
            dbUpdator.createProduct(data.product, req.files, res);
        }
        dbUpdator.copyImages(req.files);

    }
});
// when we call from the fetcher service we send id and we delete the product
app.delete('/api/products', function(req, res) {
    let loginData = {
        username: req.param('username'),
        password: req.param('password')
    };
    if(validator.validate(loginData)) {
        dbUpdator.deleteProduct(req.param('product'), res);
    }
});
// when we call from the fetcher service we send id and we delete the product
app.delete('/api/productImage', function(req, res) {
    let loginData = {
        username: req.param('username'),
        password: req.param('password')
    };
    if(validator.validate(loginData)) {
        dbUpdator.deleteProductImage(req.param('product'), req.param('image'), res);
    }
});
// when we call from the fetcher service we return the categories
// status: Working correctly
app.get('/api/categories', function(req, res) {
    dbFinder.fetchAllCategories(req, res);
});
// when we call from the fetcher service we send categorъ and we create it
// status: needs test
app.post('/api/categories', function(req, res) {
    if(validator.validate(req.body.loginData)) {
        dbUpdator.createCategory(req.body.category, res);
    }
});
// when we call from the fetcher service we send array with categories and we update them all
// status: needs test
app.put('/api/categories', function(req, res) {
    if(validator.validate(req.body.loginData)) {
        dbUpdator.updateCategories(req.body.categories, res);
    }
});
// when we call from the fetcher service we send id and we delete the category WHITOUT deleting the products
// status: needs test
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
// status: Working correctly
app.get('/api/productsAndCategories', function(req, res) {
    dbFinder.fetchAllProductsAndCategories(req, res);
});
// when we call from the fetcher service we return all messages
// status: Working correctly
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
// status: Working correctly
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
// when we call from the fetcher service we recieve the order, save it to the db and send back status
// status: Working correctly
app.post('/api/order', function(req, res) {
    dbUpdator.saveOrder(req, res);
});
// when we want to delete order
// status: Needs testing
app.delete('/api/order', function(req, res) {
    var loginData = {
        username: req.param('username'),
        password: req.param('password')
    };
    if(validator.validate(loginData)) {
        dbUpdator.deleteMessage(req.param('message'), res);
    }
});
// used to log in as administrator
// status: Working correctly
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
