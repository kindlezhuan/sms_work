Ext.namespace("gbicc.util"," gbicc.util.format","gbicc.util.Array","gbicc.util.Date");

/**Ext.grid.ColumnModel中列显示的值根据指定的dataIndex返回record.data[newDataIndex]
 * 尤其适合数据字典，显示用record.data[newDataIndex]，排序请求用dataIndex
 * 例：{sortable: true, locked:false, header: "类型", dataIndex: 'gender',
 *     renderer: gbicc.util.getRecordData('genderName')},
 * record.data[gender]='1010-1010',record.data[genderName]='男'
 * @param {newDataIndex} 显示用的属性名
 * @return record.data[newDataIndex]
 */
gbicc.util.getRecordData = function(newDataIndex) {
    return function(value, metadata, record, rowIndex, colIndex, store) {
        return record.data[newDataIndex];
    };
};
/************************************Begin 进行加减乘除调用的方法********************************************/
//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length;}catch(e){}
    try{t2=arg2.toString().split(".")[1].length;}catch(e){}
    with(Math){
        r1=Number(arg1.toString().replace(".",""));
        r2=Number(arg2.toString().replace(".",""));
        return (r1/r2)*pow(10,t2-t1);
    }
}

//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg){
    return accDiv(this, arg);
};

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length;}catch(e){}
    try{m+=s2.split(".")[1].length;}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}

//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg){
    return accMul(arg, this);
};

//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
    try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
    m=Math.pow(10,Math.max(r1,r2));
    return Math.round(arg1*m+arg2*m)/m;
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg){
    return accAdd(arg,this);
};

/**************************************end 进行加减乘除调用的方法********************************************/

//删除左右两端的空格
gbicc.util.trim = function(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
};

/**把数字转化为百分比的格式：如：0.3 -> 30%
 * @param {value} 要格式化的数字
 * @return {String} 返回的百分比字符串
 */
gbicc.util.format.percent = function(value) {
    return (value - 0).mul(100) + "%";
};

/**把数字转化为百分比的格式：如：0.3 -> 30%
 * @param {value} 要格式化的数字
 * @param {digit} (optional)小数位数
 * @return {String} 返回的百分比字符串
 */
gbicc.util.format.percentOnly = function(value, digit) {
    if(digit == null || typeof digit == 'object'){
        digit = 2;
    }
    if (value == '-' || gbicc.util.trim(value+'') == ''){
        return '-';
    }
    if(value != null && gbicc.util.trim(value+'') != '' && !isNaN(value)){
        return parseFloat((value - 0).mul(100)).toFixed(digit) + "%";
    }else {
        return ''; 
    }
};
 
/**把数字转化为百分比的格式：如：0.3 -> 30
 * @param {value} 要格式化的数字
 * @return {String} 返回的百分比字符串
 */
gbicc.util.format.percent4Edit = function(value) {
    return (value - 0).mul(100);
};

/**把数字格式化为含有千分位的字符串,若小数点后没数字，则默认.00
 * @param {value} 要格式化的数字
 * @param {decimalPrecision} 默认的小数位数
 * @return {String} 返回的带千分位的字符串
 */
gbicc.util.format.millenarySeparate = function (value, digit) {
        if (value == '-'){
            return '-';
        }
        if (digit == null || isNaN(digit)) {
            digit = 2;
        }
        if(value == null || value === '' || isNaN(gbicc.util.format.removeMillenarySep_str(value)) ){
            return '';
        }else {
            value = gbicc.util.format.removeMillenarySep_str(value);
            var num = Math.pow(10,digit);
            value = (Math.round((value-0)*num))/num;
            value = (value == Math.floor(value)) ? value + ".00" : ((value*10 == Math.floor(value*10)) ? value + "0" : value);
            value = gbicc.util.format.parseFloatToFixDigit(value, digit);
            value = String(value);
            var ps = value.split('.');
            var whole = ps[0];
            var sub = ps[1] ? '.'+ ps[1] : '';
            var r = /(\d+)(\d{3})/;
            while (r.test(whole)) {
                whole = whole.replace(r, '$1' + ',' + '$2');
            }
            value = whole + sub;
            if(value.charAt(0) == '-'){
                return '-' + value.substr(1);
            }
            return "" +  value;
        } 
};

/**
 * 把数字格式化为含有千分位的字符串
 * @param {value} 要格式化的数字
 * @param {defaultValue} 为空时的默认值
 * @return {String} 返回的带千分位的字符串
 */
gbicc.util.format.millenarySeparateNonuseDigit = function (value, defaultValue) {
    if (defaultValue == null) {
        defaultValue = '';
    }
    if (value == '-') {
        return '-';
    }
    if (value == null || value === '' || isNaN(gbicc.util.format.removeMillenarySep_str(value))) {
        return defaultValue;
    } else {
        value = gbicc.util.format.removeMillenarySep_str(value);
        var ps = value.split('.');
        var whole = ps[0];
        var sub = ps[1] ? '.'+ ps[1] : '';
        var r = /(\d+)(\d{3})/;
        while (r.test(whole)) {
            whole = whole.replace(r, '$1' + ',' + '$2');
        }
        value = whole + sub;
        return "" +  value;
    }
};

/**把数字格式化为含有千分位的字符串,针对整数
 * @param {value} 要格式化的数字
 * @param {decimalPrecision} 默认的小数位数
 * @return {String} 返回的带千分位的字符串
 */
gbicc.util.format.millenarySeparateInt = function (value) {
        if (value == '-'){
            return '-';
        }
        if(value == null || value === '' || isNaN(gbicc.util.format.removeMillenarySep_str(value))){
            return '';
        }else {
            value = gbicc.util.format.removeMillenarySep_str(value);
            value = (Math.round((value-0)*100))/100;
            value = (value == Math.floor(value)) ? value + ".00" : ((value*10 == Math.floor(value*10)) ? value + "0" : value);
            value = String(value);
            var ps = value.split('.');
            var whole = ps[0];
            var sub = Number(ps[1]) == 0 ? '' : '.'+ ps[1];
            var r = /(\d+)(\d{3})/;
            while (r.test(whole)) {
                whole = whole.replace(r, '$1' + ',' + '$2');
            }
            value = whole + sub;
            if(value.charAt(0) == '-'){
                return '-' + value.substr(1);
            }
            return "" +  value;
        }       
};
/**
 * 把数值格式化为规定位数的数字，后面不足的补0
 * @param {obj} 要格式化的值
 * @param {obj} 小数位数
 */
gbicc.util.format.parseFloatToFixDigit = function (value, digit){
	if (!isNaN(parseFloat(value)) && digit >= 0){
        var num = Math.pow(10,digit);
        value = (Math.round((value-0)*num))/num;
        return parseFloat(value).toFixed(digit);
    }else {
        return value;
    }
};

/**给对象的值转换成有千分位的格式
 * @param {obj} 要格式化的对象
 */
gbicc.util.format.addMillenarySep = function (obj){
    obj.setValue(gbicc.util.format.millenarySeparateInt(obj.getValue()));
};
/**给对象的值把千分位去掉
 * @param {obj} 要格式化的对象
 */
gbicc.util.format.removeMillenarySep = function (obj){
    obj.setValue(obj.getValue().replace(/\,/g, ''));
};

/**把字符串的逗号去掉
 * @param {str} 要格式化的对象
 */
gbicc.util.format.removeMillenarySep_str = function (str){
     str = (str + "").replace(/\,/g, '');
     return str;
};
/**
 * 添加小数点后面的位数，如果位数是digit, 而number的小数位数没有这么多位的话，
 *  则添加0，直至位数和digit相同
 * @param {number} 要格式化的数字
 * @param {digit} 小数位数
 * 
 */
gbicc.util.format.addPointDigit = function (number, digit){
    if (digit == null){
        digit = 2;
    }
    if(number != null && number != ""){
        if(digit > 0){
            var arr = (number+'').split(".");
            if(arr.length > 1){
                var d_len = arr[1].length;
                if (d_len < digit){
                    for(var i=0; i<(digit-d_len); i++) {
                    	arr[1] += '0'+'';
                    }
                    number = arr[0] + "." + arr[1];
                }
            }else {
                var e_num='';
                for(var i=0; i<digit; i++) {
                    e_num += '0'+'';
                }
                number = arr[0] + "." + e_num;
            }
        }
    }
    return number;
};

/**
 * 将日期字符串格式化
 * @param {dateStr} 日期字符串
 * @return string 格式划好的日期字符串（yyyy-MM-dd）
 */
gbicc.util.format.dateFormat = function (dateStr){
    if(dateStr == null || Ext.util.Format.trim(dateStr) == ''){
        return '';
    }
    dateStr = Ext.util.Format.trim(dateStr);
    if(dateStr.indexOf(" ") != -1){
        dateStr = dateStr.split(" ")[0];
    }
    var formatDate = "";
    if(dateStr.indexOf("-") != -1){
        var dateItems = dateStr.split('-');
        if(dateItems.length == 3){
            var date = new Date(dateItems[0], dateItems[1]-1, dateItems[2]);
            formatDate = Ext.util.Format.date(date, "Y-m-d");
        }
    }
    return formatDate;
};


/**
 * 刷新当前页面
 */
gbicc.util.refreshPage = function() {
	window.location.reload();
};

/**页面跳转
 * @param {url} 要重定向的地址
 */
gbicc.util.goHref = function(url) {
    return function() {
        window.location.href = url;
    };
};

/**定义页面头部的toolbar
 * @param {barDiv} 显示toolbar的Div
 * @param {title} toolbar上的标题的内容
 */
gbicc.util.createTopToolBar = function(barDiv, title) {
    var _top_tb = new Ext.Toolbar({
        cls : 'x-toolbar_title',
        renderTo : barDiv,
        height: 26
    });
    _top_tb.addText(title);
    _top_tb.add(new Ext.Toolbar.Fill());
    _top_tb.addButton({text: '刷新',
        border: false,
        cls:'x-btn-text-icon',
        icon: '../images/ext_refresh.gif',
        handler: gbicc.util.refreshPage
    });
    return _top_tb;
};

/**定义页面底部分页的toolbar
 * @param {barDiv} 显示toolbar的Div
 * @param {title} toolbar上的标题的内容
 */
gbicc.util.createPageToolBar = function(ds) {
    var _page_tb = new Ext.PagingToolbar({
        store: ds,
        displayInfo: true,
        displayMsg: '记录:{0} - {1} / 共{2}条',
        emptyMsg: "没有数据",
        items:['-']
    });
    return _page_tb;
};

/**检查“用户拥有的权限列表”是否拥有“指定的权限列表”
 * @param {hasRightExt} 用户拥有的权限列表
 * @param {right} 指定的权限列表
 * @return {boolean} 有权限的话返回true，反之false
 */
gbicc.util.hasRight = function(hasRightExt, right) {
    return hasRightExt.indexOf(right) != -1;
};

/**判断是否有权限
 * @param {noRight} 无权url列表
 * @param {url} 需要判断的url
 * @return {boolean} 有的话返回true，反之false
 */
gbicc.util.haveRight = function(noRight, url) {
    return false == gbicc.util.arrayHasElementEndsWith(noRight, url);
};

/**检查指定数组中是否含有需要确认的元素，每个元素后缀含有也算有
 * @param {array} 数组
 * @param {element} 元素
 * @return {boolean} 有的话返回true，反之false
 */
gbicc.util.arrayHasElementEndsWith = function(array, element) {
    if (array == null) {
        return false;
    }
    
    for (var i = 0; i < array.length; i++) {
        if (gbicc.util.endsWith(array[i], element)) {
            return true;
        }
    }
    
    return false;
};

/**相当于Java的one.endsWith(other)
 * @param {one}
 * @param {other}
 * @return {boolean} 符合条件的话返回true，反之false
 */
gbicc.util.endsWith = function(one, other) {
    if (one == null || other == null) {
        return false;
    }
    var pos = one.indexOf(other);
    if (pos == -1) {
        return false;
    }
    return (one.length - pos) == other.length;
};

/**给定的两级联动三维大数组，通过指定第一级的code，得到第二级的数组数据
 * 大数组例：
 * [[["1001","类别1"],[["2010","scama"],["2020","中文项目"]]],
 *  [["1002","类别2"],[["3010","权证"],["3020","smg"]]]
 * ]
 * 参数level01Code举例：1001
 * 返回举例：[["2010","scama"],["2020","中文项目"]]
 * 参数level01Code举例：1002
 * 返回举例：[["3010","权证"],["3020","smg"]]
 * @param {selectdata} 两级联动三维大数组
 * @param {level01Code} 第一级的code
 * @param {needAll} (optional) 是否显示[needAll, '全部']选项，建议needAll传''，后台处理方便
 */
gbicc.util.assebleSelectDataLevel02 = function(selectdata, level01Code, needAll) {
    var retArray=null;
    for (var i = 0; i < selectdata.length; i++) {
        if (selectdata[i][0][0] == level01Code) {
            retArray = selectdata[i][1];
            break;
        }
    }
    if (retArray == null) {
        retArray = [];
    }
    if (needAll != null) {
        retArray = [[needAll, '全部']].concat(retArray);
    }
    return retArray;
};

/**添加第1级的下拉框的联动事件
 * @param {selectdata} 两级联动三维大数组
 * @param {comboBoxLevel01} 第1级的下拉框对象
 * @param {comboBoxLevel02} 第2级的下拉框对象
 * @param {needAll} (optional) 第2级是否显示[needAll, '全部']选项，建议needAll传''，后台处理方便
 */
gbicc.util.assebleEvent2Level = function(selectdata, comboBoxLevel01, comboBoxLevel02, needAll) {
    comboBoxLevel01.on('select', function() {
            comboBoxLevel02.store.loadData(
                gbicc.util.assebleSelectDataLevel02(selectdata, comboBoxLevel01.getValue(), needAll));
            comboBoxLevel02.reset();
        }
    );
};

gbicc.util.createCheckBoxMultiRowItems = function (checkBoxName, columnNum, oldDataArray, dataColumnArray) {
    for (var i = 0; i < columnNum; i++) {
        dataColumnArray.push(null);
    }
    var roleIdAndNameArray = new Array(columnNum);
    //构造checkBox列表，默认都是不选中
    for (var i = 0; i < dataColumnArray.length; i++) {
        dataColumnArray[i] = new Array(Math.ceil(_roleIdAndName.length / dataColumnArray.length));
        for (var j = 0; j < dataColumnArray[i].length; j++) {
            var oldDataArray = _roleIdAndName[j * columnNum + i];
            if (oldDataArray == null) {
                dataColumnArray[i][j] = {xtype:'panel',border:0,height:28};//空行
            } else {
                dataColumnArray[i][j] = new Ext.form.Checkbox({
                    inputValue: oldDataArray[0],
                    boxLabel: oldDataArray[1],
                    name: checkBoxName,
                    labelSeparator: '',//否则会出现冒号
                    anchor: '95%'
                });
            }
        }
        roleIdAndNameArray[i] = {
            columnWidth: 1 / columnNum,
            layout: 'form',
            items: dataColumnArray[i]
        };
    }
    var items = {
        layout:'column',
        items: roleIdAndNameArray
    };
    return items;
};

gbicc.util.buildCheckBoxValue = function(dataColumnArray, arrays) {
    for (var i = 0; i < dataColumnArray.length; i++) {
        for (var j = 0; j < dataColumnArray[i].length; j++) {
            if (dataColumnArray[i][j] instanceof Ext.form.Checkbox) {
                var checked = gbicc.util.arraysContainsElement(arrays, dataColumnArray[i][j].inputValue);
                dataColumnArray[i][j].setValue(checked);
            }
        }
    }
};
gbicc.util.arraysContainsElement = function(arrays, element) {
    if (arrays == null || element == null) {
       
        return false;
    }

    for (var i = 0; i < arrays.length; i++) {
    	
        if (arrays[i] == element) {
            return true;
        }
    }
    return false;
};


/**当前页面重定向到另一个页面
 * @param {url} 路径
 */
gbicc.util.locationToUrl = function (url){
    return function (){
        window.location = url;
    };
};
/**
 * 创建一个正则表达式对象
 * @param {regex} 正则表达式字符串
 */
gbicc.util.createRegex = function (regex){
    return new RegExp(regex);
};

/**针对数字文本框的Render函数
 * @param {dataIndex} 列的dataIndex属性名
 * @param {digit} (optional)  保留的小数位数 ，默认是2位
 * @param {func} 如果不时对整列的格式采取相同的格式化，则调用自己创建的函数
 */
gbicc.util.numberTextRenderFunc = function (dataIndex, digit, formatType, func){
    if (digit == null || digit < 0){
        digit = 2;
    }
    return function(value, metadata, record, rowIndex, colIndex, store) {
        var removeSepStr = gbicc.util.format.removeMillenarySep_str(value);
        if (isNaN(removeSepStr) || removeSepStr == '' || value == '-' || value == null || gbicc.util.trim(value+'') == ''){
            record.data[dataIndex] = '-';
            return '-';
        }
//            if(value == 0){
//                record.data[dataIndex] = '-';
//                return '-';
//            }
        value = removeSepStr;
        if (value != null && (value+'').charAt(0) == '.'){
            record.data[dataIndex] = '0' + value;
        }
        if (value != null && (value+'').length>1 && (value+'').charAt(0) == '-' && (value+'').charAt(1)== '.'){
            record.data[dataIndex] = '-0' + value.substr(1);
        }
        if(func != null && typeof func == 'function'){
            return func(value, metadata, record, rowIndex, colIndex, store);
        }else if(formatType != null && formatType == ','){
            record.data[dataIndex] = gbicc.util.format.parseFloatToFixDigit(value, digit);
            return gbicc.util.format.millenarySeparate(value, digit);
        }else if (formatType != null && formatType == '%'){
        	record.data[dataIndex] = gbicc.util.format.parseFloatToFixDigit(value, eval(digit+2));
            return gbicc.util.format.percentOnly(value, digit);
        }
    };
};

/* 期末估值单价 合计项不显示“-” */
gbicc.util.numberTextRenderFuncs = function (dataIndex, digit, formatType, func){
    if (digit == null || digit < 0){
        digit = 2;
    }
    return function(value, metadata, record, rowIndex, colIndex, store) {
        var removeSepStr = gbicc.util.format.removeMillenarySep_str(value);
        if ((isNaN(removeSepStr) || removeSepStr == '' || value == '-' || value == null || gbicc.util.trim(value+'') == '') && dataIndex == 'qiMoGuZhiDanJia'){
            record.data[dataIndex] = '';
            return '';
        }
        
        value = removeSepStr;
        if (value != null && (value+'').charAt(0) == '.'){
            record.data[dataIndex] = '0' + value;
        }
        if (value != null && (value+'').length>1 && (value+'').charAt(0) == '-' && (value+'').charAt(1)== '.'){
            record.data[dataIndex] = '-0' + value.substr(1);
        }
        if(func != null && typeof func == 'function'){
            return func(value, metadata, record, rowIndex, colIndex, store);
        }else if(formatType != null && formatType == ','){
            record.data[dataIndex] = gbicc.util.format.parseFloatToFixDigit(value, digit);
            return gbicc.util.format.millenarySeparate(value, digit);
        }else if (formatType != null && formatType == '%'){
            record.data[dataIndex] = gbicc.util.format.parseFloatToFixDigit(value, eval(digit+2));
            return gbicc.util.format.percentOnly(value, digit);
        }
    };
};

/**针对日期文本框的Render函数
 * @param {format} (optional)  格式化的格式 默认是"Y-m-d"
 * @param {func} 如果不时对整列的格式采取相同的格式化，则调用自己创建的函数
 */
gbicc.util.dateFieldRender = function(dataIndex, formatStr) {
    if(formatStr == null){
        formatStr = "Y-m-d";
    }
    return function dateRender(value, metadata, record, rowIndex, colIndex, store){
        if(value != null){
            var dateField = gbicc.component.form.createDateField('dateField', '日期');
            var dateValue = dateField.parseDate(value);
            record.data[dataIndex] = Ext.util.Format.date(dateValue, formatStr);
            return Ext.util.Format.date(dateValue, formatStr);
        }else{
            return "";
        }
    };
};

/************************************************针对对象赋值*********************************************/
/**
 * 给一个对象赋值
 * @param propertiesArray 包括所有元素的数组
 * @param noShowPropertyArray 不显示的元素的数组
 * @param valueObject 赋值的对象
 */
gbicc.util.setValuesForObject = function (propertiesArray, noShowPropertyArray, valueObject){
    var obj = {};
    for(var i=0; i<propertiesArray.length; i++) {
        if(!gbicc.util.Array.isHave(noShowPropertyArray, propertiesArray[i])){
        	eval("obj." + propertiesArray[i] + " = valueObject.get(propertiesArray[i])+''");
        }
    }
    return obj;
};

/**
 * 给多个对象赋值
 * @param propertiesArray 包括所有元素的数组
 * @param noShowPropertyArray 不显示的元素的数组
 * @param valueObject 赋值的对象数组
 */
gbicc.util.setValuesForObjectList = function (propertiesArray, noShowPropertyArray, valueObjectArray){
    var objList = new Array();
    for(var i=0; i<valueObjectArray.length; i++) {
        var valueObject = valueObjectArray[i];
        var obj = {};
        for(var j=0; j<propertiesArray.length; j++) {
            if(!gbicc.util.Array.isHave(noShowPropertyArray, propertiesArray[j])){
                eval("obj." + propertiesArray[j] + " = valueObject.get(propertiesArray[j])+''");
            }
        }
        objList.push(obj);
    }
    return objList;
};

/************************************************针对对象赋值*********************************************/
    
/*******************************************对数组的操作***********************************************/
/**
 * 判断数组中是否有某个值
 * @param {array} 数组
 * @param {chart} 判断的字符
 * @return boolean
 */
gbicc.util.Array.isHave = function (array, chart){
    for (var i = 0; i < array.length; i++) {
       for(var i=0; i<array.length; i++){
            if(array[i] === chart){
                return true;
            }
        }
    }
    return false;
};
/**
 * 删除数组中的某个值
 * @param {array} 数组
 * @param {chart} 删除的字符
 */
gbicc.util.Array.deleteOne = function (array, chart){
    if(array != null && array.length > 0){
        for (var i = 0; i < array.length; i++) {
            if (array[i] == chart) {
                array.splice(i, 1);
                break;
            }
        }
    }
};
/**
 * 获得数组中的最小值
 * @param {array} 数组
 * @return number
 */
gbicc.util.Array.minValue = function (array){
    if(array != null && array.length > 0){
        array.sort();
        return array[0];
    }
    return null;
};

/**
 * 修改页面的状态
 * @param {idStr} 给出路径的参数
 * @param {btnArray} 将要隐藏的域[['save',fsSave],[saveBtn,null]]
 * @param(obj)根据传的form对象判断表格是否完整
 */
gbicc.util.changeState=function(idStr, btnArray, obj) {
    return function () {   
    	if(obj != null && typeof obj == 'object' && obj.getXType() != null && obj.getXType() == 'form'){
	       if(!obj.form.isValid()){
	       	 Ext.Msg.alert("提示","数据不完整");
	       	 return;
	       }
	    }
        var comfirm = Ext.MessageBox.confirm("提醒", "确定要提交吗？", function(btn) {
            if (btn == "yes") {
                Ext.Ajax.request({
                    url: webPath+'change_state_do.fund_report',
                    params: {idStr:idStr},
                    success: function(result, request) {
                        Ext.Msg.alert('操作', Ext.util.JSON.decode(result.responseText).data, function(btn) {
                            if (btn == 'ok') {
                                for(var i=0; i<btnArray.length; i++){
                                    var btn = btnArray[i];
                                    var btnObj = findButton(btn[0],btn[1]==null?null:btn[1]);
                                    if(btnObj!=null)
                                        btnObj.setDisabled(true);
                                }
                            }
                        });
                    },
                    failure: function(result, request) {
                        Ext.Msg.alert('操作', Ext.util.JSON.decode(result.responseText).data );
                    }
                });
            }
        });
    };
};

/**
 * 刷新表格，设置按钮的不可用
 * @param {dsArray}:刷新的表格数组
 * @param {btnArray}:按钮数组
 * @param {callFunc}:调用的函数
 */
gbicc.util.successFun = function(dsArray, btnArray, callFunc){
	return function(form, action) {
		Ext.Msg.alert('操作',action.result.data, function(btn) {
	        this.disabled=false;
	        if(dsArray!=null&&dsArray.length>0){
	            for(var i=0;i!=dsArray.length;i++){
	                if(dsArray[i]!=null){
	                    dsArray[i].reload();
	                }
	            }
	        }
	        if(callFunc != null && typeof callFunc == 'function'){
                callFunc(action.result);
            }
            if(btnArray != null){
                for(var i=0; i<btnArray.length; i++){
                    var btn = btnArray[i];
                    var btnObj = findButton(btn[0],btn[1]==null?null:btn[1]);
                    if(btnObj!=null) {
                        btnObj.setDisabled(true);
                    }
                }
            }
        });
    };
};
/*******************************************对数组的操作***********************************************/

gbicc.util.setValuesByGrid = function(editds, createRecordFunc, data) {
	if(data==null) return;
	editds.data.clear();
    var records = new Array();
    for (var i = 0; i < data.length; i++) {
        var newplan;
        if (createRecordFunc != null
                && typeof createRecordFunc == 'function') {
            newplan = createRecordFunc(data[i]);
        }
        records.push(newplan);
    }
    editds.add(records);
};
