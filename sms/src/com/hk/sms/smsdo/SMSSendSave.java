package com.hk.sms.smsdo;


import java.util.Date;

import com.hk.sms.model.SMSLog;
import com.hk.sms.model.SMSSave;
import com.test.SendTest;


public class SMSSendSave {

	public static SMSLog sendDO(SMSSave savedo1){
		SMSLog smsLog = null;
		//主要完成从对列中取出对象，并新建线程来完成保存操作。
		smsLog = new SMSLog();
		smsLog.setTimeMsg_ID(savedo1.getTimeMsg_ID());
		smsLog.setUID(savedo1.getUID());
		smsLog.setMOBILE(savedo1.getMOBILE());
		smsLog.setMSG(savedo1.getMSG());
		String tel=savedo1.getMOBILE();
		String content=savedo1.getMSG();
		String msg_id=savedo1.getTimeMsg_ID();
		String code="";
		String split="&split&";
		String group="&group&";
		String send_param = "";
		String[] array={tel,msg_id,code,content};
		StringBuffer sb=null;
		int length=1;
		for (int i = 0; i < length; i++) {
			sb=new StringBuffer();
			for (int j = 0; j < array.length; j++) {
				if((j+1)==array.length){
					sb.append(array[j]+i);	
				}else{
				sb.append(array[j]+split);
				}
			}
			if((i+1)==length){
			send_param+=sb.toString();
			}else {
			send_param+=sb.toString()+group;	
			}
			sb=null;
		}
		String url = "http://cloud.baiwutong.com:8080/antoSmsSend.do";
		String corp_service="1069011612207";//业务代码
		System.out.println(send_param);
		String resultMSg = SendTest.send_cat(savedo1.getUID(), savedo1.getUPWD(), url, corp_service, 1, send_param, 1);
		smsLog.setSend_time(new Date().toString());
		System.out.println(resultMSg);
		smsLog.setSend_result(resultMSg);
		return smsLog;
	}

}
