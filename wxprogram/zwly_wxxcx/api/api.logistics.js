var NETWORK = require("network.js"),
    CONFIG = require("../config/config.js");
function logisticsinfo(e) {
    return NETWORK(CONFIG.API_HOST,"/logistics.info",e);
}
module.exports = {
    logisticsinfo:logisticsinfo
}