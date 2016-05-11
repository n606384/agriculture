(function ($) {
    
    $.processSJWJ = function(app){
		console.log("seg-3.js传入app",app);
		//this.init(app);
		init();	
		app.hjyyProgress = 3;
		
	}
    var formData= {};
    function init(){
    	
    	$("#countySpanSJB").html(app.xianName);
		//事件绑定
		//修改事件
		$("#updateBtnSJWJ").on('click', function(){
			//enableInput();
			
		});
		//保存事件
		$("#saveBtnSJWJ").on('click', function(){
			var tableData = [];
			$('#sjwjTable tbody tr').each(function(rowNum){
//				alert("行号"+$(this).index());	
				var obj = {};
				
				obj.wjlxT = $(this).children('td:eq(0)').data("id");
				obj.wjslT = $(this).children('td:eq(1)').text();
				obj.wjdxT = $(this).children('td:eq(2)').text();
				obj.wjmsT = $(this).children('td:eq(3)').text();
				
				tableData.push(obj);
												
			});
			console.log("data",tableData);
			
			//判断是增加还是修改
			if(checkSJWJ()){
				for(var i = 0;i<tableData.length;i++){
					
					submitWJB(tableData[i]);
				}
			}else{
				
			}
			
			
						
			
		});
		//获取数据文件信息的接口，判断是增加数据文件信息还是更新
		function checkSJWJ(sjbbm){
			return true;
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
//				url:"http://192.168.44.231:5000/hjyy/addSJWJXX?token=dd",
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
		$("#sjwjTable tbody td").on('validate', function(evt,newValue){
			//console.log("#sjwjTable td",evt,newValue);
			if(isNaN(newValue)){
				var title="错误信息";
				var content="数据类型错误,不是数字类型！";
				var footer = "<button  type='button' class='btn btn-default' data-dismiss='modal'>确定</button>";
				$(this).html("0");
				$("#modalTitleSJWJ").html(title);
				$("#modalContentSJWJ").html(content);
				$("#modalFooterSJWJ").html(footer);
				
				$("#dialogModalSJWJ").modal('show');
			    
			}
		});
		
		/*
		$("#sjwjTable").bootstrapTable({
			
			columns: [{
		        field: 'type',
		        title: '文件类别',
		        width:15%
		    }, {
		        field: 'count',
		        title: '文件数量',
		        width:22.5%,
		        editable:{
		        	type:'text',
		        	validate:function(value){
		        		if($.trim(value)==''){
		        			return '测量值不能为空';
		        		}
		        	}
		        }
		    }, {
		        field: 'size',
		        title: '文件大小',
		        width:22.5%,
		        editable:{
		        	type:'text',
		        	validate:function(value){
		        		if($.trim(value)==''){
		        			return '测量值不能为空';
		        		}
		        	}
		        }
		    },
			{
		        field: 'des',
		        title: '文件描述',
		        width:45%,
		        editable:{
		        	type:'text',
		        	validate:function(value){
		        		if($.trim(value)==''){
		        			return '测量值不能为空';
		        		}
		        	}
		        }
		    }],
		    data: [{
		        type: '矢量数据',
		        count: '0',
		        size: '0',
		        des:"描述信息"
		    }, {
		        type: '栅格数据',
		        count: '0',
		        size: '0',
		        des:"描述信息"
		    },{
		        type: '汇总数据',
		        count: '0',
		        size: '0',
		        des:"描述信息"
		    },{
		        type: '图件数据',
		        count: '0',
		        size: '0',
		        des:"描述信息"
		    },{
		        type: '权属数据',
		        count: '0',
		        size: '0',
		        des:"描述信息"
		    },{
		        type: '文字报告',
		        count: '0',
		        size: '0',
		        des:"描述信息"
		    },{
		        type: '其他数据',
		        count: '0',
		        size: '0',
		        des:"描述信息"
		    }]
   		});
   		*/
    }
    
})(jQuery);
