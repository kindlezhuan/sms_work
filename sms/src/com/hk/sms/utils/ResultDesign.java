package com.hk.sms.utils;

import java.util.Hashtable;

import com.hk.sms.model.ResultM;
import com.hk.sms.model.ResultMessage;
public class ResultDesign {
	@SuppressWarnings({ "static-access", "rawtypes" })
	static Hashtable table = ResultM.getResultM().table;
	public static ResultMessage resultDesign(ResultMessage result){
		if(result.getResult() != null && result.getResult() != ""){
			System.out.println("执行成功"+result.getResultCode());
			if(table.get(result.getResultCode()) != null && table.get(result.getResultCode()) != ""){
				result.setResult("fail");
				result.setResultInfo(table.get(result.getResultCode()).toString());
			}else{
				if("0#0".equals(result.getResult())){
					result.setResult("fail");
					result.setResultInfo("服务器错误，未能成功发送信息");
				}else
					result.setResultInfo("发送成功");
			}	
		}else{
			result.setResult("fail");
			result.setResultCode("200");
			result.setResultInfo("服务器错误");
		}
		
		
		return result;
	}
}
