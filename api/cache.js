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
     * @getCategories it returns all of the messages that are currently cached
     */
    function getCategories() {
        return categories;
    }
    /**
     * @setCategories it sets messages to the cache
     */
    function setCategories(newCategories) {
        categories = newCategories
    }

    module.exports = {
        getProducts: getProducts,
        setProducts: setProducts,
        addMessage: addMessage,
        getMessages: getMessages,
        setMessages: setMessages,
        getCategories: getCategories,
        setCategories: setCategories
    };
}());
