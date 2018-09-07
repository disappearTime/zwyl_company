// pages/coupon/coupon.js
var API_COUPON = require("../../api/api.coupon")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:1,
  },
  /**
   * 加载
   */
  reload:function(){
    wx.showToast({
      title:"加载中",
      icon:"loading",
      duration:1000
    })
    this.couponlist()
    setTimeout(function(){
      wx.hideToast()
    },500)
  },
  /**
   * 切换
   */
  cupact:function (e){
    // console.log(e)
    var e = e.currentTarget.dataset
    this.setData({
      active:e.index
    })
    this.couponlist()
    
  },
  /**
   * 优惠券列表
   */
  couponlist:function () {
    var obj = {},
        that = this,
        arr = []
    obj.uid = wx.getStorageSync("ui").user_id
    if(that.data.active != 3){
      obj.coupons_type = that.data.active
    }else{
      obj.coupons_type = "1"
    }
    // console.log(obj)
    API_COUPON.mycouponlist(obj).then(function(res){
      // console.log(res)
      if(res.status == 1){
        for(var i = 0;i<res.data.length;i++){
          var time = res.data[i].end_time ? res.data[i].end_time : ""
          time = time.replace(/-/g,'/');
          var date = new Date(time);
          var time = date.getTime();
          var newtime = new Date().getTime();
          // console.log(time,newtime)
          res.data[i].end_times = time,
          res.data[i].new_time = newtime
          res.data[i].min_price = Number(res.data[i].min_price)          
        }
        if(that.data.active == 1){
          for(var i =0;i<res.data.length;i++){
            if(res.data[i].new_time < res.data[i].end_times){
              arr.push(res.data[i])
            }
          }
        }else if(that.data.active == 3){
          for(var i =0;i<res.data.length;i++){
            if(res.data[i].new_time > res.data[i].end_times){
              arr.push(res.data[i])
            }
          }
        }else{
          arr = res.data
        }
      }else{
        arr = []
      }
      // console.log(arr)
      var dataarr = []
      for(var i = 0;i<arr.length;i++){
        if(arr[i].price != null){
          dataarr.push(arr[i])
        }
      }
      that.setData({
        couponlist:dataarr
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