//var app = window.app ={};
//app.hjyyProgress = 1;

var app = window.app = {};
app.hjglFlag = 1;
app.hjyyProgress = 1;
app.postUrls = 
	{
		//1	用户登录验证接口
		"login":"http://192.168.44.232:8080/rest/login",
		//2	汇交预约数据提交单位查询接口
		"getHJDWRYXX":"http://192.168.44.232:8080/rest/hjyy/getHJDWRYXX",
		//3	汇交预约数据提交用户查询接口
		"getHJRYXX":"http://192.168.44.232:8080/rest/hjyy/getHJRYXX",
		//4	汇交预约数据提交用户增加接口
		"addhjyyyh":"http://192.168.44.232:8080/rest/ hjyy/addhjyyyh",
		//5	汇交预约数据包增加接口
		"addSJBXX":"http://192.168.44.232:8080/rest/hjyy/addSJBXX",
		//6	汇交预约数据文件增加接口
		"addSJWJXX":"http://192.168.44.232:8080/rest/hjyy/addSJWJXX",
		//7	汇交预约数据包状态更改接口
		"updateHJSBZT":"http://192.168.44.232:8080/rest/hjyy/updateHJSBZT",
		//8	新增系统用户接口
		"addXTUser":"http://192.168.44.232:8080/rest/user/add",
		//9	修改系统用户接口
		"updateXTUser":"http://192.168.44.232:8080/rest/user/update",
		//10	删除系统用户接口
		"deleteXTUser":"http://192.168.44.232:8080/rest/user/delete",
		//11	获取系统用户信息接口
		"getXTUser":"http://192.168.44.232:8080/rest/user/getUser",
		//12	验证系统用户名是否存在接口
		"checkXTUser":"http://192.168.44.232:8080/rest/user/check",
		//13	获取系统日志记录数量接口
		"getlogCount":"http://192.168.44.232:8080/rest/xtrz/getlogCount",
		//14	获取系统日志记录信息接口
		"getlogInfo":"http://192.168.44.232:8080/rest/xtrz/getlogInfo",
		//15	上传解析权属单位编码信息接口
		"uploadQSDWDMB":"http://192.168.44.232:8080/rest/hzbg/uploadQSDWDMB",
		//16	上传解析地块汇总表接口
		"uploadDKHZB":"http://192.168.44.232:8080/rest/hzbg/uploadDKHZB",
		//17	上传解析承包地是否基本农田接口
		"uploadCBDSFJBNT":"http://192.168.44.232:8080/rest /hzbg/uploadCBDSFJBNT",
		//18	上传解析按权证信息汇总表接口
		"uploadQZXXHZ":"http://192.168.44.232:8080/rest/hzbg/uploadQZXXHZ",
		//19	上传解析承包地土地用途汇总表接口
		"uploadCBTDYT":"http://192.168.44.232:8080/rest/hzbg/uploadCBTDYT",
		//20	上传解析按承包方汇总表接口
		"uploadCBFHZ":"http://192.168.44.232:8080/rest/hzbg/uploadCBFHZ",
		//21	上传解析按非承包地地块类别汇总表接口
		"uploadFCBDDKLB":"http://192.168.44.232:8080/rest/hzbg/uploadFCBDDKLB",
		//22	获取汇交数据包表记录数量接口
		"getSJBCount":"http://192.168.44.232:8080/rest/hjgl/getSJBCount",
		//23	获取汇交数据包简要信息接口
		"getSJBJYXX":"http://192.168.44.232:8080/rest/hjgl/getSJBJYXX",
		//24	获取汇交数据包详细信息接口
		"getSJBXXXX":"http://192.168.44.232:8080/rest/hjgl/ getSJBXXXX",
		//25	修改汇交数据文件详细信息接口
		"updateHJSJWJ":"http://192.168.44.232:8080/rest/hjgl/updateHJSJWJ",
		//26	查询汇交单位信息接口
		"getHJDW":"http://192.168.44.232:8080/rest/hjgl/getHJDW",
		//27	修改汇交单位信息接口
		"addhjyyyh":"http://192.168.44.232:8080/rest/hjyy/addhjyyyh"		
		
	};

$(function(){
	
	function resize(){
		var height = (document.body.clientHeight - 324)+"px";
		var heightL1 = (document.body.clientHeight - 104)+"px";
		var widthL1 = (document.body.clientWidth)+"px";
		
		$("#container").height(height);
		$("#container").width(widthL1);
		
		$("#paneLevel1").height(heightL1);
		$("#paneLevel1").width(widthL1);
				
	}
	resize();
	$(window).resize(resize);
	

	
	//window.onresize = resize();
	
	$('#container').empty();
	if(parseInt(app.hjglFlag) == 1){
		var i = 1;
		initContainer(i);
		function initContainer(i){
			
			if(i >5) return;
			
			$.ajax({
				type:"get",
				url:"assets/hjyySeg-"+i+".html",
				async:false
			}).then(function(res){				
				$('#container').append(res);
				$.getScript("assets/js/seg-"+parseInt(i)+".js");
				i++;
				initContainer(i);
			});
			
		}
		
		
	
	$("#btnLeft").on('click', function(){
		if(app.hjyyProgress<1) return;
		var flag = app.hjyyProgress-=1;
		
		console.log("btnLeft clicked and its flag, app.hjyyProcess", flag, app.hjyyProgress);
		if(app.hjyyProgress < 5){
			$('#btnRight').html("下一步");
		}
		
		//状态颜色改变
		$("div.statusPane>div").attr("class","statusCircleDeactive");
		$("div.statusPane>div>div").attr("class","statusCircleSMDeactive");
				
		$("ul.statusMenu li:lt("+parseInt(flag)+")>div[class= statusPane]> div").attr("class","statusCircleActive");
		$("ul.statusMenu li:lt("+parseInt(flag)+")>div[class= statusPane]> div>div").attr("class","statusCircleSMActive");
		
		//页面显示内容改变
		$("#container>div").attr('class','seg-invisible');
		if(flag == 0){
			$("#container>div:eq(0)").attr('class','seg-visible');
		}else{
			$("#container>div:eq("+parseInt(flag-1)+")").attr('class','seg-visible');
		}
		
		
		if(flag == 0){
//			$('#btnLeft').html("重 置");
			$("#hjdwxz").val("");		
			$("#hjdwmc").val("");
			$("#hjdwdz").val("");
			$("#hjrxm").val("");
			$("#lxdh").val("");
			$("#lxyx").val("");
			$("#txdz").val("");
			$("ul.statusMenu li:eq(0)>div[class= statusPane]> div").attr("class","statusCircleActive");
			$("ul.statusMenu li:eq(0)>div[class= statusPane]> div>div").attr("class","statusCircleSMActive");
		}
		else if(flag == 1){
			$('#btnLeft').html("重 置");
			$("#shengDropdownMenu").empty();
			$("#shiDropdownMenu").empty();
			$("#xianDropdownMenu").empty();
			
			
		}
	});
	$("#btnRight").on("click", function(){
		if(app.hjyyProgress >4) return;
		var flag = app.hjyyProgress+=1;
		//console.log("btnRight clicked and its flag, app.hjyyProcess",flag,app.hjyyProgress);
		
		//状态颜色改变
		$("ui.statusMenu li>div[class=statusPane]>div").attr("class","statusCircleDeactive");
		
		$("ui.statusMenu li>div[class=statusPane]>div>div").attr("class","statusCircleSMDeactive");
		
		var $liCircle = $("ul.statusMenu li:lt("+parseInt(flag)+")>div[class= statusPane]> div").attr("class","statusCircleActive");
		var $liCircle = $("ul.statusMenu li:lt("+parseInt(flag)+")>div[class= statusPane]> div>div").attr("class","statusCircleSMActive");
		//页面显示内容改变
		$("#container>div").attr('class','seg-invisible');
		$("#container>div:eq("+parseInt(flag-1)+")").attr('class','seg-visible');
//		console.log("$dd", $("#container>div"));
//		console.log("$div",$("#container>div:eq("+parseInt(flag-1)+")"));
		
		
		if(parseInt(flag) == 2){
			
			//y页面填充
			$('#btnLeft').html("上一步");
			//数据填报，验证，和数据库提交
			var a = new $.processSJB(app);
			
			
		}else if(parseInt(flag) == 3){
			
			//页面渲染			
			//数据填报，验证，和数据库提交
			var a = new $.processSJWJ(app);
			
		}else if(parseInt(flag) == 4){
			
			//页面渲染			
			//数据填报，验证，和数据库提交
			
		}else if(parseInt(flag) == 5){
			
			//页面渲染
			$('#btnRight').html("完成");
			//数据填报，验证，和数据库提交
			
			return;
			
			
		} else return;
		//alert(flag);
		
		
		
	});
	}
	
	
	
});

	
	