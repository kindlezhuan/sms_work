/*导入所需脚本*/
/*全局变量*/
var win;
var storeGrid;
var datetimeStart;
var datetimeEnd;
var grid;
var actions;
Common.Load('正在加载页面,请稍后...');

Ext.onReady(Page_Load);
//页面加载
function Page_Load() {
    var cookies = Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    Ext.Ajax.request({
        async: false,    // 异步模式
        type: "POST",
        url: '/SystemUsersPagePerview/getRolePrivilege',
        success: function (request) {
            actions = request.responseText;
            if (actions.indexOf("Select") == -1) {
                parent.Ext.Msg.alert("系统提示", "无查询权限!");
                Ext.getCmp("search").setDisabled(true);
                Ext.getCmp("fresh").setDisabled(true);
                Ext.getCmp("bbar").setDisabled(true);
            }
            else {
                storeGrid.load({ params: { start: 0, limit: pageSize} });
            }
            if (actions.indexOf("Add") == -1) {
                Ext.getCmp("New").setDisabled(true);
            }
            if (actions.indexOf("Update") == -1) {
                Ext.getCmp("Stop").setDisabled(true);
                Ext.getCmp("Start").setDisabled(true);
                Ext.getCmp("Cancel").setDisabled(true);
            }
            else {
                grid.addListener("rowdblclick", rowDoubleClick);
                grid.addListener('rowcontextmenu', rightClickFn, this);
            }

        },
        failure: function (request) {
            actions = request.responseText;
        },
        params: { pageCode: 'A101' }
    });

    Ext.QuickTips.init();
    //查询
    var Search = function () {
        storeGrid.load({ params: { start: 0, limit: pageSize, keywords: txtUserName.getValue()} });
    };
    var pageSize = 15;
    var txtUserName = BZSHOP.TextBox.CreateTextBox(false, 140, 20, '');
    txtUserName.emptyText = "用户名";
    var forms = new Ext.FormPanel({
        loadMask: Common.Load('正在加载页面控件,请稍后...'),
        labelWidth: 60,
        id: 'company-form',
        iconCls: 'search',
        labelAlign: 'right',
        frame: true,
        title: '数据查询',
        border: false,
        split: false,
        collapsible: true,
        bodyStyle: 'padding-top:2px;padding-left:10px;',
        height: 65,
        layout: 'form',
        keys: [{ //处理键盘回车事件      
            key: Ext.EventObject.ENTER,
            fn: Search,
            scope: this
        }],
        items: [{
            layout: 'column',
            items: [{
                layout: 'form',
                items: [{
                    fieldLabel: '关键字',
                    items: [txtUserName]
                }]
            }, {
                layout: 'form',
                bodyStyle: 'padding-left:10px',
                items: [{
                    xtype: 'button',
                    id: 'search',
                    iconCls: 'search',
                    text: '查询',
                    width: 70,
                    handler: Search
                }]
            }]
        }]
    });

    /*
    删除成功
    */
    function deleteSuccess() {
        queryPage(0, onSuccess);
        Ext.MessageBox.alert('提示', '操作成功！');
    };


    // 刷新按钮
    var freshAction = new Ext.Action({
        text: '刷新',
        id: 'fresh',
        handler: function () {
            storeGrid.load();
        },

        iconCls: 'fresh'
    });

    /*
    添加按钮
    */
    var addAction = new Ext.Action({
        text: '新增',
        id: 'New',
        handler: function () {
            //打开一个新窗口 参数:标题,宽,高,子页面url
            parent.ShowWindow("新增", 500, 330, "system/UserEdit?PageState=New");
        },
        iconCls: 'add'
    });

    /*
    停用帐号
    */
    var stopAction = new Ext.Action({
        text: '停用',
        id: 'Stop',
        hidden: false,
        handler: function () {
            //debugger
            var n = grid.getSelectionModel().getCount();
            if (n < 1)
            { parent.Ext.MessageBox.alert('提示', '请选择需要处理记录'); return false; }
            parent.Ext.MessageBox.show({
                title: '停用?',
                msg: '确定停用选中的' + n + '条数据?',
                buttons: Ext.MessageBox.YESNO,
                fn: function (btn) {
                    if ("yes" == btn) {
                        var userIds = new Array();
                        var userStatus = 0;
                        var userIsOnline = 3;
                        for (i = 0; i < n; i++) {
                            var data = grid.getSelectionModel().selections.items[i].data;
                            userIds.push(data.UserId);
                        }
                        CallWebService("../Users/UpdateUserInfo", { userIds: userIds, userStatus: userStatus, userIsOnline: userIsOnline }, function (request, opts) {
                            storeGrid.reload();
                            setTimeout(function () { parent.Ext.MessageBox.alert('提示', '操作成功！'); }, 300);
                        }, function (request, opts) {
                            alert(request.responseText);
                        });
                    } else {
                        return;
                    }
                },
                animEl: 'Stop',
                icon: Ext.MessageBox.QUESTION
            });
        },
        iconCls: 'Stop'
    });

    /*
    启用帐号
    */
    var startAction = new Ext.Action({
        text: '启用',
        id: 'Start',
        hidden: false,
        handler: function () {
            //debugger
            var n = grid.getSelectionModel().getCount();
            if (n < 1)
            { parent.Ext.MessageBox.alert('提示', '请选择需要处理记录'); return false; }
            parent.Ext.MessageBox.show({
                title: '启用?',
                msg: '确定启用选中的' + n + '条数据?',
                buttons: Ext.MessageBox.YESNO,
                fn: function (btn) {
                    if ("yes" == btn) {
                        var userIds = new Array();
                        var userStatus = 1;
                        var userIsOnline = 3;
                        for (i = 0; i < n; i++) {
                            var data = grid.getSelectionModel().selections.items[i].data;
                            userIds.push(data.UserId);
                        }
                        CallWebService("../Users/UpdateUserInfo", { userIds: userIds, userStatus: userStatus, userIsOnline: userIsOnline }, function (request, opts) {
                            storeGrid.reload();
                            setTimeout(function () { parent.Ext.MessageBox.alert('提示', '操作成功！'); }, 300);
                        }, function (request, opts) {
                            alert(request.responseText);
                        });
                    } else {
                        return;
                    }
                },
                animEl: 'Start',
                icon: Ext.MessageBox.QUESTION
            });
        },
        iconCls: 'Start'
    });

    /*
    注销按钮
    */
    var cancelAction = new Ext.Action({
        text: '注销',
        id: 'Cancel',
        hidden: false,
        handler: function () {
            //debugger
            var n = grid.getSelectionModel().getCount();
            if (n < 1)
            { parent.Ext.MessageBox.alert('提示', '请选择需要处理记录'); return false; }
            parent.Ext.MessageBox.show({
                title: '注销?',
                msg: '确定注销选中的' + n + '条数据?',
                buttons: Ext.MessageBox.YESNO,
                fn: function (btn) {
                    if ("yes" == btn) {
                        var userIds = new Array();
                        var userIsOnline = 0;
                        var userStatus = 3;
                        for (i = 0; i < n; i++) {
                            var data = grid.getSelectionModel().selections.items[i].data;
                            userIds.push(data.UserId);
                        }
                        CallWebService("../Users/UpdateUserInfo", { userIds: userIds, userStatus: userStatus, userIsOnline: userIsOnline }, function (request, opts) {
                            storeGrid.reload();
                            setTimeout(function () { parent.Ext.MessageBox.alert('提示', '操作成功！'); }, 300);
                        }, function (request, opts) {
                            alert(request.responseText);
                        });
                    } else {
                        return;
                    }
                },
                animEl: 'cancel',
                icon: Ext.MessageBox.QUESTION
            });
        },
        iconCls: 'cancel'
    });

    storeGrid = new Ext.data.JsonStore({
        root: "data",
        deferRowRender: false,
        totalProperty: "totalCount",
        proxy: new Ext.data.HttpProxy({ url: "../Users/GetUsersListData" }),
        baseParams: { start: 0, limit: pageSize, keywords: txtUserName.getValue() },
        fields: ["UserId", "UserName", "UserEmail", "UserPhone", "UserIsOnline", "RegisterTime", "UserBuyIntergral", "UserSellIntergral", "UserStatus", "UserTrueName", "UserType"]
    });

    //pagingtoolbar的分页，在store.load({params:{type:type_combo.getValue()}})带参数查询，默认只能查一页。分页到下一页时，是不带参数的。
    //解决方法是，在store被load之前给页参数赋值就可以了。
    storeGrid.on('beforeload', function () {
        storeGrid.baseParams = { start: 0, limit: pageSize, keywords: txtUserName.getValue() };
    });

    var ck = new Ext.grid.CheckboxSelectionModel();
    function conveterUserIsOnline(value) {
        if (value == '0') {
            return "<span style='color:green;'>离线</span>";
        } else if (value == '1') {
            return "<span style='color:green;'>在线</span>";
        }
    }
    function conveterUserType(value) {
        if (value == '1') {
            return "<span style='color:green;'>内部员工</span>";
        } else if (value == '2') {
            return "<span style='color:green;'>客户</span>";
        }
    }
    function conveterUserStatus(value) {
        if (value == '0') {
            return "<span style='color:green;'>停用</span>";
        } else if (value == '1') {
            return "<span style='color:green;'>正常</span>";
        }
    }
    grid = new Ext.grid.GridPanel({
        store: storeGrid,
        view: new Ext.grid.GridView({
            forceFit: true,
            showPreview: true,
            emptyText: "没有符合条件的记录。"
        }),
        loadMask: Common.Load("正在加载数据,请稍后...", function () { }, grid, storeGrid),
        autoWidth: true,
        autoScroll: false,
        iconCls: 'data',
        columns: [
            ck,
            { id: 'UserId', header: 'ID', width: 160, hidden: true, sortable: true, dataIndex: 'UserId' },
            { header: '用户名', dataIndex: 'UserName', width: 170, sortable: true },
            { header: '邮箱', dataIndex: 'UserEmail', width: 170, sortable: true },
            { header: '联系电话', dataIndex: 'UserPhone', width: 170, sortable: true },
            { header: '在线状态', dataIndex: 'UserIsOnline', width: 170, sortable: true, renderer: conveterUserIsOnline },
            { header: '注册时间', dataIndex: 'RegisterTime', width: 170, sortable: true },
            { header: '真实姓名', dataIndex: 'UserTrueName', width: 170, sortable: true },
            { header: '会员类型', dataIndex: 'UserType', width: 170, sortable: true, renderer: conveterUserType },
            { header: '买家信用积分', dataIndex: 'UserBuyIntergral', width: 170, sortable: true },
            { header: '卖家信用积分', dataIndex: 'UserSellIntergral', width: 170, sortable: true },
            { header: '使用状态', dataIndex: 'UserStatus', width: 170, sortable: true, renderer: conveterUserStatus }
        ],
        sm: ck,
        keys: [{ //处理键盘回车事件      
            key: Ext.EventObject.ENTER,
            fn: function () {
                var v = Ext.getCmp("showRows").getValue();
                b = Ext.getCmp("bbar");
                pageSize = parseInt(v);
                b.setPageSize(pageSize);
            },
            scope: this
        }],
        bbar: new Ext.PagingToolbar({
            pageSize: pageSize,
            id: 'bbar',
            store: storeGrid,
            firstText: '第一页',
            prevText: '前一页',
            nextText: '后一页',
            lastText: '最后一页',
            refreshText: '刷新',
            autoWidth: true,
            items: ['-',
                { xtype: 'label', text: '每页显示' },
                { xtype: 'textfield', id: 'showRows', width: 30, value: pageSize },
                { xtype: 'label', text: '行' },
                { text: '确定', iconCls: 'ok',
                    handler: function () {
                        var v = Ext.getCmp("showRows").getValue();
                        b = Ext.getCmp("bbar");
                        pageSize = parseInt(v);
                        b.setPageSize(pageSize);
                    }
                }],
            displayInfo: true,
            displayMsg: '当前显示{0}-{1}条,共{2}条',
            emptyMsg: "没有数据"
        }),
        tbar: new Ext.Toolbar({ items: [addAction, '-', stopAction, '-', startAction, '-', cancelAction, '-', freshAction] }),
        autoHeight: true,
        boxMinHeight: 200,
        autoWidth: true

    });
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [{
            id: "center",
            region: 'center',
            margins: '1 2 3 0',
            layout: 'column',
            autoScroll: true,
            items: [{
                columnWidth: 1.0,
                baseCls: 'x-plain',
                bodyStyle: 'padding:5px',
                items: [forms]
            }, {
                columnWidth: 1.0,
                baseCls: 'x-plain',
                bodyStyle: 'padding:0px 5px 0px 5px',
                items: [grid]
            }]
        }]
    });

    /*
    网格右键菜单
    */
    var rightClick = new Ext.menu.Menu({
        id: 'rightClickCont',
        items: [{
            scope: this,
            //icon: "../App_Themes/Default/Frame/add.gif",
            id: 'Del',
            text: '删除选中数据(支持批量)',
            iconCls: 'delete',
            disabled: false,
            handler: DelDblClick
        }, {
            scope: this,
            iconCls: 'edit',
            id: 'Edit',
            text: '修改选中数据(不支持批量)',
            disabled: false,
            handler: DelDblClick
        }]
    });
    /*
    右键菜单事件
    */
    function DelDblClick(o) {
        switch (o.id) {
            case "Del":
                delAction.items[0].handler();
                break;
            case "Edit":
                rowDoubleClick(grid);
                break;
            default:
                break;
        }

    };
    /*
    右键菜单处理函数
    */
    function rightClickFn(grid, rowIndex, e) {
        e.preventDefault();
        this.gridCtxRecord = storeGrid.getAt(rowIndex);
        this.rowIndex = rowIndex;

        rightClick.showAt(e.getXY());
    };
    /*
    网格行双击事件
    */
    function rowDoubleClick(grid, rowIndex, columnIndex, e) {
        var recordtoedit = grid.getSelectionModel().getSelected();
        if (recordtoedit == null) { Ext.MessageBox.alert('提示', '请选择需要处理记录'); return false; }
        var name = recordtoedit.get("UserName");
        var userId = recordtoedit.get("UserId");
        parent.ShowWindow(name, 500, 330, "system/UserEdit?userId=" + userId + "");
    }
};


