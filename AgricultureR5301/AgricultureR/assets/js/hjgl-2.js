 
(function($){
	
	var $table = $('#hjcl_table');
 	var $ok = $("#ok");
 	var totalCount = 0;
	var hjdwFormData={};
	var hjryFormData = {};
	var sjbFormData = {};
	var hjwjFormData = [];
	var sjbBM;
	var dicAttr = [];
	var xlsTable = [];
	var xlsFilePathTable = [];
	
	var zhijianFormData;
	var xxbmFlag;
	///var NowPage=1; //系统日志的当前页数
	
	$.hjclProcess = function(){	
		
		initPage();				
		initRukuClicks();

	}
	function initPage(){
		yanzheng();		
		//getTotalCount();
		getSJBS();
		getZhijianDic();
		
		$(".modal").draggable({
		    handle: ".modal-header",   
		    cursor: 'move',   
		    refreshPositions: false  
		}); 
		
		
		$("#updateSJB_zhijian").on('click', updateZhijianItem);
		$("#saveSJB_zhijian").on('click', addZhijianItem);
		$("#xlsSaveBtn").on('click', xlsSaveItems);
	}
		//验证修改界面中联系邮箱的格式正确性		
		function yanzheng(){
			$('#hjryxx_hjcl').bootstrapValidator({
			message: '不合法信息',
	        feedbackIcons: {
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
		},
		 fields:{
        	yx: {
                validators: {
                    notEmpty: {
                        message: '信息不可为空！'
                    },
                    emailAddress: {
                        message: '邮箱格式填写错误！'
                    }
                }
            }
           }
	        }).on('success.form.bv', function(e) {
            console.log('success.form.bv');
			tijiaoFun();
			return false;
			});
		}
		
	//修改质检审核状态和意见
	function updateZhijianItem(){
		$("input[name=zhijianRes]").removeAttr("disabled");
		$("#zjbz_zhijian").removeAttr("disabled");
	}
	//汇总表格入库
	function xlsSaveItems(){
		var count = 0;
		console.log("汇总表格入库",xlsFilePathTable);
		var xlsDefers_qsdwbmb, 
			xlsDefers_dkhzb, 
			xlsDefers_cbdsfjbnt, 
			xlsDefers_qzxxhz, 
			xlsDefers_cbtdyt,
			xlsDefers_cbfhz, 
			xlsDefers_fcbddklbhz;
		if(xlsFilePathTable.length > 0){
			for(var i = 0; i<xlsFilePathTable.length;i++){
				switch(xlsFilePathTable[i].bglb){					
					case 'qsdwbmb':
						
						xlsDefers_qsdwbmb = $.ajax({
							type:"post",
							url:app.postUrls.addQSDWDMB,
							async:true,
							dataType:"json",
							data:{
								"qsdwdmb":xlsFilePathTable[i].filename
							}
						});
						break;
					case 'dkhzb':
						xlsDefers_dkhzb = $.ajax({
							type:"post",
							url:app.postUrls.addDKHZB,
							async:true,
							dataType:"json",
							data:{
								"dkhzb":xlsFilePathTable[i].filename
							}
						});
						break;
					case 'cbdsfjbnt':
						xlsDefers_cbdsfjbntb = $.ajax({
							type:"post",
							url:app.postUrls.addCBDSFJBNTB,
							async:true,
							dataType:"json",
							data:{
								"cbdsfjbntb":xlsFilePathTable[i].filename
							}
						});
						break;					
					case 'qzxxhz':
						xlsDefers_qzxxhzb = $.ajax({
							type:"post",
							url:app.postUrls.addQZXXHZB,
							async:true,
							dataType:"json",
							data:{
								"qzxxhzb":xlsFilePathTable[i].filename
							}
						});
						break;
					case 'cbtdyt':
						xlsDefers_cbtdythzb = $.ajax({
							type:"post",
							url:app.postUrls.addCBTDYTHZB,
							async:true,
							dataType:"json",
							data:{
								"cbtdythzb":xlsFilePathTable[i].filename
							}
						});
						break;
					case 'cbfhz':
						xlsDefers_cbfhzb = $.ajax({
							type:"post",
							url:app.postUrls.addCBFHZB,
							async:true,
							dataType:"json",
							data:{
								"cbfhzb":xlsFilePathTable[i].filename
							}
						});
						break;
					case 'fcbddklbhz':
						xlsDefers_fcbdklbhzb = $.ajax({
							type:"post",
							url:app.postUrls.addFCBDKLBHZB,
							async:true,
							dataType:"json",
							data:{
								"fcbdklbhzb":xlsFilePathTable[i].filename
							}
						});
						break;
					
				}
				
				
				
			}
			
			var title="汇总表格正在入库";
			var content="<img src='img/loading-blue-large.gif' />";
						
			$("#modalTitleHJCL").html(title);
			$("#modalContentHJCL").html(content);
			$("#modalFooterHJCL").css("display", "none");
			$('#dialogModalHJCL').modal({backdrop: 'static', keyboard: false,show:true});
			//$("#dialogModalHJCL").modal('show');
			
			$.when(xlsDefers_qsdwbmb,
				xlsDefers_dkhzb, 
				xlsDefers_cbdsfjbnt, 
				xlsDefers_qzxxhz, 
				xlsDefers_cbtdyt,
				xlsDefers_cbfhz,
				xlsDefers_fcbddklbhz
			).then(
				function(res1,res2,res3,res4,res5,res6,res7){
					
					$.ajax({
						type:"post",
						url:app.postUrls.updateHJSBZT,
						async:true,
						dataType:"json",
						data:{
							"sjbbm":sjbBM,
							"sjbzt":"1008006 "
						},
						success:function(res){
							if(res.status == 'success'){
								getSJBS();
								$("#modalContentHJCL").html("<p>汇总表格入库成功！<hr>数据完成汇交！</p>");
								var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
								
								$("#modalFooterHJCL").css("display", "block");
							}else{
								$("#modalContentHJCL").html("<p>汇总表格入库成功！<hr>数据完成汇交！</p>");
								var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
								
								$("#modalFooterHJCL").css("display", "block");
								
								
							}
						},
						error:function(err){
							var title="系统提示";
							var content="汇总表格入库成功,数据包状态更新失败！";
							var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
							
							$("#modalTitleHJCL").html(title);
							$("#modalContentHJCL").html(content);
							$("#modalFooterHJCL").html(footer);
							
							$("#dialogModalHJCL").modal({backdrop:'static',keyboard:false,show:true});
						}
					});
					
					
				},function(){
					var title="系统提示";
					var content="汇总表格入库失败！";
					var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
					
					$("#modalTitleHJCL").html(title);
					$("#modalContentHJCL").html(content);
					$("#modalFooterHJCL").html(footer);
					
					$("#dialogModalHJCL").modal({backdrop:'static',keyboard:false,show:true});
				}
			);
			
		}
		return false;
	}
	//增加数据包质检记录
	function addZhijianItem(){
		if(!zhijianFormData) {
			var title="数据包质检信息保存";
			var content="数据包质检信息项缺失，请导入质检信息！";
			var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
			
			$("#modalTitleHJCL").html(title);
			$("#modalContentHJCL").html(content);
			$("#modalFooterHJCL").html(footer);
			
			$("#dialogModalHJCL").modal({backdrop:'static',keyboard:false,show:true});
			return;
		} else{
			
			zhijianFormData.sjbbm = sjbBM;
			var zhijianFlag = $('input[name="zhijianRes"]:checked').val();
			var sjbztFD = "";
			if(parseInt(zhijianFlag) == 0){
				sjbztFD = "1008003";
								
			}else if(parseInt(zhijianFlag) == 1){
				sjbztFD = "1008004";
			}
			var bz = $("#zjbz_zhijian").val()||"";
			zhijianFormData.zjbz = bz;	
			
			if(xxbmFlag){
				
				$.ajax({
					type:"post",
					url:app.postUrls.updateSHZJXX,
					async:true,
					dataType:"json",
					data:{
						"xxbm":xxbmFlag,
						"zjbz":bz
					},
					success:function(res){
						console.log("数据包质检意见修改成功",res);	
						if(res.status == 'success'){
							$.ajax({
								type:"post",
								url:app.postUrls.updateHJSBZT,
								async:true,
								dataType:"json",
								data:{
									"sjbbm":sjbBM,
									"sjbzt":sjbztFD
								},
								success:function(res){
									if(res.status == "success"){																	
										
										$("input[name=zhijianRes]").attr("disabled","disabled");
										$("#zjbz_zhijian").attr("disabled","disabled");										
										
										
										
										var title="系统提示";
										var content="数据包质检信息修改成功,数据包状态已更新！";
										var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
										$("#modalTitleHJCL").html(title);
										$("#modalContentHJCL").html(content);
										$("#modalFooterHJCL").html(footer);
										
										$("#dialogModalHJCL").modal({backdrop:'static',keyboard:false,show:true}); 
										
										getSJBS();
										
									}
									
								},
								error:function(err){
									var title="系统提示";
									var content="数据包质检信息修改成功,数据包状态更新失败！";
									var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
									
									$("#modalTitleHJCL").html(title);
									$("#modalContentHJCL").html(content);
									$("#modalFooterHJCL").html(footer);
									
									$("#dialogModalHJCL").modal({backdrop:'static',keyboard:false,show:true});
								}
							});
						}
					},
					error:function(err){
						console.log("数据包质检信息修改失败", err);
						var title="系统提示";
						var content="数据包质检信息修改失败,数据包状态未更新！";
						var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
						
						$("#modalTitleHJCL").html(title);
						$("#modalContentHJCL").html(content);
						$("#modalFooterHJCL").html(footer);
						
						$("#dialogModalHJCL").modal({backdrop:'static',keyboard:false,show:true});
					}
				});
				
			}else{
				$.ajax({
				type:"post",
				url:app.postUrls.addSHZJXX,
				async:true,
				dataType:"json",
				data:zhijianFormData,
				success:function(res){
					console.log("数据包质检信息添加成功",res);	
					if(res.status == "success") xxbmFlag = res.xxbm;
					$.ajax({
						type:"post",
						url:app.postUrls.updateHJSBZT,
						async:true,
						dataType:"json",
						data:{
							"sjbbm":sjbBM,
							"sjbzt":sjbztFD
						},
						success:function(res){
							console.log("修改数据包状态成功",res);
							
							$("input[name=zhijianRes]").attr("disabled","disabled");
							$("#zjbz_zhijian").attr("disabled","disabled");
							
							var title="系统提示";
							var content="数据包质检信息添加成功,数据包状态已更新！";
							var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
							$("#modalTitleHJCL").html(title);
							$("#modalContentHJCL").html(content);
							$("#modalFooterHJCL").html(footer);
							
							$("#dialogModalHJCL").modal({backdrop:'static',keyboard:false,show:true}); 
							
							
						},
						error:function(err){
							console.log("修改数据包状态出错",err);
							var title="系统提示";
							var content="数据包质检信息添加成功,数据包状态更新失败！";
							var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
							
							$("#modalTitleHJCL").html(title);
							$("#modalContentHJCL").html(content);
							$("#modalFooterHJCL").html(footer);
							
							$("#dialogModalHJCL").modal({backdrop:'static',keyboard:false,show:true});
						}
					});
					
				},
				error:function(err){
					console.log("数据包质检信息添加失败",err);
					var title="系统提示";
					var content="数据包质检信息保存失败,数据包状态未更新！";
					var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
					
					$("#modalTitleHJCL").html(title);
					$("#modalContentHJCL").html(content);
					$("#modalFooterHJCL").html(footer);
					
					$("#dialogModalHJCL").modal({backdrop:'static',keyboard:false,show:true});
				}
			});
				
				
			}
			
								
			
			
			
		}
		return false;
	}
	//获取质检信息字典表
	function getZhijianDic(){
		
		$.ajax({
			type:"get",
			url:"json/zhijian_dic.json",
			async:true
		}).then(function(res){
			
			if(res.length > 0){
				dicAttr = res;
				console.log("质检信息字典表", dicAttr);
			}
			
		});
	}
	
	//获取数据包简要信息总条数
	function getTotalCount(){
		$.ajax({
			type: 'POST',
			url: app.postUrls.getSJBCount,
            data: {},
            dataType: 'json',
            success:function(success){
            	totalCount = success.count;          	
            	 $table.bootstrapTable({
				 	toolbar:"#toolbar",
				 	showColumns:true,
				 	showRefresh:true,
				 	showToggle:true,
				 	
				 	ajax:getSJBXX,
				 	pageSize:"10",
				 	pageList:"[10]",
				 	pagination:true,
				 	showPaginationSwitch:false,
				 	sidePagination:"server",
				 	sortable:true,
				 	rowStyle:setRowStyle,
				 	detailView:true,
				 	search:true,
				 	detailFormatter:detailFormatter
	
				 });
            }
		});		
	}
	function setRowStyle(value, row){
		//console.log("value, row, index", value, row);
		var zt = value.sjbzt.trim();
		switch(zt){			
			case "数据退回": 
				return {classes:'danger'};
				break;
//			case "初审未通过": 
//				return {css:{"background-color":"#FCF8E3"}};
//				break;
//			case "质检未通过": 
//				return {css:{"background-color":"#FCF8E3"}};
//				break;
			case "数据已汇交": 
				return {classes:'success'};
				break;
			default:
				return {classes:''};
				
		}
		
	}
	
	function detailFormatter(index,row){
		console.log("index,row",index,row);
		var html = [];
		
		var sjbbm = row['sjbbm'];
		var res = getSJBXXXX(sjbbm);
		console.log("res",res);
		var hjry = res.xxxx.hjry;
		var hjdw = res.xxxx.hjdw;
		var sjb = res.xxxx.sjb;
		var sjwj = res.xxxx.hjsjwj;
		
		
		var hjryStr = "<dl class='dl-horizontal' style=\"float:left;\"><dt>提交用户</dt><dd>"+hjry.hjrxm+"</dd><dt>联系电话</dt><dd>"+hjry.lxdh+"</dd><dt>联系邮箱</dt><dd >"+hjry.lxyx+"</dd><dt>通信地址</dt><dd>"+hjry.txdz+"</dd><dt>汇交单位</dt><dd>"+hjdw.hjdwmc+"</dd><dt>单位地址</dt><dd>"+hjdw.hjdwdz+"</dd></dl>";
		
		var sjbStr = "<dl class='dl-horizontal' style=\"float:left;\"><dt>数据包名称</dt><dd>"+sjb.sjbmc+"</dd><dt>数据包类型</dt><dd>"+getSJBLX(sjb.sjblx)+"</dd><dt>数据载体</dt><dd>"+getSJBJZ(sjb.hjsjbjz)+"</dd><dt>数据包大小</dt><dd>"+sjb.sjbdx+"KB</dd><dt>文件总数</dt><dd>"+sjb.wjzs+"</dd><dt>存储位置</dt><dd>"+sjb.ccwz+"</dd><dt>数据包审核备注</dt><dd>"+sjb.sjbms+"</dd></dl>";
		
		var sjwjStr = "<dl class='dl-horizontal' style=\"float:left;\">";

		if(sjwj.length > 0){
			
			for(var i = 0; i<7;i++){
				var ji = 1009001;
				var wjbm = ji + i;
				
				(function(){
					var temp = wjbm;
					for(var j = 0;j < sjwj.length;j++){					
						if(parseInt(sjwj[j].wjlb) == parseFloat(temp)){
								
							sjwjStr+="<dt>"+getWJLX(sjwj[j].wjlb)+"</dt><dd>文件数量："+sjwj[j].wjsl+"个;\t文件大小:"+sjwj[j].wjdx+"个;\t描述："+sjwj[j].wjms+";</dd>";
						}
					}
					
				})();
							
				
			}									
			sjwjStr += "</dl>";
			
		}
	
				
		return hjryStr+sjbStr+sjwjStr;
		
	}
	function getsjwjItem(bm,attr){
		if(attr.length > 0){
			for(var i=0;i<attr.length;i++){
				if(parseInt(attr[i].wjlb) == bm){
					return attr[i];
				}else{
					return {
						"wjdx":0,
						"wjsl":0,
						"wjms":0
					};
				}
			}
		}else{
			return {
				"wjdx":0,
				"wjsl":0,
				"wjms":0
			};
		}
	}
	
	function getHJDWXZ(bm){
		switch(parseInt(bm)){
   			case 1003001: return state="农业系统单位";break;
   			case 1003002: return state="开发商";break;
   			  			
   		}
	}
	function getSJBLX(bm){
		switch(parseInt(bm)){
   			case 1007001: return state="压缩文件";break;
   			case 1007002: return state="文件夹";break;
   			case 1007003: return state="镜像文件";break;
   			
   		}
	}
	function getSJBZT(bm){
		switch(parseInt(bm)){
   			case 1008001: return state="初审未通过";break;
   			case 1008002: return state="待质检";break;
   			case 1008003: return state="质检通过";break;
   			case 1008004: return state="质检未通过";break;
   			case 1008005: return state="数据退回";break;
   			case 1008006: return state="数据已汇交";break;
   		}
	}
	function getSJBJZ(bm){
		switch(parseInt(bm)){
   			case 1006001: return state="光盘";break;
   			case 1006002: return state="移动硬盘";break;
   			case 1006003: return state="U盘";break;   			
   		}
	}
	function getWJLX(bm){		
		switch(parseInt(bm)){
   			case 1009001: return state="矢量数据";break;
   			case 1009002: return state="栅格数据";break;
   			case 1009003: return state="汇总表格";break;  
   			case 1009004: return state="图件数据";break;
   			case 1009005: return state="权属数据";break;
   			case 1009006: return state="文字报告";break; 
   			case 1009007: return state="其他资料";break;
   		}
	}
	
	
	function getSJBXXXX(bm){
		var content = {};
		$.ajax({
			type:"post",
			url:app.postUrls.getSJBXXXX,
			async:false,
			dataType:'json',
			data:{
				"sjbbm":bm
			},
			success:function(res){
				console.log("获取数据包详细信息",res);
				
				content = res;
			}
		});
		return content;
		
	}
	function initRukuClicks(){
		//权属单位代码表
		$("#qsdwbmbInputFile").on('click', function(){
			$("#qsdwbmbInputFile").fileupload({
        						url:app.postUrls.uploadQSDWDMB,            						 
        						dataType:'json'
        	}).bind('fileuploaddone', function(e, data){
        		           		
        		var res = data.result;
        		if(res.status == 'success'){
        			$("#qsdwbmbLink").css('display','inline-block');
        			console.log("权属单位代码表上传成功", data.result);
        			xlsTable.push({
        				"bglb":"qsdwbmb",
        				"data":res.file.value}
        			);
        			xlsFilePathTable.push({
        				"bglb":"qsdwbmb",
        				"filename":res.file.name
        			});
        		} else{
        			var title="汇总表格上传提示";
					var content="请选择《权属单位代码表》，并确保格式正确！";
					var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
					
					$("#modalTitleHJCL").html(title);
					$("#modalContentHJCL").html(content);
					$("#modalFooterHJCL").html(footer);
					
					$("#dialogModalHJCL").modal('show');
        		}
        		
        	});
			
		});
		//按地块汇总表
		$("#dkhzbInputFile").on('click', function(){
			$("#dkhzbInputFile").fileupload({
        						url:app.postUrls.uploadDKHZB,            						 
        						dataType:'json'
        	}).bind('fileuploaddone', function(e, data){
        		            		
        		var res = data.result;
        		if(res.status == 'success'){
        			console.log("地块汇总表上传成功", data.result);
        			$("#dkhzbLink").css('display','inline-block');
        			xlsTable.push({"bglb":"dkhzb","data":res.file.value});
        			xlsFilePathTable.push({"bglb":"dkhzb","filename":res.file.name});
        		}else{
        			var title="汇总表格上传提示";
					var content="请选择《按地块汇总表》，并确保格式正确！";
					var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
					
					$("#modalTitleHJCL").html(title);
					$("#modalContentHJCL").html(content);
					$("#modalFooterHJCL").html(footer);
					
					$("#dialogModalHJCL").modal('show');
        		}
        	});
			
		});
		//按承包地是否基本农田汇总表					
		$("#cbdsfjbntInputFile").unbind('click').on('click', function(){
			
			$("#cbdsfjbntInputFile").fileupload({
        						url:app.postUrls.uploadCBDSFJBNT,          						 
        						dataType:'json'
        	}).bind('fileuploaddone', function(e, data){
        		
        		console.log("按承包地是否基本农田汇总表", data.result);
        		var res = data.result;
        		if(res.status == 'success'){
        			$("#cbdsfjbntLink").css('display','inline-block');
        			xlsTable.push({"bglb":"cbdsfjbnt","data":res.file.value});
        			xlsFilePathTable.push({"bglb":"cbdsfjbnt","filename":res.file.name});
        		}else{
        			var title="汇总表格上传提示";
					var content="请选择《按承包地是否基本农田汇总表》，并确保格式正确！";
					var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
					
					$("#modalTitleHJCL").html(title);
					$("#modalContentHJCL").html(content);
					$("#modalFooterHJCL").html(footer);
					
					$("#dialogModalHJCL").modal('show');
        		}
        	});
			
		});
		//按权证信息汇总表
		$("#qzxxhzInputFile").on('click', function(){
			$("#qzxxhzInputFile").fileupload({
        						url:app.postUrls.uploadQZXXHZ,            						 
        						dataType:'json'
        	}).bind('fileuploaddone', function(e, data){
        		
        		console.log("按权证信息汇总表", data.result);
        		var res = data.result;
        		if(res.status == 'success'){
        			$("#qzxxhzLink").css('display','inline-block');
        			xlsTable.push({"bglb":"qzxxhz","data":res.file.value});
        			xlsFilePathTable.push({"bglb":"qzxxhz","filename":res.file.name});
        		}else{
        			var title="汇总表格上传提示";
					var content="请选择《按权证信息汇总表》，并确保格式正确！";
					var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
					
					$("#modalTitleHJCL").html(title);
					$("#modalContentHJCL").html(content);
					$("#modalFooterHJCL").html(footer);
					
					$("#dialogModalHJCL").modal('show');
        		}
        	});
			
		});
		
		//按承包地土地用途汇总表
		$("#cbtdytInputFile").on('click', function(){
			$("#cbtdytInputFile").fileupload({
        						url:app.postUrls.uploadCBTDYT,            						 
        						dataType:'json'
        	}).bind('fileuploaddone', function(e, data){
        		
        		console.log("按承包地土地用途汇总表", data.result);
        		var res = data.result;
        		if(res.status == 'success'){
        			$("#cbtdytLink").css('display','inline-block');
        			xlsTable.push({"bglb":"cbtdyt","data":res.file.value});
        			xlsFilePathTable.push({"bglb":"cbtdyt","filename":res.file.name});
        		}else{
        			var title="汇总表格上传提示";
					var content="请选择《按承包地土地用途汇总表》，并确保格式正确！";
					var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
					
					$("#modalTitleHJCL").html(title);
					$("#modalContentHJCL").html(content);
					$("#modalFooterHJCL").html(footer);
					
					$("#dialogModalHJCL").modal('show');
        		}
        	});
			
		});
		
		//按承包方汇总表
		$("#cbfhzInputFile").on('click', function(){
			$("#cbfhzInputFile").fileupload({
        						url:app.postUrls.uploadCBFHZ,            						 
        						dataType:'json'
        	}).bind('fileuploaddone', function(e, data){
        		
        		console.log("按承包方汇总表", data.result);
        		var res = data.result;
        		if(res.status == 'success'){
        			$("#cbfhzLink").css('display','inline-block');
        			xlsTable.push({"bglb":"cbfhz","data":res.file.value});
        			xlsFilePathTable.push({"bglb":"cbfhz","filename":res.file.name});
        		}else{
        			var title="汇总表格上传提示";
					var content="请选择《按承包方汇总表》，并确保格式正确！";
					var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
					
					$("#modalTitleHJCL").html(title);
					$("#modalContentHJCL").html(content);
					$("#modalFooterHJCL").html(footer);
					
					$("#dialogModalHJCL").modal('show');
        		}
        	});
			
		});
		
		//按非承包地地块类别汇总表
		$("#fcbddklbhzInputFile").on('click', function(){
			$("#fcbddklbhzInputFile").fileupload({
        						url:app.postUrls.uploadFCBDDKLB,            						 
        						dataType:'json'
        	}).bind('fileuploaddone', function(e, data){
        		
        		console.log("按非承包地地块类别汇总表", data.result);
        		var res = data.result;
        		if(res.status == 'success'){
        			$("#fcbddklbhzLink").css('display','inline-block');
        			xlsTable.push({"bglb":"fcbddklbhz","data":res.file.value});
        			xlsFilePathTable.push({"bglb":"fcbddklbhz","filename":res.file.name});
        		}else{
        			var title="汇总表格上传提示";
					var content="请选择《按非承包地地块类别汇总表》，并确保格式正确！";
					var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
					
					$("#modalTitleHJCL").html(title);
					$("#modalContentHJCL").html(content);
					$("#modalFooterHJCL").html(footer);
					
					$("#dialogModalHJCL").modal('show');
        		}
        	});
			
		});
		
		
		$(".tableDetailLink").on("click", function(){
			
			var lb = $(this).data("id");
			console.log("本次点击详情的类别", lb);
			console.log("xlsTable", xlsTable);
			if(xlsTable.length > 0){
				var items = [];
				for(var i=0; i<xlsTable.length;i++){
					if(lb == xlsTable[i].bglb){
						items = xlsTable[i].data;
						break;
					}
				}
				if(items.length > 0){
					
					var fields = [];
					for(var k in items[0]){
						fields.push(k);
					}
												
					var tableData = [];
					for(var j = 0; j<items.length; j++){
						var obj = {};
						obj.id = j;
						obj.bm = items[j].bm;
						obj.mc = items[j].mc;
						
						tableData.push(obj);
					}
					$("#hjbgTable").bootstrapTable({
            			data:tableData,
            			pagination:true,
            			showFooter:false,
            			pageSize:10,
            			sidePagination:"client",
            			columns:[{
            				field:'id',
            				title:'序号'
            			},{
            				field:'bm',
            				title:'权属单位代码'
            			},{
            				field:'mc',
            				title:'权属单位名称'
            			}	            				
            			]
            		});
            		
            		$("#dialogModalHZBG").modal('show');
				}
				
			}
		});
	}
	function getSJBS(){
		$.ajax({
            type: 'POST',
			url: app.postUrls.getSJBJYXX,
            data: {ssqx:"0",page:"0",zt:"0"},
            async:true,
            dataType: 'json',
            success: function (result) {
            	 //数据返回成功
                 console.log(result);
                
                 var tableData = [];

               	for(var i = 0;i<result.sjbxx.length;i++){
               		
               		var obj = {};
               		var operStr = "";
               		obj["sjbbm"] = result.sjbxx[i].sjbbm;
               		obj["sjbmc"] = result.sjbxx[i].sjbmc;
               		obj["hjr"] = result.sjbxx[i].hjrxm;
               		obj["hjsj"] = result.sjbxx[i].tjsj;
               		obj["clr"] = result.sjbxx[i].zhclr;               		
               		
               		switch(result.sjbxx[i].sjbzt){
               			case 1008001:
	               			state="初审未通过";
	               			operStr = "<button data-zt='1008001'  data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='updateSJB'>  <span class='glyphicon glyphicon-edit'></span>　信息修改</button>\t\t<button data-zt='1008001' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='backSJB'>  <span class='glyphicon glyphicon-edit'></span>　数据退回</button>\t\t<button data-zt='1008001' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='print btn btn-default' name='print' > <span class='glyphicon glyphicon-print'></span>　报告打印</button>";
	               			break;
               			case 1008002:
	               			state="待质检";
	               			operStr = "<button data-zt='1008002' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='updateSJB'>  <span class='glyphicon glyphicon-edit'></span>　信息修改</button>\t\t<button data-zt='1008002' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='zhiijan btn btn-default' name='zhijian'>  <span class='glyphicon glyphicon-eye-open'></span>　质检录入</button>";
	               			break;
               			case 1008003:
               				state="质检通过";
               				operStr = "<button data-zt='1008003' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='updateSJB'>  <span class='glyphicon glyphicon-edit'></span>　质检详情</button>\t\t<button data-zt='1008003' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='print btn btn-default' name='ruku'> <span class='glyphicon glyphicon-print' ></span>　数据入库</button>\t\t<button data-zt='1008003' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='print btn btn-default' name='print'> <span class='glyphicon glyphicon-print'></span>　报告打印</button>";
               				break;
               			case 1008004:
               				state="质检未通过";
               				operStr = "<button data-zt='1008004' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='backSJB'>  <span class='glyphicon glyphicon-edit'></span>　数据退回</button>\t\t<button data-zt='1008004' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='print btn btn-default' name='print'> <span class='glyphicon glyphicon-print' ></span>　报告打印</button>";
               				break;
               			case 1008005:
               				state="数据退回";
               				operStr = "<button disabled data-zt='1008001' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='back'>  <span class='glyphicon glyphicon-edit'></span>　数据已退回</button>";
               				break;
               			case 1008006:
               				state="数据已汇交";
               				operStr = "<button data-zt='1008006' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='updateSJB'>  <span class='glyphicon glyphicon-edit'></span>　质检详情</button><button data-zt='1008006' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='print btn btn-default' name='print'> <span class='glyphicon glyphicon-print' ></span>　报告打印</button>";
               				break;
               		}
               		              		
               		obj["sjbzt"] = state;
               		obj["oper"] = operStr;
               		               		
					tableData.push(obj);
														
            	}
               	
	            $table.bootstrapTable('destroy').bootstrapTable({
	            	data:tableData,	            	
				 	showColumns:true,
				 	showRefresh:true,
				 	pageSize:"15",
				 	pageList:"[15]",
				 	pagination:true,
				 	showPaginationSwitch:false,
				 	sidePagination:"client",
				 	sortable:true,
				 	rowStyle:setRowStyle,
				 	detailView:true,
				 	search:true,
				 	detailFormatter:detailFormatter
	            	
	            });
	            
              	$("button[name=updateSJB]").on('click', UpdateXX);
				//报告打印
	             $('button[name=print]').on('click', printReport);
	            
	            //质检详情
	            $('button[name=backSJB]').on('click', queryZhijian);
	            
	            //数据退回
	            $('button[name=backSJB]').on('click', backSJB);   
	            
	            //数据入库
	             $('button[name=ruku]').on('click',commitDB);
	             
	            //质检信息录入
	            $('button[name=zhijian]').on('click',zhijianPush);
              
           
            }
     });
 
	}
	//暂时作废,之前的服务端表格渲染
	function getSJBXX(params){
		console.log("params", params);
		$.ajax({
            type: 'POST',
			url: app.postUrls.getSJBJYXX,
            data: {ssqx:"0",page:"0",zt:"0"},
            async:true,
            dataType: 'json',
            success: function (result) {
            	 //数据返回成功
                 console.log(result);
                
                 var tableData = [];

               	for(var i = 0;i<result.sjbxx.length;i++){
               		
               		var obj = {};
               		var operStr = "";
               		obj["sjbbm"] = result.sjbxx[i].sjbbm;
               		obj["sjbmc"] = result.sjbxx[i].sjbmc;
               		obj["hjr"] = result.sjbxx[i].hjrxm;
               		obj["hjsj"] = result.sjbxx[i].tjsj;
               		obj["clr"] = result.sjbxx[i].zhclr;               		
               		
               		switch(result.sjbxx[i].sjbzt){
               			case 1008001:
	               			state="初审未通过";
	               			operStr = "<button data-zt='1008001'  data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='updateSJB'>  <span class='glyphicon glyphicon-edit'></span>　信息修改</button>\t\t<button data-zt='1008001' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='backSJB'>  <span class='glyphicon glyphicon-edit'></span>　数据退回</button>\t\t<button data-zt='1008001' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='print btn btn-default' name='print' > <span class='glyphicon glyphicon-print'></span>　报告打印</button>";
	               			break;
               			case 1008002:
	               			state="待质检";
	               			operStr = "<button data-zt='1008002' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='updateSJB'>  <span class='glyphicon glyphicon-edit'></span>　信息修改</button>\t\t<button data-zt='1008002' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='zhiijan btn btn-default' name='zhijian'>  <span class='glyphicon glyphicon-eye-open'></span>　质检录入</button>";
	               			break;
               			case 1008003:
               				state="质检通过";
               				operStr = "<button data-zt='1008003' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='updateSJB'>  <span class='glyphicon glyphicon-edit'></span>　质检详情</button>\t\t<button data-zt='1008003' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='print btn btn-default' name='ruku'> <span class='glyphicon glyphicon-print' ></span>　数据入库</button>\t\t<button data-zt='1008003' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='print btn btn-default' name='print'> <span class='glyphicon glyphicon-print'></span>　报告打印</button>";
               				break;
               			case 1008004:
               				state="质检未通过";
               				operStr = "<button data-zt='1008004' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='backSJB'>  <span class='glyphicon glyphicon-edit'></span>　数据退回</button>\t\t<button data-zt='1008004' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='print btn btn-default' name='print'> <span class='glyphicon glyphicon-print' ></span>　报告打印</button>";
               				break;
               			case 1008005:
               				state="数据退回";
               				operStr = "<button disabled data-zt='1008001' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='back'>  <span class='glyphicon glyphicon-edit'></span>　数据已退回</button>";
               				break;
               			case 1008006:
               				state="数据已汇交";
               				operStr = "<button data-zt='1008006' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='btn btn-default' name='updateSJB'>  <span class='glyphicon glyphicon-edit'></span>　质检详情</button><button data-zt='1008006' data-sjbbm='"+obj["sjbbm"]+"' type='button' class='print btn btn-default' name='print'> <span class='glyphicon glyphicon-print' ></span>　报告打印</button>";
               				break;
               		}
               		              		
               		obj["sjbzt"] = state;
               		obj["oper"] = operStr;
               		               		
					tableData.push(obj);
														
            }
               	
           	$("button[name=updateSJB]").on('click', UpdateXX);
			//报告打印
             $('button[name=print]').on('click', printReport);
            
            //质检详情
            $('button[name=backSJB]').on('click', queryZhijian);
            
            //数据退回
            $('button[name=backSJB]').on('click', backSJB);               
            //数据入库
             $('button[name=ruku]').on('click',commitDB);
            //质检信息录入
            $('button[name=zhijian]').on('click',zhijianPush);
               	
           	params.success({
	            total: parseInt(totalCount),
	            rows: tableData
            });
            
            
 
        }  	

        });	
	}
	
	
	//报告打印
	function printReport(){
		
	}
	
	//质检详情
	function queryZhijian(){
		
	}
	
	//质检信息录入
	function zhijianPush(){
    	$("#tablePane_zhijian").css('display','none');
    	
    	sjbBM = $(this).data('sjbbm');
    	
    	
    	$("#zhijianInputFile").on('click', function(){
    		
    		$("#zhijianInputFile").fileupload({
        						url:app.postUrls.uploadParJson,
        						 
        						dataType:'json'
        	}).bind('fileuploaddone', function(e, data) {
        		console.log("上传成功", data.result);
        		
        		var tableData = [];
        		if(!data.result) return;
        		
        		zhijianFormData = data.result;
        		var res = data.result;
        		for(var k in res){
        			
        			var obj = {
        				"name":k,
        				"count":res[k]
        			};
        			
        			for(var j = 0; j<dicAttr.length;j++){
        				(function(){
        					var temp = k;
        					if(k == dicAttr[j].bm){
        						obj.name = dicAttr[j].name;
        					}
        				})();
        				
        			}	            			
        			
        			tableData.push(obj);
        		}
        		
        		console.log("tableData", tableData);
       			$("#tablePane_zhijian").css('display','block');
       			 $("#zhijianListTable").bootstrapTable({
        			data:tableData,
        			pagination:true,
        			showFooter:false,
        			pageSize:8,
        			sidePagination:"client",
        			columns:[{
        				field:'name',
        				title:'质检检查类别'
        			},{
        				field:'count',
        				title:'错误个数'
        			}	            				
        			]
        		});
        	});
    	});
    		
    	            	
    	$('#zhijianModal').modal({backdrop: 'static', keyboard: false, show:true});
		//$('#zhijianModal').modal('show');
		
    }
	
	//数据入库
	 function commitDB(){
             	             	
     	sjbBM = $(this).data('sjbbm');
     	
     	$(".btn-link.tableDetailLink").css("display","none");
     	$('#rukuModal').modal({backdrop: 'static', keyboard: false});
		$('#rukuModal').modal('show');
						
		xlsTable = [];
		xlsFilePathTable = [];
					             	
     	
     }
	//数据退回
	function backSJB(){
    	sjbBM = $(this).data('sjbbm');
    	$.ajax({
			type:"post",
			url:app.postUrls.updateHJSBZT,
			async:true,
			dataType:"json",
			data:{
				"sjbbm":sjbBM,
				"sjbzt":"1008005"
			},
			success:function(res){
				if(res.status == 'success'){
					var title="系统提示";
					var content="该数据已更新为退回状态！";
					var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
					
					$("#modalTitleHJCL").html(title);
					$("#modalContentHJCL").html(content);
					$("#modalFooterHJCL").html(footer);
					
					$("#dialogModalHJCL").modal({backdrop:'static',keyboard:false,show:true});
					
					//hjcl_table
					getSJBS();
				}
				
			},
			error:function(err){
				var title="系统提示";
				var content="该数据退回状态更新失败！";
				var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
				
				$("#modalTitleHJCL").html(title);
				$("#modalContentHJCL").html(content);
				$("#modalFooterHJCL").html(footer);
				
				$("#dialogModalHJCL").modal({backdrop:'static',keyboard:false,show:true});
			}
		});
    	
    }
	
	$wjTable = $("#sjwjTable_hjcl");
	
	var tStr = new Array();
	
	function UpdateXX(){
        //更新数据包信息      	
    	
    	//填充修改弹出框的数据包详细信息
    	var sjbbm = $(this).data('sjbbm');
    	fullfillSJBXXXXPane(sjbbm);            	
    	$('#updateModal').modal('show');           	
    	$("#updateSubmit_hjcl").on('click', function(){
    		console.log("汇交处理保存修改信息");          		
    		//汇交单位信息
			hjdwFormData.hjdwmc = $("#hjdwmc_hjcl").val();
			hjdwFormData.hjdwxz =  $("#hjdwxz_hjcl").val();
			hjdwFormData.hjdwdz = $("#hjdwdz_hjcl").val();
			
			console.log("修改汇交单位信息修改",hjdwFormData);
			//汇交用户信息
			hjryFormData.hjrxm = $("#hjrxm_hjcl").val();
			hjryFormData.lxdh = $("#lxdh_hjcl").val();
			hjryFormData.lxyx = $("#lxyx_hjcl").val();
			hjryFormData.txdz = $("#txdz_hjcl").val();
			
			console.log("修改汇交用户信息修改",hjryFormData);			
			//数据包信息
			sjbFormData.sjbmc = $("#sjbmc_hjcl").val();
			sjbFormData.sjblx = $("#sjblx_hjcl").val();
			sjbFormData.hjsjbjz = $("#sjbjzlx_hjcl").val();
			sjbFormData.sjbdx = $("#sjbdx_hjcl").val();
			
			sjbFormData.wjzs = $("#wjzs_hjcl").val();
			sjbFormData.ccwz = $("#ccwz_hjcl").val();
			
			console.log("修改数据包",sjbFormData);
			
			//数据文件信息

			var data = $("#sjwjTable_hjcl").bootstrapTable('getData');
			for(var i = 0; i< 7;i++){
				hjwjFormData[i].wjsl = data[i].wjsl;
				hjwjFormData[i].wjdx = data[i].wjdx;
				hjwjFormData[i].wjms = data[i].wjms;
				
				
			}
			console.log("修改数据文件信息", hjwjFormData);
			
			var hjdwPost = $.ajax({
				type:"post",
				url:app.postUrls.updateHJDWXX,
				async:true,
				data:hjdwFormData,
				dataType:"json"
			});
			var hjryPost = $.ajax({
				type:"post",
				url:app.postUrls.updateHJRYXX,
				async:true,
				dataType:"json",
				data:hjryFormData
			});
			var sjbPost = $.ajax({
				type:"post",
				url:app.postUrls.updateSJBXX,
				async:true,
				dataType:'json',
				data:sjbFormData
			});
			var sjwjPost0 = $.ajax({
				type:"post",
				url:app.postUrls.updateHJSJWJ,
				async:true,
				dataType:'json',
				data:hjwjFormData[0]
			});
			var sjwjPost1 = $.ajax({
				type:"post",
				url:app.postUrls.updateHJSJWJ,
				async:true,
				dataType:'json',
				data:hjwjFormData[1]
			});
			var sjwjPost2 = $.ajax({
				type:"post",
				url:app.postUrls.updateHJSJWJ,
				async:true,
				dataType:'json',
				data:hjwjFormData[2]
			});
			var sjwjPost3 = $.ajax({
				type:"post",
				url:app.postUrls.updateHJSJWJ,
				async:true,
				dataType:'json',
				data:hjwjFormData[3]
			});
			var sjwjPost4 = $.ajax({
				type:"post",
				url:app.postUrls.updateHJSJWJ,
				async:true,
				dataType:'json',
				data:hjwjFormData[4]
			});
			var sjwjPost5 = $.ajax({
				type:"post",
				url:app.postUrls.updateHJSJWJ,
				async:true,
				dataType:'json',
				data:hjwjFormData[5]
			});
			var sjwjPost6 = $.ajax({
				type:"post",
				url:app.postUrls.updateHJSJWJ,
				async:true,
				dataType:'json',
				data:hjwjFormData[6]
			});
			
			$.when(hjdwPost, hjryPost, sjbPost, sjwjPost0, sjwjPost1, sjwjPost2, sjwjPost3, sjwjPost4, sjwjPost5, sjwjPost6).then(function(res0,res1,res2,res3,res4,res5,res6,res7,res8,res9){
				console.log("所有修改请求都提交了",res0);
				
				var title="数据包信息保存提示";
				var content="数据包信息保存成功！";
				var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
				
				$("#modalTitleHJCL").html(title);
				$("#modalContentHJCL").html(content);
				$("#modalFooterHJCL").html(footer);
				
				$("#dialogModalHJCL").modal('show');
				
//				$("#hjcl_table").bootstrapTable('refreshOptions',{
//					search:true,
//					showColumns:true,
//					showRefresh:true
//				});
				getSJBS();
				
				
			}, function(err){
				console.log("保存修改信息报错",err);
				var title="数据包信息保存提示";
				var content="数据包信息保存出错！";
				var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
				
				$("#modalTitleHJCL").html(title);
				$("#modalContentHJCL").html(content);
				$("#modalFooterHJCL").html(footer);
				
				$("#dialogModalHJCL").modal('show');
			});       		
    });      
	}
	
	function fullfillSJBXXXXPane(bm){
		hjdwFormData={};
		hjryFormData = {};
		sjbFormData = {};
		hjwjFormData = [];
		
		if(!bm) return;
		var res = getSJBXXXX(bm);
		console.log("res",res);
		var hjry = res.xxxx.hjry;
		var hjdw = res.xxxx.hjdw;
		var sjb = res.xxxx.sjb;
		var sjwj = res.xxxx.hjsjwj;
		//保存修改的唯一值
		hjdwFormData.hjdwbm = hjdw.hjdwbm;	
		
		hjryFormData.hjrybm = hjry.hjrybm;
		
		sjbFormData.sjbbm = bm;
		sjbFormData.ssqx = sjb.ssqx;
		sjbFormData.sjbzt = sjb.sjbzt;
		sjbFormData.sjbms = sjb.sjbms;
		sjbFormData.hjrybm = hjry.hjrybm;
		
				
		for(var i = 0; i<7;i++){
			var ji = 1009001;
			var wjbm = ji + i;
			var obj = {};
			
			(function(){
				var temp = wjbm;
				for(var j = 0;j < sjwj.length;j++){					
					if(parseInt(sjwj[j].wjlb) == parseFloat(wjbm)){
						obj.xxbm = sjwj[j].xxbm;						
					}
				}
				
			})();
						
			hjwjFormData.push(obj);	
		}
		console.log("hjwjFormData", hjwjFormData);
		
		
		//汇交单位信息
		$("#hjdwmc_hjcl").val(hjdw.hjdwmc);
		$("#hjdwxz_hjcl").val(hjdw.hjdwxz);
		$("#hjdwdz_hjcl").val(hjdw.hjdwdz);
		//汇交用户信息
		$("#hjrxm_hjcl").val(hjry.hjrxm);
		$("#lxdh_hjcl").val(hjry.lxdh);
		$("#lxyx_hjcl").val(hjry.lxyx);
		$("#txdz_hjcl").val(hjry.txdz);
		//数据包信息
		$("#sjbmc_hjcl").val(sjb.sjbmc);
		$("#sjblx_hjcl").val(sjb.sjblx);
		$("#sjbjzlx_hjcl").val(sjb.hjsjbjz);
		$("#sjbdx_hjcl").val(sjb.sjbdx);
		
		$("#sjbjzlx_hjcl").val(sjb.hjsjbjz);
		$("#wjzs_hjcl").val(sjb.wjzs);
		$("#ccwz_hjcl").val(sjb.ccwz);
		//数据文件信息
		
		
		tStr = [];
		
		
		for(var i = 1009001;i<1009008;i++){
			
			(function(){
				var temp = i;
				for(var j = 0;j < sjwj.length;j++){					
					if(parseInt(sjwj[j].wjlb) == parseFloat(temp)){
						var obj = {
							"wjlx":getWJLX(i),
							"wjdx":sjwj[j].wjdx,
							"wjsl":sjwj[j].wjsl,				
							"wjms":sjwj[j].wjms
						};	
						
						tStr.push(obj);
					}
				}
				
			})();
					
		}
		
		
		console.log("填充弹出框表格的数据", tStr);
		
		$wjTable.bootstrapTable('destroy').bootstrapTable({
			data:tStr
		});

		
				
	}
	
	function centerModals() {
	$('.modal').each(function(i) { 
	        var $clone = $(this).clone().css('display', 'block').appendTo('body'); var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);   
	        top = top > 0 ? top : 0;   
	        $clone.remove();   
	        $(this).find('.modal-content').css("margin-top", top);
	    });   
	}
	
	
})(jQuery)
