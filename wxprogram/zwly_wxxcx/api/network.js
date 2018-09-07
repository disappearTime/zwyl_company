var JKENCRYPT = require("../utils/jkencrypt.js")

module.exports = function(h,u,d){
    let promise = new Promise(function(resolve , rejiect){
        var sign = JKENCRYPT(u)
        if(d==undefined){
            d={}
        }
        // console.log(d)
        d.sign = sign
        // console.log(d)
        wx.request({
            url: h + u,
            data: d,
            method: 'post',
            header:{
                'content-type':"application/x-www-form-urlencoded"
            },
            dataType:"json",
            success: function (res) {
                resolve(res.data);
            },
            fail: function (res) {
                reject(res);
            },
        })
    })
    return promise
}

