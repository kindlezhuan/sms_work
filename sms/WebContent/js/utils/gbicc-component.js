
// 起始粘贴的行和列，对应一个单元格
var startPasteRow = 0;
var startPasteCol = 0;

var form_abelSeparator = ':';

var form_anchor = '90%';
var form_textfield_width = 190;
var form_numberField_width = 190;
var form_comboBox_width = 190;
var form_dateField_width = 190;
var form_textArea_width = 190;
var PAGE_NUM_DEFAULT = 20;
var TIME_OUT = 120000; //由于extjs默认请求超时时间为30秒，现设置2分钟

var gbicc = {
	component:{
		//刷新当前页面
		refreshPage: function () {
		    window.location.reload();
		},
		/** 
		* 验证文本域最大字符长度
		* @param maxLength
		* @return function()
		*/
		maxTextLength: function (maxLength) {
		    return constrainTextLength(0, maxLength);
		},
		/** 
		* 验证文本域最大字符长度，同时不能为空
		* @param maxLength
		* @return function()
		*/
		maxTextLengthNotBlank: function (maxLength) {
		    return constrainTextLength(1, maxLength);
		},
		/** 
		* 验证文本域字符长度限制
		* @param minLength 最小值
		* @param maxLength 最大值
		* @return function()
		*/
		constrainTextLength: function (minLength, maxLength) {
		    return function () {
		        //中文按两个字符处理
		        var tempLength = this.getValue().replace(/[^\x00-\xff]/g, "**").length;
		        if (tempLength < minLength || tempLength > maxLength) {
		            return false;
		        }
		        return true;
		    };
		},
		/**
		* 定义页面头部的toolbar
		* 
		* @param {barDiv}
		*            显示toolbar的Div
		* @param {title}
		*            toolbar上的标题的内容
		* @return {Ext.Toolbar} 返回一个创建好的toolbar
		*/
		createTopToolBar: function (barDiv, title) {
		    var _top_tb = new Ext.Toolbar({
		        cls: 'x-toolbar_title',
		        height: 26
		    });
		    //_top_tb.addText(title);
		    //_top_tb.add(new Ext.Toolbar.Fill());
		    _top_tb.add({
		        text: '刷新',
		        border: false,
		        iconCls: 'fresh',
		        handler: gbicc.component.refreshPage
		    });
		    return _top_tb;
		},
		/**
		* 定义Grid头部的toolbar
		* 
		* @param {barDiv}
		*            显示toolbar的Div
		* @param {title}
		*            toolbar上的标题的内容
		* @return {Ext.Toolbar} 返回一个创建好的toolbar
		*/
		createGridToolBar: function (grid, buttons) {
		    var tb = grid.down('toolbar');
		    for (var i = 0; i < buttons.length; i++) {
		        tb.add(buttons[i]);
		    }
		    return tb;
		},
		/**
		* 定义Grid底部分页的PagingToolbar
		* 
		* @param {ds}
		*            Ext.data.Store对象
		* @return {Ext.PagingToolbar} 返回一个创建好的PagingToolbar
		*/
		createPageToolBar: function (ds, hasBbar) {
		    var _page_tb = null;
		    if (hasBbar != null && hasBbar == true) {
		        _page_tb = new Ext.PagingToolbar({
		            store: ds,
		            pageSize: PAGE_NUM_DEFAULT,
		            displayInfo: true,
		            displayMsg: '记录:{0} - {1} / 共{2}条',
		            emptyMsg: "没有数据",
		            items: ['-']
		        });
		    }
		    return _page_tb;
		},	
		button:{
			/**
			* 按钮-->显示窗口按钮，toolbar上的按钮，一般不涉及业务逻辑
			* 
			* @param {buttonText}
			*            按钮上显示的标签(如: '查询')
			* @param {windowObj}
			*            点击按钮后,弹出的窗口对象(Ext.Window)
			* @param {id}
			*            按钮的id
			* @return {Ext.Button} 返回一个按钮对象
			*/
			createTBarButton: function (buttonText, windowObj, id) {
			    var buttonId = id == null ? buttonText : id;
			    var button = new Ext.Button({
			        id: buttonId,
			        text: buttonText,
			        handler: function () {
			            windowObj.show(buttonId);
			        }
			    });
			    return button;
			},
			/**
			* 按钮-->显示修改窗口按钮,点击按钮后,弹出窗口,显示修改信息
			* 
			* @param {buttonText}
			*            按钮上显示的标签(如: '修改')
			* @param {windowObj}
			*            点击按钮后,弹出的修改窗口对象(Ext.Window)
			* @param {grid}
			*            Grid对象
			* @param {beforeWinShowEvent}
			*            (optional) 在窗口显示前触发的事件
			* @param {afterWinShowEvent}
			*            (optional)
			*            在窗口显示后触发的事件，执行此事件，则beforeFormLoadEvent和afterFormLoadEvent不会执行
			* @param {beforeFormLoadEvent}
			*            (optional) 表单加载数据前触发的事件
			* @param {afterFormLoadEvent}
			*            (optional) 表单加载数据后触发的事件
			* @param {id}
			*            (optional) 按钮的id，为空的话使用Ext.id()
			* @return {Ext.Button} 返回一个修改按钮
			*/
			createTBarUpdateButton: function (buttonText, windowObj,
					grid, beforeWinShowEvent, afterWinShowEvent, beforeFormLoadEvent,
					afterFormLoadEvent, id) {
			    var buttonId = id || Ext.id();
			    var button = new Ext.Button({
			        id: buttonId,
			        text: buttonText,
			        handler: function () {
			            var sl = grid.getSelectionModel().getSelections();
			            // 显示窗口前
			            if (beforeWinShowEvent != null
								&& typeof beforeWinShowEvent == 'function') {
			                beforeWinShowEvent();
			            } else {
			                if (sl.length == 0) {
			                    Ext.MessageBox.alert("提示", "请选择希望修改的记录！");
			                    return;
			                } else if (sl.length != 1) {
			                    Ext.MessageBox.alert("提示", "只允许选择单行记录进行修改！");
			                    grid.getSelectionModel().clearSelections();
			                    return;
			                }
			            }
			            windowObj.show(buttonId);
			            // 显示窗口后
			            if (afterWinShowEvent != null
								&& typeof afterWinShowEvent == 'function') {
			                afterWinShowEvent(sl[0]);
			            } else {
			                // Form加载数据前
			                if (beforeFormLoadEvent != null
									&& typeof beforeFormLoadEvent == 'function') {
			                    beforeFormLoadEvent(sl[0]);
			                }
			                windowObj.findByType("form")[0].getForm().loadRecord(sl[0]);
			                // Form加载数据后
			                if (afterFormLoadEvent != null
									&& typeof afterFormLoadEvent == 'function') {
			                    afterFormLoadEvent(sl[0]);
			                }
			            }
			        }
			    });
			    return button;
			},
			/**
			* 按钮-->刷新grid
			*
			*/
			createTBarRefreshButton: function (grid) {
			    var button = new Ext.Button({
			        text: '刷新',
			        border: false,
			        handler: function () {
			            grid.getStore().reload();
			        }
			    });
			    return button;
			},
			/**
			* 按钮-->删除一条或多条记录按钮
			* 
			* @param {buttonText}
			*            按钮上显示的标签(如: '修改')
			* @param {windowObj}
			*            点击按钮后,弹出的修改窗口对象(Ext.Window)
			* @param {grid}
			*            Grid对象
			* @param {url}
			*            删除的路径 (如：deleteDo.latentClient)
			* @param {idName}
			*            记录的id名称,后台通过此属性对应的值删除对应的对象 (如：'idStr')
			* @param {beforeDeleteDoEvent}
			*            (optional) 在删除之前触发的事件,函数要有返回值true/false，true继续执行删除操作，false不执行删除操作
			* @return {Ext.Button} 返回一个修改按钮
			*/
			createTBarDeleteButton: function (buttonText, grid, url,
					idName, beforeDeleteDoEvent, afterDeleteDoEvent) {
			    var button = new Ext.Button(
				{
				    text: buttonText,
				    handler: function () {
				        var sl = grid.getSelectionModel().getSelections();
				        var ids = "";
				        if (sl.length == 0) {
				            Ext.MessageBox.alert("提示", "请选择需要删除的记录！");
				            return;
				        } else {
				            var isDel = true;
				            // 删除数据前
				            if (beforeDeleteDoEvent != null
									&& typeof beforeDeleteDoEvent == 'function') {
				                isDel = beforeDeleteDoEvent(sl);
				            }
				            if (!isDel) {
				                return;
				            } else {
				                for (var i = 0; i < sl.length; i++) {
				                    ids += sl[i].data[idName];
				                    if (i != (sl.length - 1)) {
				                        ids += ",";
				                    }
				                }
				                // 根据多个id删除记录
				                function deleteDo(ids, url) {
				                    var comfirm = Ext.MessageBox.confirm(
									"提醒",
									"确认要删除记录吗？",
									function (btn) {
									    if (btn == "yes") {
									        Ext.Ajax.request({
									            url: url,
									            params: {
									                ids: ids
									            },
									            success: function (result, request) {
									                Ext.Msg.alert('操作',
													Ext.util.JSON.decode(result.responseText).data,
													function (btn) {
													    if (btn == 'ok') {
													        // 删除数据后触发的事件
													        if (afterDeleteDoEvent != null
																	&& typeof afterDeleteDoEvent == 'function') {
													            afterDeleteDoEvent();
													        } else {
													            grid.getStore().reload();
													        }
													    }
													});
									            },
									            failure: function (result, request) {
									                Ext.Msg.alert('操作', Ext.util.JSON.decode(result.responseText).data);
									            }
									        });
									    }
									});
				                }
				                deleteDo(ids, url);
				            }
				        }
				    }
				});
			    return button;
			},
			/**
			* 按钮，具有粘贴表格事件的按钮
			* 
			* @param {edit_grid}
			*            Ext.grid.EditorGridPanel对象
			* @param {dataIndexArray}
			*            (Array) 数组（包括多个对象，每个对象的属性包括：type：列的类型；dataIndex: 列的名称。）
			*            其中：type的类型可为："number"(数字类型)/"percent"(百分比类型) dataIndexArray的例子： [
			*            {type:"",dataIndex:"bgqmjjzczhqkXiangMu"},
			*            {type:"number",dataIndex:"bgqmjjzczhqkShiZhi"},
			*            {type:"percent",dataIndex:"bgqmjjzczhqkZhanJiJinZiChanZongZhiBiZhong"} ]
			* @param {id}
			*            按钮的id
			* @return 返回一个具有粘贴表格事件的按钮
			*/
			createTBarPasteButton: function (btnText, edit_grid,
					initPlant, dataIndexArray, id) {
			    edit_grid = eval(edit_grid);
			    var btn = new Ext.Button({
			        text: btnText,
			        handler: gbicc.component.handler.pasteHandler(edit_grid, initPlant,
							dataIndexArray)
			    });
			    if (id != null) {
			        btn.id = id;
			    }
			    return btn;
			},
			/**
			* 按钮-->删除一条或多条记录按钮
			* 
			* @param {buttonText}
			*            按钮上显示的标签(如: '修改')
			* @param {windowObj}
			*            点击按钮后,弹出的修改窗口对象(Ext.Window)
			* @param {grid}
			*            Grid对象
			* @param {url}
			*            删除的路径 (如：deleteDo.latentClient)
			* @param {idName}
			*            记录的id名称,后台通过此属性对应的值删除对应的对象 (如：'idStr')
			* @param {beforeDeleteDoEvent}
			*            (optional) 在删除之前触发的事件,函数要有返回值true/false，true继续执行删除操作，false不执行删除操作
			* @return {Ext.Button} 返回一个修改按钮
			*/
			createTreeTBarDeleteButton: function (buttonText, tree,
					url, idName) {
			    var button = new Ext.Button({
			        text: buttonText,
			        handler: function () {
			            var selectedItem = tree.getSelectionModel().getSelectedNode();
			            if (!selectedItem) {
			                Ext.MessageBox.alert("提示", "请选择需要删除的记录！");
			                return;
			            } else {
			                var comfirm = Ext.MessageBox.confirm("提醒", "确认要删除记录吗？",
									function (btn) {
									    if (btn == "yes") {
									        // alert(selectedItem.attributes.idStr);
									        Ext.Ajax.request({
									            url: url,
									            params: {
									                idStr: selectedItem.attributes.idStr
									            },
									            success: function (result, request) {
									                Ext.Msg.alert('操作', "删除成功");
									                tree.getRootNode().reload();
									            },
									            failure: function (result, request) {
									                Ext.Msg.alert('操作', "删除失败");
									            }
									        });
									    }
									});
			            }
			        }
			    });
			    return button;
			},
			createAjaxBtn: function (url, ds, desc) {
			    var btnDelAll = {
			        text: desc,
			        handler: function () {
			            var comfirm = Ext.MessageBox.confirm("提醒", "确认要" + desc + "吗？",
								function (btn) {
								    if (btn == "yes") {
								        Ext.Ajax.request({
								            url: webPath + url,
								            method: 'get',
								            success: function (result, request) {
								                Ext.Msg.alert('操作', Ext.util.JSON
														.decode(result.responseText).data);

								            },
								            failure: function (result, request) {
								                Ext.Msg.alert('操作', Ext.util.JSON
														.decode(result.responseText).data);

								            }
								        });
								    }
								});
			        },
			        scope: this
			    };
			    return btnDelAll;
			},
			createAjaxBtnAndReload: function (url, ds, desc) {
			    var btnAll = {
			        text: desc,
			        handler: function () {
			            var comfirm = Ext.MessageBox.confirm("提醒", "确认要" + desc + "吗？",
								function (btn) {
								    if (btn == "yes") {
								        Ext.Ajax.request({
								            url: webPath + url,
								            method: 'get',
								            success: function (result, request) {
								                Ext.Msg.alert('操作', Ext.util.JSON
														.decode(result.responseText).data);
								                ds.reload();
								            },
								            failure: function (result, request) {
								                Ext.Msg.alert('操作', Ext.util.JSON
														.decode(result.responseText).data);
								                ds.reload();
								            }
								        });
								    }
								});
			        }
			    };
			    return btnAll;
			}
		},
		window: {
			/**
			* 窗口-->窗口对象
			* 
			* @param {title}
			*            标题(如: '查询')
			* @param {items}
			*            显示在窗口中的元素(如: Object或Array)
			* @param {width}
			*            窗口宽度(如: 350)
			* @param {height}
			*            窗口高度(如: 250)
			* @return {Ext.Window} 返回一个默认的窗口对象
			*/
			createWindow: function (title, items, width, height) {
			    var win = new Ext.Window({
			        title: title,
			        width: width,
			        height: height,
			        items: items,
			        layout: 'fit',
			        modal: true,
			        closeAction: 'hide', // 默认为'close',当关闭窗口时会将此窗口对象remove和destroy;
			        // 'hide'则只是将其隐藏,不会remove
			        plain: true
			    });
			    return win;
			}
		},
		grid: {
			/**
			* EditGrid-->编辑事件，设定某些单元格不可编辑
			* 
			* @param {editGrid}
			*            (object) EditGrid对象
			* @param {cancelArray}
			*            (Array) 不可编辑的单元格数组
			*            如：[[0,1,'L1'],[1]表示第１行第2列、第２行第２列、倒数第１行第２列，设为不可编辑
			*/
			addCancelEditEvent: function (editGrid, cancelArray) {
			    editGrid.on("beforeedit", function (editGridObj) {
			        var cancelCellArray = cancelArray;
			        if (cancelCellArray == null || cancelCellArray.length < 2) {
			            return;
			        }

			        // 获得Grid记录总数
			        var totalLength = this.getStore().data.length;
			        // 获得当前编辑的行列
			        var editRow = editGridObj.row;
			        var editCol = editGridObj.column;
			        var rowArray = cancelCellArray[0];
			        var colArray = cancelCellArray[1];
			        // 判断当前编辑列，是否在设置不可编辑列中
			        for (var i = 0; i < colArray.length; i++) {
			            if (editCol == colArray[i]) {
			                // 判断当前编辑行，是否在设置不可编辑行中
			                for (var j = 0; j < rowArray.length; j++) {
			                    var rowIndex = rowArray[j] + '';
			                    if (rowIndex.indexOf('L') != -1) {
			                        // 如果以L开头的，表示倒数第几行
			                        rowIndex = rowIndex
											.substring(rowIndex.indexOf('L') + 1);
			                        rowIndex = totalLength - rowIndex;
			                    }
			                    if (editRow == rowIndex) {
			                        editGridObj.cancel = true;
			                        var selectModelObj = editGridObj.grid
											.getSelectionModel();
			                        if (selectModelObj != null) {
			                            selectModelObj.deselectRow(rowIndex);
			                        }
			                        return;
			                    }
			                }
			            }
			        }
			        for (var j = 0; j < rowArray.length; j++) {
			            var rowIndex = rowArray[j] + '';
			            if (rowIndex.indexOf('L') != -1) {
			                // 如果以L开头的，表示倒数第几行
			                rowIndex = rowIndex.substring(rowIndex.indexOf('L') + 1);
			                rowIndex = totalLength - rowIndex;
			            }
			            if (editRow == rowIndex) {
			                var selectModelObj = editGridObj.grid.getSelectionModel();
			                if (selectModelObj != null) {
			                    selectModelObj.deselectRow(rowIndex);
			                }
			            }
			        }

			    });
			},
			/**
			* 表格-->Ext.grid.GridPanel
			* 
			* @param {region}
			*            grid显示的方位(如：'center')
			* @param {el}
			*            grid显示的div(如：'center-div')
			* @param {ds}
			*            Ext.data.Store对象
			* @param {cm}
			*            Ext.grid.ColumnModel对象
			* @param {sm}
			*            Ext.grid.SelectionModel对象
			* @param {plugins}
			*            (optional) 插件,
			* @param {hasBbar}
			*            (optional) 是否要grid的分页bar(pageingbar)(true/false),默认是true,
			* @param {title}
			*            (optional) grid的标题
			* @param {hasTbar}
			*            (optional) 是否要grid的toolbar(true/false),默认是true Ext.grid.GridPanel
			*/
			createGridPanel2: function(region, ds, cm, tbar){
				var grid = new Ext.grid.GridPanel({
			        region: 'center',
			        store: ds, 
					// selModel: sm,
			        collapsible: false,
			        split: true,
			        border: true,
			        columns: cm, // æ¾ç¤ºå
			        stripeRows: true, // æé©¬çº¿ææ
			        // enableColumnMove: false, //ç¦æ­¢ææ¾å
			        // enableColumnResize: false, //ç¦æ­¢æ¹ååå®½åº¦
			        loadMask: true, // æ¾ç¤ºé®ç½©åæç¤ºåè½,å³å è½½Loadingâ¦â¦
			        forceFit: true, // èªå¨å¡«æ»¡è¡¨æ ¼
			        bbar: new Ext.PagingToolbar({
			            pageSize: 1,
			            store: ds,
			            firstText: '第一页',
			            prevText: '前一页',
			            nextText: '后一页',
			            lastText: '最后一页',
			            refreshText: '刷新',
			            autoWidth: true,
			            displayInfo: true,
			            displayMsg: '当前显示{0}-{1}条数据,共{2}条数据',
			            emptyMsg: "没有记录"
			        })
			       
			    });			
				return grid;
			},
			createGridPanel: function (region, el, ds, cm, sm,
					plugins, hasBbar, title, hasTbar) {
			    if (hasTbar == null || hasTbar == true) {
			        hasTbar = [];
			    } else {
			        hasTbar = null;
			    }
			    var grid = new Ext.grid.GridPanel({
			        region: region,
			        el: el,
			        store: ds,
			        cm: cm,
			        stripeRows: true,
			        sm: sm,
			        autoScroll: true,
			        title: title,
			        plugins: plugins,
			        // trackMouseOver:false, //true：鼠标移到一行上会高亮显示，默认为true
			        loadMask: true,
			        viewConfig: {
			            forceFit: true,
			            enableRowBody: true,
			            getRowClass: function (record, rowIndex, p, ds) {
			                if (this.showPreview) {
			                    p.body = '<p>' + record.data.excerpt + '</p>';
			                    return 'x-grid3-row-expanded';
			                }
			                return 'x-grid3-row-collapsed';
			            }
			        },
			        tbar: hasTbar,
			        bbar: gbicc.component.createPageToolBar(ds, hasBbar)
			    });
			    return grid;
			},
			/**
			* 表格-->Ext.grid.GridPanel 带滚动条
			* 
			* @param {region}
			*            grid显示的方位(如：'center')
			* @param {el}
			*            grid显示的div(如：'center-div')
			* @param {ds}
			*            Ext.data.Store对象
			* @param {cm}
			*            Ext.grid.ColumnModel对象
			* @param {sm}
			*            Ext.grid.SelectionModel对象
			* @param {plugins}
			*            (optional) 插件,
			* @param {hasBbar}
			*            (optional) 是否要grid的分页bar(pageingbar)(true/false),默认是true,
			* @param {title}
			*            (optional) grid的标题
			* @param {hasTbar}
			*            (optional) 是否要grid的toolbar(true/false),默认是true Ext.grid.GridPanel
			*/
			createScrollGridPanel: function (region, el, ds, cm, sm,
					plugins, hasBbar, title, hasTbar) {
			    if (hasTbar == null || hasTbar == true) {
			        hasTbar = [];
			    } else {
			        hasTbar = null;
			    }
			    var grid = new Ext.grid.GridPanel({
			        region: region,
			        el: el,
			        store: ds,
			        cm: cm,
			        stripeRows: true,
			        sm: sm,
			        autoScroll: true,
			        title: title,
			        plugins: plugins,
			        // trackMouseOver:false, //true：鼠标移到一行上会高亮显示，默认为true
			        loadMask: true,
			        viewConfig: {
			            forceFit: false,
			            enableRowBody: true,
			            scrollOffset: 0,
			            getRowClass: function (record, rowIndex, p, ds) {
			                if (this.showPreview) {
			                    p.body = '<p>' + record.data.excerpt + '</p>';
			                    return 'x-grid3-row-expanded';
			                }
			                return 'x-grid3-row-collapsed';
			            }
			        },
			        tbar: hasTbar,
			        bbar: gbicc.component.createPageToolBar(ds, hasBbar)
			    });
			    return grid;
			},
			/**
			* 表格-->Ext.grid.GridPanel 可编辑带滚动条
			* 
			* @param {region}
			*            grid显示的方位(如：'center')
			* @param {el}
			*            grid显示的div(如：'center-div')
			* @param {ds}
			*            Ext.data.Store对象
			* @param {cm}
			*            Ext.grid.ColumnModel对象
			* @param {sm}
			*            Ext.grid.SelectionModel对象
			* @param {plugins}
			*            (optional) 插件,
			* @param {hasBbar}
			*            (optional) 是否要grid的分页bar(pageingbar)(true/false),默认是true,
			* @param {title}
			*            (optional) grid的标题
			* @param {hasTbar}
			*            (optional) 是否要grid的toolbar(true/false),默认是true Ext.grid.GridPanel
			*/
			createScrollEditGridPanel: function (region, el, ds, cm, sm,
					plugins, hasBbar, title, hasTbar) {
			    if (hasTbar == null || hasTbar == true) {
			        hasTbar = [];
			    } else {
			        hasTbar = null;
			    }
			    var grid = new Ext.grid.EditorGridPanel({
			        region: region,
			        el: el,
			        store: ds,
			        cm: cm,
			        stripeRows: true,
			        sm: sm,
			        autoScroll: true,
			        title: title,
			        plugins: plugins,
			        clicksToEdit: 1,
			        // trackMouseOver:false, //true：鼠标移到一行上会高亮显示，默认为true
			        loadMask: true,
			        viewConfig: {
			            forceFit: false,
			            enableRowBody: true,
			            scrollOffset: 0,
			            getRowClass: function (record, rowIndex, p, ds) {
			                if (this.showPreview) {
			                    p.body = '<p>' + record.data.excerpt + '</p>';
			                    return 'x-grid3-row-expanded';
			                }
			                return 'x-grid3-row-collapsed';
			            }
			        },
			        tbar: hasTbar,
			        bbar: gbicc.component.createPageToolBar(ds, hasBbar)
			    });
			    return grid;
			},
			/**
			* 创建可编辑的Ext.grid.EditorGridPanel对象
			* 
			* @param {title}
			*            editGrid的title
			* @param {elDiv}
			*            属性el，对应的div
			* @param {editds}
			*            属性store：对应的Ext.data.Store对象
			* @param {cm}
			*            属性cm:对应的
			* @param {sm}
			*            属性sm：
			* @param {height}
			*            editGrid的高度
			* @param {initRowFunc}
			*            当此属性不为null时，将创建“新增”和“删除”按钮，并且initRowFunc为创建一行记录的函数。如下：initPlantZiChan
			*            var PlantZiChan = Ext.data.Record.create([ {name:
			*            'qiTaZiChanGouChengXiangMu'}, {name:
			*            'qiTaZiChanGouChengXiangMuDeJinE'} ]); function initPlantZiChan(){
			*            var plan = new PlantZiChan({ qiTaZiChanGouChengXiangMu: '',
			*            qiTaZiChanGouChengXiangMuDeJinE: '' }); return plan; }
			* @return {Ext.grid.EditorGridPanel} 返回一个Ext.grid.EditorGridPanel对象
			*/
			createEditGrid: function (title, elDiv, editds, cm, sm,
					height, initRowFunc, colBeginEdit, hasTotal, totalNumber) {
			    if (colBeginEdit == null) {
			        colBeginEdit = 2;
			    }
			    if (hasTotal == null) {
			        hasTotal = false;
			    }
			    if (totalNumber == null) {
			        totalNumber = 1;
			    }
			    var tbar;
			    if (initRowFunc == null) {
			        tbar = [];
			    } else {
			        tbar = [new Ext.Button(
					{
					    text: '新增',
					    handler: function () {
					        var sl = editGrid.getSelectionModel()
									.getSelections();
					        if (initRowFunc != null
									&& typeof initRowFunc == 'function') {
					            var newplan = initRowFunc();
					            var totalLength = editGrid.getStore().data.length;
					            // 如果有合计项，则在倒数第二行开始加
					            var insertRow = hasTotal && totalLength > 0 ? totalLength
										- totalNumber
										: totalLength;
					            if (sl != null && sl.length > 0) {
					                var indexs = [];
					                for (var i = 0; i < sl.length; i++) {
					                    indexs[i] = editGrid.getStore()
												.indexOf(sl[i]);
					                }
					                insertRow = gbicc.util.Array
											.minValue(indexs);
					            }

					            editGrid.stopEditing();
					            editds.insert(insertRow, newplan);
					            editGrid.startEditing(insertRow,
										colBeginEdit);
					        }
					    }
					}),
					new Ext.Button(
					{
					    text: '删除',
					    handler: function () {
					        var sl = editGrid.getSelectionModel()
									.getSelections();
					        //var ids = "";
					        if (sl.length == 0) {
					            Ext.MessageBox.alert("提醒", "请选择要删除的记录！");
					            return;
					        }
					        var comfirm = Ext.MessageBox.confirm(
								"提示",
								"确定要删除所选记录吗?",
							function (btn) {
							    if (btn == "yes") {
							        editGrid.stopEditing();
							        //var records = new Array();
							        for (var i = 0; i < sl.length; i++) {
							            var index = editds.data.indexOf(sl[i]);
							            editds.data.removeAt(index);
							            // editds.remove(sl[i]);
							            // //不能使用此方法，数据多的话，会让删除非常慢，因为每调用这个方法一次，就会触发一次“remove”事件，让表格刷新
							        }
							        // 触发事件，让editds数据同步
							        editds.fireEvent("datachanged", editds);
							    }
							});
					    }
					})];
			    }
			    var editGrid = new Ext.grid.EditorGridPanel({
			        region: 'center',
			        title: title,
			        el: elDiv,
			        store: editds,
			        sm: sm,
			        cm: cm,
			        layout: 'fit',
			        autoScroll: true,
			        height: height,
			        loadMask: true,
			        frame: true,
			        clicksToEdit: 1,
			        tbar: tbar
			    });
			    // 新增行时触发的事件
			    editGrid.getView().addListener('rowsinserted',
						function (view, firstRow, lastRow) {
						    view.refresh();
						});
			    // 删除行时触发的事件
			    editGrid.getView().addListener('rowremoved',
						function (view, firstRow, lastRow) {
						    view.refresh();
						});
			    return editGrid;
			}/*,
			*//**
			* 创建CancelCheckboxSelectionModel对象
			* 
			* @return createCancelCheckboxSelectionModel对象
			*//*
			createCancelCheckboxSelectionModel = function () {
			    var cancelCheckboxSelectionModel = new Ext.grid.CancelCheckboxSelectionModel();
			    return cancelCheckboxSelectionModel;
			}*/
		},
		//表单空间绑定
		form:{
			createComboBoxEmptyId: function (id, width, emptyText, labelWidth, hiddenName, fieldLabel, data,
					needAll, blankText, defaultValue, editable, disabled, autoWidth) {
				var emptyText = emptyText != null ? emptyText : '请选择';			    

			    if (needAll != null) {
			        emptyText = "全部";
			        data = [[needAll, '全部']].concat(data);
			    }
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (editable == null) {
			        editable = false;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }			    
			    var comboBox = new Ext.form.ComboBox({
			    	id: id,
			        name: hiddenName,  //新增
			        hiddenName: hiddenName,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        store: new Ext.data.SimpleStore({
			            fields: ['key', 'value'],
			            data: data
			        }),
			        disabled: disabled,
			        valueField: 'key',
			        displayField: 'value',
			        mode: 'local', // 数据是在本地，所以设置了模式为local，(默认是 'remote' ，从服务器端取数据)
			        triggerAction: 'all', // 一定要设置属性triggerAction为all，不然当你选择了某个选项后，你的下拉将只会出现匹配选项值文本的选择项，其它选择项是不会再显示了，这样你就不能更改其它选项了
			        editable: editable,
			        selectOnFocus: true, // 当editable=true时才起效：当选择一项后，光标会到文本框中
			        emptyText: emptyText,
			        width: width,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (defaultValue != null) {
			        comboBox.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        comboBox.labelWidth = labelWidth;
			    }
			    if (blankText != null) {
			        comboBox.allowBlank = false;
			        comboBox.blankText = blankText;
			    }
			    if (autoWidth != null) {
			        comboBox.autoWidth = autoWidth;
			    }
			    comboBox.maxHeight = 200; // 设置下拉框的下拉条
			    return comboBox;
			},
			//下拉框，修改emptyText值
			createComboBoxEmpty: function (width, emptyText, labelWidth, hiddenName, fieldLabel, data,
					needAll, blankText, defaultValue, editable, disabled, autoWidth) {
				var emptyText = emptyText != null ? emptyText : '请选择';			    

			    if (needAll != null) {
			        emptyText = "全部";
			        data = [[needAll, '全部']].concat(data);
			    }
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (editable == null) {
			        editable = false;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }			    
			    var comboBox = new Ext.form.ComboBox({
			        name: hiddenName,  //新增
			        hiddenName: hiddenName,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        store: new Ext.data.SimpleStore({
			            fields: ['key', 'value'],
			            data: data
			        }),
			        disabled: disabled,
			        valueField: 'key',
			        displayField: 'value',
			        mode: 'local', // 数据是在本地，所以设置了模式为local，(默认是 'remote' ，从服务器端取数据)
			        triggerAction: 'all', // 一定要设置属性triggerAction为all，不然当你选择了某个选项后，你的下拉将只会出现匹配选项值文本的选择项，其它选择项是不会再显示了，这样你就不能更改其它选项了
			        editable: editable,
			        selectOnFocus: true, // 当editable=true时才起效：当选择一项后，光标会到文本框中
			        emptyText: emptyText,
			        width: width,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (defaultValue != null) {
			        comboBox.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        comboBox.labelWidth = labelWidth;
			    }
			    if (blankText != null) {
			        comboBox.allowBlank = false;
			        comboBox.blankText = blankText;
			    }
			    if (autoWidth != null) {
			        comboBox.autoWidth = autoWidth;
			    }
			    comboBox.maxHeight = 200; // 设置下拉框的下拉条
			    return comboBox;
			},
			//下拉框
			createComboBox: function (width, labelWidth, hiddenName, fieldLabel, data,
					needAll, blankText, defaultValue, editable, disabled, autoWidth) {
			    var emptyText = "请选择";
			    if (needAll != null) {
			        emptyText = "全部";
			        data = [[needAll, '全部']].concat(data);
			    }
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (editable == null) {
			        editable = true;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }			    
			    var comboBox = new Ext.form.ComboBox({
			        name: hiddenName,  //新增
			        hiddenName: hiddenName,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        store: new Ext.data.SimpleStore({
			            fields: ['key', 'value'],
			            data: data
			        }),
			        disabled: disabled,
			        valueField: 'key',
			        displayField: 'value',
			        mode: 'local', // 数据是在本地，所以设置了模式为local，(默认是 'remote' ，从服务器端取数据)
			        triggerAction: 'all', // 一定要设置属性triggerAction为all，不然当你选择了某个选项后，你的下拉将只会出现匹配选项值文本的选择项，其它选择项是不会再显示了，这样你就不能更改其它选项了
			        editable: editable,
			        selectOnFocus: true, // 当editable=true时才起效：当选择一项后，光标会到文本框中
			        emptyText: emptyText,
			        width: width,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (defaultValue != null) {
			        comboBox.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        comboBox.labelWidth = labelWidth;
			    }
			    if (blankText != null) {
			        comboBox.allowBlank = false;
			        comboBox.blankText = blankText;
			    }
			    if (autoWidth != null) {
			        comboBox.autoWidth = autoWidth;
			    }
			    comboBox.maxHeight = 200; // 设置下拉框的下拉条
			    return comboBox;
			},
			//下拉框
			createComboBoxTemp: function (width, labelWidth, hiddenName, fieldLabel, data,
					needAll, blankText, defaultValue, editable, disabled, autoWidth) {
			    var emptyText = "请选择";
			    if (needAll != null) {
			        emptyText = "全部";
			        data = [[needAll, '全部']].concat(data);
			    }
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (editable == null) {
			        editable = true;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }			    
			    var comboBox = new Ext.form.ComboBox({
			        name: hiddenName,  //新增
			        hiddenName: hiddenName,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        store: data,
			        disabled: disabled,
			        valueField: 'id',
			        displayField: 'text',
			        triggerAction: 'all', // 一定要设置属性triggerAction为all，不然当你选择了某个选项后，你的下拉将只会出现匹配选项值文本的选择项，其它选择项是不会再显示了，这样你就不能更改其它选项了
			        editable: editable,
			        selectOnFocus: true, // 当editable=true时才起效：当选择一项后，光标会到文本框中
			        emptyText: emptyText,
			        width: width,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (defaultValue != null) {
			        comboBox.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        comboBox.labelWidth = labelWidth;
			    }
			    if (blankText != null) {
			        comboBox.allowBlank = false;
			        comboBox.blankText = blankText;
			    }
			    if (autoWidth != null) {
			        comboBox.autoWidth = autoWidth;
			    }
			    comboBox.maxHeight = 200; // 设置下拉框的下拉条
			    return comboBox;
			},
			//下拉框
			createComboBoxId: function (id,width, labelWidth, hiddenName, fieldLabel, data,
					needAll, blankText, defaultValue, editable, disabled, autoWidth) {
			    var emptyText = "请选择";
			    if (needAll != null) {
			        emptyText = "全部";
			        data = [[needAll, '全部']].concat(data);
			    }
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (editable == null) {
			        editable = false;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }			    
			    var comboBox = new Ext.form.ComboBox({
			        name: hiddenName,  //新增
			        hiddenName: hiddenName,
			        id:id,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        store: new Ext.data.SimpleStore({
			            fields: ['key', 'value'],
			            data: data
			        }),
			        disabled: disabled,
			        valueField: 'key',
			        displayField: 'value',
			        mode: 'local', // 数据是在本地，所以设置了模式为local，(默认是 'remote' ，从服务器端取数据)
			        triggerAction: 'all', // 一定要设置属性triggerAction为all，不然当你选择了某个选项后，你的下拉将只会出现匹配选项值文本的选择项，其它选择项是不会再显示了，这样你就不能更改其它选项了
			        editable: editable,
			        selectOnFocus: true, // 当editable=true时才起效：当选择一项后，光标会到文本框中
			        emptyText: emptyText,
			        width: width,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (defaultValue != null) {
			        comboBox.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        comboBox.labelWidth = labelWidth;
			    }
			    if (blankText != null) {
			        comboBox.allowBlank = false;
			        comboBox.blankText = blankText;
			    }
			    if (autoWidth != null) {
			        comboBox.autoWidth = autoWidth;
			    }
			    comboBox.maxHeight = 200; // 设置下拉框的下拉条
			    return comboBox;
			},
			createComboBoxId2: function (id,width, labelWidth, hiddenName, fieldLabel, data,
					needAll, blankText, defaultValue, editable, disabled, autoWidth) {
			    var emptyText = "请选择";
			    if (needAll != null) {
			        emptyText = "全部";
			        data = [[needAll, '全部']].concat(data);
			    }
			    if (editable == null) {
			        editable = false;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }			    
			    var comboBox = new Ext.form.ComboBox({
			        name: hiddenName,  //新增
			        hiddenName: hiddenName,
			        id:id,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        store: new Ext.data.SimpleStore({
			            fields: ['key', 'value'],
			            data: data
			        }),
			        disabled: disabled,
			        valueField: 'key',
			        displayField: 'value',
			        mode: 'local', // 数据是在本地，所以设置了模式为local，(默认是 'remote' ，从服务器端取数据)
			        triggerAction: 'all', // 一定要设置属性triggerAction为all，不然当你选择了某个选项后，你的下拉将只会出现匹配选项值文本的选择项，其它选择项是不会再显示了，这样你就不能更改其它选项了
			        editable: editable,
			        selectOnFocus: true, // 当editable=true时才起效：当选择一项后，光标会到文本框中
			        emptyText: emptyText,
			        width: width,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (defaultValue != null) {
			        comboBox.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        comboBox.labelWidth = labelWidth;
			    }
			    if (blankText != null) {
			        comboBox.allowBlank = false;
			        comboBox.blankText = blankText;
			    }
			    if (autoWidth != null) {
			        comboBox.autoWidth = autoWidth;
			    }
			    comboBox.maxHeight = 200; // 设置下拉框的下拉条
			    return comboBox;
			},
			createTextFieldPadding: function (name, fieldLabel,labelWidth, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {		
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    var textField = new Ext.form.TextField({
			    	name: name,
			    	id: name,
			    	fieldLabel: fieldLabel,
			        padding : '10 10 10 570',
					labelWidth : labelWidth
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        textField.emptyText = defaultValue;
			    }	
			    return textField;
			},				
			createTextFieldPadding2: function (name, fieldLabel,labelWidth, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {		
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    var textField = new Ext.form.TextField({
			    	name: name,
			    	fieldLabel: fieldLabel,
			        padding : '10 10 10 358',
					labelWidth : labelWidth
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }			    
			    return textField;
			},
			createTextFieldPadding3: function (id, name, fieldLabel,labelWidth, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {		
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    var textField = new Ext.form.TextField({
			    	id: id,
			    	name: name,
			    	fieldLabel: fieldLabel,
			        padding : '10 10 10 570',
					labelWidth : labelWidth
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }			    
			    return textField;
			},
			createTextFieldPadding4: function (name, fieldLabel,labelWidth, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {		
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    var textField = new Ext.form.TextField({
			    	name: name,
			    	fieldLabel: fieldLabel,
			    	width: 70,
			        padding : '10 10 10 200',
					labelWidth : labelWidth
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }			    
			    return textField;
			},
			createTextFieldPadding5: function (name, emptyText, fieldLabel,labelWidth, blankText,
					disabled, inputType, vtype, invalidText, validator) {		
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    var textField = new Ext.form.TextField({
			    	name: name,
			    	fieldLabel: fieldLabel,
			        padding : '10 10 10 570',
					labelWidth : labelWidth,
					emptyText: emptyText
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }	    
			    return textField;
			},	
			createTextFieldPadding6: function (id, name, fieldLabel,labelWidth, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {		
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    var textField = new Ext.form.TextField({
			    	name: name,
			    	id: id,
			    	fieldLabel: fieldLabel,
			        padding : '10 10 10 170',
					labelWidth : labelWidth
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        textField.emptyText = defaultValue;
			    }	
			    return textField;
			},
			createTextFieldEmpty: function (width, emptyText, labelWidth, name, fieldLabel, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {
			    var emptyText = emptyText != null ? emptyText : '';		
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textField = new Ext.form.TextField({
			        name: name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        width: width, 
			        disabled: disabled,
			        labelAlign : 'right',
			        emptyText: emptyText,
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (vtype != null) {
			        textField.vtype = vtype;
			    }
			    if (validator != null && invalidText != null) {
			        textField.invalidText = invalidText;
			        textField.validator = validator;
			    }
			    if (defaultValue != null) {
			        textField.value = defaultValue;
			    }
			    if (inputType != null) {
			        textField.inputType = inputType;
			    }
			    if (labelWidth == null) {
			        textField.labelWidth = labelWidth;
			    }
			    return textField;
			},
			createTextFieldEmptyId: function (id, width, emptyText, labelWidth, name, fieldLabel, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {
			    var emptyText = emptyText != null ? emptyText : '';		
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textField = new Ext.form.TextField({
			    	id: id,
			        name: name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        width: width, 
			        disabled: disabled,
			        labelAlign : 'right',
			        emptyText: emptyText,
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (vtype != null) {
			        textField.vtype = vtype;
			    }
			    if (validator != null && invalidText != null) {
			        textField.invalidText = invalidText;
			        textField.validator = validator;
			    }
			    if (defaultValue != null) {
			        textField.value = defaultValue;
			    }
			    if (inputType != null) {
			        textField.inputType = inputType;
			    }
			    if (labelWidth == null) {
			        textField.labelWidth = labelWidth;
			    }
			    return textField;
			},
			createTextFieldToYm: function(width, name, fieldLabel, emptyText, blankText,
					disabled, vtype, invalidText, validator, defaultValue, inputType) {
				if (blankText != null) {
					fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
				}
				if (disabled == null) {
					disabled = false;
				}
				if (emptyText == null) {
					emptyText = '';
				}
				var textField = new Ext.form.TextField({
					name : name,
					fieldLabel : fieldLabel,
					labelSeparator : form_abelSeparator,
					width : width,
					disabled : disabled,
					emptyText : emptyText,
					regex : /^(([1-9]\d{3})|(0\d{2}[1-9]))(0[1-9]|1[0-2])$/, 
					anchor : form_anchor
				});
				if (blankText != null) {
					textField.allowBlank = false;
					textField.blankText = blankText;
				}
				if (vtype != null) {
					textField.vtype = vtype;
				}
				if (validator != null && invalidText != null) {
					textField.invalidText = invalidText;
					textField.validator = validator;
				}
				if (defaultValue != null) {
					textField.value = defaultValue;
				}
				if (inputType != null) {
					textField.inputType = inputType;
				}
				return textField;
			},
			createTextFieldToYmd: function(width, name, fieldLabel, emptyText, blankText,
					disabled, vtype, invalidText, validator, defaultValue, inputType) {
				if (blankText != null) {
					fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
				}
				if (disabled == null) {
					disabled = false;
				}
				if (emptyText == null) {
					emptyText = '';
				}
				var textField = new Ext.form.TextField({
					name : name,
					fieldLabel : fieldLabel,
					labelSeparator : form_abelSeparator,
					width : width,
					disabled : disabled,
					emptyText : emptyText,
					regex : /^(([1-9]\d{3})|(0\d{2}[1-9]))-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 
					anchor : form_anchor
				});
				if (blankText != null) {
					textField.allowBlank = false;
					textField.blankText = blankText;
				}
				if (vtype != null) {
					textField.vtype = vtype;
				}
				if (validator != null && invalidText != null) {
					textField.invalidText = invalidText;
					textField.validator = validator;
				}
				if (defaultValue != null) {
					textField.value = defaultValue;
				}
				if (inputType != null) {
					textField.inputType = inputType;
				}
				return textField;
			},
			createTextFieldToYmd2: function(width, name, fieldLabel, emptyText, blankText,
					disabled, vtype, invalidText, validator, defaultValue, inputType) {
				if (blankText != null) {
					fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
				}
				if (disabled == null) {
					disabled = false;
				}
				if (emptyText == null) {
					emptyText = '';
				}
				var textField = new Ext.form.TextField({
					name : name,
					fieldLabel : fieldLabel,
					labelSeparator : form_abelSeparator,
					width : width,
					disabled : disabled,
					emptyText : emptyText,
					regex : /^(([1-9]\d{3})|(0\d{2}[1-9]))(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/, 
					anchor : form_anchor
				});
				if (blankText != null) {
					textField.allowBlank = false;
					textField.blankText = blankText;
				}
				if (vtype != null) {
					textField.vtype = vtype;
				}
				if (validator != null && invalidText != null) {
					textField.invalidText = invalidText;
					textField.validator = validator;
				}
				if (defaultValue != null) {
					textField.value = defaultValue;
				}
				if (inputType != null) {
					textField.inputType = inputType;
				}
				return textField;
			},
			createTextFieldToY: function(width, name, fieldLabel, emptyText, blankText,
					disabled, vtype, invalidText, validator, defaultValue, inputType) {
				if (blankText != null) {
					fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
				}
				if (disabled == null) {
					disabled = false;
				}
				if (emptyText == null) {
					emptyText = '';
				}
				var textField = new Ext.form.TextField({
					name : name,
					fieldLabel : fieldLabel,
					labelSeparator : form_abelSeparator,
					width : width,
					disabled : disabled,
					emptyText : emptyText,
					regex : /^\d{4}$/, 
					anchor : form_anchor
				});
				if (blankText != null) {
					textField.allowBlank = false;
					textField.blankText = blankText;
				}
				if (vtype != null) {
					textField.vtype = vtype;
				}
				if (validator != null && invalidText != null) {
					textField.invalidText = invalidText;
					textField.validator = validator;
				}
				if (defaultValue != null) {
					textField.value = defaultValue;
				}
				if (inputType != null) {
					textField.inputType = inputType;
				}
				return textField;
			},
			createNumberField: function (width, labelWidth,name, fieldLabel, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
              
			    var textField = new Ext.form.NumberField({
			        name: name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        width: width, 
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (vtype != null) {
			        textField.vtype = vtype;
			    }
			    if (validator != null && invalidText != null) {
			        textField.invalidText = invalidText;
			        textField.validator = validator;
			    }
			    if (defaultValue != null) {
			        textField.value = defaultValue;
			    }
			    if (inputType != null) {
			        textField.inputType = inputType;
			    }
			    if (labelWidth == null) {
			        textField.labelWidth = labelWidth;
			    }
			    return textField;
			},
			createNumberFieldId: function (id, width, labelWidth, name, fieldLabel, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textField = new Ext.form.NumberField({
			    	id: id,
			        name: name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        width: width, 
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (vtype != null) {
			        textField.vtype = vtype;
			    }
			    if (validator != null && invalidText != null) {
			        textField.invalidText = invalidText;
			        textField.validator = validator;
			    }
			    if (defaultValue != null) {
			        textField.value = defaultValue;
			    }
			    if (inputType != null) {
			        textField.inputType = inputType;
			    }
			    if (labelWidth == null) {
			        textField.labelWidth = labelWidth;
			    }
			    return textField;
			},
			createNumberFieldId2: function (id, width, labelWidth, name, fieldLabel, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textField = new Ext.form.NumberField({
			    	id: id,
			        name: name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        width: width, 
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (vtype != null) {
			        textField.vtype = vtype;
			    }
			    if (validator != null && invalidText != null) {
			        textField.invalidText = invalidText;
			        textField.validator = validator;
			    }
			    if (defaultValue != null) {
			        textField.value = defaultValue;
			    }
			    if (inputType != null) {
			        textField.inputType = inputType;
			    }
			    if (labelWidth == null) {
			        textField.labelWidth = labelWidth;
			    }
			    return textField;
			},

			createNumberFieldId22: function (id, width, labelWidth, name, fieldLabel, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textField = new Ext.form.NumberField({
			    	id: id,
					allowNegative:false,           
			        name: name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        width: width, 
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (vtype != null) {
			        textField.vtype = vtype;
			    }
			    if (validator != null && invalidText != null) {
			        textField.invalidText = invalidText;
			        textField.validator = validator;
			    }
			    if (defaultValue != null) {
			        textField.value = defaultValue;
			    }
			    if (inputType != null) {
			        textField.inputType = inputType;
			    }
			    if (labelWidth == null) {
			        textField.labelWidth = labelWidth;
			    }
			    return textField;
			},
			
			createNumberFieldId3: function (id, width, labelWidth, name, fieldLabel, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textField = new Ext.form.NumberField({
			    	id: id,
			        name: name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        width: width, 
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor, 
			        enableKeyEvents :true,
			        listeners: {
			        	blur: function () {
			        		setTimeout(function(){
			        			   var records = ds1.getRange();
					            	var zzl2 = 0;
				          			for (var i = 0; i < records.length; i++) {
				          			    var data = records[i].data;
				          			    zzl2+=parseInt(data.pz);
				          			    zzl2+=parseInt(data.jz);
				          			}
				          			
				          			Ext.getCmp('zzl').setValue(zzl2);
			        			
			        		},400);
			         
		          			
			            }
			           
			        }
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (vtype != null) {
			        textField.vtype = vtype;
			    }
			    if (validator != null && invalidText != null) {
			        textField.invalidText = invalidText;
			        textField.validator = validator;
			    }
			    if (defaultValue != null) {
			        textField.value = defaultValue;
			    }
			    if (inputType != null) {
			        textField.inputType = inputType;
			    }
			    if (labelWidth == null) {
			        textField.labelWidth = labelWidth;
			    }
			    return textField;
			},
			/**
			* 表单-->文本框
			* 
			* @param {name}
			*            文本框名称(如: groupName)
			* @param {fieldLabel}
			*            标签显示名(如：小组名称)
			* @param {blankText}
			*            (optional) 当文本框为空的时候提示的信息.如果此参数不为空,则表示此文本框不允许为空,为null或不填,则表示可以为空.
			* @param {disabled}
			*            (optional) 是否可编辑(null/true/false),true 表示不可编辑,默认为false
			* @param {vtype}
			*            (optional) 用Ext自定义的验证
			* @param {invalidText}
			*            (optional) 与validator一起使用,验证后显示的提示信息
			* @param {validator}
			*            (optional) 与invalidText一起使用,验证函数
			* @param {defaultValue}
			*            (optional) 默认选中的值
			* @param {inputType}
			*            (optional) 是否是密码，默认是false
			* @return {Ext.form.TextField} 返回一个默认的文本框
			*/
			createTextField: function (width, labelWidth, name, fieldLabel, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textField = new Ext.form.TextField({
			        name: name,
			        id:name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        width: width, 
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (vtype != null) {
			        textField.vtype = vtype;
			    }
			    if (validator != null && invalidText != null) {
			        textField.invalidText = invalidText;
			        textField.validator = validator;
			    }
			    if (defaultValue != null) {
			        textField.value = defaultValue;
			    }
			    if (inputType != null) {
			        textField.inputType = inputType;
			    }
			    if (labelWidth == null) {
			        textField.labelWidth = labelWidth;
			    }
			    return textField;
			},
			createTextFieldId: function (id, width, labelWidth, name, fieldLabel, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textField = new Ext.form.TextField({
			        id: id,
			        name: name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        width: width, 
			        disabled: disabled,
			        labelAlign : 'right'
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (vtype != null) {
			        textField.vtype = vtype;
			    }
			    if (validator != null && invalidText != null) {
			        textField.invalidText = invalidText;
			        textField.validator = validator;
			    }
				
			    if (defaultValue != null) {
			    
					textField.setValue(defaultValue);
					textField.value = defaultValue;

			    }
			    if (inputType != null) {
			        textField.inputType = inputType;
			    }
			    if (labelWidth == null) {
			        textField.labelWidth = labelWidth;
			    }
			    return textField;
			},
			createTextFieldId2: function (id, width, labelWidth, name, fieldLabel, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textField = new Ext.form.TextField({
			        id: id,
			        name: name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        width: width, 
			        disabled: disabled,
			        labelAlign : 'right'
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (vtype != null) {
			        textField.vtype = vtype;
			    }
			    if (validator != null && invalidText != null) {
			        textField.invalidText = invalidText;
			        textField.validator = validator;
			    }
			    if (defaultValue != null) {
			        textField.emptyText = defaultValue;
			    }
			    if (inputType != null) {
			        textField.inputType = inputType;
			    }
			    if (labelWidth == null) {
			        textField.labelWidth = labelWidth;
			    }
			    return textField;
			},
			createSearchTextField: function (width, labelWidth, name, fieldLabel, emptyText,
					disabled, vtype, invalidText, validator, defaultValue, inputType) {
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textField = new Ext.form.TextField({
			        name: name,
			        fieldLabel: fieldLabel,
			        emptyText: emptyText,
			        labelSeparator: form_abelSeparator,
			        width: width, 
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (vtype != null) {
			        textField.vtype = vtype;
			    }
			    if (validator != null && invalidText != null) {
			        textField.invalidText = invalidText;
			        textField.validator = validator;
			    }
			    if (defaultValue != null) {
			        textField.value = defaultValue;
			    }
			    if (inputType != null) {
			        textField.inputType = inputType;
			    }
			    if (labelWidth == null) {
			        textField.labelWidth = labelWidth;
			    }
			    return textField;
			},
			/**
			* 表单-->上传控件
			* 
			* @param {name}
			*            文本框名称(如: groupName)
			* @param {fieldLabel}
			*            标签显示名(如：小组名称)
			* @param {blankText}
			*            (optional) 当文本框为空的时候提示的信息.如果此参数不为空,则表示此文本框不允许为空,为null或不填,则表示可以为空.
			* @param {disabled}
			*            (optional) 是否可编辑(null/true/false),true 表示不可编辑,默认为false
			* @param {vtype}
			*            (optional) 用Ext自定义的验证
			* @param {invalidText}
			*            (optional) 与validator一起使用,验证后显示的提示信息
			* @param {validator}
			*            (optional) 与invalidText一起使用,验证函数
			* @param {defaultValue}
			*            (optional) 默认选中的值
			* @param {inputType}
			*            (optional) 是否是密码，默认是false
			* @return {Ext.form.TextField} 返回一个默认的文本框
			*/
			createTextFile: function (name, labelWidth, id, fieldLabel, blankText,
					disabled, defaultValue, inputType, vtype, invalidText, validator) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textField = new Ext.form.TextField({
			        name: name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        width: form_textfield_width,
			        disabled: disabled,
			        inputType: 'file',
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (id != null) {
			        textField.id = id;
			    }
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (vtype != null) {
			        textField.vtype = vtype;
			    }
			    if (validator != null && invalidText != null) {
			        textField.invalidText = invalidText;
			        textField.validator = validator;
			    }
			    if (defaultValue != null) {
			        textField.value = defaultValue;
			    }
			    if (inputType != null) {
			        textField.inputType = inputType;
			    }
			    if (labelWidth == null) {
			        textField.labelWidth = labelWidth;
			    }
			    return textField;
			},
			/**
			* 表单-->数字文本框，
			* 
			* @param {name}
			*            文本框名称(如: groupName)
			* @param {fieldLabel}
			*            标签显示名(如：小组名称)
			* @param {blankText}
			*            (optional) 当文本框为空的时候提示的信息.如果此参数不为空,则表示此文本框不允许为空,为null或不填,则表示可以为空.
			* @param {disabled}
			*            (optional) 是否可编辑(null/true/false),true 表示不可编辑,默认为false
			* @param {invalidText}
			*            (optional) 与validator一起使用,验证后显示的提示信息
			* @param {validator}
			*            (optional) 与invalidText一起使用,验证函数
			* @param {defaultValue}
			*            (optional) 默认选中的值
			* @return {Ext.form.TextField} 返回一个默认的文本框
			*/
			createNumberTextField: function (width, labelWidth, name, fieldLabel,
					blankText, disabled, invalidText, validator, defaultValue) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    // var regex = gbicc.util.createRegex('^(-)?[\\d]*(.\\d{0,' +
			    // decimalPrecision + '})?$');
			    // var regexText = '只能输入负号、数字、逗号、小数点后最多' + decimalPrecision + '位';
			    var regex = gbicc.util.createRegex('^(-)?[\\d,]*(.\\d{0,20})?$');
			    var regexText = '只能输入负号、数字、逗号且精度不能超过20位';
			    var textField = new Ext.form.TextField({
			        name: name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        width: width, 
			        disabled: disabled,
			        anchor: form_anchor,
			        regex: regex,
			        value: '',
			        regexText: regexText,
			        labelAlign : 'right',
			        listeners: {
			            blur: function (obj) {
			                obj.setValue(gbicc.util.format.millenarySeparateNonuseDigit(obj
									.getValue()));
			            },
			            focus: function (obj) {
			                obj.setValue(obj.getValue().replace(/\,/g, ''));
			            }
			        }
			    });
			    if (blankText != null) {
			        textField.allowBlank = false;
			        textField.blankText = blankText;
			    }
			    if (validator != null && invalidText != null) {
			        textField.invalidText = invalidText;
			        textField.validator = validator;
			    }
			    if (defaultValue != null) {
			        textField.value = defaultValue;
			    }
				if (labelWidth == null) {
			        textField.labelWidth = labelWidth;
			    }
			    return textField;
			},
			/**
			* 表单-->数字文本框
			* 
			* @param {name}
			*            数字文本框名称(如: minNumber)
			* @param {fieldLabel}
			*            标签显示名(如：手续费最小值)
			* @param {blankText}
			*            (optional)
			*            当数字文本框为空的时候提示的信息.如果此参数不为空,则表示此文本框不允许为空；为null或不填,则表示可以为空.
			* @param {defaultValue}
			*            (optional) 默认选中的值 (如：'1000')
			* @param {disabled}
			*            (optional) 是否可编辑(null/true/false),true 表示不可编辑,默认为false
			* @param {decimalPrecision}
			*            (optional) 小数点的位数，当此属性为null时，默认为4位小数
			* @param {allowNegative}
			*            (optional) 是否允许负数
			* @param {minLength}
			*            (optional) 最小长度
			* @param {maxLength}
			*            (optional) 最大长度
			* @return {Ext.form.NumberField} 返回一个默认的数字文本框
			*/
			createNumberField: function (width, labelWidth, name, fieldLabel, blankText,
					defaultValue, disabled, decimalPrecision, allowNegative, minLength,
					maxLength) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }

			    var numberField = new Ext.form.NumberField({
					id: name,
			        name: name,
			        fieldLabel: fieldLabel,
			        width: width, 
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor

			    });
			    if (name == 'ym2') {
			        numberField.id = name;
			    }
			    if (blankText != null) {
			        numberField.allowBlank = false;
			        numberField.blankText = blankText;
			    }
			    if (disabled != null) {
			        numberField.disabled = disabled;
			    }
			    if (defaultValue != null) {
			        numberField.value = defaultValue;
			    }
			    if (decimalPrecision == null || decimalPrecision < 0) {
			        numberField.decimalPrecision = 2;
			    } else {
			        numberField.decimalPrecision = decimalPrecision;
			    }
			    if (allowNegative != null) {
			        numberField.allowNegative = allowNegative;
			    }
			    if (minLength != null) {
			        numberField.minLength = minLength;
			    }
			    if (maxLength != null) {
			        numberField.maxLength = maxLength;
			    }
				if (labelWidth == null) {
			        numberField.labelWidth = labelWidth;
			    }
			    return numberField;
			},			
			/**
			* 表单-->日期控件
			* 
			* @param {name}
			*            日期控件名称(如: startDate)
			* @param {fieldLabel}
			*            标签显示名(如：开始日期)
			* @param {blankText}
			*            (optional) 当日期控件为空的时候提示的信息.如果此参数不为空,则表示此文本框不允许为空；为null或不填,则表示可以为空.
			* @param {defaultValue}
			*            (optional) 默认选中的值 (如：'2000-01-01')
			* @param {disabled}
			*            (optional) 是否可编辑(null/true/false),true 表示不可编辑,默认为false
			* @return {Ext.form.DateField} 返回一个默认的日期控件
			*/
			createDateField: function (width, labelWidth, name, fieldLabel, blankText,
					defaultValue, disabled) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var dateField = new Ext.form.DateField({
			        name: name,
			        fieldLabel: fieldLabel,
			        width: width, 
			        format: 'Y-m-d',
			        value:new Date(),
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        dateField.allowBlank = false;
			        dateField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        dateField.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        dateField.labelWidth = labelWidth;
			    }
			    return dateField;
			},
			createDateFieldId: function (width, labelWidth, id, fieldLabel, blankText,
					defaultValue, disabled) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var dateField = new Ext.form.DateField({
			        id: id,
			        name:id,
			        fieldLabel: fieldLabel,
			        width: width, 
			        format: 'Y-m-d',
			        value:new Date(),
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        dateField.allowBlank = false;
			        dateField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        dateField.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        dateField.labelWidth = labelWidth;
			    }
			    return dateField;
			},
			createDateFieldId2: function (id, width, labelWidth, name, fieldLabel, blankText,
					defaultValue, disabled) {
			    if (disabled == null) {
			        disabled = false;
			    }
			    var dateField = new Ext.form.DateField({
			    	id: id,
			        name: name,
			        fieldLabel: fieldLabel,
			        width: width, 
			        format: 'Y-m-d',
			        value:new Date(),
			       // value:Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.MONTH,1),"Y-m-d"),//kindle
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        dateField.allowBlank = false;
			        dateField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        dateField.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        dateField.labelWidth = labelWidth;
			    }
			    return dateField;
			},
			createDateFieldId21: function (id, width, labelWidth, name, fieldLabel, blankText,
					defaultValue, disabled) {
			    if (disabled == null) {
			        disabled = false;
			    }
			    var dateField = new Ext.form.DateField({
			    	id: id,
			        name: name,
			        fieldLabel: fieldLabel,
			        width: width, 
			        format: 'Y年m月d日',
			       // value:Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.MONTH,1),"Y-m-d"),//kindle
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        dateField.allowBlank = false;
			        dateField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        dateField.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        dateField.labelWidth = labelWidth;
			    }
			    return dateField;
			},
			createDateFieldId22: function (id, width, labelWidth, name, fieldLabel, blankText,
					defaultValue, disabled) {
			    if (disabled == null) {
			        disabled = false;
			    }
			    var dateField = new Ext.form.DateField({
			    	id: id,
			        name: name,
			        fieldLabel: fieldLabel,
			        width: width, 
			        format: 'Y年m月d日',
			       // value:Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.MONTH,1),"Y-m-d"),//kindle
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor,
					value:new Date()
			    });
			    if (blankText != null) {
			        dateField.allowBlank = false;
			        dateField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        dateField.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        dateField.labelWidth = labelWidth;
			    }
			    return dateField;
			},
			/**
			* 表单-->日期控件
			* 
			* @param {name}
			*            日期控件名称(如: startDate)
			* @param {fieldLabel}
			*            标签显示名(如：开始日期)
			* @param {blankText}
			*            (optional) 当日期控件为空的时候提示的信息.如果此参数不为空,则表示此文本框不允许为空；为null或不填,则表示可以为空.
			* @param {defaultValue}
			*            (optional) 默认选中的值 (如：'2000-01-01 00:00:00')
			* @param {disabled}
			*            (optional) 是否可编辑(null/true/false),true 表示不可编辑,默认为false
			* @return {Ext.form.DateField} 返回一个默认的日期控件
			*/
			createDateField1: function (width, labelWidth, name, fieldLabel, blankText,
					defaultValue, disabled) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var dateField = new Ext.form.DateField({
			        name: name,
			        fieldLabel: fieldLabel,
			        width: width, 
			        format: 'Y-m-d H:i:s',
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        dateField.allowBlank = false;
			        dateField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        dateField.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        dateField.labelWidth = labelWidth;
			    }
			    return dateField;
			},
			/**
			* 表单-->日期控件
			* 
			* @param {name}
			*            日期控件名称(如: startDate)
			* @param {fieldLabel}
			*            标签显示名(如：开始日期)
			* @param {blankText}
			*            (optional) 当日期控件为空的时候提示的信息.如果此参数不为空,则表示此文本框不允许为空；为null或不填,则表示可以为空.
			* @param {defaultValue}
			*            (optional) 默认选中的值 (如：'20000101')
			* @param {disabled}
			*            (optional) 是否可编辑(null/true/false),true 表示不可编辑,默认为false
			* @return {Ext.form.DateField} 返回一个默认的日期控件
			*/
			createDateField2: function (width, labelWidth, name, fieldLabel, blankText, width,
					defaultValue, disabled) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var dateField = new Ext.form.DateField({
			        name: name,
			        id: name,
			        fieldLabel: fieldLabel,
			        width: width, 
			        format: 'Ymd',
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        dateField.allowBlank = false;
			        dateField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        dateField.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        dateField.labelWidth = labelWidth;
			    }
			    return dateField;
			},
			/**
			* 表单-->日期控件
			* 
			* @param {name}
			*            日期控件名称(如: startDate)
			* @param {fieldLabel}
			*            标签显示名(如：开始日期)
			* @param {blankText}
			*            (optional) 当日期控件为空的时候提示的信息.如果此参数不为空,则表示此文本框不允许为空；为null或不填,则表示可以为空.
			* @param {defaultValue}
			*            (optional) 默认选中的值 (如：'200001')
			* @param {disabled}
			*            (optional) 是否可编辑(null/true/false),true 表示不可编辑,默认为false
			* @return {Ext.form.DateField} 返回一个默认的日期控件
			*/
			createDateField3: function (width, labelWidth, name, fieldLabel, blankText, width,
					defaultValue, disabled) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var dateField = new Ext.form.DateField({
			        name: name,
			        id:name,
			        fieldLabel: fieldLabel,
			        width: width, 
			        format: 'Ym',
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        dateField.allowBlank = false;
			        dateField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        dateField.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        dateField.labelWidth = labelWidth;
			    }
			    return dateField;
			},
			createDateFieldId3: function (id, width, labelWidth, name, fieldLabel, blankText, width,
					defaultValue, disabled) {
			    if (disabled == null) {
			        disabled = false;
			    }
			    var dateField = new Ext.form.DateField({
			        name: name,
			        id: id,
			        fieldLabel: fieldLabel,
			        width: width, 
			        format: 'Ym',
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        dateField.allowBlank = false;
			        dateField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        dateField.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        dateField.labelWidth = labelWidth;
			    }
			    return dateField;
			},
			createDateField4: function (width, labelWidth, name, fieldLabel, blankText,
					defaultValue, disabled) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var dateField = new Ext.form.DateField({
			        name: name,
			        fieldLabel: fieldLabel,
			        width: width, 
			        format: 'Ym',
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        dateField.allowBlank = false;
			        dateField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        dateField.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        dateField.labelWidth = labelWidth;
			    }
			    return dateField;
			},
			createDateField5: function (width, labelWidth, name, fieldLabel, blankText, width,
					defaultValue, disabled) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var dateField = new Ext.form.DateField({
			        name: name,
			        id:name,
			        fieldLabel: fieldLabel,
			        width: width, 
			        format: 'Y',
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        dateField.allowBlank = false;
			        dateField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        dateField.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        dateField.labelWidth = labelWidth;
			    }
			    return dateField;
			}
			,
			createDateField51: function (width, labelWidth, name, fieldLabel, blankText, width,
					defaultValue, disabled) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var dateField = new Ext.form.DateField({
			        name: name,
			        id:name,
			        fieldLabel: fieldLabel,
			        width: width, 
			        format: 'Y',
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor,
					maxValue:new Date()	
			    });
			    if (blankText != null) {
			        dateField.allowBlank = false;
			        dateField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        dateField.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        dateField.labelWidth = labelWidth;
			    }
			    return dateField;
			},
			createDateField6: function (width, labelWidth, name, fieldLabel, blankText, width,
					defaultValue, disabled) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var dateField = new Ext.form.DateField({
			        name: name,
			        id:name,
			        fieldLabel: fieldLabel,
			        width: width, 
			        format: 'Y-m-d',
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        anchor: form_anchor
			    });
			    if (blankText != null) {
			        dateField.allowBlank = false;
			        dateField.blankText = blankText;
			    }
			    if (defaultValue != null) {
			        dateField.value = defaultValue;
			    }
			    if (labelWidth == null) {
			        dateField.labelWidth = labelWidth;
			    }
			    return dateField;
			},

			/**
			* 表单-->文本域
			* 
			* @param {name}
			*            日期控件名称(如: startDate)
			* @param {fieldLabel}
			*            标签显示名(如：开始日期)
			* @param {blankText}
			*            (optional) 当文本域为空的时候提示的信息.如果此参数不为空,则表示此文本框不允许为空；为null或不填,则表示可以为空.
			* @param {emptyText}
			*            (optional) 当文本域为空的时候默认显示的提示信息，如：'注：不能超过100个字符'
			* @param {anchor}
			*            (optional) 文本域显示宽度的百分比 (如：'90%')
			* @param {invalidText}
			*            (optional) 与validator一起使用,验证后显示的提示信息
			* @param {validator}
			*            (optional) 与invalidText一起使用,验证函数
			* @param {defaultValue}
			*            (optional) 默认选中的值
			* @param {disabled}
			*            (optional) 是否可编辑(null/true/false),true 表示不可编辑,默认为false
			* @return {Ext.form.TextArea} 返回一个默认的文本域
			*/
			createTextArea: function (width, labelWidth, name, fieldLabel, blankText,
					emptyText, anchor, invalidText, validator, defaultValue, disabled,
					height) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textArea = new Ext.form.TextArea({
			        name: name,
			        id:name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        width: width
			    });
			    if (blankText != null) {
			        textArea.allowBlank = false;
			        textArea.blankText = blankText;
			    }
			    if (emptyText != null) {
			        textArea.emptyText = emptyText;
			    }
			    if (anchor != null) {
			        textArea.anchor = anchor;
			    } else {
			        textArea.anchor = form_anchor;
			    }
			    if (validator != null && invalidText != null) {
			        textArea.invalidText = invalidText;
			        textArea.validator = validator;
			    }
			    if (defaultValue != null) {
			        textArea.value = defaultValue;
			    }
			    if (height != null) {
			        textArea.height = height;
			    } else {
			        textArea.height = 100;
			    }
			    if (labelWidth == null) {
			        textArea.labelWidth = labelWidth;
			    }
			    return textArea;
			},
			createTextArea2: function (id, width, labelWidth, name, fieldLabel, blankText,
					emptyText, anchor, invalidText, validator, defaultValue, disabled,
					height) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textArea = new Ext.form.TextArea({
			    	id: id,
			        name: name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign : 'right',
			        width: width
			    });
			    if (blankText != null) {
			        textArea.allowBlank = false;
			        textArea.blankText = blankText;
			    }
			    if (emptyText != null) {
			        textArea.emptyText = emptyText;
			    }
			    if (anchor != null) {
			        textArea.anchor = anchor;
			    } else {
			        textArea.anchor = form_anchor;
			    }
			    if (validator != null && invalidText != null) {
			        textArea.invalidText = invalidText;
			        textArea.validator = validator;
			    }
			    if (defaultValue != null) {
			        textArea.value = defaultValue;
			    }
			    if (height != null) {
			        textArea.height = height;
			    } else {
			        textArea.height = 100;
			    }
			    if (labelWidth == null) {
			        textArea.labelWidth = labelWidth;
			    }
			    return textArea;
			},
			createTextAreaHeight: function (width, height, labelWidth, name, fieldLabel, blankText,
					emptyText, anchor, invalidText, validator, defaultValue, disabled,
					height) {
			    if (blankText != null) {
			        fieldLabel = "<font color='#FF0000'>*</font>" + fieldLabel;
			    }
			    if (disabled == null) {
			        disabled = false;
			    }
			    var textArea = new Ext.form.TextArea({
			        name: name,
			        fieldLabel: fieldLabel,
			        labelSeparator: form_abelSeparator,
			        disabled: disabled,
			        labelAlign: 'right',
			        width: width
			    });
			    if (blankText != null) {
			        textArea.allowBlank = false;
			        textArea.blankText = blankText;
			    }
			    if (emptyText != null) {
			        textArea.emptyText = emptyText;
			    }
			    if (anchor != null) {
			        textArea.anchor = anchor;
			    } else {
			        textArea.anchor = form_anchor;
			    }
			    if (validator != null && invalidText != null) {
			        textArea.invalidText = invalidText;
			        textArea.validator = validator;
			    }
			    if (defaultValue != null) {
			        textArea.value = defaultValue;
			    }
			    if (height != null) {
			        textArea.height = height;
			    } else {
			        textArea.height = 100;
			    }
			    if (labelWidth == null) {
			        textArea.labelWidth = labelWidth;
			    }
			    return textArea;
			},
			/**
			* 表单-->隐藏域
			* 
			* @param {name}
			*            隐藏域名称(如: id)
			* @param {defaultValue}
			*            (optional) 默认选中的值 (如：'1')
			* @return {Ext.form.Hidden} 返回一个默认的隐藏域
			*/
			createHidden: function (id, name, defaultValue) {
			    var hidden = new Ext.form.Hidden({
			        name: name,
			        id: id
			    });
			    if (defaultValue != null) {
			        hidden.value = defaultValue;
			    }
			    return hidden;
			},
			/**
			* 表单-->按钮
			* 
			* @param {buttonText}
			*            按钮文本 (如：'查询')
			* @param {buttonId}
			*            (optional) 按钮Id (如：'query')
			* @return {Ext.Button} 返回一个按钮
			*/
			createButton: function (buttonText, buttonId, handler) {
			    var button = new Ext.Button({
			        text: buttonText,
			        id: buttonId
			    });
			    if (handler != null && typeof handler == 'function') {
			        button.handler = handler;
			    }
			    if (buttonText == '审核') {
			        button.hidden = true;
			    }
			    return button;
			},
			createButton2: function (buttonText, buttonId, handler) {
			    var button = new Ext.Button({
			        text: buttonText,
			        id: buttonId
			    });
			    if (handler != null && typeof handler == 'function') {
			        button.handler = handler;
			    }
			    return button;
			},
			/**
			* 表单-->查询事件
			* 
			* @param {button}
			*            (string/object) 可以是一个按钮的id，或者是一个按钮对象
			* @param {windowObj}
			*            装载此按钮表单的Ext.Window对象
			* @param {ds}
			* @param {ds}
			*            Ext.data.Store对象
			*/
			addQueryEvent: function (button, windowObj, ds) {
			    var formPanel = windowObj.findByType("form")[0];
			    var buttonObj = findButton(button, formPanel);
			    buttonObj.handler = function () {
			        var formParams = formPanel.form.getValues();
			        if (formParams != null) {
			            formParams.start = 0;
			            formParams.limit = PAGE_NUM_DEFAULT;
			        }
			        ds.load({
			            params: formParams
			        });
			        windowObj.hide();
			    };
			},
			/**
			* 表单-->清空事件
			* 
			* @param {button}
			*            (string/object) 可以是一个按钮的id，或者是一个按钮对象
			* @param {windowObj}
			*            装载此按钮表单的Ext.Window对象
			*/
			addResetEvent: function (button, windowObj) {
			    var formPanel = windowObj.findByType("form")[0];
			    var fieldSet = formPanel.findByType("fieldset")[0];
			    var fieldSetItems = fieldSet.items;
			    var buttonObj = findButton(button, formPanel);
			    buttonObj.handler = function () {
			        for (var i = 0; i < fieldSetItems.length; i++) {
			            fieldSetItems.get(i).reset();
			        }
			    };
			},
			/**
			* 表单-->提交事件
			* 
			* @param {button}
			*            (string/object) 可以是一个按钮的id，或者是一个按钮对象
			* @param {windowObj}
			*            装载此按钮表单的Ext.Window对象
			* @param {ds}
			*            Ext.data.Store对象
			* @param {url}
			*            提交路径 (如：'saveDo.latentClient')
			* @param {params}
			*            (optional) 提交的参数 (如：{ code: '1001',name: '张三' })
			*/
			addDoActionEvent: function (button, windowObj, ds, url,
					params) {
			    var formPanel = windowObj.findByType("form")[0];
			    var buttonObj = findButton(button, formPanel);
			    if (buttonObj == null) {
			        buttonObj = findButton(button, windowObj);
			    }
			    if (params == null) {
			        params = '';
			    }
			    buttonObj.handler = function () {
			        if (formPanel.form.isValid()) {
			            /** 提交表单,返回服务端验证信息,成功后显示成功信息并刷新页面,失败后显示错误信息 */
			            formPanel.form.doAction('submit', {
			                url: url,
			                method: 'post',
			                params: params,
			                success: function (form, action) {
			                    Ext.Msg.alert('操作', action.result.data, function (btn) {
			                        if (btn == 'ok') {
			                            if (ds != null) {
			                                ds.reload();
			                            }
			                        }
			                    });
			                    this.disabled = false;
			                },
			                failure: function (form, action) {
			                    Ext.Msg.alert('操作', action.result.data);
			                    this.disabled = false;
			                }
			            });
			            windowObj.hide();
			        };
			    };
			},
			/**
			* 表单-->删除事件
			* 
			* @param {button}
			*            (string/object) 可以是一个按钮的id，或者是一个按钮对象
			* @param {windowObj}
			*            装载此按钮表单的Ext.Window对象
			* @param {ds}
			*            Ext.data.Store对象
			* @param {url}
			*            提交路径 (如：'saveDo.latentClient')
			* @param {params}
			*            (optional) 提交的参数 (如：{ code: '1001',name: '张三' })
			*/
			deleteActionEvent: function (button, windowObj, ds, url,
					params) {
			    var formPanel = windowObj.findByType("form")[0];
			    var buttonObj = findButton(button, formPanel);
			    if (buttonObj == null) {
			        buttonObj = findButton(button, windowObj);
			    }
			    if (params == null) {
			        params = '';
			    }
			    buttonObj.handler = function () {
			        if (formPanel.form.isValid()) {
			            Ext.MessageBox.confirm("提醒", "确认要删除记录吗？",
							function (btn) {
							    if (btn == "yes") {
							        /** 提交表单,返回服务端验证信息,成功后显示成功信息并刷新页面,失败后显示错误信息 */
							        formPanel.form.doAction('submit', {
							            url: url,
							            method: 'post',
							            waitMsg: "数据删除中，请等待...",
							            params: params,
							            success: function (form, action) {
							                Ext.Msg.alert('操作', action.result.data, function (btn) {
							                    if (btn == 'ok') {
							                        if (ds != null) {
							                            ds.reload();
							                        } else {
							                            grid.getStore().reload();
							                        }
							                    }
							                });
							                this.disabled = false;
							            },
							            failure: function (form, action) {
							                Ext.Msg.alert('操作', action.result.data);
							                this.disabled = false;
							            }
							        });
							    }
							});
			            windowObj.hide();
			        }
			    };
			},
			/**
			* 表单-->没有窗口的表单提交事件
			* 
			* @param {button}
			*            (string/object) 可以是一个按钮的id，或者是一个按钮对象
			* @param {formPanel}
			*            装载此按钮表单的Ext.form.FormPanel对象
			* @param {url}
			*            提交路径 (如：'saveDo.latentClient')
			* @param {params}
			*            (optional) 提交的参数 (如：{ code: '1001',name: '张三' })
			*/
			addDoActionNoWindowEvent: function (button, formPanel,
					url, params) {
			    var buttonObj = findButton(button, formPanel);
			    if (params == null) {
			        params = '';
			    }
			    buttonObj.handler = function () {
			        if (formPanel.form.isValid()) {
			            /** 提交表单,返回服务端验证信息,成功后显示成功信息并刷新页面,失败后显示错误信息 */
			            formPanel.form.doAction('submit', {
			                url: url,
			                method: 'post',
			                waitMsg: "保存中...",
			                params: params,
			                success: function (form, action) {
			                    Ext.Msg.alert('操作', action.result.data);
			                    this.disabled = false;
			                },
			                failure: function (form, action) {
			                    Ext.Msg.alert('操作', action.result.data);
			                    this.disabled = false;
			                }
			            });
			        }
			    };
			},
			/**
			* 表单-->关闭窗口事件，如果FormPanel中没有button的话，到winObj中找
			* 
			* @param {button}
			*            (string/object) 可以是一个按钮的id，或者是一个按钮对象
			* @param {windowObj}
			*            装载此按钮表单的Ext.Window对象
			* @param {ds}
			*            Ext.data.Store对象
			* @return {Ext.Button} 返回一个按钮
			*/
			addCloseEvent: function (button, windowObj) {
			    var formPanel = windowObj.findByType("form")[0];
			    var buttonObj = findButton(button, formPanel);
			    if (buttonObj == null) {
			        buttonObj = findButton(button, windowObj);
			    }
			    buttonObj.handler = function () {
			        windowObj.hide();
			    };
			},		
			/**
			* 创建只有文件上传的表单，并将上传文件的记录（由服务器转化为Json字符串）显示在editGrid中。
			* 
			* @param {editGrid}
			*            Ext.grid.EditorGridPanel对象
			* @param {editds}
			*            Ext.data.Store对象
			* @param {url}
			*            表单提交的路径
			* @param {createRecordFunc}
			*            创建一条显示在editGrid中的一条记录的函数。如：createRecord_zichan var PlantZiChan =
			*            Ext.data.Record.create([ {name: 'qiTaZiChanGouChengXiangMu'},
			*            {name: 'qiTaZiChanGouChengXiangMuDeJinE'} ]); 创建其他资产的构成数据对象
			*            function createRecord_zichan(param){ var plant = new PlantZiChan({
			*            qiTaZiChanGouChengXiangMu: param.qiTaZiChanGouChengXiangMu + '',
			*            qiTaZiChanGouChengXiangMuDeJinE:
			*            param.qiTaZiChanGouChengXiangMuDeJinE + '' }); return plant; }
			* @param {uploadBtnId}
			*            导入按钮的id
			* @param {callFunc}
			*            取得数据后，给表格赋值前进行的操作
			* @return {Ext.FormPanel} 返回一个文件上传的表单
			*/
			createUploadForm: function (editGrid, editds, url,
					createRecordFunc, uploadBtnId, callFunc, instanceId, dictFinance) {
			    var uploadBtn = new Ext.Button({
			        text: '导入数据',
			        type: 'submit',
			        handler: function () {
			            if (uploadForm.form.isValid()) {
			                var upField = uploadForm.form.findField('uploadField');
			                // 如果上传表单不可用，则返回。
			                if (upField.disabled == true) {
			                    return;
			                }
			                if (upField == null || upField.getValue() == ""
									|| (upField.getValue()).indexOf('.xls') == -1) {
			                    Ext.Msg.alert('提醒', "请选择excel文件！");
			                    return;
			                }
			                uploadForm.form.doAction('submit', {
			                    url: url,
			                    method: 'post',
			                    waitMsg: "数据导入中...",
			                    success: function (form, action) {
			                        var params = action.result.data;

			                        if (callFunc != null && typeof callFunc == 'function') {
			                            callFunc(action.result);
			                        }
			                        if (params == null) {
			                            return;
			                        }
			                        // alert(Ext.util.JSON.encode(params));
			                        // 删除原来的数据
			                        editds.data.clear();
			                        // 创建records数组
			                        var records = new Array();
			                        for (var i = 0; i < params.length; i++) {
			                            var newplan;
			                            if (createRecordFunc != null
												&& typeof createRecordFunc == 'function') {
			                                newplan = createRecordFunc(params[i]);

			                            }
			                            records.push(newplan);
			                            // editds.insert(i, newplan); //不能用此方法，数据多的话会让页面加载很慢
			                            // editds.add(newplan); //同上
			                        }
			                        editds.add(records);
			                        // 将数据加到editds.data中
			                        // editds.data.addAll(records);
			                        // 触发事件，让editds数据同步
			                        // editds.fireEvent("add", editds, records,
			                        // params.length);
			                        // editds.fireEvent("datachanged", editds);
			                    },
			                    failure: function (form, action) {
			                        Ext.Msg.alert('操作', action.result.data);
			                    }
			                });
			            }
			        }
			    });
			    if (uploadBtnId != null) {
			        uploadBtn.id = uploadBtnId;
			    }
			    var items = new Array();
			    items.push({
			        columnWidth: .8,
			        layout: 'form',
			        items: [{
			            xtype: 'textfield',
			            name: 'uploadField',
			            fieldLabel: '请选择文件',
			            anchor: '98%',
			            inputType: 'file'
			        }]
			    });
			    items.push({
			        columnWidth: .1,
			        layout: 'form',
			        items: uploadBtn
			    });
			    if (instanceId != null && dictFinance != null) {
			        var datatransBtn = new Ext.Button(
				{
				    text: '接口读取',
				    type: 'submit',
				    handler: function () {
				        uploadForm.form.doAction('submit',
						{
						    url: 'read_datatrans.fund_report?instanceId='
									+ instanceId
									+ '&dictFinance='
									+ dictFinance,
						    waitMsg: "数据读取中...",
						    success: function (form, action) {
						        var params = action.result.data;
						        if (callFunc != null
										&& typeof callFunc == 'function') {
						            callFunc(action.result);
						        }
						        if (params == null
										|| params.length == 0) {
						            // Ext.Msg.alert('操作',
						            // '未取到数据');
						            return;
						        }
						        Ext.MessageBox.confirm('提醒', '确定覆盖现有的值吗？',
									function (btn) {
									    if (btn != 'yes') {
									        return;
									    } else {
									        if (callFunc != null
													&& typeof callFunc == 'function') {
									            callFunc(action.result);
									        }
									        if (!params.length) {
									            return;
									        }
									        if (editds == null) {
									            return;
									        }
									        editds.data.clear();
									        var records = new Array();
									        for (var i = 0; i < params.length; i++) {
									            var newplan;
									            if (createRecordFunc != null
														&& typeof createRecordFunc == 'function') {
									                newplan = createRecordFunc(params[i]);
									            }
									            records.push(newplan);
									        }
									        editds.add(records);
									    }
									});
						    },
						    failure: function (form, action) {
						        Ext.Msg.alert('操作',
											action.result.data);
						    }
						});
				    }
				});
			        items.push({
			            columnWidth: .1,
			            layout: 'form',
			            items: datatransBtn
			        });
			    }
			    var uploadForm = new Ext.FormPanel({
			        frame: true,
			        labelAlign: 'left',
			        labelWidth: 74,
			        border: false,
			        fileUpload: true,
			        layout: 'column',
			        items: items
			    });
			    return uploadForm;
			},
			/**
			* 创建只有文件上传的表单，并将上传文件的记录（由服务器转化为Json字符串）显示在FormPanel中。
			* 
			* @param {formPanel}
			*            Ext.form.FormPanel对象
			* @param {url}
			*            表单提交的路径
			* @param {propertiesArray}
			*            表单元素名称的数组
			* @param {valueCelPropertyArr}
			*            显示值的列名数组
			* @param {uploadBtnId}
			*            导入按钮的id
			* @param {callFunc}
			*            取得数据后，给表单赋值前进行的操作
			* @return {Ext.FormPanel} 返回一个文件上传的表单
			*/
			createUploadFormToPropertyGrid: function (grid, url,
					propertiesArray, valueCelPropertyArr, uploadBtnId, callFunc,
					instanceId, dictFinance) {
			    var uploadForm;
			    var uploadBtn = new Ext.Button(
				{
				    text: '导入数据',
				    type: 'submit',
				    handler: function () {
				        if (uploadForm.form.isValid()) {
				            var upField = uploadForm.form.findField('uploadField');
				            if (upField == null || upField.getValue() == ""
									|| (upField.getValue()).indexOf('.xls') == -1) {
				                Ext.Msg.alert('提醒', "请选择excel文件！");
				                return;
				            }
				            uploadForm.form.doAction('submit',
							{
							    url: url,
							    method: 'post',
							    waitMsg: "数据导入中...",
							    success: function (form, action) {
							        var param = action.result.data;
							        if ((typeof param == 'object')
											&& param.constructor == Array) {
							            param = action.result.data[0];
							        }

							        if (callFunc != null
											&& typeof callFunc == 'function') {
							            callFunc(action.result);
							        }
							        // 给表格的行赋值，隐藏的行不赋值
							        var gridView = grid.getView();
							        for (var i = 0; i < grid.store
											.getCount(); i++) {
							            var htmlElement = gridView
												.getRow(i);
							            if (htmlElement.style.display != 'none') {
							                var rowObj = grid
													.getStore()
													.getAt(i);
							                if (typeof valueCelPropertyArr == 'string') {
							                    eval('rowObj.set("'
														+ valueCelPropertyArr
														+ '", param.'
														+ propertiesArray[i]
														+ ')');
							                } else if ((typeof valueCelPropertyArr == 'object')
													&& valueCelPropertyArr.constructor == Array) {
							                    for (var j = 0; j < valueCelPropertyArr.length; j++) {
							                        var cellData = action.result.data[j];
							                        eval('rowObj.set("'
															+ valueCelPropertyArr[j]
															+ '", cellData.'
															+ propertiesArray[i]
															+ ')');
							                    }
							                }

							                // else if(typeof
							                // valueCelPropertyArr
							                // ==
							                // 'array'){
							                // for(var j=0;
							                // j<valueCelPropertyArr.length;
							                // j++){
							                // eval('rowObj.set("' +
							                // valueCelPropertyArr[j]
							                // + '", param.' +
							                // propertiesArray[i][j]
							                // + ')');
							                // }
							                // }
							            }
							        }
							    },
							    failure: function (form, action) {
							        Ext.Msg.alert('操作',
											action.result.data);
							    }
							});
				        }
				    }
				});
			    if (uploadBtnId != null) {
			        uploadBtn.id = uploadBtnId;
			    }
			    var items = new Array();
			    items.push({
			        columnWidth: .8,
			        layout: 'form',
			        items: [{
			            xtype: 'textfield',
			            name: 'uploadField',
			            fieldLabel: '请选择文件',
			            anchor: '98%',
			            inputType: 'file'
			        }]
			    });
			    items.push({
			        columnWidth: .1,
			        layout: 'form',
			        items: uploadBtn
			    });
			    if (instanceId != null && dictFinance != null) {
			        var datatransBtn = new Ext.Button(
					{
					    text: '接口读取',
					    type: 'submit',
					    handler: function () {
					        if (uploadForm.form.isValid()) {
					            uploadForm.form.doAction('submit',
								{
								    url: 'read_datatrans.fund_report?instanceId='
											+ instanceId
											+ '&dictFinance='
											+ dictFinance,
								    waitMsg: "数据读取中...",
								    success: function (form, action) {
								        if (callFunc != null
												&& typeof callFunc == 'function') {
								            callFunc(action.result);
								        } else {
								            var param = action.result.data;
								            if (param == null) {
								                Ext.Msg.alert('操作',
														'未取到数据');
								                return;
								            }
								            Ext.MessageBox.confirm('提醒', '确定覆盖现有的值吗？',
											function (btn) {
											    if (btn != 'yes') {
											        return;
											    } else {
											        if ((typeof param == 'object')
															&& param.constructor == Array) {
											            param = action.result.data[0];
											        }
											        // 给表格的行赋值，隐藏的行不赋值
											        var gridView = grid
															.getView();
											        for (var i = 0; i < grid.store
															.getCount(); i++) {
											            var htmlElement = gridView
																.getRow(i);
											            if (htmlElement.style.display != 'none') {
											                var rowObj = grid
																	.getStore()
																	.getAt(
																			i);
											                if (typeof valueCelPropertyArr == 'string') {
											                    eval('rowObj.set("'
																		+ valueCelPropertyArr
																		+ '", param.'
																		+ propertiesArray[i]
																		+ ')');
											                } else if ((typeof valueCelPropertyArr == 'object')
																	&& valueCelPropertyArr.constructor == Array) {
											                    for (var j = 0; j < valueCelPropertyArr.length; j++) {
											                        var cellData = action.result.data[j];
											                        eval('rowObj.set("'
																			+ valueCelPropertyArr[j]
																			+ '", cellData.'
																			+ propertiesArray[i]
																			+ ')');
											                    }
											                }
											            }
											        }
											    }
											});
								        }
								    },
								    failure: function (form, action) {
								        Ext.Msg.alert('操作', action.result.data);
								    }
								});
					        }
					    }
					});
			        items.push({
			            columnWidth: .1,
			            layout: 'form',
			            items: datatransBtn
			        });
			    }
			    uploadForm = new Ext.FormPanel({
			        frame: true,
			        labelAlign: 'left',
			        labelWidth: 74,
			        border: false,
			        fileUpload: true,
			        layout: 'column',
			        items: items
			    });
			    return uploadForm;
			},
			/**
			* 创建只有文件上传的表单，并将上传文件的记录（由服务器转化为Json字符串）显示在FormPanel中。
			* 
			* @param {formPanel}
			*            Ext.form.FormPanel对象
			* @param {url}
			*            表单提交的路径
			* @param {propertiesArray}
			*            表单元素名称的数组
			* @param {uploadBtnId}
			*            导入按钮的id
			* @param {callFunc}
			*            取得数据后，给表单赋值前进行的操作
			* @return {Ext.FormPanel} 返回一个文件上传的表单
			*/
			createUploadFormToForm: function (formPanel, url,
					propertiesArray, uploadBtnId, callFunc, instanceId, dictFinance) {
			    var uploadBtn = new Ext.Button({
			        text: '导入数据',
			        type: 'submit',
			        handler: function () {
			            if (uploadForm.form.isValid()) {
			                var upField = uploadForm.form.findField('uploadField');
			                if (upField == null || upField.getValue() == ""
									|| (upField.getValue()).indexOf('.xls') == -1) {
			                    Ext.Msg.alert('提醒', "请选择excel文件！");
			                    return;
			                }
			                uploadForm.form.doAction('submit', {
			                    url: url,
			                    method: 'post',
			                    waitMsg: "数据导入中...",
			                    success: function (form, action) {
			                        //var param = action.result.data[0];
			                        if (callFunc != null && typeof callFunc == 'function') {
			                            callFunc(action.result);
			                        }
			                        for (var i = 0; i < propertiesArray.length; i++) {
			                            var propertyObj = formPanel.form
												.findField(propertiesArray[i]);
			                            if (propertyObj.disabled == false) {
			                                propertyObj.setValue(eval('param.'
													+ propertiesArray[i]));
			                            }
			                            ;
			                        }
			                        formPanel.disabled = false;
			                    },
			                    failure: function (form, action) {
			                        Ext.Msg.alert('操作', action.result.data);
			                    }
			                });
			            }
			        }
			    });
			    if (uploadBtnId != null) {
			        uploadBtn.id = uploadBtnId;
			    }
			    var items = new Array();
			    items.push({
			        columnWidth: .8,
			        layout: 'form',
			        items: [{
			            xtype: 'textfield',
			            name: 'uploadField',
			            fieldLabel: '请选择文件',
			            anchor: '98%',
			            inputType: 'file'
			        }]
			    });
			    items.push({
			        columnWidth: .1,
			        layout: 'form',
			        items: uploadBtn
			    });
			    if (instanceId != null && dictFinance != null) {
			        var datatransBtn = new Ext.Button({
			            text: '接口读取',
			            type: 'submit',
			            handler: function () {
			                uploadForm.form.doAction('submit', {
			                    url: url,
			                    method: 'post',
			                    waitMsg: "数据导入中...",
			                    success: function (form, action) {
			                        //var param = action.result.data[0];
			                        if (callFunc != null && typeof callFunc == 'function') {
			                            callFunc(action.result);
			                        }
			                        for (var i = 0; i < propertiesArray.length; i++) {
			                            var propertyObj = formPanel.form
												.findField(propertiesArray[i]);
			                            if (propertyObj.disabled == false) {
			                                propertyObj.setValue(eval('param.'
													+ propertiesArray[i]));
			                            }
			                            ;
			                        }
			                        formPanel.disabled = false;
			                    },
			                    failure: function (form, action) {
			                        Ext.Msg.alert('操作', action.result.data);
			                    }
			                });
			            }
			        });
			        items.push({
			            columnWidth: .1,
			            layout: 'form',
			            items: datatransBtn
			        });
			    }
			    var uploadForm = new Ext.FormPanel({
			        frame: true,
			        labelAlign: 'left',
			        labelWidth: 74,
			        border: false,
			        fileUpload: true,
			        layout: 'column',
			        items: items
			    });
			    return uploadForm;
			},
			/**
			* 表单-->表单提交/确认页面事件
			* 
			* @param {button}
			*            (string/object) 可以是一个按钮的id，或者是一个按钮对象
			* @param {formPanel}
			*            装载此按钮表单的Ext.form.FormPanel对象
			* @param {url}
			*            提交路径 (如：'saveDo.latentClient')
			* @param {params}
			*            (optional) 提交的参数 (如：{ code: '1001',name: '张三' })
			*/
			formSubmitOrEnsure: function (formPanel, url, params,
					successFun, waitMsg) {
			    if (waitMsg == null) {
			        waitMsg = "保存中...";
			    }
			    formPanel.form.doAction('submit', {
			        url: url,
			        method: 'post',
			        waitMsg: waitMsg,
			        params: params,
			        success: successFun,
			        failure: function (form, action) {
			            Ext.Msg.alert('操作', action.result.data);
			            this.disabled = false;
			        }
			    });
			},
			/**
			* 表单-->清空事件
			* 
			* @param {button}
			*            (string/object) 可以是一个按钮的id，或者是一个按钮对象
			* @param {formPanel}
			*            装载此按钮表单的Ext.FormPanel对象
			*/
			addResetEventByPanel: function (button, formPanel) {
			    var fieldSet = formPanel.findByType("fieldset")[0];
			    var fieldSetItems = fieldSet.items;
			    var buttonObj = findButton(button, formPanel);
			    buttonObj.handler = function () {
			        for (var i = 0; i < fieldSetItems.length; i++) {
			            if (fieldSetItems.get(i).getXType() == 'panel') {
			                fieldSetItems.get(i).items.get(0).reset();
			            }
			            // fieldSetItems.get(i).reset() ;
			        }
			    };
			},
			/**
			* 表单-->查询事件
			* 
			* @param {button}
			*            (string/object) 可以是一个按钮的id，或者是一个按钮对象
			* @param {formPanel}
			*            装载此按钮表单的Ext.FormPanel对象
			* @param {ds}
			* @param {ds}
			*            Ext.data.Store对象
			*/
			addQueryEventByPanel: function (button, formPanel, ds) {
			    var buttonObj = findButton(button, formPanel);
			    buttonObj.handler = function () {
			        if (formPanel.form.isValid()) {
			            var formParams = formPanel.form.getValues();
			            if (formParams != null) {
			                formParams.start = 0;
			                formParams.limit = PAGE_NUM_DEFAULT;
			            }
			            ds.load({
			                params: formParams
			            });
			        }
			    };
			},
			/**
			* 表单-->提交事件 菜单刷新
			* 
			* @param {button}
			*            (string/object) 可以是一个按钮的id，或者是一个按钮对象
			* @param {windowObj}
			*            装载此按钮表单的Ext.Window对象
			* @param {ds}
			*            Ext.data.Store对象
			* @param {url}
			*            提交路径 (如：'saveDo.latentClient')
			* @param {params}
			*            (optional) 提交的参数 (如：{ code: '1001',name: '张三' })
			*/
			addDoActionTreeEvent: function (button, windowObj, tree,
					url, params) {
			    var formPanel = windowObj.findByType("form")[0];
			    var buttonObj = findButton(button, formPanel);
			    if (buttonObj == null) {
			        buttonObj = findButton(button, windowObj);
			    }
			    if (params == null) {
			        params = '';
			    }
			    buttonObj.handler = function () {
			        if (formPanel.form.isValid()) {
			            /** 提交表单,返回服务端验证信息,成功后显示成功信息并刷新页面,失败后显示错误信息 */
			            formPanel.form.doAction('submit', {
			                url: url,
			                method: 'post',
			                params: params,
			                success: function (form, action) {
			                    Ext.Msg.alert('操作', action.result.data, function (btn) {
			                        if (btn == 'ok') {
			                            if (action.result.success == 'true' && ds != null) {
			                                tree.getRootNode().reload();
			                            }
			                        }
			                    });
			                    this.disabled = false;
			                },
			                failure: function (form, action) {
			                    Ext.Msg.alert('操作', action.result.data);
			                    this.disabled = false;
			                }
			            });
			            windowObj.hide();
			        }
			    };
			}
		},
		handler: {
			/**
			* 事件-->粘贴事件
			* 
			* @param {edit_grid}
			*            Ext.grid.EditorGridPanel对象
			* @param {dataIndexArray}
			*            (Array) 数组（包括多个对象，每个对象的属性包括：type：列的类型；dataIndex: 列的名称。）
			*            其中：type的类型可为："number"(数字类型)/"percent"(百分比类型) dataIndexArray的例子： [
			*            {type:"",dataIndex:"bgqmjjzczhqkXiangMu"},
			*            {type:"number",dataIndex:"bgqmjjzczhqkShiZhi"},
			*            {type:"percent",dataIndex:"bgqmjjzczhqkZhanJiJinZiChanZongZhiBiZhong"} ]
			* @return 返回一个事件函数
			*/
			pasteHandler: function (edit_grid, initPlant,
					dataIndexArray) {
			    return function () {
			        var dataText = clipboardData.getData('text');
			        if (dataText) {
			            if (dataText != "") {
			                var rows = dataText.split("\n");
			                //var arrayTemp = new Array();
			                //var totalLength = edit_grid.getStore().data.length;
			                var insertRow = startPasteRow;
			                var insertCol = startPasteCol;
			                var rowsLength = rows.length;
			                if (dataText.substr(dataText.length - 1) == '\n') {
			                    rowsLength--;
			                }
			                for (var iRow = 0; iRow < rowsLength; iRow++) {
			                    var totalLength = edit_grid.getStore().data.length;
			                    var cells = rows[iRow].split("\t");
			                    // 如果粘贴板中的行数大于已有的表格行数，则添加一行
			                    if (initPlant != null && (insertRow + 1) > totalLength) {
			                        var newplan = initPlant();
			                        var length = edit_grid.getStore().data.length;
			                        edit_grid.stopEditing();
			                        edit_grid.getStore().insert(length, newplan);
			                    }
			                    if (initPlant == null && (insertRow + 1) > totalLength) {
			                        break;
			                    } else {
			                        // 把粘贴板中每个单元格的值粘贴到对应的表格中
			                        for (var iCol = 0; iCol < cells.length; iCol++) {
			                            if (cells[iCol] != null) {
			                                var cellValue = cells[iCol];
			                                for (var i = 0; i < dataIndexArray.length; i++) {
			                                    if ((eval(insertCol + iCol)) == i) {
			                                        var obj = dataIndexArray[i];
			                                        if (obj.type == 'number') {
			                                            // 数字类型，去掉","
			                                            cellValue = cellValue.replace(/,/g,
																'');
			                                            if (cellValue != null) {
			                                                cellValue = cellValue.trim();
			                                            }
			                                        } else if (obj.type == 'percent') {
			                                            // 百分比类型，去掉","和"%"
			                                            cellValue = cellValue.replace(/,/g,
																'');
			                                            if (cellValue.indexOf('%') != -1) {
			                                                cellValue = cellValue.replace(
																	/%/g, '');
			                                                if (!isNaN(cellValue)) {
			                                                    cellValue = accDiv(
																		new Number(
																				cellValue),
																		100);
			                                                }
			                                            }
			                                        } else if (obj.type == 'date') {
			                                            cellValue = gbicc.util.format
																.dateFormat(cellValue);
			                                        } else {
			                                            if (cellValue != null) {
			                                                cellValue = cellValue.trim();
			                                            }
			                                        }
			                                        edit_grid.getStore().getAt(insertRow)
															.set(obj.dataIndex, cellValue);
			                                    }
			                                }
			                            }
			                        }
			                    }
			                    insertRow++;
			                }
			            }
			        }
			    };
			},
			/**
			* 事件-->编辑之前，设置单元格的行数和列数
			* 
			* @param {beforeCelNumber}
			*            表格不显示数据的列
			* @return 返回一个事件函数
			*/
			setRowCelHandler: function (beforeCelNumber) {
			    if (beforeCelNumber == null) {
			        beforeCelNumber = 2;
			    }
			    return function (obj) {
			        startPasteRow = obj.row;
			        startPasteCol = eval(obj.column - beforeCelNumber);
			    };
			}
		}
	}	
};
/*
*//**
* 继承CheckboxSelectionModel重写selectRow方法,以避免多选后点击其中一条时的取消其它的选项
* 
* @return CancelCheckboxSelectionModel
*//*
Ext.grid.CancelCheckboxSelectionModel = Ext.extend(
		Ext.grid.CheckboxSelectionModel, {
		    selectRow: function (index, keepExisting, preventViewNotify) {
		        if (this.locked
						|| (index < 0 || index >= this.grid.store.getCount()))
		            return;
		        var r = this.grid.store.getAt(index);
		        if (r
						&& this.fireEvent("beforerowselect", this, index,
								keepExisting, r) !== false) {
		            if (!keepExisting || this.singleSelect) {
		                if (this.isSelected(index) == true) {

		                }
		            }
		            this.selections.add(r);
		            this.last = this.lastActive = index;
		            if (!preventViewNotify) {
		                this.grid.getView().onRowSelect(index);
		            }
		            this.fireEvent("rowselect", this, index, r);
		            this.fireEvent("selectionchange", this);
		        }
		    }
		});


*/
/**
* 根据按钮的id，返回按钮对象，//////////////////有待优化
* 
* @param {button}
*            (string/object) 可以是一个按钮的id，或者是一个按钮对象
* @param {formPanel}
*            装载此按钮的Ext.form.FormPanel对象，也可以是Ext.Window对象
* @return {Ext.Button} 返回一个按钮对象
*/
function findButton(button, containObj) {
    var buttonObj = null;
    if (typeof button == 'string') {
        if (containObj != null && containObj.isXType('form')
				|| containObj.isXType('window')) {
            var buttons = containObj.buttons;
            if (buttons != null) {
                for (var i = 0; i < buttons.length; i++) {
                    if (buttons[i].id == button) {
                        buttonObj = buttons[i];
                        break;
                    };
                };
            }
            if (buttonObj == null) {
                buttonObj = containObj.findById(button);
            };
        } else if (containObj != null && containObj.isXType('grid')) {
            // buttonObj = Ext.get(button);
        };
    } else if (typeof button == 'object') {
        buttonObj = button;
    } else {
        buttonObj = null;
    }
    return buttonObj;
};

/**
  *将多个form表单的数据组合成一个Str参数
  */
function setManyFormDataToStr(resultJson, formJson){
	if(formJson == null || formJson == '{}')
		formJson = '';
	if(formJson.indexOf('{') >= 0)
		formJson = formJson.substr(1);
	if(formJson.indexOf('}') > 0)
		formJson = formJson.substr(0,formJson.indexOf('}'));
	formJson = formJson.replace(/:/g,'=').replace(/,/g,'&').replace(/"/g, '');	
	if(resultJson == null)
		resultJson = '';
	if(resultJson.indexOf('{') > 0)
		resultJson = resultJson.substr(1);
	if(resultJson.indexOf('}') > 0)
		resultJson = resultJson.substr(0,resultJson.indexOf('}')+1);
	resultJson = resultJson.replace(/:/g,'=').replace(/,/g,'&').replace(/"/g, '');	
	
	return resultJson + (formJson != '' ? formJson + '&' : '');
}

/**
  *将多个form表单的数据组合成一个Json
  */
function setManyFormDataToJson(resultJson, formJson){
	if(formJson == null || formJson == '{}')
		formJson = '';
	if(formJson.indexOf('{') >= 0)
		formJson = formJson.substr(1);
	if(formJson.indexOf('}') > 0)
		formJson = formJson.substr(0,formJson.indexOf('}'));
		
	//formJson = formJson.replace(/:/g,'=').replace(/,/g,'&').replace(/"/g, '');	
	if(resultJson == null)
		resultJson = '';
	if(resultJson.indexOf('{') > 0)
		resultJson = resultJson.substr(1);
	if(resultJson.indexOf('}') > 0)
		resultJson = resultJson.substr(0,resultJson.indexOf('}')+1);
	//resultJson = resultJson.replace(/:/g,'=').replace(/,/g,'&').replace(/"/g, '');
	
	return resultJson + (formJson != '' ? ',' + formJson : '');
}

function setStr(str){
	return str.substr(str,str.length -1);
}

/**
  *将多个form表单的数据组合成一个json
  */
function setManyFormDataToJson(resultJson, formJson){
	if(formJson == null || formJson == '{}')
		formJson = '';
	if(formJson.indexOf('{') >= 0)
		formJson = formJson.substr(1);
	if(formJson.indexOf('}') > 0)
		formJson = formJson.substr(0,formJson.indexOf('}'));		
	if(resultJson == null)
		resultJson = '';
	if(resultJson.indexOf('{') > 0)
		resultJson = resultJson.substr(1);
	if(resultJson.indexOf('}') > 0)
		resultJson = resultJson.substr(0,resultJson.indexOf('}')+1);
	
	return resultJson + (formJson != '' ? formJson + ',' : '');
}

function setStrToJson(jsonStr){
	return "{" +jsonStr.substr(jsonStr,jsonStr.length -1)+"}";
}

function toUnicode(str){
	return unescape(str.replace(/\\/g, "%"));
}


function _stopIt(e){
		if(e.returnValue){
			e.returnValue = false ;
		}
		if(e.preventDefault ){
			e.preventDefault();
		}				

		return false;
}

//end
