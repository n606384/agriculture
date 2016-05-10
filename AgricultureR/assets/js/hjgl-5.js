(function($){
	var highlightcolor='#E0F2FE';
	var clickcolor='#66AFE9';
	var obj = null;
	var flag = null;
	
	$.xtglProcess = function(){
		
		console.log("进入系统管理模块");
		initialize();
	}
	
	function initialize(){
		console.log("开始初始化系统管理页面，initialize");
		//填充表格
		fullfillTable();		
		
		$("#addUser").on('click',addUser);
		$("#delUser").on('click',delUser);
		$("#updateUser").on('click',updateUser);
		
	}
	//增加用户弹出框
	function addUser(){
		flag = 0;	//flag = 0为新增
		$('#exampleModal').modal("show");
		$("#tijiao").on("click",tijiaoFun);
	}
	//修改用户弹出框
	function updateUser(){
		
	}
	//删除用户操作
	function delUser(){
		
	}
	//增加用户，提交
	function tijiaoFun(){
		
		//增加用户时，点击提交按钮时对用户所填信息的判断		    
	  	 var usernameValue = $("#username").val();              
	      var passwordValue = $("#password").val();              
	      var xmValue=$("#xm").val();              
	      var yxValue=$("#yx").val();              
	      var dhValue=$("#dh").val();              
	      var bzValue=$("#bz").val();    	              
	      var yhjs=$('#Adds option:selected').val(); 
	      console.log("yhjs:",yhjs);
	      if(yhjs=="系统管理员"){
	      	yhjsValue="1002001";
	      }
	      else if(yhjs=="系统用户"){
	      	yhjsValue="1002002";
	      }
	      var jsbzValue=$("#jsbz").val();
	      if(!usernameValue||!passwordValue||!bzValue||!jsbzValue||!dhValue||!yxValue||!xmValue){
	      	alert("请填写完整信息");             	
	      	return;
	      } 
	  if(flag == 0){
	  	//新增
	  	//增加用户时，点击提交按钮，验证用户名的重复性
	  var yzPostUrl="http://192.168.44.232:8080/rest/user/check?token="+"eyJhbGciOiJIUzI1NiIsImV4cCI6MTQ2MTc0Mjg4NSwiaWF0IjoxNDYxNzQyMjg1fQ.eyJpZCI6MTAwMDF9.waV41feUgDKbXyTy4H0yj4mCLWw6x1EakXaeJvKMgjg";
	  console.log("yzPostUrl",yzPostUrl,usernameValue);
	  $.ajax({
	  	type:"post",
	  	url:yzPostUrl,
	  	async:true,
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
	  	var AddPostUrl="http://192.168.44.232:8080/rest/user/add?token="+"eyJhbGciOiJIUzI1NiIsImV4cCI6MTQ2MTc0Mjg4NSwiaWF0IjoxNDYxNzQyMjg1fQ.eyJpZCI6MTAwMDF9.waV41feUgDKbXyTy4H0yj4mCLWw6x1EakXaeJvKMgjg";
	    console.log("AaddPostUrl", AddPostUrl);
	$.ajax({
		type:"post",
		url:AddPostUrl,
		async:true,
		data:{
		    "dlm":usernameValue,
			"mm":passwordValue,
			"xm" : xmValue||"a",
			"yx" : yxValue||"a",
			"dh" : dhValue||"a",
			"bz" : bzValue||"a",
			"yhjs" : yhjsValue||"a",
			"jsbz" : jsbzValue||"a"
			},
		success:function(res){
			console.log("添加用户",res);	
			$('#exampleModal').modal('hide');
			fullfillTable();
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
	  	var XGPostUrl="http://192.168.44.232:8080/rest/user/update?token="+"eyJhbGciOiJIUzI1NiIsImV4cCI6MTQ2MTc0Mjg4NSwiaWF0IjoxNDYxNzQyMjg1fQ.eyJpZCI6MTAwMDF9.waV41feUgDKbXyTy4H0yj4mCLWw6x1EakXaeJvKMgjg";
	  	console.log("XGPostUrl",XGPostUrl);
	  	$.ajax({
	  		type:"post",
	  		url:XGPostUrl,
	  		async:true,
	  		dataType:'json',
	  		data:{
	  			"yhbm":obj.yhbm,
	  			"dlm":usernameValue,
				//"mm":passwordValue,
				"xm" : xmValue||"a",
				"yx" : yxValue||"a",
				"dh" : dhValue||"a",
				"bz" : bzValue||"a",
				"yhjs" : yhjsValue||"a",
				"jsbz" : jsbzValue||"a"
	  		},
	  		success:function(data){
	  			console.log("修改用户：",data);
	  			if(data.status == "success"){
	  			$('#exampleModal').modal('hide');
			fullfillTable();	
	  			}else{
	  			alert("信息修改错误");
	  			}
	  			
	  		},
	  		error:function(err){
			console.log("err",err);
		}
	  	});
	  }                                                                                          	
              
	}
	//获取getuser，动态生成表格并显示
	function fullfillTable(){
		var postUrl = "http://192.168.44.232:8080/rest/user/getUser?token="+"eyJhbGciOiJIUzI1NiIsImV4cCI6MTQ2MTc0Mjg4NSwiaWF0IjoxNDYxNzQyMjg1fQ.eyJpZCI6MTAwMDF9.waV41feUgDKbXyTy4H0yj4mCLWw6x1EakXaeJvKMgjg";
		console.log("postUrl", postUrl);
		$.getJSON(postUrl,function(data){//使用getJson()方法发送请求并接收Json格式数据					
		var data = data;//获取响应数据
		var str ="<table id='UserTable' class='table table-striped'><thead><th>电话</th><th>邮箱</th><th>用户编码</th><th>姓名</th><th>登录名</th><th>用户角色</th><th>角色备注</th><th>备注</th>";
		str+="</thead><tdoby>";
		for(var i = 0; i<data.length;i++){
			str+="<tr>";
			str+="<td>"+data[i]['dh']+"</td><td>"+data[i]['yx']+"</td><td>"+data[i]['yhbm']+"</td><td>"+data[i]['xm']+"</td><td>"+data[i]['dlm']+"</td><td>"+data[i]['yhjs']+"</td><td>"+data[i]['jsbz']+"</td><td>"+data[i]['bz']+"</td>";
			str+="</tr>";	
			}					
		str+="</tbody></table>";					
		console.log(str);
		$("#UserTable-div").html(str);//把临时字符串以HTml格式嵌入到div元素中显示	
		
																			
			//获取用户点击某一行信息时该行全部单元格的数据\n						
			obj = new Object();						
			$("#UserTable tbody tr").each(function(i){						    
			    $(this).click(function(i){
			    	$("#UserTable tbody tr").css("background-color","");
			    $(this).css("background-color","#99FFCC");
			    
			 	  obj.dh = $(this).children("td").eq(0).text();
			 	  obj.yx = $(this).children("td").eq(1).text();
			 	  obj.yhbm = $(this).children("td").eq(2).text();
			 	  obj.xm = $(this).children("td").eq(3).text();
			 	  obj.dlm = $(this).children("td").eq(4).text();
			 	  obj.yhjs = $(this).children("td").eq(5).text();
			 	  obj.jsbz = $(this).children("td").eq(6).text();
			 	  obj.bz = $(this).children("td").eq(7).text();
			 	  console.log(obj);
			 	  //$("#usename").val()=$(this).children("td").eq(0).text();						 	   
			    });
			});			
		});
	}
	
	
})(jQuery)
