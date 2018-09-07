// 打包时修改skin，host即可
const skin = 'mbs'  // 康同堂皮肤ktt 曼博士mbs
const host = "http://www.mbs.test.cn"
const styleObjKtt = {
    themeColor: '#F7B400',
    fontStyle: 'saffron_yellow', // app字体风格 康同堂saffron_yellow 曼博士用另一个类名
    bgStyle: 'saffron_yellow_bg',
    shopCartUrl: require('../../assets/img/minitcart.png'), // 购物车图标 vue中动态加载图片必须通过require的形式
    obligationUrl: require('../../assets/img/obligation.png'), // 待付款
    toBeServeUrl: require('../../assets/img/toBeServe.png'),   // 待预约
    toBeRecivedUrl: require('../../assets/img/toBeRecived.png'), // 待服务收货
    toBeEvaluatedUrl: require('../../assets/img/toBeEvaluated.png'), // 待评价
    starUrl: require('../../assets/img/ktt/star.png'), // 五角星
    grayStarUrl: require('../../assets/img/ktt/graystar.png'), // 灰色五角星
    authorityUrl: require('../../assets/img/authority.png'), // 健管师认证
    couponUrl: require('../../assets/img/ktt/coupon.png'), // 优惠券背景图
    receivedCouponUrl: require('../../assets/img/ktt/couponReceived.png'), // 已领取优惠券
    doctorUrl: require('../../assets/img/ktt/doctor.png'), // 健管师主页医生头像
    advisoryIcons: require('../../assets/img/ktt/chat.png'), // 健管师主页咨询图标
    choosedUrl: require('../../assets/img/ktt/choosed.png'),
    couponFontstyle: '#F9B500', // 优惠券中心字体颜色
    receivedCouponFontstyle: ' #5D5D5D' // 优惠券中心已领取优惠券字体颜色
}
const styleObjMbs = {
    themeColor: '#299219',
    fontStyle: 'saffron_blue',
    bgStyle: 'saffron_blue_bg',
    shopCartUrl: require('../../assets/img/minitcart.png'), // 购物车图标 vue中动态加载图片必须通过require的形式
    obligationUrl: require('../../assets/img/obligation.png'), // 待付款
    toBeServeUrl: require('../../assets/img/toBeServe.png'),   // 待预约
    toBeRecivedUrl: require('../../assets/img/toBeRecived.png'), // 待服务收货
    toBeEvaluatedUrl: require('../../assets/img/toBeEvaluated.png'), // 待评价
    starUrl: require('../../assets/img/mbs/star.png'), // 五角星
    grayStarUrl: require('../../assets/img/mbs/graystar.png'), // 灰色五角星
    authorityUrl: require('../../assets/img/authority.png'), // 健管师认证
    couponUrl: require('../../assets/img/ktt/coupon.png'), // 优惠券背景图
    receivedCouponUrl: require('../../assets/img/ktt/couponReceived.png'), // 已领取优惠券
    doctorUrl: require('../../assets/img/ktt/doctor.png'), // 健管师主页医生头像
    advisoryIcons: require('../../assets/img/ktt/chat.png'), // 健管师主页咨询图标
    choosedUrl: require('../../assets/img/ktt/choosed.png'),
    couponFontstyle: '#F9B500', // 优惠券字体颜色
    receivedCouponFontstyle: ' #5D5D5D' // 已领取优惠券字体颜色
}
export const styleConfig = (skin === 'ktt' ? styleObjKtt : styleObjMbs);
export const ajaxRequest = {
    jsonToParam: function (obj) {
        var ret = [];
        for (var k in obj) {
          ret.push(k + '=' + encodeURIComponent(obj[k]));
        }
        return ret.join('&');
    },
    post: function (url, data, callback) {
        axios.post(host + url, this.jsonToParam(data)).then(function (ret) {
            var data = ret.data;
            callback(data);
        }).catch(function (e) {
            console.log(e);
        });
    },
    get: function (url, data, callback) {
        axios.post(host + url, this.jsonToParam(data)).then(function (ret) {
            var data = ret.data;
            callback(data);
        }).catch(function (e) {
            console.log(e);
        });
    }
}