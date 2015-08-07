package com.hk.sms.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import com.hk.sms.dao.UserDao;
import com.hk.sms.model.Menu;
import com.hk.sms.model.User;
import com.hk.sms.model.UserLXR;
import com.hk.sms.model.UserLXRGroup;

@Repository(value = "userDao")    
public class UserDaoImpl extends SqlSessionDaoSupport implements UserDao {    
    
    @Override    
    public User getUserByName(String name) {    
    
        User user = new User();    
    
        user = getSqlSession().selectOne("UserMapper.getUserByName", name);
    
//        User oneUser = new User();    
//        oneUser.setId(Long.parseLong("6"));    
//        oneUser.setName("go07");    
//        oneUser.setPwd("pesd07");    
//        oneUser.setAge(Long.parseLong("25"));    
//        oneUser.setSex(Long.parseLong("1"));    
//        int result = getSqlSession().insert("UserMapper.insertUser",oneUser);
//        System.out.println("insert result:"+result);    
            
    
        return user;    
    }

	@SuppressWarnings("rawtypes")
	@Override
	public HashMap getAllUser() {
		HashMap listuser =  (HashMap) getSqlSession().selectMap("UserMapper.getAllUser", "name");
		
		System.out.println(listuser);
		return listuser;
	}

	@Override
	public User getUser(String loginName, String passWord) {
		User user = new User();    
	    HashMap<String,String> param = new HashMap<String, String>();
	    param.put("name", loginName);
	    param.put("pwd", passWord);
        user = getSqlSession().selectOne("UserMapper.getUser", param);
		return user;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public int queryuserCount(Map param) {
		int count = getSqlSession().selectOne("UserMapper.queryuserCount",param);
		return count;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public List<Map> queryuser(Map param) {
		List<Map> userMap =  getSqlSession().selectList("UserMapper.queryuser", param);
		return userMap;
	}

	@Override
	public int addPageUser(User user) {
		int resullt = getSqlSession().insert("UserMapper.addPageUser", user);
		return resullt;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public int deleteUser(Map param) {
		int result = getSqlSession().update("UserMapper.deleteUser", param);
		return result;
	}

	@Override
	public int updateUser(User user) {
		int result = getSqlSession().update("UserMapper.updateUser", user);
		return result;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public User getaUser(Map param) {
		User user = getSqlSession().selectOne("UserMapper.getaUser", param);
		return user;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public List<Menu> getTreeMenu(Map param) {
		 List<Menu> menu = getSqlSession().selectList("UserMapper.getTreeMenu", param);
		return menu;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public int queryLuserCount(Map param) {
		int result = getSqlSession().selectOne("UserMapper.queryLusercount", param);
		return result;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public List<Map> queryLuser(Map param) {
		List<Map> LuserMap =  getSqlSession().selectList("UserMapper.queryLuser", param);
		return LuserMap;
	}

	/**
	 * 获得分组数据
	 */
	@SuppressWarnings("rawtypes")
	@Override
	public List<Map> getFenzuData(Map param) {
		List<Map> LuserMap =  getSqlSession().selectList("UserMapper.getFenzuData", param);
		return LuserMap;
	}
    /**
     * 插入新的联系组并返回g_ID
     * @param param
     * @return
     */
	@Override
	public int insertLXRGroup(UserLXRGroup lxrGroup) {
		int id = getSqlSession().insert("UserMapper.insertLXRGroup", lxrGroup);
		return id;
	}
    /**
     * 插入联系人到联系组
     * @param param
     * @return
     */
	@SuppressWarnings("rawtypes")
	@Override
	public int insertLXRtoGroup(Map param) {
		int success_id = getSqlSession().insert("UserMapper.insertLXRtoGroup", param);
		return success_id;
	}
	/**
	 * 删除一个联系人
	 */
	@SuppressWarnings("rawtypes")
	@Override
	public int deleteLXR(Map param) {
		int success_do = getSqlSession().delete("UserMapper.deleteLXR", param);
		return success_do;
	}
	/**
	 * 添加一个联系人
	 */
	@Override
	public int insertLXR(UserLXR userLXR) {
		int success_do = getSqlSession().insert("UserMapper.addLXR", userLXR);
		return success_do;
	}
    /**
     * 删除一个联系组
     * @param param
     * @return
     */
	@SuppressWarnings("rawtypes")
	@Override
	public int deleteLXRGroup(Map param) {
		int success_do = getSqlSession().insert("UserMapper.deleteLXRGroup", param);
		return success_do;
	}    
    
}   