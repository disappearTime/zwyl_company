// pages/getcoupon/getcoupon.js
var API_COUPON = require("../../api/api.coupon")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponlist:{}
  },
  /**
   * 加载
   */
  reload: function () {
    wx.showToast({
      title: "加载中",
      icon: "loading",
      duration: 1000
    })
    this.couponlist()
    setTimeout(function () {
      wx.hideToast()
    }, 500)
  },
  /**
   * 领取优惠券
   */
  gaincoupon: function (e) {
    var e = e.currentTarget.dataset,
      that = this
    e.uid = wx.getStorageSync("ui").user_id
    // console.log(e)
    API_COUPON.getcoupon(e).then(function (res) {
      // console.log(res)
      that.couponlist()
    })
  },
  /**
   * 优惠券列表
   */
  couponlist: function () {
    var that = this,
      uid = wx.getStorageSync("ui").user_id
    API_COUPON.mycouponlist({ uid: uid }).then(function (res) {
      // console.log(res)
      var myarr = res.data
      API_COUPON.couponlist().then(function (res) {
        // console.log(res)

        var arr = []
        if (res.status == 1) {
          for (var j = 0; j < res.data.length; j++) {
            // console.log(res.data)
            var time = res.data[j].end_time
            time = time.replace(/-/g,'/');
            var date = new Date(time);
            var time = date.getTime();
            var newtime = new Date().getTime();
            // console.log(time,newtime)
            res.data[j].end_times = time,
            res.data[j].new_time = newtime
            res.data[j].min_price = Number(res.data[j].min_price)          
            
            res.data[j].status = 1
            if(res.data[j].new_time < res.data[j].end_times){
                arr.push(res.data[j])
            }
          }
          for (var i = 0; i < myarr.length; i++) {
            for (var j = 0; j < arr.length; j++) {
              if (myarr[i].cid == arr[j].id) {
                arr[j].status = 2
              }
            }
          }
          res.data = arr
        }
        that.setData({
          couponlist: res
        })
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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