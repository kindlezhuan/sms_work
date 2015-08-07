Ext.onReady(function(){ 
new Ext.Viewport({ 
layout : 'border' , 
items : [{ 
region : 'north' , 
el : 'header' 
},new treePart(),myTab] 
}) 
}) ; 

treePart = function(){ 
treePart.superclass.constructor.call(this,{ 
region : 'west' , 
width : 200 , 
margins:'5 0 5 5', 
cmargins:'0 5 5 5', 
height : 300 , 
collapsible : 'true' , 
title : '菜单' , 
loader : new Ext.tree.TreeLoader, 
border : 'false' , 
autoScroll : 'true' , 
root : new Ext.tree.AsyncTreeNode({ 
text : '菜单' , 
children : [{ 
text : '节点1' , 
leaf : true , 
listeners : { 
'click':function(){ 
this.firstClick() ; 
}, 
scope : this 
} 
},{ 
text : '节点2'  , 
children : [{ 
text : '节点3' , 
leaf : true 
}] 
}] 
}) 
}) 
} ; 
Ext.extend(treePart,Ext.tree.TreePanel,{ 
id : 'mytree' , 
firstClick : function(){ 
myTab.add({title:'节点1',html : "<iframe src='grid.jsp' style='border:none;width:600;height:400px;'>",closable:true}).show() ; 
} 
}) 

myTab = new Ext.TabPanel({ 
region : 'center' , 
margins : '5,5,5,0' , 
width : 300 , 
activeTab : 0 , 
frame : true , 
defaults : {authHeight : true} , 
items : { 
title : '显示列表' , 
html : "<iframe src='grid.jsp' style='border:none;width:600;height:400px;'>" 
} 
}) ; 
