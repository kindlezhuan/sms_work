package com.hk.sms.model;


public class SMSLog {
	private String TimeMsg_ID;//������ϢΨһID time+������ϢMD5
	private String UID;//�û�ID
	private String UPWD;//�û�����
	private String MOBILE;//����Ŀ�ĵ�
	private String MSG;//��Ϣ����
	private int Get_style;//��ȡ��ʽ����ҳOR�ӿ�
	private String Send_style;//��������
	private String Send_result;//���ͷ�����Ϣ��success OR fail
	private String Send_result_code;//���ؽ��Code
	private String Send_result_code_info;//���ؽ������
	private String   Get_time;//�յ���Ϣʱ��
	private String   Send_time;//����ʱ��
	private String   savetime;
	private String   savetime_log;
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

	public int getGet_style() {
		return Get_style;
	}
	public void setGet_style(int get_style) {
		Get_style = get_style;
	}
	public String getSend_style() {
		return Send_style;
	}
	public void setSend_style(String send_style) {
		Send_style = send_style;
	}
	public String getSend_result() {
		return Send_result;
	}
	public void setSend_result(String send_result) {
		Send_result = send_result;
	}
	
	public String getSend_result_code() {
		return Send_result_code;
	}
	public void setSend_result_code(String send_result_code) {
		Send_result_code = send_result_code;
	}
	public String getSend_result_code_info() {
		return Send_result_code_info;
	}
	public void setSend_result_code_info(String send_result_code_info) {
		Send_result_code_info = send_result_code_info;
	}
	public String getGet_time() {
		return Get_time;
	}
	public void setGet_time(String get_time) {
		Get_time = get_time;
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
	public String getSavetime_log() {
		return savetime_log;
	}
	public void setSavetime_log(String savetime_log) {
		this.savetime_log = savetime_log;
	}
	public String getUPWD() {
		return UPWD;
	}
	public void setUPWD(String uPWD) {
		UPWD = uPWD;
	}
	
}
