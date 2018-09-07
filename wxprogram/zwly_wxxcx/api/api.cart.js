var NETWORK = require("network.js"),
    CONFIG = require("../config/config.js");
function cartlist(e){
    return NETWORK(CONFIG.API_HOST,"/cart.list",e);
}
function addcart(e){
    return NETWORK(CONFIG.API_HOST,"/cart.add",e);    
}
function cartdel(e){
    return NETWORK(CONFIG.API_HOST,"/cart.cartdelete",e);    
}
function editcart (e) {
    return NETWORK(CONFIG.API_HOST,"/cart.cartedit",e);
}

module.exports = {
    cartlist:cartlist,
    addcart:addcart,
    cartdel:cartdel,
    editcart:editcart
}