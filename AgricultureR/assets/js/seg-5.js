(function($){
	$.chushenProcess = function(){
		init();
		
	}
	function init(){
		
		$("#sjtjzmBtn").on('click', function(){
			
			$("#SJTJZM").modal('show');
		});
		$("#printBtnSJTJ").on('click', function(){
			$("#printContentPane").jqprint();
		});
		
		
	}
})(jQuery)
