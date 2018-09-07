// pages/orderinfo/orderinfo.js
var API_ORDER = require("../../api/api.order"),
  API_SITE = require("../../api/api.site"),
  API_PAY = require("../../api/api.pay"),
  app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderinfo: {}
  },
  /**
   * 加载
   */
  reload: function (e) {
    // console.log(e)
    var that = this
    wx.showToast({
      title: "加载中",
      icon: "loading",
      duration: 3e5
    })
    API_ORDER.orderinfo(e).then(function (res) {
      // console.log(res.data)
      var order = res.data
      if(order.is_delete == 2){
        wx.navigateBack({
          delta: 1
        })
      }
      API_SITE.region().then(function (obj) {
        // console.log(obj.data)
        var site = obj.data
        for (var i = 0; i < site.province.length; i++) {
          if (site.province[i].region_id == order.province) {
            order.province_name = site.province[i].region_name
          }
        }
        for (var i = 0; i < site.city.length; i++) {
          if (site.city[i].region_id == order.city) {
            order.city_name = site.city[i].region_name
          }
        }
        for (var i = 0; i < site.district.length; i++) {
          if (site.district[i].region_id == order.district) {
            order.district_name = site.district[i].region_name
          }
        }
        order.instime = that.toDate(order.instime)
        that.setData({
          orderinfo: order,
          imgurl:app.globalData.imgurl
        }),
          setTimeout(function () {
            wx.hideToast()
          }, 500)
      })

    })

  },
  toDate: function (number) {
    var n = number * 1000;
    var date = new Date(n);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  },
  /**
   * 删除订单
   */
  delorder:function(e){
    var that = this 
    wx.showModal({
      title: '是否删除该订单',
      success: function(res) {
        if (res.confirm) {
          that.editorder(e)
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 修改订单
   */
  editorder: function (e) {
    // console.log(e.currentTarget.dataset)
    var e = e.currentTarget.dataset,
      obj = {},
      t = this,
      orderid = t.data.order_id

    obj.order_id = e.id

    if (e.isdelete) {
      obj.is_delete = e.isdelete
    } else if (e.order_status) {
      obj.order_status = e.order_status
    }

    // console.log(obj)
    // console.log(t.data.orderinfo)
    API_ORDER.editorder(obj).then(function (res) {
      // console.log(res)
      wx.showToast({
        title: res.msg,
        icon: "success",
        duration: 3e5
      }),
      t.reload({order_id:e.id}),
      setTimeout(function () {
        wx.hideToast()
      }, 500)
    })
  },
  /**
   * 订单支付
   */
  gaincode:function(e){
    var e = e.currentTarget.dataset,
        that = this
    wx.login({
      success:res=>{
        // console.log(res)
        e.code = res.code
        that.paynow(e)
      }
    })
  },
  /**
   * 立即支付
   */
  paynow: function (e) {
    // console.log(e)
    var that = this,
        i = {},
        obj = {}

    i.code = e.code,
    i.goods_name = e.goods_name,
    i.Total_fee = e.total_fee
    obj.order_id = e.order_id,
    obj.pay_time = Date.parse(new Date()) / 1000,
    obj.pay_status = "1",
    obj.actual_price = e.total_fee
    // console.log(i)
    // console.log(obj)    
    API_PAY.wxpay(i).then(function(res){
      // console.log(res)
      wx.requestPayment({
        'timeStamp': res.timeStamp,
        'nonceStr': res.nonceStr,
        'package': res.package,
        'signType': res.signType,
        'paySign': res.paySign,
        'success':function(res){
          // console.log(res)
          wx.showToast({
            title:"支付成功",
            icon:"success",
            duration:3e5
          }),
          API_ORDER.editorder(obj).then(function(res){
            // console.log(res)
            setTimeout(function(){
              wx.hideToast(),
              that.reload({order_id:e.order_id})
            },500)
          })
        },
        'fail':function(res){
          // console.log(res)
          wx.showToast({
            title: "支付失败",
            image: "/image/shibai.png",
            duration: 3e5
          }), setTimeout(function () {
              wx.hideToast(),
              that.reload({order_id:e.order_id})
          }, 500)
        }
     })
    })
    
  },
  /**
   * 查看物流
   */
  logistics:function(e){
    // console.log(e.currentTarget.dataset)
    var e = e.currentTarget.dataset
    wx.navigateTo({
      url:"../logistics/logistics?order_id="+e.order_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.reload(options)
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