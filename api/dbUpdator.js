/**
 * @dbFinder Used to search in the db
 */
(function() {
    // we use it for creation of new object ids
    var ObjectId = require('mongodb').ObjectID;
    var mongoose = require('mongoose');
    var config = require('./config').getConfig();
    var cache = null;

    /**
     * @setCache set the cache as local variable
     * @cacheModule {Object} The cache module
     */
    function setCache(cacheModule) {
        cache = cacheModule;
    }
    // USE SCHEMA!!!
    // creates the message query that we are going to send to the back-end
    function getMessageQuery(body, res) {
        return {
            'name': body.name,
            'email': body.email,
            'phone': body.phone,
            'message': body.message,
            'date': new Date()
        };
    }
    // we fetch the latest collection and we send the message
    function saveMessage(req, res) {
        var query = getMessageQuery(req.body, res);
        mongoose.connection.db.collection('messages', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.insertOne(query, function(err, docs) {
                var response = Object.assign({
                    id: docs.insertedId.toHexString(),
                    'date': new Date()
                }, req.body);
                if(!err) {
                    cache.addMessage(response);
                    returnSuccess(res);
                } else {
                    returnProblem(err, res);
                }
            });
        });
    }
    /**
     * @connectDb Used to delete the message from the database
     */
    function deleteMessage(req, res) {
        var querry = {
            "_id": ObjectId(form._id)
        };
        var secondaryQuerry = {
            'name': element.form.name,
            'email': element.form.email,
            'phone': element.form.phone,
            'message': element.form.message,
            'date': new Date(),
            'type': "message"
        };
    }

    function updateCategories(categoriesArray, res) {
        mongoose.connection.db.collection('messages', function(err, collection) {
            for(let counter = 0; counter < categoriesArray.length; counter++) {
                let query = getQuery(categoriesArray[counter]);
                let update = categoriesArray[counter];
                if(!collection) {
                    return;
                }
                console.log(query);
                console.log(update);
                collection.update(query, update, function(err, docs) {
                    if(!err) {
                        cache.updateCategories(update);
                        // we return when all are sended and finished
                        if(counter == categoriesArray.length - 1) {
                            returnSuccess(res, categoriesArray);
                        }
                    } else {
                        // todo: handle the case when 1 gets broken but the other are correctly set
                        returnProblem(err, res);
                    }
                });
            }
        });
    }

    function getQuery(el) {
        return {
            "_id": ObjectId(el._id)
        };
    }

    /**
     * @returnSuccess returns success data to the front-end
     * @res {Object} The res to the front-end
     * @response {Object} The response from the database
     */
    function returnSuccess(res, response) {
        res.json({
            done: true,
            reason: null,
            response: response
        });
    }

    /**
     * @returnProblem Returns the error to the front-end ( when delete non existing user or there is some problem )
     * @err {Object} Error object from the database
     * @res {Object} The res to the front-end
     * @info There were 2 options: return 4** with error body or return 200 with reason. I chouse 200 becouse there is no problem
     *          with the back-end... there is problem with your call.. 4** must be returned if there is problem with the API
     */
    function returnProblem(err, res) {
        res.json({
            done: false,
            reason: err
        });
    }

    /**
     * @connectDb Used to make the connection to the Database
     */
    function connectDb() {
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
        setCache: setCache,
        connectDb: connectDb,
        saveMessage: saveMessage,
        updateCategories: updateCategories
    };
}());
