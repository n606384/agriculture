(function($){
	
	$.listData = function(app){
		init();
	}
	function init(){
		
		$("#countySpan_tjxq").html(app.xianName||"***省***市***县"+"数据提交详情");
//		printTJZMHJYY
		console.log("app",app);
		if(app.hjyhData&&app.sjbData&&app.sjwjData){
			var user = app.hjyhData;
			var sjb = app.sjbData;
			var sjwj = app.sjwjData;
			//提交用户信息
			$("#hjrxm_hjyhdl").html(user.hjrxm);
			$("#lxdh_hjyhdl").html(user.lxdh);
			$("#lxyx_hjyhdl").html(user.lxyx);
			$("#txdz_hjyhdl").html(user.txdz);
			$("#hjdwmc_hjyhdl").html(user.hjdwmc);
			$("#hjdwxz_hjyhdl").html(user.hjdwxz);
			$("#hjdwdz_hjyhdl").html(user.hjdwdz);
			//数据包信息
			
			$("#sjbmc_sjbdl").html(sjb.sjbmc);
			$("#sjblx_sjbdl").html(sjb.sjblx);
			$("#hjsjbjz_sjbdl").html(sjb.hjsjbjz);
			$("#sjbdx_sjbdl").html(sjb.sjbdx);
			$("#wjzs_sjbdl").html(sjb.wjzs);
			$("#ccwz_sjbdl").html(sjb.ccwz);
			$("#sjbms_sjbdl").html(sjb.sjbms);
			
			
			//数据文件信息
			$("#slsjdl").html("文件数量:"+sjwj[0].wjslT+"个;\t文件大小:"+sjwj[0].wjdxT+"KB;\t描述:"+sjwj[0].wjmsT);
			$("#sgsjdl").html("文件数量:"+sjwj[1].wjslT+"个;\t文件大小:"+sjwj[1].wjdxT+"KB;\t描述:"+sjwj[1].wjmsT);
			$("#hzbgdl").html("文件数量:"+sjwj[2].wjslT+"个;\t文件大小:"+sjwj[2].wjdxT+"KB;\t描述:"+sjwj[2].wjmsT);
			
			$("#tjsjdl").html("文件数量:"+sjwj[3].wjslT+"个;\t文件大小:"+sjwj[3].wjdxT+"KB;\t描述:"+sjwj[3].wjmsT);
			$("#qssjdl").html("文件数量:"+sjwj[4].wjslT+"个;\t文件大小:"+sjwj[4].wjdxT+"KB;\t描述:"+sjwj[4].wjmsT);
			$("#wzbgdl").html("文件数量:"+sjwj[5].wjslT+"个;\t文件大小:"+sjwj[5].wjdxT+"KB;\t描述:"+sjwj[5].wjmsT);
			$("#qtzldl").html("文件数量:"+sjwj[6].wjslT+"个;\t文件大小:"+sjwj[6].wjdxT+"KB;\t描述:"+sjwj[6].wjmsT);
			
			
		}
		
	}
	
})(jQuery)
