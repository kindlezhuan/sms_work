// js哈希表 
function HashTable() {
    this.ObjArr = {};
    this.Count = 0;
    this.Keys = new Array();
    //添加
    this.Add = function (key, value) {
        if (this.ObjArr.hasOwnProperty(key)) {
            return false; //如果键已经存在，不添加 
        }
        else {
            this.ObjArr[key] = value;
            this.Keys.push(key);
            this.Count++;
            return true;
        }
    };
    //是否包含某项
    this.Contains = function (key) {
        return this.ObjArr.hasOwnProperty(key);
    };
    //取某一项 其实等价于this.ObjArr[key]
    this.GetValue = function (key) {
        if (this.Contains(key)) {
            return this.ObjArr[key];
        }
        else {
            throw Error("Hashtable not cotains the key: " + String(key)); //脚本错误 
            //return; 
        }
    };
    this.GetKey = function (index) {
        return this.Keys[index];
    };
    //移除
    this.Remove = function (key) {
        if (this.Contains(key)) {
            delete this.ObjArr[key];
            this.Count--;
        }
    };
    //清空
    this.Clear = function () {
        this.ObjArr = {}; this.Count = 0;
    };
};