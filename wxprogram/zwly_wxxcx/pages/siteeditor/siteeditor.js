// pages/siteeditor/siteeditor.js
var API_SITE = require("../../api/api.site")
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    shades: 1
  },
  /**
   * 加载
   */
  reload: function (e) {
    // console.log(e)
    var _this = this
    wx.showToast({
      title: "加载中",
      icon: "loading",
      duration: 3e5
    })

    if (Object.keys(e).length != 0) {
      _this.siteinfo(e)
    } else {
      _this.region()
    }
    setTimeout(function () {
      wx.hideToast()
    }, 500)
  },
  /**
   * 地址详细信息
   */
  siteinfo: function (e) {
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
        _this.data.ress.city = city.region_id
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
    // console.log(this.data.ress)
    API_SITE.addsite(_this.data.ress).then(function (res) {
      // console.log(res)
      if (res.status == 1) {
        wx.showToast({
          title: res.msg,
          icon: "success",
          duration: 3e5
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "success",
          image: "/image/shibai.png",
          duration: 3e5
        })
      }
      setTimeout(function () {
        wx.hideToast()
        if (res.status == 1) {
          wx.navigateBack()
        }
      }, 500)
      
    })
  },
  /**
   * 保存地址
   */
  editsite: function () {
    var _this = this
    _this.data.ress.user_id = wx.getStorageSync("ui").user_id
    // console.log(_this.data.ress)
    API_SITE.editsite(_this.data.ress).then(function (res) {
      // console.log(res)
      if (res.status == 1) {
        wx.showToast({
          title: res.msg,
          icon: "success",
          duration: 3e5
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "success",
          image: "/image/shibai.png",
          duration: 3e5
        })
      }
      setTimeout(function () {
        wx.hideToast()
        if (res.status == 1) {
          wx.navigateBack()
        }
      }, 500)
      
    })
  },
  /**
   * 默认
   */
  default: function () {
    if (this.data.is_default != 1) {
      this.data.is_default = 1
    } else {
      this.data.is_default = 2
    }
    this.data.ress.is_default = this.data.is_default
    this.setData({
      is_default: this.data.is_default
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    if (Object.keys(options).length != 0) {
      wx.setNavigationBarTitle({
        title: '编辑地址'
      })
    }
    this.reload(options)
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

  }
})