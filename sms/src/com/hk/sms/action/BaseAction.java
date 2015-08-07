package com.hk.sms.action;

import com.hk.sms.constant.RetAjaxFlags;
import com.hk.sms.utils.PageSplit;
import com.hk.sms.utils.StringUtil;
import com.opensymphony.xwork2.ActionSupport;

public class BaseAction  extends ActionSupport{    
    
    /**   
     *    
     */    
    private static final long serialVersionUID = 4565394360208096613L;    


	// 跳转页面
	public String page;

	// 分页开始
	public String start;

	// 限定条数
	public String limit;

	// 分页工具
	public PageSplit split;

	public RetAjaxFlags result;

	// 要弹出的消息
	public String alertMessage;
	/**
	 * 分页类设置start，end
	 */
	public void splitInit() {
		if (start == null) {
			this.setStart("0");
		}
		// 分页类，用于计算页数
		split = new PageSplit();
		if(page != null && StringUtil.isNumeric(page))
		{
			split.setP_page(page);
		}
		
		if (limit == null) {
			// 此页面设置默认分页值为10
			split.setP_size("50");
		} else {
			split.setP_size(limit);	
		}
		
	}
	// ===============================getters and
	// setters====================================
	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getLimit() {
		return limit;
	}

	public void setLimit(String limit) {
		this.limit = limit;
	}

	public PageSplit getSplit() {
		return split;
	}

	public void setSplit(PageSplit split) {
		this.split = split;
	}

	public RetAjaxFlags getResult() {
		return result;
	}

	public void setResult(RetAjaxFlags result) {
		this.result = result;
	}

	public String getAlertMessage() {
		return alertMessage;
	}

	public void setAlertMessage(String alertMessage) {
		this.alertMessage = alertMessage;
	}


} 
