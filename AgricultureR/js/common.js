
function submitJob(url,data){
		var _url = url;
		var _formData = data;
		var promise = $.ajax({
			type:"post",
			url:_url,
			async:true,
			data:_formData
		});
		return promise;
	}
	
	function fullfillContainer(url,id){
		
		var url = url;
		var promise = $.ajax({
			type:"get",
			url:url,
			async:true			
		});
		promise.then(function(res){
			$('#'+id).empty();
				$('#'+id).html(res);
		});
		
		return promise;
	}