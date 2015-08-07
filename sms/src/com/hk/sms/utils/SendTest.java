package com.hk.sms.utils;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;



public class SendTest {
	public static String send_cat(String corp_id, String corp_pwd, String url,
			String corp_service, int total_count, String send_param,int ctrl_para){
				int result =-1;
				String sendResult;
				HttpClient client = new HttpClient();
				PostMethod method = new PostMethod(url);
				method.addRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=gbk");
				try{
					method.addParameter("corp_id", corp_id);
					method.addParameter("corp_pwd", corp_pwd);
					method.addParameter("corp_service", corp_service);
					method.addParameter("total_count",total_count+"");
					method.addParameter("send_param",send_param);
					method.addParameter("ctrl_param", ctrl_para+"");
					client.executeMethod(method);
					sendResult = method.getResponseBodyAsString();
						System.out.println("============="+sendResult);
					}catch (Exception e) {
					e.printStackTrace();
					sendResult = "faile";
					result = -1;
				}finally{
					try{
						method.releaseConnection();
					}catch (Exception e) {
						e.printStackTrace();
					}
				}
				return sendResult;
			}
		
			public static void main(String[] args) {
				long start=System.currentTimeMillis();
				System.out.println(start);
				String tel="13732264640";
				String content="短信内容:kindle test";
				String msg_id="1001";
				String code="";
				String split="&split&";
				String group="&group&";
				String send_param = "";
				String[] array={tel,msg_id,code,content};
				StringBuffer sb=null;
				int length=1;
				for (int i = 0; i < length; i++) {
					sb=new StringBuffer();
					for (int j = 0; j < array.length; j++) {
						if((j+1)==array.length){
							sb.append(array[j]+i);	
						}else{
						sb.append(array[j]+split);
						}
					}
					if((i+1)==length){
					send_param+=sb.toString();
					}else {
					send_param+=sb.toString()+group;	
					}
					sb=null;
				}
				System.out.println(System.currentTimeMillis()-start);
					System.out.println(send_param);
				
					char[] c = send_param.toString().toCharArray();
					System.out.println("charlength= " + c.length);
						
					String corp_id = "wj2207";
					String corp_pwd = "2dcv001";
					String url = "http://cloud.baiwutong.com:8080/antoSmsSend.do";
					String corp_service="1069011612207";//业务代码
					int total_count =length;
					SendTest.send_cat(corp_id, corp_pwd, url,corp_service,total_count, send_param,1);	
					}
				}


