var NETWORK = require("network.js"),
    CONFIG = require("../config/config.js");
function keywords(e){
    return NETWORK(CONFIG.API_HOST,"/keywords.list",e);
}

module.exports = {
    keywords:keywords
}