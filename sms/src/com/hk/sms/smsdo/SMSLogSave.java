package com.hk.sms.smsdo;

import java.util.concurrent.ThreadPoolExecutor;

import com.hk.sms.model.SMSLog;
import com.hk.sms.utils.SpringContextUtil;
import com.hk.sms.utils.ThreadPoolUtil;
import com.hk.sms.utils.ThreadeSaveLog;

public class SMSLogSave {
	public static void saveDO(SMSLog savedo2){

		
		ThreadPoolUtil kk = (ThreadPoolUtil)SpringContextUtil.getBean("ThreadPoolUtil");
		@SuppressWarnings("static-access")
		ThreadPoolExecutor kk1 = kk.executor;//保存Log
		
		kk1.execute(new ThreadeSaveLog(savedo2));
		
	}
}
