// pages/event/event.js
var API = require("../../api/api.goods"),
app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"hot"
  },
   /**
   * 页面标题
   */
  titlecut: function (e) {
    // console.log(e)
    if (e == "hot") {
      wx.setNavigationBarTitle({
        title: '今日爆款'
      })
    } else if (e == "new") {
      wx.setNavigationBarTitle({
        title: '新品推荐'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '打折商品'
      })
    }
  },
  /**
   * 加载
   */
  reload: function (type) {
    
    var _this = this,
    e = {}
    if(type=="discount"){
      e.discount = "2"
    }else if(type == "hot"){
      e.hot = "2"
    }else if(type == "new"){
      e.new = "2"
    }    
    wx.showToast({
      title: "加载中",
      icon: "loading",
      duration: 3e4
    }),
    API.goodslist(e).then(function (res) {
      // console.log(res)
      _this.setData({
        type: type,
        list:res.data.list,
        imgurl:app.globalData.imgurl
      }),
      setTimeout(function(){
        wx.hideToast()
    },500)
    })
  },
  /**
   * 商品详情
   */
  goprodet: function (e) {
    wx.navigateTo({
      url:"../prodetails/prodetails?goodsid="+e.currentTarget.dataset.goodsid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type
      
      this.titlecut(type),
      this.reload(type),
      this.data.type = type
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
    this.reload(this.data.type),wx.stopPullDownRefresh()
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