package com.hk.sms.model;

import java.util.Date;

public class User {    
    
    private Long id;    
    private String name;    
    private String pwd;    
    private Long age;    
    private Long sex;  
    private int zt;//用户可用状态 1可用 0:删除
    private int resource;//可用资源数量
    private int p_c;//网页=1或者客户端=2
    private Date createtime;//创建时间
    
    public Long getId() {    
        return id;    
    }    
    
    public void setId(Long id) {    
        this.id = id;    
    }    
    
    public String getName() {    
        return name;    
    }    
    
    public int getZt() {
		return zt;
	}

	public void setZt(int zt) {
		this.zt = zt;
	}

	public void setName(String name) {    
        this.name = name;    
    }    
    
    public String getPwd() {    
        return pwd;    
    }    
    
    public void setPwd(String pwd) {    
        this.pwd = pwd;    
    }    
    
    public Long getAge() {    
        return age;    
    }    
    
    public void setAge(Long age) {    
        this.age = age;    
    }    
    
    public Long getSex() {    
        return sex;    
    }    
    
    public void setSex(Long sex) {    
        this.sex = sex;    
    }

	public int getP_c() {
		return p_c;
	}

	public void setP_c(int p_c) {
		this.p_c = p_c;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public int getResource() {
		return resource;
	}

	public void setResource(int resource) {
		this.resource = resource;
	}       
    
}   