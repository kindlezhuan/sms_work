package com.hk.sms.model;

import java.util.Date;

public class SMSSave {
	private String TimeMsg_ID;//发送信息唯一ID time+短信信息MD5
	private String UID;//用户ID
	private String UPWD;//用户密码
	private String MOBILE;//发送目的地
	private String MSG;//信息内容
	private String Send_result;//发送返回信息
	private String   Get_time;//收到时间
	private String   Send_time;//发送时间
	private String   savetime;//保存时间
	public String getTimeMsg_ID() {
		return TimeMsg_ID;
	}
	public void setTimeMsg_ID(String timeMsg_ID) {
		TimeMsg_ID = timeMsg_ID;
	}
	public String getUID() {
		return UID;
	}
	public void setUID(String uID) {
		UID = uID;
	}
	public String getMOBILE() {
		return MOBILE;
	}
	public void setMOBILE(String mOBILE) {
		MOBILE = mOBILE;
	}
	public String getMSG() {
		return MSG;
	}
	public void setMSG(String mSG) {
		MSG = mSG;
	}
	public String getSend_result() {
		return Send_result;
	}
	public void setSend_result(String send_result) {
		Send_result = send_result;
	}
	public String getSend_time() {
		return Send_time;
	}
	public void setSend_time(String send_time) {
		Send_time = send_time;
	}
	public String getSavetime() {
		return savetime;
	}
	public void setSavetime(String savetime) {
		this.savetime = savetime;
	}
	public String getUPWD() {
		return UPWD;
	}
	public void setUPWD(String uPWD) {
		UPWD = uPWD;
	}
	public String getGet_time() {
		return Get_time;
	}
	public void setGet_time(String get_time) {
		Get_time = get_time;
	}

}
