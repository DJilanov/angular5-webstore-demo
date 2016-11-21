/**
 * @dbFinder Used to search in the db
 */
(function() {
    // we use it for creation of new object ids
    var ObjectId = require('mongodb').ObjectID;
    var mongoose = require('mongoose');
    var config = require('./config').getConfig();
    var valueForSearch = null;
    // USE SCHEMA!!!

    /**
     * @connectDb Used to make the message and send it to the database
     */
    function recieveMessage(req, res) {
        var query = getMessageQuery(req.body, res);
        saveMessage(query);
        res.json({
            recieved: true
        });
    }
    // creates the message query that we are going to send to the back-end
    function getMessageQuery(body, res) {
        var query = {
            'name': body.name,
            'email': body.email,
            'phone': body.phone,
            'message': body.message,
            'date': new Date()
        };
    }
    // we fetch the latest collection and we send the message
    function saveMessage(query) {
        mongoose.connection.db.collection('messages', function(err, collection) {
            collection.insertOne(query, messageCallback);
        });
    }
    // fired after we save the message and we save it to the cache in the back-end for easier fetches
    function messageCallback(a,b,c,d) {
        debugger;
    }
    /**
     * @connectDb Used to delete the message from the database
     */
    function deleteMessage(req, res) {
        var querry = {
            "_id": ObjectId(form._id)
        };
        var secondaryQuerry = {
            $set: {
                'name': element.form.name,
                'email': element.form.email,
                'phone': element.form.phone,
                'message': element.form.message,
                'date': new Date(),
                'type': "message"
            }
        };
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
        connectDb: connectDb,
        recieveMessage: recieveMessage
    };
}());
