// pages/search/search.js
var API = require("../../api/api.search"),
    API_GOODS = require("../../api/api.goods"),
    app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchlist:[],
        xstart:["综合","价格","销量"],
        xsindex:0,
        sortord:1,
        price:1,
        sales:1,
        cat:{},
        hotsea:{
            currentPage:1, 
        },
        inval:""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options)
        this.reload(options)
    },
    /**
     * 加载
     */
    reload: function (e) {
        // console.log(e)
        var _this = this,
            obj,
            seaval

        if(e==undefined){
            obj = ""
        }else{
            obj = Object.keys(e).length != 0 ? e : ""
        }
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 3e4
        }),_this.setData({
            imgurl:app.globalData.imgurl
        })
        if(obj != ""){
            // console.log(obj)
            this.search(obj)
            this.data.cat=obj
        }else{
            // console.log(2)
            _this.getcashe(),_this.hotsearch()
        }
        setTimeout(function(){
            wx.hideToast()
        },500)
    },
    /**
     * 热门搜索
     */
    hotsearch: function () {
        var _this = this,
            obj = {}
            obj.pageSize = "6",
            obj.currentPage = _this.data.hotsea.currentPage.toString()
            // console.log(obj)
        API.keywords(obj).then(function(res){
            // console.log(res)
            _this.data.hotsea.pageTotal = res.data.pageTotal
            _this.setData({
                keywords:res.data.list
            })
        })
    },
    /**
     * 刷新
     */
    refresh: function () {
        var hotsea = this.data.hotsea
        // console.log(hotsea)
        if(hotsea.pageTotal > hotsea.currentPage){
            hotsea.currentPage++
        }else{
            hotsea.currentPage = "1"
        }
        
        this.setData({
            hotsea:hotsea
        })
        this.hotsearch()
    },
    /**
     * input搜索
     */
    seaval: function (e) {
        // console.log(e.detail.value)
        this.reload({goods_name:e.detail.value})
    },
    /**
     * 取消
     */
    seacancel: function (){
        // console.log(this.data.serchrank)
        if(this.data.serchrank!=null){
            this.setData({
                serchrank:null,
                xsindex:0,
                sortord:1,
                price:1,
                sales:1,
                cat:{},
                inval:""
            }),this.reload()
        }
    },
    /**
     * 点击搜索
     */
    searchs: function (e) {
        // console.log(e.currentTarget.dataset,this.data.serchrank)
        this.reload({goods_name:e.currentTarget.dataset.name})
    },
    /**
     * 搜索
     */
    search: function (e) {
        // console.log(e)
        var _this = this,
            obj = {},
            serchrank = ""
            if(e.goods_name){
                obj.goods_name = e.goods_name
                serchrank = e.goods_name
                if(e.sorting_price){
                    obj.sorting_price = e.sorting_price
                }else if(e.sorting_sales){
                    obj.sorting_sales = e.sorting_sales
                }
                this.setcache(serchrank)
            }else if(e.cat_id){
                obj.cat_id = e.cat_id
                serchrank = e.cat_name
                if(e.sorting_price){
                    obj.sorting_price = e.sorting_price
                }else if(e.sorting_sales){
                    obj.sorting_sales = e.sorting_sales
                }
            }
            // console.log(obj)
        API_GOODS.goodslist(obj).then(function(res){
            // console.log(res)
            var arr = []
            if(res.status != 1){
                arr = []
            }else{
                arr = res.data.list
            }
            _this.setData({
                searchlist:arr,
                serchrank:serchrank
            })
            // console.log(_this.data.searchlist)
        })
        
        
    },
    /**
     * 读取缓存
     */
    getcashe: function () {
        var msh = wx.getStorageSync("msh")
        this.setData({
            msh:msh
        })
    },
    /**
     * 设置缓存
     */
    setcache: function (e) {
        // console.log(e)
        var msh = wx.getStorageSync("msh") ? wx.getStorageSync("msh") : Array(0)
        // console.log(msh.indexOf(e)>-1)
        if(msh.indexOf(e)>-1){
            // console.log(1)
        }else{
            // console.log(2)  
            msh[msh.length] = e          
        }
       
        // console.log(msh)
        wx.setStorageSync("msh",msh)
    },
    /**
     * 清除
     */
    removecache: function () {
        wx.removeStorageSync("msh"),this.reload()
    },
    
    /**
     * 商品详情
     */
    goprodet: function (e) {
        // console.log(e.currentTarget.dataset)  
        wx.navigateTo({
            url:"../prodetails/prodetails?goodsid="+e.currentTarget.dataset.goodsid
        })
    },
    /**
     * 状态切换
     */
    cutxstart: function (e) {
        // console.log(e.currentTarget.dataset)
        var index = e.currentTarget.dataset.index
        this.data.sortord = index
        if(index == 0){
            this.reload(this.data.cat)
        }
        this.setData({
            xsindex:index,
            sortord:index,
            xs:2
        })
    },
    /**
     * 排序方法
     */
    sortorder: function (e) {
        // console.log(e.currentTarget.dataset)
        var obj = e.currentTarget.dataset,
            e = {},
            objs = this.data.cat
            if(objs.cat_id){
                e.cat_id = objs.cat_id,
                e.cat_name = objs.cat_name
            }else{
                e.goods_name = objs.goods_name
            }
            if(this.data.sortord==1){
                e.sorting_price = obj.start
                this.setData({
                    price:obj.start,
                    xs:1
                })
            }else{
                e.sorting_sales = obj.start
                this.setData({
                    sales:obj.start,
                    xs:1
                })
            }
            this.reload(e)
    },
    /**
     * input输入
     */
    cz:function(e){
        // console.log(e.detail.value)
        var e = e.detail.value
        this.setData({
            inval:e
        })

    },
    /**
     * 搜索图
     */
    tsearch:function(){
        if(this.data.inval != ""){
            this.reload({goods_name:this.data.inval})
        }
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