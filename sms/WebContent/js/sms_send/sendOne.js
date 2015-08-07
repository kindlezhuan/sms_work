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
Ext.onReady(function () {
    Ext.QuickTips.init();
    
    
    //定义数据源
	Ext.define('planList', {
		extend: 'Ext.data.Model',
		fields: [
	       	{name: 'lname' }, //mapping:0 这样的可以指定列显示的位置，0代表第1列，可以随意设置列显示的位置  
	       	{name: 'lphone' },
	    ]
	});
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
        		padding: '0 0 0 0',
        		height: 40,
            	defaults: {
            		padding: '0 0 0 0'
            	},
            	items:[{

            		xtype: 'textfield',
        			id: 'LName',
        			fieldLabel: 'N',
        			labelWidth: 10,
        			padding: '0 0 0 0',
        			width: 100
            	},{

            		xtype: 'textfield',
        			id: 'LPhone',
        			fieldLabel: 'T',
        			labelWidth: 10,
        			padding: '0 0 0 0',
        			width: 100
            	},{
            		xtype: 'form',
            		padding: '0 0 0 0',
            		border: 0,
            		items:[{
            			columnWidth: .20,
	                    text: "S",
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
	 	{header: '操作', dataIndex: '', renderer:function(v,meta,record){
	 			return  "<a href=\"javaScript:addLXRtoSend("+record.get('id')+",'Send_Id',"+record.get('lphone')+")\">添加</a>"
	 		}}
	];
	
	//tbar 上部菜单栏
	 var tbar = Ext.create("Ext.toolbar.Toolbar", {
         items: [
             {
                  text: '添加&nbsp;&nbsp;&nbsp;&nbsp;',
                  iconCls: 'a_cross',
                  handler: function(){

						var record = grid.getSelectionModel().selected;
						var num = record.items.length;
						if (num>0 && num!= null){
//							setVal(record.items[0].raw.fwlbmc,id);
							for(var i = 0;i<num;i++){
								addLXRtoSend(record.items[i].raw.id,'Send_id',record.items[i].raw.lphone);
							}
							alert("添加成功");
						}
						else
							alert("没有选中信息！");
						
					
                  }
             }
         ]
     });

    //创建表格  
	var sm = Ext.create('Ext.selection.CheckboxModel',{ checkOnly :true }); 
    var grid = new Ext.grid.GridPanel({
        region: 'center',
        store: myStore,
        collapsible: false,
        split: true,
        selModel: sm,
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
    
    var form1 = Ext.onReady(function(){   
        new Ext.Viewport({  
                            layout:"border", 
                            defaults: {
                                split: true,                 //是否有分割线
                                collapsible: true,           //是否可以折叠
                                bodyStyle: 'padding:15px'
                            },
                            items:[
                            {
                            	region:"center",  
                            	collapsible: false,  
                            	title:"短信发送",
                            	items:[

                                       {
                                           xtype: 'container',
                                           border: '',
                                           height: 190,
                                           defaults: {
                                               padding: '10 10 10 0'
                                           },
                                           items: [
                                               {
                                                   xtype: 'container',
                                                   height: 40,
                                                   layout: 'column',
                                                   items: [
                                                       {
                                                           xtype: 'textfield',
                                                           width: 600,
                                                           id: 'Send_Id',
                                                           emptyText:'手机号码，如：13800000000',
                                                           fieldLabel: '接收人'
                                                       }
                                                   ]
                                               },
                                               {
                                                   xtype: 'container',
                                                   height: 240,
                                                   items: [
                                                       {
                                                       	id: 'Send_File',
                                                           xtype: 'textarea',
                                                           width: 600,
                                                           height: 240,
                                                           emptyText:'短信正文内容',
                                                           fieldLabel: '发送内容'
                                                       }
                                                   ]
                                               }
                                           ]
                                       },
                                       {
                                           xtype: 'container',
                                           padding: '120 100 10 140',
                                           items: [{
                                           	xtype: 'container',
                                           	id: 'btnContainer',
                                           	items: [{
                                           		id:'submitBtn',
                                           		xtype:'button',
                                                width: 100,
                                                text: '发送',
                                                listeners: { "click": function () {
                                                   send();
                                                }
                                                }
                                           	}]
                                           	
                                           }]

                                       }
                            	       ]
                            	
                            	},  
                            {
                                	xtype:'treepanel',
                            		region:"west",  
                            		width:200,  
//                            		height:600,
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
                                            if(record.data.leaf==true){  
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
                                                    	alert("Delete");
                                                    }  
                                                }]  
                                                  
                                            });  
                                            nodemenu.showAt(e.getXY());  
                                            }
                                        }  
                                    }
                            	}
                            	,{
                            		region:"east",  
                            		width:300,
                            		layout: 'border',
//                            		height:600,
                            		collapsible: true, 
                            		title:"添加联系人",
                                    autoScroll: true,
                                    items:[serachBar, grid],
                            	
                            	}
                            ]  
        });   

}); 
    
        viewport = new Ext.Viewport({
        layout: 'border',
        height: 600,
        width: 860,
        border: 0,
        closeAction:'destroy',
        items: [form1]
    });

    addButton();
});

/**
 * @param act
 * @param form
 * @returns {String}
 */
function addButton(){
	Ext.create('Ext.button.Button',{
    	id:'submitBtn',
        width: 100,
        text: '发送',
        renderTo: Ext.get("btnContainer"),
        handler: function(){
        	Ext.MessageBox.confirm("提示！","这将会发送本次信息，请确认！",function(v){
        		if(v=="yes"){
//        			send();
        		}else{
        			//用户选择no，不做处理
        		}
        	});
        }
	});
}

/**
 * 发送短息
 */
function send(){
	var SubOrNot = true;//用来判断是否需要提交保存
	SubOrNot = IsExtisNull();
	var Send_Id = getVal('Send_Id');
	var Send_File = getVal('Send_File');
	var param = {'MOBILE':Send_Id,'MSG':Send_File};
		
	var json = Ext.encode(param);
	if(SubOrNot){
		CallWebService("sms_send/sms_send_toSendOne.do?p1Dto="+json, null, function (request, opt) {
        	var result = request.responseText;
        	var requestText = eval("("+result+")");
        	if(requestText.msg == null){
	        		parent.Ext.Msg.alert('结果',"发送成功");
	        		addUserWindow.close();
	        }
	        else{
	        	parent.Ext.Msg.alert('结果',"发送失败:"+requestText.msg);
	        }      	
        });
		}else{
        	Ext.MessageBox.alert("错误！","可能存在未填信息！");
        }
	
}
/**
 * 添加联系人到接收者  重复验证？手机号验证
 */
var addLXRtoSend = function(sID,gID,tel){
	var reciver =  getVal('Send_Id')+tel+";";
	Ext.getCmp('Send_Id').setValue(reciver);
};
/**
 * 去除重复
 * @param someArray
 * @returns {___anonymous_tempArray}
 */
function getUnique(someArray)  
{  
	tempArray=someArray.slice(0);//复制数组到临时数组  
	for(var i=0;i<tempArray.length;i++)  
	{  
		for(var j=i+1;j<tempArray.length;)  
		{  
			if(tempArray[j]==tempArray[i])  
			//后面的元素若和待比较的相同，则删除并计数；  
			//删除后，后面的元素会自动提前，所以指针j不移动  
			{  
				tempArray.splice(j,1);  
			}  
			else  
			{  
				j++;  
			}  
			//不同，则指针移动  
		}  
	}  
//		if(tempArray[tempArray.length-1] == '' || tempArray[tempArray.length-1] == "")
//			tempArray.splice(tempArray.length-1,1);//删除最后一个元素
		return tempArray;  
} 

/**
 * 验证手机号
 */
function isMobilePhone(tel){
	var telReg = !!tel.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
	//如果手机号码不能通过验证
	if(telReg == false){
		alert("手机号："+tel+"错误！");
		return false;
	}
	else
		return true;
}
/**
 * 基本验证
 */
var IsExtisNull = function(){
	var Send_Id = getVal('Send_Id');
	var Send_File = getVal('Send_File');
	if(Send_Id == null || Send_Id == ""){
		alert("接收人  不能为空！");
		return false;
	}else{
		//重复验证
		var strs= new Array(); //定义一数组 
		var str = Send_Id;
		strs=str.split(","); //字符分割 
		strs = getUnique(strs);//去除重复号码
		for(var j=0;j<strs.length-1;j++){
			isMobilePhone(strs[j]);
		} 
		setVal('Send_Id',strs.toString());
	}
	if(Send_File == null || Send_File == ""){
		alert("发送内容 不能为空！");
		return false;
	}
	
	return true;
};
/**
 * 获得输入值
 * @param id
 * @returns
 */
function getVal(id){
	return Ext.getCmp(id).getValue();
}
function setVal(id,value){
	Ext.getCmp(id).setValue(value);
}