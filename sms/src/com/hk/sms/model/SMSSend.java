package com.hk.sms.model;

public class SMSSend {
	private String TimeMsg_ID;//发送信息唯一ID time+短信信息MD5
	private String UID;//用户ID
	private String MOBILE;//发送目的地
	private String MSG;//信息内容
	private String Get_style;//获取方式：网页OR接口
	private String Send_style;//发送网关
	private String Send_result;//发送返回信息
	private String Send_time;//发送时间
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

	public String getSend_style() {
		return Send_style;
	}
	public void setSend_style(String send_style) {
		Send_style = send_style;
	}
	public String getGet_style() {
		return Get_style;
	}
	public void setGet_style(String get_style) {
		Get_style = get_style;
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
	
}
