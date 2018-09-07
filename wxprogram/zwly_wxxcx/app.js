//app.js
var CONFIG = require("/config/config"),
     API = require("./api/api.wxlogin")
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
        this.openid(res.code)
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     // console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       // console.log(1)
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // console.log(res)
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  openid: function(e){
    var _this = this
    // console.log(e)
    API.wechat({appid:CONFIG.appid,secret:CONFIG.secret,code:e}).then(res => {
      // console.log(res)
      _this.wxlogin(res.openid)
    })
  },
  wxlogin: function (e) {
    var obj = wx.getStorageSync("ui") ? wx.getStorageSync("ui") : {}
    API.wxlogin({openid:e}).then(function(res){
      // console.log(res)
      obj.user_id = res.data.user_id
      // console.log(obj)
      wx.setStorageSync("ui",obj)
    })
  },
  globalData: {
    userInfo: null,
    imgurl:CONFIG.IMG_HOST
  }
})