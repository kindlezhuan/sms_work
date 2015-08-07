IndexGrid = function(){ 

IndexGrid.superclass.constructor.call(this,{ 
renderTo : 'grids' , 
//title : '中心显示区域' , 
height : 300 , 
width : 500 , 
margins : '5,5,5,0' , 
tbar: [{text : '添加'},{text :'删除'}] , 
colModel : new Ext.grid.ColumnModel([{ 
header : '姓名' , 
dataIndex : 'name' 
},{ 
header : '年龄' , 
dataIndex : 'age' 
},{ 
header : '性别' , 
dataIndex : 'sex' 
}])  , 
store : new Ext.data.SimpleStore({ 
fields : ['name' ,'age' , 'sex'] , 
data : [['张三','21','男'],['张三','21','男'],['张三','21','男']] 
}) 
}) 
} 
Ext.extend(IndexGrid,Ext.grid.GridPanel,{ 

}) ; 
Ext.onReady(function(){ 
new IndexGrid() ; 
}) 