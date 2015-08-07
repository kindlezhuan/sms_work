package com.hk.sms.smsdo;


import java.util.concurrent.ThreadPoolExecutor;

import org.springframework.beans.factory.annotation.Autowired;

import com.hk.sms.dao.ServerDao;
import com.hk.sms.model.SMSSave;
import com.hk.sms.utils.SpringContextUtil;
import com.hk.sms.utils.ThreadPoolUtil;
import com.hk.sms.utils.ThreadeSaveInfo;

public class SMSSaveSave {
	@Autowired  
	private ServerDao serverDao;
	public static void saveDO(SMSSave savedo1){
		//主要完成从创建进程
		ThreadPoolUtil kk = (ThreadPoolUtil)SpringContextUtil.getBean("ThreadPoolUtil");
		ThreadPoolExecutor kk1 = kk.executor;
		kk1.execute(new ThreadeSaveInfo(savedo1));
		
	}
	public ServerDao getServerDao() {
		return serverDao;
	}
	public void setServerDao(ServerDao serverDao) {
		this.serverDao = serverDao;
	}
}
