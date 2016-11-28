/**
 * @cache Used to cache the data from the db for faster and easier workflow
 */
(function() {
    var messages = [];
    var products = [];
    var categories = [];
    /**
     * @getMessages it returns all of the messages that are currently cached
     */
    function getMessages() {
        return messages;
    }
    /**
     * @setMessages it sets messages to the cache
     */
    function setMessages(newMessages) {
        messages = newMessages;
    }
    /**
     * @setMessages it add message to the cache
     */
    function addMessage(message) {
        messages.push(message);
    }
    /**
     * @removeMessage it removes message from the cache
     */
    function removeMessage(message) {
        for(var messagesCounter = 0; messagesCounter < messages.length; messagesCounter++) {
            if(messages[messagesCounter]._id.toString() == message._id) {
                messages.splice(messagesCounter, 1);
                break;
            }
        }
    }
    /**
     * @getProducts it returns all of the messages that are currently cached
     */
    function getProducts() {
        return products;
    }
    /**
     * @setProducts it sets messages to the cache
     */
    function setProducts(newProducts) {
        products = newProducts;
    }
    /**
     * @addProduct it add product to the cache
     */
    function addProduct(product) {
        products.push(product);
    }
    /**
     * @updateProduct it updates product to the cache
     */
    function updateProduct(product) {
        for(var productsCounter = 0; productsCounter < products.length; productsCounter++) {
            if(products[productsCounter]._id.toString() == product._id) {
                products[productsCounter] = product;
                break;
            }
        }
    }
    /**
     * @removeCategory it removes category from the cache
     */
    function removeProduct(category) {
        for(var productsCounter = 0; productsCounter < products.length; productsCounter++) {
            if(products[productsCounter]._id.toString() == product._id) {
                products.splice(productsCounter, 1);
                break;
            }
        }
    }
    /**
     * @getCategories it returns all of the messages that are currently cached
     */
    function getCategories() {
        return categories;
    }
    /**
     * @setCategories it sets categories to the cache
     */
    function setCategories(newCategories) {
        categories = newCategories
    }
    /**
     * @addCategory it add category to the cache
     */
    function addCategory(category) {
        categories.push(category);
    }
    /**
     * @setCategories it updates categories to the cache
     */
    function updateCategories(category) {
        for(var categoriesCounter = 0; categoriesCounter < categories.length; categoriesCounter++) {
            if(categories[categoriesCounter]._id.toString() == category._id) {
                categories[categoriesCounter] = category;
                break;
            }
        }
    }
    /**
     * @removeCategory it removes category from the cache
     */
    function removeCategory(category) {
        for(var categoriesCounter = 0; categoriesCounter < categories.length; categoriesCounter++) {
            if(categories[categoriesCounter]._id.toString() == category._id) {
                categories.splice(categoriesCounter, 1);
                break;
            }
        }
    }

    module.exports = {
        addProduct: addProduct,
        getProducts: getProducts,
        setProducts: setProducts,
        updateProduct: updateProduct,
        removeProduct: removeProduct,

        addMessage: addMessage,
        getMessages: getMessages,
        setMessages: setMessages,
        removeMessage: removeMessage,

        addCategory: addCategory,
        getCategories: getCategories,
        setCategories: setCategories,
        removeCategory: removeCategory,
        updateCategories: updateCategories
    };
}());
