function CallWebService(method, params, onSuccess, onFailure) {
	Ext.Ajax.request({
	    type: "POST",   // 发送数据
	    url: method,    // WebService 地址和方法
	    params: params,
	    success: onSuccess, // 执行成功
	    failure: onFailure  //执行失败
	});
};

var param1;
var forms;
/**
 * 构筑页面部分
 */
Ext.onReady(function(){

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
		autoLoad: true
	});
	
	Ext.define('planList1', {
		extend: 'Ext.data.Model',
		fields: [
	       	{name: 'lname' }, //mapping:0 这样的可以指定列显示的位置，0代表第1列，可以随意设置列显示的位置  
	       	{name: 'lphone' },
	    ]
	});
    LXZStore = Ext.create('Ext.data.Store', {
		model: 'planList1',
		autoLoad: false,
		proxy: {
        	type: 'ajax',
//         	url: 'sms_user/sms_user_getLUser.do',
         	actionMethods: {  
            	read: 'POST'  
         	},
	        reader: {
				type: 'json',
	            root: 'data'
	        }
		},
	});
    
    //点击下一页时传递搜索框值到后台  
    myStore.on('beforeload', function (myStore, options) { 
         Ext.apply(myStore.proxy.extraParams, param1);    
     });
    
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


	//定义列  
	var columns = [
  		{header: '联系人名称', dataIndex: 'lname'},   
	 	{header: '联系人电话', dataIndex: 'lphone'},
	];
	var columns1 = [
	         		{header: '联系人名称', dataIndex: 'lname'},   
	       	 	{header: '联系人电话', dataIndex: 'lphone'},
	       	];
	

	  //serach bar
	    var serachBar = new Ext.FormPanel({
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
        
    });
    var sm1 = Ext.create('Ext.selection.CheckboxModel',{ checkOnly :true }); 
    var grid1 = new Ext.grid.GridPanel({
        region: 'center',
        store: LXZStore,
        collapsible: false,
        split: true,
        selModel: sm1,
        columns: columns1,
        stripeRows: true,
        viewConfig: {
            loadMask: false
        },
        loadMask: false,
        forceFit: true,
    });
    
        forms = Ext.create('Ext.Panel', {
        id: 'addLXRform',
        bodyPadding: 10,
        height: 540,
        width:1030,
        layout: 'border',
//        autoScroll: true,
        title: '',
        defaults: {
            split: false,                 //是否有分割线
            collapsible: true,           //是否可以折叠
//            bodyStyle: 'padding:15px'
        },
        items: [
                {
                	region: "north", 
                	title:'组名称',
                	layout : 'column',
                	height: 70, 
                    items:[{
                    	xtype: 'textfield',
                        id: 'G_name',
                        height:30,
                        width:600,
                        emptyText:'联系组名称',
//                        fieldLabel: '组名称'
                    },{
                    	xtype:'button',
                    	id:'G_save',
                    	bodypadding: '0 0 0 10',
                    	height:30,
                    	width:60,
                    	text:'保存',
                        handler: function(){
                        	Ext.MessageBox.confirm("提示！","这将会添加本次信息，请确认！",function(v){
                        		if(v=="yes"){
                        			var save = true;
                        			Gname = getVal('G_name');
                        			//这里需要进行严格的名字判断：名字命名方式是否正确，名字是否已经存在
                        			if(Gname != "" && Gname != null && Gname != "undefind"){
                        				FenzuStore.each(function(record){
                        					if(record.raw.name == Gname){
                        						alert(Gname+"已经存在！");
                        						save = false;
                        					}
                        				});
                        				if(save){
                        					var idArray = null;
            								LXZStore.each(function(csRecord){
            										idArray = idArray+csRecord.raw.id+"@";//将‘@’作为分割id的
            									});
                        					CallWebService("sms_user/sms_user_addUserGroup.do?p1Dto="+idArray+"&&groupName="+Gname,null,function(request, options){
                        						//填写注册信息值
                        						var result = request.responseText;
                        				        var requestText = eval("("+result+")");
                        				        var data = requestText.data;
                        				        if(requestText.msg == null){
                        				        	var data = requestText.data;
                        	    		        	if(data != null)
                        	    		        		parent.Ext.Msg.alert('提示',data);
                        	    		        		myStore.reload();
//                        	    		        		forms.close();
                        				        }else{
                        				        	Ext.MessageBox.alert("错误！",requestText.msg);
                        	    		        	if(requestText.msg_no == '-5')
                        	    	        	 		window.parent.parent.location.href = "tologin.do";
                        				        }
                        					},null);
                        				}
                        		}else{
                        			alert("组名不能为空！");
                        		}
                        			
                        		}else{
                        		}
                        		//用户选择no，不做处理
                        	});
                        }
                    }]
                },
                {
                	region: "center", 
                    xtype: 'container',
                    layout:'border',
                    items: [{
                		region:"west",  
                		width:450,
                		layout: 'border',
                		title:"所有联系人",
                        items:[grid],
                    },{
                		region:"east",  
                		width:450,
                		layout: 'border',
                		autoScroll: true,
                		title:"组联系人",
                        items:[grid1],
                	
                	
                    },{
                		region:"center",  
                		xtype:'panel',
                		layout: {
                		    type: 'form',
                		    align: 'middle ',
                		    pack: 'center'
                		},
                		title:"操作",
                        items:[{
                        	xtype:'button',
                        	id:'G_add',
                        	padding: '10 10 10 10',
                        	height:40,
                        	width:70,
                        	text:'添加',
                            handler: function(){
                            	var record = grid.getSelectionModel().selected;
        						var num = record.items.length;
        						if (num>0 && num!= null){
        							for(var i = 0;i<num;i++){
        								var temp = true;
        								//进行添加数据到本地数据
        								LXZStore.each(function(csRecord){
        									if(record.items[i].raw.id==csRecord.raw.id){
        										alert(csRecord.raw.lname+" 已经存在！");
        										temp = false;
        									}});
        								if(temp == true)
        									LXZStore.add(record.items[i]);
        							}
        						}
        						LXZStore.load();
                            }
                        
                        },{
                        	xtype:'button',
                        	id:'G_delete',
                        	padding: '10 10 10 10',
                        	height:40,
                        	width:70,
                        	text:'移除',
                            handler: function(){
                            	var record = grid1.getSelectionModel().selected;
        						var num = record.items.length;
        						if (num>0 && num!= null){
        							for(var i = 0;i<num;i++){
        								//进行添加数据到本地数据
        								LXZStore.remove(record.items[0]);
        							}
        						}
        						LXZStore.load();

                            }
                        
                        }],
                    }]

                }
            ]

    });


    
    var viewport_user = new Ext.Viewport({
        layout: 'form',
        region: 'center',
        border: 0,
        width:800,
        hight:600,
        items: [{
        	xtype: 'panel',
        	items: [forms]
        }]
    });
    

}); 


/**
 * 获得输入值
 * @param id
 * @returns
 */
function getVal(id){
	return Ext.getCmp(id).getValue();
}
/**
 * 根据ID设置值
 * @param id
 * @param value
 */
function setVal(id,value){
	Ext.getCmp(id).setValue(value);
}