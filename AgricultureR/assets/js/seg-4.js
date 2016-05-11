(function($){
	
	$.printTJZM = function(){
		init();
	}
	function init(){
		
//		printTJZMHJYY
		
		$("#printTJZMHJYY").on('click', function(){
			$("#printContentPane").jqprint();
		});
		
	}
	
})(jQuery)
