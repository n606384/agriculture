var app = window.app ={};
app.hjyyProgress = 1;
app.hjdwxzList=[
	{
		"bm":1003001,
		"name":"农业系统单位"
	},{
		"bm":1003002,
		"name":"开发商"
	}
]
$(function(){
	
	function resize(){
		var height = (document.body.clientHeight - 324)+"px";
		$("#container").height(height);
	}
	window.onresize = resize();
	
	var pro1 = $.ajax({
		type:"get",
		url:"assets/hjyySeg-1.html",
		async:true,
		success:function(res){
			$('#container').empty();
			$('#container').html(res);
			//$.getScript('assets/js/seg-1.js');
			$.getScript('js/subscribe427.js');
			
		}
	});
	$("#btnLeft").on('click', function(){
		if(app.hjyyProgress<2) return;
		var flag = app.hjyyProgress-=1;
		console.log("flag, app.hjyyProcess", flag, app.hjyyProgress);
		if(app.hjyyProgress < 5){
			$('#btnRight').html("下一步");
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
		}
		else if(flag == 1){
			$('#btnLeft').html("重 置");
			$.ajax({
				type:"get",
				url:"assets/hjyySeg-"+flag+".html",
				async:true
			}).then(function(res){
				$("#container").empty();
				$("#container").html(res);
			});
			
		} else {
			$.ajax({
				type:"get",
				url:"assets/hjyySeg-"+flag+".html",
				async:true
			}).then(function(res){
				$("#container").empty();
				$("#container").html(res);
			});
		}
	});
	$("#btnRight").on("click", function(){
		if(app.hjyyProgress >4) return;
		var flag = app.hjyyProgress+=1;
		console.log("flag, app.hjyyProcess",flag,app.hjyyProgress);
		
		//状态颜色改变
		$("ui.statusMenu li>div[class=statusPane]>div").attr("class","statusCircleDeactive");
		
		$("ui.statusMenu li>div[class=statusPane]>div>div").attr("class","statusCircleSMDeactive");
		
		var $liCircle = $("ul.statusMenu li:lt("+parseInt(flag)+")>div[class= statusPane]> div").attr("class","statusCircleActive");
		var $liCircle = $("ul.statusMenu li:lt("+parseInt(flag)+")>div[class= statusPane]> div>div").attr("class","statusCircleSMActive");
		
		
		
		if(parseInt(flag) == 2){
			
			//y页面填充
			$('#btnLeft').html("上一步");
			$.ajax({
				type:"get",
				url:"assets/hjyySeg-"+flag+".html",
				async:true
			}).then(function(res){
				$("#container").empty();
				$("#container").html(res);
				$.getScript("js/subscribe427.js");
			});
			
//			var $liCircle1 = $("ul.statusMenu li:eq("+parseInt(flag-1)+") div")[1];
//			var $liCircle2 = $("ul.statusMenu li:eq("+parseInt(flag-1)+") div")[2];
//			$liCircle1.attr("class","statusCircleActive");
//			$liCircle2.attr("class","statusCircleSMActive");
			
			
			
			//数据填报，验证，和数据库提交
			
		}else if(parseInt(flag) == 3){
			//页面填充
			$.ajax({
				type:"get",
				url:"assets/hjyySeg-"+flag+".html",
				async:true
			}).then(function(res){
				$("#container").empty();
				$("#container").html(res);
				
				$.getScript("assets/js/seg-3.js");
				
			});
			//页面渲染
			
			//数据填报，验证，和数据库提交
			
		}else if(parseInt(flag) == 4){
			//页面填充
			$.ajax({
				type:"get",
				url:"assets/hjyySeg-"+flag+".html",
				async:true
			}).then(function(res){
				$("#container").empty();
				$("#container").html(res);
				
			});
			//页面渲染
			
			//数据填报，验证，和数据库提交
			
		}else if(parseInt(flag) == 5){
			//页面填充
			$('#btnRight').html("完 成");
			$.ajax({
				type:"get",
				url:"assets/hjyySeg-"+flag+".html",
				async:true
			}).then(function(res){
				$("#container").empty();
				$("#container").html(res);
			});
			
			//app.hjyyProgress = 1;
			//数据填报，验证，和数据库提交
			
			return;
			
			
		} else return;
		//alert(flag);
		
		
		
	});
	
	
});

	
	