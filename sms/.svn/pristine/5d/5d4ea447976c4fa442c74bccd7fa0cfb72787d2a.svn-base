package com.hk.sms.dao;

import java.util.List;
import java.util.Map;

import com.hk.sms.model.SMSLog;
import com.hk.sms.model.SMSSave;


public interface ServerDao {
	public int saveSMSSave(SMSSave save);  
	public int saveSMSLog(SMSLog log);
	@SuppressWarnings("rawtypes")
	public int queryLoginfoCount(Map param);
	@SuppressWarnings("rawtypes")
	public List<Map> queryLoginfo(Map param);
	
	@SuppressWarnings("rawtypes")
	public SMSLog getLog(Map param);
}
