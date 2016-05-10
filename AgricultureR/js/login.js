$(function(){
	var app={};
	$('#login').submit(function(e){
		
		var flag = false;
		var name = $('#name').val();
		var mm = $('#passport').val();
		$.ajax({
			type:"post",
			url:"http://192.168.44.232:8080/rest/login",
			async:true,
			data:$('#login').serialize(),
			dataType:"json",
			success:function(res){	
				console.log("进入登录页面",res);
				if(res.login === "success"){
					app.token = res.token;
					app.serId = res.id;
					console.log(app.token);
					flag = true;
					window.location.href = "hjyy.html?token="+app.token;
					$.ajax({
						type:"post",
						url:"http://192.168.44.232:8080/rest/hjyy/getHJDWRYXX?token="+app.token,
						async:true,
						data:{
							"ssqx":110105
						},
						success:function(data){
							console.log("用户列表",data);
						}
					});
				}else if(res.login === "error"){
					document.getElementById("tips").innerText = "用户名或密码错误，请重新输入！";
					$('#tips').text("用户名或密码错误，请重新输入！");
				}
				
			},
			error:function(err){
				
				flag = false;
			}
			
		});
		return flag;
  	});
});