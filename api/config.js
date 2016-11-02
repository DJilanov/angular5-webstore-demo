// used as container for the main constants of the back-end
(function() {
    var config = {
        // official db
        dbAddress: 'mongodb://admin:toniadmin@ds029207.mlab.com:29207/toni-website-new',
        // user for the website
        adminUser: 'toni-website',
        adminPassword: 'toni1221',
        // used for the back-end
        dbUser: 'admin',
        dbPassword: 'toniadmin'
    };
    // exporting function of the config object
    function getConfig() {
        return config;
    }

    module.exports = {
        getConfig: getConfig
    };
}());
