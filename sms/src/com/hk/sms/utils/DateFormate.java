package com.hk.sms.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormate {

	public static void main(String args[]){
		Date time = new Date();
		System.out.println(time);
		DateFormate.DateTOString();
		DateFormate.DateTOStringT(time);
		
	}
	public static String DateTOString(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date time = new Date();
		String t = sdf.format(time);
		System.out.println(t);
		return t;
	}
	public static String DateTOStringT(Date time){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String t = sdf.format(time);
		System.out.println(t);
		return t;
	}

}
