var myAxios = { // 此js需与app.js一起使用
  baseUrl: host_ + 'api/',
  //截取地址栏中的数据
  GetQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },

  jsonToParam: function (obj) {
    var ret = [];
    for (var k in obj) {
      ret.push(k + '=' + encodeURIComponent(obj[k]));
    }
    return ret.join('&');
  },

  post: function (url, data, callback) {
    axios.post(this.baseUrl + url, this.jsonToParam(data)).then(function (ret) {
      var data = ret.data;
      // if (data.resultCode == 200) {
      //   callback(data);
      // } else {
      //   alert(data.resultMsg);
      // }
      callback(data);
    }).catch(function (e) {
      console.log(e);
    });
  },

  get: function (url, data, callback) {
    axios.post(this.baseUrl + url, this.jsonToParam(data)).then(function (ret) {
      var data = ret.data;
      if (data.resultCode == 200) {
        callback(data);
      } else {
        console.log(e);
      }
    }).catch(function (e) {
      console.log(e);
    });
  }
};