$(function(){
	var shengAttr = {value:[]},shiAttr={value:[]},xianAttr={value:[]};
	var shiFlag = true, xianFlag = true;
	
	var shengCode,shiCode;
	var province,city,county;
	var userTree;
	function resize(){
		var height = (document.body.clientHeight - 324)+"px";
		$("#container").height(height);
	}
	window.onresize = resize();
	//行政区三级表格
	var promise = $.ajax({
				type:"get",
				url:"json/district.json",
				async:false,				
				dataType:"json",
				success:function(res){
					//console.log("获取行政区json数据",res);
					if(res.length == 3){

						province = res[0];
						city = res[1];
						county = res[2];
						$.each(province, function(k,p) {
							//console.log(k,p);
							var obj = 
							{
								"编号":(k+1),
								"行政区编码":p.pro.proID,
								"名称":p.pro.proName
								};
							//p.pro;
							shengAttr.value.push(obj)
						});
						$.each(city, function(k,p) {
							//console.log(k,p);
							var obj =
							{
								"编号":(k+1),
								"行政区编码":p.city.cityID,
								"名称":p.city.cityName
							};
							// p.city;
							shiAttr.value.push(obj);
						});
						$.each(county, function(k,p) {
							//console.log(k,p);
							var obj = 
							{
								"编号":(k+1),
								"行政区编码":p.dis.disID,
								"名称":p.dis.disName
							};
							//p.dis;
							xianAttr.value.push(obj);
						});
						
						/*输出json文件
						//console.log("shengAttr",JSON.stringify(shengAttr));
						//console.log("shiAttr",JSON.stringify(shiAttr));
						//xianAttr.value = xianAttr.value.slice(3000);
						//var xian =JSON.stringify(xianAttr);
						//console.log("xianAttr",JSON.stringify(xianAttr));
						输出json文件******/
						
						var shiSuggest = $("#shiIpt").bsSuggest({
							ignorecase:true,
							showHeader:true,
							showBtn:false,
							delayUntilKeyup:false,
							indexId: 1,  //data.value 的第几个数据，作为input输入框的内容
					        indexKey: 2, //data.value 的第几个数据，作为input输入框的内容
					        data: shiAttr
						});
						var xianSuggest = $("#xianIpt").bsSuggest({			
							ignorecase:true,
							showHeader:true,
							showBtn:false,
							delayUntilKeyup:false,
							indexId: 1,  //data.value 的第几个数据，作为input输入框的内容
					        indexKey: 2, //data.value 的第几个数据，作为input输入框的内容
					        data: xianAttr
						});
						console.log("ddd",$("table"));
						$("#shengIpt").bsSuggest({							
							ignorecase:true,
							showHeader:true,
							showBtn:false,
							delayUntilKeyup:false,
							indexId: 1,  //data.value 的第几个数据，作为input输入框的内容
					        indexKey: 2, //data.value 的第几个数据，作为input输入框的内容
					        data: shengAttr
					        
						}).on('onSetSelectValue', function(e,keyword,data){
							console.log('onSetSelectValue: ', keyword, data);						
							app.xianName = "";
							app.xianName = keyword.key;
							var selValue = keyword.id;
							shengCode = keyword.id;				
							shiSuggest.bsSuggest('destroy');
							
							shiAttr.value = [];
							
							if(city.length > 0){								
								for(var i = 0; i< city.length;i++){
									if(city[i].city.parentID==selValue){
										var obj =
										{
											"编号":(i+1),
											"行政区编码":city[i].city.cityID,
											"名称":city[i].city.cityName
										};
										shiAttr.value.push(obj);
										
									}
																		
								}
								//console.log("shiAttr", shiAttr);
								
							}
							
							shiSuggest = $("#shiIpt").bsSuggest({
								ignorecase:true,
								showHeader:true,
								showBtn:false,
								delayUntilKeyup:false,
								indexId: 1,//data.value 的第几个数据，作为input输入框的内容
						        indexKey: 2,//data.value 的第几个数据，作为input输入框的内容
						        data: shiAttr
							}).on('onSetSelectValue', function(e,keyword,data){
								console.log('xianAttr onSetSelectValue: ', keyword, data);
								app.xianName += keyword.key;
								var selValue = keyword.id;
								xianSuggest.bsSuggest('destroy');
								
								xianAttr.value = [];
								if(county.length > 0){
									
									for(var i = 0; i< county.length;i++){
										if(county[i].dis.parentID==selValue){
											var obj =
											{
												"编号":(i+1),
												"行政区编码":county[i].dis.disID,
												"名称":county[i].dis.disName
											};
											xianAttr.value.push(obj);
										}
																			
									}
																			
								}
								
								$("#xianIpt").bsSuggest({							
									ignorecase:true,
									showHeader:true,
									showBtn:false,
									delayUntilKeyup:false,
									indexId: 1,  //data.value 的第几个数据，作为input输入框的内容
							        indexKey: 2, //data.value 的第几个数据，作为input输入框的内容
							        data: xianAttr
								}).on('onSetSelectValue', function(e,keyword,data){
									app.xianName += keyword.key;
									app.xianbm = keyword.id;
									//console.log("app.xianbm",app);
									fullfillDropMenu();
									$("#countySpan").html(app.xianName);
									
								});
									
							});
							shiFlag = false;
										
						});
						
						
					}
				},
				error:function(err){
					console.log("信息报错",err);
					
				}
				
			});
			
	
	
				
	$("#hjdwxzList li").on('click', function(e){
		//console.log("汇交单位性质",$(this)[0].dataset);
		
		$("#hjdwxz").val($(this)[0].dataset.name);
				
	});
	
	
	
	//行政区输入框置空
	$("#resetDistrict").on('click', function(){
		$("#countySpan").html("***省***市***县");
		$("#shengIpt").val("");
		$("#shiIpt").val("");
		//$("#shiDropdownMenu").empty();
		$("#xianIpt").val("");
		//$("#xianDropdownMenu").empty();
	});
	//保存
	$("#saveBtnHJYY").on('click',function(){
		
		var formdata={};
		var addOrg = 0;
		var addUser = 0;
		/*****单位提交信息******/
		var hjdwbmFD="-1";
		var hjdwmcFD = $("#hjdwmc").val();
		var hjdwxzFD = $("#hjdwxz").val();
		if(hjdwxzFD.trim() == "农业系统单位"){
			hjdwxzFD = 1003001;
		}else if(hjdwxzFD.trim() == "农业系统单位"){
			hjdwxzFD = 1003002;
		}
		var hjdwdzFD = $("#hjdwdz").val();
		
		/******用户信息********/
		var hjrybmFD = "-1";
		var hjrxmFD = $("#hjrxm").val();
		var	lxdhFD = $("#lxdh").val();
		var	lxyxFD = $("#lxyx").val();
		var	txdzFD = $("#txdz").val();
		
		
		/********判断信息是否有空***********/
		if(hjdwxzFD==""||hjdwdzFD==""||hjdwmcFD==""||hjrxmFD==""||lxdhFD==""||lxyxFD==""||txdzFD==""){
			var title="警告信息";
			var content="录入信息不完整，请补全其他信息！";
			var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
			
			$("#modalTitle").html(title);
			$("#modalContent").html(content);
			$("#modalFooter").html(footer);
			
			$("#dialogModal").modal('show');
			return;
		}
		
		/***判断增加和修改的状态****/
		if(userTree){
			console.log("userTree", userTree,hjdwmcFD);
			for(var i=0;i<userTree.length;i++){
				if(hjdwmcFD.trim() =="")
					return;
				else if(hjdwmcFD.trim() == userTree[i].hjdwmc.trim()){
					addOrg = 1;
					hjdwbmFD = userTree[i].hjdwbm;
					break;
				}
				else{
					addOrg = 0;					
					hjdwbmFD = -1;
				}
				
			}
			for(var i =0; i<userTree.length;i++)
				for(var j = 0; j<userTree[i].hjdwry.length;j++){
					
					var person = userTree[i].hjdwry[j];
					
					console.log("person.hjrxm.trim()",person.hjrxm.trim());
					
					if(hjrxmFD.trim() == person.hjrxm.trim()){
						addUser = 1;
						app.hjrybm = person.hjrybm;
						hjrybmFD = person.hjrybm;
						
						break;
					}
					
				}
		}
		
		formdata = {
			"sfzjdwxx":addOrg,
			"sfzjryxx":addUser,
			"hjdwxz":hjdwxzFD,
			"hjdwbm":hjdwbmFD,
			"hjdwmc":hjdwmcFD,
			"xzqhbm":app.xianbm,
			"hjdwdz":hjdwdzFD||"",
			"hjrxm":hjrxmFD,
			"hjrybm":hjrybmFD,
			"lxdh":lxdhFD||"",
			"lxyx":lxyxFD||"",
			"txdz":txdzFD||""
		};
		
		
		console.log("单位用户增加的参数",formdata);
		var sUrl="http://192.168.44.231:8080/rest/hjyy/addhjyyyh?token=ddd";
		var pUrl = "http://192.168.199.145:5000/hjyy/addhjyyyh?token=ddd";
		$.ajax({
			type:"post",
			//http://192.168.44.231:8080/rest/hjyy/addhjyyyh?token=ddd
			//http://192.168.199.145:5000/hjyy/addhjyyyh?token=ddd
			url:app.postUrls.addhjyyyh,
			async:true,
			dataType:'json',
			data:formdata,
			success:function(res){
				console.log("增加单位用户信息返回结果",res);
				if(res.hjrybm)app.hjrybm = res.hjdwbm;
				fullfillDropMenu();
				
				$("#hjdwmc").attr("disabled","disabled");
				$("#hjdwxz").attr("disabled","disabled");	
				$("#hjdwdz").attr("disabled","disabled");
				
				$("#hjrxm").attr("disabled","disabled");
				$("#lxdh").attr("disabled","disabled");	
				$("#lxyx").attr("disabled","disabled");
				$("#txdz").attr("disabled","disabled");
				
			},
			error:function(err){
				console.log("erro",err);
				var title="服务器错误信息";
				var content="服务器返回错误信息！";
				var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
				
				$("#modalTitle").html(title);
				$("#modalContent").html(content);
				$("#modalFooter").html(footer);
				
				$("#dialogModal").modal('show');
				return;
			}
		});
		
		
		
	});
	//修改
	var update = false;
	$("#updateBtnHJYY").on('click', function(){
		update = true;
		$("#hjdwmc").removeAttr("disabled");
		$("#hjdwxz").removeAttr("disabled");	
		$("#hjdwdz").removeAttr("disabled");
		
		$("#hjrxm").removeAttr("disabled");
		$("#lxdh").removeAttr("disabled");	
		$("#lxyx").removeAttr("disabled");
		$("#txdz").removeAttr("disabled");
				
	});
	//填充下拉列表
	function fullfillDropMenu(){
		$.ajax({
			type:"post",
//			url:"http://192.168.44.231:8080/rest/hjyy/getHJDWRYXX",
			url:app.postUrls.getHJDWRYXX,
			async:true,
			data:{
				"ssqx":app.xianbm
			},
			dataType:"json",
			success:function(res){
				console.log(res);
				userTree = res;
				if(res.length>0){
					
					$("#hjdwmc").val("");
					$('#hjdwdz').val("");
					$("#hjdwxz").val("");
					$("#hjrxm").val("");
					$('#lxdh').val("");
					$('#lxyx').val("");
					$('#txdz').val("");
					
					$("#hjdwmcList").empty();
					$("#hjdwdzList").empty();
					$("#hjrxmList").empty();
					$("#lxdhList").empty();
					$("#lxyxList").empty();
					$("#txdzList").empty();
					
//												
					var mcStr = "",dzStr = "";
					for(var i = 0; i<res.length;i++){
						var dataset = res[i];
						
						 mcStr += "<li data-id='"+i+"' data-name='"+dataset.hjdwmc+"'>"+dataset.hjdwmc+"</li>";
						 dzStr += "<li data-id='"+i+"' data-name='"+dataset.hjdwdz+"'>"+dataset.hjdwdz+"</li>";
																			
					}
					$("#hjdwmcList").html(mcStr);
					$("#hjdwdzList").html(dzStr);
					
					var data = res[0];
					$("#hjdwmc").val(data.hjdwmc);
					$('#hjdwdz').val(data.hjdwdz);
					if(parseInt(data.hjdwxz)==1003001){
						$('#hjdwxz').val("农业系统单位");
						
					}else if(parseInt(data.hjdwxz)==1003001){
						$('#hjdwxz').val("开发商");
					}																									
					
					if(res[0].hjdwry.length > 0){
						
						//填充用户信息下拉列表
						var xmStr="",dhStr="", yxStr="", dzStr="";
						for(var i = 0;i<res[0].hjdwry.length;i++){
							var dataset = res[0].hjdwry[i];
							
							 xmStr += "<li data-id='"+i+"' data-name='"+dataset.hjrxm+"'>"+dataset.hjrxm+"</li>";
							 dhStr += "<li data-id='"+i+"' data-name='"+dataset.lxdh+"'>"+dataset.lxdh+"</li>";
							  yxStr += "<li data-id='"+i+"' data-name='"+dataset.lxyx+"'>"+dataset.lxyx+"</li>";
							   dzStr += "<li data-id='"+i+"' data-name='"+dataset.txdz+"'>"+dataset.txdz+"</li>";
							
						}
						
						$("#hjrxmList").html(xmStr);
						$("#lxdhList").html(dhStr);
						$("#lxyxList").html(yxStr);
						$("#txdzList").html(dzStr);
												
						
						//初始化用户信息
						var person = res[0].hjdwry[0];
						//console.log("person",person);
						$("#hjrxm").val(person.hjrxm);
						$('#lxdh').val(person.lxdh);
						$('#lxyx').val(person.lxyx);
						$('#txdz').val(person.txdz);
					}
					
					$("#hjdwmcList li").on('click', function(e){
						console.log("汇交单位名称",e);
						var dataset = e.target.dataset;
						var id = dataset.id;
						var name = dataset.name;
						console.log("userTree",userTree);
						for(var i = 0;i<userTree.length;i++){
							if(name.trim() == userTree[i].hjdwmc){
								var data = res[i];
								$("#hjdwmc").val(data.hjdwmc);
								$('#hjdwdz').val(data.hjdwdz);
								if(parseInt(data.hjdwxz)==1003001){
									$('#hjdwxz').val("农业系统单位");
									
								}else if(parseInt(data.hjdwxz)==1003001){
									$('#hjdwxz').val("开发商");
								}
								//更新初始化用户信息
								var person = userTree[i].hjdwry[0];
								//console.log("person",person);
								$("#hjrxm").val(person.hjrxm);
								$('#lxdh').val(person.lxdh);
								$('#lxyx').val(person.lxyx);
								$('#txdz').val(person.txdz);
								//填充用户信息下拉列表
								var xmStr="",dhStr="", yxStr="", dzStr="";
								for(var j = 0;j<userTree[i].hjdwry.length;j++){
									var dataset = userTree[i].hjdwry[j];
									
									 xmStr += "<li data-id='"+i+"' data-name='"+dataset.hjrxm+"'>"+dataset.hjrxm+"</li>";
									 dhStr += "<li data-id='"+i+"' data-name='"+dataset.lxdh+"'>"+dataset.lxdh+"</li>";
									  yxStr += "<li data-id='"+i+"' data-name='"+dataset.lxyx+"'>"+dataset.lxyx+"</li>";
									   dzStr += "<li data-id='"+i+"' data-name='"+dataset.txdz+"'>"+dataset.txdz+"</li>";
									
								}
								
								$("#hjrxmList").html(xmStr);
								$("#lxdhList").html(dhStr);
								$("#lxyxList").html(yxStr);
								$("#txdzList").html(dzStr);
								
							}
						}
						
					});
			
					$("#hjrxmList li").on('click', function(e){
						
						console.log("汇交人员名称",e);
						var dataset = e.target.dataset;
						var id = dataset.id;
						var name = dataset.name;
						
						for(var i = 0;i<userTree.length;i++)
							for(var j = 0;j<userTree[i].hjdwry.length;j++){
								var person = userTree[i].hjdwry[j];
								if(name.trim() == person.hjrxm){
									$("#hjrxm").val(person.hjrxm);
									$('#lxdh').val(person.lxdh);
									$('#lxyx').val(person.lxyx);
									$('#txdz').val(person.txdz);
								}
							
						}
				
					});
					
					$("#hjdwdzList li").on('click', function(e){
						//console.log("汇交单位性质",$(this)[0].dataset);
						
						$("#hjdwdz").val($(this)[0].dataset.name);
								
					});
					
					$("#lxyxList li").on('click', function(e){
						//console.log("汇交单位性质",$(this)[0].dataset);
						
						$("#lxyx").val($(this)[0].dataset.name);
								
					});
					$("#txdzList li").on('click', function(e){
						//console.log("汇交单位性质",$(this)[0].dataset);
						
						$("#txdz").val($(this)[0].dataset.name);
								
					});
					$("#lxdhList li").on('click', function(e){
						//console.log("汇交单位性质",$(this)[0].dataset);
						
						$("#lxdh").val($(this)[0].dataset.name);
								
					});
					
				}
				
				
			},
			error:function(err){
				console.log("出错了",err);
			}
		});
	}
	
	
	
	
	
	
});
