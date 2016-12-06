/**
 * @dbFinder Used to search in the db
 */
(function() {
    // we use it for creation of new object ids
    var ObjectId = require('mongodb').ObjectID;
    var mongoose = require('mongoose');
    var config = require('./config').getConfig();
    // database arrays
    var products = [];
    var categories = [];
    var messages = [];
    var cache = {};

    /**
     * @setCache set the cache as local variable
     * @cache {Object} The cache object
     */
    function setCache(cacheModule) {
        cache = cacheModule;
    }
    /**
     * @fetchAllProductsAndCategories it returns all the categories and products
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function fetchAllProductsAndCategories(req, res) {
        var response = {
            products: cache.getProducts(),
            categories: cache.getCategories()
        }
        res.json(response);
    }
    /**
     * @fetchAllProducts It fetch all the products from the back-end
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function fetchAllProducts(req, res) {
        res.json(cache.getProducts());
    }
    /**
     * @fetchAllCategories It fetch all the categories from the back-end
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function fetchAllCategories(req, res) {
        res.json(cache.getCategories());
    }
    /**
     * @fetchAllMessages It fetch all the messages from the back-end
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function fetchAllMessages(req, res) {
        res.json(cache.getMessages());
    }
    /**
     * @find It searches in the back-end by query
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function find(req, res) {
        // we build the search query
        var parameter = buildSearchParam(req.query);
        console.log('[dbFinder:find] Searching for ' + JSON.stringify(parameter));
        mongoose.connection.db.collection('worklogs', function(err, collection) {
            collection.find(parameter).toArray(function(err, docs) {
                buildResponse(docs, res);
            });
        });
    }
    /**
     * @buildSearchParam It builds the searching query
     * @req {Object} The query from the front-end
     * @parameter {Object} The query for the db
     */
    function buildSearchParam(parameters) {
        var query = {};
        // TODO: REMOVE THE PARSE INT
        // date started
        var from_date = new Date(parseInt(parameters['worklog_started']));
        from_date.setHours(0, 0, 0, 000);
        from_date = +from_date;
        // date end
        var to_date = new Date(parseInt(parameters['logged_untill']));
        to_date.setHours(23, 59, 59, 999);
        to_date = +to_date;
        // the query we will send
        query['$and'] = [];
        if (parameters.fullName.length > 1) {
            query['$and'].push({
                "fullName": parameters.fullName
            })
        }
        if (parameters.issue_name.length > 1) {
            query['$and'].push({
                $or: [
                    { "issue_name": parameters.issue_name },
                    { "issue_parent": parameters.issue_name },
                    { "issue_epic": parameters.issue_name }
                ]
            })
        }
        if (parameters.worklog_started.length > 1) {
            query['$and'].push({
                "worklog_started": {
                    $gte: parseInt(from_date)
                }
            })
            query['$and'].push({
                "worklog_started": {
                    $lte: parseInt(to_date)
                }
            })
        }
        console.log('Builded query for the db: ' + JSON.stringify(query));
        return query;
    }
    /**
     * @buildResponse We gather the data and build the response structure that is expected in the front-end
     * @docs {Object} The results from the db
     * @resource {Object} The response object
     */
    function buildResponse(docs, resource) {
        var result = buildResponseStructure(docs);
        resource.json(result);
    }
    /**
     * @buildResponseStructure Build the response structure that is expected in the front-end
     * @results {Object} The results from the db
     */
    function buildResponseStructure(results) {

        return response;
    }
    /**
     * @connectDb Used to make the connection to the Database
     */
    function connectDb() {
        // we cache the product list when we open the back-end for faster working speed
        mongoose.connection.on('connected', function() {
            console.log('[dbConnector]Mongoose default connection open');
            mongoose.connection.db.collection('products', function(err, collection) {
                collection.find().toArray(function(err, products) {
                    cache.setProducts(products);
                });
            });
            mongoose.connection.db.collection('categories', function(err, collection) {
                collection.find().toArray(function(err, categories) {
                    cache.setCategories(categories);
                });
            });
            mongoose.connection.db.collection('messages', function(err, collection) {
                collection.find().toArray(function(err, messages) {
                    cache.setMessages(messages);
                });
            });
            mongoose.connection.db.collection('orders', function(err, collection) {
                collection.find().toArray(function(err, orders) {
                    cache.setOrders(orders);
                });
            });
        });

        // If the connection throws an error
        mongoose.connection.on('error', function(err) {
            console.log('[dbConnector]Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function() {
            console.log('[dbConnector]Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function() {
            mongoose.connection.close(function() {
                console.log('[dbConnector]Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
        // get database
        mongoose.connect(config.dbAddress);
    }

    module.exports = {
        find: find,
        setCache: setCache,
        connectDb: connectDb,
        fetchAllMessages: fetchAllMessages,
        fetchAllProducts: fetchAllProducts,
        fetchAllCategories: fetchAllCategories,
        fetchAllProductsAndCategories: fetchAllProductsAndCategories
    };
}());
