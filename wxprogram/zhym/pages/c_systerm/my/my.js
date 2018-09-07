// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  /**
   * 自定义函数
   */
  viewMyCoupon () {
    console.log('查看卡券')
  },
  viewMyNews () {
    console.log('我的消息')
  },
  setting () {
    console.log('账号设置')
  },
  toBeautyPage () {
    console.log('跳往美丽机构页面')
    wx.navigateTo({
      url: '/pages/c_systerm/beautyInstitution/beautyInstitution',
    })
  },
  toMyOrderPage () {
    wx.navigateTo({
      url: '/pages/c_systerm/myOrder/myOrder',
    })
  },
  toBackstage () {
    wx.navigateTo({
      url: '/pages/b_systerm/start/start',
    })
  }
})