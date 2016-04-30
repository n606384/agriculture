$(function(){
	var shengAttr = {value:[]},shiAttr={value:[]},xianAttr={value:[]};
	var shiFlag = true, xianFlag = true;
	var shengCode,shiCode;
	var province,city,county;
		
	function resize(){
		var height = (document.body.clientHeight - 214)+"px";
		$("#container").height(height);
	}
	window.onresize = resize();
	$.ajax({
				type:"get",
				url:"json/district.json",
				async:true,				
				dataType:"json",
				success:function(res){		
					console.log("获取行政区json数据",res);
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
						
						$("#shiIpt").bsSuggest({
							ignorecase:true,
							showHeader:true,
							showBtn:false,
							delayUntilKeyup:false,
							indexId: 1,  //data.value 的第几个数据，作为input输入框的内容
					        indexKey: 2, //data.value 的第几个数据，作为input输入框的内容
					        data: shiAttr
						});
						$("#xianIpt").bsSuggest({					
							ignorecase:true,
							showHeader:true,
							showBtn:false,
							delayUntilKeyup:false,
							indexId: 1,  //data.value 的第几个数据，作为input输入框的内容
					        indexKey: 2, //data.value 的第几个数据，作为input输入框的内容
					        data: xianAttr
						}).show();
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
							shengCode = keyword.id;				
														
							//第一次加载的时候初始化市选择器
							if(shiFlag){
								$("#shiIpt").bsSuggest({
									ignorecase:true,
									showHeader:true,
									showBtn:false,
									delayUntilKeyup:false,
									indexId: 1,  //data.value 的第几个数据，作为input输入框的内容
							        indexKey: 2, //data.value 的第几个数据，作为input输入框的内容
							        data: shiAttr
								}).on('onSetSelectValue', function(e,keyword,data){
									console.log('xianAttr onSetSelectValue: ', keyword, data);
									var selValue = keyword.id;
																		
									if(xianFlag){
										
										$("#xianIpt").bsSuggest({							
											ignorecase:true,
											showHeader:true,
											showBtn:false,
											delayUntilKeyup:false,
											indexId: 1,  //data.value 的第几个数据，作为input输入框的内容
									        indexKey: 2, //data.value 的第几个数据，作为input输入框的内容
									        data: xianAttr
										}).on('onSetSelectValue', function(e,keyword,data){
											app.xianbm = keyword.id;
											console.log("app.xianbm",app);
											
											$.ajax({
												type:"post",
												url:"http://192.168.44.231:8080/rest/hjyy/getHJDWRYXX",
												async:true,
												data:{
													"ssqx":app.xianbm
												},
												dataType:"json",
												success:function(res){
													console.log(res);
													if(res.length>0){
														var data = res[0];
														$("#hjdwmc").val(data.hjdwmc);
														$('#hjdwdz').val(data.hjdwdz);
														var xz = "";
														console.log("app.hjdwxzList",app.hjdwxzList)
//														app.hjdwxzList.each(function(e){
//															if(data.hjdwxz == e.bm){
//																xz = e.name;
//																break;
//															}
//														});
														
														$('#hjdwxz').val(xz);
														if(res[0].hjdwry.length > 0){
															var person = res[0].hjdwry[0];
															console.log("person",person);
															$("#hjrxm").val(person.hjrxm);
															$('#lxdh').val(person.lxdh);
															$('#lxyx').val(person.lxyx);
															$('#txdz').val(person.txdz);
														}
														
													}
													
													
												},
												error:function(err){
													console.log("出错了",err);
												}
											});
											
										});
										
										xianFlag = false;
										
										
									}else{
										
										
									}
									
									
						
								});
								shiFlag = false;
								
								$("table");
								console.log("切换省级单位后,$shiTr",$shiTr);
								
							}
							else{
								var $shiTr = $("table:eq(1)").find("tr");
								console.log("切换省级单位后,$shiTr",$shiTr);
							}
														
						});
						
						
					}
				},
				error:function(err){
					console.log("信息报错",err);
					
				}
				
			});
			$("#shengIpt").on('click', function(e){
				var table = $("table");
				console.log("点击省",shengCode,table);
				
			});
			$("#shiIpt").on('click', function(e){
				var table = $("table");
				console.log("点击市",shengCode,table);
				
			});
			
	
	$("#resetDistrict").on('click', function(){
		
		$("#shengIpt").val("");		
		$("#shiIpt").val("");
		//$("#shiDropdownMenu").empty();
		$("#xianIpt").val("");
		//$("#xianDropdownMenu").empty();
	});
	$("#resetUser").on("click",function(){
		
		$("#hjdwxz").val("");		
		$("#hjdwmc").val("");
		$("#hjdwdz").val("");
		$("#hjrxm").val("");
		$("#lxdh").val("");
		$("#lxyx").val("");
		$("#txdz").val("");
		
	});
	$("#submitUser").on("click",function(){
		//alert("222");
		$.ajax({
			type:"post",
			url:"http://192.168.44.231:8080/rest/hjyy/getHJDWRYXX?token=sdsd",
			async:true,
			data:{
				"ssqx":110105
			},
			success:function(res){
				console.log("res",res);
			},
			error:function(er){
				console.log("er",er);
			}
		});
		
	});
	
	
});
