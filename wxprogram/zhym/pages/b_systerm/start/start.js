Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainTime: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let timer = setInterval(function () {
      that.data.remainTime--;
      if (that.data.remainTime < 0) {
        that.data.remainTime = 0;
        clearInterval(timer);
        that.goBackStage();
      }
      that.setData({
        remainTime: that.data.remainTime
      })
    }, 1000)
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
  goBackStage () { // 后台系统
    wx.navigateTo({
      url: '/pages/b_systerm/home/home',
    })
  }
})