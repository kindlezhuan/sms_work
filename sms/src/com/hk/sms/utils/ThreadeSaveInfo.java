package com.hk.sms.utils;

import com.hk.sms.dao.ServerDao;
import com.hk.sms.model.SMSSave;

public class ThreadeSaveInfo implements Runnable {
	private SMSSave smsSave;
	private ServerDao serverDao;
	public ThreadeSaveInfo(SMSSave smsSave){
		this.smsSave = smsSave;
	}
	@Override
	public void run() {
		serverDao = (ServerDao) SpringContextUtil.getBean("serverDao");
		int kk = serverDao.saveSMSSave(smsSave);
		if(kk == 1){
			System.out.println("³É¹¦");
		}else
			System.out.println("Ê§°Ü");
	}
	public SMSSave getSmsSave() {
		return smsSave;
	}
	public void setSmsSave(SMSSave smsSave) {
		this.smsSave = smsSave;
	}
	public ServerDao getServerDao() {
		return serverDao;
	}
	public void setServerDao(ServerDao serverDao) {
		this.serverDao = serverDao;
	}

}
