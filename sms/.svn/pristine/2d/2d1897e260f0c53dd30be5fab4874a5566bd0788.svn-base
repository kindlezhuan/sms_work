package com.hk.sms.smsdo;



import com.hk.sms.model.ResultMessage;
import com.hk.sms.model.SMSLog;
import com.hk.sms.model.SMSSave;
import com.hk.sms.utils.DateFormate;
import com.hk.sms.utils.TypeAndStatusConstant;

public class SMSInfoprocess {

	public ResultMessage infoProcess_success(SMSLog smsLog){
		//1.Send Message
		ResultMessage  resultMessage= new ResultMessage();
		System.out.println("Send Message!");
		smsLog.setSend_time(DateFormate.DateTOString());
		smsLog  = SMSSend.sendDO(smsLog);
		smsLog.setSend_style("baiwutong");
		
		resultMessage.setTimeMsg_ID(smsLog.getTimeMsg_ID());
		resultMessage.setResultCode(smsLog.getSend_result_code());
		resultMessage.setResultInfo(smsLog.getSend_result_code_info());
		
//		smsLog.setSend_result("0#1");
		if("fail".equals(smsLog.getSend_result()) ||smsLog.getSend_result() == null || smsLog.getSend_result() == "" ){
			resultMessage.setResult("fail");
			smsLog.setSavetime(DateFormate.DateTOString());
			smsLog.setSend_result(Integer.toString(TypeAndStatusConstant.SEND_RESULT_FAIL));
			SMSLogSave.saveDO(smsLog);
		}else{
			resultMessage.setResult("success");
			smsLog.setSend_result(Integer.toString(TypeAndStatusConstant.SEND_RESULT_SUCCESS));

			smsLog.setSavetime(DateFormate.DateTOString());

			SMSLogSave.saveDO(smsLog);
			

		}
		return resultMessage;
	}
	public int infoProcess_failure(SMSSave sendMessage){

		return 0;
	}
}
