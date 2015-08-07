package com.hk.sms.constant;

public class ConstantNums {

	// 成功代码
	public static String SUCCESS_COD = "0";

	// 数据库连接异常代码
	public static String DBERROR_COD = "-1";

	public static String DBERROR_MSG = "数据库连接异常，请联系管理员！";

	// 用没有查询到结果
	public static String NORESULT_COD = "-2";

	public static String NORESULT_MSG = "没有查询到结果。";

	// 审核不通过代码
	public static String REVIEWERR_COD = "-3";

	public static String REVIEWERR_MSG = "对不起，你所登陆的账号正在审核中...";

	// 注册信息有字段为空
	public static String NOREGISTINFO_COD = "-4";

	public static String NOREGISTINFO_MSG = "注册信息不足，请联系管理员。";

	// 登陆信息丢失
	public static String LOSELOGINDATA_COD = "-5";

	public static String LOSELOGINDATA_MSG = "登陆信息丢失，请重新登陆！";

	// 其他错误
	public static String OTHERSERROR_COD = "-6";

	public static String OTHERERROR_MSG = "发生了未知错误！";

	// 新增信息存在
	public static String ADDEXISTERROR_COD = "-7";

	public static String ADDEXISTERROR_MSG = "新增信息已经存在！";
	// 参数错误
	public static String PARAMETER_COD = "-8";

	public static String PARAMETER_MSG = "参数错误，请刷新重试！";
	// 新增信息存在重复
	public static String ADDREPEATERROR_COD = "-9";

	public static String ADDREPEATERROR_MSG = "存在重复信息！";
	/**
	 * 两点距离超限值，单位千米，在判断是否异常开锁时用到
	 */
	public static double DIS_OUT_OF_RANGE = 0.5;
	
	// 审核不通过代码
	public static String REJECTERR_COD = "-10";

	public static String REJECTERR_MSG = "对不起，你所登陆的账号审核未通过";

}
