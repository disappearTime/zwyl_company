var NETWORK = require("network.js"),
    CONFIG = require("../config/config.js");
function mycouponlist(e){
    return NETWORK(CONFIG.API_HOST,"/usercoupons.list",e);
}
function couponlist(e){
    return NETWORK(CONFIG.API_HOST,"/coupons.list",e);
}
function getcoupon(e){
    return NETWORK(CONFIG.API_HOST,"/usercoupons.get",e);    
}
function editcoupon(e){
    return NETWORK(CONFIG.API_HOST,"/usercoupons.edit",e); 
}
module.exports = {
    mycouponlist:mycouponlist,
    couponlist:couponlist,
    getcoupon:getcoupon,
    editcoupon:editcoupon
}