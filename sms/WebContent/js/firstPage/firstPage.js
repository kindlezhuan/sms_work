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



// ***************************************��������ģ��end***************************************
Ext.onReady(function() {


	Ext.QuickTips.init();
	// Ext.MessageBox.alert('��ʾ��','������ȡ���ݣ����Ժ�...');
	Ext.Msg.show({
		title : '��ʾ��',
		msg : '������ȡ���ݣ����Ժ�...'
	// buttons: Ext.Msg.YESNOCANCEL,
	// icon: Ext.Msg.QUESTION
	});
	loginName = document.getElementById("loginName2").value;
	CallWebService("firstPage/fp_queryUnfinishedLD.do", null, function(request,
			opt) {
		result = Ext.JSON.decode(request.responseText);
		this.data = result.data;
		Ext.MessageBox.hide();
		buildForm(data);

	}, null);

	// ==============================ҳ�沼��end==================================================

});

/**
 * ��ʾ����
 * 
 * @param v
 *            ѡ������
 */
function showMore(v) {
	var grid;
	if (v == 1) {
		var r = document.getElementById("rylb");
		if (r.value == 1) {
			grid = createGrid(store11, columns5);
		} else {
			grid = createGrid(store11, columns1);
		}
	} else if (v == 2) {
		grid = createGrid(store22, columns2);
	} else if (v == 3) {
		grid = createGrid(store33, columns3);
	} else if (v == 4) {
		grid = createGrid(store44, columns4);
	}

	showSub(grid);
}

/**
 * �������
 * 
 * @param store
 * @param columns
 * @returns {Ext.grid.GridPanel}
 */
function createGrid(store, columns) {

    
	var grid = new Ext.grid.GridPanel({
		region : 'center',
		// renderTo: 'grid', //��Ⱦλ��
		store : store, // ת���������
		// selModel: sm,
		collapsible : false,
		split : true,
		border : true,
		columns : columns, // ��ʾ��
		stripeRows : true, // ������Ч��
		// enableColumnMove: false, //��ֹ�Ϸ���
		// enableColumnResize: false, //��ֹ�ı��п��
		loadMask : true, // ��ʾ���ֺ���ʾ����,������Loading����
		forceFit : true, // �Զ��������
		bbar : new Ext.PagingToolbar({
			pageSize : 5,
			id : 'bbar',
			store : store,
			firstText : '��һҳ',
			prevText : 'ǰһҳ',
			nextText : '��һҳ',
			lastText : '���һҳ',
			refreshText : 'ˢ��',
			autoWidth : true,
			displayInfo : true,
			displayMsg : '��ǰ��ʾ{0}-{1}������,��{2}������',
			emptyMsg : "û�м�¼"
		})

	});
    store.reload();

	return grid;
}

/**
 * ��ʾ�Ӵ���
 * 
 * @param grid
 */
function showSub(grid) {

	var subWindow1 = Ext.create('Ext.window.Window', {
		xtype : "panel",
		height : 300,
		width : 800,
		resizable : false,
		autoScroll : true,
		modal : true,
		title : '����',
		padding : 5,
		items : [ {
			xtype : 'form',
			width : 800,
			height : 300,
			bodyPadding : 40,
			buttonAlign : 'center',
			items : [ grid ]
		} ]
	});
	subWindow1.show();

}
function showDaiBan(ywlx, yw_id, qy_id) {
	// ��������
	if (ywlx == '1') {
		parent.ShowWindow('������Ϣ���', 670, 530,
				'vehicleManage/vm_toAddVehicleSub.do?pageFlg=shenhe&cl_id='
						+ yw_id);
	} else {
		var pathname = window.location.pathname;
		var a = pathname.split("/");
		pathname = a[1];
		var host = window.location.host;
		var protocol = window.location.protocol;
		pathname = protocol + "//" + host + "/" + pathname + "/";
        
		location.href = pathname + "approval/ha_toApproval.do?ywlx=" + ywlx
				+ "&ywsqid=" + yw_id + "&qyid=" + qy_id;
	}
}

function vtoName(v){

if (v == "1") {
					return "<span>�����걨</span>";
				} else if (v == "2") {
					return "<span>���֤�걨</span>";
				} else if (v == "3") {
					return "<span>����ƻ��걨</span>";
				} else if (v == "4") {
					return "<span>�̷��걨</span>";
				} else if (v == '5') {
					return "<span>Ӧ��Ԥ���걨</span>";
				} else if (v == '6') {
					return "<span>ת�Ƽƻ�</span>";
				} else if (v == '7') {
					return "<span>��ҵע�����</span>";
				} else if (v == '8') {
					return "<span>Σ��ת������</span>";
				} else if (v == '9') {
					return "<span>����ת������</span>";
				}

}