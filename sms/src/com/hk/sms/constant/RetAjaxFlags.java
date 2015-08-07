package com.hk.sms.constant;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.hk.sms.utils.JsonUtils;




public class RetAjaxFlags {
	//返回消息代码
	private String msg_no;
	
	//返回消息信息
	private String msg;
	
	//分页返回参数总条数
	private String total;
	
	//返回数据
	private Object data;
	
	private boolean success;
	
	/**
	 * 成功时返回代码
	 * @param 需要返回的数据
	 * @return
	 */
	public static RetAjaxFlags onSuccess(Object o){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.SUCCESS_COD;
		flg.data = o;
		flg.success=true;
		//flg.total = 30+"";
		return flg;
	}
	
	public static RetAjaxFlags toJSONGridPanel(Object o,int totalCount){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.SUCCESS_COD;
		flg.data = toListKeyLowerCase(o);
		flg.success=true;
		flg.total = totalCount+"";
		return flg;
	}
	
	public static RetAjaxFlags toJSONGridPanel2(Object o,int totalCount){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.SUCCESS_COD;
		flg.data = o;
		flg.success=true;
		flg.total = totalCount+"";
		return flg;
	}
	/**
	 * 将List<实体>转成json
	 * @param o
	 * @param totalCount
	 * @return
	 */
	public static RetAjaxFlags toJSONGridPanel3(List<?> o,int totalCount){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.SUCCESS_COD;
		flg.data = JsonUtils.toJSONString(o);
		flg.success=true;
		flg.total = totalCount+"";
		return flg;
	}
	/**
	 * 将List<实体>
	 * @param o
	 * @param totalCount
	 * @return
	 */
	public static RetAjaxFlags toJSONGridPanel4(List<?> o,int totalCount){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.SUCCESS_COD;
		flg.data = o;
		flg.success=true;
		flg.total = totalCount+"";
		return flg;
	}

	/**
	 * 将实体转成json
	 * @param o
	 * @return
	 */
	public static RetAjaxFlags toJSONForm3(Object o){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.SUCCESS_COD;
		flg.data = JsonUtils.toJSONString(o);
		flg.success=true;
		return flg;
	}
	
	public static RetAjaxFlags toJSONForm(Object o){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.SUCCESS_COD;
		flg.data = toOneKeyLowerCase(o);
		flg.success=true;
		return flg;
	}
	
	
	
	public static RetAjaxFlags toJSONForm2(Object o){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.SUCCESS_COD;
		flg.data = o;
		flg.success=true;
		return flg;
	}
	
	/**
	 * 数据库异常时返回代码
	 * @return
	 */
	public static RetAjaxFlags onDbError(){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.DBERROR_COD;
		flg.msg = ConstantNums.DBERROR_MSG;
		return flg;
	}
	
	/**
	 * 数据库sql查询没有数据时（如登陆查不到数据即用户名密码错误）
	 * @return
	 */
	public static RetAjaxFlags onNoResultError(){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.NORESULT_COD;
		flg.msg = ConstantNums.NORESULT_MSG;
		return flg;
	}
	
	/**
	 * 审核中（登陆用）
	 * @return
	 */
	public static RetAjaxFlags onReviewError(){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.REVIEWERR_COD;
		flg.msg = ConstantNums.REVIEWERR_MSG;
		return flg;
	}
	
	/**
	 * 审核未通过（登陆用）
	 * @return
	 */
	public static RetAjaxFlags onRejectError(){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.REJECTERR_COD;
		flg.msg = ConstantNums.REJECTERR_MSG;
		return flg;
	}
	
	/**
	 * 审核中（登陆用）
	 * @return
	 */
	public static RetAjaxFlags onApprovalError(){
		RetAjaxFlags flg = new RetAjaxFlags();
		
		return flg;
	}
	/**
	 * 注册信息不足
	 * @return
	 */
	public static RetAjaxFlags onNoRegistInfo(){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.NOREGISTINFO_COD;
		flg.msg = ConstantNums.NOREGISTINFO_MSG;
		return flg;
	}
	
	/**
	 * 登陆信息丢失
	 * @return
	 */
	public static RetAjaxFlags onLoseLoginData(){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.LOSELOGINDATA_COD;
		flg.msg = ConstantNums.LOSELOGINDATA_MSG;
		return flg;
	}
	
	/**
	 * 未知错误时返回
	 * @return
	 */
	public static RetAjaxFlags onOthersError(){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.OTHERSERROR_COD;
		flg.msg = ConstantNums.OTHERERROR_MSG;
		return flg;
	}

	/**
	 * 新增信息存在时返回
	 * @return
	 */
	public static RetAjaxFlags onParameterError(){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.PARAMETER_COD;
		flg.msg = ConstantNums.PARAMETER_MSG;
		return flg;
	}
	/**
	 * 新增信息存在时返回
	 * @return
	 */
	public static RetAjaxFlags addExistError(){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.ADDEXISTERROR_COD;
		flg.msg = ConstantNums.ADDEXISTERROR_MSG;
		return flg;
	}
	/**
	 * 新增信息存在重复时返回
	 * @return
	 */
	public static RetAjaxFlags addRepeatError(Object o){
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.ADDREPEATERROR_COD;
		flg.msg = ConstantNums.ADDREPEATERROR_MSG;
		flg.data = o;
		return flg;
	}
	
	//====================================getters and setters ======================================

	public String getMsg_no() {
		return msg_no;
	}

	public void setMsg_no(String msgNo) {
		msg_no = msgNo;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	public static ArrayList toListKeyLowerCase(Object o){
		ArrayList data = (ArrayList)o;
		if(data != null && data.size() > 0){
			ArrayList tempList = new ArrayList();
			for(int i = 0; i < data.size(); i++){
				Map map = (Map)data.get(i);
				Map tempMap = new HashMap();
				Iterator<String> iter = map.keySet().iterator();
				while (iter.hasNext()) {
				    String key = iter.next();
				    Object value = map.get(key);
				    tempMap.put(key.toLowerCase(), value);
				}
				tempList.add(tempMap);
			}
			return tempList;
		}
		return data;
	}		
	
	public static Map toOneKeyLowerCase(Object o){
		Map map = (Map)o;
		if(map != null){
			Map tempMap = new HashMap();
			Iterator<String> iter = map.keySet().iterator();
			while (iter.hasNext()) {
			    String key = iter.next();
			    Object value = map.get(key);
			    tempMap.put(key.toLowerCase(), value);
			}			
			return tempMap;
		}
		return map;
	}

	public static RetAjaxFlags onSuccess2(Object o , String cnts) {
		RetAjaxFlags flg = new RetAjaxFlags();
		flg.msg_no = ConstantNums.SUCCESS_COD;
		flg.data = o;
		flg.success=true;
	    flg.total = cnts;
		return flg;
	}


}
