package com.hk.sms.utils;

import com.hk.sms.dao.ServerDao;
import com.hk.sms.model.SMSLog;

public class ThreadeSaveLog implements Runnable {
	private SMSLog smsLog;
	private ServerDao serverDao;
	public ThreadeSaveLog(SMSLog smsLog){
		this.smsLog = smsLog;
	}
	@Override
	public void run() {
		serverDao = (ServerDao) SpringContextUtil.getBean("serverDao");
		int kk = serverDao.saveSMSLog(smsLog);
		if(kk == 1){
			System.out.println("成功");
		}else
			System.out.println("失败");
	}

	public SMSLog getSmsLog() {
		return smsLog;
	}

	public void setSmsLog(SMSLog smsLog) {
		this.smsLog = smsLog;
	}

	public ServerDao getServerDao() {
		return serverDao;
	}
	public void setServerDao(ServerDao serverDao) {
		this.serverDao = serverDao;
	}

}
