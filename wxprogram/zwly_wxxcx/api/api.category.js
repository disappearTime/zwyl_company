var NETWORK = require("network.js"),
    CONFIG = require("../config/config.js");
function category(e){
    return NETWORK(CONFIG.API_HOST,"/category.list",e);
}

module.exports = {
    category:category
}