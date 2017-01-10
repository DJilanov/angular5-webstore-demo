/**
 * @imageUpdator Used to update database based on our needs
 */
(function() {
    const mongoose = require('mongoose');
    const ObjectId = require('mongodb').ObjectID;
    function changeMainImageField() {
        mongoose.connection.db.collection('products', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.find().toArray(function(err, docs) {
                for(let counter = 0; counter < docs.length; counter++) {
                    if(!docs[counter].main_image.length) {
                        return;
                    }
                    docs[counter].main_image = docs[counter].main_image.replace('/img/', '/');
                    delete docs[counter]._id;
                    debugger;
                    collection.update({
                        "_id": ObjectId(docs[counter]._id)
                    }, docs[counter], function(err, docs) {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log(docs[counter]);
                        }
                    });
                }
            });
        });
    }
    module.exports = {
        changeMainImageField: changeMainImageField
    };
}());