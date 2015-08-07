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

    var form1 = Ext.create('Ext.form.Panel', {
        id: 'xkzForm1',
        bodyPadding: 10,
        height: 460,
//        autoHeight: true,
        layout: 'form',
        autoScroll: true,
        title: '',
        items: [
                {
                    xtype: 'container',
                    border: '',
                    height: 190,
                    defaults: {
                        padding: '10 10 10 40'
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
                    	id: 'btnContainer'
                    }]

                }
            ]

    });

        viewport = new Ext.Viewport({
        layout: 'border',
        height: 600,
        width: 860,
        border: 0,
        closeAction:'destroy',
        items: [form1]
    });

    addButton(form1);
});

/**
 * 给form添加button
 * @param act
 * @param form
 * @returns {String}
 */
function addButton(form1){
	Ext.create('Ext.button.Button',{
    	id:'submitBtn',
        width: 100,
        text: '发送',
        renderTo: 'btnContainer',
        handler: function(){
        	Ext.MessageBox.confirm("提示！","这将会发送本次信息，请确认！",function(v){
        		if(v=="yes"){
        			savePage1(form1);
        		}else{
        			//用户选择no，不做处理
        		}
        	});
        }
	});
}

/**
 * 保存第一页
 */
function savePage1(form1){
	var SubOrNot = true;//用来判断是否需要提交保存
	SubOrNot = IsExtisNull();
	var Send_Id = getVal('Send_Id');
	var Send_File = getVal('Send_File');
	var param = {'MOBILE':Send_Id,'MSG':Send_File};
		
	var json = Ext.encode(param);
	if(SubOrNot){
		if(form1.form.isValid()){
	      	form1.form.doAction('submit', {
		    	url: 'sms_send/sms_send_toSendOne.do?p1Dto='+json,
	        	method: 'post', 	
	            waitMsg: "处理中...",
	            success: function(form,action) {
	            	parent.Ext.Msg.alert('操作',"发送成功");
	            	return 1;
	            },
	            failure: function(form,action){
	            	
	            	parent.Ext.Msg.alert('操作',"发送失败\t"+action.result.msg);    
	            	return 0;
	            }
	        });
	  	}
	}else
		Ext.MessageBox.alert("错误！","可能存在未填信息！");
	
}


//返回请求参数信息
function getUrlRequest(){
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        if (str.indexOf("&") != -1) {
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        } else {
            var key = str.substring(0,str.indexOf("="));
            var value = str.substr(str.indexOf("=")+1);
            theRequest[key] = decodeURI(value);
        }
    }
    return theRequest;
}
var IsExtisNull = function(){
	var Send_Id = getVal('Send_Id');
	var Send_File = getVal('Send_File');
	if(Send_Id == null || Send_Id == ""){
		alert("接收人  不能为空！");
		return false;
	}
	if(Send_File == null || Send_File == ""){
		alert("发送内容 不能为空！");
		return false;
	}
	
	return true;
}
/**
 * 获得输入值
 * @param id
 * @returns
 */
function getVal(id){
	return Ext.getCmp(id).getValue();
}