// pages/category/category.js
var API = require("../../api/api.category"),
app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classifyactivite: 0
    },
    /**
     * 搜索
     */
    gosearch: function (e) {
        // console.log(e.currentTarget.dataset.catid)
        var obj =  e.currentTarget.dataset,
            catid = obj.catid,
            catname = obj.catname,
            url
        // console.log(Object.keys(obj))
        if(Object.keys(obj).length==0){
            url = '../search/search'
        }else{
            url = '../search/search?cat_id='+catid+'&cat_name='+catname
        }
        wx.navigateTo({
            url: url
        })
    },
    /**
     * 加载
     */
    reload: function(){
        var _this = this
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 3e4
        }),API.category().then(function(res){
            // console.log(res.data)
            _this.setData({
                imgurl:app.globalData.imgurl,
                classifys:res.data
            }),setTimeout(function(){
                wx.hideToast()
            },500)
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

    },
    //   切换
    activitycut: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            classifyactivite: index
        })
    }
})