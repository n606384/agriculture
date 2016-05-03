$(function(){
	
	$('#submitSJB').on('click', function(){
		
		$('#container').empty();
		$.ajax({
			type:"get",
			url:"assets/hjyySeg-3.html",
			async:true
		}).then(function(res){
			$('#container').html(res);
			$.getScript("assets/js/seg-3.js");
		});
	});
	$('#backHJYY').on('click', function(res){
		alert("退回上一步");
		$.ajax({
			type:"get",
			url:"assets/hjyySeg-2.html",
			async:true
		}).then(function(res){
//			$('#contianer').empty();
			$('#contianer').html(res);
		});
	});
	
})
