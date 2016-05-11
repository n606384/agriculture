$(function(){
	
	
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
