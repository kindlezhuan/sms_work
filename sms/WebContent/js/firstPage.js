//***************************************��������ģ��start*************************************
var data;
var loginName;
var ids;
var store1;
var oninit=1;
function CallWebService(method, params, onSuccess, onFailure) {
	Ext.Ajax.request({
		type : "POST", // ��������
		url : method, // WebService ��ַ�ͷ���
		params : params,
		success : onSuccess,
		failure : onFailure
	// ִ��ʧ��
	});
};

// ɾ������
function delNotice(id) {
	ids = id;
	Ext.MessageBox.show({
		title : '��ʾ',
		msg : 'ȷ��Ҫɾ����',
		buttons : Ext.MessageBox.YESNO,
		fn : ExitSystem,
		animEl : 'ReleaseSuper',
		icon : Ext.MessageBox.QUESTION
	});
};
/*
 * ɾ���ж�
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
			alert("ɾ������!");
		}
	} else {
		Ext.MessageBox.alert("��ʾ", "ɾ��ʧ��!");
	}
};
function onSuccess2(request, options) {
	var result = request.responseText;
	var requestText = eval("(" + result + ")");
	var msg_no = requestText.msg_no;
	switch (msg_no) {
	case "0":
		parent.Ext.Msg.alert("��ʾ", "ɾ���ɹ�");
		parent.frames["content"].store1.reload();
		break;
	default:
		parent.Ext.Msg.alert("��ʾ", "ɾ��ʧ��!");
		loadflag = false;
		break;
	}
}


// *************************************������Ϣstore********************************************

