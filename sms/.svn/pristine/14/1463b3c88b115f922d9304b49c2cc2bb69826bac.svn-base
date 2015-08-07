//***************************************数据请求模块start*************************************
var data;
var loginName;
var ids;
var store1;
var oninit=1;
function CallWebService(method, params, onSuccess, onFailure) {
	Ext.Ajax.request({
		type : "POST", // 发送数据
		url : method, // WebService 地址和方法
		params : params,
		success : onSuccess,
		failure : onFailure
	// 执行失败
	});
};

// 删除公告
function delNotice(id) {
	ids = id;
	Ext.MessageBox.show({
		title : '提示',
		msg : '确定要删除吗？',
		buttons : Ext.MessageBox.YESNO,
		fn : ExitSystem,
		animEl : 'ReleaseSuper',
		icon : Ext.MessageBox.QUESTION
	});
};
/*
 * 删除判断
 */
function ExitSystem(confirmResult) {
	if (confirmResult == "yes") {
		try {
			setTimeout(function() {
				CallWebService("firstPage/zf_todelNotice.do"
				, {
					"notice.ggid" : ids
				}, onSuccess2, null);
			}, 500);
		} catch (e) {
			alert("删除出错!");
		}
	} else {
		Ext.MessageBox.alert("提示", "删除失败!");
	}
};
function onSuccess2(request, options) {
	var result = request.responseText;
	var requestText = eval("(" + result + ")");
	var msg_no = requestText.msg_no;
	switch (msg_no) {
	case "0":
		parent.Ext.Msg.alert("提示", "删除成功");
		parent.frames["content"].store1.reload();
		break;
	default:
		parent.Ext.Msg.alert("提示", "删除失败!");
		loadflag = false;
		break;
	}
}


// *************************************公告信息store********************************************

