function CallWebService(method, params, onSuccess, onFailure) {
	Ext.Ajax.request({
	    type: "POST",   // 发送数据
	    url: method,    // WebService 地址和方法
	    params: params,
	    success: onSuccess, // 执行成功
	    failure: onFailure  //执行失败
	});
};
var addWindow2;
var myStore;
var winHeight;
var win;
var param1;

Ext.onReady(function () {
    Ext.QuickTips.init();
    
    var mainVs = Ext.getBody().getViewSize();
    winHeight = mainVs.height + 100;
    
   	//定义列  
	var columns = [
  		{header: '用户ID', dataIndex: 'userid'},   
	 	{header: '用户名', dataIndex: 'username'},
  		{header: '创建时间', dataIndex: 'createtime'},   
  		{header: '有效资源', dataIndex: 'resource'},  
	 	{header: '操作', dataIndex: '', renderer:function(v,meta,record){
	 			return  "<a href=\"javaScript:updateUser("+record.get('userid')+","+record.get('username')+","+record.get('resource')+")\">修改</a>  " +
	 			"<a href=\"javaScript:deleteUser("+record.get('userid')+")\">删除</a>";
	 		}}
	];
	
	//定义数据源
	Ext.define('planList', {
		extend: 'Ext.data.Model',
		fields: [
	       	{name: 'userid' }, //mapping:0 这样的可以指定列显示的位置，0代表第1列，可以随意设置列显示的位置  
	       	{name: 'username' },
	       	{name: 'createtime' },
	       	{name:'resource'}
	    ]
	});

	//初始化时自动填充数据
	myStore = Ext.create('Ext.data.Store', {
		model: 'planList',
		pageSize : 10,
		proxy: {
        	type: 'ajax',
         	url: 'sms_user/sms_user_getAllPageUser.do',
         	actionMethods: {  
            	read: 'POST'  
         	},
	        reader: {
				type: 'json',
	            root: 'data'
	        }
		},
		autoLoad: true
	});
	
    //点击下一页时传递搜索框值到后台  
 	myStore.on('beforeload', function (myStore, options) { 
         Ext.apply(myStore.proxy.extraParams, param1);    
     }); 
 	
	//新增网页用户
	var addUserWindow = function(){
		var addMonthForm = new Ext.FormPanel({
	        labelAlign: 'right',
	        labelWidth: 234,
	        width: 466,
	        height:220,        
	        closeAction : 'close',
	        border: false,
	        waitMsgTarget: true,
	        autoScroll:true,
	        buttonAlign: 'center',
	        items: [{
                xtype: 'container',
                height: 40,
                layout: 'column',
                items: [
                    {
                        xtype: 'textfield',
                        emptyText:'用户名',
                        id: 'username',
                        name: 'username',
                        width: 350,
                        fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                        fieldLabel: '用户名',
                        labelStyle: 'font-weight:1500',
                        margin: '10,10,10,10',
                        labelAlign: 'right',
                            
                    },
                    {
                        xtype: 'textfield',
                        emptyText:'密码',
                        id: 'password',
                        name: 'password',
                        width: 350,
                        fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                        fieldLabel: '密&nbsp;&nbsp;&nbsp;&nbsp;码',
                        labelStyle: 'font-weight:1500',
                        margin: '10,10,10,10',
                        labelAlign: 'right',
                    },
                    {
                        xtype: 'numberfield',
                        emptyText:'资源数',
                        id: 'resource',
                        name: 'resource',
                        width: 350,
                        fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                        fieldLabel: '资源数',
                        labelStyle: 'font-weight:1500',
                        margin: '10,10,10,10',
                        labelAlign: 'right',
                    }
                ]
            }]	        
	    });
	    
		win = new Ext.Window({
		    id : 'win1',
  			border : false,
  			closable : true,
  			layout : 'fit',
  			closeAction : 'close',
  			width : 466,
  			height:220,
  			autoScroll : true,
  			resizable : false,
  			modal : true,
  			items : [addMonthForm],
  			buttonAlign : 'center',
	        buttons: [ 
	            gbicc.component.form.createButton('添加', 'saveuser', function(){
	            	if (addMonthForm.form.isValid()){
	            		var name = getVal('username');
	            		var pwd = getVal('password');
	            		var resource = getVal('resource');
	            		var param = {'name':name,'pwd':pwd,'resource':resource};
	            			
	            		var json = Ext.encode(param);
	            		CallWebService("sms_user/sms_user_addPageUser.do?p1Dto="+json, null, function (request, opt) {
	                    	var result = request.responseText;
	                    	var requestText = eval("("+result+")");
	                    	if(requestText.msg == null){
	            	        		parent.Ext.Msg.alert('结果',"成功");
	            	        		addUserWindow.close();
	            	        }
	            	        else{
	            	        	parent.Ext.Msg.alert('结果',"失败:"+requestText.msg);
	            	        }      	
	                    });
	            		
	            	}
	            })
	        ]
		});
		return win;			
	};

	var addPageUserWin = addUserWindow();
	//serach bar
    var serachBar = new Ext.FormPanel({
    	region: 'north',
        id: 'fieldSetForm',
        border: 0,
        bodyPadding: '0 5 0 5',
        autoHeight: true,
        url: 'save_.action', //提交的目标地址
        actionMethods: {  
            read: 'POST'  
        },
        fieldDefaults: {
            labelAlign: 'right',
            msgTarget: 'side'
        },
        items:[{
        	xtype: 'fieldset',
            title: '查询条件',
            bodyPadding:5,
            items: [{
        		xtype: 'container',
        		layout: 'column',
        		padding: '0 20 10 20',
        		height: 40,
            	defaults: {
            		padding: '0 10 0 10'
            	},
            	items:[{

            		xtype: 'textfield',
        			id: 'userName',
        			fieldLabel: '用户名称',
        			labelWidth: 60,
        			padding: '0 10 0 10',
        			width: 160
            	},{ xtype: 'datefield',  
                    id:'beginTime',  
                    anchor: '100%',  
                    fieldLabel: '开始时间',  
                    name: 'beginTime',  
                    format:'Y-m-d H:i:s',  
                    value:Ext.Date.add(new Date(), Ext.Date.DAY, -1),  
                    maxValue: new Date()  // limited to the current date or prior  
            	},{ xtype: 'datefield',  
                    id:'endTime',  
                    anchor: '100%',  
                    fieldLabel: '截止时间',  
                    name: 'endTime',  
                    format:'Y-m-d H:i:s',  
                    value:new Date(),  
                    listeners: {  
                        select:function(field,value,eOpts ){  
                            var t = Ext.getCmp('endTime');  
                            var temp = Ext.Date.add(new Date(value),Ext.Date.HOUR,23);  
                            temp = Ext.Date.add(new Date(temp),Ext.Date.MINUTE,59);  
                            temp = Ext.Date.add(new Date(temp),Ext.Date.SECOND,59);  
                            t.setValue(temp);  
                        }  
                    }},{
            		xtype: 'form',
            		border: 0,
            		items:[{
            			columnWidth: .20,
	                    text: "搜&nbsp;&nbsp;索",
	                    xtype: "button",	    
	             		listeners:{
	             			click:function(){
	             				var userName = Ext.getCmp("userName").getValue() == null ? "" : Ext.getCmp("userName").getValue().trim();
	             				var beginTime = Ext.getCmp("beginTime").getRawValue() == null ? "" : Ext.getCmp("beginTime").getRawValue().trim();
	             				var endTime = Ext.getCmp("endTime").getRawValue() == null ? "" : Ext.getCmp("endTime").getRawValue().trim();
	             				param1 = {
	             						"userName": userName,
	             						"beginTime" : beginTime,
	             						"endTime" : endTime,
	             				};
	             				var param = {
	             						"userName": userName,
	             						"beginTime" : beginTime,
	             						"endTime" : endTime,
	             						"start": 0,
	             				        "limit": 10
	             					};
	             					myStore.load({
	             						params : param
	             					});
	             			}
		                    }
            		}]
  

            	}]
        	}]
        }]
    });
	
    var tbar2 = new Ext.Toolbar({
        xtype: "form",
        hight: 100,
        width: 200,
        items: [gbicc.component.button.createTBarButton('添加网页用户', addPageUserWin)]
    });
       	
    //创建表格  

    var grid = new Ext.grid.GridPanel({
        region: 'center',
        store: myStore,
        collapsible: false,
        split: true,
        border: true,
        columns: columns,
        stripeRows: true,
        loadMask: true,
        forceFit: true,
        bbar: new Ext.PagingToolbar({
            pageSize: 1,
            id: 'bbar',
            store: myStore,
            firstText: '第一页',
            prevText: '前一页',
            nextText: '后一页',
            lastText: '最后一页',
            refreshText: '刷新',
            autoWidth: true,
            displayInfo: true,
            displayMsg: '当前显示{0}-{1}条数据,共{2}条数据',
            emptyMsg: "没有记录"
        }),
        tbar: tbar2
    });

    //创建一个Ext.menu.Menu
    var contextmenu = new Ext.menu.Menu({
        id: 'theContextMenu',
        items: [{
            text: '查看详情',
            handler: function (e) {
            	parent.Ext.Msg.alert("系统提示", e.row);
            }
        }]
    });

    //监听表格的Ext.menu.Menu事件
    grid.on("itemcontextmenu", function (view, record, item, index, e) {
        e.preventDefault();
        contextmenu.showAt(e.getXY());
    });
	
    var viewport = new Ext.Viewport({
        layout: 'border',
        border: 0,
        width:860,
        hight:600,
        items: [serachBar, grid]
    });
});


function deleteUser(user_id){
	parent.Ext.MessageBox.confirm(
		'删除',
		'确定删除此条数据吗？',
		function (btn) {
            if ("yes" == btn) {
            	CallWebService("sms_user/sms_user_deleteUser.do?user_id="+user_id, null, function (request, opt) {
    	        	var result = request.responseText;
    	        	var requestText = eval("("+result+")");
    	        	if(requestText.msg == null){
    		        	var data = requestText.data;
    		        	if(data != null)
    		        		parent.Ext.Msg.alert('提示',data);
    		        	myStore.reload();
    		        }
    		        else{
    		        	parent.Ext.Msg.alert('提示',requestText.msg);
    		        	if(requestText.msg_no == '-5')
    	        	 		window.parent.parent.location.href = "tologin.do";
    		        }      	
    	        });
            } else {
            	return;
            }
		}
    );	
}
function updateUser(userid,username,resource){
    Ext.QuickTips.init();
   
    var forms = Ext.create("Ext.window.Window",{
    	width: 466,
    	height: 330,
    	modal:true,
    	collapsible: true,  // 收缩按钮
    	title: '',
    	renderTo: Ext.getBody(),
    	items: [{
    		xtype: 'panel',
    		width: 466,
    		height: 330,
    		items:[{

            	id: 'approvalForm',
            	border: 0,
            	xtype: 'form',
            	layout: 'column',
            	height: 270,
            	defaults: {
            		padding: 20
            	},
            	items: [{
            		xtype: 'container',
            		layout: 'column',
            		height: 40,
            		items: [{
                        xtype: 'container',
                        height: 40,
                        layout: 'column',
                        items: [
                            {
                                xtype: 'textfield',
                                emptyText:'用户名',
                                id: 'username2',
                                name: 'username2',
                                width: 350,
                                fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                                fieldLabel: '用户名',
                                labelStyle: 'font-weight:1500',
                                margin: '10,10,10,10',
                                labelAlign: 'right',
                            },
                            {
                                xtype: 'textfield',
                                emptyText:'密码',
                                id: 'password2',
                                name: 'password2',
                                width: 350,
                                fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                                fieldLabel: '密&nbsp;&nbsp;&nbsp;&nbsp;码',
                                labelStyle: 'font-weight:1500',
                                margin: '10,10,10,10',
                                labelAlign: 'right',
                            },{
                                xtype: 'numberfield',
                                emptyText:'资源数',
                                id: 'resource2',
                                name: 'resource2',
                                width: 350,
                                allowBlank: false, 
                                allowNegative: false,
                                minValue: 0, 
                                fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                                fieldLabel: '资源数',
                                labelStyle: 'font-weight:1500',
                                margin: '10,10,10,10',
                                labelAlign: 'right',
                            }
                        ]
                    }]
            	},{
            		xtype: 'container',
            		height: '20',
            		padding: '140 0 10 100',
            		items: [{
            			xtype: 'button',
            			width: 100,
            			height: 30,
            			id:'quxiao',
            			text: '取消',
            			handler: function(){
            				forms.close();
            			}
            		},{
            			xtype: 'label',
            			padding: '5 50 5 20'
            		},{
            			xtype: 'button',
            			width: 100,
            			height: 30,
            			id:'queding',
            			text: '确定',
            			handler : function() {

        					var username2 = Ext.getCmp("username2")
        							.getValue() == null ? "" : Ext
        							.getCmp("username2").getValue()
        							.trim();
        					var password2 = Ext.getCmp("password2")
							.getValue() == null ? "" : Ext
							.getCmp("password2").getValue()
							.trim();
        					var resource2 = Ext.getCmp("resource2")
							.getRawValue() == null ? "" : Ext
							.getCmp("resource2").getRawValue()
							.trim();
        					var param = {
        						"name":username2,
        						"resource":resource2,
        						"pwd":password2,
        						"id":userid
        					};
        					var json = Ext.encode(param);
        					CallWebService("sms_user/sms_user_updateUser.do?p1Dto="+json,null,function(request, options){
        						//填写注册信息值
        						var result = request.responseText;
        				        var requestText = eval("("+result+")");
        				        var data = requestText.data;
        				        if(requestText.msg == null){
        				        	var data = requestText.data;
        	    		        	if(data != null)
        	    		        		parent.Ext.Msg.alert('提示',data);
        	    		        		myStore.reload();
        				        	setTimeout(function() {
        				        		forms.close();
        				    		}, 500);
        				        	forms.close();
        				        }else{
        				        	Ext.MessageBox.alert("错误！",requestText.msg);
        	    		        	if(requestText.msg_no == '-5')
        	    	        	 		window.parent.parent.location.href = "tologin.do";
        				        }
        					},null);
        				}
            			
            		}]
            		
            	}]
            
    		}]
    	}]
    });
   
    
    forms.on("close",function(){
//        window.history.go(-1);
    });
   
    /**
     * 填写用户基本信息
     */
    function writeUserinfo(){
    	Ext.getCmp("username2").setValue(username);
    	Ext.getCmp("resource2").setValue(resource);
    }
    forms.show();

    
    var viewport_user = new Ext.Viewport({
        layout: 'border',
        region: 'center',
        border: 0,
        width:860,
        hight:600,
        items: [{
        	xtype: 'panel',
        	region:'center',
        	height: 1200,
        	items: [forms]
        }]
    });
    
    writeUserinfo();
    

}
/**
 * 获得输入值
 * @param id
 * @returns
 */
function getVal(id){
	return Ext.getCmp(id).getValue();
}
