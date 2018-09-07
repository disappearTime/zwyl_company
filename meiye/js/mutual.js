// 与原生的交互
window.toolFunc = {
    setupWebViewJavascriptBridge: function (callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener(
                    'WebViewJavascriptBridgeReady'
                    , function () {
                        callback(WebViewJavascriptBridge)
                    },
                    false
            );
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    },

};
function mutual (jsonData,methodsName,callback){ // 与原生的交互 
    var u = navigator.userAgent; // 让原生开发人员给app加一个特殊userAgent的标识。安卓、ios统一，
    var phoneType;
    if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Linux') > -1){
        phoneType = 'android'
    }else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iPhone') > -1){
        phoneType = 'ios'
    }else if(u.indexOf('Windows Phone') > -1){
        phoneType = 'winphone';
    };
    if(u.indexOf('innerApp')>-1 && phoneType == 'android'){ // app内且是安卓手机
        toolFunc.setupWebViewJavascriptBridge(function(bridge) {
            //向app发送消息       //方法名
            bridge.callHandler(methodsName, jsonData, function (response,responseCallback) {
                    responseCallback({'result': 'handle success'})
                })	
            });	
            bridge.registerHandler(methodsName, function (data, responseCallback) {
            responseCallback({'result': 'handle success'})
        });
    }else if(u.indexOf('innerApp')>-1 && phoneType == 'ios'){ // app内且是ios手机
        window.webkit.messageHandlers[methodsName].postMessage(jsonData);
    }else{ // 站外 执行回调
        if(callback){
            callback();
        }    
    }
}