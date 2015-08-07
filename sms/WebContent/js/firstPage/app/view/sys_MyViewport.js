
var s = document.getElementById("loginName");
var loginName = s.value;

Ext.define('MyApp3.view.zf_MyViewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.tree.Panel',
        'Ext.tree.View'
    ],

    itemId: 'headerPanel',
    layout: 'border',

    initComponent: function () {
        var me = this;
        var tabs = new Ext.TabPanel({
            xtype: 'tabpanel',
            flex: 1,
            region: 'center',
            itemId: 'contentPanel',
            items: [{
                xtype: 'panel',
                title: '首页',
                closable: true,
                html: '<iframe id="content" src="firstPage/fp_toCSfp.do" width="100%" height="100%" frameborder="0"></iframe>'
            }]
        });
        function addTab(title, url) {
            //debugger
            var t = tabs;
            for (var _item = 0; _item < t.items.items.length; _item++) {
                if (t.items.items[_item].title == title) {
                    t.setActiveTab(t.items.items[_item]);
                    return;
                }
            }
            t.add({
                title: title,
                closable: true,
                html: '<iframe id="content" src=' + url + ' width="100%" height="100%" frameborder="0"></iframe>'
            }).show();
        };

        var tabClick = function () {
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


        var LoadChildMenus = function (url) {
            // debugger
            var tree = Ext.getCmp('treePanel');
            tree.expand();
//                        var store = tree.getStore("MyTreeStore");
//                        store.fields = [
//                            { name: 'text' },
//                            { name: 'url' }
//                        ];
            Ext.Ajax.request({
                async: false,    // 异步模式
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                type: "POST",   // 发送数据
                url: url,    // WebService 地址和方法
                success: function (request, opt) {
                    var data = eval(request.responseText);
                    tree.getRootNode().removeAll(false);
                    tree.getRootNode().appendChild(data);
                }, // 执行成功
                failure: function (request, opt) {
                    alert("请求菜单失败!");
                }  //执行失败
            });
        };

		var s="<%=session.getAttribute('wf_loginData')%>"; 
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    region: 'north',
                    bodyStyle: 'padding-top:10px;background-position:left center;background-repeat:no-repeat;background-size:100% 100px;background-image:url(http://www.95bz.com/images/bg.jpg)',
                    height: 100,
                    itemId: 'headerPanel',
                    split:true,
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [{
                            xtype: 'button',
                            text: '系统管理',
                            handler: function () {
                                LoadChildMenus("js/firstPage/menus/sys/menus.json");
                            },
                            width: 120
                        }, '->', {
                            xtype: 'label',
                            
                            html: '您好,'+loginName,
                            width: 80
                        }, '-', {
                            xtype: 'label',
                            html: '<a href="javascript:void();" id="ExitBtn">设置</a>',
                            width: 30
                        }, '-', {
                            xtype: 'label',
                            html: '<a href="javascript:Exit();" id="ExitBtn">安全退出</a>',
                            width: 55
                        }]
                    }]
                },
                {
                    xtype: 'treepanel',
                    region: 'west',
                    split: true,
                    id: 'treePanel',
                    width: 231,
                    rootVisible: false,
                    autoDestroy: true,
                    autoScroll: true,
                    title: '功能菜单',
                    collapsible: true,
                    collapsed: true,

                    listeners: {
                        //监听单击事件
                        'itemclick': function (e, record) {
                            //debugger
                            if (record.data.leaf) {
                                TreeExpand(record.data);
                            }
                        }
                    }
                }, tabs
//                , {
//                    region: 'south',
//                    title: '管理平台版本：v1.1.2.4',
//                    height:30,
//                    bodyStyle: { fontSize: '12px' ,padding:'20,20,20,20'}
//                }
            ]
        });
        me.callParent(arguments);
    }
});

var Exit = function () {
    Ext.MessageBox.show({
        title: '提示',
        msg: '确定要退出系统？',
        buttons: Ext.MessageBox.YESNO,
        fn: ExitSystem,
        animEl: 'ReleaseSuper',
        icon: Ext.MessageBox.QUESTION
    });
};

/*
退出系统
*/
function ExitSystem(confirmResult) {
    if (confirmResult == "yes") {
        try {
            Ext.MessageBox.alert("提示", "您已安全退出系统!");
            setTimeout(function () {
            	window.location.href='tologout.do';
            }, 500);
        }
        catch (e) {
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
var ShowWindow = function (title, width, height, url) {
    Ext.QuickTips.init();
    if (!win) {
        win = new Ext.Window({
            applyTo: 'hello-win',
            layout: 'fit',
            title: title,
            maximizable: true,
            width: 400,
            draggable: true,
            html: '<iframe style="padding:1px 1px 1px 1px" frameborder="0" id="child" name="child" width="100%" height="100%" src="' + url + '" />',
            resizable: false,
            modal: true,
            border: false,
            height: 300,
            closeAction: 'hide',
            plain: false
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