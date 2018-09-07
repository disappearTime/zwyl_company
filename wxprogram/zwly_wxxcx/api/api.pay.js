var NETWORK = require("network.js"),
    CONFIG = require("../config/config.js");
function wxpay(e){
    return NETWORK(CONFIG.API_HOST,"/wxpay/example/jsapi.php",e);
}
module.exports = {
    wxpay:wxpay
}