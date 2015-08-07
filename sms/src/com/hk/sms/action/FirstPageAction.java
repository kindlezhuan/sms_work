/**
 * 
 */
package com.hk.sms.action;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.hk.sms.constant.RetAjaxFlags;


@SuppressWarnings("serial")
@Component
@Scope(value = "prototype")
public class FirstPageAction extends BaseAction {
	@SuppressWarnings("unused")
	private static final Logger log = Logger.getLogger(FirstPageAction.class);

	@Autowired

	private RetAjaxFlags result;

	private String page;

	private String zt;

	private String ggid;

	private String bjjl_id;
	private String ld_id;

	private String start;
	private String limit;

	private String closeZt;

	
	public String toCSfp() {
		page = "cs_center";
		return SUCCESS;
	}
	public String getZt() {
		return zt;
	}

	public void setZt(String zt) {
		this.zt = zt;
	}

	public RetAjaxFlags getResult() {
		return result;
	}

	public void setResult(RetAjaxFlags result) {
		this.result = result;
	}

	public String getGgid() {
		return ggid;
	}

	public void setGgid(String ggid) {
		this.ggid = ggid;
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

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getBjjl_id() {
		return bjjl_id;
	}

	public void setBjjl_id(String bjjlId) {
		bjjl_id = bjjlId;
	}

	public String getLd_id() {
		return ld_id;
	}

	public void setLd_id(String ld_id) {
		this.ld_id = ld_id;
	}

	public String getCloseZt() {
		return closeZt;
	}

	public void setCloseZt(String closeZt) {
		this.closeZt = closeZt;
	}

}
