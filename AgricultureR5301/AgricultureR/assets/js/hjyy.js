//var app = window.app ={};
//app.hjyyProgress = 1;


$(function(){
	
	function resize(){
		var height = (document.body.clientHeight - 324)+"px";
		var heightL1 = (document.body.clientHeight - 104)+"px";
		var widthL1 = (document.body.clientWidth)+"px";
		
		$("#container").height(height);
		$("#container").width(widthL1);
		
		$("#paneLevel1").height(heightL1);
		$("#paneLevel1").width(widthL1);
				
	}
	resize();
	$(window).resize(resize);
	

	
	//window.onresize = resize();
	
	$('#container').empty();
	if(parseInt(app.hjglFlag) == 1){
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
						
			$("#hjdwxz").val("");		
			$("#hjdwmc").val("");
			$("#hjdwdz").val("");
			$("#hjrxm").val("");
			$("#lxdh").val("");
			$("#lxyx").val("");
			$("#txdz").val("");
			
						
			$("ul.statusMenu li:eq(0)>div[class= statusPane]> div").attr("class","statusCircleActive");
			$("ul.statusMenu li:eq(0)>div[class= statusPane]> div>div").attr("class","statusCircleSMActive");
			//表单验证
			$('#hjryxx').bootstrapValidator({
		        message: '该值不是有效值',
		        feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
		        fields: {
		            hjdwmc: {
		                validators: {
		                    notEmpty: {
		                        message: '汇交单位名称为必填项，不能为空！'
		                    }
		                }
		            },
		            hjdwxz: {
		                validators: {
		                    notEmpty: {
		                        message: '汇交单位性质为必填项，不能为空！'
		                    }
		                }
		            },
		            hjdwdz:{
		                validators: {
		                    notEmpty: {
		                        message: '汇交单位地址为必填项，不能为空！'
		                    }
		                }
		            },
		            hjrxm:{
		                validators: {
		                    notEmpty: {
		                        message: '汇交人员姓名为必填项，不能为空！'
		                    }
		                }
		            },
		            tel:{
		                validators: {
		            		notEmpty: {
		                        message: '联系方式为必填项，不能为空！'
		                    },
		                    numeric: {
		            			message: '请输入手机号码，不能为空！'            			
		            		}
		            	}
		            },
		            
		            email: {
		                validators: {
		                	notEmpty: {
		                        message: '联系邮箱为必填项，不能为空！'
		                   },
		                    emailAddress: {
		                        message: '该输入值不是有效的邮箱地址'
		                    }
		                }
		            }
		            
		        }
		    });
		    
	  	 $('#hjryxx').bootstrapValidator("validate");			
			
			
		}
		else if(flag == 1){
			$('#btnLeft').html("重 置");
			$("#shengDropdownMenu").empty();
			$("#shiDropdownMenu").empty();
			$("#xianDropdownMenu").empty();
			
			
		}
	});
	$("#btnRight").on("click", function(){
		if(app.hjyyProgress >5) return;
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
			var a = null;			
			a = new $.processSJB(app);
			
			
		}else if(parseInt(flag) == 3){
			
			//页面渲染			
			//数据填报，验证，和数据库提交
			var a = null;
			a = new $.processSJWJ(app);
			
		}else if(parseInt(flag) == 4){
			
			//页面渲染			
			//数据填报，验证，和数据库提交
			var a = null;
			a = new $.listData(app);
			
		}else if(parseInt(flag) == 5){
			
			//页面渲染
			$('#btnRight').html("完成");
			//数据填报，验证，和数据库提交
			var a = null;
			a = new $.chushenProcess(app);
			return;
			
			
		}
		else if(parseInt(flag) == 6){
			
			$('#dialogModalSeg_5').on('show.bs.modal', centerModals);
			$('#dialogModalSeg_5').modal({backdrop: 'static', keyboard: false, show:true});
			//return;
						
		}
		else return;
		//alert(flag);
		
		
		
	});
	}
	
	function centerModals() {
	$('.modal').each(function(i) { 
	        var $clone = $(this).clone().css('display', 'block').appendTo('body'); var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 3);   
	        top = top > 0 ? top : 0;   
	        $clone.remove();   
	        $(this).find('.modal-content').css("margin-top", top);
	    });   
	}
	
});

	
	