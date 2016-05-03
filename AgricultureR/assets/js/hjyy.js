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
	
	$('#container').empty();
	
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
		console.log("btnRight clicked and its flag, app.hjyyProcess",flag,app.hjyyProgress);
		
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
			
		}else if(parseInt(flag) == 3){
			
			//页面渲染
			
			//数据填报，验证，和数据库提交
			
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
	
	
});

	
	