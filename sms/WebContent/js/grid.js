IndexGrid = function(){ 

IndexGrid.superclass.constructor.call(this,{ 
renderTo : 'grids' , 
//title : '������ʾ����' , 
height : 300 , 
width : 500 , 
margins : '5,5,5,0' , 
tbar: [{text : '���'},{text :'ɾ��'}] , 
colModel : new Ext.grid.ColumnModel([{ 
header : '����' , 
dataIndex : 'name' 
},{ 
header : '����' , 
dataIndex : 'age' 
},{ 
header : '�Ա�' , 
dataIndex : 'sex' 
}])  , 
store : new Ext.data.SimpleStore({ 
fields : ['name' ,'age' , 'sex'] , 
data : [['����','21','��'],['����','21','��'],['����','21','��']] 
}) 
}) 
} 
Ext.extend(IndexGrid,Ext.grid.GridPanel,{ 

}) ; 
Ext.onReady(function(){ 
new IndexGrid() ; 
}) 