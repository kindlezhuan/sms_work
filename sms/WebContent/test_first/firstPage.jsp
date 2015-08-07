<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
<base href="<%=basePath%>">
<title>首頁</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge charset=UTF-8" />
    <link href="ext-4.2.1/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
   <script src="ext-4.2.1/ext-all.js" type="text/javascript"></script> 
    <!-- <script src="ExtJs/ext-all.js" type="text/javascript"></script> -->
    <script src="ext-4.2.1/locale/ext-lang-zh_CN.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/firstPage/contorl/cl_app.js"></script>
   <script type="text/javascript" src="webConfig.js" charset=UTF-8></script>
</head>
<body>
	<input id="username" type="hidden" value="${sms_loginData.name}"></input>
</body>
</html>