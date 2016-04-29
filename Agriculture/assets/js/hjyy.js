$(function(){
	
	function resize(){
		var height = (document.body.clientHeight - 214)+"px";
		$("#container").height(height);
	}
	window.onresize = resize();
	$.ajax({
		type:"get",
		url:"assets/hiyySeg.html",
		async:false,
		success:function(result){
			console.log("result", result);
			$("#container").html(result);
			$.getScript("js/subscribe427.js");
			$("#submitUser").on('click', function(){
				$('#container').empty();
				var fg = true;
				if(fg){
					fullfillContainer("assets/hjyy-2Seg.html","container");
				}
			});
		},
		error:function(error){
			console.log("error",error);
		}
	});
	
	function fullfillContainer(url,id){
		
		var url = url;
		$.ajax({
			type:"get",
			url:url,
			async:false,
			
			success:function(result){
				$("#"+id).html(result);
			},
			error:function(){
				
			}
		});
	}
});
	
	