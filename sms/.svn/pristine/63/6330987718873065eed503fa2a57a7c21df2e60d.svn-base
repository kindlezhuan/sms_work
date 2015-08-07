package com.hk.sms.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 文字相关处理
 * 
 * @author guoxy
 * 
 */
public class StringUtil {

	/**
	 * 获取6位随机数
	 * 
	 * @return
	 */
	public static String getSixRandom() {

		long rand = Math.round(Math.random() * 100000 + 1);
		String result = String.format("%1$06d", rand);

		return result;
	}

	/**
	 * 获取4位随机数
	 * 
	 * @return
	 */
	public static String getFourRandom() {

		long rand = Math.round(Math.random() * 1000 + 1);
		String result = String.format("%1$04d", rand);
		return result;
	}

	/**
	 * 获取3位随机数
	 * 
	 * @return
	 */
	public static String getThreeRandom() {

		long rand = Math.round(Math.random() * 100);
		String result = String.format("%1$03d", rand);

		return result;
	}

	/**
	 * 判断是否数字
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isNumeric(String str) {
		Pattern pattern = Pattern.compile("[0-9]*");
		return pattern.matcher(str).matches();
	}

	/**
	 * 获取订单号
	 * 
	 * @return
	 */
	public static String orderSerial() {
		String serial = DateUtil.nowTime() + getSixRandom();
		return serial;
	}

	/**
	 * 不足10位 补零
	 * 
	 * @param strNum
	 * @return
	 */
	public static String tenOrderNo(String strNum) {
		if (strNum.length() == 10) {
			return strNum;
		}
		strNum = String.format("%1$010d", Integer.parseInt(strNum));

		return strNum;
	}
	
	/**
	 * 检查字符串是否为<code>null</code>或空字符<code>""</code>
	 * 
	 * <pre>
	 * StringUtil.isEmpty(null)      = true
	 * StringUtil.isEmpty("")        = true
	 * StringUtil.isEmpty(" ")       = false
	 * StringUtil.isEmpty("bob")     = false
	 * StringUtil.isEmpty("  bob  ") = false
	 * </pre>
	 * 
	 * @param str
	 *            要检查的字符
	 * @return 如果为空, 则返<code>true</code>
	 */
	public static boolean isEmpty(String str) {
		return ((str == null) || (str.length() == 0));
	}

	/**
	 * 检查字符串是否不空<code>null</code>和空字符<code>""</code>
	 * 
	 * <pre>
	 * StringUtil.isEmpty(null)      = false
	 * StringUtil.isEmpty("")        = false
	 * StringUtil.isEmpty(" ")       = true
	 * StringUtil.isEmpty("bob")     = true
	 * StringUtil.isEmpty("  bob  ") = true
	 * </pre>
	 * 
	 * @param str
	 *            要检查的字符
	 * @return 如果不为 则返回<code>true</code>
	 */
	public static boolean isNotEmpty(String str) {
		return ((str != null) && (str.length() > 0) );
	}

	/**
	 * 检查字符串是否是空白<code>null</code>、空字符<code>""</code>或只有空白字符
	 * 
	 * <pre>
	 * StringUtil.isBlank(null)      = true
	 * StringUtil.isBlank("")        = true
	 * StringUtil.isBlank(" ")       = true
	 * StringUtil.isBlank("bob")     = false
	 * StringUtil.isBlank("  bob  ") = false
	 * </pre>
	 * 
	 * @param str
	 *            要检查的字符串
	 * @return 如果为空 则返回<code>true</code>
	 */
	public static boolean isBlank(String str) {
		int length;

		if ((str == null) || ((length = str.length()) == 0)) {
			return true;
		}

		for (int i = 0; i < length; i++) {
			if (!Character.isWhitespace(str.charAt(i))) {
				return false;
			}
		}

		return true;
	}

	/**
	 * 检查字符串是否不是空白：<code>null</code>、空字符<code>""</code>或只有空白字符�?
	 * 
	 * <pre>
	 * StringUtil.isBlank(null)      = false
	 * StringUtil.isBlank("")        = false
	 * StringUtil.isBlank(" ")       = false
	 * StringUtil.isBlank("bob")     = true
	 * StringUtil.isBlank("  bob  ") = true
	 * </pre>
	 * 
	 * @param str
	 *            要检查的字符串
	 * @return 如果为空 则返回<code>true</code>
	 */
	public static boolean isNotBlank(String str) {
		int length;

		if ((str == null) || ((length = str.length()) == 0)) {
			return false;
		}

		for (int i = 0; i < length; i++) {
			if (!Character.isWhitespace(str.charAt(i))) {
				return true;
			}
		}

		return false;
	}

	/**
	 * 是否参数都不为空
	 * 
	 * @param args
	 *            参数
	 * @return true or false
	 */
	public static final boolean isNotEmptyAll(Object... args) {
		boolean flag = true;
		if (null != args) {
			for (int i = 0; i < args.length; i++) {
				if (args[i] instanceof String) {
					if (isEmpty((String) args[i])) {
						flag = false;
					}
				} else {
					if (null == args[i]) {
						flag = false;
					}
				}
			}
		}
		return flag;
	}

	public static void main(String args[]) {
		System.out.println(orderSerial());
	}
	/**
	 * unicode转中文
	 * @param str
	 * @return
	 */
	public static String convert(String str){
		Pattern pattern = Pattern.compile("(\\\\u(\\p{XDigit}{4}))");
        Matcher matcher = pattern.matcher(str);
        char ch;
        while (matcher.find()) {
        ch = (char) Integer.parseInt(matcher.group(2), 16);
        str = str.replace(matcher.group(1), ch + "");
        }
        return str;
	}
	/**
	 * String to Array
	 * @param Ls
	 * @return
	 */
	public static String[] StringtoArray(String Ls){
		String[] array = new String[Ls.length()/500+1];
		if(Ls.length()>500){
			int len = 0;
			int i=0;
			String info = null;
			for(;i<Ls.length()/500;i++){
				
				info = Ls.substring(len,len+500);
				array[i] = info;
				len += 500;
			}
			info = Ls.substring(len,Ls.length());
			array[i] = info;
		}else{
			array[0] = Ls;
		}
		return array;
	}
}
