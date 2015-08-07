Ext.namespace("gbicc");
/**页面跳转，跳转前会disable所有对象。
 * @param url 转向的地址
 */
function goHref(url) {
//    allElementDisabled();
    location.replace(url);
}

/**form提交，跳转前会disable所有对象。
 * @param form form对象
 * @param url 转向的地址，为空的话方法会使用action默认值
 */
function goForm(form, url) {
    if (url != null) {
    	form.action = url;
    }
//    allElementDisabled();
    form.submit();
}

/**disabled页面中所有的元素
 * if (typeof(document.all[i]) != "undefined"){
 */
function allElementDisabled(){
    for (var i = 0; i < document.all.length; i++){
        disable(document.all[i]);
    }
}

/**diable页面对象
 * obj 需要diable的页面对象
 */
function disable(obj) {
    if (obj.type == null) {
        return;
    }
    if (obj.type == 'reset' ||
        obj.type == 'button' ||
        obj.type == 'submit') {
        obj.disabled = true;
    } else if (obj.onclick != null) {
        obj.onclick = '';
    } else if (obj.onchange != null) {
        obj.onchange = '';
    } else if (obj.href != null && (obj.rel == null || obj.rel != 'stylesheet')) {
        //是链接，但不是样式表
        obj.disabled = true;
        obj.href = '#';
    }
    return;
}

/**响应回车按键，跳转到下一个输入域
 */
function clickEnter(event, countfield) {
    if (event.keyCode == 13) {
        countfield.select();
    }
}
