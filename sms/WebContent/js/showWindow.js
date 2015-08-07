var win;
/*
打开一个新窗口
params:
title 标题,
width 宽度,
height 高度,
url 子页面url

*/
var ShowWindow = function (title, width, height, url) {

    Ext.QuickTips.init();
    
    if (!win) {
        win = new Ext.Window({
            applyTo: 'hello-win',
            layout: 'fit',
            title: title,
            maximizable: true,
            width: 400,
            draggable: true,
            html: '<iframe style="padding:1px 1px 1px 1px" frameborder="0" id="child" name="child" width="100%" height="100%" src="' + url + '" />',
            resizable: false,
            modal: true,
            border: false,
            height: 300,
            closeAction: 'hide',
            plain: false
        });
    } else {
        document.getElementById("child").src = url;
    }
    win.setTitle(title);
    win.setWidth(width);
    win.setHeight(height);
    win.doLayout();
    win.show();
    win.center();
    delete applyTo;
    delete draggable;
    delete modal;
    delete frame;
    delete pageY;
    delete border;
    delete constrain;
    delete closable;
    delete layout;
    delete width;
    delete height;
    delete plain;
    delete items;
    delete html;
    Ext.Window.superclass.onDestroy.call(this);
};