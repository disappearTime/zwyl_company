//index.js
var API = require("../../api/api.goods"),
    API_COUPON = require("../../api/api.coupon"),
    app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperCurrent: 0,
        coupon:false
    },
    // 轮播图
    swiperChange: function (e) {
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    /**
     * 搜索
     */
    gosearch: function () {
        wx.navigateTo({
            url: '../search/search',
        })
    },
    /**
     * 去活动列表
     */
    goevent: function (e) {
        var type = e.currentTarget.dataset.type;
        wx.navigateTo({
            url:"../event/event?type="+type
        })
    },
    /**
     * 商品详情
     */
    goproductdetail: function (e) {
        // console.log(e)
        wx.navigateTo({
            url:"../prodetails/prodetails?goodsid="+e.currentTarget.dataset.goodsid
        })
    },
    /**
     * 关闭优惠券模态框
     */
    couponclos: function (){
        this.setData({
            coupon:false
        })
    },
    /**
     * 领券中心
     */
    gogetcoupon: function(){
        wx.navigateTo({
            url:"../getcoupon/getcoupon"
        })
    },
    /**
     * 领取优惠券
     */
    gaincoupon:function(e){
        var e = e.currentTarget.dataset,
            that = this
        e.uid = wx.getStorageSync("ui").user_id
        // console.log(e)
        API_COUPON.getcoupon(e).then(function(res){
            // console.log(res)
            that.couponlist()
        })
    },
    /**
     * 优惠券列表
     */
    couponlist:function(){
        var that = this,
            uid = wx.getStorageSync("ui").user_id
        API_COUPON.mycouponlist({uid:uid}).then(function(res){
            // console.log(res)
            var myarr = res.data
            API_COUPON.couponlist().then(function(res){
                // console.log(res)
                
                var bl = that.data.coupon,
                    arr = []
                if(res.status != 1){
                    bl = false
                }else if(res.status == 1){
                    for(var j = 0;j<res.data.length;j++){
                        // console.log(res.data)
                        var time = res.data[j].end_time
                        time = time.replace(/-/g,'/');
                        var date = new Date(time);
                        var time = date.getTime();
                        var newtime = new Date().getTime();
                        // console.log(time,newtime)
                        res.data[j].end_times = time,
                        res.data[j].new_time = newtime,
                        res.data[j].status = 1,
                        res.data[j].min_price = Number(res.data[j].min_price)
                        if(res.data[j].new_time < res.data[j].end_times){
                            arr.push(res.data[j])
                        }
                    }
                    for(var i = 0;i<myarr.length;i++){
                        for(var j = 0;j<arr.length;j++){
                            if(myarr[i].cid == arr[j].id){
                                arr[j].status = 2
                            }
                        }
                    }
                    // console.log(arr)
                    res.data = arr
                }
                that.setData({
                    couponlist:res,
                    coupon:bl
                })
            })
        })
    },
    // 加载
    reload: function () {
        var _this = this
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 3e4
        }),
        _this.couponlist(),
        API.swiperlist({type:"1"}).then(function(res){//轮播图
            // console.log(res.data)
            _this.setData({
                imgurl:app.globalData.imgurl,
                swipers:res.data
            })
        }),API.goodslist({discount:"2",pageSize:"3"}).then(function(res){//折扣
            if(res.status == 1){
                for(var i = 0;i<res.data.list.length;i++){
                    res.data.list[i].discounts = ((res.data.list[i].discount_price/res.data.list[i].shop_price)*10).toFixed(1)
                }
            }
            // console.log(res)            
            _this.setData({
                discount:res.data.list
            })
        }),API.goodslist({hot:"2",pageSize:"6"}).then(function(res){//热销
            // console.log(res)
            _this.setData({
                hotlist:res.data.list
            })
        }),API.goodslist({new:"2"}).then(function(res){//新品
            // console.log(res)
            _this.setData({
                newgoodlist:res.data.list
            })
        })
        _this.ylike()
    },
    /**
     * 猜你喜欢
     */
    ylike:function(){
        var ls = wx.getStorageSync("ls") ? wx.getStorageSync("ls") : [] ,
            _this = this,
            asc = function(x,y){
                return y.num-x.num
            },
            cat = ls.sort(asc),
            arr = [],
            obj = {}
            obj.pageSize = "6"
            if(cat.length!=0){
                obj.cat_id = cat[0].cat_id
            }
        API.goodslist(obj).then(function(res){//猜你喜欢
            // console.log(res)
            if(res.data.list.length < 6){
                for(var i=0;i<res.data.list.length;i++){
                    arr.push(res.data.list[i])
                }
                if(arr.length<6){
                    var num = 6-arr.length
                    API.goodslist({pageSize:"10"}).then(function(res){
                        // console.log(res)
                        for(var j=0;j<arr.length;j++){
                            for(var i=0;i<res.data.list.length;i++){
                                if(arr[j].goods_id != res.data.list[i].goods_id && arr.length < 6){
                                    arr.push(res.data.list[i])
                                }
                            }
                            
                        }
                        // console.log(arr)
                        _this.setData({
                            relateds:arr
                        })
                    })
                }
            }else{
                arr = res.data.list
            }
            
            _this.setData({
                relateds:arr
            }),
            setTimeout(function(){
                wx.hideToast()
            },500)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            coupon:true
        })
        this.reload();
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
        this.setData({
            coupon:false
        })
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
        this.reload(), 
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