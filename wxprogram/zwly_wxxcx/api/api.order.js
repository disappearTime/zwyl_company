var NETWORK = require("network.js"),
    CONFIG = require("../config/config.js");
function orderlist(e){
    return NETWORK(CONFIG.API_HOST,"/order.list",e);
}
function addorder(e){
    return NETWORK(CONFIG.API_HOST,"/order.add",e);    
}
function editorder(e){
    return NETWORK(CONFIG.API_HOST,"/order.edit",e);
}
function orderinfo(e){
    return NETWORK(CONFIG.API_HOST,"/order.orderinfo",e);    
}
module.exports = {
    orderlist:orderlist,
    addorder:addorder,
    editorder:editorder,
    orderinfo:orderinfo
}