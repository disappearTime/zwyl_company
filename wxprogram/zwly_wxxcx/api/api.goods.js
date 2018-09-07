var NETWORK = require("network.js"),
    CONFIG = require("../config/config.js");
function goodslist(e){
    return NETWORK(CONFIG.API_HOST,"/goods.list",e);
}
function swiperlist(e){
    return NETWORK(CONFIG.API_HOST,"/advertising.lists",e);
}
function goodsinfo(e){
    return NETWORK(CONFIG.API_HOST,"/goods.info",e);
}
module.exports = {
    goodslist:goodslist,
    swiperlist:swiperlist,
    goodsinfo:goodsinfo
}