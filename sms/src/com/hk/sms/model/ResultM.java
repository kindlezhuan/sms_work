package com.hk.sms.model;

import java.util.Hashtable;

public class ResultM {
	private static ResultM instance = null; 
	@SuppressWarnings("rawtypes")
	public static Hashtable table = new Hashtable();
	@SuppressWarnings("unchecked")
	private ResultM(){
		table.put("100", "余额不足");
		table.put( "101","账号关闭");
		table.put( "106","用户名不存在");
		table.put( "107","密码错误");
		table.put( "108","指定访问的IP错误");
		table.put( "109","业务不存在");
		table.put( "114","接口提交应为POST，不支持GET");
		table.put( "115","total_count 与实际短信条数无法匹配，即，实际短信条数与total_count不一致。如果要返回此参数，则本次提交的所有短信作废，不入库");
		table.put( "116","个性化短信提交个数超过200条");	
		
		table.put( "201","错误代码201");	
		table.put( "202","错误代码202");	

	}
	public static ResultM getResultM(){
		if(instance == null) { 
		      instance = new ResultM(); 
		    } 
		    return instance; 
	}
}
