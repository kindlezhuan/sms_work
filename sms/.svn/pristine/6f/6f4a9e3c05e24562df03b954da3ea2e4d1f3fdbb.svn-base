package com.test;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;

public class SendTest1 {
	public static void main(String[] args) throws Exception {
		HttpClient client = new HttpClient();
		PostMethod post = new PostMethod(
				"http://cloud.baiwutong.com:8080/post_sms.do");
		post.addRequestHeader("Content-Type",
				"application/x-www-form-urlencoded;charset=gbk");// 在头文件中设置转码
		NameValuePair[] data = { 
			new NameValuePair("id", "账户id"),
			new NameValuePair("MD5_td_code", "通道代码"),
			new NameValuePair("mobile", "下发目的手机号码"),
			new NameValuePair("msg_content", "下发短信内容"),
			new NameValuePair("msg_id", "短信id"),
			new NameValuePair("ext", "短信扩展号")
		};
		post.setRequestBody(data);

		client.executeMethod(post);
		Header[] headers = post.getResponseHeaders();
		int statusCode = post.getStatusCode();
		System.out.println("statusCode:" + statusCode);
		for (Header h : headers) {
			System.out.println(h.toString());
		}
		String result = new String(post.getResponseBodyAsString());
		System.out.println(result);
		post.releaseConnection();
	}

}
