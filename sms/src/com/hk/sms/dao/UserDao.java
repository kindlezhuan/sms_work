package com.hk.sms.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.hk.sms.model.Menu;
import com.hk.sms.model.User;
import com.hk.sms.model.UserLXR;
import com.hk.sms.model.UserLXRGroup;

public interface UserDao {    
    
    public User getUserByName(String name);    
    @SuppressWarnings("rawtypes")
	public HashMap getAllUser();
    
    @SuppressWarnings("rawtypes")
	public User getaUser(Map param);
    public User getUser(String loginName,String passWord);
    
    @SuppressWarnings("rawtypes")
	public int queryuserCount(Map param);
    @SuppressWarnings("rawtypes")
	public List<Map> queryuser(Map param);
    
    public int addPageUser(User user);
    @SuppressWarnings("rawtypes")
	public int deleteUser(Map param);
    
    public int updateUser(User user);
    
    @SuppressWarnings("rawtypes")
	public List<Menu> getTreeMenu(Map param);
    //查询联系人
    @SuppressWarnings("rawtypes")
	public int queryLuserCount(Map param);
    @SuppressWarnings("rawtypes")
	public List<Map> queryLuser(Map param);
    /**
     * 获得分组数据
     * @param param
     * @return
     */
    @SuppressWarnings("rawtypes")
	public List<Map> getFenzuData(Map param);
    /**
     * 插入新的联系组并返回g_ID
     * @param param
     * @return
     */
    public int insertLXRGroup(UserLXRGroup lxrGroup);
    /**
     * 插入联系人到联系组
     * @param param
     * @return
     */
    @SuppressWarnings("rawtypes")
	public int insertLXRtoGroup(Map param);
    /**
     * 插入一个联系人
     * @param param
     * @return
     */
    public int insertLXR(UserLXR userLXR);
    /**
     * 删除一个联系人
     * @param param
     * @return
     */
    @SuppressWarnings("rawtypes")
	public int deleteLXR(Map param);
    /**
     * 删除一个联系组
     * @param param
     * @return
     */
    @SuppressWarnings("rawtypes")
	public int deleteLXRGroup(Map param);
} 