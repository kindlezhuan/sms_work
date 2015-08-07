package com.hk.sms.utils;

public class TypeAndStatusConstant {
	/**
	 *send from= 1
	 */
	public static final int SEND_MESSAGE_FROM_INTERFACE = 1;
	/**
	 * send from = 2
	 */
	public static final int SEND_MESSAGE_FROM_WEBPAGE = 2;
	
	/**
	 * send success= 1
	 */
	public static final int SEND_RESULT_SUCCESS = 1;
	public static final String SEND_RESULT_SUCCESS_STRING = "发送成功";
	/**
	 * send failed  = 2
	 */
	public static final int SEND_RESULT_FAIL = 2;
	public static final String SEND_RESULT_FAIL_STRING = "发送失败";
	/**
	 * NO the user  = 1
	 */
	public static final int SEND_MESSAGE_STATE_RESULT_NOTHEUSER = 1;
	public static final String SEND_MESSAGE_STATE_RESULT_NOTHEUSER_STRING = "没有这个用户";
	/**
	 * wrong password= 2
	 */
	public static final int SEND_MESSAGE_STATE_RESULT_WRONGPASSWORD = 2;
	public static final String SEND_MESSAGE_STATE_RESULT_WRONGPASSWORD_STRING = "密码错误";
}
