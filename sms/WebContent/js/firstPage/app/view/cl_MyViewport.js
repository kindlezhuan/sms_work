﻿
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
//var s = document.getElementById("username");
//var loginName ="kindle";
var s = document.getElementById("username");
var loginName = s.value;
Ext.define('MyApp3.view.cl_MyViewport',{
				extend : 'Ext.container.Viewport',
				requires : ['Ext.tree.Panel', 'Ext.tree.View'],
				itemId : 'headerPanel',
				layout : 'border',
				initComponent : function() {
					var me = this;
					var tabs = new Ext.TabPanel({
								xtype : 'tabpanel',
								flex : 1,
								region : 'center',
								itemId : 'contentPanel',
								items : [{
									xtype : 'panel',
									title : '首页',
									closable : true,
									html : '<iframe id="content" src="firstPage/fp_toCSfp.do" width="100%" height="100%" frameborder="0"></iframe>'
								}]
							});
					function addTab(title, url) {
						var t = tabs;
						for ( var _item = 0; _item < t.items.items.length; _item++) {
							if (t.items.items[_item].title == title) {
								t.setActiveTab(t.items.items[_item]);
								return;
							}
						}
						t.add({
							title: title,
							closable: true,
							html: '<iframe id="content" src='+ url + ' width="100%" height="100%" frameborder="0"></iframe>'
						}).show();
					};

					var tabClick = function() {
						addTab(this.text, this.url);
					};

					function TreeExpand(node) {
						if (node.qtitle == null) {
							return;
						}
						var url = node.qtitle;
						var par = node.parms;
						var title = node.text;
						addTab(title, url);
					};

					var LoadChildMenus = function(url) {
						var tree = Ext.getCmp('treePanel');
						tree.expand();
						Ext.Ajax
								.request({
									async : false, // 异步模式
									headers : {
										'Content-Type' : 'application/json; charset=utf-8'
									},
									type : "POST", // 发送数据
									url : url, // WebService 地址和方法
									success : function(request, opt) {
										var data = eval(request.responseText);
										tree.getRootNode().removeAll(false);
										tree.getRootNode().appendChild(data);
									}, // 执行成功
									failure : function(request, opt) {
										alert("请求菜单失败!");
									} //执行失败
								});
					};

					var s = "<%=session.getAttribute('wf_loginData')%>";
					Ext.applyIf(me,{
						items:[{
							 xtype: 'panel',
			                    region: 'north',
			                    border:0,
			                    bodyStyle: 'padding-top:0px;background-position:left center;background-repeat:no-repeat;background-size:100% 100px;background-image:url(http://www.95bz.com/images/bg.jpg)',
			                    height: 100,
			                    itemId: 'headerPanel',
			                    split:false,
			                    items: [{
			                    	xtype: 'label',
		                    		border:0,
		                    		html: "<img  style='padding-top:20px;' src='images/Logo1.png' /> "
			                    },{
			                    	xtype: 'label',
			                    	border: 0,
			                    	padding: '15 0 20 30',
			                    	html: "<span style='font-family:微软雅黑;font-size:26px;color:white'>SMS 管理系統</span>"
			                    }],
								dockedItems : [{
									xtype : 'toolbar',
									dock : 'bottom',
									items : [{
										xtype : 'button',
										text : '首页',
										handler : function() {
											var tree = Ext.getCmp('treePanel');
											tree.collapse();
											addTab("首页","firstPage/fp_toCSfp.do");
										},
										width : 120
									},
									'-',
									{
										xtype : 'button',
										text : '短信发送',
										handler : function() {
											LoadChildMenus("js/firstPage/menus/cl/ywgl.json");
										},
										width : 120
									},
									'-',
									{
										xtype : 'button',
										text : '用户管理',
										handler : function() {
											LoadChildMenus("js/firstPage/menus/cl/user.json");
										},
										width : 120
									},
									'-',
									{
										xtype : 'button',
										text : '网关管理',
										handler : function() {
											LoadChildMenus("js/firstPage/menus/cl/gateway.json");
										},
										width : 120
									},
									'->',
									{
										xtype : 'label',
										html : '您好,'+ loginName,
										width : loginName.length * 12 + 40
									}, '-', {
			                            xtype: 'panel',
			                            border:0,
			                            html: '<a href="javascript:editPwd();" id="ExitBtn">修改密码</a>',
			                            width: 55
			                        },
									'-',
									{
										xtype : 'label',
										html : '<a href="javascript:Exit();" id="ExitBtn">安全退出</a>',
										width : 55
									}]
								}]
							},
							{
								xtype : 'treepanel',
								region : 'west',
								split : true,
								id : 'treePanel',
								width : 231,
								rootVisible : false,
								autoDestroy : true,
								autoScroll : true,
								title : '功能菜单',
								collapsible : true,
								collapsed : true,

								listeners : {
									//监听单击事件
									'itemclick' : function(
											e, record) {
										//debugger
										if (record.data.leaf) {
											TreeExpand(record.data);
										}
									}
								}
							}, tabs,{
			                    region: 'south',
			                    title: footer,
			                    hidden: false,
			                    height: 30,
			                    maxHeight: 30,
			                    split: true,
			                    bodyStyle: { fontSize: '12px', padding: '20,20,20,20' }
			                }]
						});
						me.callParent(arguments);
					}
				});

var Exit = function() {
	Ext.MessageBox.show({
		title : '提示',
		msg : '确定要退出系统？',
		buttons : Ext.MessageBox.YESNO,
		fn : ExitSystem,
		animEl : 'ReleaseSuper',
		icon : Ext.MessageBox.QUESTION
	});
};

/*
 退出系统
 */
function ExitSystem(confirmResult) {
	if (confirmResult == "yes") {
		try {
			Ext.MessageBox.alert("提示", "您已安全退出系统!");
			setTimeout(function() {
				window.location.href='tologout.do';
			}, 500);
		} catch (e) {
			alert("退出系统时发生异常!");
		}
	}
};

var win;
/*
 打开一个新窗口
 params:
 title 标题,
 width 宽度,
 height 高度,
 url 子页面url

 */
var ShowWindow = function(title, width, height, url) {
	Ext.QuickTips.init();
	if (!win) {
		win = new Ext.Window(
				{
					applyTo : 'hello-win',
					layout : 'fit',
					title : title,
					maximizable : false,
					width : 400,
					draggable : true,
					html : '<iframe style="padding:1px 1px 1px 1px" frameborder="0" id="child" name="child" width="100%" height="100%" src="'
							+ url + '" />',
					resizable : false,
					modal : true,
					border : false,
					height : 300,
					closeAction : 'hide',
					plain : false
				});
	} else {
		document.getElementById("child").src = url;
	}
	win.setTitle(title);
	win.setWidth(width);
	win.setHeight(height);
	win.doLayout();
	win.show();
	win.center();
	delete applyTo;
	delete draggable;
	delete modal;
	delete frame;
	delete pageY;
	delete border;
	delete constrain;
	delete closable;
	delete layout;
	delete width;
	delete height;
	delete plain;
	delete items;
	delete html;
	//Ext.Window.superclass.onDestroy.call(this);
};
//修改密码
function editPwd(){
	var subWindow1 = Ext.create('Ext.window.Window', {
		xtype : "panel",
		height : 245,
		width : 400,
		defaultAlign : 'center',
		resizable : false,
		modal : true,
		title : '修改密码',
		items : [ {
			xtype : 'form',
			width : 400,
			height : 200,
			bodyPadding : 40,
			buttonAlign : 'center',
			items : [ {
				layout : "column",
				border : 0,
				items : [ {
					xtype : "form",
					border : 0,
					bodystyle : "padding-left:30px;",
					items : [ {
						xtype : 'textfield',
						id : 'ymm',
						width : 300,
						allowBlank: false,
						labelAlign: 'right',
						labelwidth:80,
						inputType: 'password',
						fieldLabel : '原密码'
					}, {
						xtype : 'textfield',
						id : 'xmm',
						width : 300,
						labelwidth:80,
						labelAlign: 'right',
						allowBlank: false,
						inputType: 'password',
						fieldLabel : '新密码'
					} , {
						xtype : 'textfield',
						id : 'qrmm',
						width : 300,
						labelAlign: 'right',
						allowBlank: false,
						labelwidth:80,
						inputType: 'password',
						fieldLabel : '确认密码'
					}]
				} ]
			} ],
			buttons : [
					{
						width : 80,
						text : '确认',
						handler : function() {
							var ymm = Ext.getCmp("ymm").getValue();
							var xmm = Ext.getCmp("xmm").getValue();
							var qrmm = Ext.getCmp("qrmm").getValue();
							if(xmm!=qrmm){
								Ext.Msg.alert("提示", "两次密码不同");
								return;
							}
							var param = {
								'ymm' : ymm,
								'xmm' : xmm
							};
							CallWebService("firstPage/zf_editPassWord.do", param,
									function(request, options) {
										result = request.responseText;
										var requestText = eval("(" + result
												+ ")");
										var msg_no = requestText.msg_no;
										switch (msg_no) {
										case "0":
											Ext.Msg.alert("提示", "修改成功");
											subWindow1.destroy();
											break;
										case "-2":
											Ext.Msg.alert("提示", "原密码错误");
											break;
										default:
											Ext.Msg.alert("提示", "修改失败!");
											loadflag = false;
											break;
										}
									}, null);
							

						}
					}, {
						width : 80,
						text : '取消',
						handler : function() {
							subWindow1.destroy();
						}
					} ]
		} ]
	});
	subWindow1.show();

}