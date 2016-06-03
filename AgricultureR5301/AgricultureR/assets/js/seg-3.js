(function ($) {
    
    $.processSJWJ = function(app){
		console.log("seg-3.js传入app",app);
		//this.init(app);
		init();	
		app.hjyyProgress = 3;
		
	}
    var formData= {};
    var xxbms = null;
    function init(){
    	
    	if(app.scanData){
    		var dataset = app.scanData.class;
    		console.log("扫描的汇交文件数量", dataset);
    		for(var i = 0; i< dataset.length; i++){
    			var str = dataset[i].name.substr(0,2);
    			switch(str){
    				case "矢量": 
    					$("#sjwjTable tbody tr:eq(0)").find("td:eq(1)").html(dataset[i].num);
    					$("#sjwjTable tbody tr:eq(0)").find("td:eq(2)").html(dataset[i].size);
    					break;
    				case "栅格": 
    					$("#sjwjTable tbody tr:eq(1)").find("td:eq(1)").html(dataset[i].num);
    					$("#sjwjTable tbody tr:eq(1)").find("td:eq(2)").html(dataset[i].size);
    					break;
    				case "汇总": 
    					$("#sjwjTable tbody tr:eq(2)").find("td:eq(1)").html(dataset[i].num);
    					$("#sjwjTable tbody tr:eq(2)").find("td:eq(2)").html(dataset[i].size);
    					break;
    				case "图件": 
    					$("#sjwjTable tbody tr:eq(3)").find("td:eq(1)").html(dataset[i].num);
    					$("#sjwjTable tbody tr:eq(3)").find("td:eq(2)").html(dataset[i].size);
    					break;
    				case "权属": 
    					$("#sjwjTable tbody tr:eq(4)").find("td:eq(1)").html(dataset[i].num);
    					$("#sjwjTable tbody tr:eq(4)").find("td:eq(2)").html(dataset[i].size);
    					break;
    				case "文字": 
    					$("#sjwjTable tbody tr:eq(5)").find("td:eq(1)").html(dataset[i].num);
    					$("#sjwjTable tbody tr:eq(5)").find("td:eq(2)").html(dataset[i].size);
    					break;
    				case "其他": 
    					$("#sjwjTable tbody tr:eq(6)").find("td:eq(1)").html(dataset[i].num);
    					$("#sjwjTable tbody tr:eq(6)").find("td:eq(2)").html(dataset[i].size);
    					break;
    			}
    			
    		}
    	}
    	
    	$("#countySpan_sjwj").html(app.xianName);
		//事件绑定
		//修改事件
		$("#updateBtnSJWJ").on('click', function(){
			//enableInput();
			$('#sjwjTable').editableTableWidget();
		});
		//保存事件
		$("#saveBtnSJWJ").on('click', function(){
								
			var tableData = [];
			$('#sjwjTable tbody tr').each(function(rowNum){
				
				var obj = {};				
				obj.wjlxT = $(this).children('td:eq(0)').data("id");
				obj.wjslT = $(this).children('td:eq(1)').text();
				obj.wjdxT = $(this).children('td:eq(2)').text();
				obj.wjmsT = $(this).children('td:eq(3)').text();
				
				tableData.push(obj);
												
			});
			console.log("data",tableData);
			
			app.sjwjData = tableData;
			
			//判断是增加还是修改
			if(!checkSJWJ()){
				var formDatas = [];
				for(var i = 0;i<tableData.length;i++){
					var data = tableData[i];
					//submitWJB(tableData[i]);
					var obj = {
						"sjbbm":app.sjbbm||"6",
						"wjlb": data.wjlxT||"1009006",
						"wjsl": data.wjslT||"360",
						"wjdx": data.wjdxT||"3231111003",
						"wjms": data.wjmsT||"test1"
						
					};
					formDatas.push(obj);
								
				}
				var slsjPost = $.ajax({
					type:"post",
					url:app.postUrls.addSJWJXX,
					async:true,
					dataType:'json',
					data:formDatas[0]
				});
				var sgsjPost = $.ajax({
					type:"post",
					url:app.postUrls.addSJWJXX,
					async:true,
					dataType:'json',
					data:formDatas[1]
				});
				var hzbgPost = $.ajax({
					type:"post",
					url:app.postUrls.addSJWJXX,
					async:true,
					dataType:'json',
					data:formDatas[2]
				});
				
				var tjsjPost = $.ajax({
					type:"post",
					url:app.postUrls.addSJWJXX,
					async:true,
					dataType:'json',
					data:formDatas[3]
				});
				var qssjPost = $.ajax({
					type:"post",
					url:app.postUrls.addSJWJXX,
					async:true,
					dataType:'json',
					data:formDatas[4]
				});
				var wzbgPost = $.ajax({
					type:"post",
					url:app.postUrls.addSJWJXX,
					async:true,
					dataType:'json',
					data:formDatas[5]
				});
				var qtzlPost = $.ajax({
					type:"post",
					url:app.postUrls.addSJWJXX,
					async:true,
					dataType:'json',
					data:formDatas[6]
				});			
				
				$.when(slsjPost,
					sgsjPost,
					hzbgPost,
					tjsjPost,
					qssjPost,
					wzbgPost,
					qtzlPost
				).then(
					function(
						res1,
						res2, 
						res3, 
						res4, 
						res5, 
						res6, 
						res7){
					if(res1[0].status=="success"&&res2[0].status=="success"&&res3[0].status=="success"&&res4[0].status=="success"&&res5[0].status=="success"&&res6[0].status=="success"&&res7[0].status=="success"){
						console.log("res1", res1);
						xxbms = [res1[0].xxbm,res2[0].xxbm,res3[0].xxbm,res4[0].xxbm,res5[0].xxbm,res6[0].xxbm,res7[0].xxbm];
						console.log("返回的信息编码", xxbms);
						var title="系统信息";
						var content="文件信息保存成功！";
						var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
						
						$("#modalTitleSJWJ").html(title);
						$("#modalContentSJWJ").html(content);
						$("#modalFooterSJWJ").html(footer);
						
						$("#dialogModalSJWJ").modal({backdrop:'static', keyboard:false, show:true});
					}
					
				}, function(){
					//console.log("添加数据文件报错", err);
					var title="系统信息";
					var content="数据文件保存出错！";
					var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
					
					$("#modalTitleSJWJ").html(title);
					$("#modalContentSJWJ").html(content);
					$("#modalFooterSJWJ").html(footer);
					
					$("#dialogModalSJWJ").modal({backdrop:'static', keyboard:false, show:true});
				});
				
			}else{				
				var formDatas = [];
				for(var i = 0;i<tableData.length;i++){
					var data = tableData[i];
					//submitWJB(tableData[i]);
					var obj = {
						"xxbm":xxbms[i],						
						"wjsl": data.wjslT,
						"wjdx": data.wjdxT,
						"wjms": data.wjmsT						
					};
					formDatas.push(obj);
								
				}
				var slsjPost = $.ajax({
					type:"post",
					url:app.postUrls.updateHJSJWJ,
					async:true,
					dataType:'json',
					data:formDatas[0]
				});
				var sgsjPost = $.ajax({
					type:"post",
					url:app.postUrls.updateHJSJWJ,
					async:true,
					dataType:'json',
					data:formDatas[1]
				});
				var hzbgPost = $.ajax({
					type:"post",
					url:app.postUrls.updateHJSJWJ,
					async:true,
					dataType:'json',
					data:formDatas[2]
				});
				
				var tjsjPost = $.ajax({
					type:"post",
					url:app.postUrls.updateHJSJWJ,
					async:true,
					dataType:'json',
					data:formDatas[3]
				});
				var qssjPost = $.ajax({
					type:"post",
					url:app.postUrls.updateHJSJWJ,
					async:true,
					dataType:'json',
					data:formDatas[4]
				});
				var wzbgPost = $.ajax({
					type:"post",
					url:app.postUrls.updateHJSJWJ,
					async:true,
					dataType:'json',
					data:formDatas[5]
				});
				var qtzlPost = $.ajax({
					type:"post",
					url:app.postUrls.updateHJSJWJ,
					async:true,
					dataType:'json',
					data:formDatas[6]
				});
				
				$.when(slsjPost,sgsjPost,hzbgPost,tjsjPost,qssjPost,wzbgPost,qtzlPost).then(function(res1,res2, res3, res4, res5, res6, res7){
					if(res1[0].status=="success"&&res2[0].status=="success"&&res3[0].status=="success"&&res4[0].status=="success"&&res5[0].status=="success"&&res6[0].status=="success"&&res7[0].status=="success"){
						
						var title="系统信息";
						var content="数据文件信息修改成功！";
						var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
						
						$("#modalTitleSJWJ").html(title);
						$("#modalContentSJWJ").html(content);
						$("#modalFooterSJWJ").html(footer);
						
						$("#dialogModalSJWJ").modal({backdrop:'static', keyboard:false, show:true});
						
					}
					
				}, function(){
					//console.log("添加数据文件报错", err);
					var title="系统信息";
					var content="数据文件修改出错！";
					var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
					
					$("#modalTitleSJWJ").html(title);
					$("#modalContentSJWJ").html(content);
					$("#modalFooterSJWJ").html(footer);
					
					$("#dialogModalSJWJ").modal({backdrop:'static', keyboard:false, show:true});
				});
								
			}
			
			
						
			
		});
		//获取数据文件信息的接口，判断是增加数据文件信息还是更新
		function checkSJWJ(){
			if(xxbms&&xxbms.length==7){
				return true;
			}else{
				return false;
			}
			
		}
		function submitWJB(data){
			console.log("verst",data);
			var formData = {
				"sjbbm":app.sjbbm||"6",
				"wjlb": data.wjlxT||"1009006",
				"wjsl": data.wjslT||"360",
				"wjdx": data.wjdxT||"3231111003",
				"wjms": data.wjmsT||"test1"
				
			};
			
			$.ajax({
				type:"post",
				url:app.postUrls.addSJWJXX,
				async:true,
				dataType:'json',
				data:formData
			}).then(function(res){
				console.log("数据文件提交结果",res);
				if(res.status.trim() == "success"){
					var title="系统信息";
					var content="文件信息保存成功！";
					var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
					
					$("#modalTitleSJWJ").html(title);
					$("#modalContentSJWJ").html(content);
					$("#modalFooterSJWJ").html(footer);
					
					$("#dialogModalSJWJ").modal('show');
				}
			});
		}
		
		$('#sjwjTable').editableTableWidget();
				
		$("#sjwjTable tbody tr").find("td:gt(0):lt(2)").on("validate", function(evt,newValue){
			if(isNaN(newValue)){
				var title="错误信息";
				var content="数据类型错误,不是数字类型！";
				var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
				$(this).html("0");
				$("#modalTitleSJWJ").html(title);
				$("#modalContentSJWJ").html(content);
				$("#modalFooterSJWJ").html(footer);
				
				$("#dialogModalSJWJ").modal('show');
			    return false;
			}
			
			
			
		});
		$("#sjwjTable tbody tr").find("td:eq(0)").on('change', function(evt, newValue) {
			// do something with the new cell value 
			
			return false; // reject change
			
		});
				
		
    }
    
})(jQuery);
