(function($){
	
	var startTime=null;
	var endTime=null;
	var obj = null;	//修改用户的变量
	var obj1=null;//修改汇交单位的变量
	var obj3=null;//修改汇交人员的变量
	var flag = null;
	var totalCount = null;		//系统日志信息总条数
	var NowPage=null; //系统日志的当前页数
	
	
	
	$.xtglProcess = function(){		
		console.log("进入系统管理模块");	
		initialize();
	}
	
	function initialize(){
	
		ajaxXTYHRequest();		
		$("#addUser").on('click',addUser);
		
		$("#delUser").on('click',delUser);
		$("#updateUser").on('click',updateUser);		
		$("#YHGL-button").on('click',yhglVisibility);
		$("#XTRZ-button").on('click',xtrzVisibility);		
		$("#HJDW-button").on('click',hjdwVisibility);
		$("#HJRY-button").on('click',hjryVisibility);
		$("#XTRZ-button").on('click',xtrzNum);
		$("#TimeChaxun").on('click',GetTime);
		$("#HJDW-button").on('click',hjdwDetail);
		$('#exampleModal').on('show.bs.modal', centerModals);	
		$('#refresh_button').on('click',refreshBtn);
		$('#updateHJDW').on('click',updtHjdw);
		$('#HJRY-button').on('click',hjryDetail);
		$('#updateHJRY').on('click',updtHjry);		
		
		//$("#tijiao").on("submit",tijiaoFun);	
		
//		$("#exampleModal").draggable({
//		    handle: ".modal-header",   
//		    cursor: 'move',   
//		    refreshPositions: false  
//		}); 				
		$('#modal-delete').on('show.bs.modal', centerdeleModals);					
		$("#modal-delete").draggable({
		    handle: ".modal-header",   
		    cursor: 'move',   
		    refreshPositions: false  
		}); 
		
		$('#exampleModal').on('show.bs.modal', centerModals);					
		$("#exampleModal").draggable({
		    handle: ".modal-header",   
		    cursor: 'move',   
		    refreshPositions: false  
		}); 
		
		$('#modal-delete').on('show.bs.modal', centerdeleModals);					
		$("#modal-delete").draggable({
		    handle: ".modal-header",   
		    cursor: 'move',   
		    refreshPositions: false  
		}); 
		
		$('#UpadteHJDW').on('show.bs.modal',centerUpaHJDW);
		$("#updateHJDW").draggable({
			handle: ".modal-header",   
		    cursor: 'move',   
		    refreshPositions: false  
		})
		
		$('#UpdteHJRYmodel').on('show.bs.modal',centerUpaHJRY);
		$("#UpdteHJRYmodel").draggable({
			handle: ".modal-header",   
		    cursor: 'move',   
		    refreshPositions: false  
		})
		
		$('#date-range1').dateRangePicker(
	    {
			startOfWeek: 'monday',
	    	separator : ' ~ ',
	    	format: 'YYYY-MM-DD-HH',
	    	autoClose: false,
			time: {
				enabled: true
			}
	    });
	    
	    $('#TJ-Form').bootstrapValidator({
			message: '不合法信息',
	        feedbackIcons: {
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
        	dlm: {
                validators: {                   
                    notEmpty: {
                        message: '信息不可为空！'
                    },
                     regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message:'请填写英文字母或数字!'
                    }
                }
            },
            mm: {
                validators: {
                    notEmpty: {
                        message: '信息不可为空！'
                    },
                }
            },
            xm: {
                validators: {
                    notEmpty: {
                        message: '信息不可为空！'
                    },                 
                }
            },
            yx: {
                validators: {
                    notEmpty: {
                        message: '信息不可为空！'
                    },
                    emailAddress: {
                        message: '邮箱格式填写错误！'
                    }
                }
            },
            dh: {
                validators: {
                    notEmpty: {
                        message: '信息不可为空！'
                    },
                    digits: {
                    message:'请正确填写您的电话号码！'
                    	}
                }
            },
            bz: {
                validators: {
                    notEmpty: {
                        message: '信息不可为空！'
                    }
                }
            },
            jsbz: {
                validators: {
                    notEmpty: {
                        message: '信息不可为空！'
                    }                  
                }
            },
        }
		}).on('success.form.bv', function(e) {
            console.log('success.form.bv');
			tijiaoFun();
			return false;
           
        });
	}	

	
	
	//获取用户信息
	function ajaxXTYHRequest(){
		$.ajax({
			type:"post",
			url:app.postUrls.getUsertUrl,
			dataType:'json',
			async:true,
//			data:{
//			
//			},
			success:function(res){	
				console.log("获取用户信息的条数：",res.length);
				var tableData = [];
				for(var i=0;i<res.length;i++){		  					
					var obj2 = {};              															
	           		obj2["dh"] = res[i].dh;       		
	           		obj2["yx"] = res[i].yx;
	           		obj2["yhbm"] = res[i].yhbm;
	           		obj2["xm"] = res[i].xm;    
	           		obj2["dlm"] = res[i].dlm;	           		
	           		obj2["yhjs"] = res[i].yhjs;
	           		obj2["jsbz"] = res[i].jsbz;
	           		obj2["bz"] = res[i].bz;	           		           		          			           		
					tableData.push(obj2);	
				}		
				console.log("获取用户信息：",tableData);
				$("#yhglTable").bootstrapTable({					
					data:tableData,
					pagination:true,
					clickToSelect:true,
					singleSelect:true,
					//checkboxHeader:true,
					sidePagination:"client",
					showColumns: true,
		            search: true,
		            showRefresh: true,
					onCheck:function(tr,row){											
						  obj = new Object();												  
					 	  obj.dh = tr.dh;					 	 
					 	  obj.yx = tr.yx;
					 	  obj.yhbm = tr.yhbm;
					 	  obj.xm = tr.xm;
					 	  obj.dlm = tr.dlm;
					 	  obj.yhjs = tr.yhjs;
					 	  obj.jsbz = tr.jsbz;
					 	  obj.bz = tr.bz;
					 	  obj.mm=tr.mm;
					},
					onClickRow:function(tr,row){						
						
						$("#yhglTable").bootstrapTable("uncheckAll");
						$("#yhglTable").bootstrapTable("checkBy",{field:"yhbm",values:[tr.yhbm]});						
						  obj = new Object();												  
					 	  obj.dh = tr.dh;					 	  
					 	  obj.yx = tr.yx;
					 	  obj.yhbm = tr.yhbm;
					 	  obj.xm = tr.xm;
					 	  obj.dlm = tr.dlm;
					 	  obj.yhjs = tr.yhjs;
					 	  obj.jsbz = tr.jsbz;
					 	  obj.bz = tr.bz;
					 	  obj.mm=tr.mm;
					 	  console.log(obj);						 	   						    
					}
				});				
			},
	        error:function(err){
	        	console.log("err",err);
	        }	        
			});
		
	}
	function GetTime(){
		var Time=$("#date-range1").val();
		var TimeSplit = Time.split(" ~ ");
		console.log("判断日期：",Time);
		startTime = TimeSplit[0];
		endTime = TimeSplit[1];
		console.log("判断获取的日期：",startTime,endTime);
		xtrzNum();
	}
	
    //新增用户的flag
	function addUser(){
		
		flag = 0;	//flag = 0为新增
		$('#exampleModal').modal("show");
		
	}
	
	//更新用户
	function updateUser(){
		flag = 1;	//flag = 1为修改								
		$('#exampleModal').modal("show");
		$("#exampleModalLabel").html("修改用户");	
		$("#mmdiv").hide();
		$("#username").val(obj.dlm);
		$("#password").val(obj.mm);
		$("#xm").val(obj.xm);
		$("#yx").val(obj.yx);
		$("#dh").val(obj.dh);
		$("#bz").val(obj.bz);
		$("#Adds option:selected").val(obj.yhjs);
		$("#jsbz").val(obj.jsbz);
			
	}
	//修改汇交单位
	function updtHjdw(){
		$('#UpadteHJDW').modal("show");
		$('#hjdwbm').hide();
		$("#HJDWBM").val(obj1.hjdwbm);
		$("#HJDWDZ").val(obj1.hjdwdz);
		$("#HJDWMC").val(obj1.hjdwmc);
		$("#HJDWXZ").val(obj1.hjdwxz);		 		
		$('#HJDWtijiao').on('click',updateHJDW);
	    
	}	
	function updtHjry(){
		$('#UpdteHJRYmodel').modal("show");
		$('#hjrybmdiv').hide();
		$('#HJRYBM').val(obj3.hjrybm);
		$('#HJRXM').val(obj3.hjrxm);
		$('#LXDH').val(obj3.lxdh);
		$('#LXYX').val(obj3.lxyx);
		$('#TXDZ').val(obj3.txdz);
		$('#HJRYtijiao').on('click',updateHJRY);
	}
	
	//用户管理标的可见性
	function yhglVisibility(){		
		$("#right-yhgl-div").css("display","block");
		$("#right-xtrz-div").css("display","none");
		$("#right-hjdw-div").css("display","none");
		$("#right-hjry-div").css("display","none");
	}
	//系统日志的可见性
	function xtrzVisibility(){		
		$("#right-yhgl-div").css("display","none");
		$("#right-xtrz-div").css("display","block");
		$("#right-hjdw-div").css("display","none");
		$("#right-hjry-div").css("display","none");
			
	}
	//汇交单位的可见性
	function hjdwVisibility(){
		$("#right-hjdw-div").css("display","block");
		$("#right-yhgl-div").css("display","none");
		$("#right-xtrz-div").css("display","none");
		$("#right-hjry-div").css("display","none");
	}
	//汇交人员的可见性
	function hjryVisibility(){
		$("#right-hjry-div").css("display","block");
		$("#right-yhgl-div").css("display","none");
		$("#right-xtrz-div").css("display","none");
		$("#right-hjdw-div").css("display","none");
	}
	//系统日志的数量
	function xtrzNum(){
		//修改	  	
	  	$.ajax({
	  		type:"post",
	  		url:app.postUrls.xtrzNumUrl,
	  		dataType:"json",
	  		async:true,
	  		success:function(data){	  				  				  			
	  			totalCount=data.count;
	  			console.log("总日志个数：",totalCount);	  			
	  			$("#xtrzTable").bootstrapTable('destroy').bootstrapTable({
					ajax:ajaxRequest,
					pagination:true,					
					sidePagination:"server",
					pageSize:"20",
					pageList:"[20]",
					onPageChange:function(number, size){
						console.log("获取页数：",number,size);
					    NowPage=number;
					}				
				});
	  		},
	  		error:function(err){
	  			console.log("获取数量错误:",err);
	  		}
	  	});
	}
	
	//获取系统日志信息
	function ajaxRequest(params){		
		console.log("params",params.data);		
    	$.ajax({
			type:"post",
			url:app.postUrls.xtrzDetailUrl,				
			async:true,
			dataType: 'json',	  				
			data:{	  					
				"startTime":startTime||0,
				"endTime":endTime||0,
				"page":NowPage||1		
			},			
			success:function(mes){
				console.log("返回日志信息：",mes);
				var tableData = [];	
  				for(var i=0;i<mes.list.length;i++){ 				  					
	  				var obj = {};              		
               		obj["czsj"] = mes.list[i].czsj;
               		obj["czxw"] = mes.list[i].czxw;
               		obj["dlm"] = mes.list[i].dlm;
               		obj["xwms"] = mes.list[i].xwms;           		               		
					tableData.push(obj);
				} 				
  				console.log("获取日志信息：",tableData);
  				if(startTime&&endTime) totalCount = mes.count;
  				params.success({
		            total: parseInt(totalCount),
		            rows: tableData
            	});
           }
		});
    }
	
	//查询汇交单位信息
	function hjdwDetail(){
		$.ajax({
			type:"post",
			url:app.postUrls.hjdwDetailUrl,
			dataType:"json",
			async:true,
			data:{
				"hjdwmc":'',
		        "page":1
			},
			success:function(res){
				var tableData = [];
				for(var i=0;i<res.hjdw.length;i++){		  					
					var obj = {};              		
	           		obj["hjdwbm"] = res.hjdw[i].hjdwbm;
	           		obj["hjdwdz"] = res.hjdw[i].hjdwdz;
	           		obj["hjdwmc"] = res.hjdw[i].hjdwmc;
	           		obj["hjdwxz"] = res.hjdw[i].hjdwxz;    	           		
					tableData.push(obj);					
				}		
				console.log("汇交单位信息：",tableData);			
				$("#hjdwTable").bootstrapTable('destroy').bootstrapTable({	
					
					data:tableData,
					pagination:true,
					clickToSelect:true,
					singleSelect:true,
					search:true,
					//checkboxHeader:true,
					showRefresh: true,
					sidePagination:"client",
					onCheck:function(tr,row){												
						obj1 = new Object();												  
					 	obj1.hjdwbm = tr.hjdwbm;					 	  
					 	obj1.hjdwxz = tr.hjdwxz;
					 	obj1.hjdwmc = tr.hjdwmc;
					 	obj1.hjdwdz = tr.hjdwdz;	
					},
					onClickRow:function(tr,row){	
						console.log("#hjdwTable row clicked", tr,row);																		
						obj1 = new Object();												  
					 	obj1.hjdwbm = tr.hjdwbm;					 	  
					 	obj1.hjdwxz = tr.hjdwxz;
					 	obj1.hjdwmc = tr.hjdwmc;
					 	obj1.hjdwdz = tr.hjdwdz;					 	   						    
					}
				});
			},
			error:function(err){
				console.log("查询汇交单位错误：",err);
			}
			});
			}	
    //修改汇交单位信息
    function updateHJDW(){
		//$('#UpadteHJDW').modal("show");
		$.ajax({
			type:"post",
			url:app.postUrls.hjdwUpdateUrl,			
			async:true,
			dataType:'json',
			data:{
				"hjdwbm":$('#HJDWBM').val(),
                "hjdwxz":$('#HJDWXZ').val(),
			    "hjdwmc":$('#HJDWMC').val(),
			    "hjdwdz":$('#HJDWDZ').val()
                },
            success:function(mes){
            	console.log("修改汇交单位：",mes);
	  			if(mes.status == "success"){
	  			$('#UpadteHJDW').modal('hide');
	  			hjdwDetail();
				}
				},
			error:function(err){
				console.log("修改汇交单位：",err);
			}				           
		});
	}
	//提交框的function
		function tijiaoFun(){		
		
		//$('#TJ-Form').bootstrapValidator("validate");
		//增加用户时，点击提交按钮时对用户所填信息的判断			
	  	 var usernameValue = $("#username").val();              
	     var passwordValue = $("#password").val();              
	      var xmValue=$("#xm").val();              
	      var yxValue=$("#yx").val();              
	      var dhValue=$("#dh").val();              
	      var bzValue=$("#bz").val();    	              
	      var yhjs=$('#Adds option:selected').val();
	      //console.log("yhjsValue:",yhjsValue);
	      var yhjsValue;
	      if(yhjs=="系统管理员"){
	      	 yhjsValue="1002001";
	      }
	      else if(yhjs=="系统用户"){
	      	 yhjsValue="1002002";
	      }         
          console.log("用户角色",yhjsValue);
	      var jsbzValue=$("#jsbz").val();	      
	     // 信息填写的判断
	    
//	      if(!usernameValue||!bzValue||!jsbzValue||!dhValue||!yxValue||!xmValue){
//	      	alert("请填写完整信息");     
//	      	return;	      
//	      } 
	      
  
	     if(flag == 0){
	  	 //新增
	  	 //增加用户时，点击提交按钮，验证用户名的重复性  
	  	 	//alert("ddd");
		    $.ajax({
		  	type:"post",
		  	url:app.postUrls.yzUserUrl,
		  	async:false,
		  	dataType:'json',
		  	data:{
		  		"dlm":usernameValue
		  	},
	  		success:function(msg){	
	  		console.log("msg",msg);             	  
	  		var dmlsta=msg.status;
	   		if(dmlsta =="exist"){
	  	  	 alert("该用户名已存在");
	  	}	   
	  //当用户名不存在时，添加用户信息
	  		else if(dmlsta =="nonexistent"){
	  		
			  $.ajax({
			  type:"post",
			  url:app.postUrls.AddUsertUrl,
			  async:false,
			  data:{
		      "dlm":usernameValue,
	    	  "mm":passwordValue,
			  "xm" : xmValue||"a",
	    	  "yx" : yxValue||"a",
			  "dh" : dhValue||"a",
			  "bz" : bzValue||"a",
			  "yhjs" : yhjsValue,
			  "jsbz" : jsbzValue||"a"
					},
			success:function(res){				
				console.log("添加用户",res);	
				
				$("#yhglTable").bootstrapTable('refresh', {		           
		            url:app.postUrls.getUsertUrl
		        });	
				$('#exampleModal').modal('hide');
				//fullfillTable();
				return false;
			},           	
			error:function(err){
				console.log(err);
				}
			});              			
		}
	  },
	  erro:function(err){
	  	console.log("err",err);
	  }
	  })
	 }
	  else if(flag == 1){
	  	//修改
	  	$.ajax({
	  		type:"post",
	  		url:app.postUrls.XGUserPostUrl,
	  		async:false,
	  		dataType:'json',
	  		data:{
	  			"yhbm":obj.yhbm,
	  			"dlm": usernameValue,
				"mm" : obj.mm,
				"xm" : xmValue||"a",
				"yx" : yxValue||"a",
				"dh" : dhValue||"a",
				"bz" : bzValue||"a",
				"yhjs" : yhjsValue||obj.yhjs,
				"jsbz" : jsbzValue||"a"
	  		},
	  		success:function(data){
	  			console.log("修改用户：",data);
	  			if(data.status == "success"){
	  			$("#yhglTable").bootstrapTable('refresh', {		           
		            url:app.postUrls.getUsertUrl
		        });	
	  			$('#exampleModal').modal('hide');			
	  			}else{
	  			alert("信息修改错误");
	  			}
	  			return false;
	  		},
	  		error:function(err){
			console.log("err",err);
		}
	  	});
	  }        
	  return false;
	}	

	//删除用户操作
	function delUser(){
		var IFyhbm=obj.yhbm;
		console.log("用户编码：",IFyhbm);					
		if (parseInt(IFyhbm)<=10001)
		{					
			$('#modal-delete').modal("show");
			//$('#modal-delete').html("提示");
			$('#gridSystemModalLabel').html("提示");
			$('#InfoLabel').html("该条记录不可删除");						
		}
		else if(parseInt(IFyhbm)>10001){
			$('#modal-delete').modal("show");
//			$('#modal-delete').html("提示");
			$("#queding").on('click',function(){					
			//console.log("可以删除")			
            $.ajax({
            	type:"post",
            	url:app.postUrls.deleUserUrl,
            	async:true,
            	dataType:'json',
              	data:{
              		"yhbm":obj.yhbm
              	},
              	success:function(TrData){
          			console.log("删除信息：",TrData);
          			if(TrData.status == "success"){
          			$("#yhglTable").bootstrapTable('refresh', {		           
		            url:app.postUrls.getUsertUrl
		        });	
		             
          			$('#modal-delete').modal('hide');
            		//fullfillTable();	
              			}else{
              			alert("删除错误");
              			}             			
              		},
              		error:function(err){
            		console.log("err",err);
            	}
       		 });                						
		});	
			}
	}
	
	//查询汇交人员信息接口
	function hjryDetail(){
		$.ajax({
			type:"post",
			url:app.postUrls.hjryDetailUrl,
			dataType:'json',
			async:true,
			data:{
				"hjrxm":'',
				page:1
			},			
			success:function(del){
				console.log("获取汇交人员的del：",del);
			var tableData = [];
				for(var i=0;i<del.hjry.length;i++){		  					
					var obj = {};              		
	           		obj["hjrxm"] = del.hjry[i].hjrxm;
	           		obj["hjrybm"] = del.hjry[i].hjrybm;
	           		obj["hjrydwmc"] = del.hjry[i].hjrydwmc;
	           		obj["lxdh"] = del.hjry[i].lxdh;  
	           		obj["lxyx"] = del.hjry[i].lxyx; 
	           		obj["txdz"] = del.hjry[i].txdz; 
					tableData.push(obj);					
				}		
				console.log("汇交人员信息：",tableData);			
				$("#hjryTable").bootstrapTable('destroy').bootstrapTable({					
					data:tableData,
					pagination:true,
					clickToSelect:true,
					singleSelect:true,
					//checkboxHeader:true,
					search:true,
					showRefresh: true,
					sidePagination:"client",
					onCheck:function(tr,row){												
						obj3 = new Object();												  
					 	obj3.hjrxm = tr.hjrxm;					 	  
					 	obj3.hjrybm = tr.hjrybm;
					 	obj3.hjrydwmc = tr.hjrydwmc;
					 	obj3.lxdh = tr.lxdh;	
					 	obj3.lxyx = tr.lxyx;
					 	obj3.txdz = tr.txdz;
					},
					onClickRow:function(tr,row){						
						console.log("#hjryTable row clicked", tr,row);
						$("#hjryTable").bootstrapTable("uncheckAll");
						$("#hjryTable").bootstrapTable("checkBy",{field:"hjrybm",values:[tr.hjrybm]});
						obj3 = new Object();												  
					 	obj3.hjrxm = tr.hjrxm;					 	  
					 	obj3.hjrybm = tr.hjrybm;
					 	obj3.hjrydwmc = tr.hjrydwmc;
					 	obj3.lxdh = tr.lxdh;	
					 	obj3.lxyx = tr.lxyx;
					 	obj3.txdz = tr.txdz;
					 	console.log(obj3);
					}
				});	
			},
			error:function(err){
				console.log("获取汇交人员信息错误：",err);
			}
		});
	}
	//修改汇交人员信息
	function updateHJRY(){
		$.ajax({
			type:"post",
			url:app.postUrls.hjryUpdateUrl,
			dataType:'json',
			async:true,
			data:{
				'hjrybm':$("#HJRYBM").val(),
		        'hjrxm':$("#HJRXM").val(),
		       	'lxdh':$("#LXDH").val(),
		        'lxyx':$("#LXYX").val(),
		        'txdz':$("#TXDZ").val()
			},
			success:function(mes){
			    console.log("修改汇交人员：",mes);
	  			if(mes.status == "success"){	  			
	  			$('#UpdteHJRYmodel').modal('hide');
	  			hjryDetail();
				}	
			},
			error:function(err){
				console.log("修改汇交人员错误：",err);
			}
		});
	}
	           
	//增加用户，提交
	function centerModals(){
		$('#exampleModal').each(function(i) { 
	        var $clone = $(this).clone().css('display', 'block').appendTo('body'); var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);   
	        top = top > 0 ? top : 0;   
	        $clone.remove();   
	        $(this).find('.modal-content').css("margin-top", top);
	    }); 
	}
	
	function centerdeleModals(){
		$('#modal-delete').each(function(i) { 
	        var $clone = $(this).clone().css('display', 'block').appendTo('body'); var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);   
	        top = top > 0 ? top : 0;   
	        $clone.remove();   
	        $(this).find('.modal-content').css("margin-top", top);
	    });
		
	}
	function centerUpaHJDW(){
		$('#UpadteHJDW').each(function(i){
			var $clone = $(this).clone().css('display', 'block').appendTo('body'); var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);   
	        top = top > 0 ? top : 0;   
	        $clone.remove();   
	        $(this).find('.modal-content').css("margin-top", top);
		})
	}
	
	function centerUpaHJRY(){
		$('#UpdteHJRYmodel').each(function(i){
			var $clone = $(this).clone().css('display', 'block').appendTo('body'); var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);   
	        top = top > 0 ? top : 0;   
	        $clone.remove();   
	        $(this).find('.modal-content').css("margin-top", top);
		})
	}
	function refreshBtn(){
		$("#yhglTable").bootstrapTable('refreshOptions', {
            showColumns: true,
            search: true,
            showRefresh: true,
            url:app.postUrls.getUsertUrl
        });
	}
	
	
	
	
	
})(jQuery)
