// pages/proDetails/prodetails.js
var API = require("../../api/api.goods"),
    API_CART = require("../../api/api.cart"),
    app = getApp(),
    WxParse = require("../../wxParse/wxParse")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsinfo: "",
        shade: 0,
        sku: { num: 1 },
        firstIndex: -1,
        commodityAttr: [],
        attrValueList: []
    },
    /**
     * 去购物车
     */
    gocart: function () {
        // console.log(1)
        wx.switchTab({
            url: "../cart/cart"
        })
    },
    /**
     * 添加购物车
     */
    addcart: function () {
        // console.log(1)
        var _this = this,
            uid = wx.getStorageSync("ui").user_id
        // console.log(_this.submit())
        if (!_this.submit()) {
            wx.showToast({
                title: "请选择规格",
                icon: "loading",
                duration: 1000
            }), setTimeout(function () {
                wx.hideToast()
            }, 500)
        } else {
            // console.log(_this.data.sku)
            API_CART.cartlist({ user_id: uid }).then(function (res) {
                // console.log(res.data)
                // console.log(_this.data.goods_info)
                var cartinfo = []
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].gid == _this.data.goods_info.goods_id) {
                        if(res.data[i].sku_id != null){
                            if(res.data[i].sku_id == _this.data.sku.sid){
                                cartinfo.unshift(res.data[i])
                            }
                        }else{
                            cartinfo.push(res.data[i])
                        }
                        
                    }
                }
                // console.log(cartinfo)
                // console.log(_this.data.sku)
                if (cartinfo.length != 0) {
                    var cart = cartinfo[0]
                    if (cart.sku_id == null) {
                        // console.log(cart.num,_this.data.sku.num,_this.data.goods_info.goods_number)
                        if ((Number(cart.num) + _this.data.sku.num) <= Number(_this.data.goods_info.goods_number)) {
                            if (_this.data.sku.sid) {
                                if (_this.data.skuinfo.sku_number < 1 || (_this.data.skuinfo.sku_number - _this.data.sku.num) < 0) {
                                    wx.showToast({
                                        title: "库存不足",
                                        image: "/image/shibai.png",
                                        duration: 1000
                                    }), setTimeout(function () {
                                        wx.hideToast()
                                    }, 500)
                                } else {
                                    API_CART.addcart(_this.data.sku).then(function (res) {
                                        // console.log(res)
                                        if (res.status == 1) {
                                            _this.cartlist()
                                            wx.showToast({
                                                title: res.msg,
                                                icon: "success",
                                                duration: 3e5
                                            })
                                            setTimeout(function () {
                                                wx.hideToast()
                                            }, 500)
                                        } else {
                                            wx.showToast({
                                                title: res.msg,
                                                icon: none,
                                                duration: 3e5
                                            })
                                            setTimeout(function () {
                                                wx.hideToast()
                                            }, 500)
                                        }
                                    })
                                }
                            } else {
                                if (_this.data.goodsinfo.goods_number < 1 || (_this.data.goodsinfo.goods_number - _this.data.sku.num) < 0) {
                                    wx.showToast({
                                        title: "库存不足",
                                        image: "/image/shibai.png",
                                        duration: 1000
                                    }), setTimeout(function () {
                                        wx.hideToast()
                                    }, 500)
                                } else {
                                    API_CART.addcart(_this.data.sku).then(function (res) {
                                        // console.log(res)
                                        if (res.status == 1) {
                                            _this.cartlist()
                                            wx.showToast({
                                                title: res.msg,
                                                icon: "success",
                                                duration: 3e5
                                            })
                                            setTimeout(function () {
                                                wx.hideToast()
                                            }, 500)
                                        } else {
                                            wx.showToast({
                                                title: res.msg,
                                                icon: none,
                                                duration: 3e5
                                            })
                                            setTimeout(function () {
                                                wx.hideToast()
                                            }, 500)
                                        }
                                    })
                                }
                            }
                        } else {
                            wx.showToast({
                                title: "库存不足",
                                image: "/image/shibai.png",
                                duration: 1000
                            }), setTimeout(function () {
                                wx.hideToast()
                            }, 500)
                        }
                    } else {
                        // console.log(cart,_this.data.sku)
                        if (cart.sku_id == _this.data.sku.sid) {
                            var cartattr = []
                            for (var i = 0; i < _this.data.goods_info.skuattr.length; i++) {
                                if (_this.data.goods_info.skuattr[i].sku_id == cart.sku_id) {
                                    cartattr.push(_this.data.goods_info.skuattr[i])
                                }
                            }
                            // console.log(cartattr)
                            if ((Number(cart.num) + _this.data.sku.num) <= Number(cartattr[0].sku_number)) {
                                if (_this.data.sku.sid) {
                                    if (_this.data.skuinfo.sku_number < 1 || (_this.data.skuinfo.sku_number - _this.data.sku.num) < 0) {
                                        wx.showToast({
                                            title: "库存不足",
                                            image: "/image/shibai.png",
                                            duration: 1000
                                        }), setTimeout(function () {
                                            wx.hideToast()
                                        }, 500)
                                    } else {
                                        API_CART.addcart(_this.data.sku).then(function (res) {
                                            // console.log(res)
                                            if (res.status == 1) {
                                                _this.cartlist()
                                                wx.showToast({
                                                    title: res.msg,
                                                    icon: "success",
                                                    duration: 3e5
                                                })
                                                setTimeout(function () {
                                                    wx.hideToast()
                                                }, 500)
                                            } else {
                                                wx.showToast({
                                                    title: res.msg,
                                                    icon: none,
                                                    duration: 3e5
                                                })
                                                setTimeout(function () {
                                                    wx.hideToast()
                                                }, 500)
                                            }
                                        })
                                    }
                                } else {
                                    if (_this.data.goodsinfo.goods_number < 1 || (_this.data.goodsinfo.goods_number - _this.data.sku.num) < 0) {
                                        wx.showToast({
                                            title: "库存不足",
                                            image: "/image/shibai.png",
                                            duration: 1000
                                        }), setTimeout(function () {
                                            wx.hideToast()
                                        }, 500)
                                    } else {
                                        API_CART.addcart(_this.data.sku).then(function (res) {
                                            // console.log(res)
                                            if (res.status == 1) {
                                                _this.cartlist()
                                                wx.showToast({
                                                    title: res.msg,
                                                    icon: "success",
                                                    duration: 3e5
                                                })
                                                setTimeout(function () {
                                                    wx.hideToast()
                                                }, 500)
                                            } else {
                                                wx.showToast({
                                                    title: res.msg,
                                                    icon: none,
                                                    duration: 3e5
                                                })
                                                setTimeout(function () {
                                                    wx.hideToast()
                                                }, 500)
                                            }
                                        })
                                    }
                                }
                            } else {
                                // console.log(5)
                                wx.showToast({
                                    title: "库存不足",
                                    image: "/image/shibai.png",
                                    duration: 1000
                                }), setTimeout(function () {
                                    wx.hideToast()
                                }, 500)
                            }
                        }else{
                            if (_this.data.skuinfo.sku_number < 1 || (_this.data.skuinfo.sku_number - _this.data.sku.num) < 0) {
                                wx.showToast({
                                    title: "库存不足",
                                    image: "/image/shibai.png",
                                    duration: 1000
                                }), setTimeout(function () {
                                    wx.hideToast()
                                }, 500)
                            } else {
                                API_CART.addcart(_this.data.sku).then(function (res) {
                                    // console.log(res)
                                    if (res.status == 1) {
                                        _this.cartlist()
                                        wx.showToast({
                                            title: res.msg,
                                            icon: "success",
                                            duration: 3e5
                                        })
                                        setTimeout(function () {
                                            wx.hideToast()
                                        }, 500)
                                    } else {
                                        wx.showToast({
                                            title: res.msg,
                                            icon: none,
                                            duration: 3e5
                                        })
                                        setTimeout(function () {
                                            wx.hideToast()
                                        }, 500)
                                    }
                                })
                            }
                        }
                    }
                } else {
                    if (_this.data.sku.sid) {
                        if (_this.data.skuinfo.sku_number < 1 || (_this.data.skuinfo.sku_number - _this.data.sku.num) < 0) {
                            wx.showToast({
                                title: "库存不足",
                                image: "/image/shibai.png",
                                duration: 1000
                            }), setTimeout(function () {
                                wx.hideToast()
                            }, 500)
                        } else {
                            API_CART.addcart(_this.data.sku).then(function (res) {
                                // console.log(res)
                                if (res.status == 1) {
                                    _this.cartlist()
                                    wx.showToast({
                                        title: res.msg,
                                        icon: "success",
                                        duration: 3e5
                                    })
                                    setTimeout(function () {
                                        wx.hideToast()
                                    }, 500)
                                } else {
                                    wx.showToast({
                                        title: res.msg,
                                        icon: none,
                                        duration: 3e5
                                    })
                                    setTimeout(function () {
                                        wx.hideToast()
                                    }, 500)
                                }
                            })
                        }
                    } else {
                        if (_this.data.goodsinfo.goods_number < 1 || (_this.data.goodsinfo.goods_number - _this.data.sku.num) < 0) {
                            wx.showToast({
                                title: "库存不足",
                                image: "/image/shibai.png",
                                duration: 1000
                            }), setTimeout(function () {
                                wx.hideToast()
                            }, 500)
                        } else {
                            API_CART.addcart(_this.data.sku).then(function (res) {
                                // console.log(res)
                                if (res.status == 1) {
                                    _this.cartlist()
                                    wx.showToast({
                                        title: res.msg,
                                        icon: "success",
                                        duration: 3e5
                                    })
                                    setTimeout(function () {
                                        wx.hideToast()
                                    }, 500)
                                } else {
                                    wx.showToast({
                                        title: res.msg,
                                        icon: none,
                                        duration: 3e5
                                    })
                                    setTimeout(function () {
                                        wx.hideToast()
                                    }, 500)
                                }
                            })
                        }
                    }
                }
            })

            _this.setData({
                shade: 0
            })
        }
    },
    /**
     * 购物车列表
     */
    cartlist: function () {
        var _this = this,
            user_id = wx.getStorageSync("ui").user_id
        API_CART.cartlist({ user_id: user_id }).then(function (res) {
            // console.log(res)
            _this.setData({
                cartnum: res.data.length
            })
        })
    },
    /**
     * 立即购买
     */
    buynow: function () {
        // console.log(this.data.sku)
        var o = wx.getStorageSync("o") ? wx.getStorageSync("o") : {},
            obj = {}
        o.goods = o.goods ? o.goods : [],
            o.goods_info = o.goods_info ? o.goods_info : []
        if (this.data.sku.sid) {
            for (var i = 0; i < this.data.goods_info.skuattr.length; i++) {
                if (this.data.goods_info.skuattr[i].sku_id == this.data.sku.sid) {
                    obj.goods_price = this.data.goods_info.skuattr[i].price
                }
            }
            obj.sku_id = this.data.sku.sid
        } else {
            obj.goods_price = this.data.goods_info.discount == 2 ? this.data.goods_info.discount_price : this.data.goods_info.shop_price
        }
        obj.goods_id = this.data.sku.gid,
            obj.buy_num = this.data.sku.num,
            obj.price = obj.goods_price * obj.buy_num

        // console.log(obj,o)
        o.goods.push(obj)
        o.goods_info.push(this.data.goods_info)
        if (!this.submit()) {
            wx.showToast({
                title: "请选择规格",
                icon: "loading",
                duration: 1000
            }), setTimeout(function () {
                wx.hideToast()
            }, 500)
        } else {
            if (this.data.sku.sid) {
                if (this.data.skuinfo.sku_number < 1 || (this.data.skuinfo.sku_number - this.data.sku.num) < 0) {
                    wx.showToast({
                        title: "库存不足",
                        image: "/image/shibai.png",
                        duration: 1000
                    }), setTimeout(function () {
                        wx.hideToast()
                    }, 500)
                } else {
                    wx.setStorageSync("o", o),
                        this.setData({
                            shade: 0
                        })
                    wx.navigateTo({
                        url: "../affirm/affirm"
                    })
                }
            } else {
                if (this.data.goodsinfo.goods_number < 1 || (this.data.goodsinfo.goods_number - this.data.sku.num) < 0) {
                    wx.showToast({
                        title: "库存不足",
                        image: "/image/shibai.png",
                        duration: 1000
                    }), setTimeout(function () {
                        wx.hideToast()
                    }, 500)
                } else {
                    wx.setStorageSync("o", o),
                        this.setData({
                            shade: 0
                        })
                    wx.navigateTo({
                        url: "../affirm/affirm"
                    })
                }
            }

        }

    },
    /**
     * 格式选择
     */
    openformat: function (e) {
        var obj = e.currentTarget.dataset
        // console.log(obj,this.submit())
        if (this.submit()) {
            if (obj.num == 2) {
                this.addcart(),
                    obj.num = 0
            } else if (obj.num == 3) {
                this.buynow(),
                    obj.num = 0
            }
        }
        this.setData({
            shade: obj.num
        })
        // console.log(this.data.shade)
    },
    /**
     * 判断属性是否选择
     */
    submit: function () {
        var value = [];
        for (var i = 0; i < this.data.attrValueList.length; i++) {
            if (!this.data.attrValueList[i].selectedValue) {
                break;
            }
            value.push(this.data.attrValueList[i].selectedValue);
        }
        if (i < this.data.attrValueList.length) {
            return false
        } else {
            return true
        }
    },
    /**
     * 数量
     */
    addnum: function (e) {
        var sku = this.data.sku,
            num = e.currentTarget.dataset.num
        if (num > sku.num) {
            sku.num++
        }
        this.setData({
            sku: sku
        })
        // console.log(sku)
    },
    delnum: function () {
        var sku = this.data.sku
        if (sku.num > 1) {
            sku.num--
        }
        this.setData({
            sku: sku
        })
        // console.log(sku)
    },
    /**
     * 加载
     */
    reload: function () {
        var that = this
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 3e4
        }), API.goodsinfo({ goods_id: that.data.sku.gid }).then(function (res) {
            // console.log(res.data)
            var arr = res.data,
                lj = wx.getStorageSync("ls") ? wx.getStorageSync("ls") : [],
                cat_id = arr.cat_id,
                start = false
            if (lj.length != 0) {
                for (var i = 0; i < lj.length; i++) {
                    if (lj[i].cat_id == cat_id) {
                        lj[i].num++ ,
                            start = true
                    }
                }
                // console.log(start)
                if (!start) {
                    var obj = {}
                    obj.cat_id = cat_id,
                        obj.num = 1
                    lj.push(obj)
                }
            } else {
                // console.log(1)
                var obj = {}
                obj.cat_id = cat_id,
                    obj.num = 1
                lj.push(obj)
            }

            // console.log(lj)
            wx.setStorageSync("ls", lj)

            for (var i = 0; i < arr.skuattr.length; i++) {
                var item = arr.skuattr[i],
                    name = item.attr_name.split(","),
                    value = item.attr_value.split(","),
                    attrlist = []

                // console.log(name)
                // console.log(value)
                for (var j = 0; j < name.length; j++) {
                    var obj = {}
                    obj.attrKey = name[j],
                        obj.attrValue = value[j]
                    attrlist.push(obj)
                }
                // console.log(attrlist)
                item.attrValueList = attrlist

            }
            // 富文本解析
            // console.log(arr)
            if (arr.goods_desc != null) {
                WxParse.wxParse('goods_desc', 'html', arr.goods_desc, that, 5)
            }
            that.cartlist(),
                that.setData({
                    goods_info: arr,
                    imgurl: app.globalData.imgurl,
                    includeGroup: arr.skuattr,
                    commodityAttr: arr.skuattr
                }),
                that.distachAttrValue(arr.skuattr),
                setTimeout(function () {
                    wx.hideToast()
                }, 500)
        })
    },
    /* 获取数据 */
    distachAttrValue: function (commodityAttr) {
        // console.log(commodityAttr)
        /**
          将后台返回的数据组合成类似
          {
            attrKey:'型号',
            attrValueList:['1','2','3']
          }
        */
        // 把数据对象的数据（视图使用），写到局部内 
        var attrValueList = this.data.attrValueList;
        // 遍历获取的数据 
        for (var i = 0; i < commodityAttr.length; i++) {
            for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {

                var attrIndex = this.getAttrIndex(commodityAttr[i].attrValueList[j].attrKey, attrValueList);
                // console.log('属性索引', attrIndex);  
                // 如果还没有属性索引为-1，此时新增属性并设置属性值数组的第一个值；索引大于等于0，表示已存在的属性名的位置 
                if (attrIndex >= 0) {
                    // 如果属性值数组中没有该值，push新值；否则不处理 
                    if (!this.isValueExist(commodityAttr[i].attrValueList[j].attrValue, attrValueList[attrIndex].attrValues)) {
                        attrValueList[attrIndex].attrValues.push(commodityAttr[i].attrValueList[j].attrValue);
                    }
                } else {
                    attrValueList.push({
                        attrKey: commodityAttr[i].attrValueList[j].attrKey,
                        attrValues: [commodityAttr[i].attrValueList[j].attrValue]
                    });
                }
            }
        }
        // console.log('result', attrValueList) 
        for (var i = 0; i < attrValueList.length; i++) {
            for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
                if (attrValueList[i].attrValueStatus) {
                    attrValueList[i].attrValueStatus[j] = true;
                } else {
                    attrValueList[i].attrValueStatus = [];
                    attrValueList[i].attrValueStatus[j] = true;
                }
            }
        }
        this.setData({
            attrValueList: attrValueList
        });
    },
    getAttrIndex: function (attrName, attrValueList) {
        // 判断数组中的attrKey是否有该属性值 
        for (var i = 0; i < attrValueList.length; i++) {
            if (attrName == attrValueList[i].attrKey) {
                break;
            }
        }
        return i < attrValueList.length ? i : -1;
    },
    isValueExist: function (value, valueArr) {
        // 判断是否已有属性值 
        for (var i = 0; i < valueArr.length; i++) {
            if (valueArr[i] == value) {
                break;
            }
        }
        return i < valueArr.length;
    },

    /* 选择属性值事件 */
    selectAttrValue: function (e) {
        // console.log(e.currentTarget.dataset)
        /*
        点选属性值，联动判断其他属性值是否可选
        {
          attrKey:'型号',
          attrValueList:['1','2','3'],
          selectedValue:'1',
          attrValueStatus:[true,true,true]
        }
        // console.log(e.currentTarget.dataset);
        */
        var attrValueList = this.data.attrValueList;
        var index = e.currentTarget.dataset.index;//属性索引 
        var key = e.currentTarget.dataset.key;
        var value = e.currentTarget.dataset.value;
        if (e.currentTarget.dataset.status || index == this.data.firstIndex) {
            if (e.currentTarget.dataset.selectedvalue == e.currentTarget.dataset.value) {
                // 取消选中 
                this.disSelectValue(attrValueList, index, key, value);
            } else {
                // 选中 
                this.selectValue(attrValueList, index, key, value);
            }

        }
        // console.log(this.data.includeGroup) 
        if (this.data.includeGroup.length == 1) {
            // console.log(this.data.sku,this.data.includeGroup)
            if (this.data.sku.num > this.data.includeGroup[0].sku_number) {
                this.data.sku.num = this.data.includeGroup[0].sku_number
            }
            this.data.sku.sid = this.data.includeGroup[0].sku_id
            this.setData({
                sku: this.data.sku,
                skuinfo: this.data.includeGroup[0]
            })
        }
    },

    /* 选中 */
    selectValue: function (attrValueList, index, key, value, unselectStatus) {

        // console.log(attrValueList)        
        // console.log(index)        
        // console.log(key)        
        // console.log(value)        
        // console.log(unselectStatus)        
        // console.log('firstIndex', this.data.firstIndex); 
        var includeGroup = [];
        if (index == this.data.firstIndex && !unselectStatus) { // 如果是第一个选中的属性值，则该属性所有值可选 
            var commodityAttr = this.data.commodityAttr;
            // 其他选中的属性值全都置空 
            // console.log('其他选中的属性值全都置空', index, this.data.firstIndex, !unselectStatus); 

            for (var i = 0; i < attrValueList.length; i++) {
                for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
                    attrValueList[i].selectedValue = '';
                }
            }
        } else {
            var commodityAttr = this.data.includeGroup;
        }

        // console.log('选中', commodityAttr, index, key, value); 
        for (var i = 0; i < commodityAttr.length; i++) {
            for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
                if (commodityAttr[i].attrValueList[j].attrKey == key && commodityAttr[i].attrValueList[j].attrValue == value) {
                    includeGroup.push(commodityAttr[i]);
                }
            }
        }
        attrValueList[index].selectedValue = value;

        // 判断属性是否可选 
        for (var i = 0; i < attrValueList.length; i++) {
            for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
                attrValueList[i].attrValueStatus[j] = false;
            }
        }
        for (var k = 0; k < attrValueList.length; k++) {
            for (var i = 0; i < includeGroup.length; i++) {
                for (var j = 0; j < includeGroup[i].attrValueList.length; j++) {
                    if (attrValueList[k].attrKey == includeGroup[i].attrValueList[j].attrKey) {
                        for (var m = 0; m < attrValueList[k].attrValues.length; m++) {
                            if (attrValueList[k].attrValues[m] == includeGroup[i].attrValueList[j].attrValue) {
                                attrValueList[k].attrValueStatus[m] = true;
                            }
                        }
                    }
                }
            }
        }
        // console.log('结果', attrValueList); 
        this.setData({
            attrValueList: attrValueList,
            includeGroup: includeGroup
        });

        var count = 0;
        for (var i = 0; i < attrValueList.length; i++) {
            for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
                if (attrValueList[i].selectedValue) {
                    count++;
                    break;
                }
            }
        }
        if (count < 2) {// 第一次选中，同属性的值都可选 
            this.setData({
                firstIndex: index
            });
        } else {
            this.setData({
                firstIndex: -1
            });
        }
    },

    /* 取消选中 */
    disSelectValue: function (attrValueList, index, key, value) {
        var commodityAttr = this.data.commodityAttr;
        attrValueList[index].selectedValue = '';

        // 判断属性是否可选 
        for (var i = 0; i < attrValueList.length; i++) {
            for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
                attrValueList[i].attrValueStatus[j] = true;
            }
        }
        this.setData({
            includeGroup: commodityAttr,
            attrValueList: attrValueList
        });

        for (var i = 0; i < attrValueList.length; i++) {
            if (attrValueList[i].selectedValue) {
                this.selectValue(attrValueList, i, attrValueList[i].attrKey, attrValueList[i].selectedValue, true);
            }
        }
    },
    /**
     * 确定
     */
    ensure: function () {
        this.setData({
            shade: 0
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options)
        this.data.sku.gid = options.goodsid,
            this.data.sku.user_id = wx.getStorageSync("ui").user_id,
            this.data.sku.num = 1
        // console.log(this.data.sku)
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