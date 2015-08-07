package com.hk.sms.utils;


import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.lang.reflect.Method;  
import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.JSONUtils;

import org.apache.commons.beanutils.BeanUtils;


public class JsonUtils {

	/***************************************************************************
	 * 将List对象序列化为JSON文本
	 */
	public static <T> String toJSONString(List<T> list) {
		//做Date转换处理
		JsonConfig jsonConfig = new JsonConfig();
	//	jsonConfig.registerJsonValueProcessor(Date.class,new JsonDateValueProcessor());
		
		JSONArray jsonArray = JSONArray.fromObject(list,jsonConfig);
		return jsonArray.toString();
	}

	/***************************************************************************
	 * 将对象序列化为JSON文本
	 * 
	 * @param object
	 * @return
	 */
	public static String toJSONString(Object object) {
		JSONArray jsonArray = JSONArray.fromObject(object);

		return jsonArray.toString();
	}

	/***************************************************************************
	 * 将JSON对象数组序列化为JSON文本
	 * 
	 * @param jsonArray
	 * @return
	 */
	public static String toJSONString(JSONArray jsonArray) {
		return jsonArray.toString();
	}

	/***************************************************************************
	 * 将JSON对象序列化为JSON文本
	 * 
	 * @param jsonObject
	 * @return
	 */
	public static String toJSONString(JSONObject jsonObject) {
		return jsonObject.toString();
	}

	/***************************************************************************
	 * 将对象转换为List对象
	 * 
	 * @param object
	 * @return
	 */
	public static List toArrayList(Object object) {
		List arrayList = new ArrayList();

		JSONArray jsonArray = JSONArray.fromObject(object);

		Iterator it = jsonArray.iterator();
		while (it.hasNext()) {
			JSONObject jsonObject = (JSONObject) it.next();

			Iterator keys = jsonObject.keys();
			while (keys.hasNext()) {
				Object key = keys.next();
				Object value = jsonObject.get(key);
				arrayList.add(value);
			}
		}

		return arrayList;
	}

	/***************************************************************************
	 * 将对象转换为Collection对象
	 * 
	 * @param object
	 * @return
	 */
	public static Collection toCollection(Object object) {
		JSONArray jsonArray = JSONArray.fromObject(object);

		return JSONArray.toCollection(jsonArray);
	}

	/***************************************************************************
	 * 将对象转换为JSON对象数组
	 * 
	 * @param object
	 * @return
	 */
	public static JSONArray toJSONArray(Object object) {
		return JSONArray.fromObject(object);
	}

	/***************************************************************************
	 * 将对象转换为JSON对象
	 * 
	 * @param object
	 * @return
	 */
	public static JSONObject toJSONObject(Object object) {
		return JSONObject.fromObject(object);
	}

	/***************************************************************************
	 * 将对象转换为HashMap
	 * 
	 * @param object
	 * @return
	 */
	public static HashMap toHashMap(Object object) {
		HashMap<String, Object> data = new HashMap<String, Object>();
		JSONObject jsonObject = JsonUtils.toJSONObject(object);
		Iterator it = jsonObject.keys();
		while (it.hasNext()) {
			String key = String.valueOf(it.next());
			Object value = jsonObject.get(key);
			data.put(key, value);
		}

		return data;
	}

	/***************************************************************************
	 * 将对象转换为List<Map<String,Object>>
	 * 
	 * @param object
	 * @return
	 */
	// 返回非实体类型(Map<String,Object>)的List
	public static List<Map<String, Object>> toList(Object object) {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		JSONArray jsonArray = JSONArray.fromObject(object);
		for (Object obj : jsonArray) {
			JSONObject jsonObject = (JSONObject) obj;
			Map<String, Object> map = new HashMap<String, Object>();
			Iterator it = jsonObject.keys();
			while (it.hasNext()) {
				String key = (String) it.next();
				Object value = jsonObject.get(key);
				map.put((String) key, value);
			}
			list.add(map);
		}
		return list;
	}

	/***************************************************************************
	 * 将JSON对象数组转换为传入类型的List
	 * 
	 * @param <T>
	 * @param jsonArray
	 * @param objectClass
	 * @return
	 */
	public static <T> List<T> toList(JSONArray jsonArray, Class<T> objectClass) {
		return JSONArray.toList(jsonArray, objectClass);
	}

	/***************************************************************************
	 * 将对象转换为传入类型的List
	 * 
	 * @param <T>
	 * @param jsonArray
	 * @param objectClass
	 * @return
	 */
	public static <T> List<T> toList(Object object, Class<T> objectClass) {
		String[] dateFormats = new String[] { "yyyy-MM-dd" }; 
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));  
		
		JSONArray jsonArray = JSONArray.fromObject(object);
		
		return JSONArray.toList(jsonArray, objectClass);
	}
	
	/***************************************************************************
	 * 将对象转换为传入类型的List
	 * 
	 * @param <T>
	 * @param jsonArray
	 * @param objectClass
	 * @return
	 */
	public static <T> List<T> toList2(Object object, Class<T> objectClass) {
		String[] dateFormats = new String[] { "yyyy年MM月dd日" }; 
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));  
		
		JSONArray jsonArray = JSONArray.fromObject(object);
		
		return JSONArray.toList(jsonArray, objectClass);
	}
	
	
	/**
	 * 
	 * @param <T>
	 * @param object
	 * @param objectClass
	 * @return
	 */
	public static <T> T toForm(Object object, Class<T> objectClass) {
		String[] dateFormats = new String[] { "yyyy-MM-dd" }; 
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));   
		
		JSONArray jsonArray = JSONArray.fromObject(object);
		List<T> list = JSONArray.toList(jsonArray, objectClass);
		if(list.size() > 0){
			return list.get(0);
		}
		
		return null;
	}

	/***************************************************************************
	 * 将JSON对象转换为传入类型的对象
	 * 
	 * @param <T>
	 * @param jsonObject
	 * @param beanClass
	 * @return
	 */
	public static <T> T toBean(JSONObject jsonObject, Class<T> beanClass) {
		return (T) JSONObject.toBean(jsonObject, beanClass);
	}

	/***************************************************************************
	 * 将将对象转换为传入类型的对象
	 * 
	 * @param <T>
	 * @param object
	 * @param beanClass
	 * @return
	 */
	public static <T> T toBean(Object object, Class<T> beanClass) {
		JSONObject jsonObject = JSONObject.fromObject(object);

		return (T) JSONObject.toBean(jsonObject, beanClass);
	}

	/***************************************************************************
	 * 将JSON文本反序列化为主从关系的实体
	 * 
	 * @param <T>
	 *            泛型T 代表主实体类型
	 * @param <D>
	 *            泛型D 代表从实体类型
	 * @param jsonString
	 *            JSON文本
	 * @param mainClass
	 *            主实体类型
	 * @param detailName
	 *            从实体类在主实体类中的属性名称
	 * @param detailClass
	 *            从实体类型
	 * @return
	 */
	public static <T, D> T toBean(String jsonString, Class<T> mainClass,
			String detailName, Class<D> detailClass) {
		JSONObject jsonObject = JSONObject.fromObject(jsonString);
		JSONArray jsonArray = (JSONArray) jsonObject.get(detailName);

		T mainEntity = JsonUtils.toBean(jsonObject, mainClass);
		List<D> detailList = JsonUtils.toList(jsonArray, detailClass);

		try {
			BeanUtils.setProperty(mainEntity, detailName, detailList);
		} catch (Exception ex) {
			throw new RuntimeException("主从关系JSON反序列化实体失败！");
		}

		return mainEntity;
	}

	/***************************************************************************
	 * 将JSON文本反序列化为主从关系的实体
	 * 
	 * @param <T>泛型T
	 *            代表主实体类型
	 * @param <D1>泛型D1
	 *            代表从实体类型
	 * @param <D2>泛型D2
	 *            代表从实体类型
	 * @param jsonString
	 *            JSON文本
	 * @param mainClass
	 *            主实体类型
	 * @param detailName1
	 *            从实体类在主实体类中的属性
	 * @param detailClass1
	 *            从实体类型
	 * @param detailName2
	 *            从实体类在主实体类中的属性
	 * @param detailClass2
	 *            从实体类型
	 * @return
	 */
	public static <T, D1, D2> T toBean(String jsonString, Class<T> mainClass,
			String detailName1, Class<D1> detailClass1, String detailName2,
			Class<D2> detailClass2) {
		JSONObject jsonObject = JSONObject.fromObject(jsonString);
		JSONArray jsonArray1 = (JSONArray) jsonObject.get(detailName1);
		JSONArray jsonArray2 = (JSONArray) jsonObject.get(detailName2);

		T mainEntity = JsonUtils.toBean(jsonObject, mainClass);
		List<D1> detailList1 = JsonUtils.toList(jsonArray1, detailClass1);
		List<D2> detailList2 = JsonUtils.toList(jsonArray2, detailClass2);

		try {
			BeanUtils.setProperty(mainEntity, detailName1, detailList1);
			BeanUtils.setProperty(mainEntity, detailName2, detailList2);
		} catch (Exception ex) {
			throw new RuntimeException("主从关系JSON反序列化实体失败！");
		}

		return mainEntity;
	}

	/***************************************************************************
	 * 将JSON文本反序列化为主从关系的实体
	 * 
	 * @param <T>泛型T
	 *            代表主实体类型
	 * @param <D1>泛型D1
	 *            代表从实体类型
	 * @param <D2>泛型D2
	 *            代表从实体类型
	 * @param jsonString
	 *            JSON文本
	 * @param mainClass
	 *            主实体类型
	 * @param detailName1
	 *            从实体类在主实体类中的属性
	 * @param detailClass1
	 *            从实体类型
	 * @param detailName2
	 *            从实体类在主实体类中的属性
	 * @param detailClass2
	 *            从实体类型
	 * @param detailName3
	 *            从实体类在主实体类中的属性
	 * @param detailClass3
	 *            从实体类型
	 * @return
	 */
	public static <T, D1, D2, D3> T toBean(String jsonString,
			Class<T> mainClass, String detailName1, Class<D1> detailClass1,
			String detailName2, Class<D2> detailClass2, String detailName3,
			Class<D3> detailClass3) {
		JSONObject jsonObject = JSONObject.fromObject(jsonString);
		JSONArray jsonArray1 = (JSONArray) jsonObject.get(detailName1);
		JSONArray jsonArray2 = (JSONArray) jsonObject.get(detailName2);
		JSONArray jsonArray3 = (JSONArray) jsonObject.get(detailName3);

		T mainEntity = JsonUtils.toBean(jsonObject, mainClass);
		List<D1> detailList1 = JsonUtils.toList(jsonArray1, detailClass1);
		List<D2> detailList2 = JsonUtils.toList(jsonArray2, detailClass2);
		List<D3> detailList3 = JsonUtils.toList(jsonArray3, detailClass3);

		try {
			BeanUtils.setProperty(mainEntity, detailName1, detailList1);
			BeanUtils.setProperty(mainEntity, detailName2, detailList2);
			BeanUtils.setProperty(mainEntity, detailName3, detailList3);
		} catch (Exception ex) {
			throw new RuntimeException("主从关系JSON反序列化实体失败！");
		}

		return mainEntity;
	}

	/***************************************************************************
	 * 将JSON文本反序列化为主从关系的实体
	 * 
	 * @param <T>
	 *            主实体类型
	 * @param jsonString
	 *            JSON文本
	 * @param mainClass
	 *            主实体类型
	 * @param detailClass
	 *            存放了多个从实体在主实体中属性名称和类型
	 * @return
	 */
	public static <T> T toBean(String jsonString, Class<T> mainClass,
			HashMap<String, Class> detailClass) {
		JSONObject jsonObject = JSONObject.fromObject(jsonString);
		T mainEntity = JsonUtils.toBean(jsonObject, mainClass);
		for (Object key : detailClass.keySet()) {
			try {
				Class value = (Class) detailClass.get(key);
				BeanUtils.setProperty(mainEntity, key.toString(), value);
			} catch (Exception ex) {
				throw new RuntimeException("主从关系JSON反序列化实体失败！");
			}
		}
		return mainEntity;
	}

	/**
	 * JSONTO GRIDPANLE专用
	 * 
	 * @param <T>
	 * @param list
	 * @param count
	 * @return
	 */
	public static <T> String toJSONGridPanel(List<T> list, int count) {
		StringBuilder jsonsb = new StringBuilder();
		jsonsb.append("{\"data\":");
		jsonsb.append(toJSONString(list));
		jsonsb.append(",totalCount:\"" + count + "\"}");
		return jsonsb.toString();
	}
	
	/**
	 * 返回json字符串
	 * @param isSuccess
	 * @param data
	 * @param res
	 */
    public static String putJSONResult(boolean isSuccess, Object data) {
        StringBuilder jsonsb = new StringBuilder();
		if (isSuccess) {
			jsonsb.append("{\"success\":\"true\"");
        } else {
        	jsonsb.append("{\"failure\":\"true\"");
        }
		jsonsb.append(",\"data\":\"" + data + "\"}");
		return jsonsb.toString();
    }
    
    /**
     * 返回json字符串
     * @param isSuccess
     * @param data
     * @return
     */
    public static String putJSONResult2(boolean isSuccess, Object msg, Object data) {
        Map map = new HashMap(2);
		if (isSuccess) {
			map.put("success","true");
        } else {
        	map.put("failure","true");
        }
		map.put("msg", msg);
		map.put("data", data);
		
		return JSONObject.fromObject(map).toString();
    }
    
    public static Map<String, Object> transBean2Map(Object obj) {  
    	  
        if(obj == null){  
            return null;  
        }          
        Map<String, Object> map = new HashMap<String, Object>();  
        try {  
        	 
        	System.out.println("462");
            BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());  
            System.out.println("464");
            PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();  
            for (PropertyDescriptor property : propertyDescriptors) {  
               
            	String key = property.getName();  
                System.out.println("key:"+key);
                // 过滤class属性  
                if (!key.equals("class")) {  
                    // 得到property对应的getter方法  
                    Method getter = property.getReadMethod();  
                    Object value = getter.invoke(obj);  
                    if(value==null){
                    	value="";
                    }
                    map.put(key, value);  
                }  
  
            }  
        } catch (Exception e) {  
            System.out.println("transBean2Map Error " + e);  
        }  
  
        return map;  
  
    }  
}