//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    'scrollConfig': {
      'scroll-x': false,
      'scroll-y': true,
      'upper-threshold': 50, // 距顶部/左边多远时（单位px），触发 scrolltoupper 事件 默认值50
      'lower-threshold': 50. // 距底部/右边多远时（单位px），触发 scrolltolower 事件
    },
    'swiperConfig': {
      'imgUrls': [
        'http://img3.imgtn.bdimg.com/it/u=1136163155,115849000&fm=27&gp=0.jpg',
        'http://img0.imgtn.bdimg.com/it/u=3116798296,416429696&fm=27&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2364672757,2156253035&fm=27&gp=0.jpg'
      ],
      'indicatorDots': true,// 是否显示面板指示点
      'indicator-color': 'rgba(0,0,0,0.3)', // 指示点颜色
      'indicator-active-color': "#000000", // 当前知识点颜色
      'autoplay': true, // 是否自动播放
      'interval': 2000, // 自动切换时间间隔
      'duration': 500, // 滑动动画时长
      'vertical': '',// 滑动是否纵向
    }
  },
  upper: function(e){
    console.log(e);
    console.log('下拉刷新');
  },
  lower: function(e){
    console.log(e);
    console.log('上拉加载');
  }, 
  scroll: function(e){
    console.log(e);
  },
  onLoad: function(options){ // 监听页面加载
    console.log(options);
    //this.loading();只有第一次页面加载会执行，点击导航栏时使用的是navigatorTo这种方式，不会关闭页面，所以页面只加载一次
  },
  onShow: function(){ // 监听页面显示
    this.loading();
  },
  loading: function(){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1500, // 提示的延长时间
      mask: true, // 是否显示透明蒙层，防止触摸穿透
    })
  }
})
