function CallWebService(method, params, onSuccess, onFailure) {
	Ext.Ajax.request({
	    type: "POST",   // 发送数据
	    url: method,    // WebService 地址和方法
	    params: params,
	    success: onSuccess, // 执行成功
	    failure: onFailure  //执行失败
	});
};
var myStore;
var param1;

Ext.onReady(function () {
    Ext.QuickTips.init();
    
    var mainVs = Ext.getBody().getViewSize();
    winHeight = mainVs.height + 100;
    
   	//定义列  
	var columns = [
	    {header: 'MID', dataIndex: 'tmid'}, 
  		{header: '发送人', dataIndex: 'sendname'},   
	 	{header: '接收人', dataIndex: 'recivename'},
	 	{header: '发送时间', dataIndex: 'sendtime'},  
  		{header: '发送结果', dataIndex: 'sendresult'},   
	 	{header: '操作', dataIndex: '', renderer:function(v,meta,record){
	 			return  "<a href=\"javaScript:showLogDetail("+record.get('id')+")\">查看详细信息</a>";
	 		}}
	];
	
	//定义数据源
	Ext.define('planList', {
		extend: 'Ext.data.Model',
		fields: [
	       	{name: 'tmid' }, //mapping:0 这样的可以指定列显示的位置，0代表第1列，可以随意设置列显示的位置  
	       	{name: 'sendname' },
	       	{name: 'recivename' },
	       	{name:'sendtime'},
	       	{name:'sendresult'}
	    ]
	});

	//初始化时自动填充数据
	myStore = Ext.create('Ext.data.Store', {
		model: 'planList',
		pageSize : 10,
		proxy: {
        	type: 'ajax',
         	url: 'sms_send/sms_send_getAllLoginfo.do',
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
 	
	//新增网页用户

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
        			id: 'sendName',
        			fieldLabel: '发件人',
        			labelWidth: 60,
        			padding: '0 10 0 10',
        			width: 160
            	},{

            		xtype: 'textfield',
        			id: 'reciveName',
        			fieldLabel: '收件人',
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
	             				var sendName = Ext.getCmp("sendName").getValue() == null ? "" : Ext.getCmp("sendName").getValue().trim();
	             				var reciveName = Ext.getCmp("reciveName").getValue() == null ? "" : Ext.getCmp("reciveName").getValue().trim();
	             				var beginTime = Ext.getCmp("beginTime").getRawValue() == null ? "" : Ext.getCmp("beginTime").getRawValue().trim();
	             				var endTime = Ext.getCmp("endTime").getRawValue() == null ? "" : Ext.getCmp("endTime").getRawValue().trim();
	             				param1 = {
	             						"sendName": sendName,
	             						"reciveName": reciveName,
	             						"beginTime" : beginTime,
	             						"endTime" : endTime,
	             				};
	             				var param = {
	             						"sendName": sendName,
	             						"reciveName": reciveName,
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


function showLogDetail(l_id){
    Ext.QuickTips.init();
   
    var forms = Ext.create("Ext.window.Window",{
    	width: 466,
    	height: 330,
        autoScroll: true, 
    	modal:true,
    	collapsible: true,  // 收缩按钮
    	title: '',
    	renderTo: Ext.getBody(),
    	items: [{
    		xtype: 'panel',
    		width: 400,
    		height: 500,
    		items:[{

            	id: 'approvalForm',
            	border: 0,
            	xtype: 'form',
            	layout: 'column',
            	height: 500,
            	defaults: {
            		padding: 10
            	},
            	items: [{
                    xtype: 'container',
                    height: 10,
                    layout: 'column',
                    items: [
                        {
                            xtype: 'textfield',
                            emptyText:'发送人',
                            id: 'sendname_detail',
                            name: 'sendname_detail',
                            width: 350,
                            fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                            fieldLabel: '发送人',
                            labelStyle: 'font-weight:1500',
                            margin: '10,10,10,10',
                            labelAlign: 'right',
                        },
                        {
                            xtype: 'textfield',
                            emptyText:'接收人',
                            id: 'reciveName_detail',
                            name: 'reciveName_detail',
                            width: 350,
                            fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                            fieldLabel: '接收人',
                            labelStyle: 'font-weight:1500',
                            margin: '10,10,10,10',
                            labelAlign: 'right',
                        },{
                            xtype: 'textfield',
                            emptyText:'MID',
                            id: 'MID',
                            name: 'MID',
                            width: 350,
                            fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                            fieldLabel: '信息ID',
                            labelStyle: 'font-weight:1500',
                            margin: '10,10,10,10',
                            labelAlign: 'right',
                        },{
                            xtype: 'textfield',
                            emptyText:'发送方法',
                            id: 'sendstyle',
                            name: 'sendstyle',
                            width: 350,
                            fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                            fieldLabel: '发送网关',
                            labelStyle: 'font-weight:1500',
                            margin: '10,10,10,10',
                            labelAlign: 'right',
                        },{
                            xtype: 'textfield',
                            emptyText:'接收方法',
                            id: 'P_C',
                            name: 'P_C',
                            width: 350,
                            fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                            fieldLabel: '接收方法',
                            labelStyle: 'font-weight:1500',
                            margin: '10,10,10,10',
                            labelAlign: 'right',
                        },{
                            xtype: 'textfield',
                            emptyText:'发送结果',
                            id: 'sendresult',
                            name: 'sendresult',
                            width: 350,
                            fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                            fieldLabel: '发送结果',
                            labelStyle: 'font-weight:1500',
                            margin: '10,10,10,10',
                            labelAlign: 'right',
                        },{
                            xtype: 'textfield',
                            emptyText:'返回代码',
                            id: 'resultcode',
                            name: 'resultcode',
                            width: 350,
                            fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                            fieldLabel: '返回代码',
                            labelStyle: 'font-weight:1500',
                            margin: '10,10,10,10',
                            labelAlign: 'right',
                        },{
                            xtype: 'textfield',
                            emptyText:'返回代码描述',
                            id: 'codeinfo',
                            name: 'codeinfo',
                            width: 350,
                            fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                            fieldLabel: '代码描述',
                            labelStyle: 'font-weight:1500',
                            margin: '10,10,10,10',
                            labelAlign: 'right',
                        },{
                            xtype: 'textfield',
                            emptyText:'发送时间',
                            id: 'sendtime',
                            name: 'sendtime',
                            width: 350,
                            fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                            fieldLabel: '发送时间',
                            labelStyle: 'font-weight:1500',
                            margin: '10,10,10,10',
                            labelAlign: 'right',
                        },{
                            xtype: 'textarea',
                            emptyText:'发送内容',
                            id: 'msg',
                            name: 'msg',
                            width: 350,
                            fieldStyle:'background-color: #F0F8FF; background-image: none;' ,
                            fieldLabel: '发送内容',
                            labelStyle: 'font-weight:1500',
                            margin: '10,10,10,10',
                            labelAlign: 'right',
                        }
                    ]
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
		CallWebService("sms_send/sms_send_getDetail.do?l_id="+l_id, null, function (request, opt) {
        	var result = request.responseText;
        	var requestText = eval("("+result+")");
        	if(requestText.msg == null){
	        	var data = requestText.data;
	        	if(data != null){
	        		Ext.getCmp("reciveName_detail").setValue(data.MOBILE);
	        		Ext.getCmp("msg").setValue(data.MSG);
	        		Ext.getCmp("sendname_detail").setValue(data.UID);
	        		Ext.getCmp("P_C").setValue(data.get_style);
	        		Ext.getCmp("sendtime").setValue(data.get_time);
	        		Ext.getCmp("sendresult").setValue(data.send_result);
	        		Ext.getCmp("resultcode").setValue(data.send_result_code);
	        		Ext.getCmp("codeinfo").setValue(data.send_result_code_info);
	        		Ext.getCmp("sendstyle").setValue(data.send_style);
	        		Ext.getCmp("MID").setValue(data.timeMsg_ID);
	        	}else{
	        		parent.Ext.Msg.alert('Error',"没有得到信息！");
	        	}
	        }
	        else{
	        	parent.Ext.Msg.alert('提示',requestText.msg);
	        	if(requestText.msg_no == '-5')
        	 		window.parent.parent.location.href = "tologin.do";
	        }      	
        });
    	
    	
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
