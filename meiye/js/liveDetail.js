$(function(){
    var href_ = window.location.href;
    $('.appName').html(platFormName);
    $('.download').on("click",function(e){
        var target = e.target;
        var loadCard = document.getElementsByClassName('download')[0];
        var close = document.getElementsByClassName('close')[0];
        if(target == loadCard || target == close){
            $(".download").hide();
        }
    })
    function getLiveDetail(){ // 预约直播详情
        var liveId = GetQueryString("liveId");
        console.log('获取详情')
        $.ajax({
            url: host + '/client-community/html/liveroom/introduceHTML',
            type: 'post',
            data:{
                'liveId': liveId
            },
            dataType: 'json',
            success: function (res) {
                if(res.resultCode == 200){
                    var liveDetail = res.resultInfo;
                    var livePrice = liveDetail.livePrice?liveDetail.livePrice:0
                    livePrice = toFixed_len(livePrice,2)
                    $('.liveImg').attr('src',liveDetail.liveCover);
                    $('.liveTitle').html(liveDetail.liveName);
                    $('.main_doctor').html(liveDetail.doctorName);
                    $('.director_doctor').html(liveDetail.doctorPosition);
                    var timeStart = formatTime(liveDetail.liveStarttime);
                    $('.liveTime span').html(timeStart);
                    $('.livePrice').html('￥' + livePrice);
                    var userImgUrl = liveDetail.userList.userImgUrl || '';
                    var userImgArr = [];
                    var imgStr = '';
                    if(userImgUrl.length>0){
                        if(userImgUrl.indexOf(';')>-1){
                            userImgArr = userImgUrl.split(';')
                        }else{
                            userImgArr.push(userImgArr);
                        }
                    }
                    if(userImgArr.length > 0){
                        for(var i=0; i<userImgArr.length; i++){
                            imgStr += '<img src="'+ userImgArr[i] +'" alt=""/>'
                        }
                    }
                    $('.img_box').html(imgStr);
                    $('.totalNum').html(liveDetail.crowdNumber+'人');
                    var liveIntroduction = liveDetail.liveIntroduction;
                    var liveIntroductionArr = [];
                    var liveIntroductionStr = '';
                    if(liveIntroduction.length>0){
                        if(liveIntroduction.indexOf(';')>-1){
                            liveIntroductionArr = liveIntroduction.split(';')
                        }else{
                            liveIntroductionArr.push(liveIntroduction);
                        }
                    }
                    if(liveIntroductionArr.length > 0){
                        for(var j=0; j<liveIntroductionArr.length; j++){
                            liveIntroductionStr += '<img src="'+ liveIntroductionArr[i] +'" alt=""/>'
                        }
                    }
                    $('.detaiImg').html(liveIntroductionStr);
                    $('.loading').hide();
                }
            }
        })
    }
    getLiveDetail();
})
//下载弹框
function toDownload(){
    $('.download').show();
}
