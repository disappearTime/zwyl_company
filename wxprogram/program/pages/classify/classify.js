import {goods_classify} from "../../api/classify_data"
import { goods_classifyName } from "../../api/classify_data"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    'current': 0,
    'currentGoods': [
      {
        'goods_img': 'http://img0.imgtn.bdimg.com/it/u=3116798296,416429696&fm=27&gp=0.jpg',
        'goods_name': '小米'
      },
      {
        'goods_img': 'http://img3.imgtn.bdimg.com/it/u=1136163155,115849000&fm=27&gp=0.jpg',
        'goods_name': '华为'
      },
      {
        'goods_img': 'http://img0.imgtn.bdimg.com/it/u=3116798296,416429696&fm=27&gp=0.jpg',
        'goods_name': '苹果'
      },
      {
        'goods_img': 'http://img3.imgtn.bdimg.com/it/u=1136163155,115849000&fm=27&gp=0.jpg',
        'goods_name': '三星'
      },
      {
        'goods_img': 'http://img0.imgtn.bdimg.com/it/u=3116798296,416429696&fm=27&gp=0.jpg',
        'goods_name': '魅族'
      }
    ]
  },
  loading: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1500, // 提示的延长时间
      mask: true, // 是否显示透明蒙层，防止触摸穿透
    })
  },
  togglegoods: function (event) { // 小程序里面绑定事件不能通过小括号里传递参数，想传递参数可以设置data-attName,然后可以在事件对象里找到
    //console.log(event);
    //this.data.current = event.currentTarget.dataset.index; 这种方法修改数据已失效
    let index = event.currentTarget.dataset.index
    this.setData({
      'current': index,
      'currentGoods': goods_classifyName[index]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.loading();
  },
  onShow: function () { // 监听页面显示
    this.loading();
    this.setData({
      'goods_classify': goods_classify
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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