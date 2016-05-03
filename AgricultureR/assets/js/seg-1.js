$(function(){
	var shengAttr, shiAttr,xianAttr;
	$.ajax({
		type:"get",
		url:"assets/shengtable.html",
		async:true
	}).then(function(res){
		if(res){
			$("#shengDropdownMenu").html(res);
		}
	});
	$.ajax({
		type:"get",
		url:"assets/shitable.html",
		async:true
	}).then(function(res){
		if(res){
			shiAttr = res;
		}
	});
	$.ajax({
		type:"get",
		url:"assets/xiantable.html",
		async:true
	}).then(function(res){
		if(res){
			xianAttr = res;
		}
	});
	
});