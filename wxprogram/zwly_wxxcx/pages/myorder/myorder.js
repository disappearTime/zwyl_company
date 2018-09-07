// pages/myorder/myorder.js
var API_ORDER = require("../../api/api.order"),
    API_PAY = require("../../api/api.pay"),
  app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderstart: ["全部", "待付款", "待发货", "待收货", "已完成"],
    active: 0,
    imgurl: app.globalData.imgurl
  },

  /**
   * 订单状态切换
   */
  ordercut: function (e) {
    // console.log(e.currentTarget.dataset);
    var index = e.currentTarget.dataset.index
    this.setData({
      active: index
    }),
      this.reload(index)
  },
  /**
   * 加载
   */
  reload: function (e) {
    // console.log(e)
    var t = this
    wx.showToast({
      title: "加载中",
      icon: "loading",
      duration: 3e5
    })
    e ? e : t.data.active
    t.setData({
      active: e
    })
    // console.log(t.data.active)
    t.orderlist(e)
    setTimeout(function(){
      wx.hideToast()
    },500)
  },
  /**
   * 订单列表
   */
  orderlist: function (e) {
    var obj = {},
      t = this
    // console.log(e)
    obj.user_id = wx.getStorageSync("ui").user_id
    obj.is_delete = "1"


    if (e == 1) {
      obj.pay_status = "0",
      obj.order_status = "1"
    } else if (e == 2) {
      obj.pay_status = "1",
      obj.order_status = "1"
    } else if (e == 3) {
      obj.order_status = "3",
      obj.pay_status = "1" 
    } else if (e == 4) {
      obj.order_status = "4",
      obj.pay_status = "1"
    }


    // console.log(obj)

    API_ORDER.orderlist(obj).then(function (res) {
      // console.log(res)
      var arr = []
      if (res.status == 1) {
        for (var i = 0; i < res.data.list.length; i++) {
          res.data.list[i].instime = t.toDate(Number(res.data.list[i].instime))
        }
        arr = res.data.list
      } else {
        arr = []
      }
      // console.log(arr)
      t.setData({
        orderlist: arr
      })
      // console.log(arr)
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
      index = this.data.active,
      t = this
    obj.order_id = e.id
    if (e.isdelete) {
      obj.is_delete = e.isdelete
    }else if(e.order_status){
      obj.order_status = e.order_status
    }
    // console.log(obj)
    // console.log(index)
    API_ORDER.editorder(obj).then(function (res) {
      // console.log(res)
      wx.showToast({
        title:res.msg,
        icon:"success",
        duration:3e5
      }),
      t.reload(index),
      setTimeout(function(){
        wx.hideToast()
    },500)
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
              that.reload(that.data.active)
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
              that.reload(that.data.active)
          }, 500)
        }
     })
    })
    
  },
  /**
   * code
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
   * 订单详情
   */
  goorderinfo: function (e) {
    // console.log(e.currentTarget.dataset)
    var e = e.currentTarget.dataset;
    wx.navigateTo({
      url:"../orderinfo/orderinfo?order_id="+e.order_id
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
    this.reload(options.index)
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
    // console.log(this.data.active)
    this.reload(this.data.active)
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