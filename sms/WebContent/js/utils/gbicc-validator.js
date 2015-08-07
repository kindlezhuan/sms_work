Ext.namespace("gbicc.validator");
/** 
 * 验证文本域最大字符长度
 * @param maxLength
 * @return function()
 */
gbicc.validator.maxTextLength = function(maxLength) {
    return gbicc.validator.constrainTextLength(0, maxLength);
};

/** 
 * 验证文本域最大字符长度，同时不能为空
 * @param maxLength
 * @return function()
 */
gbicc.validator.maxTextLengthNotBlank = function(maxLength) {
    return gbicc.validator.constrainTextLength(1, maxLength);
};

/** 
 * 验证文本域字符长度限制
 * @param minLength 最小值
 * @param maxLength 最大值
 * @return function()
 */
gbicc.validator.constrainTextLength = function(minLength, maxLength) {
    return function() {
        //中文按两个字符处理
        var tempLength = this.getValue().replace(/[^\x00-\xff]/g, "**").length;
        if (tempLength < minLength || tempLength > maxLength) {
            return false;
        }
        return true;
    };
};

/**
 * 验证文本域字符长度限制，只能输入数字
 * @param minLength 最小值
 * @param maxLength 最大值
 * @return function()
 */
gbicc.validator.constrainTextNumberLength = function (minLength, maxLength) {
    return function() {
        //中文按两个字符处理
        var tempLength = this.getValue().replace(/[^\x00-\xff]/g, "**").length;
        if (tempLength < minLength || tempLength > maxLength) {
            return false;
        }
        var fieldValue = this.getValue();
        if (isNaN(fieldValue)) {
            return false;
        }
        return true;
    }
}

/**
 * 验证两个日期的大小
 * 如maxDate=2007-01-03、minDate=2007-01-02，返回true
 * @param maxDate 大的日期
 * @param minDate 小的日期
 */
gbicc.validator.compareDate = function(maxDateObj, minDateObj) {
    return function() {
        var maxDate = maxDateObj.value;
        var minDate = minDateObj.value;
        //两个日期的大小比较
        if (maxDate != "" && minDate != "") {
            if (maxDate >= minDate) {
                return true;
            }
        }
        return false;
    }
}
var regex = gbicc.util.createRegex();
    var regexText = '只能输入负号、数字、逗号';
    /*整数验证*/
Ext.apply(Ext.form.VTypes, {
 intval: function(val, field) {
     var re = new RegExp('^[\\d]*$', '');
     return re.test(val);
 },
 intvalText:'只能输入数字'})
 
 /*邮政编码验证*/
Ext.apply(Ext.form.VTypes, {
 postalcode: function(val, field) {
     var re = new RegExp("^\\d{6}$", "");
     return re.test(val);
 },
 postalcodeText:'格式不正确，应为六位数字'})
 
 /*电话号码验证*/
Ext.apply(Ext.form.VTypes, {
 telephone: function(val, field) {
     var re = new RegExp("^(\\(0\\d{2}\\)[ -－]?\\d{8}|\\(0\\d{3}\\)[ -－]?\\d{7,8}|" +
            "（0\\d{2}）[ -－]?\\d{8}|（0\\d{3}）[ -－]?\\d{7,8}|" +
            "0\\d{2}[ -－]?\\d{8}|0\\d{3}[ -－]?\\d{7,8})$", "");

     return re.test(val);
 },
 telephoneText: '格式不正确，应如：（010）12345678<br>（010）－12345678 或 010－12345678'
 })
