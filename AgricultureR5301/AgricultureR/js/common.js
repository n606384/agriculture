function getApp(){
	
	var app = window.app = {};

	app.hjyyProgress = 1;
	app.postUrls = 
		{
			//1	用户登录验证接口
			"login":"http://192.168.44.232:8080/rest/login",
			//2	汇交预约数据提交单位查询接口
			"getHJDWRYXX":"http://192.168.44.232:8080/rest/hjyy/getHJDWRYXX",
			//3	汇交预约数据提交用户查询接口
			"getHJRYXX":"http://192.168.44.232:8080/rest/hjyy/getHJRYXX",
			//4	汇交预约数据提交用户增加接口
			"addhjyyyh":"http://192.168.44.232:8080/rest/ hjyy/addhjyyyh",
			//5	汇交预约数据包增加接口
			"addSJBXX":"http://192.168.44.232:8080/rest/hjyy/addSJBXX",
			//6	汇交预约数据文件增加接口
			"addSJWJXX":"http://192.168.44.232:8080/rest/hjyy/addSJWJXX",
			//7	汇交预约数据包状态更改接口
			"updateHJSBZT":"http://192.168.44.232:8080/rest/hjyy/updateHJSBZT",
			//8	新增系统用户接口
			"addXTUser":"http://192.168.44.232:8080/rest/user/add",
			//9	修改系统用户接口
			"updateXTUser":"http://192.168.44.232:8080/rest/user/update",
			//10	删除系统用户接口
			"deleteXTUser":"http://192.168.44.232:8080/rest/user/delete",
			//11	获取系统用户信息接口
			"getXTUser":"http://192.168.44.232:8080/rest/user/getUser",
			//12	验证系统用户名是否存在接口
			"checkXTUser":"http://192.168.44.232:8080/rest/user/check",
			//13	获取系统日志记录数量接口
			"getlogCount":"http://192.168.44.232:8080/rest/xtrz/getlogCount",
			//14	获取系统日志记录信息接口
			"getlogInfo":"http://192.168.44.232:8080/rest/xtrz/getlogInfo",
			//15	上传解析权属单位编码信息接口
			"uploadQSDWDMB":"http://192.168.44.232:8080/rest/hzbg/uploadQSDWDMB",
			//16	上传解析地块汇总表接口
			"uploadDKHZB":"http://192.168.44.232:8080/rest/hzbg/uploadDKHZB",
			//17	上传解析承包地是否基本农田接口
			"uploadCBDSFJBNT":"http://192.168.44.232:8080/rest /hzbg/uploadCBDSFJBNT",
			//18	上传解析按权证信息汇总表接口
			"uploadQZXXHZ":"http://192.168.44.232:8080/rest/hzbg/uploadQZXXHZ",
			//19	上传解析承包地土地用途汇总表接口
			"uploadCBTDYT":"http://192.168.44.232:8080/rest/hzbg/uploadCBTDYT",
			//20	上传解析按承包方汇总表接口
			"uploadCBFHZ":"http://192.168.44.232:8080/rest/hzbg/uploadCBFHZ",
			//21	上传解析按非承包地地块类别汇总表接口
			"uploadFCBDDKLB":"http://192.168.44.232:8080/rest/hzbg/uploadFCBDDKLB",
			//22	获取汇交数据包表记录数量接口
			"getSJBCount":"http://192.168.44.232:8080/rest/hjgl/getSJBCount",
			//23	获取汇交数据包简要信息接口
			"getSJBJYXX":"http://192.168.44.232:8080/rest/hjgl/getSJBJYXX",
			//24	获取汇交数据包详细信息接口
			"getSJBXXXX":"http://192.168.44.232:8080/rest/hjgl/ getSJBXXXX",
			//25	修改汇交数据文件详细信息接口
			"updateHJSJWJ":"http://192.168.44.232:8080/rest/hjgl/updateHJSJWJ",
			//26	查询汇交单位信息接口
			"getHJDW":"http://192.168.44.232:8080/rest/hjgl/getHJDW",
			//27	修改汇交单位信息接口
			"addhjyyyh":"http://192.168.44.232:8080/rest/hjyy/addhjyyyh"		
			
		};
		
		return app;
	
}

	

