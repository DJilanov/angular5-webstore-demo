/**
 * @cache Used to cache the data from the db for faster and easier workflow
 */
(function() {
    var messages = [];
    var products = [];
    var categories = [];
    var orders = [];
    /**
     * @getOrders it returns all of the orders that are currently cached
     */
    function getOrders() {
        return orders;
    }
    /**
     * @setOrders it sets Orders to the cache
     */
    function setOrders(newOrder) {
        orders = newOrder;
    }
    /**
     * @addOrders it add Orders to the cache
     */
    function addOrder(order) {
        orders.push(order);
    }
    /**
     * @removeOrders it removes Orders from the cache
     */
    function removeOrder(order) {
        for(var orderCounter = 0; orderCounter < orders.length; orderCounter++) {
            if(orders[orderCounter]._id.toString() == order._id) {
                orders.splice(orderCounter, 1);
                break;
            }
        }
    }
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
     * @getProductsByImage it returns all of the products that has that image
     */
    function getProductsByImage(image) {
        let array = [];
        for(let productsCounter = 0; productsCounter < products.length; productsCounter++) {
            if((products[productsCounter].main_image == image) || (products[productsCounter].other_images.indexOf(image) !== -1)) {
                array.push(products[productsCounter]);
            }
        }
        return array;
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
     * @removeCategory it removes product from the cache
     */
    function removeProduct(product) {
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
        getProductsByImage: getProductsByImage,

        addOrder: addOrder,
        getOrders: getOrders,
        setOrders: setOrders,
        removeOrder: removeOrder,

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
