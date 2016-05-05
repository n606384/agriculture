(function($){
	
	$.processSJB = function(app){
		console.log("seg-2.js传入app",app);
		//this.init(app);
		init();	
		app.hjyyProgress = 2;
		
	}
	var formData= {};
	var sjbztFD = "1008002";
	function init(){
		$("#countySpanSJB").html(app.xianName);
		//事件绑定
		$("#updateBtnSJB").on('click', function(){
			enableInput();
		});
		$("#saveBtnSJB").on('click', function(){
			
			if(checkEmpty()){
//				alert("saveBtnSJB");
				
				var title="警告信息";
				var content="录入信息不完整，请补全其他信息！";
				var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
				
				$("#modalTitleSJB").html(title);
				$("#modalContentSJB").html(content);
				$("#modalFooterSJB").html(footer);
				
				$("#dialogModalSJB").modal('show');
				return;
				
			}else{			
				console.log("提交数据包formData", formData);
				
//				formData = {
//					"sjblx" : "1007001",
//				    "hjrybm":app.hjrybm,
//				    "ssqx" : app.xianbm,
//				    "sjbzt": "1008001",
//				    "hjsjbjz" : "1006001",
//				    "sjbmc" : "sjbmcFD",
//				    "tjsj" : "2016-5-1",
//				    "sjbdx" : "122",
//				    "wjzs" : "122",
//				    "ccwz" : "ccwzFD",
//				    "sjbms" : "sjbmsFD"
//			
//				};
				
				$.ajax({
					type:"post",
					url:"http://192.168.44.231:8080/rest/hjyy/addSJBXX?token=ddd",
					async:true,
					dataType:'json',
					data:formData,
					success:function(res){
						console.log(res);
						if(res){
							app.sjbbm = res.sjbbm;
							disableInput();
							
							var title="系统信息";
							var content="数据保存成功！";
							var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
							
							$("#modalTitleSJB").html(title);
							$("#modalContentSJB").html(content);
							$("#modalFooterSJB").html(footer);
							
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
						
						$("#dialogModalSJB").modal('show');
					}
				});
			}
			
		});
		
		
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
			case "虚拟光盘文件":
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
		
		console.log("sjbsc radio",$('input[name="sjbsc"]:checked').val());
		
		
		formData = {
			"sjblx" : sjblxFD,
		    "hjrybm":app.hjrybm,
		    "ssqx" : app.xianbm,
		    "sjbzt": sjbztFD,
		    "hjsjbjz" : hjsjbjzFD,
		    "sjbmc" : sjbmcFD,
		    "tjsj" : tjsj,
		    "sjbdx" : sjbdxFD,
		    "wjzs" : wjzsFD,
		    "ccwz" : ccwzFD,
		    "sjbms" : sjbmsFD
	
		}
		
		
		if(sjbmcFD==""||sjblxFD==""||hjsjbjzFD==""||sjbdxFD==""||wjzsFD==""||ccwzFD==""){
			return true;
		}else return false;
	}
	
})(jQuery)
/*
 init=function(app){
		//初始化县名称
		$("#countySpanSJB").html(app.xianName);
		
		
		$("#sjbmc");
		$("#sjblx");
		$("#hjsjbjz");
		$("#sjbzt");
		
		$("#sjbdx");
		$("#wjzs");
		$("#ccwz");
		$("#sjbms");
		
		//checkEmpty();
		
	};
	
 * 
 * */