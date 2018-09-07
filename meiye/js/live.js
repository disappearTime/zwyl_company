function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
var shareUserId;
if(GetQueryString('userId')){
    shareUserId = GetQueryString('userId');
}
var href_ = window.location.href;
$('.appName').html(platFormName);
//项目列表的显示隐藏
$('.pro-list img').on("click",function(){
    $(".project-list").show();
})
$('.project-list').on("click",function(e){
    var target = e.target;
    var proCard = document.getElementsByClassName('project-list')[0];
    if(target == proCard){
        $(".project-list").hide();
    }
})
$('.cancle_download').on('click',function(){
    $('.toload').hide();
})
//下载弹框
function toDownload(){
    $('.download').show();
}

function toProjectDetail(projectId){ // 进入项目详情
    window.location.href = "./last/single-group/single-detail-2.html?projectId="+projectId+"&userId="+shareUserId
}
// 隐藏下载弹窗
$('.download').on("click",function(e){
    var target = e.target;
    var loadCard = document.getElementsByClassName('download')[0];
    var close = document.getElementsByClassName('close')[0];
    if(target == loadCard || target == close){
        $(".download").hide();
    }
})
// 刷新
$(".reload_video").on('click',function(){
    $('.toast').hide();
    window.location.reload();
})
// 关闭刷新toast
$(".close_video").on("click",function(){
    $('.toast').hide();
})

//var liveId = '658790248094910680';
var liveId = GetQueryString('liveId');
$.ajax({ // 项目列表
    url: host + '/client-community/html/liveroom/projectlist',
    type: 'post',
    dataType: 'json',
    data: {
        liveId: liveId
    }, 
    success: function(res){
        if(res.resultCode == 200){
            console.log(res);
            var projectList = res.resultInfo;
            var len = projectList.length;
            if(len>0){
                var str = '';
                for(var i=0; i<len; i++){
                    var projectPrice = projectList[i].projectPrices?projectList[i].projectPrices:0;
                    projectPrice = toFixed_len(projectPrice,2)
                    str += '<li onclick="toProjectDetail(\''+ projectList[i].projectId +'\')"><div class="img-box"><img src="'+ projectList[i].projectImg +'" alt=""></div><div class="project-info">'
                        + '<p class="info-mes">'+ projectList[i].projectName +'</p><p class="price">'
                        + '<span class="money">￥'+ projectPrice +'</span><span class="doctor_"><img class="doctor-img" src="'+ projectList[i].docotrImgUrl +'" alt="">'
                        + '<span>'+ projectList[i].doctorName +'</span></span></p></div></li>'
                }
                $('.list-card ul').append(str);
            }else{
                $('.list-card ul').append('<li>该直播没有关联项目</li>');
            }
        }
    }
})
// 随机生成userId传给服务端进行进入直播间用户的判重
var liveUser;
if(window.localStorage.getItem("liveUser")){
    liveUser = window.localStorage.getItem("liveUser");
}else{
    var timestamp = new Date().getTime();
    liveUser = "user_"+timestamp;
    window.localStorage.setItem("liveUser",liveUser); 
}
// 付费直播不可观看 
var liveType = GetQueryString('liveType');
if(liveType == '209002'){ //众筹直播收费
    $('.toload').show();
    $('.video-box').hide();
    $('.chat').hide();
    $('#playBtn').hide();
    $(".follow").hide();
    $('#loading').hide();
}else{
    $.ajax({ // 直播间详情
        url: host + '/client-community/html/liveroom/detail',
        type: 'post',
        dataType: 'json',
        data: {
            liveId: liveId,
            userId: liveUser
        },
        success: function(res){
            console.log(res)
            if(res.resultCode==200){
                $('.video-box').show();
                $('#loading').hide();
                // 详情数据
                var dataDetail = res.resultInfo;
                var viewNum = dataDetail.affiliationsNumbers?dataDetail.affiliationsNumbers:'0'
                $('.doctor_tx .tx').attr('src',dataDetail.docotrImgUrl);
                $('.doctor-info .doctor-name').html(dataDetail.doctorName);
                $('.doctor-info .view-num').html( viewNum + "人观看");
                var videoUrl = dataDetail.streamUrl?dataDetail.streamUrl:(dataDetail.backViewUrl?dataDetail.backViewUrl:'');
                if(!videoUrl){
                    $('.video-box').hide();
                    $('.chat').hide();
                    $('#playBtn').hide();
                    $(".endToast").show();
                    setTimeout(function(){
                        $(".endToast").hide(); 
                    },1500)
                    return;
                }
                $("#roomVideo source").attr("src",videoUrl)
                // 聊天弹幕
                var liveroomId = dataDetail.liveroomId
                function getChatContent(){
                    var timestamp = Date.parse(new Date());
                    $.ajax({
                        url: host + "/client-community/html/liveroom/sendToH5",
                        type: "post",
                        data: {
                            endTime: timestamp,
                            liveroomId: liveroomId
                        },
                        dataType: "json",
                        success: function(res){
                            if(res.resultCode == 200){
                                var chatArr = res.resultInfo;
                                var len = chatArr.length;
                                if(len>1){
                                    var t = parseInt(1000/len);
                                    var count = 0;
                                    var time = setInterval(function(){
                                        count++;
                                        console.log(count);
                                        if(count>len){
                                            clearInterval(time);
                                        }else{
                                            var c = count-1<0?0:count-1;
                                            if(chatArr[c]["nickName"] && chatArr[c]["content"]){
                                                var nickName = hidePhone(chatArr[c]["nickName"])
                                                var str = '<p class="chat-mes"><span class="chat-user">'+ nickName +'</span><span class="message">&nbsp;&nbsp;'+ chatArr[c]["content"] +'</span></p>'
                                                $(".chat").append(str);
                                            }    
                                        }
                                    },t);
                                }else{
                                    if(chatArr[0]["nickName"] && chatArr[0]["content"]){
                                        var nickName = hidePhone(chatArr[0]["nickName"])
                                        var str = '<p class="chat-mes"><span class="chat-user">'+ nickName +'</span><span class="message">&nbsp;&nbsp;'+ chatArr[0]["content"] +'</span></p>'
                                        $(".chat").append(str);
                                    }
                                }
                            }
                        }
                    })
                }
                function scrollChatContent(){
                    var p = $(".chat p");
                    if(p.length>20){
                        $('.chat').children.first().remove();
                    }
                    $('.chat').scrollTop( $('.chat')[0].scrollHeight );
                }
                var timer = setInterval(function(){
                    getChatContent();
                    scrollChatContent();
                },1000)
                window.onfocus = function(){
                    timer = setInterval(function(){
                        getChatContent();
                        scrollChatContent();
                    },1000)
                }
                window.onblur = function(){
                    clearInterval(timer);
                }
                // 播放器
                var myPlayer = videojs('roomVideo',{
                    bigPlayButton : false,
                    autoplay: true,
                    textTrackDisplay : false,
                    posterImage: true,
                    errorDisplay : false,
                    controlBar : false,
                    html5: { hls: { withCredentials: false }},
                },function(){
                    this.on('loadedmetadata',function(){
                        //console.log('loadedmetadata');
                        //加载到元数据后开始播放视频
                        startVideo();
                    })
                    this.on('ended',function(){
                        //console.log('ended')
                        this.pause();
                        this.hide();
                        $('.video-box').hide();
                        $('.chat').hide();
                        $('#playBtn').hide();
                        $(".endToast").show();
                        setTimeout(function(){
                            $(".endToast").hide(); 
                        },1500)
                    })
                    this.on('firstplay',function(){
                        //console.log('firstplay')
                    })
                    this.on('loadstart',function(){
                    //开始加载
                        //console.log('loadstart')
                    })
                    this.on('loadeddata',function(){
                        //console.log('loadeddata')
                    })
                    this.on('seeking',function(){
                    //正在去拿视频流的路上
                        //console.log('seeking')
                    })
                    this.on('seeked',function(){
                    //已经拿到视频流,可以播放
                        //console.log('seeked')
                    })
                    this.on('waiting',function(){
                        //console.log('waiting')
                    })
                    this.on('pause',function(){ // 监听暂停
                        //console.log('pause')
                        $('#playBtn').show();
                    })
                    this.on('play',function(){ // 监听播放
                        //console.log('play')
                        $('#playBtn').hide();
                    })
                });
                
                document.getElementById('playBtn').addEventListener('click', function(){
                    myPlayer.play();
                })
                // setTimeout(function(){
                //     document.getElementById('playBtn').click();
                // },3000)
                var isVideoBreak;
                function startVideo() {
                    myPlayer.play();
    
                //     wx.ready(function(){
                //         document.getElementById('playBtn').click();
                // 　　　　　//为防止开播失败，尝试在8s内不断请求开播
                //         var myVid=document.getElementById("roomVideo");
                //         var _now_time = Date.now();
                //         var play_interval = setInterval(function(){
                //             var _new_time = Date.now();
                //             if(_new_time - _now_time < 8000 && myVid.played.length == 1){
                //                 document.getElementById('playBtn').click();
                //                 clearInterval(play_interval);
                //             }
                //             if(_new_time - _now_time >= 8000){
                //                 clearInterval(play_interval);
                //             }
                //         },200);
                //     })
                    
                    // document.addEventListener("WeixinJSBridgeReady", function () { 
                    //     myPlayer.play();
                    // }, false); 
                    //微信内全屏支持
                    document.getElementById('roomVideo').style.width = window.screen.width + "px";
                    document.getElementById('roomVideo').style.height = window.screen.height + "px";
                    //判断开始播放视频，移除高斯模糊等待层
                    var isVideoPlaying = setInterval(function(){
                        var currentTime = myPlayer.currentTime();
                        if(currentTime > 0){
                            $('.vjs-poster').remove();
                            clearInterval(isVideoPlaying);
                        }
                    },200)
                    //判断视频是否卡住，卡主3s重新load视频
                    var lastTime = -1,
                        tryTimes = 0;
                    
                    clearInterval(isVideoBreak);
                    isVideoBreak = setInterval(function(){
                        var currentTime = myPlayer.currentTime();
                        console.log('currentTime'+currentTime+'lastTime'+lastTime);
                        if(currentTime == lastTime){
                            //此时视频已卡主3s
                            //设置当前播放时间为超时时间，此时videojs会在play()后把currentTime设置为0
                            myPlayer.currentTime(currentTime+10000);
                            myPlayer.play();
                            //尝试5次播放后，如仍未播放成功提示刷新
                            if(++tryTimes > 5){
                                //alert('您的网速有点慢，刷新试试');
                                $('.toast').show()
                                //myPlayer.pause();
                                tryTimes = 0;
                                clearInterval(isVideoBreak);
                            }
                        }else{
                            lastTime = currentTime;
                            tryTimes = 0;
                        }
                    },3000)
                }
        
                
    
                // // 极光推送
                // var JIM = new JMessage({ // 实例化
                //     debug: true
                // });
                // JIM.init({ // 初始化
                //     "appkey" : dataDetail.authPayload.appkey,
                //     "random_str" : dataDetail.authPayload.randomStr,
                //     "signature" : dataDetail.authPayload.signature,
                //     "timestamp" : dataDetail.authPayload.timestamp,
                //     "flag" : 0 // 是否启用消息记录漫游
                // }).onSuccess(function(data){
                //     console.log(data);
                //     console.log('推送初始化完成');
                //     //alert('初始化完成')
                // })
                // JIM.onMsgReceive(function(data){ // 聊天消息时时监听
                //     //alert(JSON.stringify(data));
                // })
    
                
            }
        }
    })
}
 