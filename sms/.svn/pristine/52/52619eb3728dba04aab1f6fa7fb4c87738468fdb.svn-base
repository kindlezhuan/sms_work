function CallWebService(method, params, onSuccess, onFailure) {
	Ext.Ajax.request({
	    type: "POST",   // 发送数据
	    url: method,    // WebService 地址和方法
	    params: params,
	    success: onSuccess, // 执行成功
	    failure: onFailure  //执行失败
	});
};

/**
 * 构筑页面部分
 */
var param1 = null;

Ext.onReady(function () {
    Ext.QuickTips.init();

    var mainVs = Ext.getBody().getViewSize();
    var winHeight = mainVs.height + 100;
    
  //定义数据源
	Ext.define('planList', {
		extend: 'Ext.data.Model',
		fields: [
	       	{name: 'lname' }, //mapping:0 这样的可以指定列显示的位置，0代表第1列，可以随意设置列显示的位置  
	       	{name: 'lphone' },
	       	{name: 'ugroup' },
	    ]
	});

	//初始化时自动填充数据
	myStore = Ext.create('Ext.data.Store', {
		model: 'planList',
		pageSize : 10,
		proxy: {
        	type: 'ajax',
         	url: 'sms_user/sms_user_getLUser.do',
         	actionMethods: {  
            	read: 'POST'  
         	},
	        reader: {
				type: 'json',
	            root: 'data'
	        }
		},
		autoLoad: false
	});
	
    //点击下一页时传递搜索框值到后台  
 	myStore.on('beforeload', function (myStore, options) { 
         Ext.apply(myStore.proxy.extraParams, param1);    
     }); 

	
	var store = Ext.create('Ext.data.TreeStore', {  
        autoLoad : true,  
        proxy : {  
                type : 'ajax',  
                url : 'sms_user/sms_user_getTreeParent.do?',//请求  
                reader : {  
                    type : 'json',  
                    root : 'data'//数据  
                },  
                //传参  
                extraParams : {  
                    tid : ''  
                }  
            },  
        root : {  
            text : '管理菜单',  
            expanded : true           
        },  
        listeners : {  
            'beforeexpand' : function(node,eOpts){  
        //点击父亲节点的菜单会将节点的id通过ajax请求，将到后台  
                this.proxy.extraParams.tid = node.raw.tid;  
            }  
        }  
    });  
	


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
        			id: 'LName',
        			fieldLabel: '联系人名称',
        			labelWidth: 80,
        			padding: '0 10 0 10',
        			width: 180
            	},{

            		xtype: 'textfield',
        			id: 'LPhone',
        			fieldLabel: '联系人电话',
        			labelWidth: 80,
        			padding: '0 10 0 10',
        			width: 180
            	},{
            		xtype: 'form',
            		padding: '0 10 0 10',
            		border: 0,
            		items:[{
            			columnWidth: .20,
	                    text: "搜&nbsp;&nbsp;索",
	                    xtype: "button",	    
	             		listeners:{
	             			click:function(){
	             				var LName = Ext.getCmp("LName").getValue() == null ? "" : Ext.getCmp("LName").getValue().trim();
	             				var LPhone = Ext.getCmp("LPhone").getValue() == null ? "" : Ext.getCmp("LPhone").getValue().trim();
	             				param1 = {
	             						"LName": LName,
	             						"LPhone" : LPhone,
	             				};
	             				var param = {
	             						"LName": LName,
	             						"LPhone" : LPhone,
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
    
   	//定义列  
	var columns = [
  		{header: '联系人名称', dataIndex: 'lname'},   
	 	{header: '联系人电话', dataIndex: 'lphone'},
  		{header: '联系人所在组', dataIndex: 'ugroup'},   
	 	{header: '操作', dataIndex: '', renderer:function(v,meta,record){
	 			return  "<a href=\"javaScript:updateUser("+record.get('id')+","+record.get('lname')+")\">修改</a>  " +
	 			"<a href=\"javaScript:deleteLXR("+record.get('id')+")\">删除</a>";
	 		}}
	];
	
	//tbar 上部菜单栏
	 var tbar = Ext.create("Ext.toolbar.Toolbar", {
         items: [
             {
                  text: '新增组&nbsp;&nbsp;&nbsp;&nbsp;',
                  iconCls: 'a_cross',
                  handler: addLXRGroup
             }, '-',
             {
                 text: '新增&nbsp;&nbsp;&nbsp;&nbsp;',
                 iconCls: 'a_cross',
                 handler: addLXR
             }, '-',
             {
                 text: "删除&nbsp;&nbsp;&nbsp;&nbsp;",
                 iconCls: "a_refresh",
                 handler: function () {
						var record = grid.getSelectionModel().selected;
						var num = record.items.length;
						if (num>0 && num!= null){
							for(var i = 0;i<num;i++){
			                	 //调用deleteL方法
            					var idArray = null;
            					myStore.each(function(csRecord){
										idArray = idArray+csRecord.raw.id+"@";//将‘@’作为分割id的
									});
								deleteLXR(idArray);
							}
							//刷新数据
							myStore.load();
						}
						else
							alert("没有选中信息！");
                 }
             }
         ]
     });

	 /**
	  * 新增联系人组
	  */
	 function addLXRGroup(){
	 	//跳转到联系人组添加页面
	 	parent.ShowWindow('联系组添加', 1050, mainVs.height+100, 'sms_user/sms_user_toAddLXRGroup.do?');
	 }
	 
    //创建表格  
	var sm = Ext.create('Ext.selection.CheckboxModel',{ checkOnly :true }); 
    var grid = new Ext.grid.GridPanel({
        region: 'center',
        store: myStore,
        collapsible: false,
        split: true,
        selModel: sm,
//        border: true,
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
        tbar:tbar
        
    });
        viewport = new Ext.Viewport({
        layout: 'border',
        height: 600,
        width: 860,
        border: 0,
        closeAction:'destroy',
        items: [
                {
                	xtype:'treepanel',
            		region:"west",  
            		width:300,  
            		height:600,
            		collapsible: true, 
            		title:"通讯录",
            		useArrows:true,
            		rootVisible: false,
                    autoScroll: true,
            	    store: store,
                    listeners: {
                        //点击行触发事件
                        'itemclick': function (record, node) {
                        	//判断节点类型 
                        	if(node.raw.leaf == true){
                        		
                        		myStore.load(
                        				param1 = {
                        						"LName": '',
                        						"LPhone" : '',
                        						"Gid":node.raw.tid,
                        						
                        				});
                        	}
                        }, 
                        'itemcontextmenu':function(menutree,record,items,index,e){  
                            e.preventDefault();  
                            e.stopEvent();  
                            //判断是否为叶子结点  
                            if(record.raw.leaf==true && record.raw.parentId != 6){  
                            var nodemenu = new Ext.menu.Menu({  
                                floating:true,  
                                items:[{  
                                    text:'修改',  
                                    handler:function(){
                                    	alert("update");
                                    }  
                                },{  
                                    text:'删除',  
                                    handler:function(){
                                    	var G_id = record.raw.tid;
                    					CallWebService("sms_user/sms_user_deleteLXRGroup.do?G_id="+G_id,null,function(request, options){
                    						//填写注册信息值
                    						var result = request.responseText;
                    				        var requestText = eval("("+result+")");
                    				        var data = requestText.data;
                    				        if(requestText.msg == null){
                    				        	var data = requestText.data;
                    	    		        	if(data != null)
                    	    		        		parent.Ext.Msg.alert('提示',data);
                    	    		        		myStore.reload();
                    				        }else{
                    				        	Ext.MessageBox.alert("错误！",requestText.msg);
                    	    		        	if(requestText.msg_no == '-5')
                    	    	        	 		window.parent.parent.location.href = "tologin.do";
                    				        }
                    					},null);
                                    }  
                                }]  
                                  
                            });  
                            nodemenu.showAt(e.getXY());  
                            }
                        }  

                }  
            	},  
                {
                	region:"center",  
                	layout: 'border',
                	collapsible: false, 
                	autoWidth:true,
                	title:"联系人管理",
                	items:[serachBar, grid]
                	
                	}  
                ]
    });

});

function updateUser(userID){
	alert("updateUser");
}

/**
 * 新增联系人
 */
var addLXR = function(){

    Ext.QuickTips.init();

    Ext.define('Fenzu', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'name',  type: 'string'}
        ]
    });
    var FenzuStore = Ext.create('Ext.data.Store', {
    	autoLoad : true, 
    	model:'Fenzu',
        proxy : {  
            type : 'ajax',  
            url : 'sms_user/sms_user_getFenzuData.do?',//请求  
            reader : {  
                type : 'json',  
                root : 'data'//数据  
            }
        }
    });


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
            	id: 'userGroupForm',
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
                                emptyText:'联系人姓名',
                                id: 'Lusername',
                                name: 'Lusername',
                                width: 350,
                                fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                                fieldLabel: '联系人姓名',
                                labelStyle: 'font-weight:1500',
                                margin: '10,10,10,10',
                                labelAlign: 'right',
                            },
                            {
                                xtype: 'textfield',
                                emptyText:'联系人电话',
                                id: 'Lphone',
                                name: 'Lphone',
                                width: 350,
                                fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                                fieldLabel: '联系人电话',
                                labelStyle: 'font-weight:1500',
                                margin: '10,10,10,10',
                                labelAlign: 'right',
                            },{
                                xtype: 'combo',
                                emptyText:'联系人分组',
                                id: 'Lgroup',
                                name: 'Lgroup',
                                store: FenzuStore,
                                queryMode: 'local',
                                valueField: 'abbr',
                                multiSelect:true,
                                editable:false,
                                width: 350,
                                fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                                fieldLabel: '联系人分组',
                                labelStyle: 'font-weight:1500',
                                margin: '10,10,10,10',
                                labelAlign: 'right',
                                valueField : 'id',   
                                displayField : 'name',
//                                tpl: Ext.create('Ext.XTemplate',
//                                        '<tpl for=".">',
//                                            '<div class="x-boundlist-item">{name}</div>',
//                                        '</tpl>'
//                                    ),
//                                    // template for the content inside text field
//                                displayTpl: Ext.create('Ext.XTemplate',
//                                        '<tpl for=".">',
//                                            '{name};',
//                                        '</tpl>'
//                                    )
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
            			text: '添加',
            			handler : function() {
            				
            				//测试得到选择的数据；
        					var L_name = Ext.getCmp("Lusername")
        							.getValue() == null ? "" : Ext
        							.getCmp("Lusername").getValue()
        							.trim();
        					var L_phone = Ext.getCmp("Lphone")
							.getValue() == null ? "" : Ext
							.getCmp("Lphone").getValue()
							.trim();
        					var L_group = Ext.getCmp("Lgroup").getValue();
            				//需要先验证手机号正确性,lname,lphoen不能为空
        					var param = {
        						"lname":L_name,
        						"lphone":L_phone,
        					};
        					var json = Ext.encode(param);
        					CallWebService("sms_user/sms_user_addLXR.do?p1Dto="+json+"&L_group="+L_group,null,function(request, options){
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
    
};
/**
 * 删除联系人
 * @param lidArray
 */
function deleteLXR(lidArray){
	//将多个L_id 合并成一个字符串，交给后台的java代码处理。
	CallWebService("sms_user/sms_user_deleteLXR.do?p1Dto="+lidArray,null,function(request, options){
		//填写注册信息值
		var result = request.responseText;
        var requestText = eval("("+result+")");
        var data = requestText.data;
        if(requestText.msg == null){
        	var data = requestText.data;
        	if(data != null)
        		parent.Ext.Msg.alert('提示',data);
        		myStore.reload();
        		forms.close();
        }else{
        	Ext.MessageBox.alert("错误！",requestText.msg);
        	if(requestText.msg_no == '-5')
    	 		window.parent.parent.location.href = "tologin.do";
        }
	},null);
	
}


/**
 * 获得输入值
 * @param id
 * @returns
 */
function getVal(id){
	return Ext.getCmp(id).getValue();
}