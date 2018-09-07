// pages/mine/mine.js
var app = getApp(),
  API_ORDER = require("../../api/api.order")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ""
  },
  /**
   * 地址管理
   */
  gosite: function () {
    wx.navigateTo({
      url: "../site/site"
    })
  },
  /**
   * 领取优惠券
   */
  gogetcoupon: function(){
    wx.navigateTo({
      url:"/pages/getcoupon/getcoupon"
    })
  },
  /**
   * 我的订单
   */
  goorder: function (e) {
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: "../myorder/myorder?index=" + index
    })
  },
  /**
   * 用户信息
   */
  userinfo: function (res) {
    // console.log(res)
    if (res.detail.userInfo) {
      var ui = wx.getStorageSync("ui"),
        userinfo = res.detail.userInfo

      ui.nickName = userinfo.nickName,
        ui.avatarUrl = userinfo.avatarUrl
      wx.setStorageSync("ui", ui),
        this.reload()
    }

  },
  /**
   * 我的优惠券
   */
  gocoupon:function(){
    wx.navigateTo({
      url:"../coupon/coupon"
    })
  },
  /**
   * 技术支持
   */
  sustain: function () {
    console.log(1)
    //  wx.navigateTo({
    //   url:"/pages/mine/document/download/download"
    // })
    wx.downloadFile({
        url: 'https://admin.shop.zhicloud.net/images/pdf/zhiwangpdf.pdf',
      success: function (res) {
        console.log(res)
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail:function(res){
            console.log(res)
          }
        })
      },
      fail:function(){
        console.log("下载失败")
      }
    })
  },
  /**
   * 订单数量
   */
  
  /**
   * 待付款
   */
  fk:function(){
    var obj = {},
        that = this
    obj.user_id = wx.getStorageSync("ui").user_id,
    obj.is_delete = "1"
    obj.pay_status = "0"
    obj.order_status = "1"
    API_ORDER.orderlist(obj).then(function(res){
      // console.log(res.data)
      if(res.status != 1){
        res.data = {},
        res.data.total = 0
      }
      that.setData({
        dfknum:res.data.total
      })
    })
  },
  /**
   * 待发货
   */
  fh:function(){
    var obj = {},
        that = this
    obj.user_id = wx.getStorageSync("ui").user_id,
    obj.is_delete = "1"
    obj.pay_status = "1"
    obj.order_status = "1"
    API_ORDER.orderlist(obj).then(function(res){
      // console.log(res.data)
      if(res.status != 1){
        res.data = {},
        res.data.total = 0
      }      
      that.setData({
        dfhnum:res.data.total
      })
    })
  },
  /**
   * 待收货
   */
  sh:function(){
    var obj = {},
        that = this
    obj.user_id = wx.getStorageSync("ui").user_id,
    obj.is_delete = "1"
    obj.pay_status = "1"
    obj.order_status = "3"
    API_ORDER.orderlist(obj).then(function(res){
      // console.log(res)
      if(res.status != 1){
        res.data = {},
        res.data.total = 0
      }
      that.setData({
        dshnum:res.data.total
      })
    })
  },
  /**
   * 已完成
   */
  ywc: function(){
    var obj = {},
        that = this
    obj.user_id = wx.getStorageSync("ui").user_id,
    obj.is_delete = "1"
    obj.pay_status = "1"
    obj.order_status = "4"
    API_ORDER.orderlist(obj).then(function(res){
      // console.log(res)
      if(res.status != 1){
        res.data = {},
        res.data.total = 0
      }
      that.setData({
        ywcnum:res.data.total
      })
    })
  },
  /**
   * 加载
   */
  reload: function () {
    var ui = wx.getStorageSync("ui")
    wx.showToast({
      title: "加载中",
      icon: "loading",
      duration: 3e5
    })
    if (ui.nickName) {
      this.setData({
        userinfo: ui
      })
    }
    this.fk(),
    this.sh(),
    this.fh(),
    this.ywc(),
    setTimeout(function () {
      wx.hideToast()
    }, 500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData)
    this.reload()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.reload()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.reload(), wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})