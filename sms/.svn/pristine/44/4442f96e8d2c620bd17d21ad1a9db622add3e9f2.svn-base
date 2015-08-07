
function loginAction () {
	
	var username=$("#username").val();
	if (username == null||username=="") {	
		alert("请输入用户名!");
		$("#username").focus();
		return false;
	}

	var password=$("#password").val();
	if (password == null||password=="") {	
		alert( "请输入密码!");
		$("#password").focus();
		return false;
	}
	
	try {
		 $.ajax({
	   			url:'login.do',
	   			data:{
	   				"username":username,
	   				"passWord":password
					},
	   			type:'POST',
	   			dataType: 'json',
	   			async :true ,
	   			success:function(requestText){
					var msg_no = requestText.msg_no;
					switch (msg_no) {
						case "0":
							location.href = "toFirstPage.do";
							break;
						case "-1": 
							alert("数据库连接错误，请联系管理员 !");
						    $("username").setValue("");
							$("password").setValue(""); 
							$("username").focus();
							loadflag = false;
							break;
						case "-2":
							alert("用户名或密码错误!");
						    $("username").setValue(""); 
							$("password").setValue(""); 
							$("username").focus();
							loadflag = false;
							break;
						case "-3":
							alert("对不起，你所登陆的账号正在审核中...");
							loadflag = false;
							break;
						case "-9":
							alert("对不起，你所登陆的账号审核失败，是否重新申请...");
							loadflag = false;
							break;
						default:
							alert("提示", "验证失败!");
							loadflag = false;
							break;
					}
									
	   			},
	   			error:function(request,status,error){
	   				alert("保存失败");
	   			}
	   		});



	}
	catch (e) {
		alert(e);
	}
};



document.onkeydown = function (e) {
	if (!e) e = window.event;
	if ((e.keyCode || e.which) == 13) {
		loginAction();
	}
};

