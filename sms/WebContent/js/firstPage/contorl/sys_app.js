
Ext.Loader.setConfig({
    enabled: true,
	 paths : {
      'MyApp3.store' : 'js/firstPage/app/store',
      'MyApp3.view' : 'js/firstPage/app/view'
   }
});

Ext.require(['MyApp3.store.MenuStore','MyApp3.view.sys_MyViewport']);

Ext.application({
    stores: [
        'MenuStore'
    ],
    views: [
        'zf_MyViewport'
    ],
    name: 'MyApp3',

    launch: function() {
        Ext.create('MyApp3.view.sys_MyViewport');
    }

});
