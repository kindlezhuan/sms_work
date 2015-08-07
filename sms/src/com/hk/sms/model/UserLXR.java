package com.hk.sms.model;

public class UserLXR {
	private int l_id;
	private Long luid;
	private String lname;
	private String lemail;
	private String lphone;

	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public String getLemail() {
		return lemail;
	}
	public void setLemail(String lemail) {
		this.lemail = lemail;
	}
	public String getLphone() {
		return lphone;
	}
	public void setLphone(String lphone) {
		this.lphone = lphone;
	}
	public Long getLuid() {
		return luid;
	}
	public void setLuid(Long luid) {
		this.luid = luid;
	}
//	private String[] L_group;//联系人所属分组数组字符串
	public int getL_id() {
		return l_id;
	}
	public void setL_id(int l_id) {
		this.l_id = l_id;
	}
	
	
}
