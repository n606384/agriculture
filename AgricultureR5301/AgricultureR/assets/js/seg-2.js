(function($){
	
	$.processSJB = function(app){
		console.log("seg-2.js传入app",app);
		//this.init(app);
		init();	
		app.hjyyProgress = 2;
		
	}
	var formData= {}, formUpdate = {};
	var sjbztFD = "1008002";
	function init(){
		$("#countySpanSJB").html(app.xianName);
		//事件绑定
		$("#updateBtnSJB").on('click', function(){
			enableInput();
		});
		
		$("#saveBtnSJB").unbind('click',addSJB);
		$("#saveBtnSJB").on('click',addSJB);
		
		
		$("#sjblxList li").on('click', function(e){
			
			var dataset = e.target.dataset;
			var id = dataset.id;
			var name = dataset.name;
			$("#sjblx").val(name);
		});
		$("#hjsjbjzList li").on('click', function(e){
			
			var dataset = e.target.dataset;
			var id = dataset.id;
			var name = dataset.name;
			$("#hjsjbjz").val(name);
		});
		
		//表单验证
		 $('#sjbForm').bootstrapValidator({
	        message: '该值不是有效值',
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {
	            sjbmc: {
	                validators: {
	                    notEmpty: {
	                        message: '数据包名称为必填项，不能为空！'
	                    }
	                }
	            },
	            sjblx: {
	                validators: {
	                    notEmpty: {
	                        message: '数据包类型为必填项，不能为空！'
	                    }
	                }
	            },
	            hjjzlx:{
	                validators: {
	                    notEmpty: {
	                        message: '汇交介质类型为必填项，不能为空！'
	                    }
	                }
	            },
	            sjbdx:{
	                validators: {
	                    notEmpty: {
	                        message: '数据包大小为必填项，不能为空！'
	                    },numeric: {
	            			message: '请输入数字，不能为空！'            			
	            		}
	                }
	            },
	            wjzs:{
	                validators: {
	            		notEmpty: {
	                        message: '文件总数为必填项，不能为空！'
	                    },
	                    numeric: {
	            			message: '请输入数字，不能为空！'            			
	            		}
	            	}
	            },
	            
	            email: {
	                validators: {
	                	notEmpty: {
	                        message: '联系邮箱为必填项，不能为空！'
	                   },
	                    emailAddress: {
	                        message: '该输入值不是有效的邮箱地址'
	                    }
	                }
	            },
	            ccwz:{
	                validators: {
	                    notEmpty: {
	                        message: '存储位置为必填项，不能为空！'
	                    }
	                }
	            }
	            
	        }
	   });
		
		$("#importBtnSJB").on('click', function(){
            		
    		$("#importBtnSJB").fileupload({
        						url: app.postUrls.uploadParJson,
        						//"http://192.168.44.232:8080/rest/hzbg/uploadParJson?token=ddd",
        						dataType:'json'
        	}).bind('fileuploaddone', function(e, data) {
        		console.log("上传成功", data.result);
        		if(data.result){
        			app.scanData = data.result;
        			var filePath = data.result.name;
        			var attPath = data.result.name.split("/");
        			var name = attPath[attPath.length - 2];
        			console.log(attPath);
        			$("#sjbmc").val(name);
        			$("#ccwz").val(filePath);
        			
        			$("#sjbdx").val(data.result.allNum);
        			$("#wjzs").val(data.result.allSize);
        			
        			$('#sjbForm').bootstrapValidator('validate');
        			
        		}
        		
        	});
    	});
		
		
	}
	function addSJB(){		
		$('#sjbForm').bootstrapValidator('validate');
		if(checkEmpty()){
			
			var title="警告信息";
			var content="录入信息不完整，请补全其他信息！";
			var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
			
			$("#modalTitleSJB").html(title);
			$("#modalContentSJB").html(content);
			$("#modalFooterSJB").html(footer);
			
			$("#dialogModalSJB").modal('show');
			return false;
			
		}else{
			console.log("提交数据包formData", formData);			
			app.sjbData = formData;
			if(app.sjbbm){
				$.ajax({
					type:"post",
					url:app.postUrls.updateSJBXX,
					async:true,
					dataType:'json',
					data:formUpdate,
					success:function(res){
						console.log("数据包修改返回信息",res);
						if(res){
							
							disableInput();							
							var title="系统信息";
							var content="数据保存成功！";
							var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
							
							$("#modalTitleSJB").html(title);
							$("#modalContentSJB").html(content);
							$("#modalFooterSJB").html(footer);
							$('#dialogModalSJB').modal({backdrop: 'static', keyboard: false});
							$("#dialogModalSJB").modal('show');
							
							
						}
						
					},
					error:function(err){
						console.log("err",err);
						var title="错误信息";
						var content="数据保存出错！"+err.toString();
						var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
						
						$("#modalTitleSJB").html(title);
						$("#modalContentSJB").html(content);
						$("#modalFooterSJB").html(footer);
						$('#dialogModalSJB').modal({backdrop: 'static', keyboard: false});
						$("#dialogModalSJB").modal('show');
						
						
					}
					
				});
				
			}else{
				$.ajax({
					type:"post",
					url:app.postUrls.addSJBXX,
					async:true,
					dataType:'json',
					data:formData,
					success:function(res){
						console.log("数据包保存返回信息",res);
						if(res){
							app.sjbbm = res.sjbbm;
							disableInput();
							
							var title="系统信息";
							var content="数据保存成功！";
							var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
							
							$("#modalTitleSJB").html(title);
							$("#modalContentSJB").html(content);
							$("#modalFooterSJB").html(footer);
							$('#dialogModalSJB').modal({backdrop: 'static', keyboard: false});
							$("#dialogModalSJB").modal('show');
							
							
						}
						
					},
					error:function(err){
						console.log("err",err);
						var title="错误信息";
						var content="数据保存出错！"+err.toString();
						var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
						
						$("#modalTitleSJB").html(title);
						$("#modalContentSJB").html(content);
						$("#modalFooterSJB").html(footer);
						$('#dialogModalSJB').modal({backdrop: 'static', keyboard: false});
						$("#dialogModalSJB").modal('show');
						
					}
				});
				
			}
			
		}
		return false;
		
	}
	function disableInput(){
		$("#sjbmc").attr("disabled","disabled");
		$("#sjblx").attr("disabled","disabled");
		$("#hjsjbjz").attr("disabled","disabled");

		$("#sjbdx").attr("disabled","disabled");
		$("#wjzs").attr("disabled","disabled");
		$("#ccwz").attr("disabled","disabled");
		$("#sjbms").attr("disabled","disabled");
		
		$("input[name=sjbsc]").attr("disabled","disabled");
				
	}
	function enableInput(){
		$("#sjbmc").removeAttr("disabled");
		$("#sjblx").removeAttr("disabled");
		$("#hjsjbjz").removeAttr("disabled");

		$("#sjbdx").removeAttr("disabled");
		$("#wjzs").removeAttr("disabled");
		$("#ccwz").removeAttr("disabled");
		$("#sjbms").removeAttr("disabled");
		
		$("input[name=sjbsc]").removeAttr("disabled");
		
		$("#saveBtnSJB").removeAttr("disabled");
	}
	
	function checkEmpty(){
		var sjbmcFD = $("#sjbmc").val();
		var sjblxName = $("#sjblx").val().trim();
		var hjsjbjzName = $("#hjsjbjz").val().trim();
//		var sjbztFD = $("#sjbzt").val();
		
		var sjbdxFD = $("#sjbdx").val();
		var wjzsFD = $("#wjzs").val();
		var ccwzFD = $("#ccwz").val();
		var sjbmsFD = $("#sjbms").val();
		
		var sjblxFD,hjsjbjzFD;
		
		switch(sjblxName){
			case "压缩文件":
				sjblxFD = 1007001;				
				break;
			case "文件夹":
				sjblxFD = 1007002;			
				break;
			case "镜像文件":
				sjblxFD = 1007003;				
				break;
		}
		
		switch(hjsjbjzName){
			case "光盘":
				hjsjbjzFD = 1006001;				
				break;
			case "移动硬盘":
				hjsjbjzFD = 1006002;				
				break;
			case "U盘":
				hjsjbjzFD = 1006003;				
				break;
		}		
		
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth()+1;
		var day = now.getDay();
		var tjsj = year+"-"+month+"-"+day;
		
		var sjbztFlag = $('input[name="sjbsc"]:checked').val();
		if(parseInt(sjbztFlag) == 0){
			sjbztFD = "1008002";
			
		}else if(parseInt(sjbztFlag) == 1){
			sjbztFD = "1008005";
		}
						
		
		formData = {
			"sjblx" : sjblxFD,
		    "hjrybm":app.hjrybm,
		    "ssqx" : app.xianbm,
		    "sjbzt": "1008001",
		    "hjsjbjz" : hjsjbjzFD,
		    "sjbmc" : sjbmcFD,
		    "tjsj" : tjsj,
		    "sjbdx" : sjbdxFD,
		    "wjzs" : wjzsFD,
		    "ccwz" : ccwzFD,
		    "sjbms" : ""
	
		};
		formUpdate = {
			"sjbbm": app.sjbbm,
			"sjblx" : sjblxFD,
		    "hjrybm":app.hjrybm,
		    "ssqx" : app.xianbm,
		    "sjbzt": "1008001",
		    "hjsjbjz" : hjsjbjzFD,
		    "sjbmc" : sjbmcFD,
		    "tjsj" : tjsj,
		    "sjbdx" : sjbdxFD,
		    "wjzs" : wjzsFD,
		    "ccwz" : ccwzFD,
		    "sjbms" : ""
		};
		
		
		if(sjbmcFD==""||sjblxFD==""||hjsjbjzFD==""||sjbdxFD==""||wjzsFD==""||ccwzFD==""){
			return true;
		}else return false;
	}
	
})(jQuery)
