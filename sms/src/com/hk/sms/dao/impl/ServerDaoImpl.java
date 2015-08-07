package com.hk.sms.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import com.hk.sms.dao.ServerDao;
import com.hk.sms.model.SMSLog;
import com.hk.sms.model.SMSSave;
@Repository(value = "serverDao") 
public class ServerDaoImpl extends SqlSessionDaoSupport implements ServerDao{

	@Override
	public int saveSMSSave(SMSSave save) {
		int result = getSqlSession().insert("ServerMapper.insertSave",save);
		System.out.println(save.getSavetime());
		System.out.println(save.getSend_time());
		return result;
	}

	@Override
	public int saveSMSLog(SMSLog log) {
		int result = getSqlSession().insert("ServerMapper.insertLog",log);
		return result;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public int queryLoginfoCount(Map param) {
		int count = getSqlSession().selectOne("ServerMapper.queryLoginfoCount",param);
		return count;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public List<Map> queryLoginfo(Map param) {
		List<Map> userMap =  getSqlSession().selectList("ServerMapper.queryLoginfo", param);
		return userMap;
	}

	@SuppressWarnings({ "rawtypes" })
	@Override
	public SMSLog getLog(Map param) {
		SMSLog smsLog = getSqlSession().selectOne("ServerMapper.getLog", param);
		return smsLog;
	}

}
