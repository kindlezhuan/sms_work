package com.hk.sms.utils;

import java.io.IOException;
import java.io.StringReader;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;

import com.hk.sms.model.ResultMessage;
import com.hk.sms.model.SMSLog;
import com.hk.sms.model.SMSSave;
import com.hk.sms.model.SendMessage;

public class Object2XML {

	 private static Document BuildXMLDocument() throws IOException {   
		Document document = DocumentHelper.createDocument();
		Element root = DocumentHelper.createElement("SMS");
		
		document.setRootElement(root);
		
		return document;

    } 

	public String constructLoginXML(Object obj) throws IOException
		{
			Document document = BuildXMLDocument();//����������ķ���
			Element root = document.getRootElement();
			SendMessage sm = (SendMessage)obj;
			
			Element TimeMsg_ID = root.addElement("TimeMsg_ID");
			TimeMsg_ID.setText(sm.getTimeMsg_ID());
			
			Element UID = root.addElement("UID");
			UID.setText(sm.getUID());

			Element UPWD = root.addElement("UPWD");
			UPWD.setText(sm.getUPWD());
			
			Element MOBILE = root.addElement("MOBILE");
			MOBILE.setText(sm.getMOBILE());
			
			Element MSG = root.addElement("MSG");
			MSG.setText(sm.getMSG());
			
			return document.asXML();
		}
		public String constructResultXML(Object obj) throws IOException
		{
			Document document = BuildXMLDocument();
			Element root = document.getRootElement();
			ResultMessage sm = (ResultMessage)obj;
			
			Element TimeMsg_ID = root.addElement("TimeMsg_ID");
			TimeMsg_ID.setText(sm.getTimeMsg_ID());
			
			Element result = root.addElement("result");
			result.setText(sm.getResult());
			
			Element resultCode = root.addElement("resultCode");
			resultCode.setText(sm.getResultCode());		
			
			Element resultInfo =root.addElement("resultInfo");
			resultInfo.setText(sm.getResultInfo());
			
			Element status = root.addElement("status");
			status.setText(""+sm.getStatus());
			
			
			
			return document.asXML();
		}
	 	//XML to  String
		public  SMSLog extractUsername(String xml){
			try{
				SAXReader saxReader = new SAXReader();
				SMSLog sm = new SMSLog();
				Document document = saxReader.read(new StringReader(xml));
				sm.setTimeMsg_ID(document.getRootElement().element("TimeMsg_ID").getText());
				sm.setUID(document.getRootElement().element("UID").getText());
				sm.setUPWD(document.getRootElement().element("UPWD").getText());
				sm.setMOBILE(document.getRootElement().element("MOBILE").getText());
				sm.setMSG(document.getRootElement().element("MSG").getText());
				
				return sm;
			}
			catch(Exception ex){
				return null;
			}
		}
	    //getNode number
	    public static int getNodeCount(Element element) { 
	    	int i=0;
	    	for(i = 0;  i < element.nodeCount();  i++) {  
	    	Node node = element.node(i);  
	    	if(node instanceof Element) {  
	    	       Element elementTemp = (Element)node; 
	    	       System.out.println(elementTemp.getText());
	    	       getNodeCount(elementTemp);  
	    	}  
	    	} 
			return i;
	    	}
}
