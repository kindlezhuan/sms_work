package com.hk.sms.model;

import java.util.Date;

public class SMSSave {
	private String TimeMsg_ID;//������ϢΨһID time+������ϢMD5
	private String UID;//�û�ID
	private String UPWD;//�û�����
	private String MOBILE;//����Ŀ�ĵ�
	private String MSG;//��Ϣ����
	private String Send_result;//���ͷ�����Ϣ
	private String   Get_time;//�յ�ʱ��
	private String   Send_time;//����ʱ��
	private String   savetime;//����ʱ��
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