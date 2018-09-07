(function(c){function j(o){if(o){var n=[].slice.call(arguments,1);for(var p=0,m=n.length;p<m;p++){var q=n[p];if(typeof(q)=="object"){for(var l in q){o[l]=q[l]}}}}return o}function e(k){return typeof(k)=="function"}var g=/\+/g;function i(k){return f.raw?k:encodeURIComponent(k)}function a(k){return f.raw?k:decodeURIComponent(k)}function h(k){return i(f.json?JSON.stringify(k):String(k))}function d(k){if(k.indexOf('"')===0){k=k.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{k=decodeURIComponent(k.replace(g," "));return f.json?JSON.parse(k):k}catch(l){}}function b(l,k){var m=f.raw?l:d(l);return e(k)?k(m):m}var f=c.vueCookie=function(r,q,w){if(q!==undefined&&!e(q)){w=j({},f.defaults,w);if(typeof w.expires==="number"){var s=w.expires,v=w.expires=new Date();v.setTime(+v+s*86400000)}return(document.cookie=[i(r),"=",h(q),w.expires?"; expires="+w.expires.toUTCString():"",w.path?"; path="+w.path:"",w.domain?"; domain="+w.domain:"",w.secure?"; secure":""].join(""))}var x=r?undefined:{};var u=document.cookie?document.cookie.split("; "):[];for(var p=0,n=u.length;p<n;p++){var o=u[p].split("=");var k=a(o.shift());var m=o.join("=");if(r&&r===k){x=b(m,q);break}if(!r&&(m=b(m))!==undefined){x[k]=m}}return x};f.defaults={};c.vueCookie.remove=function(l,k){if(c.vueCookie(l)===undefined){return false}c.vueCookie(l,"",j({},k,{expires:-1}));return !c.vueCookie(l)}})(this);

/*
//function vueCookie(key, value, {expires_day,path,domain,secure_bool})
vueCookie(); // {test: "100", testx: "345"}
vueCookie("test");//100
vueCookie("test", "200");//"test=200"
vueCookie.remove("test");// false/true;
vueCookie.remove("test", {path,domain});// false/true;
*/