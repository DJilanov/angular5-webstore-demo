/**
 * @dbFinder Used to search in the db
 */
(function() {
    // we use it for creation of new object ids
    const ObjectId = require('mongodb').ObjectID;
    const mongoose = require('mongoose');
    const config = require('./config').getConfig();
    const imageUpdator = require('./imageUpdator');
    const nodemailer = require('nodemailer');
    const fs = require('fs');
    let contactTemplate = null;
    let orderTemplate = null;
    let cache = null;

    fs.readFile(__dirname + '/email-templates/order-builded.html', function (err, html) {
        orderTemplate = html.toString();
    });

    fs.readFile(__dirname + '/email-templates/message-builded.html', function (err, html) {
        contactTemplate = html.toString();
    });

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
    // USE SCHEMA!!!
    // creates the orders query that we are going to send to the back-end
    function getOrderQuery(body, res) {
        return {
            'products': body.products,
            'name': body.name,
            'email': body.email,
            'phone': body.phone,
            'message': body.message,
            'moreinfo': body.moreinfo,
            'date': new Date()
        };
    }

    function getCategoryQuery(body) {
        return {
            'link': body.link,
            'name': body.name,
            'products': body.products,
            'shownOnNav': body.shownOnNav,
            'title': body.title,
            'zIndex': body.zIndex
        };
    }

    function getProductQuery(product, files, res) {
        // change the main_image location of all of the currect docs!!!!
        let otherImagesArray = [];
        let main_image = '';
        if(files.other_images !== undefined) {
            files.other_images.forEach(function(element) {
                otherImagesArray.push(element.filename);
            });
        } else {
            otherImagesArray = product.other_images;
        }
        if(files.main_image !== undefined) {
            main_image = files.main_image[0].filename;
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
            zIndex: product.zIndex
        };
    }
    /**
     * @sendOrderEmail Used to send email to our company email using our no reply one
     * @response <order> Contains the order object and sends it to the gmail
     */
    function sendOrderEmail(response) {
        var transporter = nodemailer.createTransport('smtps://' + config.emailUser + '%40gmail.com:' + config.emailPassword + '@smtp.gmail.com');
        var orders = '';
        for(let productCounter = 0; productCounter < response.products.length; productCounter++) {
            orders += '<div><span>' + response.products[productCounter].title + '</span><span> с цена ' + response.products[productCounter].price + '</span></div>';
        }
        var template = orderTemplate.replace('{{email}}', response.email).replace('{{date}}', response.date).replace('{{name}}', response.name).replace('{{phone}}', response.phone).replace('{{message}}', response.message).replace('{{order}}', orders);
        var mailOptions = {
            from: '"Jilanov EOOD 👥" <noreplyjilanov@gmail.com>', // sender address
            to: config.email, // list of receivers
            subject: 'New order recieved ✔', // Subject line
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
     * @sendContactEmail Used to send email to our company email using our no reply one
     * @response <Message> Contains the message object and sends it to the gmail
     */
    function sendContactEmail(response) {
        var transporter = nodemailer.createTransport('smtps://' + config.emailUser + '%40gmail.com:' + config.emailPassword + '@smtp.gmail.com');
        var template = contactTemplate.replace('{{email}}', response.email).replace('{{date}}', response.date).replace('{{name}}', response.name).replace('{{phone}}', response.phone).replace('{{message}}', response.message);
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
     * @saveOrder Used to save the order to the database
     */
    function saveOrder(req, res) {
        var query = getOrderQuery(req.body, res);
        mongoose.connection.db.collection('orders', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.insertOne(query, function(err, docs) {
                var response = Object.assign({
                    id: docs.insertedId.toHexString(),
                    'date': new Date()
                }, req.body);
                if(!err) {
                    sendOrderEmail(response);
                    cache.addOrder(response);
                    returnSuccess(res);
                } else {
                    returnProblem(err, res);
                }
            });
        });
    }
    /**
     * @deleteOrder Used to delete the order from the database
     * @order: order object that is going to be deleted
     */
    function deleteOrder(order, res) {
        order = JSON.parse(order);
        var query = getQuery(order);
        mongoose.connection.db.collection('orders', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.remove(query, function(err, docs) {
                if(!err) {
                    cache.removeOrder(order);
                    returnSuccess(res, message);
                } else {
                    returnProblem(err, res);
                }
            });
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
                    sendContactEmail(response);
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
     * @createCategory Used to create the category to the database
     * @category: category object that is going to be created
     */
    function createCategory(category, res) {
        var query = getQuery(category);
        delete category.new;
        mongoose.connection.db.collection('categories', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.insertOne(category, function(err, docs) {
                if(!err) {
                    category._id = docs.insertedId.toHexString();
                    cache.addCategory(category);
                    returnSuccess(res, category);
                } else {
                    // todo: handle the case when 1 gets broken but the other are correctly set
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
                let update = getCategoryQuery(categoriesArray[counter]);
                if(!collection) {
                    return;
                }
                collection.update(query, update, function(err, docs) {
                    if(!err) {
                        cache.updateCategories(categoriesArray[counter]);
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
                    update._id = product._id;
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
        mongoose.connection.db.collection('products', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.insertOne(update, function(err, docs) {
                if(!err) {
                    update._id = docs.insertedId.toHexString();
                    cache.addProduct(update);
                    returnSuccess(res, update);
                } else {
                    // todo: handle the case when 1 gets broken but the other are correctly set
                    returnProblem(err, res);
                }
            });
        });
    }
    /**
     * @deleteProduct Used to delete the prodtuc from the database
     * @product: product object that is going to be deleted
     */
    function deleteProduct(product, res) {
        product = JSON.parse(product);
        var query = getQuery(product);
        mongoose.connection.db.collection('categories', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.find(query, function(err, docs) {
                if(!err) {
                    cache.removeProduct(product);
                    returnSuccess(res, product);
                } else {
                    returnProblem(err, res);
                }
            });
        });
    }
    /**
     * @deleteProductImage Used to delete the product from the database
     * @product: product object witch image is going to be deleted
     * @image: image that is going to be deleted from the product and if no one else is using it from the server
     */
    function deleteProductImage(product, image, res) {
        image = image;
        product = JSON.parse(product);
        let query = getQuery(product);
        mongoose.connection.db.collection('categories', function(err, collection) {
            if(!collection) {
                return;
            }
            let products = cache.getProductsByImage(image);
            if(products.length > 1) {
                // we just delete the image from the product
                removeImage(product, image);
                updateProduct(product, {}, res);
            } else if(products.length == 1) {
                // we delete the image from the product and we delete the image
                removeImage(product, image);
                // TODO: delete the image from the FS
                updateProduct(product, {}, res);
            } else {
                // TODO: Move that message to error message enum. Its place is not here!!!
                returnProblem('The image is not in the back-end', res);
            }
            
        });
    }

    function removeImage(product, image) {
        if(product.main_image == image) {
            product.main_image = '';
        }
        if(product.other_images.indexOf(image) !== -1) {
            var x = [];
            x.filter
            product.other_images.filter(function(other_image) {
                if(other_image !== image) {
                    return other_image;
                }
            });
        }
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
        res.json(200, {
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
        res.json(400, {
            done: false,
            reason: err
        });
    }

    function copyImages(files) {
        if(files.main_image) {
            imageUpdator.resizeImage(files.main_image[0]);
        }
        if(files.other_images) {
            for(let otherImagesCounter = 0; otherImagesCounter < files.other_images.length; otherImagesCounter++) { 
                imageUpdator.resizeImage(files.other_images[otherImagesCounter]);
            }
        }
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
        copyImages: copyImages,
        updateProduct: updateProduct,
        createProduct: createProduct,
        deleteProduct: deleteProduct,
        deleteProductImage: deleteProductImage,
        saveOrder: saveOrder,
        deleteOrder: deleteOrder,
        saveMessage: saveMessage,
        deleteMessage: deleteMessage,
        createCategory: createCategory,
        deleteCategory: deleteCategory,
        updateCategories: updateCategories,
    };
}());
