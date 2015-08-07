package com.test;

import java.io.IOException;




import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;

import com.hk.sms.model.ResultMessage;
import com.hk.sms.model.SMSLog;
import com.hk.sms.model.SMSSave;
import com.hk.sms.model.SendMessage;
import com.hk.sms.utils.MD5Tool;
import com.hk.sms.utils.Object2XML;

public class ClientSystem {
	
	public static void main(String args[]) throws IOException{
//			start();
		
	}
	public static  void start() throws IOException{

		SendMessage sm = new SendMessage();
//		sm.setTimeMsg_ID("142");
		sm.setUID("wj2207");
		sm.setUPWD("2dcv001");
		sm.setMOBILE("13732264640");
		sm.setMSG("zhuan123");
		sm.setTimeMsg_ID(MD5Tool.getMD5(""+System.currentTimeMillis()+sm.getMSG()));
		//先判断是否存在sm信息为空，为空则返回信息不完全错误。
		Object2XML o2x = new Object2XML();
		String xml = o2x.constructLoginXML(sm);
		System.out.println(xml);
		SMSLog xml1 = o2x.extractUsername(xml);
		System.out.println(xml1);
		
		HttpClient client = new HttpClient();
		PostMethod post = new PostMethod(
				"http://localhost:8080/sms/post_sms.do");
		post.addRequestHeader("Content-Type",
				"application/x-www-form-urlencoded;charset=UTF-8");// 在头文件中设置转码
//		post.setRequestBody(xml);
		post.setParameter("xml", xml);
//		client.setParams(params);
		client.executeMethod(post);
		
		int statusCode = post.getStatusCode();
		
		System.out.println("statusCode:" + statusCode);
//		for (Header h : headers) {
//			System.out.println(h.toString());
//		}
		System.out.println(post.getStatusText());
		System.out.println(post.getResponseBodyAsString());
		post.releaseConnection();
		 
	
	}
}
