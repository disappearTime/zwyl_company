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
//下载弹框
function toDownload(){
    $('.download').show();
}
$('.download').on("click",function(e){
    var target = e.target;
    var loadCard = document.getElementsByClassName('download')[0];
    var close = document.getElementsByClassName('close')[0];
    if(target == loadCard || target == close){
        $(".download").hide();
    }
})
// 隐藏下载弹窗
var liveId = '658790248094910680';
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
                    str += '<li><div class="img-box"><img src="'+ projectList[i].projectImg +'" alt=""></div><div class="project-info">'
                        + '<p class="info-mes">'+ projectList[i].projectName +'</p><p class="price">'
                        + '<span class="money">￥'+ projectList[i].projectPrices +'</span><span class="doctor_"><img class="doctor-img" src="./images/doctor.png" alt="">'
                        + '<span>张医生</span></span></p></div></li>'
                }
                $('.list-card ul').append(str);
            }
        }
    }
})
$.ajax({ // 直播间详情
    url: host + '/client-community/html/liveroom/detail',
    type: 'post',
    dataType: 'json',
    data: {
        liveId: liveId
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
            
            // 播放器
            var videoObject = {
                container: '.video',//“#”代表容器的ID，“.”或“”代表容器的class
                variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
                autoplay:true,//自动播放
                live:true,
                //html5m3u8: true,
                //video:'http://www.flashls.org/playlists/test_001/stream.m3u8'//视频地址
                video: dataDetail.streamUrl // http://47.94.219.29:5080/live/1cftQzTC.m3u8
            };
            var player=new ckplayer(videoObject);
    
            

            // 极光推送
            var JIM = new JMessage({ // 实例化
                debug: true
            });
            JIM.init({ // 初始化
                "appkey" : dataDetail.authPayload.appkey,
                "random_str" : dataDetail.authPayload.randomStr,
                "signature" : dataDetail.authPayload.signature,
                "timestamp" : dataDetail.authPayload.timestamp,
                "flag" : 0 // 是否启用消息记录漫游
            }).onSuccess(function(data){
                console.log(data);
                console.log('推送初始化完成');
                //alert('初始化完成')
            })
            JIM.onMsgReceive(function(data){ // 聊天消息时时监听
                alert(JSON.stringify(data));
            })

            
        }
    }
}) 