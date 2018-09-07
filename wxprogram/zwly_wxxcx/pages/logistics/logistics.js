// pages/logistics/logistics.js
var API_LOGISTICS = require("../../api/api.logistics"),
    API_ORDER = require("../../api/api.order"),
    app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logistics:{},
    order:{},
    orderinfo:{}
  },
  /**
   * 加载
   */
  reload:function(){
    wx.showToast({
      url:"加载中",
      icon:"loading",
      duration:1000
    })
    this.orderinfo()
  },
  /**
   * 订单信息
   */
  orderinfo:function (){
    var obj = this.data.order,
        objs = {},
        that = this
    // console.log(obj)
    API_ORDER.orderinfo(obj).then(function(res){
      // console.log(res)
      objs.number = res.data.logistics_num
      that.setData({
        logistics:objs,
        orderinfo:res.data
      }),
      that.loginfo()
    })
  },
  /**
   * 物流信息
   */
  loginfo: function (){
    var obj = this.data.logistics,
        that = this
    API_LOGISTICS.logisticsinfo(obj).then(function(res){
      // console.log(res)
      that.setData({
        logisinfo:res.data
      }),
      setTimeout(function(){
        wx.hideToast()
      },500)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      order:options,
      imgurl:app.globalData.imgurl
    })
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
    wx.stopPullDownRefresh()
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