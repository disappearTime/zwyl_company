// pages/affirm/affirm.js
var API_ORDER = require("../../api/api.order"),
    API_SITE = require("../../api/api.site"),
    API_GOODS = require("../../api/api.goods"),
    API_PAY = require("../../api/api.pay"),
    API_CART = require("../../api/api.cart"),
    API_COUPON = require("../../api/api.coupon"),
    app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 是否有默认收货地址
        profile: 2,
        // 遮罩层
        shadestart: 2,
        //edit start
        editstart: true,
        cart_id:"",

        orderinfo: {},
        siteinfo: {},
        sitelist: [],
        xstart: true,
        code: "",
        order_id:"",

        regionindex: [0, 0, 0],
        regionarry: [],
        regionarrys: [],
        province: "",
        city: "",
        district: "",
        regions: [],
        ress: {},
        is_default: 2,
        shade: false,
        shades: 1,

        /**
         * 优惠券
         */
        couponinfo:{},
        couponstart:false
    },
    /**
     * 加载
     */
    reload: function () {
        var t = this,
            td = this.data
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 3e5
        }),
            t.setData({
                imgurl: app.globalData.imgurl
            })
        td.orderinfo.user_id = wx.getStorageSync("ui").user_id,
            td.orderinfo.goods = JSON.stringify(wx.getStorageSync("o").goods),
            td.orderinfo.pay_id = "1"
        t.goodsinfo(wx.getStorageSync("o")),
            t.siteinfo(),
            t.couponlist()
        setTimeout(function () {
            wx.hideToast()
            // console.log(td.orderinfo)
        }, 500)
    },
    /**
     * 地址
     */
    siteinfo: function () {
        var uid = wx.getStorageSync("ui").user_id,
            t = this
        API_SITE.sitelist({ user_id: uid }).then(function (res) {
            // console.log(res.data)
            t.data.sitelist = res.data
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].is_default == 1) {
                    t.data.profile = 1
                    t.data.siteinfo = res.data[i],
                        t.data.orderinfo.consignee = res.data[i].name,
                        t.data.orderinfo.address = res.data[i].address,
                        t.data.orderinfo.tel = res.data[i].tel,
                        t.data.orderinfo.province = res.data[i].province_id,
                        t.data.orderinfo.city = res.data[i].city_id,
                        t.data.orderinfo.district = res.data[i].district_id
                }
            }
            t.setData({
                profile: t.data.profile,
                siteinfo: t.data.siteinfo,
                sitelist: t.data.sitelist,
            })
        })
    },
    /**
     * 选择地址
     */
    sitexz: function (e) {
        // console.log(e.currentTarget.dataset.id)
        var obj = {},
            _this = this
        obj.address_id = e.currentTarget.dataset.id,
            obj.user_id = wx.getStorageSync("ui").user_id
        obj.is_default = 1
        API_SITE.editdefault(obj).then(function (res) {
            // console.log(res)
            _this.siteinfo()
        })

    },
    /**
     * 删除地址
     */
    ordersitedel: function (e) {
        var address_id = e.currentTarget.dataset.id,
            _this = this
        // console.log(address_id)
        API_SITE.sitedel({ address_id: address_id }).then(function (res) {
            // console.log(res)
            wx.showToast({
                title: "删除成功",
                icon: "success",
                duration: 3e5
            }), setTimeout(function () {
                _this.siteinfo(),
                    wx.hideToast()
            }, 500)
        })
    },
    /**
     * 管理地址
     */
    editsite: function (e) {
        // console.log(e.currentTarget.dataset)
        var e = e.currentTarget.dataset,
        shade = ""
        if (e.address_id) {
           shade = true
            this.siteinfos(e)
        }else{
            shade = false
            this.setData({
                ress:{},
                district:false
            })
            this.region()
        }
        this.setData({
            editstart: false,
            shade:shade
        })
    },
    /**
     * 取消编辑
     */
    cupmodel: function(){
        this.setData({
            editstart:true
        })
    },
    /**
   * 地址详细信息
   */
    siteinfos: function (e) {
        // console.log(e)
        var _this = this
        e.user_id = wx.getStorageSync("ui").user_id
        API_SITE.sitelist(e).then(function (res) {
            // console.log(res.data)
            var obj = res.data[0],
                objs = {}
            objs.province = obj.province_id,
                objs.city = obj.city_id,
                objs.district = obj.district,
                objs.address = obj.address,
                objs.tel = obj.tel,
                objs.name = obj.name,
                objs.is_default = obj.is_default,
                objs.user_id = obj.user_id,
                objs.address_id = obj.address_id
            _this.region([obj.province, obj.city, obj.district]),
                _this.setData({
                    ress: objs,
                    is_default: obj.is_default,
                    shade: true
                })
            // console.log(_this.data.ress)
        })
    },
    ifarrfor: function (arr, obj) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].region_name == obj) {
                return arr[i]
            }
        }
    },
    /**
     * 省市区
     */
    region: function (e) {
        // console.log(e)
        var _this = this
        API_SITE.region().then(function (res) {
            // console.log(res.data)
            for (var key in res.data) {
                // console.log(res.data[key])
                _this.data.regionarry.push(res.data[key])
            }
            // console.log(_this.data.regionarry)
            if (e != undefined) {
                var province = _this.ifarrfor(_this.data.regionarry[0], e[0])
                var city = _this.ifarrfor(_this.data.regionarry[1], e[1])
                var district = _this.ifarrfor(_this.data.regionarry[2], e[2])
                // console.log(province,city,district)
                _this.data.ress.province = province.region_id
                _this.data.ress.city = city.region_id.toString()
                _this.data.ress.district = district.region_id
                _this.setData({
                    province: province,
                    city: city,
                    district: district
                })
            }

            _this.zxh(0, 0),
                _this.data.regionarrys[0] = _this.data.regionarry[0]
            _this.setData({
                regionarry: _this.data.regionarry,
                regionarrys: _this.data.regionarrys,
                regionindex: _this.data.regionindex,
            })
        })
    },
    bindMultiPickerChange: function (e) {
        // console.log(this.data.shades)
        if (this.data.shades == 1) {
            // console.log(1)
            this.zxh(0, 0)
        }
        var arr = this.data.regionarrys,
            z = e.detail.value
        // console.log('picker发送选择改变，携带值为', z)
        // console.log(arr)
        // console.log("省", arr[0][z[0]])
        // console.log("市", arr[1][z[1]])
        // console.log("区", arr[2][z[2]])
        this.data.ress.province = arr[0][z[0]].region_id,
            this.data.ress.city = arr[1][z[1]].region_id,
            this.data.ress.district = arr[2][z[2]].region_id,
            this.data.shades = 1
        this.setData({
            province: arr[0][z[0]],
            city: arr[1][z[1]],
            district: arr[2][z[2]]
        })
    },
    bindMultiPickerColumnChange: function (e) {
        // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var regionarry = this.data.regionarry,
            regionindex = this.data.regionindex,
            l = e.detail.column ? e.detail.column : 0,
            z = e.detail.value ? e.detail.value : 0
        this.data.shades++ ,
            this.data.regionindex[l] = z
        // console.log(regionarry[l][z])
        // this.ox(0),
        this.zxh(l, z),
            this.setData({
                regionarrys: this.data.regionarrys
            })

    },
    zxh: function (l, z) {
        var _this = this
        // console.log(l,z)
        if (l == 0) {
            _this.ox(z)
        } else if (l == 1) {
            _this.tx(z)
        } else {
            _this.sx(z)
        }
    },
    ox: function (e) {
        // console.log('值为0'+e)
        var arr = []
        for (var i = 0; i < this.data.regionarry[0].length; i++) {
            if (e == i) {
                // console.log(this.data.regionarry[0][i])
                this.data.regions.province = this.data.regionarry[0][i]
                // console.log('选中的0')
                // console.log(this.data.province)
            }
        }
        for (var j = 0; j < this.data.regionarry[1].length; j++) {
            if (this.data.regions.province.region_id == this.data.regionarry[1][j].parent_id) {
                arr.push(this.data.regionarry[1][j])
            }
        }
        this.data.regionarrys[1] = arr,
            this.tx(0),
            this.sx(0)
    },
    tx: function (e) {
        // console.log('值为1'+e)
        // console.log(this.data.regionindex)
        var arr = []
        for (var i = 0; i < this.data.regionarrys[1].length; i++) {
            if (e == i) {
                this.data.regions.city = this.data.regionarrys[1][i]
                // console.log('选中的1')
                // console.log(this.data.regionarrys[1][i])
            }
        }
        for (var j = 0; j < this.data.regionarry[2].length; j++) {
            if (this.data.regions.city.region_id == this.data.regionarry[2][j].parent_id) {
                arr.push(this.data.regionarry[2][j])
            }
        }
        this.data.regionarrys[2] = arr,
            this.sx(0)
    },
    sx: function (e) {
        // console.log('值为2'+e)
        // console.log(this.data.regionindex)

        for (var i = 0; i < this.data.regionarrys[2].length; i++) {
            if (e == i) {
                this.data.regions.district = this.data.regionarrys[2][i]
                // console.log('选中的2')
                // console.log(this.data.regionarrys[2][i])
            }
        }
    },
    /**
   * 添加地址
   */
  addsite: function () {
    var _this = this
    _this.data.ress.user_id = wx.getStorageSync("ui").user_id
    _this.data.ress.is_default = 1    
    // console.log(_this.data.ress)
    API_SITE.addsite(_this.data.ress).then(function(res){
    //   console.log(res)
        wx.showToast({
          title:res.msg,
          icon:"success",
          duration:3e5
        }),
        setTimeout(function(){
          wx.hideToast()
          if(res.status == 1){
            _this.setData({
                editstart:true
            }),
            _this.siteinfo()
          }
        },500)
    })
  },
  /**
   * 保存地址
   */
  editsites: function () {
    var _this = this
    _this.data.ress.user_id = wx.getStorageSync("ui").user_id,
    _this.data.ress.is_default = 1        
    // console.log(_this.data.ress)
    API_SITE.editsite(_this.data.ress).then(function(res){
    //   console.log(res)
        wx.showToast({
          title:res.msg,
          icon:"success",
          duration:3e5
        }),
        setTimeout(function(){
          wx.hideToast(),
          _this.setData({
            editstart:true
          }),
          _this.siteinfo()
        },500)
    })
  },
    /**
     * 姓名
     */
    inputname: function (e) {
        // console.log(e.detail.value)
        this.data.ress.name = e.detail.value
    },
    /**
     * tel
     */
    inputtel: function (e) {
        // console.log(e.detail.value)
        this.data.ress.tel = e.detail.value
    },
    /**
     * 详细地址
     */
    inputmsg: function (e) {
        // console.log(e.detail.value)
        this.data.ress.address = e.detail.value
    },
    /**
     * 打开模态框
     */
    sitemodel: function () {
        this.setData({
            shadestart: 1
        })
    },
    /**
     * 关闭模态框
     */
    closemodel: function () {
        this.setData({
            shadestart: 2
        }),
            this.reload()
    },
    /**
     * 协议
     */
    xi: function () {
        this.setData({
            xstart: !this.data.xstart
        })
    },
    /**
     * 微信支付
     */
    begin: function () {
        var t = this
        // console.log(t.data.xstart)
        if (t.data.xstart) {
            var order = t.data.orderinfo
            if(order.consignee && order.province && order.city && order.district && order.address && order.tel){
                wx.showToast({
                    title: "加载中",
                    icon: "loading",
                    duration: 3e5
                }),
                    t.addorder()
            }else{
                wx.showToast({
                    title: "请选择地址",
                    image: "/image/shibai.png",
                    duration: 3e5
                }), setTimeout(function () {
                    wx.hideToast()
                }, 500)
            }
            
        } else {
            wx.showToast({
                title: "请同意用户协议",
                image: "/image/shibai.png",
                duration: 3e5
            }), setTimeout(function () {
                wx.hideToast()
            }, 500)
        }

    },
    /**
     * 添加订单
     */
    addorder: function () {
        var t = this
        // console.log(t.data.orderinfo)
        API_ORDER.addorder(t.data.orderinfo).then(function (res) {
            // console.log(res)
            if (res.status == 1) {
                t.code(),
                t.data.order_id = res.data
            }else{
                // t.addorder()
            }
        })
    },
    /**
     * 支付
     */
    payment: function (e) {
        var obj = {},
            t = this
        obj.code = e,
        obj.goods_name = wx.getStorageSync("o").goods_info[0].goods_name
        obj.Total_fee = t.data.orderinfo.order_price
        // console.log(obj)
        API_PAY.wxpay(obj).then(function (res) {
            // console.log(res)
            wx.hideToast(),
                wx.requestPayment({
                    'timeStamp': res.timeStamp,
                    'nonceStr': res.nonceStr,
                    'package': res.package,
                    'signType': res.signType,
                    'paySign': res.paySign,
                    'success': function (res) {
                        // console.log(res)
                        var time = Date.parse(new Date()) / 1000
                        wx.showToast({
                            title: "支付成功",
                            icon: "success",
                            duration: 3e5
                        }),
                        API_ORDER.editorder({order_id:t.data.order_id,pay_status:"1",pay_time:time,actual_price:obj.Total_fee}).then(function(res){
                            // console.log(res)
                            setTimeout(function () {
                                wx.redirectTo({
                                    url: "../myorder/myorder?index=2"
                                }),
                                wx.hideToast()
                            }, 500)
                        })
                    },
                    'fail': function (res) {
                        // console.log(res)
                        wx.showToast({
                            title: "支付失败",
                            image: "/image/shibai.png",
                            duration: 3e5
                        }), setTimeout(function () {
                            wx.redirectTo({
                                url: "../myorder/myorder?index=1"
                            }),
                                wx.hideToast()
                        }, 500)
                    },
                    'complete': function () {
                        // console.log(t.data.couponinfo)
                        API_CART.cartdel({cart_id:t.data.cart_id}).then(function(res){
                            // console.log(res)
                        })
                    }
                })
        })
    },
    /**
     * code
     */
    code: function () {
        var t = this
        wx.login({
            success: res => {
                // console.log(res)
                t.payment(res.code)
            }
        })
    },
    /**
     * 商品详情
     */
    goodsinfo: function (e) {
        // console.log(e)
        var g = e.goods,
            gi = e.goods_info,
            zj = 0,
            yf = 0,
            yh = 0,
            num = 0,
            pri = 0,
            lp = 0,
            goods = []
        for (var i = 0; i < g.length; i++) {
            // console.log(g[i],gi[i])
            num = g[i].buy_num
            // 应付
            yf += g[i].price,
                // 清单
                goods.push(gi[i])
            if (g[i].sku_id) {
                for (var j = 0; j < gi[i].skuattr.length; j++) {
                    if (g[i].sku_id == gi[i].skuattr[j].sku_id) {
                        pri = gi[i].skuattr[j].price
                    }
                }
            } else {
                pri = gi[i].shop_price
            }
            zj += num * pri,
                yh = zj - yf
        }
        if(Object.keys(this.data.couponinfo).length != 0){
            // console.log(this.data.couponinfo)
            this.data.orderinfo.coupons = this.data.couponinfo.id,
            this.data.orderinfo.coupons_price = this.data.couponinfo.price
            yh +=Number(this.data.couponinfo.price)
            yf = yf-this.data.couponinfo.price
        }
        this.data.orderinfo.logistics_id = gi[0].logistics[0].id,
            lp = gi[0].logistics[0].price,
            yf += Number(lp),
            this.data.orderinfo.order_price = "" + yf + ""
        this.setData({
            yf: yf,
            lp: lp,
            zj: zj,
            yh: yh,
            goods: goods
        })

    },
    /**
     * 打开优惠券模态框
     */
    couponstart:function(){
        this.setData({
            couponstart:true
        })
    },
    /**
     * 关闭优惠券模态框
     */
    closeconpon: function () {
        this.setData({
            couponstart:false
        })
    },
    /**
     * 没有优惠券
     */
    couponnull:function(){
        wx.showToast({
            title:"暂无可用优惠券",
            icon:"loading",
            duration:1000
        }),setTimeout(function(){
            wx.hideToast()
        },500)
    },
    /**
     * 优惠券列表
     */
    couponlist:function(){
        var obj = {},
            that = this,
            yf = this.data.yf
        obj.uid = wx.getStorageSync("ui").user_id,
        obj.coupons_type = "1"
        API_COUPON.mycouponlist(obj).then(function(res){
            // console.log(res)
            if(res.status == 1){
                var arr =[]
                for(var i=0;i<res.data.length;i++){
                    // console.log(res.data)
                        var time = res.data[i].end_time ? res.data[i].end_time : ""
                        // console.log(time)
                        time = time.replace(/-/g,'/')
                        // console.log(time)                        
                        var date = new Date(time),
                             time = date.getTime(),
                             newtime = new Date().getTime()
                        // console.log(time,newtime)
                        res.data[i].end_times = time,
                        res.data[i].new_time = newtime
                        res.data[i].min_price = Number(res.data[i].min_price)
                        if(res.data[i].new_time < res.data[i].end_times){
                            if( yf > res.data[i].min_price){
                                res.data[i].status = true
                            }else{
                                res.data[i].status = false
                            }
                            arr.push(res.data[i])
                        }
                }
                res.data = arr
            }else{
                res.data = []
            }
            that.setData({
                couponlist:res.data
            })
        })
    },
    /**
     * 选择优惠券
     */
    cupcoupon:function(e){
        var e = e.currentTarget.dataset
        // console.log(e)
        this.setData({
            couponinfo:e.item
        }),
        this.reload(),
        this.closeconpon()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.cart_id = options.cart_id ? options.cart_id :""
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
        wx.removeStorageSync("o")
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
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