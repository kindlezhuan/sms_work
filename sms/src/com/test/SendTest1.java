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
				"application/x-www-form-urlencoded;charset=gbk");// ��ͷ�ļ�������ת��
		NameValuePair[] data = { 
			new NameValuePair("id", "�˻�id"),
			new NameValuePair("MD5_td_code", "ͨ������"),
			new NameValuePair("mobile", "�·�Ŀ���ֻ�����"),
			new NameValuePair("msg_content", "�·���������"),
			new NameValuePair("msg_id", "����id"),
			new NameValuePair("ext", "������չ��")
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
