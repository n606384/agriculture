(function($){
		
	var tableStr = null;
	var state = null
	var totalCount = null;		//数据包简要信息总条数
	var firstPageValue = null;	//可见范围内最后一页
	var lastPageValue = null;	//可见范围内第一页
	var totalPage = null;	//总页数

	$.hjclProcess = function(){
		
		initPage();
		
	}
	function centerModals(){
	    $('#updateModal').each(function(i) {
	        var $clone = $(this).clone().css('display', 'block').appendTo('body'); var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);   
	        top = top > 0 ? top : 0;   
	        $clone.remove();   
	        $(this).find('.modal-content').css("margin-top", top);
	    });
	}
	function initPage(){
		
		getSJBXX(1);
		getTotalCount();
		
		$('#updateModal').on('show.bs.modal', centerModals);
					
		$("#updateModal").draggable({
		    handle: ".modal-header",   
		    cursor: 'move',   
		    refreshPositions: false  
		}); 
	}
	
	//获取数据包简要信息总条数
	function getTotalCount(){
		$.ajax({
			type: 'POST',
            url: 'http://192.168.44.232:8080/rest/hjgl/getSJBCount?token=aa',
            data: {},
            dataType: 'json',
            success:function(success){
            	totalCount = success.count;
            }
		})
		
	}

	//请求http://192.168.44.231:8080/rest/hjgl/getSJBXX接口，调用接受数据包
	function getSJBXX(nowpage){
		$.ajax({
            type: 'POST',
            url: 'http://192.168.44.232:8080/rest/hjgl/getSJBJYXX?token=aa',
            data: {ssqx:"0",page:nowpage},
            dataType: 'json',
            success: function (result) {
            	 //数据返回成功
                 console.log(result);

               	for(var i = 0;i<result.sjbxx.length;i++){
               		switch(result.sjbxx[i].sjbzt){
               			case 1008001:state="初审未通过";break;
               			case 1008002:state="待质检";break;
               			case 1008003:state="质检通过";break;
               			case 1008004:state="质检未通过";break;
               			case 1008005:state="数据退回";break;
               			case 1008006:state="数据已汇交";break;
               		}

               		tableStr += "<tr><td>"+result.sjbxx[i].hjrxm+"</td><td>"+result.sjbxx[i].sjbbm+"</td><td>"+result.sjbxx[i].sjbmc+"</td><td>"+state+"</td><td>"+result.sjbxx[i].tjsj+"</td><td>"+result.sjbxx[i].zhclr+"</td>";
               		tableStr += "<td><button class='updataInfo'>修改</button><button class='check' >质检</button></td></tr>";
               	}
               	
               	$('#content').html(tableStr);

               	tableStr = null;
               	state = null;

				
				
               	//修改按钮点击事件
               	$('.updataInfo').click(function(){
               		 
					  
					
					$('#updateModal').modal('show');
					
				});	
				
				//修改按钮点击事件
               	$('.check').click(function(){
               		$("#updateModal").draggable({   
					    handle: ".modal-header",   
					    cursor: 'move',   
					    refreshPositions: false 
					});
					$('#updateModal').modal('show');
					  
					
				});	

               	//给表格中的每一个值添加鼠标点击事件
               	$("#InfoTable tbody tr").each(function(i){
				    
				    $(this).click(function(i){
				 	   var text = $(this).children("td").eq(1).text();
				 	   
				 	   getUpdateInfo(text);
				    });

				});

				//动态加载页码
				totalPage = totalCount/20;

				totalPage = 14; 		//测试数据
				if(totalPage > 4){
					firstPageValue = 0;
					lastPageValue = 4;
					setPageStyle(firstPageValue,lastPageValue);
				}else{
					firstPageValue = 0;
					lastPageValue = totalPage;
					setPageStyle(firstPageValue,lastPageValue);
				}
				
				


				
            }
        });
	}
			

			//自定义页码标签页
			function setPageStyle(firstPage,lastPage){
				console.log("firstPage",firstPage);
				console.log("lastPage",lastPage);
				$('.pagination').html("");
				$('.pagination').append('<li class="page-first"><a href="javascript:void(0)"><<</a></li>');
				$('.pagination').append('<li class="page-pre"><a href="javascript:void(0)"><</a></li>');
				for(var i = firstPage;i <= lastPage;i++){
					$('.pagination').append('<li class="page-number"><a href="javascript:void(0)">'+(i+1)+'</a></li>');
				}
				$('.pagination').append('<li class="page-next"><a href="javascript:void(0)">></a></li>');
				$('.pagination').append('<li class="page-last"><a href="javascript:void(0)">>></a></li>');
				//添加分页功能
				setPagePower();
			}

			//自定义分页中个按钮功能
			function setPagePower(){
				//定义首页功<<能
				$('.page-first').click(function(event) {
					if(totalPage > 4){
						firstPageValue = 0;
						lastPageValue = 4;
						setPageStyle(firstPageValue,lastPageValue);
					}else{
						firstPageValue = 0;
						lastPageValue = totalPage;
						setPageStyle(firstPageValue,lastPageValue);
					}
				});
				//定义上一也<功能
				$('.page-pre').click(function(event) {
					if(firstPageValue>0){
						firstPageValue = firstPageValue - 1;
						lastPageValue = lastPageValue - 1;
						setPageStyle(firstPageValue,lastPageValue);
					}else{
						console.log("已经到首页了");
					}
					
				});
				//定义下一页>功能
				$('.page-next').click(function(event) {
					if(lastPageValue<totalPage){
						firstPageValue = firstPageValue + 1;
						lastPageValue = lastPageValue + 1;
						setPageStyle(firstPageValue,lastPageValue);
					}else{
						console.log("已经到末页了");
					}
					
				});
				//定义最后一页>>功能
				$('.page-last').click(function(event) {
					console.log("totalPage",totalPage);
					if(totalPage > 4){
						firstPageValue = totalPage - 4;
						lastPageValue = totalPage;
						setPageStyle(firstPageValue,lastPageValue);
					}else{
						firstPageValue = 0;
						lastPageValue = totalPage;
						setPageStyle(firstPageValue,lastPageValue);
					}
				});
				//定义每一个点击功能
				$('.page-number a').click(function(event) {
					console.log($(this).html());
				});
			}

			//获取要修改的单条数据
			function getUpdateInfo(getsjbbm){
				// console.log(getsjbbm);
				$.ajax({
                    type: 'POST',
                    url: 'http://192.168.44.232:8080/rest/hjgl/getSJBXXXX?token=aa',
                    data: {sjbbm:getsjbbm},
                    dataType: 'json',
                    success: function (result) {
                    	 //数据返回成功,并未选择框赋值
                    	 console.log("汇交人姓名",result);
                    	 // console.log(result.xxxx);
                         $('#hjrxm').val(result.xxxx.hjry.hjrxm);
                         $('#hjrybm').val(result.xxxx.hjry.hjrybm);
                         $('#lxdh').val(result.xxxx.hjry.lxdh);
                         $('#lxyx').val(result.xxxx.hjry.lxyx);
                         $('#txdz').val(result.xxxx.hjry.txdz);
                         $('#hjdwbm').val(result.xxxx.hjdw.hjdwbm);
                         $('#hjdwdz').val(result.xxxx.hjdw.hjdwdz);
                         $('#hjdwmc').val(result.xxxx.hjdw.hjdwmc);
                         // 1003001：农业系统用户,1003002:开发商
						switch(result.xxxx.hjdw.hjdwxz){
							case 1003001:$('#hjdwxz').val("农业系统用户");break;
							case 1003002:$('#hjdwxz').val("开发商");break;
						}

                         //数据包信息
                         $('#ccwz').val(result.xxxx.sjb.ccwz);
                         $('#cjry').val(result.xxxx.sjb.cjry);
                         $('#cjsj').val(result.xxxx.sjb.cjsj);
                         $('#hjsjbjz').val(result.xxxx.sjb.hjsjbjz);
                         $('#sjbbm').val(result.xxxx.sjb.sjbbm);
                         $('#sjbdx').val(result.xxxx.sjb.sjbdx);
                         $('#sjblx').val(result.xxxx.sjb.sjblx);
                         $('#sjbmc').val(result.xxxx.sjb.sjbmc);
                         $('#sjbms').val(result.xxxx.sjb.sjbms);
                         $('#sjbzt').val(result.xxxx.sjb.sjbzt);
                         $('#ssqx').val(result.xxxx.sjb.ssqx);
                         $('#tjsj').val(result.xxxx.sjb.tjsj);
                         $('#wjzs').val(result.xxxx.sjb.wjzs);
                         $('#zhclsj').val(result.xxxx.sjb.zhclsj);
                         $('#zhclry').val(result.xxxx.sjb.zhclyhbm);
                    }
                });

                //保存x修改后数据
				$('#updateSubmit').click(function(){
					$.ajax({
	                    type: 'POST',
	                    url: 'http://192.168.44.232:8080/rest/hjgl/updateSJBXX?token=aa',
	                    data: {sjbbm:$('#sjbbm').val(),sjblx:$('#sjblx').val(),hjrybm:$('#hjrybm').val(),ssqx:$('#ssqx').val(),sjbzt:$('#sjbzt').val(),hjsjbjz:$('#hjsjbjz').val(),sjbmc:$('#sjbmc').val(),sjbdx:$('#sjbdx').val(),wjzs:$('#wjzs').val(),ccwz:$('#ccwz').val(),sjbms:$('#sjbms').val() },
	                    dataType: 'json',
	                    success: function (result) {
	                    	console.log("修改成功",result);
	                    }
	                });
				});
			}

			//弹出框中的标签页
			$('#myTabs a[href="#profile"]').tab('show'); // Select tab by name
			$('#myTabs a:first').tab('show'); // Select first tab
			$('#myTabs a:last').tab('show'); // Select last tab
	
})(jQuery)
