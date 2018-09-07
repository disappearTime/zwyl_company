// pages/site/site.js
var API_SITE = require("../../api/api.site")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  /**
   * 加载
   */
  reload: function () {
    var that = this,
        ui = wx.getStorageSync("ui")
    wx.showToast({
      title:"加载中",
      icon:"loading",
      duration:3e5
    }),
    API_SITE.sitelist({user_id:ui.user_id}).then(function(res){
      // console.log(res.data)
      that.setData({
        sitelist:res.data
      })
    }),setTimeout(function(){
      wx.hideToast()
  },500)
  },
  /**
   * 选择地址
   */
  editsite:function(e){
    var e = e.currentTarget.dataset,
        obj = {},
        that = this
    obj.address_id = e.address_id,
    obj.user_id = wx.getStorageSync("ui").user_id
    obj.is_default = "1"
    // console.log(obj)
    API_SITE.editdefault(obj).then(function(res){
      // console.log(res)
      that.reload()
    })
  },
  /**
   * 添加地址
   */
  addsite: function (e) {
    var url = "../siteeditor/siteeditor"
    wx.navigateTo({
      url:url
    })
  },
  /**
   * 编辑地址
   */
  redact: function (e) {
    // console.log(e.currentTarget.dataset)
    var address_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url:"../siteeditor/siteeditor?address_id="+address_id
    })
  },
  /**
   * 删除地址
   */
  sitedel: function (e) {
    // console.log(e.currentTarget.dataset.id)
    var address_id = e.currentTarget.dataset.id,
        t = this
    API_SITE.sitedel({address_id:address_id}).then(function(res){
      // console.log(res)
      wx.showToast({
        title:res.msg,
        duration:3e5
      }),setTimeout(function(){
        t.reload(),
        wx.hideToast()
      },300)
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