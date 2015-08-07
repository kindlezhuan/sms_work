package com.hk.sms.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.hk.sms.constant.RetAjaxFlags;
import com.hk.sms.dao.UserDao;
import com.hk.sms.model.Menu;
import com.hk.sms.model.ResultMessage;
import com.hk.sms.model.SMSLog;
import com.hk.sms.model.User;
import com.hk.sms.model.UserLXR;
import com.hk.sms.model.UserLXRGroup;
import com.hk.sms.smsdo.SMSInfoprocess;
import com.hk.sms.utils.DateFormate;
import com.hk.sms.utils.JsonUtils;
import com.hk.sms.utils.MD5Tool;
import com.hk.sms.utils.PageSplit;
import com.hk.sms.utils.TypeAndStatusConstant;
import com.hk.sms.utils.UserInfo;
import com.opensymphony.xwork2.ActionContext;

public class UserManagerAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(UserManagerAction.class);
	
	private RetAjaxFlags result;
	private String page;

	private String start;

	private String limit;
	
	private String p1Dto;
	
	private UserDao userDao;
	   
	private PageSplit split;
	
	private List<Menu> menuList;
	
	private String tid;
	
	public String toAdreesBook() {
		System.out.println("toAdreesBook");
		page = "adressBook";
		return SUCCESS;
	}
	public String toPageusermanager() {
		System.out.println("toPageusermanager");
		page = "pageUserManager";
		return SUCCESS;
	}
	public String toAddLXRGroup(){
		System.out.println("toAddLXRGroup");
		page = "sms_addressBook_addGroup";
		return SUCCESS;
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getAllPageUser(){

		System.out.println("TO getAllPageUser");
		ActionContext ctx = ActionContext.getContext();
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("html/text;charset=utf-8");
		HttpServletRequest request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		User user = (User) session.getAttribute("sms_loginData");
		if(user == null)
			result = RetAjaxFlags.onLoseLoginData();
		else{
				try{
					splitInit();
					Map param = new HashMap();
					param.put("beginTime",
							StringUtils.isNotEmpty(request.getParameter("beginTime")) ? request
									.getParameter("beginTime") : null);
					param.put("endTime", StringUtils.isNotEmpty(request
							.getParameter("endTime")) ? request.getParameter("endTime")
							: null);
					param.put("userName", StringUtils.isNotEmpty(request
							.getParameter("userName")) ? request.getParameter("userName")
							: null);
					param.put("p_c",'1');
//					int totalCount = this.service.queryYjyasbsCount(param);
					int totalCount = userDao.queryuserCount(param);
					split.setTotalCnt(totalCount);
					split.setP_page(page);
					split.build();
					param.put("start", split.getStart() + "");
					param.put("end", split.getEnd() + "");
					List<Map> userList = userDao.queryuser(param);
					result = RetAjaxFlags.toJSONGridPanel(userList, totalCount);
				}
				catch (Exception e) {
					log.error("getAllPageUserAction ########    "+e);
					result = RetAjaxFlags.onDbError();
					//e.printStackTrace();
				}
			}
			
		return "ajax";
	
	}
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String addPageUser(){

		System.out.println("TO addPageUser");
		ActionContext ctx = ActionContext.getContext();
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("html/text;charset=utf-8");
		HttpServletRequest request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		User user = (User) session.getAttribute("sms_loginData");
		if(user == null)
			result = RetAjaxFlags.onLoseLoginData();
		else{		
			if (p1Dto == null) {
			result = RetAjaxFlags.onOthersError();
			result.setMsg("数据没有成功获取");
			} else {
				try{
					User user_add = JsonUtils.toBean(p1Dto,User.class);
					if(user_add != null && user_add.getName()!=null && user_add.getPwd() != null  && !user_add.getName().isEmpty() && !user_add.getPwd().isEmpty()){
						System.out.println(!user_add.getName().isEmpty());
						System.out.println(!user_add.getName().isEmpty());
						Map param = new HashMap();
						param.put("userName1",user_add.getName());
						int totalCount = userDao.queryuserCount(param);
						if(totalCount ==0){
							user_add.setP_c(1);//设置为page用户
							user_add.setZt(1);//设置状态为可用
							int kin = userDao.addPageUser(user_add);
							if(kin == 1)
								result = RetAjaxFlags.onSuccess(null);
							else
								result = RetAjaxFlags.onOthersError();
						}else{
							result = RetAjaxFlags.onOthersError();
							result.setMsg("此用户名已存在");
						}
					}else{
						result = RetAjaxFlags.onOthersError();
						result.setMsg("用户名密码不能为空");
					}
				}
				catch (Exception e) {
					log.error("addPageUser ########    "+e);
					result = RetAjaxFlags.onDbError();
				}
			}
	}
			
		return "ajax";
	
	}
	@SuppressWarnings({ "rawtypes", "unused" })
	public String addClientUser(){

		System.out.println("TO addClientUser");
		ActionContext ctx = ActionContext.getContext();
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("html/text;charset=utf-8");
		HttpServletRequest request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		User user = (User) session.getAttribute("sms_loginData");
		if(user == null)
			result = RetAjaxFlags.onLoseLoginData();
		else{		
			if (p1Dto == null) {
			result = RetAjaxFlags.onOthersError();
			result.setMsg("数据没有成功获取");
			} else {
				try{
					User user_add = JsonUtils.toBean(p1Dto,User.class);
					if(user_add != null && user_add.getName()!=null && user_add.getPwd() != null){
						HashMap info = (HashMap) UserInfo.USERINFO.get(user.getName());
						
						if(info !=null){
							user_add.setP_c(2);//设置为Client用户
							user_add.setZt(1);//设置状态为可用
							int kin = userDao.addPageUser(user_add);
							if(kin == 1)
								result = RetAjaxFlags.onSuccess("添加成功");
							else
								result = RetAjaxFlags.onOthersError();
						}else{
							result = RetAjaxFlags.onOthersError();
							result.setMsg("此用户名已存在");
						}
					}else{
						result = RetAjaxFlags.onOthersError();
					}
				}
				catch (Exception e) {
					log.error("addClientUser ########    "+e);
					result = RetAjaxFlags.onDbError();
				}
			}
	}
			
		return "ajax";
	
	}
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String deleteUser(){
		System.out.println("TO deleteUser");
		ActionContext ctx = ActionContext.getContext();
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("html/text;charset=utf-8");
		HttpServletRequest request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		User user = (User) session.getAttribute("sms_loginData");
		if(user == null)
			result = RetAjaxFlags.onLoseLoginData();
		else{
			int userid = Integer.parseInt(request.getParameter("user_id"));
			
			Map param = new HashMap();
			param.put("userid", userid);
			int kin = userDao.deleteUser(param);
			if(kin == 1)
				result = RetAjaxFlags.onSuccess("删除成功");
			else
				result = RetAjaxFlags.onOthersError();
			
		}
		return "ajax";
	}
	public String updateUser(){
		System.out.println("TO deleteUser");
		ActionContext ctx = ActionContext.getContext();
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("html/text;charset=utf-8");
		HttpServletRequest request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		User user = (User) session.getAttribute("sms_loginData");
		if(user == null)
			result = RetAjaxFlags.onLoseLoginData();
		else{
			User user_update = JsonUtils.toBean(p1Dto,User.class);
			int kin = userDao.updateUser(user_update);
			if(kin == 1)
				result = RetAjaxFlags.onSuccess("修改成功");
			else
				result = RetAjaxFlags.onOthersError();
			
		}
		return "ajax";
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getTreeParent(){
		System.out.println("TO getTreeParent");
		ActionContext ctx = ActionContext.getContext();
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("html/text;charset=utf-8");
		HttpServletRequest request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		User user = (User) session.getAttribute("sms_loginData");
		System.out.println("Enter into gteTRee");
		if(user == null)
			result = RetAjaxFlags.onLoseLoginData();
		else{
//			menuList = userDao
			List<Menu> menuList = new ArrayList<Menu>() ;
			Map param = new HashMap();
			param.put("t_id", tid);
			param.put("uid", user.getId());
			menuList = userDao.getTreeMenu(param);
				result = RetAjaxFlags.onSuccess(menuList);
		}
		return "ajax";
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getLUser(){


		System.out.println("TO getLUser");
		ActionContext ctx = ActionContext.getContext();
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("html/text;charset=utf-8");
		HttpServletRequest request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		User user = (User) session.getAttribute("sms_loginData");
		if(user == null)
			result = RetAjaxFlags.onLoseLoginData();
		else{
				try{
					splitInit();
					Map param = new HashMap();
					param.put("LName",
							StringUtils.isNotEmpty(request.getParameter("LName")) ? request
									.getParameter("LName") : null);
					param.put("LPhone", StringUtils.isNotEmpty(request
							.getParameter("LPhone")) ? request.getParameter("LPhone")
							: null);
					param.put("Gid", StringUtils.isNotEmpty(request
							.getParameter("Gid")) ? request.getParameter("Gid")
							: null);
					param.put("uid", user.getId());
					int totalCount = userDao.queryLuserCount(param);
					split.setTotalCnt(totalCount);
					split.setP_page(page);
					split.build();
					param.put("start", split.getStart() + "");
					param.put("end", split.getEnd() + "");
					List<Map> LuserList = userDao.queryLuser(param);
					result = RetAjaxFlags.toJSONGridPanel(LuserList, totalCount);
				}
				catch (Exception e) {
					log.error("getLUser 联系人 ########    "+e);
					result = RetAjaxFlags.onDbError();
					//e.printStackTrace();
				}
			}
			
		return "ajax";
	
	
	}
	/**
	 * 获得分组数据
	 */
	@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
	public String getFenzuData(){

		System.out.println("TO getFenzuData");
		ActionContext ctx = ActionContext.getContext();
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("html/text;charset=utf-8");
		HttpServletRequest request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		User user = (User) session.getAttribute("sms_loginData");
		if(user == null)
			result = RetAjaxFlags.onLoseLoginData();
		else{
			try {
				List<Map> fenzuList = new ArrayList<Map>() ;
				Map param = new HashMap();
				param.put("uid", user.getId());
				fenzuList = userDao.getFenzuData(param);
				result = RetAjaxFlags.onSuccess(fenzuList);
				
			} catch (Exception e) {
				result = RetAjaxFlags.onOthersError();
			}
		}
		return "ajax";
	
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String addUserGroup(){
		System.out.println("TO addUserGroup");
		ActionContext ctx = ActionContext.getContext();
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("html/text;charset=utf-8");
		HttpServletRequest request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		User user = (User) session.getAttribute("sms_loginData");
		if(user == null)
			result = RetAjaxFlags.onLoseLoginData();
		else{		
			if (p1Dto == null) {
			result = RetAjaxFlags.onOthersError();
			result.setMsg("数据没有成功获取");
			} else {
				try{
					String Gname = StringUtils.isNotEmpty(request.getParameter("groupName")) ? request
							.getParameter("groupName") : null;
					String[] idArray = p1Dto.split("@");
					
					if(Gname != null && Gname != ""){
						//添加联系组并返回g_id
						UserLXRGroup lxrGroup = new UserLXRGroup();
						lxrGroup.setGroup_name(Gname);
						lxrGroup.setParentId(5);
						lxrGroup.setLeaf(1);
						lxrGroup.setUser_id(user.getId());

						int success_id = userDao.insertLXRGroup(lxrGroup);
						System.out.println("ID:"+lxrGroup.getG_id());
						if(	success_id == 1){
							
							for(int i=0;i<idArray.length;i++){
								Map param = new HashMap();
								param.put("g_id", lxrGroup.getG_id());
								param.put("l_id", idArray[i]);
								userDao.insertLXRtoGroup(param);
							}
						}
						result = RetAjaxFlags.onSuccess("添加成功");
					}else
						result = RetAjaxFlags.onNoResultError();
					
					
				}
				catch (Exception e) {
					log.error("addUserGroup ########    "+e);
					result = RetAjaxFlags.onDbError();
				}
			}
	}
			
		return "ajax";
	
	
	}
	//添加一个联系人
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String addLXR(){
		System.out.println("TO addLXR");
		ActionContext ctx = ActionContext.getContext();
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("html/text;charset=utf-8");
		HttpServletRequest request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		User user = (User) session.getAttribute("sms_loginData");
		if(user == null)
			result = RetAjaxFlags.onLoseLoginData();
		else{		
			if (p1Dto == null) {
			result = RetAjaxFlags.onOthersError();
			result.setMsg("数据没有成功获取");
			} else {
				try{
					UserLXR lxr_add = JsonUtils.toBean(p1Dto,UserLXR.class);
					String gidArray = StringUtils.isNotEmpty(request.getParameter("L_group")) ? request
							.getParameter("L_group") : null;
					lxr_add.setLuid(user.getId());
					String[] idArray = null;
					int success_do = userDao.insertLXR(lxr_add);
					System.out.println("LID:"+lxr_add.getL_id());
					if(success_do == 1 &&  gidArray != null && gidArray != ""){
						idArray = gidArray.split(",");
						for(int i=0;i<idArray.length;i++){
							if(idArray[i]!= null && idArray[i] != ""){
								Map param = new HashMap();
								param.put("g_id", idArray[i]);
								param.put("l_id", lxr_add.getL_id());
								userDao.insertLXRtoGroup(param);
							}
						}
					}
					result = RetAjaxFlags.onSuccess("添加成功");
					
				}
				catch (Exception e) {
					log.error("addLXR ########    "+e);
					result = RetAjaxFlags.onDbError();
				}
			}
	}
			
		return "ajax";
	
	
	}
	//删除一个联系人
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String deleteLXR(){
		System.out.println("TO deleteLXR");
		ActionContext ctx = ActionContext.getContext();
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("html/text;charset=utf-8");
		HttpServletRequest request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		User user = (User) session.getAttribute("sms_loginData");
		if(user == null)
			result = RetAjaxFlags.onLoseLoginData();
		else{if (p1Dto == null) {
			result = RetAjaxFlags.onOthersError();
			result.setMsg("数据没有成功获取");
			} else {
				try{
					String[] idArray = p1Dto.split("@");
						for(int i = 0;i<idArray.length;i++){
							String L_id = idArray[i];
							if(L_id != null && L_id != ""){
								
								Map param = new HashMap();
								param.put("L_id", L_id);
								userDao.deleteLXR(param);
							}
							result = RetAjaxFlags.onSuccess("删除成功");
						}
							
				}
				catch (Exception e) {//怎样抛出运行时异常 来回滚数据
					log.error("deleteLXR ########    "+e);
					result = RetAjaxFlags.onDbError();
				}
				
			}
		}
		return "ajax";
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String deleteLXRGroup(){
		System.out.println("TO deleteLXRGroup");
		ActionContext ctx = ActionContext.getContext();
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("html/text;charset=utf-8");
		HttpServletRequest request = (HttpServletRequest) ctx
				.get(ServletActionContext.HTTP_REQUEST);
		User user = (User) session.getAttribute("sms_loginData");
		if(user == null)
			result = RetAjaxFlags.onLoseLoginData();
	   else {
				try{
							String G_id = StringUtils.isNotEmpty(request.getParameter("G_id")) ? request
									.getParameter("G_id") : null;
							Map param = new HashMap();
							param.put("G_id", G_id);
							userDao.deleteLXRGroup(param);
							result = RetAjaxFlags.onSuccess("删除成功");
				}
				catch (Exception e) {//怎样抛出运行时异常 来回滚数据
					log.error("deleteLXRGroup ########    "+e);
					result = RetAjaxFlags.onDbError();
				}
				
		}
		return "ajax";
	
		
	}
	//setter and getter
	public RetAjaxFlags getResult() {
		return result;
	}

	public void setResult(RetAjaxFlags result) {
		this.result = result;
	}

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
	public UserDao getUserDao() {
		return userDao;
	}
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}
	public String getP1Dto() {
		return p1Dto;
	}
	public void setP1Dto(String p1Dto) {
		this.p1Dto = p1Dto;
	}
	public List<Menu> getMenuList() {
		return menuList;
	}
	public void setMenuList(List<Menu> menuList) {
		this.menuList = menuList;
	}
	public String getTid() {
		return tid;
	}
	public void setTid(String tid) {
		this.tid = tid;
	}

}
