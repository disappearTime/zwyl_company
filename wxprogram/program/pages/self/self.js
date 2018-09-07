Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo') // canIUse api判断微信是否支持某个属性
  },
  loading: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1500, // 提示的延长时间
      mask: true, // 是否显示透明蒙层，防止触摸穿透
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // // 获取用户信息 现在不支持，需要用户手动授权
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          'userInfo': res.userInfo
        })
      }
    })
  },
  getUserInfo () { // 获取用户信息
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          'userInfo': res.userInfo
        })
      }
    })
  },
  chooseImg: function () { // 选择图片
    var that = this;
    wx.chooseImage({
      count: 2, // 上传图片数量 
      sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有。
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.data.imgList = that.data.imgList.concat(res.tempFilePaths);
        that.setData({
          'imgList': that.data.imgList
        })
      },
    })
  },
  previewImg: function (e) { // 预览图片
    var index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.imgList[index], // 当前显示图片的http链接
      urls: this.data.imgList, // 需要预览的图片http链接列表
    })
  },
  delImg: function (e){
    var index = e.currentTarget.dataset.index;
    var newImgList = [];
    for(var i=0; i<this.data.imgList.length; i++ ){
      if(index != i){
        newImgList.push(this.data.imgList[i])
      }
    }
    this.setData({
      'imgList': newImgList
    })
  },
  getLocation: function () { // 获取地理位置
    var that = this;
    wx.getLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          'location': res
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { // 监听页面显示
    this.loading();
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