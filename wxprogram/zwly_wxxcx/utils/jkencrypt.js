var MD5 = require("md5.js"),
    time = Date.parse(new Date()) / 1000

module.exports = function(e){
    return MD5.hexMD5(time + e +"zhiwangyilian")
}