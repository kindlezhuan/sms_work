package com.hk.sms.action;

import java.util.HashMap;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

import com.hk.sms.constant.RetAjaxFlags;
import com.hk.sms.dao.UserDao;
import com.hk.sms.model.User;
import com.opensymphony.xwork2.Action;

public class LoginAction extends BaseAction { 
    
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String username; 
   
    private String password; 
   
    private String msg; 
	private String json;
	private RetAjaxFlags result;
    private UserDao userDao;
	public String toLogin(){
		return SUCCESS;
	}
    @SuppressWarnings("unused")
	public String login() { 
    HttpServletRequest request = ServletActionContext.getRequest();
       User user = null;
      if(StringUtils.isBlank(this.username) || StringUtils.isBlank(this.password)) { 
    	  if(result == null)
    		  System.out.println("result = null");
    	result.setMsg_no("-2");
//    	result.setMsg("data error");
        return SUCCESS;
      }else {
    	  try {
        	user = userDao.getUser(this.username, this.password);
  		} catch (Exception e) {
  			e.printStackTrace();
  			result = RetAjaxFlags.onDbError();
  			return "ajax";
  		}

    	  }
      if(user == null || user.getPwd() == null || !user.getPwd().equals(this.password)) { 
        //登陆失败
        this.msg = "登陆失败"; 
        result.setMsg(msg);
        return "ajax"; 
      } else { 
        //登陆成功
        //设置session 
        this.getSession().setAttribute("_USER_INFO_LOGIN_NAME_", this.username); 
        this.getSession().setAttribute("_USER_INFO_USER_INFO_", user); 
        this.getSession().setAttribute("_USER_INFO_USER_ID_", user.getId()); 
        
        //设置cookie 
        HttpSession session = request.getSession();
		session.setAttribute("sms_loginData", user);
        result = RetAjaxFlags.onSuccess(null);
        
        return "ajax"; 
      } 
    } 
	/**
	 * @return
	 */
	public String toFirstPage(){
		System.out.println("toFirstPage;");
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("_USER_INFO_USER_INFO_");
		if(user==null){ 
			this.addActionMessage("登陆失效");
			return "login";
		}else {
			return SUCCESS;
		}

	}
    /** 
     */ 
    public String loginout() { 
      this.getSession().invalidate(); 
      return Action.SUCCESS; 
    } 

    public HttpSession getSession() { 
      return ServletActionContext.getRequest().getSession(); 
    } 
   
    public HttpServletRequest getRequest() { 
      return ServletActionContext.getRequest(); 
    } 
   
    public HttpServletResponse getResponse() { 
      return ServletActionContext.getResponse(); 
    } 
    public String getMsg() { 
        return msg; 
      } 
     
      public void setMsg(String msg) { 
        this.msg = msg; 
      } 

     
      public String getPassword() { 
        return password; 
      } 
     
      public void setPassword(String password) { 
        this.password = password; 
      }

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	} 

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
	}
	public RetAjaxFlags getResult() {
		return result;
	}
	public void setResult(RetAjaxFlags result) {
		this.result = result;
	}
  }