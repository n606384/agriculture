$(function(){	
	
	function getParamFromHref(strName){
		var urlHref = window.document.location.href;
		var intPos = urlHref.indexOf("?");
		var params = urlHref.substr(intPos+1);
		var attParams = params.split("&");
		for(var i = 0; i < attParams.length;i++){
			var param = attParams[i].split("=");
			if(param[0].toLowerCase()===strName){
				return param[1];
			}
			else return "";
		}
	}
	var token = getParamFromHref("token");
	
	var app = window.app = {};
	app.token = token||"ddd";
	app.hjglFlag = 1;
	app.hjyyProgress = 1;
	urlTokenParm = "?token="+app.token;
	app.postUrls = 
		{
			//1	用户登录验证接口
			"login":"http://192.168.44.232:8080/rest/login" +urlTokenParm,
			//2	汇交预约数据提交单位查询接口
			"getHJDWRYXX":"http://192.168.44.232:8080/rest/hjyy/getHJDWRYXX"+urlTokenParm,
			//3	汇交预约数据提交用户查询接口
			"getHJRYXX":"http://192.168.44.232:8080/rest/hjyy/getHJRYXX"+urlTokenParm,
			//4	汇交预约数据提交用户增加接口
			"addhjyyyh":"http://192.168.44.232:8080/rest/ hjyy/addhjyyyh"+urlTokenParm,
			//5	汇交预约数据包增加接口
			"addSJBXX":"http://192.168.44.232:8080/rest/hjyy/addSJBXX"+urlTokenParm,
			//6	汇交预约数据文件增加接口
			"addSJWJXX":"http://192.168.44.232:8080/rest/hjyy/addSJWJXX"+urlTokenParm,
			//7	汇交预约数据包状态更改接口
			"updateHJSBZT":"http://192.168.44.232:8080/rest/hjyy/updateHJSBZT" +urlTokenParm,
			//8	新增系统用户接口
			"addXTUser":"http://192.168.44.232:8080/rest/user/add" +urlTokenParm,
			//9	修改系统用户接口
			"updateXTUser":"http://192.168.44.232:8080/rest/user/update" +urlTokenParm,
			//10	删除系统用户接口
			"deleteXTUser":"http://192.168.44.232:8080/rest/user/delete" +urlTokenParm,
			//11	获取系统用户信息接口
			"getXTUser":"http://192.168.44.232:8080/rest/user/getUser" +urlTokenParm,
			//12	验证系统用户名是否存在接口
			"checkXTUser":"http://192.168.44.232:8080/rest/user/check" +urlTokenParm,
			//13	获取系统日志记录数量接口
			"getlogCount":"http://192.168.44.232:8080/rest/xtrz/getlogCount" +urlTokenParm,
			//14	获取系统日志记录信息接口
			"getlogInfo":"http://192.168.44.232:8080/rest/xtrz/getlogInfo" +urlTokenParm,
			//15	上传解析权属单位编码信息接口
			"uploadQSDWDMB":"http://192.168.44.232:8080/rest/hzbg/uploadQSDWDMB" +urlTokenParm,
			//16	上传解析地块汇总表接口
			"uploadDKHZB":"http://192.168.44.232:8080/rest/hzbg/uploadDKHZB" +urlTokenParm,
			//17	上传解析承包地是否基本农田接口
			"uploadCBDSFJBNT":"http://192.168.44.232:8080/rest /hzbg/uploadCBDSFJBNT" +urlTokenParm,
			//18	上传解析按权证信息汇总表接口
			"uploadQZXXHZ":"http://192.168.44.232:8080/rest/hzbg/uploadQZXXHZ" +urlTokenParm,
			//19	上传解析承包地土地用途汇总表接口
			"uploadCBTDYT":"http://192.168.44.232:8080/rest/hzbg/uploadCBTDYT" +urlTokenParm,
			//20	上传解析按承包方汇总表接口
			"uploadCBFHZ":"http://192.168.44.232:8080/rest/hzbg/uploadCBFHZ" +urlTokenParm,
			//21	上传解析按非承包地地块类别汇总表接口
			"uploadFCBDDKLB":"http://192.168.44.232:8080/rest/hzbg/uploadFCBDDKLB" +urlTokenParm,
			//22	获取汇交数据包表记录数量接口
			"getSJBCount":"http://192.168.44.232:8080/rest/hjgl/getSJBCount" +urlTokenParm,
			//23	获取汇交数据包简要信息接口
			"getSJBJYXX":"http://192.168.44.232:8080/rest/hjgl/getSJBJYXX" +urlTokenParm,
			//24	获取汇交数据包详细信息接口
			"getSJBXXXX":"http://192.168.44.232:8080/rest/hjgl/ getSJBXXXX" +urlTokenParm,
			//25	修改汇交数据文件详细信息接口
			"updateHJSJWJ":"http://192.168.44.232:8080/rest/hjgl/updateHJSJWJ" +urlTokenParm,
			//26	查询汇交单位信息接口
			"getHJDW":"http://192.168.44.232:8080/rest/hjgl/getHJDW" +urlTokenParm,
			//27	修改汇交单位信息接口
			"addhjyyyh":"http://192.168.44.232:8080/rest/hjyy/addhjyyyh" +urlTokenParm	
			
		};
	initHJGL();
	$(".navMenu li").each(function(index){
		
		$(this).on('click', function(evt){
			
			$(".navMenu li a").attr("class","navDeactive");
			$(this).children("a").attr("class","navActive");
			
			$("#paneLevel1").empty();
			
			if(parseInt(index) == 0){
				initHJGL();
			}
			else if(parseInt(index) == 1){
				$("#paneLevel1").empty();
				$.ajax({
					type:"get",
					url:"assets/hjglSeg-2.html",
					async:true,
					success:function(res){
						//console.log(res);
						$("#paneLevel1").html(res);
						$.getScript("assets/js/hjgl-2.js").then(function(){
							
							var aa = new $.hjclProcess();
						});
						
						
						
					}
				});
			}else if(parseInt(index) == 2){
				
			}else if(parseInt(index) == 3){
				
			}else if(parseInt(index) == 4){
				$("#paneLevel1").empty();
				
				$.ajax({
					type:"get",
					url:"assets/hjglSeg-5.html",
					async:true,
					success:function(res){
						//console.log(res);
						$("#paneLevel1").html(res);
						$.getScript("assets/js/hjgl-5.js").then(function(){
							var pro = new $.xtglProcess();
						});
						
						
					}
				});
				
			}
			
		});
	})
	
	
	function initHJGL(){
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
	}
	
})
