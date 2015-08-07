package com.hk.sms.utils;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class IS_Mobile {	
	public static boolean isMobile(String mobile){
		if(mobile.length() == 11){
			Pattern p = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$");
			Matcher m = p.matcher(mobile);
			System.out.println(m.matches());
			return(m.matches());
		}
		return false;
	}
	public static void main(String args[]){
		System.out.println(isMobile("1354567908"));
	}
}
