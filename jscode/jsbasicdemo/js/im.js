$(function(){
	 
	$("[data-toggle='tooltip']").tooltip(); 
	//群事件
	$(".icon-all-oper").on("click",function(e){
		e.stopPropagation();
		util.showShade("right-box");
		$(".right-box").addClass("in slideInRight animated");
		 $(".right-box-content_list").find(".move").hide();
		showGroupIncident();
	});
	//群管理
	$(".icon-group-oper").on("click",function(e){
		e.stopPropagation();
		util.showShade("group-set");
		$(".group-set").addClass("in slideInRight-group animated");
		showGroupInfo(function(data){
			console.log(data);
			var user_name=data.Name,user_id=data.GroupId;
			var user_pic=data.FaceUrl;
			var userstr=window.localStorage.getItem("user");
			var userId=JSON.parse(userstr).id+"";
			var list=window.localStorage.getItem(userId);
			var obj=JSON.parse(list);
			console.log(obj)
			$.each(obj,function(i,val){
				if(val.id==user_id){
					val.fromAccount=user_name;
					val.icon=user_pic;
				}
			})
			window.localStorage.setItem(userId,JSON.stringify(obj));
			var $leaveGroup = $("#leaveGroup");
			var $addFriendToGroup = $("#addFriendToGroup");
			if(data.Owner_Account == local_user.id){//群主
				$leaveGroup.text(languageIm[0]).off("click").on("click",function(){
					Showbo.Msg.confirm(languageIm[1],function(p){
						if(p=="yes"){
							destroyGroup(selToID);
						}else{
							return ;
						}
						
					})
					
				});
				$addFriendToGroup.off("click").on("click",function(){
					showAddUserToGroup();
					// util.alertFn("请在app端发起邀请");
				});
			}else{//群成员
				$leaveGroup.text(languageIm[2]).off("click").on("click",function(){
					Showbo.Msg.confirm(languageIm[3],function(p){
						if(p=="yes"){
							quitGroup();
						}else{
							return ;
						}
						
					});
				});
				$addFriendToGroup.off("click").on("click",function(){
					util.alertFn(languageIm[4]);
				});
			}
		});
	});

	$(".group-notice").on("click",function(e){
		e.stopPropagation();
		util.showShade("group-notice-div");
		var $div = $(".group-notice-div");
		$div.addClass("in slideInRight-group animated");
		getGroupInfo(selToID,function(data){

			var data = data.GroupInfo[0];
			var flag = false;
			for(var i = 0;i < data.MemberList.length; i++){
				var u = data.MemberList[i];
				if(u.Member_Account == local_user.id && (u.Role == "Owner"||u.Role=="Admin")){
					flag =true;
					break;
				}
			}
			$div.find(".content").text(data.Notification);
			if(flag){//是群管理
				$div.find("#noticeContent").val(data.Notification);
				$div.find(".group-notice-footer").show();
			}else{//不是群管理
				$div.find(".group-notice-footer").hide();
			}
		})
	});
	//退出
	$(".shade-div").on("click",function(){
		var $this = $(this);
		var _target = $this.attr("_target");
		$("."+_target).find(".closed").trigger("click");
		util.hideShade();
	});
	//群事件选择
	$(".box-oper").on("click",function(){
		var $this = $(this)
		var _target = $this.attr("_target");
		var right_event_list = $("#right_event_list");
		switch(_target){
			case "0":right_event_list.find("li").show();break;
			case "1":right_event_list.find("li").hide().end().find("li[data=1]").show();break;
			case "2":right_event_list.find("li").hide().end().find("li[data=2]").show();break;
			case "4":right_event_list.find("li").hide().end().find("li[data=4]").show();break;
		}
		var parent = $this.parent();
		if(!parent.hasClass("end")){
			parent.addClass("check")
		}
		parent.siblings().removeClass("check");
	});
	
	//主页面切换
	$(".main_modal_tab").on("click",function(){
		var $this = $(this);
		var _target = $this.attr("_target");
		if(!_target){
			return;
		}
		$(".main_modal_tab").removeClass("check");
		$this.addClass("check");

		if(_target == "square-modal"){
			$(".create_course_idv").show();
		}else{
			$(".create_course_idv").hide();
		}
		$("."+_target).removeClass("nodisplay").siblings(".main-modal").addClass("nodisplay");
	});


	



	// $(".fast-create").on("click",function(){
	 	//$(".main_modal_tab").removeClass("check");
	 	//$(this).addClass("hover");

	// });
	// $(".fast-oper").on("mouseout",function(){
	// 	$(".fast-create").removeClass("hover");
	// })

	$(".relation-modal .rel-item").on("click",function(){
		var $this = $(this);
		$this.addClass("check").siblings().removeClass("check");
		var flag = $this.attr("flag");
		if(flag=="friend"){
			$(".friend-list").removeClass("nodisplay").siblings().addClass("nodisplay");
		}else{
			$(".group-list").removeClass("nodisplay").siblings().addClass("nodisplay");		
		}
	});
	$(".relation-modal .rel-item:first").trigger("click");
	 
//退出子群
  
	$(".logout_chat_room").on("click",function(){
		var $this = $(this);
		var type = $this.attr("type");
		$("#chatRoomContent").empty();
		
		isInSubGroup = false;
		$("#chat_room_main").hide();
		$(".im-main").show();
		$("#chat-ctrl-conten").show();
		document.getElementById("chatMessageMain").appendChild(document.getElementById("chatMsgDiv"));
		onSelSess(1,prevSelToID,null,webim.SESSION_TYPE.GROUP);
		
	});

	$(".close_case_info").on("click",function(){
		//alert(1);
		$(".im-main").show();
		$(".show_case_info_div").hide();
		$(".show_open_info_div").hide();
	});
	//init日历
	$("#seminar_start_time").datetimepicker({language:'cn',weekStart: 1,todayBtn:  1,autoclose: 1,todayHighlight: 1,minuteStep:5,startView: 2,minView: 0,forceParse: 0,format:"yyyy-mm-dd hh:ii",startDate:new Date()});
	$("#moxtra_start_time").datetimepicker({language:'cn',weekStart: 1,todayBtn:  1,autoclose: 1,todayHighlight: 1,minuteStep:5,startView: 2,minView: 0,forceParse: 0,format:"yyyy-mm-dd hh:ii",startDate:new Date()});
	$("#open_course_time").datetimepicker({language:'cn',weekStart: 1,todayBtn:  1,autoclose: 1,todayHighlight: 1,minuteStep:5,startView: 2,minView: 0,forceParse: 0,format:"yyyy-mm-dd hh:ii",startDate:new Date()});


//右键
	// $(".main").contextMenu('myMenu1',{
 //      bindings: {
 //        'open': function(t) {
 //          console.log(t.id)
 //        },
 //        'email': function(t) {
 //          console.log(t.id)
 //        },
 //        'save': function(t) {
 //          console.log(t.id)
 //        },
 //        'delete': function(t) {
 //          console.log(t)
 //        }
 //      }
 //    });
    //怪兽
    $(".select-input").on("click",function (e) {
		var $this = $(this);
		$this.siblings(".select-list").toggle();
		e.stopPropagation() 
	});
    $(".checkbox_empty").on("click",function(){
    	if($(this).hasClass("check")){
    		$(this).removeClass("check");
    	}else{
    		$(this).addClass("check").siblings().removeClass("check");
    	}
    });

    //群管理tab
	$(".group-nav-li").on("click",function(){
		var $this = $(this);
		if(!$this.hasClass("check")){
			$this.addClass("check").siblings(".check").removeClass("check");
			var _target = $this.attr("_target");
			var $target = $(_target);
			$target.removeClass("nodisplay").siblings().addClass("nodisplay");
		}
	});
	//名片搜索
	$("#click_people_dialog .search-input").on("input",function(){
		var value = $.trim($(this).val());
		var list = $("#click_people_dialog .event_list");
		if(value){
			list.find(".flag_title").hide();
			list.find(".item").each(function(item){
				var $this = $(this);
				var data_value = $this.attr("data-value");
				if(data_value&&data_value.indexOf(value)!=-1){
						$this.show();	
				}else{
					$this.hide();
				}
			})
		}else{
			list.find(".flag_title").show();
			list.find(".item").show();
		}
	});
	//病例搜索
	$("#click_case_dialog .search-input").on("input",function(){
		var value = $.trim($(this).val());
		var list = $("#click_case_dialog .event_list");
		if(value){
			list.find(">div").each(function(item){
				var $this = $(this);
				var data_value = $this.attr("data-value");
				if(data_value&&data_value.indexOf(value)!=-1){
						$this.show();	
				}else{
					$this.hide();
				}
			});
		}else{
			list.find(">div").show();
		}
	});

	//历史消息
	$(".msgflow").on("click",".show_history span",function(){
		console.log('获取历史消息')
		if($(this).hasClass("all")){
			$(this).text(languageCommon[13]);
			return;
		}
		console.log(selType);
		console.log(webim.SESSION_TYPE.C2C);
		if(selType == webim.SESSION_TYPE.C2C){//个人
			console.log('获取好友聊天历史信息');
			getPrePageC2CHistoryMsgs(getMoreHistoryMsgCallback,function(){})
		}else{
			console.log('获取群聊天历史消息');
			getPrePageGroupHistoryMsgs(getMoreHistoryMsgCallback,function(){});
		}
	});

	// $("#headerSearch").keydown(function(event){
	// 	if(event.keyCode == "13"){
			
	// 	}
	// });
	$("#headerSearch").on("focus",function(){
		$(".header-search").addClass("searching");
		util.showShade("searching");
		initLocalSearch();
	});
	$("#headerSearch").on("input",function(){
		var value = $(this).val();
		showLocalUser(value);
	});
	$(document).on("click",".searching .closed",function(){
		$(".header-search").removeClass("searching");
	});
	function initLocalSearch(){

		var local_search_friend = $(".local_search_friend");
		var local_search_group = $(".local_search_group");
		local_search_friend.empty();
		local_search_group.empty();
		for(var key in friendArr){
			var item = friendArr[key];
			var url = item.icon?item.icon:friendHeadUrl;
			var Nick =util.getUserName(key);
			var item_div = $('<div class="right-box-item" onclick="show_user_info('+key+',closeLocalSearch)" data-name="'+Nick+'" data-value="'+key+'"><img class="user_face" src="'+url+'"/><div class="item-div"><p class="txt3 rel">'+Nick+'</p></div></div>');
			local_search_friend.append(item_div);
		}
		for(var key in groupArr){
			var item = groupArr[key];
			if(item.Type=="Public"){
				var Nick = item.Name;
				var url = item.FaceUrl?item.FaceUrl:groupHeaderUrl;
				var item_div = $('<div class="right-box-item"  data-name="'+Nick+'" data-value="'+key+'"><img class="user_face" src="'+url+'"/><div class="item-div"><p class="txt3 rel">'+Nick+'</p></div></div>');
				item_div.on("click",function(){
					var group_id = $(this).attr("data-value");
					var tmp = groupArr[group_id];
					$("#chatMsgDiv").show();
	                $(".system_msgflow").hide();
	                onSelSess2(group_id, tmp.Name, tmp.FaceUrl?tmp.FaceUrl:groupHeaderUrl, 0, "message-list",1,null,"GROUP");
	                setChatList({id:group_id,name:tmp.Name,face:tmp.FaceUrl?tmp.FaceUrl:groupHeaderUrl,lastMsg:null,type:"GROUP"},"select");
					closeLocalSearch();
				});
				local_search_group.append(item_div);	
			}
		}
	}
	function showLocalUser(value){
		var local_search_friend = $(".local_search_friend");
		var local_search_group = $(".local_search_group");
		if(!value){
			local_search_friend.find(".right-box-item").show();
			local_search_group.find(".right-box-item").show();
			return;
		}
		local_search_friend.find(".right-box-item").each(function(){
			var $this = $(this);
			if($this.attr("data-name").indexOf(value)!=-1){
				$this.show();
			}else{
				$this.hide();
			}
		});
		local_search_group.find(".right-box-item").each(function(){
			var $this = $(this);
			if($this.attr("data-name").indexOf(value)!=-1){
				$this.show();
			}else{
				$this.hide();
			}
		});
	};
	function GetStringByteLength(val){ 
		var ZHlength=0;
		var ENlength=0;
		for(var i=0;i<val.length;i++){
			if(val.substring(i,i+1).match(/[^\x00-\xff]/ig)!=null){
				ZHlength+=1;
			}else{
				ENlength+=1;
			}
		}
    	
    	return (ZHlength*3)+ENlength;
	}
	//----公开课详情
	var $show_open_info = $(".show_open_info_div");

	$show_open_info.on("click",".course-title .title",function(){
		var parent = $(this).parents(".course-item");
		if(parent.hasClass("check")){
			parent.removeClass("check");
			return;
		}
		parent.addClass("check").siblings(".course-item").removeClass("check");
	});

	//---创建公开课相关
	var $createOperCourse = $("#create_oper_course");
	
	$createOperCourse.find("#cover_p").on("click",function(){
		$createOperCourse.find("#cover_input").trigger("click");
	});
	$createOperCourse.find(".close").on("click",function(){ // 创建公开课点击右上角'X'关闭弹窗
		$('.loading_wait').hide();
	});
	$createOperCourse.find("#cover_input").on("change",function(){ // 公开课更换封面
		var $this = $(this);
		var file = $this[0];
		var type = util.getFileType(file.files[0]);
		if(type != util.fileType.img){
			$this.val("");
			return util.alertFn(languageIm[5]);
		}
		util.PreviewImage(file,"cover","open_course_img");
	});
	$createOperCourse.on("click",".course-title .title",function(){
		var parent = $(this).parents(".course-item");
		if(parent.hasClass("check")){
			parent.removeClass("check");
			return;
		}
		parent.addClass("check").siblings(".course-item").removeClass("check");
	});
	$createOperCourse.on("click",".up_course_info",function(){
		var parent = $(this).parents(".course-item").remove();
	});
	var $add_open_course = $("#add_open_course");
	$add_open_course.find(".cancel").on("click",function(){
		$add_open_course.modal("hide");
	});
	$("#addCourseFileBtn").on("click",function(){
		$add_open_course.find("#addCourseFile").trigger("click");
	});
	$add_open_course.on("change","#addCourseFile",function(){
		var $this = $(this); 
		var name = $this[0].files[0].name;
		$add_open_course.find("#openCourseFileName").text(name);

		var obj={
            user_id:local_user.id,
            qcloud_signature:local_user.qcloud_signature
        }
        /*var videoFile= $this[0].files[0];
        var getSignature = function(callback){
            $.ajax({
                url: util.baseUrl+'case/video/add',  
                type: 'POST',
                data:obj,
                dataType: 'json',
                success: function(result){//result 是派发签名服务器的回包
                    if(result.code==200){
                        
                        callback(result.data.signature);
                    }
                    
                }
            });
        };  
        qcVideo.ugcUploader.start({
            videoFile: videoFile,//视频，类型为 File
            getSignature: getSignature,//前文中所述的获取上传签名的函数
            error: function(result){//上传失败时的回调函数
                //...
                console.log('上传失败的原因：' + result.msg);
            },
            finish: function(result){//上传成功时的回调函数
                //parent.find(".file-ifo").text(name); 
                
              
            }
        });*/
		
	});
	$add_open_course.find("#addCourseBtn").on("click",function(){
		//验证
		var flag = $add_open_course.attr("flag");
		var title = $.trim($add_open_course.find("#open_course_title").val());
		var description = $.trim($add_open_course.find("#open_course_description").val());
		var fileName = "";
		console.log(title);
		var obj = {};
		obj.title = title;
		obj.description = description;
		var start_course_time;
		if(flag == '1'){ // 点播
			start_course_time = '<span><i></i></span>'
		}else{
			start_course_time = '<span>'+languageIm[6]+'<i></i></span>'
		}
		var $li = $('<li class="course-item">'+
            '<p class="course-title"><span class="title">'+title+'</span><span class="up_course_info">' + languageCommon[14] + '</span></p>'+
            '<div class="course-info">'+
                '<div class="txt">'+
                description+
                '</div>'+
                '<div class="txt2 fileId">'+
					start_course_time +
                '</div>'+
            '</div>'+
        '</li>');
		if(flag == "1"){//点播
			console.log('点播');
			$('#start_course_time').addClass("hide_course");
			obj.type = 1;
			var file = $add_open_course.find("#addCourseFile");	
			console.log(file);
			fileName = file[0].files[0].name;
			file.appendTo($li.find(".fileId"));
		}else{
			if(flag =="2"){//直播
				obj.type =2;
			}else{//会议
				obj.type = 3;
			}
			var time = 	$.trim($add_open_course.find("#open_course_time").val());
			obj.start_time = parseInt(new Date(time).getTime()/1000);
			fileName = time;
		}
		$li.find(".fileId i").text(fileName);
        $li.data("data",obj);
        $("#create_oper_course").find(".course-list").append($li);
        $add_open_course.modal("hide");
	});
	$createOperCourse.find("#sendOpenCourse").on("click",function(){
		var flag = $("#create_oper_course").attr("flag");
		var title = $createOperCourse.find("#course_title").val();
		var timer=$("#open_course_time").val();
		var dates;
		if(timer==""){
			dates = parseInt(new Date().getTime()/1000);
			
		}else{
			dates = new Date(Date.parse(timer.replace(/-/,"/")));
			dates = parseInt(dates.getTime()/1000);
		}
		var description = $.trim($createOperCourse.find("#course_desc").val());
		var cover = $createOperCourse.find("#cover_input")[0].files[0];
		var discipline = $createOperCourse.find(".discipline_init2").val();
		var discipline_first=$(this).parents(".col-sm-8").find(".modal-row").find(".modal-row-r").find('.discipline_first') .val();
		var discipline_second=$(this).parents(".col-sm-8").find(".modal-row").find(".modal-row-r").find('.discipline_first') .val();
		/*var reg=/[a-zA-z]/ig;
		var txt=reg.test(title);
		if(txt==true){
			titles=encodeURIComponent(title);
		}else{
			titles=title;
		}*/
		
		 /*if(GetStringByteLength(title)>30){
	        Showbo.Msg.alert(languageCreateChatRoom[26],function(flag){
	            return util.alertFn(languageCreateChatRoom[26]);
	        })
	        return false;
	    }
	    if(GetStringByteLength(description)>360){
	        Showbo.Msg.alert(languageCreateChatRoom[27],function(flag){
	            return util.alertFn(languageCreateChatRoom[27]);
	        });
	        return false;
	    }*/

		if(!title){
			return util.showError($createOperCourse.find("#course_title"),languageCommon[3]);

		}
		if(!description){
			return util.showError($createOperCourse.find("#course_desc"),languageCommon[4]);
		}
		
		var fileType = util.getFileType(cover);
	    if(!fileType){
	        return util.alertFn(languageCommon[15],[languageCommon[1]]);
	    }
		if(!discipline){
			return util.showError($createOperCourse.find(".discipline_init2"),languageCommon[16]);
		}
		
		if(discipline_first=="--全部--" || discipline_second=="--全部--" || discipline_first=="All" || discipline_second=="All"){
			Showbo.Msg.alert(languageCreateChatRoom[31],function(flag){
	            return util.alertFn(languageCreateChatRoom[31]);
	        });
	        
		} 

		var form = $("<form></form>");
		form.append("<input type='text' name='user_id' value='"+local_user.id+"'/>");
		form.append("<input type='text' name='qcloud_signature' value='"+local_user.qcloud_signature+"'/>");
		form.append("<input type='text' name='title' value='"+addslashes(title)+"'/>");
		/*form.append("<input type='text' name='title' value=\""+title+"\"/>");*/
		form.append("<input type='text' name='type' value='"+flag+"'/>");
		form.append("<input type='text' name='lecturer_id' value='"+local_user.id+"'/>");
		form.append("<input type='text' name='description' value='"+description+"'/>");
		form.append("<input type='text' name='start_time' value='"+dates+"'/>");
		form.append("<input type='text' name='discipline' value='"+discipline+"' />");
		form.append($createOperCourse.find("#cover_input"));
		console.log(form)
		var dataArr = [];
		$createOperCourse.find(".course-list").find(".course-item").each(function(){
			var $this = $(this);
			var secFormData = $("<form></form>")
			var data = $this.data("data");
			var timer=$this.find(".fileId i").text();
			var time= new Date(Date.parse(timer.replace(/-/,"/")));
				time = parseInt(time.getTime()/1000);
			if(!time){
				time=parseInt(new Date().getTime()/1000);
			}
			
				
			
			secFormData.append("<input type='text' name='user_id' value='"+local_user.id+"' />");
			secFormData.append("<input type='text' name='qcloud_signature' value='"+local_user.qcloud_signature+"' />");
			secFormData.append("<input type='text' name='title' value='"+data.title+"' />");
			secFormData.append("<input type='text' name='discipline' value='"+discipline+"' />");
			// secFormData.append("<input type='text' name='group_id' value='"+data.group_id+"' />");
			/*if(data.type==1){
				if($this.find("#addCourseFile").length){
					secFormData.find("input[name=type]").val(util.getFileType($this.find("#addCourseFile")[0].files[0]));
					secFormData.append($this.find("#addCourseFile"));
				}
				secFormData.append("<input type='text' name='start_time' value='"+time+"' />");
			}else{
				secFormData.append("<input type='text' name='start_time' value='"+time+"' />");
			}*/
			secFormData.append("<input type='text' name='start_time' value='"+time+"' />");
			secFormData.append("<input type='text' name='description' value='"+data.description+"' />");
			secFormData.append("<input type='text' name='lecturer_id' value='"+local_user.id+"' />");
			secFormData.append("<input type='text' name='type' value='"+data.type+"' />");
			dataArr.push(secFormData);
		});	
		var deList;
	
		var getSignature = function(callback){
		   	util.ajaxForm("openCourse/create",form).then(function(result){
				console.log(result);
				dataArr.forEach(function(item){
					item.append("<input type='text' name='open_course_id' value='"+result.id+"' />");
				});
				var arr = [];
				dataArr.forEach(function(item){
					arr.push(util.ajaxForm("openCourse/lesson/add",item));
				});
			
				$(".public-loading").css({"display":"none"});
				$(".loading_wait").css({"display":"none"});
				$createOperCourse.modal("hide");
				onSelSess2(result.group_id, result.title, result.cover_url, 0, "message-list",1,"","GROUP");
				setChatList({id:result.group_id,name:result.title,face:result.cover_url,lastMsg:null,type:"GROUP"},"select");
				
				var curSessDiv = document.getElementById("sessDiv_" + result.group_id);
				if(curSessDiv){
					$(curSessDiv).trigger("click");
					$(".header-txt").find(".txt1").text(result.title)
					$(".msgedit").val(languageCommon[29]+" "+"["+result.title+ "]")
						onSendMsg();
				}else{
					setTimeout(function(){
						onSelSess($(".message-list").length, result.group_id, "message-list","GROUP",result.title,result.cover_url);
					},100);    
				}
			
				return Promise.all(arr);
			},function(error){
				console.log(error);
			}).then(function(result){
				console.log(result);
					callback(result[0].signature);
				$(".public-loading").css({"display":"none"});
				$(".loading_wait").css({"display":"none"});
				$createOperCourse.modal("hide");
				Showbo.Msg.alert(languageCreateChatRoom[30],function(flag){
					return util.alertFn(languageCreateChatRoom[30]);
					
					document.location.reload();
				});
				
			},function(err){
				console.log(err);
			})
		}
		//只有点播上传视频文件
		var videoFile = '';
 		if(flag == '1'){ // 点播
			videoFile = $createOperCourse.find("#addCourseFile")[0].files[0];
			qcVideo.ugcUploader.start({
				videoFile: videoFile,//视频，类型为 File
				getSignature: getSignature,//前文中所述的获取上传签名的函数
				error: function(result){//上传失败时的回调函数
					//...
					console.log('上传失败的原因：' + result.msg);
				},
				finish: function(result){//上传成功时的回调函数
					console.log('上传结果的fileId：' + result.fileId);
					console.log('上传结果的视频名称：' + result.videoName);
					console.log('上传结果的视频地址：' + result.videoUrl);
				}
			});
		}else{
			util.ajaxForm("openCourse/create",form).then(function(result){
				console.log(result);
				dataArr.forEach(function(item){
					item.append("<input type='text' name='open_course_id' value='"+result.id+"' />");
				});
				var arr = [];
				dataArr.forEach(function(item){
					arr.push(util.ajaxForm("openCourse/lesson/add",item));
				});
			
				$(".public-loading").css({"display":"none"});
				$(".loading_wait").css({"display":"none"});
				$createOperCourse.modal("hide");
				onSelSess2(result.group_id, result.title, result.cover_url, 0, "message-list",1,"","GROUP");
				setChatList({id:result.group_id,name:result.title,face:result.cover_url,lastMsg:null,type:"GROUP"},"select");
				
				var curSessDiv = document.getElementById("sessDiv_" + result.group_id);
				if(curSessDiv){
					$(curSessDiv).trigger("click");
					$(".header-txt").find(".txt1").text(result.title)
					$(".msgedit").val(languageCommon[29]+" "+"["+result.title+ "]")
						onSendMsg();
				}else{
					setTimeout(function(){
						onSelSess($(".message-list").length, result.group_id, "message-list","GROUP",result.title,result.cover_url);
					},100);    
				}
			
				return Promise.all(arr);
			},function(error){
				console.log(error);
			}).then(function(result){
				console.log(result);
					//callback(result[0].signature);
				$(".public-loading").css({"display":"none"});
				$(".loading_wait").css({"display":"none"});
				$createOperCourse.modal("hide");
				Showbo.Msg.alert(languageCreateChatRoom[30],function(flag){
					return util.alertFn(languageCreateChatRoom[30]);
					
					document.location.reload();
				});
				
			},function(err){
				console.log(err);
			})
		}
		
	});


	$(document).on("click",".del_member_choose",function(){
		$(this).parent().remove();
	});
	$(document).on("focus","input.value_error",function(){
		$(this).next(".errorMsg").remove();
	});
	$(document).on("click",".value_error",function(){
		$(this).removeClass(".value_error").next(".errorMsg").remove();
	});



	//init placeholder
	util.initPlaceholder($("#send_msg_text"),languageIm[7]);
	util.initPlaceholder($("#headerSearch"),languageIm[8]);
	util.initPlaceholder($(".search_input_placeholder"),languageIm[9]);
	util.initPlaceholder($(".search_input_placeholderTheone"),languageIm[30]);
//	util.initPlaceholder($(".case_title_holder"),languageIm[10]);
	//util.initPlaceholder($(".case_desc_holder"),languageIm[11]);


	//util.initPlaceholder($(".lesson_title_holder"),languageIm[13]);
	//util.initPlaceholder($(".lesson_desc_holder"),languageIm[12]);
	//util.initPlaceholder($(".open_lesson_title_holder"),languageIm[13]);
//	util.initPlaceholder($(".open_lesson_lecture_holder"),languageIm[14]);
	util.initPlaceholder($(".open_lesson_search_holder"),languageIm[15]);
	util.initPlaceholder($(".open_lesson_time_holder"),languageIm[17]);
//	util.initPlaceholder($(".open_lesson_desc_holder"),languageIm[12]);
//	util.initPlaceholder($(".moxtra_title_holder"),languageIm[31]);
	util.initPlaceholder($(".moxtra_search_holder"),languageIm[15]);
	util.initPlaceholder($(".moxtra_lecture_holder"),languageIm[16]);
	util.initPlaceholder($(".moxtra_time_holder"),languageIm[17])
//	util.initPlaceholder($(".moxtra_title_holder"),languageIm[13]);
//	util.initPlaceholder($(".moxtra_desc_holder"),languageIm[18]);

	util.initPlaceholder($(".msgedit"),languageIm[7]);
	util.initPlaceholder($(".introduction_holder"),languageIm[19]);

//	util.initPlaceholder($(".open_title_holder"),languageIm[20]);
//	util.initPlaceholder($(".open_desc_holder"),languageIm[21]);
//	util.initPlaceholder($(".open_course_title_holder"),languageIm[22]);
//	util.initPlaceholder($(".open_course_desc_holder"),languageIm[23]);
	util.initPlaceholder($(".open_course_time_holder"),languageIm[24]);

	util.initTab(".friend_info_nav");
});
function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}
function ajaxArr(list,callback){
	// if(!list.length){
	// 	return callback();
	// }
	// var data = list.shift();
	// util.ajaxForm("openCourse/lesson/add",data,function(result){
	// 	ajaxArr(list,callback);
	// });
	

}

function showEditNotice(){
		var $div = $(".group-notice-div");
		if($div.hasClass("editing")){//保存
			var value = $.trim($div.find("textarea").val());
			var obj = {
						GroupId:selToID,
						Notification:value
						};
			modifyGroup(obj,function(resp){
				if(resp.ErrorCode == 0){
					$div.find(".content").text(value);
					$div.removeClass("editing").find(".btn").text(languageIm[25]);
				}else{
					util.alertFn(languageIm[26]);
				}
			});
		}else{//修改
			$div.addClass("editing").find(".btn").text(languageIm[27]);
		}
		
	}
function closeGroupNoticeDiv(){
	var rightBox = $(".group-notice-div");
	rightBox.removeClass("slideInRight-group").addClass("slideOutRight-group animated");
	util.hideShade();
	setTimeout(function(){
			rightBox.removeClass("in slideOutRight-group animated");
		},1000);	
}
//群事件关闭
function boxback(){
	var rightBox = $(".right-box");
	rightBox.removeClass("slideInRight").addClass("slideOutRight animated");
	util.hideShade();
	setTimeout(function(){
			rightBox.removeClass("in slideOutRight animated");
		},1000);
}
//群事件全部
function groupAll(type) {
	var _this=$(this);
	$("#right_event_list").empty();
    $("#right_event_list").append('<div class="event_loading"><img src="img/loading.gif"/></div>');
     $(".right-box-content_list").find(".move").hide();
	var num=15;
	util.ajax("group/feed/list",{
            user_id:local_user.id,
            qcloud_signature:local_user.qcloud_signature,
            id:selToID,
            offset:0,
            limit:num,
            type:type
           
    },function(result){
            $("#right_event_list").empty();
            if(result.code == 200){
                total=result.total;
                if(total<=num){
                    $(".right-box-content_list").find(".move").hide();
                }
                initGroupIncident(result.data,"group","#right_event_list",function(){
                    $(_this).trigger("click");
                })
            }
    })

}
	
//群事件病例
function groupCase(type){
	var _this=$(this);
	$("#right_event_list").empty();
    $("#right_event_list").append('<div class="event_loading"><img src="img/loading.gif"/></div>');
     $(".right-box-content_list").find(".move").hide();
	var num=15;
	util.ajax("group/feed/list",{
            user_id:local_user.id,
            qcloud_signature:local_user.qcloud_signature,
            id:selToID,
            offset:0,
            limit:num,
            type:type
    },function(result){
            $("#right_event_list").empty();
            if(result.code == 200){
                total=result.total;
                if(total<=num){
                    $(".right-box-content_list").find(".move").hide();
                }
                initGroupIncident(result.data,"group","#right_event_list",function(){
                     $(_this).trigger("click");
                     $("#right_event_list").attr("data-type",type);
                })
            }
    })
}

//群事件课程
function groupCouse(type) {
	var _this=$(this);
	$("#right_event_list").empty();
    $("#right_event_list").append('<div class="event_loading"><img src="img/loading.gif"/></div>');
     $(".right-box-content_list").find(".move").hide();
	var num=15;
	util.ajax("group/feed/list",{
            user_id:local_user.id,
            qcloud_signature:local_user.qcloud_signature,
            id:selToID,
            offset:0,
            limit:num,
            type:type
    },function(result){
            $("#right_event_list").empty();
            if(result.code == 200){
                total=result.total;
                if(total<=num){
                    $(".right-box-content_list").find(".move").hide();
                }
                initGroupIncident(result.data,"group","#right_event_list",function(){
                    $(_this).trigger("click");
                     $("#right_event_list").attr("data-type",type);
                })
            }
    })
}

//群事件研讨会
function groupSeminar(type){
	var _this=$(this);
	$("#right_event_list").empty();
    $("#right_event_list").append('<div class="event_loading"><img src="img/loading.gif"/></div>');
     $(".right-box-content_list").find(".move").hide();
	var num=15;
	util.ajax("group/feed/list",{
            user_id:local_user.id,
            qcloud_signature:local_user.qcloud_signature,
            id:selToID,
            offset:0,
            limit:num,
            type:type
    },function(result){
            $("#right_event_list").empty();
            if(result.code == 200){
                total=result.total;
                if(total<=num){
                    $(".right-box-content_list").find(".move").hide();
                }
                initGroupIncident(result.data,"group","#right_event_list",function(){
                     $(_this).trigger("click");
                      $("#right_event_list").attr("data-type",type);
                })
            }
    })
}
function closeGroupSet(){
	var rightBox = $(".group-set");
	rightBox.find(".discipline_first").get(0).selectedIndex = 0;
	rightBox.find(".discipline_second").get(0).selectedIndex = 0;
	rightBox.removeClass("slideInRight-group").addClass("slideOutRight-group animated");

	util.hideShade();
	setTimeout(function(){
			rightBox.removeClass("in slideOutRight-group animated");
		},1000);	
}
function showOperCourse(flag){
	var $createOperCourse = $("#create_oper_course");
		$createOperCourse.attr("flag",flag);
		
		bindDiscipline("","");

		$createOperCourse.find(":input").each(function(){
			var $this = $(this);
			if($this.is("select")){
				$this.val("-1");
			}else{
				$this.val("");
			}
		});
		if(!$createOperCourse.find("#cover_input").length){
			$createOperCourse.find(".open_course_img").append('<input id="cover_input" name="cover" type="file" class="nodisplay" />');
		}
		$createOperCourse.find(".course-list").empty();
		$createOperCourse.find("#cover").attr("src","img/webbg_details_opencourse.png");
		switch(flag){
			case "1":
				$createOperCourse.find(".header_title").text(languageIm[28]);
				$createOperCourse.find("#showAddCourse")[0].onclick=function(){
					showAddOpenCourse(flag);
				};
			break;
			case "2":$createOperCourse.find(".header_title").text(languageCommon[17]);
				$createOperCourse.find("#showAddCourse")[0].onclick=function(){
					showAddOpenCourse(flag);
				};
			break;
			case "3":$createOperCourse.find(".header_title").text(languageIm[29]);
				$createOperCourse.find("#showAddCourse")[0].onclick=function(){
					showAddOpenCourse(flag);
				};
			break;
		}
		$createOperCourse.modal("show");
	}
$(".width_click").click(function(){
	var cur_lang=window.localStorage.getItem("cur_language");
	if(cur_lang==1){
		$(".modal-row-l").css("margin-left","-5px");
		$(".modal-row-r").css("margin-left","30px");
	}else{
		$(".modal-row-l").css("margin-left","0px");
		$(".modal-row-r").css("margin-left","13px");
	}
});
$(".modal-row-r").find($(".discipline_first")).change(
	function(){
		var discipline_first =$(this).find($("option:selected")).val();
		changeDiscipline(discipline_first)
	}

);
function closeLocalSearch(){
	$(".searching .closed").trigger("click");
	$(".shade-div").hide();
}