var NETWORK = require("network.js"),
    CONFIG = require("../config/config.js");
function wxlogin (e) {
    return NETWORK(CONFIG.API_HOST,"/user.wxlogin",e)
}
function wechat (e){
    return NETWORK(CONFIG.API_HOST,"/wechat.info",e)
}
module.exports = {
    wxlogin:wxlogin,
    wechat:wechat
}