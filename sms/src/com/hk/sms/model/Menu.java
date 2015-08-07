package com.hk.sms.model;

public class Menu {  
    private String tid;  
    private String text;  
    private boolean leaf;  
    private String parentId;  
  
    public String getTid() {  
        return tid;  
    }  
  
    public void setTid(String tid) {  
        this.tid = tid;  
    }  
  
    public String getText() {  
        return text;  
    }  
  
    public void setText(String text) {  
        this.text = text;  
    }  
  
    public boolean isLeaf() {  
        return leaf;  
    }  
  
    public void setLeaf(boolean leaf) {  
        this.leaf = leaf;  
    }  
  
    public String getParentId() {  
        return parentId;  
    }  
  
    public void setParentId(String parentId) {  
        this.parentId = parentId;  
    }  
  
    @Override  
    public String toString() {  
        return "Menu [tid=" + tid + ", text=" + text + ", leaf=" + leaf  
                + ", parentId=" + parentId + "]";  
    }  
  
}  