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



// ***************************************数据请求模块end***************************************
Ext.onReady(function() {


	Ext.QuickTips.init();
	// Ext.MessageBox.alert('提示！','正在提取数据，请稍后...');
	Ext.Msg.show({
		title : '提示！',
		msg : '正在提取数据，请稍后...'
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

	// ==============================页面布局end==================================================

});

/**
 * 显示更多
 * 
 * @param v
 *            选择条件
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
 * 创建表格
 * 
 * @param store
 * @param columns
 * @returns {Ext.grid.GridPanel}
 */
function createGrid(store, columns) {

    
	var grid = new Ext.grid.GridPanel({
		region : 'center',
		// renderTo: 'grid', //渲染位置
		store : store, // 转换后的数据
		// selModel: sm,
		collapsible : false,
		split : true,
		border : true,
		columns : columns, // 显示列
		stripeRows : true, // 斑马线效果
		// enableColumnMove: false, //禁止拖放列
		// enableColumnResize: false, //禁止改变列宽度
		loadMask : true, // 显示遮罩和提示功能,即加载Loading……
		forceFit : true, // 自动填满表格
		bbar : new Ext.PagingToolbar({
			pageSize : 5,
			id : 'bbar',
			store : store,
			firstText : '第一页',
			prevText : '前一页',
			nextText : '后一页',
			lastText : '最后一页',
			refreshText : '刷新',
			autoWidth : true,
			displayInfo : true,
			displayMsg : '当前显示{0}-{1}条数据,共{2}条数据',
			emptyMsg : "没有记录"
		})

	});
    store.reload();

	return grid;
}

/**
 * 显示子窗口
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
		title : '更多',
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
	// 车辆审批
	if (ywlx == '1') {
		parent.ShowWindow('车辆信息审核', 670, 530,
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
					return "<span>车辆申报</span>";
				} else if (v == "2") {
					return "<span>许可证申报</span>";
				} else if (v == "3") {
					return "<span>管理计划申报</span>";
				} else if (v == "4") {
					return "<span>固废申报</span>";
				} else if (v == '5') {
					return "<span>应急预案申报</span>";
				} else if (v == '6') {
					return "<span>转移计划</span>";
				} else if (v == '7') {
					return "<span>企业注册审核</span>";
				} else if (v == '8') {
					return "<span>危废转移审请</span>";
				} else if (v == '9') {
					return "<span>污泥转移审请</span>";
				}

}