var NETWORK = require("network.js"),
    CONFIG = require("../config/config.js");
function sitelist(e){
    return NETWORK(CONFIG.API_HOST,"/user.addrlist",e);
}
function addsite(e){
    return NETWORK(CONFIG.API_HOST,"/user.address",e);    
}
function editsite(e){
    return NETWORK(CONFIG.API_HOST,"/user.addredit",e);    
}
function region(e){
    return NETWORK(CONFIG.API_HOST,"/region.list",e);        
}
function sitedel(e){
    return NETWORK(CONFIG.API_HOST,"/user.addrdelete",e);        
}
function editdefault(e){
    return NETWORK(CONFIG.API_HOST,"/user.addrdefault",e);            
}

module.exports = {
    sitelist:sitelist,
    addsite:addsite,
    region:region,
    editsite:editsite,
    sitedel:sitedel,
    editdefault:editdefault
}