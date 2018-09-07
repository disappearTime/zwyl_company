// pages/cart/cart.js
var API_CART = require("../../api/api.cart"),
    API_GOODS = require("../../api/api.goods"),
    app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allstart: false,
        amount: 0,//总价
        activities: 0,//优惠
        totality: 0,//数量
        cartlist: "",
        goods:[],
        goodsinfo:[],
        goods_info:[]
    },
    /**
     * 购物车商品选中
     */
    xz: function (e) {
        // console.log(e.currentTarget.dataset.index)
        var index = e.currentTarget.dataset.index,
            t = this,
            num = 0
        t.data.cartlist[index].status = !t.data.cartlist[index].status
        for(var i = 0;i<t.data.cartlist.length;i++){
            if(t.data.cartlist[i].status){
                num+=Number(t.data.cartlist[i].num)
            }
        }
        t.setData({
            cartlist: t.data.cartlist,
            totality:num
        }),
        t.cartmoney()
    },
    /**
     * 全选
     */
    allstart: function () {
        var t = this,
            td = t.data,
            num = 0
        t.setData({
            allstart:false,
            totality:num
        })
        for (var i = 0; i < td.cartlist.length; i++) {
            if (td.cartlist[i].status) {
                num+=Number(td.cartlist[i].num)
                t.setData({
                    allstart:true,
                    totality:num
                })
            }
        }
        t.cartmoney()
    },
    allstatus:function(){
        var t = this,
            td = t.data,
            s = !td.allstart,
            num = 0
        for(var i=0;i<td.cartlist.length;i++){
            td.cartlist[i].status = s
            if(td.cartlist[i].status){
                num+=Number(td.cartlist[i].num)
            }
        }
        t.setData({
            allstart:s,
            cartlist:td.cartlist,
            totality:num
        }),
        t.cartmoney()
    },
    /**
     * 删除
     */
    cartdel: function (){
        var t = this,
            td = this.data,
            cart_id = []
        for(var i = 0;i<td.cartlist.length;i++){
            if(td.cartlist[i].status){
                cart_id.push(td.cartlist[i].cart_id)
            }
        }
        // console.log(cart_id.join(","))
        cart_id.join(",")
        API_CART.cartdel({cart_id:cart_id}).then(function(res){
            // console.log(res)
            wx.showToast({
                title:res.msg,
                icon:"success",
                duration:3e5
            }),setTimeout(function(){
                wx.hideToast(),
                t.reload()
            },500)
           
        })
    },
    /**
     * 数量
     */
    cartnumdel: function (e){
        // console.log(e.currentTarget.dataset.id)
        var t = this,
            td = this.data,
            e = e.currentTarget.dataset.id,
            obj = {}
        
        obj.cart_id = e
        for(var i = 0;i<td.cartlist.length;i++){
            if(td.cartlist[i].cart_id == e){
                if(td.cartlist[i].num>1){
                    td.cartlist[i].num = Number(td.cartlist[i].num)-1
                    obj.num = td.cartlist[i].num
                }
            }
        }
        t.setData({
            cartlist:td.cartlist
        }),
        t.cartmoney()
        // console.log(td.cartlist)
        // console.log(obj)
        API_CART.editcart(obj).then(function(res){
            // console.log(res)
        })
    },
    cartnumadd: function(e){
        // console.log(e.currentTarget.dataset.id,this.data.cartlist) 
        var t = this,
            td = this.data,
            e = e.currentTarget.dataset.id,
            obj = {}
        
        obj.cart_id = e
        // console.log(td.cartlist)
        for(var i = 0;i<td.cartlist.length;i++){
            if(td.cartlist[i].cart_id == e){
                if(td.cartlist[i].sku_id != null){
                    // console.log(1)
                // console.log(td.cartlist[i].num,td.cartlist[i].sku_number)
                    // console.log(td.goodsinfo)
                    // console.log(td.cartlist[i])
                    if(Number(td.cartlist[i].num) < Number(td.cartlist[i].sku_number)){
                        td.cartlist[i].num = Number(td.cartlist[i].num)+1
                        obj.num = td.cartlist[i].num
                    }else{
                        wx.showToast({
                            title:"库存不足",
                            image: "/image/shibai.png",
                            duration:1000
                        }),setTimeout(function(){
                            wx.hideToast()
                        },500)
                    }
                    
                }else{
                    // console.log(2)                    
                    if(td.cartlist[i].num < td.goodsinfo[i].goods_number){
                        td.cartlist[i].num = Number(td.cartlist[i].num)+1
                        obj.num = td.cartlist[i].num
                    }else{
                        wx.showToast({
                            title:"库存不足",
                            image: "/image/shibai.png",
                            duration:1000
                        }),setTimeout(function(){
                            wx.hideToast()
                        },500)
                    }
                }
                
            }
        }
        t.setData({
            cartlist:td.cartlist
        }),
        t.cartmoney()
        // console.log(td.cartlist)
        // console.log(obj)
        API_CART.editcart(obj).then(function(res){
            // console.log(res)
        })
    },
    /**
     * 金额
     */
    cartmoney:function(){
        var t = this,
            td = this.data,
            num = 0,
            pri = 0,
            spri = 0,
            zj = 0,
            sj = 0,
            yh = 0,
            goods = [],
            goods_info = []
        for(var i=0;i<td.cartlist.length;i++){
            var item = td.cartlist[i],
            obj = {}
            
            if(item.status){
                for(var j=0;j<td.goodsinfo.length;j++){
                    if(item.gid == td.goodsinfo[j].goods_id){
                        // console.log(td.goodsinfo[j])
                        goods_info.push(td.goodsinfo[j])
                    }
                }

                num = item.num
                obj.buy_num = item.num
                obj.goods_id = item.gid
                // console.log(item.sku_id)
                
                if(item.sku_id){
                    pri = item.price,
                    spri = item.price,
                    obj.sku_id = item.sku_id
                    obj.goods_price = item.price
                }else{
                    spri = item.shop_price
                    if(item.discount == 2){
                        pri = item.discount_price
                        obj.goods_price = item.discount_price
                    }else{
                        pri = item.shop_price
                        obj.goods_price = item.shop_price
                    }                 
                }
                // console.log("数量：",num,"是付价格",spri,"应付价格",pri)
                zj += num * pri,
                sj += num * spri,
                yh += (num * spri) - (num * pri),
                obj.price = num * pri
                // console.log("实付总价",sj,"应付总价",zj,"优惠",yh)
                goods.push(obj)
            }
        }
        // console.log(goods)
        td.goods = goods,
        td.goods_info = goods_info
        this.setData({
            amount:zj,
            activities:yh
        })
    },
    /**
     * 结算
     */
    closing:function(){
        var start = true
        // console.log(this.data.goods,this.data.goods_info)
        for(var i=0;i<this.data.goods.length;i++){
            for(var j = 0;j<this.data.goods_info.length;j++){
                if(this.data.goods[i].goods_id == this.data.goods_info[j].goods_id){
                    if(this.data.goods[i].sku_id != 0){
                        for(var l=0;l<this.data.goods_info[j].skuattr.length;l++){
                            if(this.data.goods[i].sku_id == this.data.goods_info[j].skuattr[l].sku_id){
                                if(Number(this.data.goods[i].buy_num) > Number(this.data.goods_info[j].skuattr[l].sku_number)){
                                    console.log(Number(this.data.goods[i].buy_num),Number(this.data.goods_info[j].skuattr[l].sku_number))
                                    start = false
                                }
                            }
                        }
                    }else{
                        if(this.data.goods[i].buy_num > this.data.goods_info[j].goods_number){
                            console.log(2)
                            start = false
                        }
                    }
                }
            }
        }
        console.log(start)
        if(start){
            var o = wx.getStorageSync("o") ? wx.getStorageSync("o") : {},
                t = this,
                td = this.data,
                cart_id = []
            for(var i = 0;i<td.cartlist.length;i++){
                if(td.cartlist[i].status){
                    cart_id.push(td.cartlist[i].cart_id)
                }
            }
            // console.log(cart_id.join(","))
            cart_id.join(",")
            
            var hash = {},
            arr = td.goods_info.reduce(function(item, next) {
                hash[next.goods_id] ? '' : hash[next.goods_id] = true && item.push(next);
                return item
            }, [])
            console.log(arr);
            
            
            o.goods = td.goods
            o.goods_info = arr
            wx.setStorageSync("o",o)
            wx.navigateTo({
                url:"../affirm/affirm?cart_id="+cart_id
            })
        }else{
            wx.showToast({
                title: "库存不足",
                image: "/image/shibai.png",
                duration: 1000
            }), setTimeout(function () {
                wx.hideToast()
            }, 500)
        }
        
    },
    /**
     * 加载
     */
    reload: function () {
        var _this = this
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 3e4
        }), API_CART.cartlist({ user_id: wx.getStorageSync("ui").user_id }).then(function (res) {
            // console.log(res.data)
            var obj = [],
                arr = []
            for (var i = 0; i < res.data.length; i++) {
                res.data[i].status = false
                obj.push(res.data[i])
                API_GOODS.goodsinfo({goods_id:res.data[i].gid}).then(function(res){
                    // console.log(res.data)
                    arr.push(res.data)
                })
            }
            // console.log(obj)
            // console.log(arr)
            _this.data.goodsinfo = arr,
            _this.setData({
                cartlist: obj,
                imgurl: app.globalData.imgurl,
                allstart: _this.data.allstart

            }),
            _this.allstart(),
            _this.cartmoney(),
            setTimeout(function(){
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