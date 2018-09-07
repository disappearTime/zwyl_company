//加密电话号码中间4位；
function handlePhoneNumber(str){
    var str='1366668888';  
    var str2 = str.substr(0,3)+"****"+str.substr(7); 
    return str2;
}

//倒计时
function countDown(endTime){
    var endTime=endTime;
    //var startTmie=startTmie;
    var now =new Date().getTime();
     var d,h,m,s;
    if(endTime>now){
        var leftTime = endTime-now;
        var d,h,m,s;
        d = checkNumber(Math.floor(leftTime/1000/60/60/24));
        h = checkNumber(Math.floor(leftTime/1000/60/60%24));
        m = checkNumber(Math.floor(leftTime/1000/60%60));
        s = checkNumber(Math.floor(leftTime/1000%60));
        var totalH = checkNumber(Math.floor(leftTime/1000/60/60));
        $('#day').text(totalH);
        $('#min').text(m)
        $('#second').text(s);
        var str = h+'-'+m+'-'+s;
    }else{
        $('.group-buy__countdown-time .countDown').html('该活动已经结束')
        //alert('该活动已经结束');
        //console.log('该活动已经结束')
    }
}
function count_Down(endTime){
    var endTime = endTime;
    var now =new Date().getTime();
    var d,h,m,s;
    if(endTime>now){
        var leftTime = endTime-now;
        var d,h,m,s;
        d = checkNumber(Math.floor(leftTime/1000/60/60/24));
        h = checkNumber(Math.floor(leftTime/1000/60/60%24));
        m = checkNumber(Math.floor(leftTime/1000/60%60));
        s = checkNumber(Math.floor(leftTime/1000%60));
        var totalH = checkNumber(Math.floor(leftTime/1000/60/60));
        $('#day').text(totalH);
        $('#min').text(m)
        $('#second').text(s);
    }
}

 //处理两位数
function checkNumber(n){
    var n=parseFloat(n)
    return n=n>9?n:'0'+n;
}

//隐藏遮罩层
function hidePop(){
    $('#my_popup').hide();
    $('#my_mask').hide();
};

// 获取手机类型
function getPhoneType(){ 
    var phoneType = '';
    var u = navigator.userAgent;
    if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Linux') > -1){
        phoneType = 'android'
    }else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iPhone') > -1){
        phoneType = 'ios'
    }else if(u.indexOf('Windows Phone') > -1){
        phoneType = 'winphone';
    };
    return phoneType;
};

/*获取url参数*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function formatTime(time){ // 将时间戳转成年月日 例如 2018-02-04 参数为时间戳
    var retTime;
    if(time){
        var date = new Date(time); 
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate()< 10 ? '0'+(date.getDate()) : date.getDate()) + '';
        retTime = (Y+M+D);
    }else{
        retTime = ''
    }
    
    return retTime;
}
function hidePhone(str){ // 若为手机号中间显示*号。保护用户隐私
    var ret = ''
    if(str){
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(reg.test(str)){
            ret = str.substr(0, 3) + '****' + str.substr(7);
        }else{
            ret = str;
        }
    }
    return ret;
}
function isWeiXin(){
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
function getAllParams(){ // 截取字符串后面所有参数
    var url = location.href;
    var ret = url.split('?')[1];
    return ret;
}
function get_client_ip() {
    if(getenv('HTTP_CLIENT_IP') && strcasecmp(getenv('HTTP_CLIENT_IP'), 'unknown')) {
        $ip = getenv('HTTP_CLIENT_IP');
    } else if(getenv('HTTP_X_FORWARDED_FOR') && strcasecmp(getenv('HTTP_X_FORWARDED_FOR'), 'unknown')) {
        $ip = getenv('HTTP_X_FORWARDED_FOR');
    } else if(getenv('REMOTE_ADDR') && strcasecmp(getenv('REMOTE_ADDR'), 'unknown')) {
        $ip = getenv('REMOTE_ADDR');
    } else if(isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], 'unknown')) {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return preg_match ( '/[\d\.]{7,15}/', $ip, $matches ) ? $matches [0] : '';
}
function formatTime_ymdhms(time){ // 将时间戳转成年月日时分秒 例如 2018-02-04 参数为时间戳
    var retTime;
    if(time){
        var date = new Date(time); 
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate()< 10 ? '0'+(date.getDate()) : date.getDate()) + '';
        var H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        retTime = (Y + M + D + "   " + H + ":" + m + ":" + s);
    }else{
        retTime = ''
    }
    
    return retTime;
}
function randomString(len) { // 随机生成一个字符串，参数不传时默认长度32位
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}
function sub_str(str,len){ // 截取字符串前len位
    var ret = "";
    if(str){
        ret = str.substring(0,len)
    }
    return ret;
}
function toFixed_len(num,len){ // 保留参数len位小数,参数是字符串数字或则数字
    var ret = num + "";
    if(ret){ // 0为false "0"为真   参数不为空
       var num_ = Number(num);
       ret = num_.toFixed(len); 
    }
    return ret;
}
//下载弹框
function toDownload(){
    $('.download').show();
}
function download_app(){ // 调用这个方法需要引入app.js
    var phoneType = getPhoneType();
    if(phoneType == 'android'){
        // var iswx = isWeiXin();
        // if(iswx){ // 微信内进入应用下载
        //     window.location.href = 'https://www.pgyer.com/fvuA'
        // }else{
        //     window.location.href = az_apk
        // }
        window.location.href = pgy_app
    }else if(phoneType == 'ios'){
        window.location.href = ios_apk
    }else{
        alert('机型不匹配')
    }
}


