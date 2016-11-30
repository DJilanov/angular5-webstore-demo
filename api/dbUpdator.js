/**
 * @dbFinder Used to search in the db
 */
(function() {
    // we use it for creation of new object ids
    var ObjectId = require('mongodb').ObjectID;
    var mongoose = require('mongoose');
    var config = require('./config').getConfig();
    var nodemailer = require('nodemailer');
    var fs = require('fs');
    var im = require('imagemagick');
    var emailTemplate = null;

    fs.readFile('./email-templates/message-builded.html', function (err, html) {
        emailTemplate = html.toString();
    });

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

    function getProductQuery(product, files, res) {
        let otherImagesArray = [];
        let main_image = '';
        if(files.other_images !== undefined) {
            files.other_images.forEach(function(element) {
                otherImagesArray.push(config.productImagesPath + element.filename);
            });
        } else {
            otherImagesArray = product.other_images;
        }
        if(files.main_image !== undefined) {
            main_image = config.productImagesPath + files.main_image[0].filename;
        } else {
            main_image = product.main_image;
        }
        return {
            carousel: product.carousel,
            category: product.category,
            count: product.count,
            daily_offer: product.daily_offer,
            description: product.description,
            is_new: product.is_new,
            link: product.link,
            main_image: main_image,
            make: product.make,
            more_details: product.more_details,
            more_info: product.more_info,
            new_price: product.new_price,
            old_price: product.old_price,
            other_images: otherImagesArray,
            params: product.params,
            rating: product.rating,
            shown: product.shown,
            title: product.title,
            typeahed: product.typeahed,
            zIndex: product.zIndex,
        };
    }

    function sendEmail(response) {
        var transporter = nodemailer.createTransport('smtps://' + config.emailUser + '%40gmail.com:' + config.emailPassword + '@smtp.gmail.com');
        var template = emailTemplate.replace('{{email}}', response.email).replace('{{date}}', response.date).replace('{{name}}', response.name).replace('{{phone}}', response.phone).replace('{{message}}', response.message);
        var mailOptions = {
            from: '"Jilanov EOOD 👥" <noreplyjilanov@gmail.com>', // sender address
            to: config.email, // list of receivers
            subject: 'New message recieved ✔', // Subject line
            text: template, // plaintext body
            html: template // html body
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }
    /**
     * @saveMessage Used to save the message to the database
     */
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
                    sendEmail(response);
                    cache.addMessage(response);
                    returnSuccess(res);
                } else {
                    returnProblem(err, res);
                }
            });
        });
    }
    /**
     * @deleteMessage Used to delete the message from the database
     * @message: message object that is going to be deleted
     */
    function deleteMessage(message, res) {
        message = JSON.parse(message);
        var query = getQuery(message);
        mongoose.connection.db.collection('messages', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.remove(query, function(err, docs) {
                if(!err) {
                    cache.removeMessage(message);
                    returnSuccess(res, message);
                } else {
                    returnProblem(err, res);
                }
            });
        });
    }
    /**
     * @deleteCategory Used to delete the category from the database
     * @category: category object that is going to be deleted
     */
    function deleteCategory(category, res) {
        category = JSON.parse(category);
        var query = getQuery(category);
        mongoose.connection.db.collection('categories', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.remove(query, function(err, docs) {
                if(!err) {
                    cache.removeCategory(category);
                    returnSuccess(res, category);
                } else {
                    returnProblem(err, res);
                }
            });
        });
    }
    /**
     * @updateCategories Used to update the categories to the database
     * @categoriesArray: category array that is going to be updated
     */
    function updateCategories(categoriesArray, res) {
        mongoose.connection.db.collection('categories', function(err, collection) {
            for(let counter = 0; counter < categoriesArray.length; counter++) {
                let query = getQuery(categoriesArray[counter]);
                let update = categoriesArray[counter];
                if(!collection) {
                    return;
                }
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
    /**
     * @updateProduct Used to update the product to the database
     * @product: product that is going to be updated
     */
    function updateProduct(product, files, res) {
        var query = getQuery(product);
        let update = getProductQuery(product, files, res);
        mongoose.connection.db.collection('products', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.update(query, update, function(err, docs) {
                if(!err) {
                    cache.updateProduct(update);
                    returnSuccess(res, update);
                } else {
                    // todo: handle the case when 1 gets broken but the other are correctly set
                    returnProblem(err, res);
                }
            });
        });
    }
    /**
     * @createProduct Used to create product to the database
     * @product: product that will be created
     */
    function createProduct(product, files, res) {
        let update = getProductQuery(product, files, res);
        mongoose.connection.db.collection('messages', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.insertOne(update, function(err, docs) {
                var response = Object.assign({
                    id: docs.insertedId.toHexString(),
                    'date': new Date()
                }, update);
                if(!err) {
                    if(Object.keys(files).length > 0) {
                        setProductImages(response, files);
                    }
                    cache.addMessage(response);
                    returnSuccess(res);
                } else {
                    returnProblem(err, res);
                }
            });
        });
    }
    /**
     * @deleteProduct Used to delete the prodtuc from the database
     * @category: category object that is going to be deleted
     */
    function deleteProduct(category, res) {
        var query = getQuery(category);
        mongoose.connection.db.collection('categories', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.remove(query, function(err, docs) {
                if(!err) {
                    cache.removeProduct(category);
                    returnSuccess(res, category);
                } else {
                    returnProblem(err, res);
                }
            });
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
        updateProduct: updateProduct,
        createProduct: createProduct,
        saveMessage: saveMessage,
        deleteMessage: deleteMessage,
        deleteCategory: deleteCategory,
        updateCategories: updateCategories,
    };
}());
