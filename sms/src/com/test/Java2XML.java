package com.test;

import java.io.IOException;   
import java.io.StringReader;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;


  

public class Java2XML {  

    public static Document BuildXMLDoc() throws IOException {   
		Document document = DocumentHelper.createDocument();
		Element root = DocumentHelper.createElement("message");
		
		document.setRootElement(root);
		
		return document;

    } 
    public static String constructLoginXML(String username) throws IOException
	{
		Document document = BuildXMLDoc();//调用上面个的方法
		
		Element root = document.getRootElement();
		
		Element type = root.addElement("type");
		Element kk = type.addElement("kk");
		kk.setText("BUG");
		type.setText("1");
		

		
		Element user = root.addElement("user");
		user.setText(username);
		
		return document.asXML();
	}
    public static String extractUsername(String xml){
		try{
			SAXReader saxReader = new SAXReader();
			
			Document document = saxReader.read(new StringReader(xml));
	        System.out.println(getNodeCount(document.getRootElement().element("type")));
			Element user = document.getRootElement().element("type");
			return user.getText();
		}
		catch(Exception ex){
		}
		return null;
	}
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
    public static void main(String[] args) {  

       try {  
    	   Java2XML j2x = new Java2XML();
           System.out.println("生成 mxl 文件...");  

           System.out.println(Java2XML.constructLoginXML("kali"));  
           System.out.println(extractUsername(Java2XML.constructLoginXML("kali")));  
       } catch (Exception e) {  

           e.printStackTrace();  

       }  

    }

}   