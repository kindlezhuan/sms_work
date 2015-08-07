<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>首页</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge charset=UTF-8" />
    <link href="ext-4.2.1/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
    <script src="ext-4.2.1/ext-all-debug.js" type="text/javascript"></script>
    <!-- <script src="ExtJs/ext-all.js" type="text/javascript"></script> -->
    <script src="ext-4.2.1/locale/ext-lang-zh_CN.js" type="text/javascript"></script>
    <script src="js/showWindow.js"></script>
    <script src="js/firstPage.js" charset=UTF-8></script>
</head>
<body>
	<input id="loginName2" type="hidden" value="${wf_loginData.dlm}"></input>
	<input id="rylb" type="hidden" value="${wf_loginData.rylb}"></input>
</body>
</html>
