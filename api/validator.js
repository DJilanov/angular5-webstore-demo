/**
 * @validator Used to validate the data from the login form in the admin panel
 */
(function() {
    var config = require('./config').getConfig();
    /**
     * @validate it returns boolean for is the request sended by the admin user
     * @userData {Object} The user login information from the front-end
     */
    function validate(userData) {
        // just for development time
        return ((userData.username == config.adminUser) && (userData.password == config.adminPassword));
    }

    module.exports = {
        validate: validate
    };
}());
