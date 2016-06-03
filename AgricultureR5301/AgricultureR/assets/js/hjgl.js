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
	app.postUrls1 = 
		{
			//1	用户登录验证接口
			"login":"http://192.168.72.129:8080/login" +urlTokenParm,
			//2	汇交预约数据提交单位查询接口
			"getHJDWRYXX":"http://192.168.72.129:8080/hjyy/getHJDWRYXX"+urlTokenParm,
			//3	汇交预约数据提交用户查询接口
			"getHJRYXX":"http://192.168.72.129:8080/hjyy/getHJRYXX"+urlTokenParm,
			//4	汇交预约数据提交用户增加接口
			"addhjyyyh":"http://192.168.72.129:8080/hjyy/addhjyyyh"+urlTokenParm,
			//5	汇交预约数据包增加接口
			"addSJBXX":"http://192.168.72.129:8080/hjyy/addSJBXX"+urlTokenParm,
			//6	汇交预约数据文件增加接口
			"addSJWJXX":"http://192.168.72.129:8080/hjyy/addSJWJXX"+urlTokenParm,
			//7	汇交预约数据包状态更改接口
			"updateHJSBZT":"http://192.168.72.129:8080/hjyy/updateHJSBZT" +urlTokenParm,
			//8	新增系统用户接口
			"addXTUser":"http://192.168.72.129:8080/user/add" +urlTokenParm,
			//9	修改系统用户接口
			"updateXTUser":"http://192.168.72.129:8080/user/update" +urlTokenParm,
			//10	删除系统用户接口
			"deleteXTUser":"http://192.168.72.129:8080/user/delete" +urlTokenParm,
			//11	获取系统用户信息接口
			"getXTUser":"http://192.168.72.129:8080/user/getUser" +urlTokenParm,
			//12	验证系统用户名是否存在接口
			"checkXTUser":"http://192.168.72.129:8080/user/check" +urlTokenParm,
			//13	获取系统日志记录数量接口
			"getlogCount":"http://192.168.72.129:8080/xtrz/getlogCount" +urlTokenParm,
			//14	获取系统日志记录信息接口
			"getlogInfo":"http://192.168.72.129:8080/xtrz/getlogInfo" +urlTokenParm,
			//15	上传解析权属单位编码信息接口
			"uploadQSDWDMB":"http://192.168.72.129:8080/hzbg/uploadQSDWDMB" +urlTokenParm,
			//16	上传解析地块汇总表接口
			"uploadDKHZB":"http://192.168.72.129:8080/hzbg/uploadDKHZB" +urlTokenParm,
			//17	上传解析承包地是否基本农田接口
			"uploadCBDSFJBNT":"http://192.168.72.129:8080/hzbg/uploadCBDSFJBNT" +urlTokenParm,
			//18	上传解析按权证信息汇总表接口
			"uploadQZXXHZ":"http://192.168.72.129:8080/hzbg/uploadQZXXHZ" +urlTokenParm,
			//19	上传解析承包地土地用途汇总表接口
			"uploadCBTDYT":"http://192.168.72.129:8080/hzbg/uploadCBTDYT" +urlTokenParm,
			//20	上传解析按承包方汇总表接口
			"uploadCBFHZ":"http://192.168.72.129:8080/hzbg/uploadCBFHZ" +urlTokenParm,
			//21	上传解析按非承包地地块类别汇总表接口
			"uploadFCBDDKLB":"http://192.168.72.129:8080/hzbg/uploadFCBDDKLB" +urlTokenParm,
			//22	获取汇交数据包表记录数量接口
			"getSJBCount":"http://192.168.72.129:8080/hjgl/getSJBCount" +urlTokenParm,
			//23	获取汇交数据包简要信息接口
			"getSJBJYXX":"http://192.168.72.129:8080/hjgl/getSJBJYXX" +urlTokenParm,
			//24	获取汇交数据包详细信息接口
			"getSJBXXXX":"http://192.168.72.129:8080/hjgl/getSJBXXXX" +urlTokenParm,
			//25	修改汇交数据包详细信息接口
			//http://192.168.72.129:8080/hjgl/updateSJBXX
			"updateSJBXX":"http://192.168.72.129:8080/hjgl/updateSJBXX"+urlTokenParm,			
			//26	修改汇交数据文件详细信息接口
			//http://192.168.72.129:8080/hjgl/updateHJSJWJ
			"updateHJSJWJ":"http://192.168.72.129:8080/hjgl/updateHJSJWJ"+urlTokenParm,
			//27	查询汇交单位信息接口
			"getHJDWXXByName":"http://192.168.72.129:8080/hjgl/getHJDWXXByName" +urlTokenParm,
			//28	修改汇交单位信息接口
			"updateHJDWXX":"http://192.168.72.129:8080/hjgl/updateHJDWXX" +urlTokenParm,
			//29	查询汇交人员信息接口
			//http://192.168.72.129:8080/hjgl/getHJDWXXByName
			"getHJDWXXByName":"http://192.168.72.129:8080/hjgl/getHJDWXXByName"+urlTokenParm,
			//30	修改汇交人员信息接口
			//http://192.168.72.129:8080/hjgl/updateHJRYXX
			"updateHJRYXX":"http://192.168.72.129:8080/hjgl/updateHJRYXX"+urlTokenParm,
			//31	权属单位编码信息入库接口
			//http://192.168.72.129:8080/hzbg/addQSDWDMB
			"addQSDWDMB":"http://192.168.72.129:8080/hzbg/addQSDWDMB"+urlTokenParm,
			//32	地块汇总表入库接口
			//http://192.168.72.129:8080/hzbg/addDKHZB
			"addDKHZB":"http://192.168.72.129:8080/hzbg/addDKHZB"+urlTokenParm,
			//33	承包地是否基本农田入库接口
			//http://192.168.72.129:8080/hzbg/addCBDSFJBNTB
			"addCBDSFJBNTB":"http://192.168.72.129:8080/hzbg/addCBDSFJBNTB"+urlTokenParm,
			//34	按权证信息汇总表入库接口
			//http://192.168.72.129:8080/hzbg/addQZXXHZB
			"addQZXXHZB":"http://192.168.72.129:8080/hzbg/addQZXXHZB"+urlTokenParm,
			//35	承包地土地用途汇总表入库接口
			//http://192.168.72.129:8080/hzbg/addCBTDYTHZB
			"addCBTDYTHZB":"http://192.168.72.129:8080/hzbg/addCBTDYTHZB"+urlTokenParm,
			//36	承包方汇总表入库接口
			//http://192.168.72.129:8080/hzbg/addCBFHZB
			"addCBFHZB":"http://192.168.72.129:8080/hzbg/addCBFHZB"+urlTokenParm,
			//37	非承包地地块类别汇总表入库接口
			//http://192.168.72.129:8080/hzbg/addFCBDKLBHZB
			"addFCBDKLBHZB":"http://192.168.72.129:8080/hzbg/addFCBDKLBHZB"+urlTokenParm,
			//38	新增质检审核信息表入库接口
			//http://192.168.44.232:8080/rest/hzbg/addSHZJXX
			"addSHZJXX":"http://192.168.72.129:8080/hzbg/addSHZJXX"+urlTokenParm,
			//39  json数据包上传
			"uploadParJson":"http://192.168.72.129:8080/hzbg/uploadParJson"+urlTokenParm,
			//40修改质检信息
			//http://192.168.44.232:8080/rest/hzbg/updateSHZJXX
			"updateSHZJXX":"http://192.168.72.129:8080/hzbg/updateSHZJXX"+urlTokenParm
			
		};
	app.postUrls =
		{
			//1	用户登录验证接口
			"login":"http://192.168.44.232:8080/rest/login" +urlTokenParm,
			//2	汇交预约数据提交单位查询接口
			"getHJDWRYXX":"http://192.168.44.232:8080/rest/hjyy/getHJDWRYXX"+urlTokenParm,
			//3	汇交预约数据提交用户查询接口
			"getHJRYXX":"http://192.168.44.232:8080/rest/hjyy/getHJRYXX"+urlTokenParm,
			//4	汇交预约数据提交用户增加接口
			"addhjyyyh":"http://192.168.44.232:8080/rest/hjyy/addhjyyyh"+urlTokenParm,
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
			"uploadCBDSFJBNT":"http://192.168.44.232:8080/rest/hzbg/uploadCBDSFJBNT" +urlTokenParm,
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
			"getSJBXXXX":"http://192.168.44.232:8080/rest/hjgl/getSJBXXXX" +urlTokenParm,
			//25	修改汇交数据包详细信息接口
			//http://192.168.44.232:8080/rest/hjgl/updateSJBXX
			"updateSJBXX":"http://192.168.44.232:8080/rest/hjgl/updateSJBXX"+urlTokenParm,			
			//26	修改汇交数据文件详细信息接口
			//http://192.168.44.232:8080/rest/hjgl/updateHJSJWJ
			"updateHJSJWJ":"http://192.168.44.232:8080/rest/hjgl/updateHJSJWJ"+urlTokenParm,
			//27	查询汇交单位信息接口
			"getHJDWXXByName":"http://192.168.44.232:8080/rest/hjgl/getHJDWXXByName" +urlTokenParm,
			//28	修改汇交单位信息接口
			"updateHJDWXX":"http://192.168.44.232:8080/rest/hjgl/updateHJDWXX" +urlTokenParm,
			//29	查询汇交人员信息接口
			//http://192.168.44.232:8080/rest/hjgl/getHJDWXXByName
			"getHJDWXXByName":"http://192.168.44.232:8080/rest/hjgl/getHJDWXXByName"+urlTokenParm,
			//30	修改汇交人员信息接口
			//http://192.168.44.232:8080/rest/hjgl/updateHJRYXX
			"updateHJRYXX":"http://192.168.44.232:8080/rest/hjgl/updateHJRYXX"+urlTokenParm,
			//31	权属单位编码信息入库接口
			//http://192.168.44.232:8080/rest/hzbg/addQSDWDMB
			"addQSDWDMB":"http://192.168.44.232:8080/rest/hzbg/addQSDWDMB"+urlTokenParm,
			//32	地块汇总表入库接口
			//http://192.168.44.232:8080/rest/hzbg/addDKHZB
			"addDKHZB":"http://192.168.44.232:8080/rest/hzbg/addDKHZB"+urlTokenParm,
			//33	承包地是否基本农田入库接口
			//http://192.168.44.232:8080/rest/hzbg/addCBDSFJBNTB
			"addCBDSFJBNTB":"http://192.168.44.232:8080/rest/hzbg/addCBDSFJBNTB"+urlTokenParm,
			//34	按权证信息汇总表入库接口
			//http://192.168.44.232:8080/rest/hzbg/addQZXXHZB
			"addQZXXHZB":"http://192.168.44.232:8080/rest/hzbg/addQZXXHZB"+urlTokenParm,
			//35	承包地土地用途汇总表入库接口
			//http://192.168.44.232:8080/rest/hzbg/addCBTDYTHZB
			"addCBTDYTHZB":"http://192.168.44.232:8080/rest/hzbg/addCBTDYTHZB"+urlTokenParm,
			//36	承包方汇总表入库接口
			//http://192.168.44.232:8080/rest/hzbg/addCBFHZB
			"addCBFHZB":"http://192.168.44.232:8080/rest/hzbg/addCBFHZB"+urlTokenParm,
			//37	非承包地地块类别汇总表入库接口
			//http://192.168.44.232:8080/rest/hzbg/addFCBDKLBHZB
			"addFCBDKLBHZB":"http://192.168.44.232:8080/rest/hzbg/addFCBDKLBHZB"+urlTokenParm,		
			//38	新增质检审核信息表入库接口
			//http://192.168.44.232:8080/rest/hzbg/addSHZJXX
			"addSHZJXX":"http://192.168.44.232:8080/rest/hzbg/addSHZJXX"+urlTokenParm,
			//39  json数据包上传
			"uploadParJson": "http://192.168.44.232:8080/rest/hzbg/uploadParJson"+urlTokenParm,
			//40	修改质检审核信息表备注接口
			//http://192.168.44.232:8080/rest/hzbg/updateSHZJXX
			"updateSHZJXX":"http://192.168.44.232:8080/rest/hzbg/updateSHZJXX"+urlTokenParm,
			/**************/
			//41获取用户信息接口
			"getUsertUrl":"http://192.168.44.232:8080/rest/user/getUser" +urlTokenParm,
			//42新增用户时，验证用户名重复性接口
			"yzUserUrl":"http://192.168.44.232:8080/rest/user/check" +urlTokenParm,
			//43、新增用户接口
			"AddUsertUrl":"http://192.168.44.232:8080/rest/user/add" +urlTokenParm,
			//44、删除用户接口
			"deleUserUrl":"http://192.168.44.232:8080/rest/user/delete" +urlTokenParm,
			//45、修改用户接口
			"XGUserPostUrl":"http://192.168.44.232:8080/rest/user/update" +urlTokenParm,
			//46、获取日志数量接口
			"xtrzNumUrl":"http://192.168.44.232:8080/rest/xtrz/getlogCount"+urlTokenParm,
			//47、获取日志信息接口
			"xtrzDetailUrl":"http://192.168.44.232:8080/rest/xtrz/getlogInfo" +urlTokenParm,
			//48、查询汇交单位信息接口
			"hjdwDetailUrl":"http://192.168.44.232:8080/rest/hjgl/getHJDWXXByName" +urlTokenParm,
			//49、修改汇交单位信息接口
			"hjdwUpdateUrl":"http://192.168.44.232:8080/rest/hjgl/updateHJDWXX" +urlTokenParm,
			//50、查询汇交人员信息接口
			"hjryDetailUrl":"http://192.168.44.232:8080/rest/hjgl/getHJRYXX" +urlTokenParm,
			//51、修改汇交人员信息接口
			"hjryUpdateUrl":"http://192.168.44.232:8080/rest/hjgl/updateHJRYXX" +urlTokenParm
			
		};
	initHJGL();
	var aa = null;
	
	$(".navMenu li").each(function(index){
		
		$(this).on('click', function(evt){
			
			$(".navMenu li a").attr("class","navDeactive");
			$(this).children("a").attr("class","navActive");
			
			$("#paneLevel1").empty();
			
			if(parseInt(index) == 0){
				//汇交预约
				app.hjyyProgress = 1;
				initHJGL();
			}
			else if(parseInt(index) == 1){
				//汇交处理
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
						//$('body').removeClass("modal-open");
						
						
					}
				});
			}else if(parseInt(index) == 2){
				//成果管理
				$("#paneLevel1").empty();
				$.ajax({
					type:"get",
					url:"assets/hjglSeg-3.html",
					async:true,
					success:function(res){
						//console.log(res);
						$("#paneLevel1").html(res);
						$.getScript("assets/js/hjgl-3.js").then(function(){
							aa = null;
							aa = new $.manageResult();
						});
						
						
						
					}
				});
				
			}else if(parseInt(index) == 3){
				//数据分析				
				$("#paneLevel1").empty();
				$.ajax({
					type:"get",
					url:"assets/hjglSeg-4.html",
					async:true,
					success:function(res){
						//console.log(res);
						$("#paneLevel1").html(res);
						$.getScript("assets/js/hjgl-4.js").then(function(){
							aa = null;
							aa = new $.managerResult();
						});
						
						
						
					}
				});
				
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
							aa = null;
							aa = new $.xtglProcess();
						});
						
						
					}
				});
				
			}
			
		});
	})
	
	function resize(){
		
		var heightL1 = (document.body.clientHeight - 104)+"px";
		var widthL1 = (document.body.clientWidth)+"px";
				
		$("#paneLevel1").height(heightL1);
		$("#paneLevel1").width(widthL1);
		$("#paneLevel1").css({"padding":'0px', margin:'0px'});
				
	}
	
	$(window).resize(resize);
	function initHJGL(){
		resize();
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
