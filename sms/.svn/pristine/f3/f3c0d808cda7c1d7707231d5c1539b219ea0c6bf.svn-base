////处理键盘事件  
//function doKey(e){  
//    var ev = e || window.event;//获取event对象  
//    var obj = ev.target || ev.srcElement;//获取事件源  
//    var t = obj.type || obj.getAttribute('type');//获取事件源类型  
//    if(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea"){  
//        return false;  
//    }  
//}
////处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外  
//function banBackSpace(e){     
//    var ev = e || window.event;//获取event对象     
//    var obj = ev.target || ev.srcElement;//获取事件源     
//      
//    var t = obj.type || obj.getAttribute('type');//获取事件源类型    
//      
//    //获取作为判断条件的事件类型  
//    var vReadOnly = obj.getAttribute('readonly');  
//    var vEnabled = obj.getAttribute('enabled');  
//    //处理null值情况  
//    vReadOnly = (vReadOnly == null) ? false : vReadOnly;  
//    vEnabled = (vEnabled == null) ? true : vEnabled;  
//      
//    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，  
//    //并且readonly属性为true或enabled属性为false的，则退格键失效  
//    var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")   
//                && (vReadOnly==true || vEnabled!=true))?true:false;  
//     
//    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效  
//    var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea")  
//                ?true:false;          
//      
//    //判断  
//    if(flag2){  
//        return false;  
//    }  
//    if(flag1){     
//        return false;     
//    }     
//} 
//
////禁止后退键  作用于IE、Chrome  
//document.onkeydown=banBackSpace; 
////禁止后退键 作用于Firefox、Opera  
//document.onkeypress=banBackSpace;  

		
		window.onload=function(){
			document.getElementsByTagName("body")[0].onkeydown =function(){
				
				//获取事件对象
				var elem = event.relatedTarget || event.srcElement || event.target ||event.currentTarget; 
				
				if(event.keyCode==8){//判断按键为backSpace键
				
						//获取按键按下时光标做指向的element
						var elem = event.srcElement || event.currentTarget; 
						
						//判断是否需要阻止按下键盘的事件默认传递
						var name = elem.nodeName;
						
						if(name!='INPUT' && name!='TEXTAREA'){
							return _stopIt(event);
						}
						var type_e = elem.type.toUpperCase();
						if(name=='INPUT' && (type_e!='TEXT' && type_e!='TEXTAREA' && type_e!='PASSWORD' && type_e!='FILE')){
								return _stopIt(event);
						}
						if(name=='INPUT' && (elem.readOnly==true || elem.disabled ==true)){
								return _stopIt(event);
						}
					}
				}
			}
		function _stopIt(e){
				if(e.returnValue){
					e.returnValue = false ;
				}
				if(e.preventDefault ){
					e.preventDefault();
				}				

				return false;
		}
