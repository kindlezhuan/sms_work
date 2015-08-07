Ext.onReady(function () {
    //表单验证，错误提示
    if (!Ext.isIE) { Ext.QuickTips.init(); }
    Ext.form.Field.prototype.msgTarget = 'side';

    //-------------------begin 定义新增表单------------------------//	
    var txtUserName = gbicc.component.form.createSearchTextField('userName', '用户名', '支持模糊查询', false);
   
    var top_bar = gbicc.component.createTopToolBar('north-div', '用户信息', function () { ds.reload() });
    var forms = new Ext.FormPanel({
        id: 'company-form',
        iconCls: 'search',
        labelAlign: 'right',
        labelWidth: 65,
        frame: true,
        title: '数据查询',
        border: false,
        collapsible: false,
        split: false,
        bodyStyle: 'padding-top:2px;padding-left:10px;',
        height: 100,
        layout: 'form',
        keys: [{ //处理键盘回车事件      
            key: Ext.EventObject.ENTER,
            scope: this
        }],
        items: [{
            layout: 'column',
            items: [{
                layout: 'form',
                columnWidth: .17,
                items: [txtUserName]
            }, {
                layout: 'form',
                columnWidth: .20,
                bodyStyle: 'padding-left:10px',
                items: [{
                    xtype: 'button',
                    iconCls: 'search',
                    text: '查询',
                    width: 70,
                    handler: function () {
                        ds.load({ params: { keywords: txtUserName.getValue()} });
                    }
                }]
            }]
        }]
    });
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [{
            region: 'north',
            border: false,
            height: 100,
            items: forms
        }]
    });
});

 