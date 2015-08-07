function CallWebService(method, params, onSuccess, onFailure) {
    if (params != null) {
        Ext.Ajax.request({
//            async: false,    // 异步模式
//            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            type: "POST",   // 发送数据
            url: method,    // WebService 地址和方法
            params: params,
            success: onSuccess, // 执行成功
            failure: onFailure  //执行失败
        });
    }
    else {
        Ext.Ajax.request({
//            async: false,    // 异步模式
//            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            type: "POST",   // 发送数据
            url: method,    // WebService 地址和方法
            success: onSuccess, // 执行成功
            failure: onFailure  //执行失败
        });
    }
};
var loadflag = false;
Ext.onReady(function () {
    var winLogin = Ext.create("Ext.window.Window", {
        width: 450,
        height: 280,
        modal: false, // 窗口弹出，其他地方不可操作
        title: '&nbsp;sms系统登录 ',
//        collapsible: true,  // 收缩按钮
        closable: false, // 是否显示关闭窗口按钮
        iconCls: 'key', // cog , database_gear
        resizable: false, // 窗体是否可以拉伸
        icon: 'images/u16.png',
        frame: false,
        constrain: true,
        items: [{
            xtype: 'form',
            width: '100%',
            id: 'myform',
            height: 220,
            padding: '0px',
            buttonAlign: 'center',
            bodyStyle: 'padding-top:20px;background-position:left center;background-repeat:no-repeat;height:100%;width:100%;',
            items: [
            {
					xtype: 'panel',
					height:80, //图片高度  
					fieldCls: 'login_account',
					layout:{ 
						 type:'hbox',   //水平盒布局 
						 align:'middle'   //子面板高度充满父容器 
					},
					baseCls:'my-panel-no-border',
					items: [	
											    ,        
				            {
				                xtype: 'label',
				                html: "<div style='font-size:24px;text-align:center;width:15px;'></div>"
				            },	
						    {
								xtype: 'panel',
								layout:{ 
									 type:'vbox'   //水平盒布局 
									// align:'middle'   //子面板高度充满父容器 
								},
								baseCls:'my-panel-no-border',
								width: 80, //图片宽度  
						        height: 80, //图片高度  
							    items:
									[
									    {  
									        xtype: 'box', //或者xtype: 'component',  
									        top: 0,
									        width: 72, //图片宽度  
									        height: 72, //图片高度  
									        autoEl:
									        {  
									            tag: 'img',    //指定为img标签  
									            src: 'images/u16.png',    //指定url路径 ,
			 									top: 0
									        }  
									    },
									    {
							                xtype: 'label',
							                html: "<div style='font-size:24px;text-align:center;width:8px;'></div>"
							            }
								    ]
							}
						    ,        
				            {
				                xtype: 'label',
				                html: "<div style='font-size:24px;text-align:center;width:20px;'></div>"
				            }
						    ,        
				            {
				                xtype: 'label',
				                html: "<div style='font-size:23px;text-align:center;width:300px'>SMS 系统</div><br />"
				            }
            		]
            },
            {
                xtype: 'textfield',
                id: 'username',
                name: 'username',
                labelStyle: 'font-weight:1500',
                fieldCls: 'login_account',
                fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                fieldLabel: '账&nbsp;&nbsp;号&nbsp;&nbsp;',
                width: 350,
                margin: '10,10,10,10',
                labelAlign: 'right'
            },
            {
                xtype: "textfield",
                id: 'password',
                name: 'password',
                fieldCls: 'login_password',
                width: 350,
                fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                fieldLabel: '密&nbsp;&nbsp;码&nbsp;&nbsp;',
                labelStyle: 'font-weight:1500',
                margin: '10,10,10,10',
                labelAlign: 'right',
                inputType: 'password'
            }],
            buttons: [
			{
				xtype: 'label',
				width:30
			},{
                text: '登录',
                layout: 'fit',
                type: 'submit',
                handler: function () {
                    loginAction();
                }
            }, {
            	xtype: 'label',
            	width:30
            }]
        }
        ,
        {
           xtype: 'label',
            html: "<div style='font-size:11px;text-align:center;width:450px;'>技术支持：浙江海康安源环保科技有限公司</div>"
        }
        ],
        renderTo: Ext.getBody()
    });


    var loginAction = function () {
        if (Ext.getCmp("username").getValue() == null || Ext.getCmp("username").getValue() == "") {
            Ext.MessageBox.alert("提示", "请输入用户名!", function () { Ext.getCmp("username").focus();});
            return false;
        }
        if (Ext.getCmp("password").getValue() == null || Ext.getCmp("password").getValue() == "") {
            Ext.MessageBox.alert("提示", "请输入密码!", function () { Ext.getCmp("password").focus();});
            return false;
        }
        jsonObj = { username: Ext.getCmp("username").getValue(), passWord: Ext.getCmp("password").getValue() };
        var jsonStr = Ext.JSON.encode(jsonObj);
        try {
            //debugger kindle
            Ext.Msg.wait('正在验证...', '请稍等...');
            setTimeout(function () {
            	onFailure(request);
            }, 1000);

            CallWebService('login.do', { 'username': Ext.getCmp("username").getValue(),'password':Ext.getCmp("password").getValue()}, onSuccess, onFailure);
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
    function onSuccess(request, options) {
        result = request.responseText;
        var requestText = eval("("+result+")");
        var msg_no = requestText.msg_no;
       
        switch (msg_no) {
            case "0":
//              location.href = "index.html?u=" + Ext.getCmp("username").getValue();
            	location.href = "toFirstPage.do";
                break;
            case "-1":
                Ext.Msg.alert("错误代码:1001", "数据库连接错误，请联系管理员 !", function () { Ext.getCmp("username").setValue(""); Ext.getCmp("password").setValue(""); Ext.getCmp("username").focus();});
                loadflag = false;
                break;
            case "-2":
                Ext.Msg.alert("错误代码:1002", "用户名或密码错误!", function () { Ext.getCmp("username").setValue(""); Ext.getCmp("password").setValue(""); Ext.getCmp("username").focus();});
                loadflag = false;
                break;
            default:
                Ext.Msg.alert("提示", "验证失败!");
                loadflag = false;
                break;
        }
    };

    function onFailure(request, options) {
        Ext.Msg.wait().hide();
        Ext.Msg.alert("错误", "连接服务器失败!");
        loadflag = false;
    };
    winLogin.show();
});

 