package com.hk.sms.utils;


import java.util.List;

public class PageSplit {

	// 页面参数
	private String p_page = "1";
	private String p_size = "25";
	private String p_sort = "asc";

	/************ 以下是计算使用 ********/
	// 每页显示条数 默认数值
	private int size = 15;
	// 当前页数
	private int page = 1;
	// 总页数
	private int totalPage = 1;
	// 总记录数
	private int totalCnt = 1;
	// 分页列表数据
	private List<Object> list;
	// 开始位置
	private int start = 0;
	// 结束位置
	private int end = 0;

	/**
	 * 默认构造方法
	 */
	public PageSplit() {

	}

	/**
	 * 该方法是计算分页使用<br>
	 * 注意：调用此方法之前，必须设定 请求的页数，每页条数，总记录数，排序方式
	 */
	public void build() {
		// 页数
		page = Integer.parseInt(p_page);
		// 页数不能小于1
		page = page < 1 ? 1 : page;
		// 每页行数
		if (p_size == null || "".equals(p_size.trim())) {
			// 默认行数
			p_size = String.valueOf(size);
		}
		// 转换为数字
		size = Integer.parseInt(p_size);
		// 计算总页数
		totalPage = this.totalCnt % size == 0 ? totalCnt / size : totalCnt
				/ size + 1;
		// 当前页数不能大于总页数
		page = page > totalPage ? totalPage : page;
		if (page < 1) {
			page = 1;
		}
		// 计算开始位置
		start = (page - 1) * size;
		// 计算结束位置
		end = start + size;
		
	}

	public List<Object> getList() {
		return list;
	}

	@SuppressWarnings("unchecked")
	public void setList(List list) {
		this.list = list;
	}

	public String getP_page() {
		return p_page;
	}

	public void setP_page(String p_page) {
		this.p_page = p_page;
	}

	public String getP_size() {
		return p_size;
	}

	public void setP_size(String p_size) {
		this.p_size = p_size;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getTotalCnt() {
		return totalCnt;
	}

	public void setTotalCnt(int totalCnt) {
		this.totalCnt = totalCnt;
	}

	public int getPage() {
		return page;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public int getSize() {
		return size;
	}

	public int getStart() {
		return start;
	}

	public int getEnd() {
		return end>0?end:200000;
	}

	public void setEnd(int end) {
		this.end = end;
	}

	public String getP_sort() {
		return p_sort;
	}

	public void setP_sort(String p_sort) {
		this.p_sort = p_sort;
	}

	/**
	 * 构造分页对象，构造对象后，根据size和start <br>
	 * 调用service方法查询数据，调用setList()方法，<br>
	 * 将查询结果存入分页对象
	 * 
	 * @param p_page
	 *            当前页
	 * @param p_size
	 *            每页显示条数
	 * @param sort_type
	 *            排序方式
	 * @param count
	 *            总记录数
	 */
	public PageSplit(String p_page, String p_size, String p_sort, int count) {
		// 设置默认页
		if (p_page == null || "".equals(p_page.trim())) {
			p_page = "1";
		}
		// 设置默认排序方式
		if (p_sort == null) {
			p_sort = "asc";
		}

		// 排序方式
		this.p_sort = p_sort;
		// 页数
		page = Integer.parseInt(p_page);
		// 页数不能小于1
		page = page < 1 ? 1 : page;
		// 每页行数
		if (p_size == null || "".equals(p_size.trim())) {
			// 默认行数
			p_size = String.valueOf(size);
		}
		// 转换为数字
		size = Integer.parseInt(p_size);
		// 计算总页数
		totalPage = count % size == 0 ? count / size : count / size + 1;
		// 当前页数不能大于总页数
		page = page > totalPage ? totalPage : page;
		if (page < 1) {
			page = 1;
		}
		// 总记录数
		totalCnt = count;
		// 计算开始位置
		start = (page - 1) * size;
		// 计算结束位置
		end = start + size;
	}

}

