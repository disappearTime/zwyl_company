Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: '3'
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
  tabClick (e) { // 导航切换
    var cur = e.currentTarget.dataset.cur;
    var title;
    this.setData({
      currentPage: cur
    })
    if(cur=="1"){
      title = '美丽任务'
    }else if(cur=="2"){
      title = "顾客管理"
    }else if(cur=="3"){
      title = "我的"
    }
    wx.setNavigationBarTitle({
      title: title,
    })
  },
  toExtensionPage () { // 拓客工具页面
    wx.navigateTo({
      url: '../extension/extension'
    })
  },
  toShopProjectPage () { // 店内项目
    wx.navigateTo({
      url: '../shopProject/shopProject'
    })
  }
})