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
		var height = (document.body.clientHeight - 214)+"px";
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
			$.getScript('js/subscribe427.js');
			
		}
	});
	
});
	
	