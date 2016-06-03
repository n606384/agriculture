(function($){
	var sjbztFD="",sjbztMS="";
	var sjbmsFD ="";
	$.chushenProcess = function(app){
		init();
		
	}
	function init(){
		$("#countySpan_chushen").html(app.xianName);
		
		$("#updateSJB_chushen").on('click',function(){
			$("#sjbms_chushen").removeAttr("disabled");
			$("input[name=chushenRes]").removeAttr("disabled");
			$("#hjsjbjz").removeAttr("disabled");
			
		});
		
		$("#saveSJB_chushen").on('click', function(){
			
			$("#sjbms_chushen").attr("disabled","disabled");
			$("input[name=chushenRes]").attr("disabled","disabled");
			$("#hjsjbjz").attr("disabled","disabled");
			
			var chushenFlag = $('input[name="sjbsc"]:checked').val();
			if(parseInt(chushenFlag) == 0){
				sjbztFD = "1008002";
				sjbztMS = "";
				
			}else if(parseInt(chushenFlag) == 1){
				sjbztFD = "1008001";
			}
			
			$.ajax({
				type:"post",
				url:app.postUrls.updateHJSBZT,
				async:true,
				dataType:"json",
				data:{
					"sjbbm":app.sjbbm,
					"sjbzt":sjbztFD
				},
				success:function(res){
					console.log("修改数据包状态成功",res);
				},
				error:function(err){
					console.log("修改数据包状态出错",err);
				}
			});
			sjbmsFD = $("#sjbms_chushen").val();
			$.ajax({
				type:"post",
				url:app.postUrls.updateSJBXX,
				async:true,
				dataType:"json",
				data:{
					"sjbbm":app.sjbbm,
					"sjbms":sjbmsFD
				},
				success:function(res){
					console.log("数据包备注修改成功",res);
				},
				error:function(err){
					console.log("数据包备注修改失败",err);
				}
			});
			
		});
		
		//
		$("#sjtjzmBtn").on('click', function(){
			fullfillSJTJZM();
			$("#SJTJZM").modal('show');
		});
		$("#printBtnSJTJ").on('click', function(){
			$("#printContentPane").jqprint();
		});
		
		function fullfillSJTJZM(){
			
		}
		//继续预约
		$("#hjyyRepeat").on('click', function(){
			
			app.hjyyProgress = 1;
			$("#paneLevel1").empty();
			$.ajax({
				type:"get",
				url:"assets/hjglSeg-1.html",
				async:true,
				success:function(res){
					//console.log(res);
					$("#paneLevel1").html(res);
					$.getScript("assets/js/hjyy.js");
				}
			});
		});
		//汇交处理
		$("#hjclBegin").on('click', function(){
			$(".navMenu li a").attr("class","navDeactive");
			$(".navMenu li:eq(1)").children("a").attr("class","navActive");
			$("#paneLevel1").empty();
			$.ajax({
				type:"get",
				url:"assets/hjglSeg-2.html",
				async:true,
				success:function(res){
					//console.log(res);
					$("#paneLevel1").html(res);
					$.getScript("assets/js/hjgl-2.js").then(function(){
						aa = null;
						aa = new $.hjclProcess();
					});			
					
				}
			});
		});
		
		
	}
})(jQuery)
