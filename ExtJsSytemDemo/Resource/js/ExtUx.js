///<reference path="../../extjs/ext-all-debug.js">

Ext.define('Ext.ng.Toolbar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.ngToolbar', //别名,可通过设置xtype构建,或者通过Ext.widget()方法构建         
	pageSize: 20,
	itemWidth: 60,
	rightName: "", //权限名称
	ngbuttons: [],   //按钮
	//候选按钮
	candidateButtons: [{ id: "add", text: "新增", width: this.itemWidth, iconCls: "icon-New" },
							   { id: "edit", text: "修改", width: this.itemWidth, iconCls: "icon-Edit" },
							   { id: "delete", text: "删除", width: this.itemWidth, iconCls: "icon-delete" },
							   { id: "view", text: "查看", width: this.itemWidth, iconCls: "icon-View" },
							   { id: "save", text: "保存", width: this.itemWidth, iconCls: "icon-save" },
							   { id: "query", text: "查询", width: this.itemWidth, iconCls: "icon-Query" },
							   { id: "refresh", text: "刷新", width: this.itemWidth, iconCls: "icon-Refresh" },
							   { id: "clear", text: "清空", width: this.itemWidth, iconCls: "icon-Clear" },
							   { id: "copy", text: "数据拷贝", width: this.itemWidth, iconCls: "icon-Copy" },
							   { id: "import", text: "导入", width: this.itemWidth, iconCls: "icon-Import" },
							   { id: "export", text: "导出", width: this.itemWidth, iconCls: "icon-Export" },
							   { id: "create", text: "生成", width: this.itemWidth, iconCls: "icon-create" },
							   { id: "verify", text: "审核", width: this.itemWidth, iconCls: "icon-Verify" },
							   { id: "valid", text: "审批", width: this.itemWidth, iconCls: "icon-Valid" },
							   { id: "unvalid", text: "去审批", width: this.itemWidth, iconCls: "icon-Unvalid" },
							   { id: "addrow", text: "增行", width: this.itemWidth, iconCls: "icon-AddRow" },
							   { id: "deleterow", text: "删行", width: this.itemWidth, iconCls: "icon-DeleteRow" },
							   { id: "assign", text: "分配", width: this.itemWidth, iconCls: "icon-Assign" },
							   { id: "config", text: "配置", width: this.itemWidth, iconCls: "icon-Setup" },
							   { id: "compute", text: "计算", width: this.itemWidth, iconCls: "icon-Compute" },
							   { id: "location", text: "定位", width: this.itemWidth, iconCls: "icon-Location" },
							   { id: "subbill", text: "下级业务", width: this.itemWidth, iconCls: "icon-Backbill" },
							   { id: "relabill", text: "相关单据", width: this.itemWidth, iconCls: "icon-Relabill" },
							   { id: "check", text: "送审", width: this.itemWidth, iconCls: "icon-Check" },
							   { id: "checkview", text: "送审查看", width: this.itemWidth, iconCls: "icon-CheckView" },
							   { id: "history", text: "送审历史", width: this.itemWidth, iconCls: "icon-History" },
							   { id: "ok", text: "确认", width: this.itemWidth, iconCls: "icon-Confirm" },
							   { id: "cancel", text: "取消", width: this.itemWidth, iconCls: "icon-Cancel" },
							   { id: "help", text: "帮助", width: this.itemWidth, iconCls: "icon-Help" },
							   { id: "print", text: "打印", width: this.itemWidth, iconCls: "icon-Print" },
							   { id: "exit", text: "退出", width: this.itemWidth, iconCls: "icon-Exit" },
							   { id: "back", text: "返回", width: this.itemWidth, iconCls: "icon-back" },
							   { id: "editrow", text: "修改", width: this.itemWidth, iconCls: "icon-EditRow" },
							   { id: "first", text: "首", width: this.itemWidth, iconCls: "icon-Firstrec" },
							   { id: "pre", text: "前", width: this.itemWidth, iconCls: "icon-PriorRec" },
							   { id: "next", text: "后", width: this.itemWidth, iconCls: "icon-NextRec" },
							   { id: "last", text: "尾", width: this.itemWidth, iconCls: "icon-LastRec" },
							   { id: "deal", text: "处理", width: this.itemWidth, iconCls: "icon-Operate" },
							   { id: "note", text: "记事本", width: this.itemWidth, iconCls: "icon-Note" },
							   { id: "orgselect", text: "组织选择", width: this.itemWidth, iconCls: "icon-Boo" },
							   { id: "addbrother", text: "同级增加", width: this.itemWidth, iconCls: "icon-AddBrother" },
							   { id: "addchild", text: "下级增加", width: this.itemWidth, iconCls: "icon-AddChild" },
							   { id: "attachment", text: "附件", width: this.itemWidth, iconCls: "icon-Attachment" },
							   { id: "hide", text: "隐藏", width: this.itemWidth, iconCls: "icon-Close" },
							   { id: "close", text: "关闭", width: this.itemWidth, iconCls: "icon-Close" }
							   ],
	initComponent: function () {
		this.border = false;
		this.height = 26;
		this.minSize = 26;
		this.maxSize = 26;
		//Ext.Toolbar.superclass.initComponent.call(this);
		this.callParent();

		this.on("beforerender", this.beforeRender); //控制权限
		this.createButton(); //创建按钮    

		var clostbtn = this.get('close');
		if (clostbtn) {
			this.get('close').addEvents('beforeclose'); //添加关闭前事件
			this.get('close').on('click', this.closeHanler);
		}
	},

	createButton: function () {
		var menus = [], pageId = window.location.pathname.replace(/[\/\.]/g, ''), hideBtns = {}, chkflg = true;
		//Ext.Ajax.request({
		//	url: C_ROOT + 'SUP/LayoutLog/GetToolBarData',
		//	async: false,
		//	params: { PageId: pageId },
		//	success: function (res, opts) {
		//		if (res.responseText.length > 0) {
		//			hideBtns = Ext.JSON.decode(Ext.JSON.decode(res.responseText).Value);
		//		}
		//	}
		//});
		for (var i = 0; i < this.ngbuttons.length; i++) {
			chkflg = true;
			var button = this.ngbuttons[i];
			var tmpBtn;
			if (button === '->') {
				this.add({ xtype: 'tbfill' });
				menus.push({ xtype: 'menuseparator' });
				continue;
			}
			else if (button === '-') {
				this.add({ xtype: 'tbseparator' });
				menus.push({ xtype: 'menuseparator' });
				continue;
			}

			var stdbutton;
			if (typeof (button) == "object") {

				if (button.groupitem) {//是下拉分组
					var menu = Ext.create('Ext.menu.Menu', {});
					var mu = [];
					for (var j = 0; j < button.items.length; j++) {
						chkflg = true;
						var subbotton = button.items[j];
						if (subbotton.id) {
							tempbutton = this.findButton(subbotton.id);
							if (tempbutton) {
								if (subbotton.text) {
									tempbutton.text = subbotton.text;
								}
								if (subbotton.iconCls) {
									tempbutton.iconCls = subbotton.iconCls;
								}
								tmpBtn = menu.add(tempbutton);
								if (hideBtns[tmpBtn.id] === 1) { tmpBtn.hide(); chkflg = false; }
								mu.push({ text: tempbutton.text, checked: chkflg, targetBtnID: tmpBtn.id, checkHandler: this.onItemClick });
							}
							else {//object,自定义的按钮
								if (typeof (subbotton) == "object") {
									var tempbutton = new Object();
									if (subbotton.text) {
										tempbutton.text = subbotton.text;
									}
									if (subbotton.iconCls) {
										tempbutton.iconCls = subbotton.iconCls;
									}
									tempbutton.id = subbotton.id;   
									tmpBtn = menu.add(tempbutton);
									if (hideBtns[tmpBtn.id] === 1) { tmpBtn.hide(); chkflg = false; }
									mu.push({ text: tempbutton.text, checked: chkflg, targetBtnID: tmpBtn.id, checkHandler: this.onItemClick });
								}
							}
						}
						else {
							tempbutton = this.findButton(subbotton); //ngbotton的id
							tmpBtn = menu.add(tempbutton);
							if (hideBtns[tmpBtn.id] === 1) { tmpBtn.hide(); chkflg = false; }
							mu.push({ text: tempbutton.text, checked: chkflg, targetBtnID: tmpBtn.id, checkHandler: this.onItemClick });
						}
					}
					button.menu = menu;
					tmpBtn = this.add(button);
					if (hideBtns[tmpBtn.id] === 1) { tmpBtn.hide(); chkflg = false; }
					menus.push({ text: button.text, checked: chkflg, targetBtnID: tmpBtn.id, checkHandler: this.onItemClick, menu: mu });
				}
				else {
					if (button.id) {
						stdbutton = this.findButton(button.id);
						if (stdbutton) {
							if (button.text) {
								stdbutton.text = button.text;
							}
							if (button.iconCls) {
								stdbutton.iconCls = button.iconCls;
							}
						}
					}

					if (stdbutton) {
						tmpBtn = this.add(stdbutton);
						if (hideBtns[tmpBtn.id] === 1) { tmpBtn.hide(); chkflg = false; }
						menus.push({ text: stdbutton.text, checked: chkflg, targetBtnID: tmpBtn.id, checkHandler: this.onItemClick });
					}
					else {
						tmpBtn = this.add(button); //标准按钮列表没找到
						if (hideBtns[tmpBtn.id] === 1) { tmpBtn.hide(); chkflg = false; }
						menus.push({ text: button.text, checked: chkflg, targetBtnID: tmpBtn.id, checkHandler: this.onItemClick });
					}
				}
			}
			else {
				stdbutton = this.findButton(button); //字符串

				if (stdbutton) {
					tmpBtn = this.add(stdbutton);
					if (hideBtns[tmpBtn.id] === 1) { tmpBtn.hide(); chkflg = false; }
					menus.push({ text: stdbutton.text, checked: chkflg, targetBtnID: tmpBtn.id, checkHandler: this.onItemClick });
				}
			}
		}
		if (this.items.length > 0) {
			var mCtl = this.add({ text: '', width: 14, style: "Opacity:0", margin: "-2 0 -2 -8", padding: "5 5 5 0", menu: menus, listeners: {
				mouseover: function () {
					this.el.setOpacity(100);
				},
				mouseout: function () {
					if (!this.menu.isVisible()) {
						this.el.setOpacity(0);
					}
				}
			}
			});
			mCtl.menu.mCtl = mCtl;
			mCtl.menu.pageId = pageId;
			mCtl.menu.rawHideBtns = hideBtns;
			mCtl.menu.on("beforehide", this.onBeforeMenuHide);
		}
	},

	findButton: function (buttonid) {
		var items = this.candidateButtons;
		for (var i = 0; i < items.length; i++) {
			var btn = items[i];

			if ((buttonid === btn.id) || ((btn.id == undefined) && (buttonid === btn))) {
				return btn;
			}
		}
	},

	beforeRender: function (toolbar) {
		//alert(this.items.keys.toString());

		var me = this;

		//

		if (!toolbar) return; //这个事件会被触发两次

		if (me.rightName) {
			//按钮权限控制
			Ext.Ajax.request({
				url: C_ROOT + 'SUP/PageRight/GetNoRightsButtons?pageName=' + me.rightName,
				params: { rightname: me.rightName },
				success: function (response, opts) {

					var disablebtn = response.responseText;

					//alert(disablebtn);

					var arr = disablebtn.split(',');
					for (var i = 0; i < arr.length; i++) {
						var btn = me.items.get(arr[i]);
						if (btn) {
							if (btn.disable) {
								btn.disable();
							}
						}
						else {
							btn = Ext.getCmp(arr[i]); //分组下面的按钮
							if (btn) {
								if (btn.disable) {
									btn.disable();
								}
							}
						}

						//this.get(arr[i]).disable();
					}
				}
			});
		}
	},

	doLoad: function (start) {
		this.AF.OpenLoadMask(500);
		this.load.params = this.load.params || {};
		this.load.params.rows = this.pageSize;
		this.load.params.startRow = start;
		Ext.applyIf(this.load.params, { custom: this.AF.getCustom() });
		var oldsecc = this.load.success;

		this.load.success = function (res, opts) {

			oldsecc(res, opts);
			this.AF.CloseLoadMask();
			var obj = Ext.decode(res.responseText);
			if (obj.totalRows)
				this.AF.totalCount = obj.totalRows;
			else if (obj.Record)
				this.AF.totalCount = obj.Record.length;

			//            this.onLoad(this.load.params)
		} .createDelegate(this);

		if (this.fireEvent('beforechange', this, this.load.params) !== false) {
			Ext.Ajax.request(this.load);
		}
	},

	get: function (id) {
		var button = this.items.get(id);

		if (!button) {
			button = Ext.getCmp(id);
		}
		return button;
	},

	closeHanler: function () {

		if (this.fireEvent('beforeclose')) {
			$CloseTab();
		}

	},

	onItemClick: function (el, tf) {
		if (el.targetBtnID) {
			var btn = Ext.getCmp(el.targetBtnID);
			if (btn) {
				btn.setVisible(tf);
				if (tf) {
					if (el.parentMenu && el.parentMenu.parentItem) {
						if (el.parentMenu.parentItem.checked != tf) {
							el.parentMenu.parentItem.setChecked(tf);
						}
					}
				}
				else {
					if (el.parentMenu && el.parentMenu.parentItem) {
						if (el.parentMenu.query("[checked=true]").length == 0) {
							if (el.parentMenu.parentItem.checked != tf) {
								el.parentMenu.parentItem.setChecked(tf);
							}
						}
					}
				}
				if (el.menu) {
					if (tf && el.menu.query("[checked=true]").length > 0) { return; }
					Ext.Array.each(el.menu.items.items, function (c) {
						if (c.checked != tf) {
							c.setChecked(tf);
						}
					});
				}
			}
		}
	},

	onBeforeMenuHide: function (m) {
		m.mCtl.el.setOpacity(0);
		var hideBtns = new Object();
		var tmpBtns = m.query("[checked=false]");
		Ext.Array.each(tmpBtns, function (btn) {
			if (btn.targetBtnID) {
				hideBtns[btn.targetBtnID] = 1;
			}
		});
		if (JSON.stringify(m.rawHideBtns) === JSON.stringify(hideBtns)) {
			//            alert("当前值与原始值相同");
			return;
		}
		Ext.Ajax.request({
			url: C_ROOT + 'SUP/LayoutLog/SetToolBarData',
			params: { PageId: m.pageId, HideBtns: JSON.stringify(hideBtns) },
			success: function (res, opts) {
			}
		});
	}

});

Ext.define('Ext.ng.FormPanel', {
	extend: 'Ext.form.Panel',
	alias: 'widget.ngFormPanel', //别名,可通过设置xtype构建,或者通过Ext.widget()方法构建         
	initComponent: function () {
		this.callParent();
		var me = this;
		var otype = me.otype;

		if (!me.border) {
			me.style = { borderColor: 'transparent', backgroundColor: 'transparent' };
		}

		//form变为只读
		if (otype === 'view') {
			var fields = me.getForm().getFields().items;
			for (var i = 0; i < fields.length; i++) {
				var field = fields[i];              
				field.readOnly = true;
				//                if (field.setReadOnly) {
				//                    field.setReadOnly(true);
				//                    //field.setDisabled(true);                       
				//                    field.el.down('input').setStyle({ backgroundImage: 'none', backgroundColor: '#eaeaea' });
				//                }
			}
		}



	},
	getFormData: function () {
		var me = this;
		var json = GetExtJsFormData(me, me.buskey, me.otype);

		return json;
	},
	isValid: function () {
		var me = this;
		var valid = true;

		var fields = me.getForm().getFields().items;
		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
			//
			if (field.isValid() == false) {
				valid = false;
				//alert('【' + field.fieldLabel + '】输入不合法:' + field.activeErrors);

				//NG2.Msg.Error('[' + field.fieldLabel + ']输入不合法:' + field.activeErrors);

				Ext.create('Ext.ng.MessageBox').Error('[' + field.fieldLabel + ']输入不合法:' + field.activeErrors);

				field.focus();
				break;
			}
		}

		return valid;
	}
});

Ext.define('Ext.ng.QueryPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ngQueryPanel',
    region: 'north',
    autoHeight: true,
    frame: true,
    border: false,
    columnsPerRow: 4,
    hidePanel: true,
    queryAutoLoad: true, //自动load
    bodyStyle: 'padding:10px 10px 0px 10px',
    fieldDefaults: {
        labelWidth: 80,
        anchor: '100%',
        margin: '0 10 5 0',
        msgTarget: 'side'
    },
    beforeSearch: Ext.emptyFn,
    defaults: {
        anchor: '100%'
    },
    buttons: [{ xtype: "checkbox", boxLabel: '记忆搜索', name: 'QueryPanel_checkbox_rembname', inputValue: '1', id: 'QueryPanel_checkbox_rember', margin: '0 0 0 6' }, "->",
			  { text: "查 询", iconCls: 'icon-Query' }, { text: "清 空", iconCls: 'icon-Clear' },
			  { xtype: 'label', text: '', margin: '0 0 0 20'}],
    initComponent: function () {
        var me = this;
        var store = new Object();
        if (!me.pageid) {
            me.pageid = window.location.pathname.replace(/[\/\.]/g, '');
        }
        //#region button 区域
        me.buttons[3].handler = function () {
            var formdata = me.getForm();
            var items = formdata.getFields().items;
            Ext.Array.each(items, function (f) {
                if (f.id == "QueryPanel_checkbox_rember") { //记忆搜索选择框
                    f.setValue("0");
                }
                else {
                    f.setValue("");
                }
            });
        };
        me.buttons[2].handler = function () {
            if (me.beforeSearch() === false) {
                return;
            }
            me.searchEvent(store);
        };
        if (me.toolbar) {
            var index = (function () {
                var keys = me.toolbar.items.keys;
                for (var i = 0; i < keys.length; i++) {
                    if (keys[i].indexOf("tbfill-") === 0) {
                        return i + 1;
                    }
                }
                return keys.length;
            })();
            me.toolbar.insert(index, {
                id: 'hidden_Query',
                iconCls: me.hidePanel ? 'icon-unfold' : 'icon-fold',
                text: me.hidePanel ? '显示' : '隐藏',
                handler: function () {
                    if (this.iconCls == 'icon-unfold') {
                        me.show();
                        this.setIconCls('icon-fold');
                        this.setText("隐藏");
                        if (!me.isBindCombox) {
                            me.isBindCombox = true;
                            BatchBindCombox(me.getForm().getFields().items);
                        }
                    }
                    else {
                        me.hide();
                        this.setIconCls('icon-unfold');
                        this.setText("显示");
                    }
                }
            });
            if (me.hidePanel) { me.hide(); }
        }
        //#endregion

        //#region 生成查询区
        var columns = new Array();
        var totalColumns = 0;

        var newColumns = [];
        if (me.grid) {
            newColumns = Ext.clone(me.grid.columns);
            store = me.grid.store;
        }
        if (me.queryCtl) {
            var queryCtlCount = me.queryCtl.length;
            for (var i = 0; i < queryCtlCount; i++) {
                var col = Ext.clone(me.queryCtl[i]);
                var column = new Object();
                column.queryCtl = col;
                column.header = col.header;
                column.dataIndex = col.dataIndex;
                column.isNeedQueryField = true;
                delete column.queryCtl.header;
                delete column.queryCtl.dataIndex;
                newColumns.push(column);
            }
        }

        if (newColumns.length > 0) {
            //预处理列
            var columnsCount = newColumns.length;
            for (var i = 0; i < columnsCount; i++) {
                var column = newColumns[i];

                if (column.queryCtl && column.queryCtl.colspan) {
                    totalColumns += column.queryCtl.colspan;
                }
                else {
                    totalColumns++;
                }

                //if (column.hidden || !column.isNeedQueryField || column.$className === 'Ext.grid.RowNumberer') {
                if (!column.isNeedQueryField || column.$className === 'Ext.grid.RowNumberer') {
                    continue; //隐藏列,行号，或者非查询列跳过
                }

                var flag = false;
                if (column.queryCtl) {
                    if ((column.queryCtl.xtype === 'datefield' || column.queryCtl.xtype === 'numberfield') && column.queryCtl.regionQeury != false) {
                        flag = true;
                    }
                    else {
                        flag = column.queryCtl.regionQeury;
                    }
                }
                //数字或者日期列
                if (flag) {

                    var lowColumn = new Object(); //Ext.clone(column);
                    for (var p in column) {

                        if (p === 'text') {
                            lowColumn.text = column.text + '(下限)';
                        }
                        else if (p === 'dataIndex') {
                            if (column.queryCtl.xtype === 'datefield') {
                                lowColumn.dataIndex = column.dataIndex + '*date*ngLow'; //修改上限字段名称,日期字段:date
                            }
                            else if (column.queryCtl.xtype === 'numberfield') {
                                lowColumn.dataIndex = column.dataIndex + '*num*ngLow'; //修改上限字段名称，数字字段:num
                            }
                            else {
                                lowColumn.dataIndex = column.dataIndex + '*char*ngLow'; //修改上限字段名称，字符字段:num
                            }
                        }
                        else {
                            lowColumn[p] = column[p];
                        }
                    }
                    columns.push(lowColumn);

                    var upColumn = new Object(); //Ext.clone(column);
                    for (var p in column) {

                        if (p === 'text') {
                            upColumn.text = column.text + '(上限)';
                        }
                        else if (p === 'dataIndex') {
                            if (column.queryCtl.xtype === 'datefield') {
                                upColumn.dataIndex = column.dataIndex + '*date*ngUP'; //修改上限字段名称
                            }
                            else if (column.queryCtl.xtype === 'numberfield') {
                                upColumn.dataIndex = column.dataIndex + '*num*ngUP'; //修改上限字段名称
                            }
                            else {
                                upColumn.dataIndex = column.dataIndex + '*char*ngUP'; //修改上限字段名称
                            }
                        }
                        else {
                            upColumn[p] = column[p];
                        }
                    }
                    columns.push(upColumn);
                }
                else {
                    columns.push(column);
                }
            }
        }

        var cols; //按一行三列分开
        var columnWith;

        //默认的
        if (!me.columnsPerRow) {
            cols = 4; //按一行四列分开
            columnWith = .25;
            if (columns.length < 6) {
                cols = 2; //小于6行就两列
                columnWith = .45;
            }
        }
        else {
            cols = me.columnsPerRow;
            switch (cols) {
                case 1:
                case 2: columnWith = 0.5; break;
                case 3: columnWith = 0.333; break;
                case 4: columnWith = 0.25; break;
                default: columnWith = 0.25;
            }
        }

        var rows = Math.ceil(totalColumns / cols); //计算行数

        var index = 0;
        var outarr = new Array();
        for (var i = 0; i < rows; i++) {
            var outobj = new Object();
            outobj.xtype = 'container';
            outobj.layout = 'column';
            outobj.border = false;
            var inarr = new Array();

            for (var j = 0; j < cols; ) {
                if (index >= columns.length) {
                    break; //超界
                }

                var column = columns[index];
                index++;
                var inItems = new Object();

                var tempColumnWith = columnWith;

                if (column.queryCtl && column.queryCtl.colspan) {
                    tempColumnWith *= column.queryCtl.colspan;
                    j += column.queryCtl.colspan;
                }
                else {
                    j++;
                }

                inItems.xtype = 'container';
                inItems.columnWidth = tempColumnWith; //.3;
                inItems.layout = 'anchor', //'form';
				inItems.border = false

                var field = new Object();

                if (column.queryCtl) {
                    field = Ext.clone(column.queryCtl); //深拷贝
                }
                else {
                    field.xtype = 'textfield'; //默认的控件是文本框
                }

                var theName = column.dataIndex;
                if (column.queryCtl && column.queryCtl.name) {
                    theName = column.queryCtl.name;
                }

                var obj = { fieldLabel: column.header || column.text, name: theName };
                Ext.apply(field, obj); //修正名称,字段值      

                inItems.items = [field];
                inarr.push(inItems);
            }
            outobj.items = inarr;
            outarr.push(outobj);
        }
        me.items = outarr;
        //#endregion

        this.callParent();

        //#region 根据记忆给查询区赋值
        Ext.Ajax.request({
            url: C_ROOT + 'SUP/QueryPanel/GetQueryPanelData',
            async: true,
            params: { PageId: me.pageid },
            success: function (res, opts) {
                var data = Ext.JSON.decode(res.responseText);
                var formdata = me.getForm();
                var items = formdata.getFields().items;
                if (!data.reembersql || data.reembersql.length == 0) {

                    if (me.queryAutoLoad) {
                        store.load();
                    }

                    Ext.Array.each(items, function (f) {
                        me.bindKeyEvent(f.id, store);
                    });
                }
                else {
                    var rembstr = Ext.JSON.decode(data.remeberstr);
                    store.queryObj = { 'queryfilter': data.remeberstr };
                    if (me.queryAutoLoad) {
                        store.load();
                    }
                    Ext.Array.each(items, function (f) {
                        if (f.id == "QueryPanel_checkbox_rember") { //记忆搜索选择框
                            f.setValue("1");
                        }
                        else {
                            if (rembstr[f.name].length > 0) {
                                f.setValue(rembstr[f.name]);
                            }
                            me.bindKeyEvent(f.id, store);
                        }
                    });
                    if ((!me.hidePanel || !me.toolbar) && !me.isBindCombox) {
                        me.isBindCombox = true;
                        BatchBindCombox(me.getForm().getFields().items);
                    }
                }
            }
        });
        //#endregion
    },
    searchEvent: function (store) {
        var me = this;
        var chk = Ext.getCmp("QueryPanel_checkbox_rember");
        var data = me.getForm().getValues();
        delete data.QueryPanel_checkbox_rembname; ;   //过滤掉记忆搜索
        store.currentPage = 1;
        if (store.queryObj) {
            Ext.apply(store.queryObj, { 'queryfilter': JSON.stringify(data) });
        }
        else {
            store.queryObj = { 'queryfilter': JSON.stringify(data) };
        }

        store.cachePageData = false;
        store.load();
        store.cachePageData = true;
        if (chk.checked) {
            Ext.Ajax.request({
                url: C_ROOT + 'SUP/QueryPanel/SetQueryPanelData',
                params: { PageId: me.pageid, ClientJsonString: JSON.stringify(data) },
                success: function (res, opts) {
                }
            });
        }
    },
    bindKeyEvent: function (cid, store) {
        var me = this;
        new Ext.KeyMap(cid, [{
            key: [10, 13],
            fn: function () { me.searchEvent(store); }
        }]);
    }
});

Ext.define('Ext.ng.TableLayoutForm', {
    extend: 'Ext.ng.FormPanel', //'Ext.form.Panel',
    alias: 'widget.ngTableLayoutForm', //别名,可通过设置xtype构建,或者通过Ext.widget()方法构建 
    region: 'north',
    autoHeight: true,
    frame: true,
    border: false,
    bodyStyle: 'padding:5px',
    //layout: 'form',//默认是auto    
    fieldDefaults: {
        //labelAlign: 'right', //'top',
        labelWidth: 60,
        anchor: '100%',
        margin: '3 10 3 0',
        msgTarget: 'side'
    },
    initComponent: function () {
        var me = this;

        if (me.fields && me.fields.length > 0) {
            me.items = me.buildTableLayout(me.fields, me.columnsPerRow);
        }

        this.callParent();

    },
    buildTableLayout: function (fields, columnsPerRow) {
        var me = this;

        //debugger;

        var items = fields; //me.fields; //me.items; //所有控件
        var totalColumns = 0;

        for (var i = 0; i < fields.length; i++) {

            var tempItem = fields[i];
            if (tempItem.hidden) continue;
            if (tempItem.colspan) {
                totalColumns += tempItem.colspan;
            }
            else {
                totalColumns++;
            }
            //items.push(tempItem);
        }

        var cols; //默认按一行三列分开
        var columnWith;
        if (!columnsPerRow) {

            cols = 3; //默认按一行三列分开
            columnWith = .3;
            if (items) {
                if (items.length < 6) {
                    cols = 2; //小于6行就两列
                    columnWith = .45;
                }
            }
        }
        else {

            cols = columnsPerRow; //me.columnsPerRow;
            switch (cols) {
                case 1: columnWith = 0.9; break;
                case 2: columnWith = 0.49; break;
                case 3: columnWith = 0.33; break;
                case 4: columnWith = 0.25; break;
                case 5: columnWith = 0.2; break;
                case 6: columnWith = 0.16; break;
                case 7: columnWith = 0.14; break;
                case 8: columnWith = 0.124; break;
                default: columnWith = 0.33;
            }
        }

        var rows = Math.ceil(totalColumns / cols); //计算行数

        var index = 0;
        var outarr = new Array();
        for (var i = 0; i < rows; i++) {

            var outobj = new Object();
            outobj.xtype = 'container';
            outobj.layout = 'column';
            outobj.border = false;

            // outobj.defaults = {
            //     style: { paddingRight: '10px' }
            //  };

            var inarr = new Array();
            for (var j = 0; j < cols; ) {

                if (index >= items.length) {
                    break; //超界
                }
                var item = items[index];
                index++;
                if (item.hidden) continue;

                var tempColumnWith = columnWith;
                if (item && item.colspan) {
                    tempColumnWith *= item.colspan;
                    j += item.colspan;
                }
                else {
                    j++;
                }

                var inItems = new Object();
                inItems.xtype = 'container';
                inItems.columnWidth = tempColumnWith; //.3;
                inItems.layout = 'anchor', //'form';
                //inItems.layout = 'form', //'';
				inItems.border = false

                inItems.items = [item];
                inarr.push(inItems);
            }
            outobj.items = inarr;
            outarr.push(outobj);
        }
        //me.items = outarr;

        return outarr;
    }

});

Ext.define('Ext.ng.FieldSetForm', {
	extend: 'Ext.ng.FormPanel',
	alias: 'widget.ngFieldSetForm', //别名,可通过设置xtype构建,或者通过Ext.widget()方法构建 
	region: 'north',
	frame: true,
	border: false,
	layout: 'auto', //支持自适应  
	fieldDefaults: {
		labelWidth: 60,
		margin: '4 10 4 0',
		anchor: '100%',
		msgTarget: 'side'
	},
	initComponent: function () {
		var me = this;
		me.items = me.buildLayout(me.fieldSets);

		this.callParent();

	},
	buildLayout: function (fieldSets) {
		var me = this;
		me.fieldSets = fieldSets;

		var arr = [];
		for (var i = 0; i < me.fieldSets.length; i++) {

			var fieldset = me.fieldSets[i];
			if (fieldset.allfields && fieldset.allfields.length > 0) {
				fieldset.items = me.buildFieldSetLayout(fieldset.allfields, fieldset.columnsPerRow);
			}
			arr.push(fieldset);
		}
		return arr;
	},
	buildFieldSetLayout: function (fields, columnsPerRow) {
		var me = this;

		//debugger;

		var items = fields; //me.fields; //me.items; //所有控件
		var totalColumns = 0;

		for (var i = 0; i < fields.length; i++) {

			var tempItem = fields[i];
			if (tempItem.colspan) {
				totalColumns += tempItem.colspan;
			}
			else {
				totalColumns++;
			}
			//items.push(tempItem);
		}

		var cols; //默认按一行三列分开
		var columnWith;
		if (!columnsPerRow) {

			cols = 3; //默认按一行三列分开
			columnWith = .3;
			if (items) {
				if (items.length < 6) {
					cols = 2; //小于6行就两列
					columnWith = .45;
				}
			}
		}
		else {

			cols = columnsPerRow; //me.columnsPerRow;
			switch (cols) {
				case 1:
				case 2: columnWith = 0.4; break;
				case 3: columnWith = 0.33; break;
				case 4: columnWith = 0.25; break;
				case 5: columnWith = 0.2; break;
				default: columnWith = 0.33;
			}
		}

		var rows = Math.ceil(totalColumns / cols); //计算行数
		var index = 0;
		var outarr = new Array();
		for (var i = 0; i < rows; i++) {

			var outobj = new Object();
			outobj.xtype = 'container';
			outobj.layout = 'column';
			outobj.border = false;
			outobj.defaults = {
				style: { paddingRight: '10px'}//,paddingBottom: '5px' }
			};

			var inarr = new Array();

			for (var j = 0; j < cols; ) {

				if (index >= items.length) {
					break; //超界
				}

				var item = items[index];
				index++;

				var tempColumnWith = columnWith;
				if (item && item.colspan) {
					tempColumnWith *= item.colspan;
					j += item.colspan;
				}
				else {
					j++;
				}

				var inItems = new Object();

				inItems.xtype = 'container';
				inItems.columnWidth = tempColumnWith; //.3;
				// inItems.layout = 'form';
				inItems.layout = 'anchor';
				inItems.border = false;

				inItems.items = [item];
				inarr.push(inItems);
			}
			outobj.items = inarr;

			outarr.push(outobj);
		}

		return outarr;
	}

});

Ext.define('Ext.ng.PagingBar', {
	extend: 'Ext.toolbar.Paging',
	alias: 'widget.ngPagingBar', //别名,可通过设置xtype构建 
	border: false,
	displayInfo: true,
	displayMsg: '第 {0} - {1}条 共 {2} 条数据',
	emptyMsg: "没有数据",
	beforePageText: "第",
	afterPageText: "/{0} 页",
	firstText: "首页",
	prevText: "上一页",
	nextText: "下一页",
	lastText: "尾页",
	refreshText: "刷新",
	showRefresh: true,
	initComponent: function () {
		this.callParent();
	},
	listeners: {
		render: function (me, eOpts) {
			if (!me.showRefresh) {
				me.items.items[10].hide();
				me.items.items[9].hide();
			}
		}
	}
});

Ext.define('Ext.ng.GridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ngGridPanel', //别名,可通过设置xtype构建
    //autoScroll: true, 

    viewConfig: {
        enableTextSelection: true
    },
    initComponent: function () {

        var me = this;
        var otype = me.otype;

        var bbar = me.bbar; //callParent方法后bbar属性置为空
        this.callParent(arguments);

        if (me.table) {
            var fields = me.store.model.getFields();

            var columninfo;
            Ext.Ajax.request({
                url: C_ROOT + 'SUP/IndividualProperty/GetColomnInfo?tname=' + me.table,
                async: false, //同步请求
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText);
                    if (resp.status === "ok") {
                        columninfo = resp.data; //显示值                    
                    } else {
                        Ext.MessageBox.alert('取数失败', resp.status);
                        columninfo = 'error';
                    }
                }
            });

            for (var i = 0; i < columninfo.length; i++) {
                var modelobj = {};
                modelobj['name'] = columninfo[i]['fieldname'];
                modelobj['type'] = 'string';
                modelobj['mapping'] = columninfo[i]['fieldname'];

                fields.push(modelobj); //设置model

                var tempcolumn = Ext.create('Ext.grid.column.Column', {
                    text: columninfo[i]['fieldchn'],
                    dataIndex: columninfo[i]['fieldname']
                });

                //            tempcolumn['header'] = columninfo[i]['fieldchn'];
                //            tempcolumn['flex'] = 1;
                //            tempcolumn['dataIndex'] = columninfo[i]['fieldname'];

                me.initialConfig.columns.push(tempcolumn); //设置column
            }

            me.store.model.setFields(fields); //
            me.reconfigure(me.store, me.initialConfig.columns);
        }

        //列标题对齐方式处理
        for (var i = 0; i < me.columns.length; i++) {
            var column = me.columns[i];
            if (!column.hidden) {
                if (column.titleAlign) {
                    column.style = "text-align:" + column.titleAlign;
                }
                else {
                    column.style = "text-align:center"; //默认列头居中
                }

                //必输列控制
                if (column.mustInput) {
                    column.style += ";color:OrangeRed";
                }
            }
        }

        //处理工作流UI状态
        if (me.workFlowUIState) {
            var info = me.workFlowUIState;
            for (field in info) {
                for (var k = 0; k < me.columns.length; k++) {
                    if (field === me.columns[k].dataIndex) {
                        //必输项
                        if (info[field] == '2') {
                            if (!me.columns[k].editor) {
                                me.columns[k].editor = { xtype: 'textfield' };
                            }

                            me.columns[k].editor.allowBlank = false;
                            me.columns[k].style += ";color:OrangeRed";
                        }
                        //隐藏
                        if (info[field] == '3') {
                            me.columns[k].hide();
                        }
                    }
                }
            }

            me.on('beforeedit', function (editor, e, eOpts) {
                var colname = e.field;
                if (info[colname] == '0' || info[colname] == '1') {
                    return (info[colname] == '1') ? true : false;
                }

                return true;
            });

        }

        //查看状态设置为只读
        if (otype === 'view') {
            //grid变为只读
            me.on('beforeedit', function () {
                return false;
            })
        }


        //调整分页条的页号
        if (bbar) {
            me.store.on('load', function (store, records) {
                //debugger;
                //修正页号
                var item = bbar.items.get('inputItem');
                var pageindex = item.getValue(); //页号

                if (pageindex > 0) {
                    if (Math.ceil(store.totalCount / store.pageSize) < pageindex) {
                        if (store.totalCount > 0) {
                            item.setValue(1);
                            store.currentPage = 1;
                        }
                        else {
                            item.setValue(0);
                            store.currentPage = 0;
                        }
                    }
                }
                else {
                    item.setValue(0);
                }

            })
        }

        //        me.on('itemcontextmenu', function (view, record, item, index, e, eOpts) {
        //            //
        //            var contextmenu = Ext.create('Ext.menu.Menu', {
        //                width: 200,
        //                height: 100,
        //                margin: '0 0 10 0',
        //                //floating: false,
        //                items: [{ text: 'item 1' }, { text: 'item 2' }, { text: 'item 3'}]
        //            });

        //            //e.stopEvent();
        //            e.preventDefault();
        //            contextmenu.showAt(e.getXY());
        //            //return false;

        //        });

        me.on('afterrender', function (cmp) {
            //增加布局菜单
            if (me.stateful && me.stateId != undefined) {
                var menu = me.headerCt.getMenu();

                menu.add([{
                    text: '默认布局',
                    iconCls: 'icon-Clear',
                    handler: function () {
                        Ext.state.Manager.clear(me.stateId);
                        window.location.reload();
                    }
                }]);
            }
        });

        me.on('columnmove', function () {
            //            //增加菜单
            //            if (me.stateful && me.stateId != undefined) {
            //                var menu = me.headerCt.getMenu();
            //                
            //                menu.add([{
            //                    text: '默认布局',
            //                    iconCls: 'icon-Clear',
            //                    handler: function () {
            //                        Ext.state.Manager.clear(me.stateId);
            //                        window.location.reload();
            //                    }
            //                }]);
            //            }
        });

        //列表增加双击查看功能
        me.on('itemdblclick', function (view, record, item, index, e, eOpts) {
            var tbar = me.previousNode("ngToolbar");
            if (tbar) {
                var btn_view = tbar.items.get('view');
                if (btn_view) {
                    btn_view.fireEvent('click');
                }
            }
        });

    },
    getChange: function (serial) {

        var serialflag = serial || true; //默认值是true，序列化
        var me = this;
        var json = '';
        var data = GetExtJsGridData(me.store, me.buskey);

        if (serialflag) {
            json = JSON.stringify(data);
            return json;
        }
        else {
            return data;
        }
    },
    getAllGridData: function () {
        var json = GetAllGridData(this.store, this.buskey);
        return json;
    },
    getAllData: function (serial) {

        var serialflag = serial || true; //默认值是true,序列化
        var json = '';
        var data = GetExtJsGridAllData(this.store, this.buskey);

        if (serialflag) {
            json = JSON.stringify(data);
            return json;
        }
        else {
            return data;
        }
    },
    isValid: function () {
        var me = this;
        return ValidGridData(me);
    },
    hasModifyed: function () {

        var me = this;
        var newRecords = me.store.getNewRecords(); //获得新增行  
        var modifyRecords = me.store.getUpdatedRecords(); // 获取修改的行的数据，无法获取幻影数据 
        var removeRecords = me.store.getRemovedRecords(); //获取移除的行

        if (newRecords.length > 0 || modifyRecords.length > 0 || removeRecords.length > 0) {
            return true;
        }
        return false;
    },
    getColumn: function (colname) {
        var me = this;
        var obj;
        for (var i = 0; i < me.columns.length; i++) {
            if (colname === me.columns[i].dataIndex) {
                obj = me.columns[i]; break
            }
        }

        return obj;
    },
    getRow: function () {

        var me = this;
        var select = me.getSelectionModel().getSelection();

        var data = { 'key': me.buskey };
        data['unchange'] = select;
        var d = GetTableData(data);

        return JSON.stringify(d);
    },
    resetPagingBar: function (pagingBar) {
        var me = this;
        if (pagingBar) {

            var textItem = pagingBar.items.get('inputItem');
            textItem.setValue(1);
            me.store.currentPage = 1;
        }
    }
});

Ext.define('Ext.ng.GridExpandPanel', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.ngGridExpandPanel',
	plugins: [{
		ptype: 'rowexpander',
		rowBodyTpl: ['<div class="ux-row-expander-box"></div>'],
		expandOnRender: true,
		expandOnDblClick: false
	}],
	initComponent: function () {
		var me = this;
		me.callParent(arguments);

		me.addEvents('prepareparam'); //准备参数
		me.addEvents('detailitemclick'); //明细列表点击

		me.getView().on('expandbody', function (node, record, eNode) {
			var element = Ext.get(eNode).down('.ux-row-expander-box');
			//IE用offsetWidth
			element.dom.style.width = (eNode.clientWidth > 0 ? eNode.clientWidth : eNode.offsetWidth) + "px";

			var detailStore = Ext.create('Ext.data.Store', {
				model: me.storeInfo.model,
				pageSize: 20,
				autoLoad: false,
				proxy: {
					type: 'ajax',
					url: me.storeInfo.url,
					reader: {
						type: 'json',
						root: 'Record',
						totalProperty: 'totalRows'
					}
				}
			});

			var grid = Ext.create('Ext.grid.Panel', {
				hideHeaders: false,
				border: false,
				columns: me.detailColumns,
				store: detailStore
			});

			me.fireEvent('prepareparam', detailStore, record);

			//            detailStore.on('beforeload', function (store, operation, eOpts) {
			//                Ext.apply(store.proxy.extraParams, { 'masterID': record.data[me.masterID] });
			//            });

			detailStore.load();

			grid.on('itemclick', function (dgrid, record, item, index, e, eOpts) {
				me.getView().getSelectionModel().deselectAll();

				me.fireEvent('detailitemclick', dgrid, record, item, index, e, eOpts);
			});

			//防止事件冒泡，吞掉事件
			element.swallowEvent(['click', 'mousedown', 'mouseup', 'dblclick'], true);

			grid.render(element);

		});
		me.getView().on('collapsebody', function (node, record, eNode) {
			Ext.get(eNode).down('.ux-row-expander-box').down('div').destroy();
		});

		me.on('resize', function (grid, width, height, oldWidth, oldHeight, eOpts) {
			var element = me.el.query('div.ux-row-expander-box[id]');

			//Ext.suspendLayouts();
			for (var i = 0; i < element.length; i++) {
				if (!element[i].firstChild) continue;

				element[i].style.width = width + "px";

				Ext.getCmp(element[i].firstChild.id).doLayout();
			}
			// Ext.resumeLayouts(true);

		});
	}
});

Ext.define('Ext.ng.TabPanel', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.ngTabPanel',
	initComponent: function () {
		var me = this;
		me.callParent(arguments);

		if (me.tabPosition === 'left') {
			
			var isNeptune = document.getElementById("themestyle").href.indexOf('neptune') > 0 ? true : false; //海王星主题
			for (var i = 0; i < me.items.length; i++) {


				var oldtitle = me.tabBar.items.items[i].text; //me.items.items[i].title;
				var newtitle = oldtitle.split('').join('<br>'); //默认是IE的标题
				if (!Ext.isIE || Ext.isIE10) {

					var width = oldtitle.length * 14;
					var left = oldtitle.length * 6;
					//firefox
					if (!Ext.isChrome) {
						width = oldtitle.length * 18; //宽度变高度
						left = oldtitle.length * 7.5; //靠左变靠上
					}
					if (Ext.isIE10) {
						var width = oldtitle.length * 16;
						var left = oldtitle.length * 6;
					}

					var height = '13px';
					if (isNeptune) {
						height = '16px';
					}
					newtitle = "<div style='-webkit-transform: rotate(90deg);-moz-transform:rotate(90deg);transform:rotate(90deg);width:" + width + "px;height:" + height + ";left:" + left + "px !important;position: relative;'>"
													 + newtitle + "</div>";
				}
				//me.items.items[i].title = newtitle;

				me.tabBar.items.items[i].text = newtitle;
			}

			if (Ext.isIE && !Ext.isIE10) {

				var width = '20px';
				if (isNeptune) {
					width = '30px';
				}
				for (var i = 0; i < me.tabBar.items.items.length; i++) {
					var tab = me.tabBar.items.items[i];
					var height = 0; //tab.text.split('<br>').length * 20;
					//控制宽度，去掉旋转，去掉背景,圆角处理            
					tab.style = "width:" + width + ";filter:none;background-image:none;border-bottom-left-radius:4px;border-bottom-right-radius:0px;border-top-right-radius:0px";

					tab.on('activate', function (bar, e, eOpts) {
						bar.el.setStyle({ backgroundColor: 'white', borderRightWidth: '0px' });
					});

					tab.on('deactivate', function (bar, e, eOpts) {
						if (bar.el) {
							bar.el.setStyle({ backgroundColor: '' });
						}
					});
				}

				me.on('afterrender', function () {
					//激活第一个tab
					me.tabBar.items.items[0].el.setStyle({ backgroundColor: 'white', borderRightWidth: '0px' });

					for (var i = 0; i < me.tabBar.items.items.length; i++) {
						var tab = me.tabBar.items.items[i];
						var height = tab.text.split('<br>').length * 15 + 12;
						tab.el.down('div.x-tab-wrap').setStyle({ width: '20px', height: height + 'px', position: 'relative', top: '7px' });
						tab.el.down('span.x-tab-inner').setStyle({ marginLeft: '-10px' });
					}
				});
			} //if isIE

		} //if left


  } //initComponent
});

Ext.define('Ext.ng.JsonStore', {
	extend: 'Ext.data.Store',
	alias: 'widget.ngJsonStore', //别名,可通过设置xtype构建
	cachePageData: false, //缓存分页数据
	constructor: function (config) {
		tempconfig = Ext.apply({
			proxy: {
				type: 'ajax',
				url: config.url,
				reader: {
					type: 'json',
					root: 'Record',
					totalProperty: 'totalRows'
				}
			}
		}, config);

		this.callParent([tempconfig]);

		var me = this;

		me.dataContainer = Ext.create('Ext.util.MixedCollection'); //数据缓存

		me.on('beforeload', function (store, operation, eOpts) {

			Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //修改pageIndex为从0开始
			if (this.queryObj) {
				Ext.apply(store.proxy.extraParams, this.queryObj); //查询窗口的条件   
			}

			//            if (this.outQueryObj) {
			//                Ext.apply(store.proxy.extraParams, this.outQueryObj); //外部过滤条件 
			//            }

			if (store.cachePageData) {
				if (store.dataContainer.containsKey(store.currentPage)) {

					var records = store.dataContainer.get(store.currentPage);
					store.loadData(records);

					//store.loadRawData(store.dataContainer.get(store.currentPage));//会修改总页数,分页条会变成只有1页

					//var result = store.proxy.reader.read(store.dataContainer.get(store.currentPage));
					//var records = result.records;
					//store.loadRecords(records, { addRecords: false });

					store.fireEvent('load', me, records, true); //触发load事件，更新分页条的页号

					return false; //防止ajax请求去服务端读取数据
				}
			}

		});

		me.on('load', function (store, records, successful, eOpts) {


			if (records && store.cachePageData) {
				//debugger;
				var pageIndex = store.currentPage;
				store.dataContainer.add(pageIndex, records);
			}

		});

		if (me.cachePageData) {

			me.on('add', function (store, eOpts) {

				if (this.dataContainer) {
					this.dataContainer.clear();
				}
			});

			me.on('remove', function (store, eOpts) {
				if (this.dataContainer) {
					this.dataContainer.clear();
				}
			})
		}

	},
	clearPageData: function () {
		var me = this;
		if (me.dataContainer) {
			me.dataContainer.clear();
		}
	}

});

Ext.define('Ext.ng.TreePanel', {
    extend: 'Ext.tree.TreePanel',
    alias: 'widget.ngTreePanel',
    //autoScroll: true,
    //enableTabScroll: true,
    rootVisible: false,
    lines: true,
    useArrows: true,
    width: 220,
    minSize: 220,
    maxSize: 220,
    initComponent: function () {
        var me = this;

        var thestore = Ext.create('Ext.data.TreeStore', {
            autoLoad: me.autoLoad,
            root: {
                expanded: me.autoLoad
            },
            fields: me.treeFields,
            proxy: {
                type: 'ajax',
                url: me.url
            }
        });

        me.store = thestore;

        me.callParent(arguments);
    }
});

Ext.define('Ext.ng.AttachMent', {
	extend: 'Ext.window.Window',
	title: '附件',
	autoScreen: true,
	iconCls: 'icon-Attachment',
	closable: true,
	maximizable: false,
	resizable: false,
	//modal: true,
	//draggable:false,
	width: 835,
	height: 335,
	layout: 'fit',
	attachTName: 'c_pfc_attachment',
	btnAdd: '1',
	btnWebOk: '2', //不显示确定按钮，单据提交的时候才保存附件
	autoSave: '1',
	status: 'edit',
	busTName: '',
	busID: '',
	initComponent: function () {
		var me = this;

		if (me.busTName.length == 0) {
			alert("请设置业务表名属性busTName！");
			me.callParent(arguments);
			return;
		}
		//        if (me.busID.length == 0) {
		//            alert("请设置业务主键属性busID！");
		//            me.callParent(arguments);
		//            return;
		//        }

		var attachguid = '';
		if (me.attachGuid) {
			attachguid = me.attachGuid;
		} else {
			attachguid = me.busID;
		}


		var frame = document.createElement("IFRAME");
		frame.id = "frame1";
		frame.frameBorder = 0;
		frame.src = C_ROOT + 'SUP/Attachment?attachTName=' + me.attachTName + '&btnAdd='
									 + me.btnAdd + '&status=' + me.status + '&busTName=' + me.busTName
									 + '&busid=' + me.busID + '&attachguid=' + attachguid
									 + '&btnWebOk=' + me.btnWebOk + '&autoSave=' + me.autoSave;
		frame.height = "100%";
		frame.width = "100%";
		me.contentEl = frame;

		me.callParent(arguments);

		frame.parentContainer = me;
		me.on('beforeclose', function () {

			var att = me.contentEl.contentWindow.LoadAttach;
			me.returnObj = { guid: att.GUID, status: att.STATUS };

		});
	},
	Save: function (buscode) {

		var me = this;

		Ext.Ajax.request({
			params: { 'attachguid': me.returnObj.guid, 'buscode': buscode },
			url: C_ROOT + 'SUP/Attachment/Save',
			success: function (response) {
				var resp = Ext.JSON.decode(response.responseText);
				if (resp.status === "ok") {


				} else {
					Ext.MessageBox.alert('保存失败:' + resp.msg);
				}
			}
		});

	},
	ClearTempData: function () {
		var me = this;
		Ext.Ajax.request({
			params: { 'attachguid': me.returnObj.guid },
			url: C_ROOT + 'SUP/Attachment/ClearTempData',
			success: function (response) {
				var resp = Ext.JSON.decode(response.responseText);
				if (resp.status === "ok") {


				} else {
					Ext.MessageBox.alert('保存失败:' + resp.msg);
				}
			}
		});
	}
});

Ext.define('Ext.ng.MessageBox', {

	/*******************************
	错误对话框,提示性,非模态,一定时间后自动消失
	msg:对话框消息体
	hold:对话框显示持续时间
	********************************/
	Error: function (msg, hold) {
		this.Show('Error', msg, hold, 'alert-error');
	},

	/*******************************
	消息对话框,提示性,非模态,一定时间后自动消失
	msg:对话框消息体
	hold:对话框显示持续时间
	********************************/
	Info: function (msg, hold) {
		this.Show('Info', msg, hold, 'alert-information');
	},

	/*******************************
	警告对话框,提示性,非模态,一定时间后自动消失
	msg:对话框消息体
	hold:对话框显示持续时间
	********************************/
	Warning: function (msg, hold) {
		this.Show('Warning', msg, hold, 'alert-warn');
	},

	/*******************************
	成功对话框,提示性,非模态,一定时间后自动消失
	msg:对话框消息体
	hold:对话框显示持续时间
	********************************/
	Success: function (msg, hold) {
		this.Show('Sccess', msg, hold, 'alert-success');
	},

	/*******************************
	确认对话框,提示性,模态,不会自动消失
	返回值 yes/no
	msg:对话框消息体
	********************************/
	Confirm: function (msg) {
		Ext.MessageBox.confirm('Confirm', msg);
	},

	/*******************************
	带输入的对话框,提示性,模态,不会自动消失
	返回值 输入的value
	title:标题栏
	msg:提示性信息
	********************************/
	Prompt: function (title, msg) {
		Ext.MessageBox.prompt(title, msg, true, 'alert-information');
	},

	/*******************************
	带多行输入的对话框,提示性,模态,不会自动消失
	返回值 输入的value
	title:标题栏
	msg:提示性信息
	width:消息框宽度
	********************************/
	MultilinePrompt: function (title, msg, width) {
		Ext.MessageBox.show({
			title: title,
			msg: msg,
			width: width,
			buttons: Ext.MessageBox.OKCANCEL,
			multiline: true,
			icon: 'alert-information'
		});
	},

	/*******************************
	带按钮的对话框,提示性,模态,不会自动消失
	返回值 点击的按钮对应的值
	title:标题栏
	msg:提示性信息
	buttons:要显示的按钮,如Ext.MessageBox.YESNOCANCEL,
	********************************/
	ButtonDialog: function (title, msg, buttons) {
		Ext.MessageBox.show({
			title: title,
			msg: msg,
			buttons: buttons,
			icon: 'alert-information'
		});
	},

	/*******************************
	进度条对话框,提示性,模态,处理完成后自动消失
	返回值 
	title:标题栏
	msg:提示性信息
	progressText:进度条上要显示的信息
	********************************/
	ProgressDialog: function (title, msg, progressText) {
		Ext.MessageBox.show({
			title: title,
			msg: msg,
			progressText: progressText,
			width: 300,
			progress: true,
			closable: false,
			icon: 'alert-information'
		});

		// this hideous block creates the bogus progress
		var f = function (v) {
			return function () {
				if (v == 12) {
					Ext.MessageBox.hide();
					Ext.example.msg('Done', 'Your fake items were loaded!');
				}
				else {
					var i = v / 11;
					Ext.MessageBox.updateProgress(i, Math.round(100 * i) + '% completed');
				}
			};
		};
		for (var i = 1; i < 13; i++) {
			setTimeout(f(i), i * 500);
		}
	},

	/*******************************
	等待对话框,提示性,模态,不会自动消失
	返回值 点击的按钮对应的值
	msg:提示性信息
	progressText:进度条上要显示的信息
	********************************/
	WaitDialog: function (msg, progressText) {
		Ext.MessageBox.show({
			msg: msg,
			progressText: progressText,
			width: 300,
			wait: true,
			waitConfig: { interval: 200 },
			icon: 'alert-information'
		});
	},

	/*******************************
	提示对话框,提示性,非模态,一定时间后自动消失
	title:对话框标题
	msg:对话框消息体
	hold:对话框显示持续时间
	icon:要显示的图片
	********************************/
	Show: function (title, msg, hold, icon) {
		Ext.MessageBox.show({
			title: title,
			msg: msg,
			width: 300,
			icon: icon,
			modal: false
		});
		this.Hold(hold);
	},
	Hold: function Hold(hold) {
		var h = 5000;
		if (hold != undefined) {
			h = hold;
		}
		setTimeout(function () {
			Ext.MessageBox.hide();
		}, h);
	}
});

//#region 布局记忆
Ext.define('Ext.state.HttpProvider',
	{
		extend: 'Ext.state.Provider',

		//构造函数
		constructor: function (config) {
			config = config || {};
			var me = this;
			Ext.apply(me, config);

			this.superclass.constructor.call(this);
			this.state = this.readValues();
		},

		//缓存地址
		url: '',

		// private
		set: function (name, value) {
			if (typeof value == "undefined" || value === null) {
				this.clear(name);
				return;
			}

			if (this.state[name] != value) {
				this.setValue(name, value);
			}

			this.superclass.set.call(this, name, value);
		},

		// 清空数据
		clear: function (name) {
			this.clearValue(name);
			this.superclass.clear.call(this, name);
		},

		// 读取指定用户的全部布局数据
		readValues: function () {
			var state = {};
			var me = this;
			Ext.Ajax.request({
				url: C_ROOT + 'SUP/LayoutLog/ReadLayout', //this.url + '/ReadLayout',
				async: false,
				params: {},
				success: function (res, opts) {
					if (res.responseText) {
						var json = Ext.decode(res.responseText);
						if (json && json.length > 0) {

							for (var i = 0; i < json.length; i++) {
								if (json[i].Bustype != "") {
									state[json[i].Bustype] = me.decodeValue(json[i].Value);
								}

							}
						}
					}
				}
			});

			return state;
		},

		// 保存数据
		setValue: function (name, value) {
			var me = this;
			Ext.Ajax.request({
				url: C_ROOT + 'SUP/LayoutLog/SaveLayout', //this.url + '/SaveLayout',
				params: { bustype: name, layoutValue: me.encodeValue(value) },
				success: function (res, opts) {
				}
			});
		},

		// 清空数据
		clearValue: function (name) {
			Ext.Ajax.request({
				url: C_ROOT + 'SUP/LayoutLog/ClearLayout', //this.url + '/ClearLayout',
				params: { bustype: name },
				success: function (res, opts) {
				}
			});
		}
	});

//暂时不启动
//Ext.state.Manager.setProvider(new Ext.state.HttpProvider({ url:  '../Sup' }));
//#endregion

// #region Ext.ng.form.field

//基类
	Ext.define('Ext.ng.form.field.Base', {
		extend: 'Ext.form.field.Base',
		textChange: false,
		initComponent: function () {
			var me = this;
			me.callParent();

			if (me.mustInput)//必输项
			{
				//me.labelStyle = 'color:RoyalBlue';
				me.labelStyle = 'color:OrangeRed'; //'color:RoyalBlue';
				me.allowBlank = false;
			}

			me.on('afterrender', function (panel, eOpts) {

				//checkbox不能变色,否则只读时勾勾看不见
			    if ('ngCheckbox' === me.xtype) return;
			    if ('ngRadio' === me.xtype) return;

				var input = me.el.down('input') || me.el.down('textarea');
				if (me.readOnly) {
					//me.setReadOnly(true);

					input.setStyle({ backgroundImage: 'none', backgroundColor: '#eaeaea' });
					me.preventMark = true;

					//处理控件变短
					var errmsg = me.el.down('div.x-form-error-msg')
					if (errmsg) {
						errmsg.up('td').setStyle({ display: 'none' });
					}
				}

			});

			me.addEvents('itemchanged'); //模仿pb做itemchanged事件
			me.on('change', function () {
				me.textChange = true;
			});
			me.on('blur', function () {
				if (me.textChange) {

					me.fireEvent('itemchanged');
					me.textChange = false;
				}
			});

		},
		userSetReadOnly: function (flag) {
			this.setReadOnly(flag);
			this.preventMark = flag;
			var input = this.el.down('input') || this.el.down('textarea');
			if (flag) {
				input.setStyle({ backgroundImage: 'none', backgroundColor: '#eaeaea' });
			}
			else {
				input.setStyle({ backgroundColor: 'white' });
			}
			//处理控件变短
			var errmsg = this.el.down('div.x-form-error-msg')
			if (errmsg) {
				errmsg.up('td').setStyle({ display: 'none' });
			}
		}
	})

	Ext.define('Ext.ng.CommonHelp', {
	    extend: 'Ext.form.field.ComboBox',
	    mixins: { base: 'Ext.ng.form.field.Base' },
	    requires: ['Ext.ng.form.field.Base'],
	    alias: ['widget.ngCommonHelp'],
	    pageSize: 10,
	    minChars: 1, //定义输入最少多少个字符的时候获取数据
	    helpType: 'simple', //默认是simple,自定义界面：rich
	    helpWidth: 600, //帮助宽度
	    helpHeight: 400, //帮助高度
	    showAutoHeader: false,
	    //outFilter: {}, //外部查询条件,精确条件
	    //likeFilter: {}, //外部模糊查询条件，like条件
	    selectMode: 'Single', //multiple  
	    needBlankLine: false,
	    //forceSelection: true,
	    autoSelect: false, //不要自动选择第一行
	    enableKeyEvents: true, //允许key事件
	    selectOnFoucus: true,
	    typeAhead: true, //延时查询
	    typeAheadDelay: 500, //延迟500毫秒，默认是250
	    //valueNotFoundText: 'Select a Country!!...',
	    queryMode: 'remote',
	    triggerAction: 'all', //'query'
	    //triggerCls: 'icon-create',       
	    //    listConfig: {
	    //        //tpl: '<div><table width="100%" ><tr><th class="x-column-header-inner x-column-header-over" >代码</th><th class="x-column-header-inner x-column-header-over">名称</th></tr><tpl for="."><tr class="x-boundlist-item"><td>{provinceno}</td><td>{prvcname}<td></tr></tpl></table></div>',
	    //        //        itemSelector:'span.item'
	    //        getInnerTpl: function () {
	    //            //return '<div data-qtip="{code}. {slogan}">{ocode}  ({oname})</div>';
	    //            return '<div data-qtip="{' + this.pickerField.valueField + '}. {slogan}">{' + this.pickerField.valueField + '}  ({' + this.pickerField.displayField + '})</div>';
	    //            // return '{' + this.pickerField.valueField + '} {' + this.pickerField.displayField + '}';
	    //        }
	    //    },
	    initComponent: function () {
	        //
	        var me = this;
	        this.callParent();
	        this.mixins.base.initComponent.call(me); //与callParent方法不可调换

	        //me.tpl = '<div><table width="100%" ><tr><th class="x-column-header-inner x-column-header-over" >代码</th><th class="x-column-header-inner x-column-header-over">名称</th></tr><tpl for="."><tr class="x-boundlist-item"><td>{' + this.valueField + '}</td><td>{' + this.displayField + '}<td></tr></tpl></table></div>';
	        if (Ext.isEmpty(me.helpid) || Ext.isEmpty(me.displayField) || Ext.isEmpty(me.valueField)) return;

	        if (me.listFields && me.listHeadTexts) {

	            var listheaders = '';
	            var listfields = '';

	            var heads = me.listHeadTexts.split(','); //列头 
	            var fields = me.listFields.split(','); //所有字段              

	            var modelFields = new Array();
	            for (var i = 0; i < fields.length; i++) {

	                var tempfield = fields[i].split('.');
	                var temp;
	                if (tempfield.length > 1) {
	                    temp = tempfield[1]; //去掉表名
	                }
	                else {
	                    temp = fields[i];
	                }

	                modelFields.push({
	                    name: temp, //fields[i],
	                    type: 'string',
	                    mapping: temp //fields[i]
	                });

	            }

	            if (me.showAutoHeader) {

	                for (var i = 0; i < heads.length; i++) {
	                    listheaders += '<th class="x-column-header-inner x-column-header-over">' + heads[i] + '</th>';
	                }
	            }

	            for (var i = 0; i < heads.length; i++) {

	                var tempfield = fields[i].split('.');
	                var temp;
	                if (tempfield.length > 1) {
	                    temp = tempfield[1]; //去掉表名
	                }
	                else {
	                    temp = fields[i];
	                }

	                listfields += '<td>{' + temp + '}</td>';
	            }

	            var temp;
	            if (me.showAutoHeader) {
	                temp = '<div><table width="100%" style="border-spacing:0px;" ><tr>' + listheaders + '</tr><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
	            } else {
	                temp = '<div><table width="100%" style="border-spacing:0px;" ><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
	            }
	            me.tpl = temp;

	            var store = Ext.create('Ext.data.Store', {
	                pageSize: 10,
	                fields: modelFields,
	                proxy: {
	                    type: 'ajax',
	                    url: C_ROOT + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid,
	                    reader: {
	                        type: 'json',
	                        root: 'Record',
	                        totalProperty: 'totalRows'
	                    }
	                }
	            });

	            me.bindStore(store);

	            //只能在这里写事件才能触发到
	            store.on('beforeload', function (store) {

	                Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //修改pageIndex为从0开始
	                if (me.outFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
	                }
	                if (me.likeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(me.likeFilter) });
	                }
	                if (me.leftLikeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
	                }
	                if (me.clientSqlFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'clientSqlFilter': me.clientSqlFilter });
	                }

	            });

	            if (me.needBlankLine) {
	                store.on('load', function (store, records, successful, eOpts) {

	                    //去掉表名
	                    var myValueFiled;
	                    var myDisplayField;
	                    var temp = me.valueField.split('.');
	                    if (temp.length > 1) {
	                        myValueFiled = temp[1];
	                    } else {
	                        myValueFiled = me.valueField;
	                    }

	                    temp = me.displayField.split('.');
	                    if (temp.length > 1) {
	                        myDisplayField = temp[1];
	                    } else {
	                        myDisplayField = me.displayField;
	                    }

	                    var emptydata = new Object();
	                    emptydata[myValueFiled] = '';
	                    emptydata[myDisplayField] = '&nbsp;'; //空html标记          

	                    var rs = [emptydata];
	                    store.insert(0, rs);
	                });
	            }

	        }
	        else {
	            me.initialListTemplate(); //初始化下拉列表样式 
	        }

	        me.addEvents('helpselected'); //定义值被选完的事件
	        me.addEvents('firstrowloaded');

	        me.on('select', function (combo, records, eOpts) {

	            var theField;

	            //构建
	            if (me.listFields) {
	                theField = [];
	                var temp = me.listFields.split(',');
	                for (var i = 0; i < temp.length; i++) {
	                    theField.push(temp[i]);

	                    //                        var tempfield = temp[i].split('.');
	                    //                        if (tempfield.length > 1) {
	                    //                            theField.push(tempfield[1]);
	                    //                        }
	                    //                        else {
	                    //                            theField.push(temp[i]);
	                    //                        }
	                }
	            }
	            else {
	                //                    theField = [];
	                //                    var temp = me.valueField.split('.');
	                //                    if (temp.length > 1) {
	                //                        theField.push(temp[1]);
	                //                    } else {
	                //                        theField.push(me.valueField);
	                //                    }

	                //                    temp = me.displayField.split('.');
	                //                    if (temp.length > 1) {
	                //                        theField.push(temp[1]);
	                //                    } else {
	                //                        theField.push(me.displayField);
	                //                    }

	                theField = [me.valueField, me.displayField];
	            }

	            Ext.define('themodel', {
	                extend: 'Ext.data.Model',
	                fields: theField
	            });

	            //去掉表名
	            var myValueFiled;
	            var myDisplayField;
	            var temp = me.valueField.split('.');
	            if (temp.length > 1) {
	                myValueFiled = temp[1];
	            } else {
	                myValueFiled = me.valueField;
	            }

	            temp = me.displayField.split('.');
	            if (temp.length > 1) {
	                myDisplayField = temp[1];
	            } else {
	                myDisplayField = me.displayField;
	            }


	            var code = combo.getValue() || records[0].data[myValueFiled];
	            var name = combo.getRawValue() || records[0].data[myDisplayField];

	            if (Ext.isEmpty(code)) {
	                name = '';
	            }

	            var obj = new Object();
	            if (me.isInGrid) {//嵌在grid中
	                obj[me.valueField] = name; //欺骗,grid那边显示有问题
	            } else {
	                obj[me.valueField] = code;
	            }
	            if (me.displayFormat) {
	                obj[me.displayField] = Ext.String.format(me.displayFormat, code, name);
	            } else {
	                obj[me.displayField] = (name ===  '&nbsp;')? '' : name;
	            }

	            var valuepair = Ext.ModelManager.create(obj, 'themodel');
	            me.setValue(valuepair); //必须这么设置才能成功

	            //debugger;
	            var pobj = new Object();
	            pobj.code = code;
	            pobj.name = name;
	            pobj.type = 'autocomplete';
	            //pobj.data = records[0].data;
	            pobj.data = {};
	            for (var i = 0; i < theField.length; i++) {
	                var temp = theField[i].split('.');
	                if (temp.length > 1) {
                        var str = records[0].data[temp[1]];
	                    pobj.data[theField[i]] = (str === '&nbsp;')? '' : str;
	                }
	                else {
	                    var str = records[0].data[theField[i]]
	                    pobj.data[theField[i]] = (str === '&nbsp;') ? '' : str;
	                }
	            }
	         
	            me.fireEvent('helpselected', pobj);

	        });

	        me.on('expand', function (field, opt) {

	            //刷新按钮去掉
	            var autoPagingbar = me.getPicker().pagingToolbar;
	            autoPagingbar.items.items[10].hide();
	            autoPagingbar.items.items[9].hide();

	        });

	        me.on('keydown', function (combo, e, eOpts) {


	            if (me.isExpanded) {

	                //回车
	                if (e.keyCode == Ext.EventObject.ENTER) {
	                    if (me.picker.el.query('.' + me.picker.overItemCls).length > 0) return false;
	                    me.onTriggerClick();
	                }

	                //翻页
	                switch (e.keyCode) {
	                    case Ext.EventObject.PAGE_UP:
	                        me.getPicker().pagingToolbar.movePrevious();
	                        return true;
	                    case Ext.EventObject.PAGE_DOWN:
	                        me.getPicker().pagingToolbar.moveNext();
	                        return true;
	                    case Ext.EventObject.HOME:
	                        me.getPicker().pagingToolbar.moveFirst();
	                        return true;
	                    case Ext.EventObject.END:
	                        me.getPicker().pagingToolbar.moveLast();
	                        return true;
	                }

	                if (!Ext.isEmpty(me.getValue())) {
	                    if (e.keyCode == Ext.EventObject.BACKSPACE || e.keyCode == Ext.EventObject.DELETE) {

	                    }
	                }
	            }
	        });

            //合法验证
//	        me.on('blur', function () {
//	            var value = me.getValue();
//	            Ext.Ajax.request({
//	                url: C_ROOT + 'SUP/CommonHelp/ValidateData?helpid=' + me.helpid + '&inputValue=' + value,
//	                async: false, //同步请求
//	                success: function (response) {
//	                    var resp = Ext.JSON.decode(response.responseText);
//	                    if (resp.Status === "success") {
//	                        if (resp.Data == false) {
//	                            me.setValue('');
//	                        }
//	                    } else {
//	                        Ext.MessageBox.alert('取数失败', resp.status);
//	                    }
//	                }
//	            });
//	        });

	    },
	    initialListTemplate: function (store) {
	        var me = this;

	        var allfield;
	        var headText;
	        var initTpl;
	        var template;

	        initTpl = function () {

	            var modelFields;
	            var gridColumns;

	            var listheaders = '';
	            var listfields = '';

	            if (me.helpType === 'rich') {//用户自定义界面的模板 

	                modelFields = template.Template.Model.fields;
	                gridColumns = template.Template.GridColumns;

	                if (me.showAutoHeader) {
	                    for (var i = 0; i < gridColumns.length; i++) {
	                        listheaders += '<th class="x-column-header-inner x-column-header-over">' + gridColumns[i].header + '</th>';
	                    }
	                }

	                for (var i = 0; i < modelFields.length; i++) {
	                    listfields += '<td>{' + modelFields[i]['name'] + '}</td>';
	                }

	            }
	            else {

	                if (!allfield) return;

	                var fields = allfield.split(','); //所有字段
	                var heads = headText.split(','); //列头 

	                if (me.showAutoHeader) {
	                    for (var i = 0; i < heads.length; i++) {
	                        listheaders += '<th class="x-column-header-inner x-column-header-over">' + heads[i] + '</th>';
	                    }
	                }

	                modelFields = new Array();
	                for (var i = 0; i < fields.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //去掉表名
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    modelFields.push({
	                        name: temp, //fields[i],
	                        type: 'string',
	                        mapping: temp//fields[i]
	                    });

	                }
	            }


	            for (var i = 0; i < heads.length; i++) {

	                var tempfield = fields[i].split('.');
	                var temp;
	                if (tempfield.length > 1) {
	                    temp = tempfield[1]; //去掉表名
	                }
	                else {
	                    temp = fields[i];
	                }

	                listfields += '<td>{' + temp + '}</td>';
	            }

	            var store = Ext.create('Ext.data.Store', {
	                pageSize: 10, //这个决定页大小                
	                fields: modelFields,
	                proxy: {
	                    type: 'ajax',
	                    url: C_ROOT + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid,
	                    reader: {
	                        type: 'json',
	                        root: 'Record',
	                        totalProperty: 'totalRows'
	                    }
	                }
	            });
	            //me.bindStore(store); //动态绑定store
	            me.store = store;

	            //只能在这里写事件才能触发到
	            store.on('beforeload', function (store) {

	                Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //修改pageIndex为从0开始
	                if (me.outFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
	                }
	                if (me.likeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(me.likeFilter) });
	                }
	                if (me.leftLikeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
	                }
	                if (me.clientSqlFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'clientSqlFilter': me.clientSqlFilter });
	                }

	            })

	            if (me.needBlankLine) {
	                store.on('load', function (store, records, successful, eOpts) {

	                    //去掉表名
	                    var myValueFiled;
	                    var myDisplayField;
	                    var temp = me.valueField.split('.');
	                    if (temp.length > 1) {
	                        myValueFiled = temp[1];
	                    } else {
	                        myValueFiled = me.valueField;
	                    }

	                    temp = me.displayField.split('.');
	                    if (temp.length > 1) {
	                        myDisplayField = temp[1];
	                    } else {
	                        myDisplayField = me.displayField;
	                    }

	                    var emptydata = new Object();
	                    emptydata[myValueFiled] = '';
	                    emptydata[myDisplayField] = '&nbsp;'; //空html标记          

	                    var rs = [emptydata];
	                    store.insert(0, rs);
	                });
	            }

	            var temp;
	            if (me.showAutoHeader) {
	                temp = '<div><table width="100%" style="border-spacing:0px;"><tr>' + listheaders + '</tr><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
	            }
	            else {
	                temp = '<div><table width="100%" style="border-spacing:0px;"><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
	            }
	            me.tpl = temp;

	        };

	        var url;
	        if (me.helpType === 'rich') {
	            url = C_ROOT + 'SUP/CommonHelp/GetHelpTemplate?helpid=' + me.helpid;
	        }
	        else {
	            url = C_ROOT + 'SUP/CommonHelp/GetHelpInfo?helpid=' + me.helpid;
	        }


	        Ext.Ajax.request({
	            url: url,
	            callback: initTpl,
	            success: function (response) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.status === "ok") {

	                    if (me.helpType === 'rich') {
	                        //title = resp.Title;
	                        template = resp.template; //界面模板
	                    }
	                    else {
	                        //title = resp.data.Title;
	                        allfield = resp.data.AllField;
	                        headText = resp.data.HeadText;
	                    }

	                } else {
	                    Ext.MessageBox.alert('取数失败', resp.status);
	                }
	            }
	        });



	    },
	    onTriggerClick: function () {
	        var me = this;
	        if (me.readOnly || arguments.length == 3) return; //arguments.length == 3，输入框上点击           

	        if (Ext.isEmpty(me.helpid)) return;
	        //
	        var title;
	        var allfield;
	        var headText;
	        var ShowHelp;
	        var template;

	        ShowHelp = function () {

	            var queryItems;
	            var modelFields;
	            var gridColumns;

	            if (me.helpType === 'rich') {//用户自定义界面的模板            
	                queryItems = template.Template.QueryItems;
	                modelFields = template.Template.Model.fields;
	                gridColumns = template.Template.GridColumns;
	            }
	            else {

	                if (!allfield) return;

	                var fields = allfield.split(','); //所有字段
	                var heads = headText.split(','); //列头


	                queryItems = new Array();
	                for (var i = 0; i < heads.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp = fields[i]; ;
	                    //                    if (tempfield.length > 1) {
	                    //                        temp = tempfield[1]; //去掉表名
	                    //                    }
	                    //                    else {
	                    //                        temp = fields[i];
	                    //                    }

	                    queryItems.push({
	                        xtype: 'textfield',
	                        fieldLabel: heads[i],
	                        name: temp //fields[i]
	                        //anchor: '95%'
	                    });
	                }

	                modelFields = new Array();
	                for (var i = 0; i < fields.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //去掉表名
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    modelFields.push({
	                        name: fields[i], //不去掉表名
	                        type: 'string',
	                        mapping: temp
	                    });
	                }

	                gridColumns = new Array();
	                //                for (var i = 0; i < fields.length; i++) {

	                //                    var tempfield = fields[i].split('.');
	                //                    var temp;
	                //                    if (tempfield.length > 1) {
	                //                        temp = tempfield[1]; //去掉表名
	                //                    }
	                //                    else {
	                //                        temp = fields[i];
	                //                    }

	                //                    gridColumns.push({
	                //                        header: heads[i],
	                //                        flex: 1,
	                //                        //sortable: true,
	                //                        dataIndex: temp//fields[i]
	                //                    });
	                //                }

	                for (var i = 0; i < heads.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //去掉表名
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    gridColumns.push({
	                        header: heads[i],
	                        flex: 1,
	                        //sortable: true,
	                        dataIndex: fields[i]
	                    });
	                }
	            }

	            var toolbar = Ext.create('Ext.Toolbar', {
	                region: 'north',
	                border: false,
	                //split: true,
	                height: 26,
	                minSize: 26,
	                maxSize: 26,
	                items: [
								{
								    id: "help_query",
								    text: "查询",
								    iconCls: 'add'
								},
								{
								    id: 'help_show',
								    text: '显示',
								    iconCls: 'icon-unfold',
								    handler: function () {
								        if (this.iconCls == 'icon-unfold') {
								            this.setIconCls('icon-fold');
								            this.setText("隐藏");
								            querypanel.show();
								        } else {
								            this.setIconCls('icon-unfold');
								            this.setText("显示");
								            querypanel.hide();
								        }
								    }
								},
								 "->",
							   {
							       id: "help_close",
							       text: "关闭",
							       iconCls: 'cross'
							   }
							 ]
	            });

	            querypanel = Ext.create('Ext.ng.TableLayoutForm', {
	                region: 'north',
	                hidden: true,
	                bodyStyle: 'padding:3px',
	                fields: queryItems
	            })

	            Ext.define('model', {
	                extend: 'Ext.data.Model',
	                fields: modelFields
	            });

	            var store = Ext.create('Ext.ng.JsonStore', {
	                model: 'model',
	                pageSize: 20,
	                autoLoad: true,
	                url: C_ROOT + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid
	            });

	            //store.load();//这里load，IE的界面会扭掉

	            var pagingbar = Ext.create('Ext.ng.PagingBar', {
	                store: store
	            });

	            var selModel = Ext.create('Ext.selection.CheckboxModel');

	            var grid;
	            //多选
	            if (me.selectMode === 'multiple') {

	                grid = Ext.create('Ext.ng.GridPanel', {
	                    region: 'center',
	                    frame: true,
	                    border: false,
	                    store: store,
	                    selModel: selModel, //多选
	                    columnLines: true,
	                    columns: gridColumns,
	                    bbar: pagingbar
	                });
	            }
	            else {//单选
	                grid = Ext.create('Ext.ng.GridPanel', {
	                    region: 'center',
	                    frame: true,
	                    border: false,
	                    store: store,
	                    //autoScroll:true,
	                    columnLines: true,
	                    //                    layout: {
	                    //                        type: 'hbox', //这个会出现横向滚动条，难看
	                    //                        align: 'stretch'
	                    //                    },
	                    columns: gridColumns,
	                    bbar: pagingbar
	                });
	            }

	            grid.on('itemdblclick', function () {

	                //
	                var data = grid.getSelectionModel().getSelection();

	                if (data.length > 0) {
	                    var code = data[0].get(me.valueField);
	                    var name = data[0].get(me.displayField);

	                    var obj = new Object();
	                    obj[me.valueField] = code;

	                    if (me.displayFormat) {
	                        obj[me.displayField] = Ext.String.format(me.displayFormat, code, name);
	                    } else {
	                        obj[me.displayField] = (name === '&nbsp;') ? '' : name;
	                    }

	                    var valuepair = Ext.ModelManager.create(obj, 'model');

	                    me.setValue(valuepair); //必须这么设置才能成功

	                    win.hide();
	                    win.destroy();

	                    //if (me.isInGrid) {

	                    var pobj = new Object();
	                    pobj.code = code;
	                    pobj.name = name;
	                    pobj.type = 'fromhelp';
	                    pobj.data = data[0].data;

	                    //空值修正
	                    for (var p in pobj.data) {
	                        if (pobj.data[p] && pobj.data[p] === '&nbsp;') {
	                            pobj.data[p] = '';
	                        }
	                    }

	                    me.fireEvent('helpselected', pobj);
	                    //}

	                }
	            }, this)

	            //显示弹出窗口
	           var win = Ext.create('Ext.window.Window', {
	                title: title, //'Hello',
	                border: false,
	                height: me.helpHeight,
	                width: me.helpWidth,
	                layout: 'border',
	                modal: true,
	                items: [toolbar, querypanel, grid]
	            });

	            win.show();

	            //store.load();//手工调不会触发beforeload事件


	            toolbar.items.get('help_query').on('click', function () {
	                store.cachePageData = false;
	                store.load();
	                store.cachePageData = true;

	            })

	            toolbar.items.get('help_close').on('click', function () {

	                win.hide();
	                win.destroy();

	            })

	            store.on('beforeload', function () {
	                var formdata = querypanel.getForm();
	                var data = formdata.getValues();

	                if (me.likeFilter) {
	                    Ext.apply(data, me.likeFilter);
	                }

	                //debugger;
	                if (me.outFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(data), 'outqueryfilter': JSON.stringify(me.outFilter) });
	                }
	                else {
	                    Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(data) });
	                }

	                if (me.leftLikeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
	                }
	                if (me.clientSqlFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'clientSqlFilter': me.clientSqlFilter });
	                }

	                //return true;
	            })

	            if (me.needBlankLine) {
	                store.on('load', function (store, records, successful, eOpts) {
                       
	                    //去掉表名
	                    var myValueFiled;
	                    var myDisplayField;
	                    var temp = me.valueField.split('.');
	                    if (temp.length > 1) {
	                        myValueFiled = temp[1];
	                    } else {
	                        myValueFiled = me.valueField;
	                    }

	                    temp = me.displayField.split('.');
	                    if (temp.length > 1) {
	                        myDisplayField = temp[1];
	                    } else {
	                        myDisplayField = me.displayField;
	                    }

	                    var emptydata = new Object();
	                    emptydata[myValueFiled] = '';
	                    emptydata[myDisplayField] = '&nbsp;'; //空html标记          

	                    var rs = [emptydata];
	                    store.insert(0, rs);
	                });
	            }

	        };

	        var url;
	        if (me.helpType === 'rich') {
	            url = C_ROOT + 'SUP/CommonHelp/GetHelpTemplate?helpid=' + me.helpid;
	        }
	        else {
	            url = C_ROOT + 'SUP/CommonHelp/GetHelpInfo?helpid=' + me.helpid;
	        }


	        Ext.Ajax.request({
	            //params: { 'id': busid },
	            url: url,
	            callback: ShowHelp,
	            success: function (response) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.status === "ok") {



	                    if (me.helpType === 'rich') {
	                        title = resp.Title;
	                        template = resp.template; //界面模板
	                    }
	                    else {
	                        title = resp.data.Title;
	                        allfield = resp.data.AllField;
	                        headText = resp.data.HeadText;
	                    }

	                } else {
	                    Ext.MessageBox.alert('取数失败', resp.status);
	                }
	            }
	        });


	    },
	    showHelp: function () {
	        this.onTriggerClick();
	    },
	    bindData: function () {
	        var me = this;

	        BindCombox(me, me.valueField, me.displayField, me.helpid, me.getValue(), me.selectMode);

	        return;

	        //        Ext.Ajax.request({
	        //            params: { 'outqueryfilter': me.outFilter },
	        //            url: C_ROOT + 'SUP/CommonHelp/GetName?helpid=' + me.helpid + '&code=' + me.getValue(),
	        //            success: function (response) {

	        //                var resp = Ext.JSON.decode(response.responseText);
	        //                if (resp.status === "ok") {

	        //                    Ext.define('model', {
	        //                        extend: 'Ext.data.Model',
	        //                        fields: [{
	        //                            name: me.valueField, //'code',
	        //                            type: 'string',
	        //                            mapping: me.valueField//'code'
	        //                        }, {
	        //                            name: me.displayField, //'name',
	        //                            type: 'string',
	        //                            mapping: me.displayField//'name'
	        //                        }
	        //                     ]
	        //                    });

	        //                    if (!Ext.isEmpty(resp.name)) {
	        //                        var obj = new Object();
	        //                        obj[me.valueField] = me.getValue();

	        //                        if (me.displayFormat) {
	        //                            obj[me.displayField] = Ext.String.format(me.displayFormat, me.getValue(), resp.name);
	        //                        } else {
	        //                            obj[me.displayField] = resp.name; //显示值
	        //                        }

	        //                        var provincepair = Ext.ModelManager.create(obj, 'model');
	        //                        me.setValue(provincepair);
	        //                    }

	        //                } else {
	        //                    Ext.MessageBox.alert('取数失败', resp.status);
	        //                }
	        //            }
	        //        });

	    }, //bindData
	    getCodeName: function (value) {
	        var me = this;
	        var name;

	        Ext.Ajax.request({
	            url: C_ROOT + 'SUP/CommonHelp/GetName?helptype=Single&helpid=' + me.helpid + '&code=' + value,
	            async: false, //同步请求
	            success: function (response) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.status === "ok") {
	                    name = resp.name; //显示值                    
	                } else {
	                    Ext.MessageBox.alert('取数失败', resp.status);
	                    name = 'error';
	                }
	            }
	        });

	        return name;
	    },
	    setOutFilter: function (obj) {
	        this.outFilter = obj;
	    },
	    setLikeFilter: function (obj) {
	        this.likeFilter = obj;
	    },
	    setLeftLikeFilter: function (obj) {
	        this.leftLikeFilter = obj;
	    },
	    setClientSqlFilter: function (str) {
	        this.clientSqlFilter = str;
	    },
	    getFirstRowData: function () {
	        var me = this;
	        var fields = me.listFields.split(',');

	        var modelFields = new Array();
	        for (var i = 0; i < fields.length; i++) {

	            var tempfield = fields[i].split('.');
	            var temp;
	            if (tempfield.length > 1) {
	                temp = tempfield[1]; //去掉表名
	            }
	            else {
	                temp = fields[i];
	            }

	            modelFields.push({
	                name: fields[i],
	                type: 'string',
	                mapping: temp
	            });
	        }

	        Ext.define('model', {
	            extend: 'Ext.data.Model',
	            fields: modelFields
	        });

	        var store = Ext.create('Ext.ng.JsonStore', {
	            model: 'model',
	            pageSize: 20,
	            autoLoad: false,
	            url: C_ROOT + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid
	        });

	        store.on('beforeload', function () {

	            //            var data = new Object();
	            //            data[me.valueField] = value;

	            if (me.outFilter) {
	                //Ext.apply(me.outFilter, data);
	                Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
	            }
	            else {
	                Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(data) });
	            }

	        })

	        store.load(function () {
	            var data = store.data.items[0].data;
	            me.fireEvent('firstrowloaded', data);
	        });


	    }
	});

	Ext.define('Ext.ng.MultiHelp', {
	    extend: 'Ext.form.field.ComboBox',
	    mixins: { base: 'Ext.ng.form.field.Base' },
	    requires: ['Ext.ng.form.field.Base'],
	    alias: ['widget.ngMutilHelp'],
	    pageSize: 10,
	    minChars: 100, //定义输入最少多少个字符的时候智能搜锁获取数据,设100来禁止智能搜索
	    helpType: 'simple', //默认是simple,自定义界面：rich
	    helpWidth: 600, //帮助宽度
	    helpHeight: 400, //帮助高度
	    showAutoHeader: false,
	    //outFilter: {}, //外部查询条件,精确条件
	    //likeFilter: {}, //外部模糊查询条件，like条件
	    selectMode: 'Multi', //multiple  
	    needBlankLine: false,
	    //forceSelection: true,
	    autoSelect: false, //不要自动选择第一行
	    enableKeyEvents: true, //允许key事件
	    selectOnFoucus: true,
	    typeAhead: false, //延时查询
	    typeAheadDelay: 500, //延迟500毫秒，默认是250
	    //valueNotFoundText: 'Select a Country!!...',
	    queryMode: 'remote',
	    triggerAction: 'all', //'query'
	    //triggerCls: 'icon-ComHelp',        
	    initComponent: function () {
	        //
	        var me = this;
	        this.callParent();
	        this.mixins.base.initComponent.call(me); //与callParent方法不可调换

	        //me.tpl = '<div><table width="100%" ><tr><th class="x-column-header-inner x-column-header-over" >代码</th><th class="x-column-header-inner x-column-header-over">名称</th></tr><tpl for="."><tr class="x-boundlist-item"><td>{' + this.valueField + '}</td><td>{' + this.displayField + '}<td></tr></tpl></table></div>';
	        if (Ext.isEmpty(me.helpid) || Ext.isEmpty(me.displayField) || Ext.isEmpty(me.valueField)) return;

	        if (me.listFields && me.listHeadTexts) {

	            var listheaders = '';
	            var listfields = '';

	            var heads = me.listHeadTexts.split(','); //列头 
	            var fields = me.listFields.split(','); //所有字段              

	            var modelFields = new Array();
	            for (var i = 0; i < fields.length; i++) {

	                var tempfield = fields[i].split('.');
	                var temp;
	                if (tempfield.length > 1) {
	                    temp = tempfield[1]; //去掉表名
	                }
	                else {
	                    temp = fields[i];
	                }

	                modelFields.push({
	                    name: temp, //fields[i],
	                    type: 'string',
	                    mapping: temp //fields[i]
	                });

	            }

	            if (me.showAutoHeader) {

	                for (var i = 0; i < heads.length; i++) {
	                    listheaders += '<th class="x-column-header-inner x-column-header-over">' + heads[i] + '</th>';
	                }
	            }

	            for (var i = 0; i < heads.length; i++) {

	                var tempfield = fields[i].split('.');
	                var temp;
	                if (tempfield.length > 1) {
	                    temp = tempfield[1]; //去掉表名
	                }
	                else {
	                    temp = fields[i];
	                }
	                listfields += '<td>{' + temp + '}</td>';
	            }

	            var temp;
	            if (me.showAutoHeader) {
	                temp = '<div><table width="100%" style="border-spacing:0px;" ><tr>' + listheaders + '</tr><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
	            } else {
	                temp = '<div><table width="100%" style="border-spacing:0px;" ><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
	            }
	            me.tpl = temp;

	            var store = Ext.create('Ext.data.Store', {
	                pageSize: 10,
	                fields: modelFields,
	                proxy: {
	                    type: 'ajax',
	                    url: C_ROOT + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid,
	                    reader: {
	                        type: 'json',
	                        root: 'Record',
	                        totalProperty: 'totalRows'
	                    }
	                }
	            });

	            me.bindStore(store);

	            //只能在这里写事件才能触发到
	            store.on('beforeload', function (store) {

	                Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //修改pageIndex为从0开始
	                if (me.outFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
	                }
	                if (me.likeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(me.likeFilter) });
	                }
	                if (me.leftLikeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
	                }
	                if (me.clientSqlFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'clientSqlFilter': me.clientSqlFilter });
	                }

	            });

	            if (me.needBlankLine) {
	                store.on('load', function (store, records, successful, eOpts) {

	                    //去掉表名
	                    var myValueFiled;
	                    var myDisplayField;
	                    var temp = me.valueField.split('.');
	                    if (temp.length > 1) {
	                        myValueFiled = temp[1];
	                    } else {
	                        myValueFiled = me.valueField;
	                    }

	                    temp = me.displayField.split('.');
	                    if (temp.length > 1) {
	                        myDisplayField = temp[1];
	                    } else {
	                        myDisplayField = me.displayField;
	                    }

	                    var emptydata = new Object();
	                    emptydata[myValueFiled] = '';
	                    emptydata[myDisplayField] = '&nbsp;'; //空html标记          

	                    var rs = [emptydata];
	                    store.insert(0, rs);
	                });
	            }

	        }
	        else {
	            me.initialListTemplate(); //初始化下拉列表样式 
	        }

	        me.addEvents('helpselected'); //定义值被选完的事件
	        me.addEvents('firstrowloaded');

	        me.on('select', function (combo, records, eOpts) {

	            var theField;

	            //构建
	            if (me.listFields) {
	                theField = [];
	                var temp = me.listFields.split(',');
	                for (var i = 0; i < temp.length; i++) {
	                    theField.push(temp[i]);
	                }
	            }
	            else {
	                theField = [me.valueField, me.displayField];
	            }

	            Ext.define('themodel', {
	                extend: 'Ext.data.Model',
	                fields: theField
	            });

	            //去掉表名
	            var myValueFiled;
	            var myDisplayField;
	            var temp = me.valueField.split('.');
	            if (temp.length > 1) {
	                myValueFiled = temp[1];
	            } else {
	                myValueFiled = me.valueField;
	            }

	            temp = me.displayField.split('.');
	            if (temp.length > 1) {
	                myDisplayField = temp[1];
	            } else {
	                myDisplayField = me.displayField;
	            }


	            var code = combo.getValue() || records[0].data[myValueFiled];
	            var name = combo.getRawValue() || records[0].data[myDisplayField];

	            if (Ext.isEmpty(code)) {
	                name = '';
	            }

	            var obj = new Object();
	            if (me.isInGrid) {//嵌在grid中
	                obj[me.valueField] = name; //欺骗,grid那边显示有问题
	            } else {
	                obj[me.valueField] = code;
	            }
	            if (me.displayFormat) {
	                obj[me.displayField] = Ext.String.format(me.displayFormat, code, name);
	            } else {
	                obj[me.displayField] = name;
	            }

	            var valuepair = Ext.ModelManager.create(obj, 'themodel');
	            me.setValue(valuepair); //必须这么设置才能成功

	            //debugger;
	            var pobj = new Object();
	            pobj.code = code;
	            pobj.name = name;
	            pobj.type = 'autocomplete';
	            //pobj.data = records[0].data;
	            pobj.data = {};
	            for (var i = 0; i < theField.length; i++) {
	                var temp = theField[i].split('.');
	                if (temp.length > 1) {
	                    pobj.data[theField[i]] = records[0].data[temp[1]];
	                }
	                else {
	                    pobj.data[theField[i]] = records[0].data[theField[i]];
	                }
	            }

	            me.fireEvent('helpselected', pobj);

	        });

	        me.on('expand', function (field, opt) {

	            //刷新按钮去掉
	            var autoPagingbar = me.getPicker().pagingToolbar;
	            autoPagingbar.remove(autoPagingbar.items.items[10]);
	            autoPagingbar.remove(autoPagingbar.items.items[9]);

	        });

	        me.on('keydown', function (combo, e, eOpts) {


	            if (me.isExpanded) {

	                //回车
	                if (e.keyCode == Ext.EventObject.ENTER) {
	                    if (me.picker.el.query('.' + me.picker.overItemCls).length > 0) return false;
	                    me.onTriggerClick();
	                }

	                //翻页
	                switch (e.keyCode) {
	                    case Ext.EventObject.PAGE_UP:
	                        me.getPicker().pagingToolbar.movePrevious();
	                        return true;
	                    case Ext.EventObject.PAGE_DOWN:
	                        me.getPicker().pagingToolbar.moveNext();
	                        return true;
	                    case Ext.EventObject.HOME:
	                        me.getPicker().pagingToolbar.moveFirst();
	                        return true;
	                    case Ext.EventObject.END:
	                        me.getPicker().pagingToolbar.moveLast();
	                        return true;
	                }

	                if (!Ext.isEmpty(me.getValue())) {
	                    if (e.keyCode == Ext.EventObject.BACKSPACE || e.keyCode == Ext.EventObject.DELETE) {

	                    }
	                }
	            }
	        });

	    },
	    listeners: {
	        render: function (me, eOpts) {
	            me.el.down('input').dom.readOnly = true; //禁用输入框
	        }
	    },
	    initialListTemplate: function (store) {
	        var me = this;

	        var allfield;
	        var headText;
	        var initTpl;
	        var template;

	        initTpl = function () {

	            var modelFields;
	            var gridColumns;

	            var listheaders = '';
	            var listfields = '';

	            if (me.helpType === 'rich') {//用户自定义界面的模板 

	                modelFields = template.Template.Model.fields;
	                gridColumns = template.Template.GridColumns;

	                if (me.showAutoHeader) {
	                    for (var i = 0; i < gridColumns.length; i++) {
	                        listheaders += '<th class="x-column-header-inner x-column-header-over">' + gridColumns[i].header + '</th>';
	                    }
	                }

	                for (var i = 0; i < modelFields.length; i++) {
	                    listfields += '<td>{' + modelFields[i]['name'] + '}</td>';
	                }

	            }
	            else {

	                if (!allfield) return;

	                var fields = allfield.split(','); //所有字段
	                var heads = headText.split(','); //列头 

	                if (me.showAutoHeader) {
	                    for (var i = 0; i < heads.length; i++) {
	                        listheaders += '<th class="x-column-header-inner x-column-header-over">' + heads[i] + '</th>';
	                    }
	                }

	                modelFields = new Array();
	                for (var i = 0; i < fields.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //去掉表名
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    modelFields.push({
	                        name: temp, //fields[i],
	                        type: 'string',
	                        mapping: temp//fields[i]
	                    });

	                }
	            }


	            for (var i = 0; i < heads.length; i++) {

	                var tempfield = fields[i].split('.');
	                var temp;
	                if (tempfield.length > 1) {
	                    temp = tempfield[1]; //去掉表名
	                }
	                else {
	                    temp = fields[i];
	                }

	                listfields += '<td>{' + temp + '}</td>';
	            }

	            var store = Ext.create('Ext.data.Store', {
	                pageSize: 10, //这个决定页大小                
	                fields: modelFields,
	                proxy: {
	                    type: 'ajax',
	                    url: C_ROOT + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid,
	                    reader: {
	                        type: 'json',
	                        root: 'Record',
	                        totalProperty: 'totalRows'
	                    }
	                }
	            });
	            //me.bindStore(store); //动态绑定store
	            me.store = store;

	            //只能在这里写事件才能触发到
	            store.on('beforeload', function (store) {
	                //debugger;
	                Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //修改pageIndex为从0开始
	                if (me.outFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
	                }
	                if (me.likeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(me.likeFilter) });
	                }
	                if (me.leftLikeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
	                }
	                if (me.clientSqlFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'clientSqlFilter': me.clientSqlFilter });
	                }

	            })

	            if (me.needBlankLine) {
	                store.on('load', function (store, records, successful, eOpts) {

	                    //去掉表名
	                    var myValueFiled;
	                    var myDisplayField;
	                    var temp = me.valueField.split('.');
	                    if (temp.length > 1) {
	                        myValueFiled = temp[1];
	                    } else {
	                        myValueFiled = me.valueField;
	                    }

	                    temp = me.displayField.split('.');
	                    if (temp.length > 1) {
	                        myDisplayField = temp[1];
	                    } else {
	                        myDisplayField = me.displayField;
	                    }

	                    var emptydata = new Object();
	                    emptydata[myValueFiled] = '';
	                    emptydata[myDisplayField] = '&nbsp;'; //空html标记          

	                    var rs = [emptydata];
	                    store.insert(0, rs);
	                });
	            }

	            var temp;
	            if (me.showAutoHeader) {
	                temp = '<div><table width="100%" style="border-spacing:0px;"><tr>' + listheaders + '</tr><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
	            }
	            else {
	                temp = '<div><table width="100%" style="border-spacing:0px;"><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
	            }
	            me.tpl = temp;

	        };

	        var url;
	        if (me.helpType === 'rich') {
	            url = C_ROOT + 'SUP/CommonHelp/GetHelpTemplate?helpid=' + me.helpid;
	        }
	        else {
	            url = C_ROOT + 'SUP/CommonHelp/GetHelpInfo?helpid=' + me.helpid;
	        }

	        Ext.Ajax.request({
	            url: url,
	            callback: initTpl,
	            success: function (response) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.status === "ok") {

	                    if (me.helpType === 'rich') {
	                        //title = resp.Title;
	                        template = resp.template; //界面模板
	                    }
	                    else {
	                        //title = resp.data.Title;
	                        allfield = resp.data.AllField;
	                        headText = resp.data.HeadText;
	                    }

	                } else {
	                    Ext.MessageBox.alert('取数失败', resp.status);
	                }
	            }
	        });

	    },
	    onTriggerClick: function () {
	        var me = this;
	        if (me.readOnly) return;

	        if (Ext.isEmpty(me.helpid)) return;
	        //
	        var title;
	        var allfield;
	        var headText;
	        var ShowHelp;
	        var template;

	        ShowHelp = function () {
	            var queryItems;
	            var modelFields;
	            var gridColumns;

	            if (me.helpType === 'rich') {//用户自定义界面的模板            
	                queryItems = template.Template.QueryItems;
	                modelFields = template.Template.Model.fields;
	                gridColumns = template.Template.GridColumns;
	            }
	            else {

	                if (!allfield) return;

	                var fields = allfield.split(','); //所有字段
	                var heads = headText.split(','); //列头

	                queryItems = new Array();
	                for (var i = 0; i < heads.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp = fields[i]; ;
	                    //                    if (tempfield.length > 1) {
	                    //                        temp = tempfield[1]; //去掉表名
	                    //                    }
	                    //                    else {
	                    //                        temp = fields[i];
	                    //                    }

	                    queryItems.push({
	                        xtype: 'textfield',
	                        fieldLabel: heads[i],
	                        name: temp //fields[i]                            
	                    });
	                }

	                modelFields = new Array();
	                for (var i = 0; i < fields.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //去掉表名
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    modelFields.push({
	                        name: fields[i], //不去掉表名
	                        type: 'string',
	                        mapping: temp
	                    });
	                }

	                gridColumns = new Array();
	                for (var i = 0; i < heads.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //去掉表名
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    gridColumns.push({
	                        header: heads[i],
	                        flex: 1,
	                        //sortable: true,
	                        dataIndex: fields[i]
	                    });
	                }
	            }

	            var toolbar = Ext.create('Ext.Toolbar', {
	                region: 'north',
	                border: false,
	                //split: true,
	                height: 26,
	                minSize: 26,
	                maxSize: 26,
	                items: [
								{
								    id: "help_query",
								    text: "查询",
								    iconCls: 'add'
								},
								{
								    id: 'help_show',
								    text: '显示',
								    iconCls: 'icon-unfold',
								    handler: function () {
								        if (this.iconCls == 'icon-unfold') {
								            this.setIconCls('icon-fold');
								            this.setText("隐藏");
								            querypanel.show();
								        } else {
								            this.setIconCls('icon-unfold');
								            this.setText("显示");
								            querypanel.hide();
								        }
								    }
								},
								 "->",
							   {
							       id: "help_close",
							       text: "关闭",
							       iconCls: 'cross'
							   }
							 ]
	            });

	            var querypanel = Ext.create('Ext.ng.TableLayoutForm', {
	                region: 'north',
	                hidden: true,
	                fields: queryItems,
	                style: { borderColor: 'transparent', backgroundColor: 'transparent' }
	            })

	            Ext.define('model', {
	                extend: 'Ext.data.Model',
	                fields: modelFields
	            });

	            var store = Ext.create('Ext.ng.JsonStore', {
	                model: 'model',
	                pageSize: 20,
	                autoLoad: true,
	                url: C_ROOT + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid
	            });

	            //store.load();//这里load，IE的界面会扭掉

	            var pagingbar = Ext.create('Ext.ng.PagingBar', {
	                store: store,
	                displayMsg: '共 {2} 条数据',
	                //emptyMsg: "没有数据",
	                beforePageText: "第",
	                afterPageText: "/{0} 页",
	                style: { backgroundImage: 'none', backgroundColor: 'transparent' }
	            });

	            var selModel = Ext.create('Ext.selection.CheckboxModel');
	            var grid = Ext.create('Ext.ng.GridPanel', {
	                region: 'center',
	                //frame: true,
	                border: false,
	                store: store,
	                selModel: { mode: "SIMPLE" }, //MULTI, //多选
	                columnLines: true,
	                columns: gridColumns
	                //bbar: pagingbar
	            });

	            var resultStore = Ext.create('Ext.ng.JsonStore', {
	                model: 'model'
	            });

	            var selectedLoaded = false;
	            //已选值记忆
	            store.on('load', function () {

	                if (!Ext.isEmpty(me.value)) {
	                    if (!selectedLoaded) {
	                        var rows = 0;
	                        var selectData = [];
	                        var vals = me.value.split(',');
	                        for (var i = 0; i < vals.length; i++) {
	                            var index = store.find(me.valueField, vals[i]);
	                            var record = store.getAt(index);
	                            if (record) {
	                                selectData.push(record);
	                                rows++;
	                            }
	                        }

	                        if (rows == vals.length) {
	                            resultStore.insert(0, selectData); //批量插入
	                        }
	                        else {

	                            Ext.Ajax.request({
	                                params: { 'helpid': me.helpid, 'codes': me.value },
	                                url: C_ROOT + 'SUP/CommonHelp/GetSelectedData',
	                                success: function (response) {
	                                    var resp = Ext.JSON.decode(response.responseText);
	                                    if (resp.Record.length > 0) {
	                                        resultStore.insert(0, resp.Record);
	                                    } else {
	                                        Ext.MessageBox.alert('获取失败');
	                                    }
	                                }
	                            });
	                        }
	                        selectedLoaded = true;
	                    } //if
	                }

	            });

	            var resultGrid = Ext.create('Ext.ng.GridPanel', {
	                region: 'east',
	                //frame: true,
	                width: 235,
	                border: false,
	                store: resultStore,
	                selModel: { mode: "SIMPLE" }, //多选
	                columnLines: true,
	                columns: gridColumns
	            });

	            var btnPanel = Ext.create('Ext.panel.Panel', {
	                region: 'east',
	                width: 80,
	                layout: 'absolute',
	                border: false,
	                frame: true,
	                padding: 0,
	                style: { borderColor: 'transparent', backgroundColor: 'transparent' }, //backgroundColor: 'transparent !important',marginTop: '22px',
	                items: [{
	                    xtype: 'button',
	                    name: 'addSelect',
	                    text: '&gt;',
	                    x: 9,
	                    y: 120,
	                    width: 60,
	                    handler: Ext.bind(function () {
	                        var data = grid.getSelectionModel().getSelection();
	                        me.copyData(data, resultStore);
	                    })
	                }, {
	                    xtype: 'button',
	                    name: 'selectAll',
	                    text: '&gt;&gt;',
	                    x: 9,
	                    y: 150,
	                    width: 60,
	                    handler: Ext.bind(function () {
	                        var data = store.data.items;
	                        me.copyData(data, resultStore);
	                    })
	                }, {
	                    xtype: 'button',
	                    name: 'removeSelect',
	                    text: '&lt;',
	                    x: 9,
	                    y: 180,
	                    width: 60,
	                    handler: Ext.bind(function () {
	                        var data = resultGrid.getSelectionModel().getSelection();
	                        resultStore.remove(data);
	                    })
	                }, {
	                    xtype: 'button',
	                    name: 'removeAll',
	                    text: '&lt;&lt;',
	                    x: 9,
	                    y: 210,
	                    width: 60,
	                    handler: Ext.bind(function () {
	                        resultStore.removeAll();
	                    })
	                }]
	            });

	            var panel = Ext.create('Ext.panel.Panel', {
	                region: 'center',
	                //frame: true,
	                border: false,
	                layout: 'border',
	                items: [grid, btnPanel, resultGrid]
	            });

	            //显示弹出窗口
	            var win = Ext.create('Ext.window.Window', {
	                title: title, //'Hello',
	                border: false,
	                height: me.helpHeight,
	                width: me.helpWidth,
	                layout: 'border',
	                modal: true,
	                items: [toolbar, querypanel, panel],
	                buttons: [pagingbar, '->', { text: '确定', handler: function () { me.btnOk(me, resultStore,win); } }, { text: '取消', handler: function () { win.close(); } }],
	                layout: {
	                    type: 'border',
	                    padding: 1
	                }
	            });

	            win.show();

	            //pagingbar.el.down('.x-box-inner').setStyle({ backgroundColor: 'transparent' }); //#dfe8f6

	            //store.load();//手工调不会触发beforeload事件

	            grid.on('itemdblclick', function (grid, record, item) {
	                var data = [];
	                data = grid.getSelectionModel().getSelection();
	                if (data.length == 0) {//直接双击取不到选中的行
	                    data.push(record);
	                }
	                me.copyData(data, resultStore);
	            }, this)

	            toolbar.items.get('help_query').on('click', function () {
	                store.cachePageData = false;
	                store.load();
	                store.cachePageData = true;

	            })

	            toolbar.items.get('help_close').on('click', function () {

	                win.hide();
	                win.destroy();

	            })

	            store.on('beforeload', function () {
	                var formdata = querypanel.getForm();
	                var data = formdata.getValues();

	                if (me.likeFilter) {
	                    Ext.apply(data, me.likeFilter);
	                }

	                //debugger;
	                if (me.outFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(data), 'outqueryfilter': JSON.stringify(me.outFilter) });
	                }
	                else {
	                    Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(data) });
	                }

	                if (me.leftLikeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
	                }
	                if (me.clientSqlFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'clientSqlFilter': me.clientSqlFilter });
	                }

	                //return true;
	            })
	        };

	        var url;
	        if (me.helpType === 'rich') {
	            url = C_ROOT + 'SUP/CommonHelp/GetHelpTemplate?helpid=' + me.helpid;
	        }
	        else {
	            url = C_ROOT + 'SUP/CommonHelp/GetHelpInfo?helpid=' + me.helpid;
	        }

	        Ext.Ajax.request({
	            //params: { 'id': busid },
	            url: url,
	            callback: ShowHelp,
	            success: function (response) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.status === "ok") {

	                    if (me.helpType === 'rich') {
	                        title = resp.Title;
	                        template = resp.template; //界面模板
	                    }
	                    else {
	                        title = resp.data.Title;
	                        allfield = resp.data.AllField;
	                        headText = resp.data.HeadText;
	                    }

	                } else {
	                    Ext.MessageBox.alert('取数失败', resp.status);
	                }
	            }
	        });

	    },
	    showHelp: function () {
	        this.onTriggerClick();
	    },
	    copyData: function (selectData, resultStore) {

	        var me = this;
	        var dataLen = selectData.length;
	        var count = resultStore.getCount();
	        var index = count;
	        if (count > 0) {
	            for (var i = 0; i < dataLen; i++) {
	                var sourceData = selectData[i].data[me.valueField];
	                var hit = false;
	                for (var j = 0; j < count; j++) {
	                    var selectedData = resultStore.data.items[j].data[me.valueField];
	                    if (sourceData === selectedData) {
	                        hit = true;
	                    }
	                }
	                if (!hit) {
	                    resultStore.insert(index, selectData[i]);
	                    index++;
	                }
	            }
	        } else {
	            resultStore.insert(0, selectData); //批量插入
	        }
	    },
	    btnOk: function (me, resultStore,win) {

	        var values = new Array();
	        var names = new Array();

	        var arr = resultStore.data.items;
	        for (var i = 0; i < arr.length; i++) {

	            values.push(arr[i].data[me.valueField]);
	            names.push(arr[i].data[me.displayField]);
	        }

	        var code = values.join(',');
	        var name = names.join(',');

	        var obj = new Object();
	        obj[me.valueField] = code;

	        if (me.displayFormat) {
	            obj[me.displayField] = Ext.String.format(me.displayFormat, code, name);
	        } else {
	            obj[me.displayField] = name;
	        }

	        var valuepair = Ext.ModelManager.create(obj, 'model');
	        me.setValue(valuepair); //必须这么设置才能成功

	        win.hide();
	        win.destroy();

	        //if (me.isInGrid) {

	        var pobj = new Object();
	        pobj.code = code;
	        pobj.name = name;
	        pobj.type = 'fromhelp';
	        pobj.data = arr;

	        me.fireEvent('helpselected', pobj);

	    },
	    bindData: function () {
	        var me = this;

	        BindCombox(me, me.valueField, me.displayField, me.helpid, me.getValue(), me.selectMode);

	        return;
	    }, //bindData
	    getCodeName: function (value) {
	        var me = this;
	        var name;
	        //

	        Ext.Ajax.request({
	            url: C_ROOT + 'SUP/CommonHelp/GetName?helptype=Multi&helpid=' + me.helpid + '&code=' + value,
	            async: false, //同步请求
	            success: function (response) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.status === "ok") {
	                    name = resp.name; //显示值                    
	                } else {
	                    Ext.MessageBox.alert('取数失败', resp.status);
	                    name = 'error';
	                }
	            }
	        });

	        return name;
	    },
	    setOutFilter: function (obj) {
	        this.outFilter = obj;
	    },
	    setLikeFilter: function (obj) {
	        this.likeFilter = obj;
	    },
	    setClientSqlFilter: function (str) {
	        this.clientSqlFilter = str;
	    },
	    setLeftLikeFilter: function (obj) {
	        this.leftLikeFilter = obj;
	    }
	});

	Ext.define('Ext.ng.RichHelp', {
	    extend: 'Ext.form.field.ComboBox',
	    mixins: { base: 'Ext.ng.form.field.Base' },
	    requires: ['Ext.ng.form.field.Base'],
	    alias: ['widget.ngRichHelp'],
	    pageSize: 10,
	    minChars: 1, //定义输入最少多少个字符的时候获取数据
	    helpType: 'simple', //默认是simple,自定义界面：rich
	    helpWidth: 750, //帮助宽度
	    helpHeight: 400, //帮助高度
	    showAutoHeader: false,
	    //outFilter: {}, //外部查询条件,精确条件
	    //likeFilter: {}, //外部模糊查询条件，like条件
	    selectMode: 'Single', //multiple  
	    needBlankLine: false,
	    //forceSelection: true,
	    autoSelect: false, //不要自动选择第一行
	    enableKeyEvents: true, //允许key事件
	    selectOnFoucus: true,
	    typeAhead: true, //延时查询
	    typeAheadDelay: 500, //延迟500毫秒，默认是250
	    //valueNotFoundText: 'Select a Country!!...',
	    queryMode: 'remote',
	    triggerAction: 'all', //'query'        
	    initComponent: function () {
	        //
	        var me = this;
	        this.callParent();
	        this.mixins.base.initComponent.call(me); //与callParent方法不可调换
	        me.helpType = 'RichHelp_' + me.helpid;
	        me.bussType = me.bussType || 'all';

	        //me.tpl = '<div><table width="100%" ><tr><th class="x-column-header-inner x-column-header-over" >代码</th><th class="x-column-header-inner x-column-header-over">名称</th></tr><tpl for="."><tr class="x-boundlist-item"><td>{' + this.valueField + '}</td><td>{' + this.displayField + '}<td></tr></tpl></table></div>';
	        if (Ext.isEmpty(me.helpid) || Ext.isEmpty(me.displayField) || Ext.isEmpty(me.valueField)) return;

	        if (me.listFields && me.listHeadTexts) {

	            var listheaders = '';
	            var listfields = '';

	            var heads = me.listHeadTexts.split(','); //列头 
	            var fields = me.listFields.split(','); //所有字段              

	            var modelFields = new Array();
	            for (var i = 0; i < fields.length; i++) {

	                var tempfield = fields[i].split('.');
	                var temp;
	                if (tempfield.length > 1) {
	                    temp = tempfield[1]; //去掉表名
	                }
	                else {
	                    temp = fields[i];
	                }

	                modelFields.push({
	                    name: temp, //fields[i],
	                    type: 'string',
	                    mapping: temp //fields[i]
	                });

	            }

	            if (me.showAutoHeader) {

	                for (var i = 0; i < heads.length; i++) {
	                    listheaders += '<th class="x-column-header-inner x-column-header-over">' + heads[i] + '</th>';
	                }
	            }

	            for (var i = 0; i < heads.length; i++) {

	                var tempfield = fields[i].split('.');
	                var temp;
	                if (tempfield.length > 1) {
	                    temp = tempfield[1]; //去掉表名
	                }
	                else {
	                    temp = fields[i];
	                }

	                listfields += '<td>{' + temp + '}</td>';
	            }

	            var temp;
	            if (me.showAutoHeader) {
	                temp = '<div><table width="100%" style="border-spacing:0px;" ><tr>' + listheaders + '</tr><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
	            } else {
	                temp = '<div><table width="100%" style="border-spacing:0px;" ><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
	            }
	            me.tpl = temp;

	            var store = Ext.create('Ext.data.Store', {
	                pageSize: 10,
	                fields: modelFields,
	                proxy: {
	                    type: 'ajax',
	                    url: C_ROOT + 'SUP/RichHelp/GetHelpList?helpid=' + me.helpid,
	                    reader: {
	                        type: 'json',
	                        root: 'Record',
	                        totalProperty: 'totalRows'
	                    }
	                }
	            });

	            me.bindStore(store);

	            //只能在这里写事件才能触发到
	            store.on('beforeload', function (store) {

	                //debugger;
	                Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //修改pageIndex为从0开始
	                if (me.outFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
	                }
	                if (me.likeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(me.likeFilter) });
	                }
	                if (me.leftLikeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
	                }
	                if (me.clientSqlFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'clientSqlFilter': me.clientSqlFilter });
	                }

	            });

	            if (me.needBlankLine) {
	                store.on('load', function (store, records, successful, eOpts) {

	                    //去掉表名
	                    var myValueFiled;
	                    var myDisplayField;
	                    var temp = me.valueField.split('.');
	                    if (temp.length > 1) {
	                        myValueFiled = temp[1];
	                    } else {
	                        myValueFiled = me.valueField;
	                    }

	                    temp = me.displayField.split('.');
	                    if (temp.length > 1) {
	                        myDisplayField = temp[1];
	                    } else {
	                        myDisplayField = me.displayField;
	                    }

	                    var emptydata = new Object();
	                    emptydata[myValueFiled] = '';
	                    emptydata[myDisplayField] = '&nbsp;'; //空html标记          

	                    var rs = [emptydata];
	                    store.insert(0, rs);
	                });
	            }

	        }
	        else {
	            me.initialListTemplate(); //初始化下拉列表样式 
	        }

	        me.addEvents('helpselected'); //定义值被选完的事件
	        me.addEvents('firstrowloaded');

	        me.on('select', function (combo, records, eOpts) {

	            var theField;

	            //构建
	            if (me.listFields) {
	                theField = [];
	                var temp = me.listFields.split(',');
	                for (var i = 0; i < temp.length; i++) {
	                    theField.push(temp[i]);

	                    //                        var tempfield = temp[i].split('.');
	                    //                        if (tempfield.length > 1) {
	                    //                            theField.push(tempfield[1]);
	                    //                        }
	                    //                        else {
	                    //                            theField.push(temp[i]);
	                    //                        }
	                }
	            }
	            else {
	                //                    theField = [];
	                //                    var temp = me.valueField.split('.');
	                //                    if (temp.length > 1) {
	                //                        theField.push(temp[1]);
	                //                    } else {
	                //                        theField.push(me.valueField);
	                //                    }

	                //                    temp = me.displayField.split('.');
	                //                    if (temp.length > 1) {
	                //                        theField.push(temp[1]);
	                //                    } else {
	                //                        theField.push(me.displayField);
	                //                    }

	                theField = [me.valueField, me.displayField];
	            }

	            Ext.define('themodel', {
	                extend: 'Ext.data.Model',
	                fields: theField
	            });

	            //去掉表名
	            var myValueFiled;
	            var myDisplayField;
	            var temp = me.valueField.split('.');
	            if (temp.length > 1) {
	                myValueFiled = temp[1];
	            } else {
	                myValueFiled = me.valueField;
	            }

	            temp = me.displayField.split('.');
	            if (temp.length > 1) {
	                myDisplayField = temp[1];
	            } else {
	                myDisplayField = me.displayField;
	            }


	            var code = combo.getValue() || records[0].data[myValueFiled];
	            var name = combo.getRawValue() || records[0].data[myDisplayField];

	            if (Ext.isEmpty(code)) {
	                name = '';
	            }

	            var obj = new Object();
	            if (me.isInGrid) {//嵌在grid中
	                obj[me.valueField] = name; //欺骗,grid那边显示有问题
	            } else {
	                obj[me.valueField] = code;
	            }
	            if (me.displayFormat) {
	                obj[me.displayField] = Ext.String.format(me.displayFormat, code, name);
	            } else {
	                obj[me.displayField] = name;
	            }

	            var valuepair = Ext.ModelManager.create(obj, 'themodel');
	            me.setValue(valuepair); //必须这么设置才能成功

	            //debugger;
	            var pobj = new Object();
	            pobj.code = code;
	            pobj.name = name;
	            pobj.type = 'autocomplete';
	            //pobj.data = records[0].data;
	            pobj.data = {};
	            for (var i = 0; i < theField.length; i++) {
	                var temp = theField[i].split('.');
	                if (temp.length > 1) {
	                    pobj.data[theField[i]] = records[0].data[temp[1]];
	                }
	                else {
	                    pobj.data[theField[i]] = records[0].data[theField[i]];
	                }
	            }

	            me.fireEvent('helpselected', pobj);

	        });

	        me.on('expand', function (field, opt) {

	            //刷新按钮去掉
	            var autoPagingbar = me.getPicker().pagingToolbar;
	            autoPagingbar.items.items[10].hide();
	            autoPagingbar.items.items[9].hide();

	        });

	        me.on('keydown', function (combo, e, eOpts) {
	            if (me.isExpanded) {

	                //回车
	                if (e.keyCode == Ext.EventObject.ENTER) {
	                    if (me.picker.el.query('.' + me.picker.overItemCls).length > 0) return false;
	                    me.onTriggerClick();
	                }

	                //翻页
	                switch (e.keyCode) {
	                    case Ext.EventObject.PAGE_UP:
	                        me.getPicker().pagingToolbar.movePrevious();
	                        return true;
	                    case Ext.EventObject.PAGE_DOWN:
	                        me.getPicker().pagingToolbar.moveNext();
	                        return true;
	                    case Ext.EventObject.HOME:
	                        me.getPicker().pagingToolbar.moveFirst();
	                        return true;
	                    case Ext.EventObject.END:
	                        me.getPicker().pagingToolbar.moveLast();
	                        return true;
	                }

	                if (!Ext.isEmpty(me.getValue())) {
	                    if (e.keyCode == Ext.EventObject.BACKSPACE || e.keyCode == Ext.EventObject.DELETE) {

	                    }
	                }
	            }
	        });

	        me.on('blur', function () {

	            var value = me.getValue();
	            Ext.Ajax.request({
	                url: C_ROOT + 'SUP/CommonHelp/ValidateData?helpid=' + me.helpid + '&inputValue=' + value,
	                async: false, //同步请求
	                success: function (response) {
	                    var resp = Ext.JSON.decode(response.responseText);
	                    if (resp.Status === "success") {
	                        if (resp.Data == false) {
	                            me.setValue('');
	                        }
	                    } else {
	                        Ext.MessageBox.alert('取数失败', resp.status);
	                    }
	                }
	            });
	        });

	    },
	    initialListTemplate: function (store) {
	        var me = this;

	        var allfield;
	        var headText;
	        var initTpl;
	        var template;

	        initTpl = function () {

	            var modelFields;
	            var gridColumns;

	            var listheaders = '';
	            var listfields = '';

	            if (me.helpType === 'rich') {//用户自定义界面的模板 

	                modelFields = template.Template.Model.fields;
	                gridColumns = template.Template.GridColumns;

	                if (me.showAutoHeader) {
	                    for (var i = 0; i < gridColumns.length; i++) {
	                        listheaders += '<th class="x-column-header-inner x-column-header-over">' + gridColumns[i].header + '</th>';
	                    }
	                }

	                for (var i = 0; i < modelFields.length; i++) {
	                    listfields += '<td>{' + modelFields[i]['name'] + '}</td>';
	                }

	            }
	            else {

	                if (!allfield) return;

	                var fields = allfield.split(','); //所有字段
	                var heads = headText.split(','); //列头 

	                if (me.showAutoHeader) {
	                    for (var i = 0; i < heads.length; i++) {
	                        listheaders += '<th class="x-column-header-inner x-column-header-over">' + heads[i] + '</th>';
	                    }
	                }

	                modelFields = new Array();
	                for (var i = 0; i < fields.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //去掉表名
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    modelFields.push({
	                        name: temp, //fields[i],
	                        type: 'string',
	                        mapping: temp//fields[i]
	                    });

	                }
	            }


	            for (var i = 0; i < heads.length; i++) {

	                var tempfield = fields[i].split('.');
	                var temp;
	                if (tempfield.length > 1) {
	                    temp = tempfield[1]; //去掉表名
	                }
	                else {
	                    temp = fields[i];
	                }

	                listfields += '<td>{' + temp + '}</td>';
	            }

	            var store = Ext.create('Ext.data.Store', {
	                pageSize: 10, //这个决定页大小                
	                fields: modelFields,
	                proxy: {
	                    type: 'ajax',
	                    url: C_ROOT + 'SUP/RichHelp/GetHelpList?helpid=' + me.helpid,
	                    reader: {
	                        type: 'json',
	                        root: 'Record',
	                        totalProperty: 'totalRows'
	                    }
	                }
	            });
	            //me.bindStore(store); //动态绑定store
	            me.store = store;

	            //只能在这里写事件才能触发到
	            store.on('beforeload', function (store) {

	                Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //修改pageIndex为从0开始
	                if (me.outFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
	                }
	                if (me.likeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(me.likeFilter) });
	                }
	                if (me.leftLikeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
	                }
	                if (me.clientSqlFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'clientSqlFilter': me.clientSqlFilter });
	                }

	            })

	            if (me.needBlankLine) {
	                store.on('load', function (store, records, successful, eOpts) {

	                    //去掉表名
	                    var myValueFiled;
	                    var myDisplayField;
	                    var temp = me.valueField.split('.');
	                    if (temp.length > 1) {
	                        myValueFiled = temp[1];
	                    } else {
	                        myValueFiled = me.valueField;
	                    }

	                    temp = me.displayField.split('.');
	                    if (temp.length > 1) {
	                        myDisplayField = temp[1];
	                    } else {
	                        myDisplayField = me.displayField;
	                    }

	                    var emptydata = new Object();
	                    emptydata[myValueFiled] = '';
	                    emptydata[myDisplayField] = '&nbsp;'; //空html标记          

	                    var rs = [emptydata];
	                    store.insert(0, rs);
	                });
	            }

	            var temp;
	            if (me.showAutoHeader) {
	                temp = '<div><table width="100%" style="border-spacing:0px;"><tr>' + listheaders + '</tr><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
	            }
	            else {
	                temp = '<div><table width="100%" style="border-spacing:0px;"><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
	            }
	            me.tpl = temp;

	        };

	        var url;
	        if (me.helpType === 'rich') {
	            url = C_ROOT + 'SUP/RichHelp/GetHelpTemplate?helpid=' + me.helpid;
	        }
	        else {
	            url = C_ROOT + 'SUP/RichHelp/GetHelpInfo?helpid=' + me.helpid;
	        }

	        Ext.Ajax.request({
	            url: url,
	            callback: initTpl,
	            success: function (response) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.status === "ok") {

	                    if (me.helpType === 'rich') {
	                        //title = resp.Title;
	                        template = resp.template; //界面模板
	                    }
	                    else {
	                        //title = resp.data.Title;
	                        allfield = resp.data.AllField;
	                        headText = resp.data.HeadText;
	                    }

	                } else {
	                    Ext.MessageBox.alert('取数失败', resp.status);
	                }
	            }
	        });
	    },
	    onTriggerClick: function () {
	        var me = this;
	        if (me.readOnly || arguments.length == 3) return; //arguments.length == 3，输入框上点击           

	        if (Ext.isEmpty(me.helpid)) return;
	        //
	        var title;
	        var allfield;
	        var headText;
	        var ShowHelp;
	        var template;

	        var existQueryProperty = false;
	        var queryPropertyItems;
	        var showTree;
	        var richQueryItem;
	        var richQueryFilter;

	        me.initParam();
	        ShowHelp = function () {

	            var queryItems;
	            var modelFields;
	            var gridColumns;

	            if (me.helpType === 'rich') {//用户自定义界面的模板            
	                queryItems = template.Template.QueryItems;
	                modelFields = template.Template.Model.fields;
	                gridColumns = template.Template.GridColumns;
	            }
	            else {

	                if (!allfield) return;

	                var fields = allfield.split(','); //所有字段
	                var heads = headText.split(','); //列头

	                queryItems = new Array();
	                for (var i = 0; i < heads.length; i++) {
	                    var tempfield = fields[i].split('.');
	                    var temp = fields[i];
	                    queryItems.push({
	                        xtype: 'textfield',
	                        fieldLabel: heads[i],
	                        name: temp //fields[i]                            
	                    });
	                }

	                modelFields = new Array();
	                for (var i = 0; i < fields.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //去掉表名
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    modelFields.push({
	                        name: fields[i], //不去掉表名
	                        type: 'string',
	                        mapping: temp
	                    });
	                }

	                gridColumns = new Array();
	                for (var i = 0; i < heads.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //去掉表名
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    gridColumns.push({
	                        header: heads[i],
	                        flex: 1,
	                        //width:200,
	                        //sortable: true,
	                        dataIndex: fields[i]
	                    });
	                }
	            }

	            var toolbar = Ext.create('Ext.Toolbar', {
	                region: 'north',
	                border: false,
	                //split: true,
	                weight: 20,
	                height: 36,
	                minSize: 26,
	                maxSize: 26,
	                items: [
								{
								    xtype: 'textfield',
								    id: "searchkey",
								    width: 200
								},
								{
								    id: 'richhelp_query',
								    iconCls: 'icon-View'
								},
                                {
                                    id: 'richhelp_refresh',
                                    iconCls: 'icon-Refresh'
                                }, '->',
							     {
							         xtype: 'checkboxgroup',
							         name: 'hobby',
							         items: [
                                        { boxLabel: '在结果中搜索', width: 100, id: 'ch-searchInResult', inputValue: '01' },
                                        { boxLabel: '树记忆', width: 60, id: 'ch-treerem', inputValue: '02', handler: function (chk) {
                                            me.saveTreeMemory(leftTree, chk.getValue());
                                            var k = 0;
                                        }
                                        }
                                   ]
							     }
							 ]
	            });

	            var searcheArr = [];
	            var searchIndex = {}; //索引
	            Ext.getCmp('ch-searchInResult').on('change', function (me, nvalue, ovalue, eOpts) {

	                if (false == nvalue) {
	                    searcheArr.length = 0; //清空条件列表
	                    searchIndex = {}; //清空索引
	                }

	            });

	            Ext.getCmp('richhelp_query').on('click', function () {
	                var searchkey;
	                if (Ext.getCmp('ch-searchInResult').getValue()) {
	                    var key = Ext.getCmp('searchkey').getValue();

	                    if (!searchIndex[key]) {
	                        searcheArr.push(Ext.getCmp('searchkey').getValue());
	                        searchIndex[key] = key;
	                    }

	                    searchkey = searcheArr;
	                }
	                else {
	                    searcheArr.length = 0;
	                    searcheArr.push(Ext.getCmp('searchkey').getValue());
	                }

	                Ext.apply(store.proxy.extraParams, { 'searchkey': searcheArr });
	                store.load();

	            });

	            Ext.getCmp('richhelp_refresh').on('click', function () {
	                Ext.getCmp('searchkey').setValue('');

	                if (store.proxy.extraParams.searchkey || store.proxy.extraParams.treesearchkey || store.proxy.extraParams.treerefkey) {
	                    delete store.proxy.extraParams.searchkey;
	                    delete store.proxy.extraParams.treesearchkey;
	                    delete store.proxy.extraParams.treerefkey;
	                    store.load();
	                }
	            });

	            var propertyCode = queryPropertyItems[0].code;
	            var propertyID = queryPropertyItems[0].inputValue;
	            var queryProperty = Ext.create('Ext.container.Container', {
	                region: 'north',
	                //frame: true,
	                weight: 20,
	                border: false,
	                //layout: 'auto', //支持自适应 	              
	                items: [{
	                    xtype: 'fieldset', //'fieldcontainer',
	                    title: '查询属性', //fieldLabel: 'Size',
	                    defaultType: 'radiofield',
	                    defaults: {
	                        flex: 1
	                    },
	                    layout: 'column',
	                    fieldDefaults: {
	                        margin: '0 10 0 0'
	                    },
	                    items: [{
	                        xtype: 'radiogroup',
	                        layout: 'column',
	                        fieldDefaults: {
	                            margin: '0 10 3 0'
	                        },
	                        activeItem: 0,
	                        items: queryPropertyItems,
	                        listeners: {
	                            'change': function (radioCtl, nvalue, ovalue) {

	                                var select = radioCtl.getChecked();
	                                if (select.length > 0) {

	                                    leftPanel.setTitle(select[0].boxLabel);
	                                    var code = select[0].code; //加载树的搜索id
	                                    propertyCode = code;
	                                    propertyID = select[0].inputValue;

	                                    Ext.Ajax.request({
	                                        //params: { 'id': busid },
	                                        url: C_ROOT + 'SUP/RichHelp/GetListExtendInfo?code=' + propertyCode,
	                                        //callback: ShowHelp,
	                                        success: function (response) {
	                                            var resp = Ext.JSON.decode(response.responseText);
	                                            var extFields = resp.extfields; //扩展字段
	                                            var extHeader = resp.extheader; //扩展列头

	                                            var fields = Ext.clone(modelFields);
	                                            var columns = Ext.clone(gridColumns);

	                                            if (extHeader && extHeader != '') {
	                                                var tempfs = extFields.split(',');
	                                                var cols = extHeader.split(',');
	                                                for (var i = 0; i < tempfs.length; i++) {
	                                                    fields.push({
	                                                        name: tempfs[i],
	                                                        type: 'string',
	                                                        mapping: tempfs[i]
	                                                    });

	                                                    columns.push({
	                                                        header: cols[i],
	                                                        flex: 1,
	                                                        dataIndex: tempfs[i]
	                                                    });
	                                                }
	                                            }

	                                            //使用外部的store
	                                            store = Ext.create('Ext.ng.JsonStore', {
	                                                fields: fields,
	                                                pageSize: 20,
	                                                autoLoad: true,
	                                                url: C_ROOT + 'SUP/RichHelp/GetHelpList?helpid=' + me.helpid,
	                                                listeners: {
	                                                    'beforeload': function () {
	                                                        var data = { 'propertyID': propertyID, 'propertyCode': propertyCode };
	                                                        Ext.apply(store.proxy.extraParams, data);
	                                                        if (me.likeFilter) {
	                                                            Ext.apply(data, me.likeFilter);
	                                                        }
	                                                        if (me.outFilter) {
	                                                            Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
	                                                        }
	                                                        if (me.leftLikeFilter) {
	                                                            Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
	                                                        }
	                                                        if (me.clientSqlFilter) {
	                                                            Ext.apply(store.proxy.extraParams, { 'clientSqlFilter': me.clientSqlFilter });
	                                                        }
	                                                    } //beforeload function
	                                                }//listeners
	                                            });
	                                            //重新配置grid
	                                            grid.reconfigure(store, columns);
	                                            pagingbar.bind(store);
	                                        }
	                                    });
	                                }

	                                if (nvalue.property === 'all') {

	                                    leftPanel.setVisible(false);
	                                    //leftTree.setVisible(false);
	                                    if (store.proxy.extraParams.searchkey || store.proxy.extraParams.treesearchkey || store.proxy.extraParams.treerefkey) {
	                                        delete store.proxy.extraParams.searchkey;
	                                        delete store.proxy.extraParams.treesearchkey;
	                                        delete store.proxy.extraParams.treerefkey;
	                                        store.load();
	                                    }
	                                    return;
	                                } else {

	                                    var rootNode = leftTree.getRootNode();
	                                    if (leftTree.isFirstLoad) {
	                                        rootNode.expand(); //expand会自动调用load
	                                        leftTree.isFirstLoad = false;
	                                    }
	                                    else {
	                                        leftTree.getStore().load();
	                                    }
	                                    leftPanel.setVisible(true);
	                                } //else

	                            } //function
	                        }//listeners
	                    }]
	                }]
	            });

	            var leftTree = Ext.create('Ext.ng.TreePanel', {
	                //title: queryPropertyItems[0].boxLabel,
	                autoLoad: false,
	                //collapsible: true,
	                split: true,
	                //hidden: true,
	                width: 180,
	                region: 'west',
	                isFirstLoad: true,
	                treeFields: [{ name: 'text', type: 'string' },
                   { name: 'treesearchkey', string: 'string' },
                   { name: 'treerefkey', type: 'string'}//我的自定义属性                
                   ],
	                url: C_ROOT + "SUP/RichHelp/GetQueryProTree",
	                listeners: {
	                    selectionchange: function (m, selected, eOpts) {
	                        me.memory.eOpts = "selectionchange";

	                        //刷列表数据
	                        var record = selected[0];
	                        if (record) {
	                            if (!Ext.isEmpty(record.data.treesearchkey) && !Ext.isEmpty(record.data.treerefkey)) {
	                                Ext.apply(store.proxy.extraParams, { 'treesearchkey': record.data.treesearchkey, 'treerefkey': record.data.treerefkey });
	                                store.load();
	                            }
	                            //设置选中
	                            Ext.getCmp('ch-treerem').setValue(me.memory.IsMemo && me.memory.FoucedNodeValue == selected[0].getPath());
	                            me.memory.eOpts = "";
	                        }
	                    },
	                    viewready: function (m, eOpts) {
	                        if (!Ext.isEmpty(me.memory.FoucedNodeValue)) {
	                            leftTree.selectPath(me.memory.FoucedNodeValue, null, null, function () {
	                                if (Ext.isIE) {
	                                    window.setTimeout(function () {
	                                        var selectNode = m.view.body.query("tr." + m.view.selectedItemCls);
	                                        if (selectNode) {
	                                            selectNode[0].scrollIntoView(true);
	                                        }
	                                    }, 500);
	                                }
	                            });
	                        }
	                        else {
	                            store.load();
	                        }
	                    }
	                }
	            });

	            leftTree.getStore().on('beforeload', function (store, operation, eOpts) {
	                operation.params.code = propertyCode; //树添加参数	                
	            });

	            //leftTree.getStore().load(); //手动load，不然beforeload不起效果
	            //leftTree.getRootNode().expand(); //expand会自动调用load

	            var leftPanel = Ext.create('Ext.panel.Panel', {
	                title: "人力资源树",
	                autoScroll: false,
	                collapsible: true,
	                split: true,
	                hidden: true,
	                region: 'west',
	                weight: 10,
	                width: 180,
	                minSize: 180,
	                maxSize: 180,
	                border: true,
	                layout: 'border',
	                items: [{ region: 'north',
	                    height: 26,
	                    layout: 'border',
	                    border: false,
	                    items: [{
	                        region: 'center',
	                        xtype: "textfield",
	                        allowBlank: true,
	                        fieldLabel: '',
	                        emptyText: '输入关键字，定位树节点',
	                        margin: '2 0 2 2',
	                        enableKeyEvents: true,
	                        listeners: {
	                            'keydown': function (el, e, eOpts) {
	                                if (e.getKey() == e.ENTER) {
	                                    me.findNodeByFuzzy(leftTree, el.getValue());
	                                    el.focus();
	                                    return false;
	                                }
	                                else {
	                                    me.nodeIndex = -1;
	                                }
	                            }
	                        }
	                    }, { region: 'east', xtype: 'button', text: '', iconCls: 'icon-Location', width: 21, margin: '2 5 2 5',
	                        handler: function () { var el = arguments[0].prev(); me.findNodeByFuzzy(leftTree, el.getValue()); el.focus(); }
	                    }]
	                }, leftTree]
	            });

	            var tree = Ext.create('Ext.ng.TreePanel', {
	                //collapsible: true,
	                //split: true,
	                //width: 180,
	                region: 'center',
	                autoLoad: false,
	                treeFields: [{ name: 'text', type: 'string' },
                   { name: 'row', type: 'string'}//我的自定义属性                            
                  ],
	                url: C_ROOT + "SUP/RichHelp/GetTreeList?helpid=" + me.helpid
	            });

	            Ext.define('model', {
	                extend: 'Ext.data.Model',
	                fields: modelFields
	            });

	            var store = Ext.create('Ext.ng.JsonStore', {
	                fields: modelFields,
	                pageSize: 20,
	                autoLoad: true,
	                url: C_ROOT + 'SUP/RichHelp/GetHelpList?helpid=' + me.helpid
	            });

	            tree.on('itemdblclick', function (treepanel, record, item, index, e, eOpts) {

	                var code = record.data.id;
	                var name = record.data.text;

	                var obj = new Object();
	                obj[me.valueField] = code;

	                if (me.displayFormat) {
	                    obj[me.displayField] = Ext.String.format(me.displayFormat, code, name);
	                } else {
	                    obj[me.displayField] = name;
	                }

	                var valuepair = Ext.ModelManager.create(obj, 'model');
	                me.setValue(valuepair); //必须这么设置才能成功
	                win.hide();
	                win.destroy();

	                var pobj = new Object();
	                pobj.code = code;
	                pobj.name = name;
	                pobj.type = 'fromhelp';

	                var index = store.find(me.valueField, code);
	                pobj.data = Ext.decode(record.data.row);
	                me.fireEvent('helpselected', pobj);

	            });

	            var pagingbar = Ext.create('Ext.ng.PagingBar', {
	                store: store
	            });

	            var selModel = Ext.create('Ext.selection.CheckboxModel');

	            var grid = Ext.create('Ext.ng.GridPanel', {
	                region: 'center',
	                //frame: false,
	                //border: false,
	                store: store,
	                //autoScroll:true,                    
	                columnLines: true,
	                columns: gridColumns,
	                bbar: pagingbar
	            });

	            var commonUseStore = Ext.create('Ext.ng.JsonStore', {
	                fields: modelFields,
	                //pageSize: 20,
	                autoLoad: false,
	                url: C_ROOT + 'SUP/RichHelp/GetCommonUseList?helpid=' + me.helpid
	            });
	            //常用数据
	            var commonUseGrid = Ext.create('Ext.ng.GridPanel', {
	                region: 'center',
	                columnLines: true,
	                columns: gridColumns,
	                store: commonUseStore
	            });

	            var richqueryStore = Ext.create('Ext.ng.JsonStore', {
	                fields: modelFields,
	                pageSize: 20,
	                autoLoad: false,
	                url: C_ROOT + 'SUP/RichHelp/GetRichQueryList?helpid=' + me.helpid
	            });

	            var richqueryPagingbar = Ext.create('Ext.ng.PagingBar', {
	                store: richqueryStore
	            });
	            //高级查询列表
	            var richqueryGrid = Ext.create('Ext.ng.GridPanel', {
	                region: 'center',
	                columnLines: true,
	                columns: gridColumns,
	                store: richqueryStore,
	                bbar: richqueryPagingbar
	            });
	            //查询面板
	            var queryPanel = Ext.create('Ext.ng.TableLayoutForm', {
	                region: 'east',
	                //frame:false,            
	                //title: '查询条件',
	                split: true,
	                width: 260,
	                //minWidth: 100,
	                autoScroll: true,
	                columnsPerRow: 2,
	                fieldDefaults: {
	                    //labelAlign: 'right', //'top',
	                    labelWidth: 30,
	                    anchor: '100%',
	                    margin: '3 5 3 0',
	                    msgTarget: 'side'
	                },
	                fields: richQueryItem,
	                dockedItems: [{
	                    xtype: 'toolbar',
	                    dock: 'bottom',
	                    ui: 'footer',
	                    items: ['->', { xtype: 'button', text: '保存', handler: function () { me.saveQueryFilter(me.helpid, queryPanel); } },
                                      { xtype: 'button', text: '设置', handler: function () { me.setQueryInfo(me.helpid); } },
                                      { xtype: 'button', text: '搜索', handler: function () { me.richQuerySearch(queryPanel, richqueryStore); } },
                                      { xtype: 'button', text: '清空', handler: function () { queryPanel.getForm().reset(); } }
                              ]
	                }]

	            });

	            var tabItems = [{ layout: 'border', title: '列表', id: 'listStyle', items: [grid] },
	                                   { layout: 'border', title: '常用', id: 'commonData', items: [commonUseGrid] },
	                                   { layout: 'border', title: '高级', id: 'richquery', items: [richqueryGrid, queryPanel] }
                                      ];

	            if (showTree) {
	                tabItems = [{ layout: 'border', title: '列表', id: 'listStyle', items: [grid] },
                                       { layout: 'border', title: '树型', id: 'treeStyle', items: [tree] },
	                                   { layout: 'border', title: '常用', id: 'commonData', items: [commonUseGrid] },
	                                   { layout: 'border', title: '高级', id: 'richquery', items: [richqueryGrid, queryPanel] }
                                      ];
	            }

	            var tabPanel = Ext.create('Ext.tab.Panel', {
	                layout: 'border',
	                region: 'center',
	                deferredRender: false,
	                plain: true,
	                activeTab: 0,
	                //minHeight: 360,
	                //minWidth: 600,//不要设置，grid滚动条不出来
	                defaults: { bodyStyle: 'padding:3px' },
	                items: tabItems
	            });

	            var commlistLoaded = false; //已经加载标记
	            tabPanel.on('tabchange', function (tabpanel, nCard, oCard, eOpts) {

	                if (nCard.id === 'treeStyle') {
	                    tree.getRootNode().expand();
	                }
	                if (nCard.id === 'commonData') {
	                    Ext.getCmp('mutilhelp_add').disable(true);
	                    Ext.getCmp('mutilhelp_del').enable(true);
	                    if (!commlistLoaded) {
	                        commonUseStore.load();
	                        commlistLoaded = true;
	                    }
	                }
	                if (nCard.id === 'listStyle') {
	                    Ext.getCmp('mutilhelp_del').disable(true);
	                    Ext.getCmp('mutilhelp_add').enable(true);
	                }
	                if (nCard.id === 'richquery') {
	                    me.richQuerySearch(queryPanel, richqueryStore);
	                }
	            });

	            grid.on('itemdblclick', function () {
	                me.gridDbClick(me, grid);
	            });

	            commonUseGrid.on('itemdblclick', function () {
	                me.gridDbClick(me, commonUseGrid);
	            });

	            richqueryGrid.on('itemdblclick', function () {
	                me.gridDbClick(me, richqueryGrid);
	            });

	            queryPanel.on('afterrender', function () {
	                queryPanel.getForm().setValues(richQueryFilter); //设置值
	                BatchBindCombox(queryPanel.getForm().getFields().items); //代码转名称
	            });

	            var winItems = [];
	            if (existQueryProperty) {
	                winItems.push(toolbar);
	                winItems.push(queryProperty);
	                winItems.push(leftPanel);
	                winItems.push(tabPanel);
	            }
	            else {
	                winItems.push(toolbar);
	                winItems.push(tabPanel);
	            }

	            //显示弹出窗口
	            var win = Ext.create('Ext.window.Window', {
	                title: title, //'Hello',
	                border: false,
	                height: me.helpHeight,
	                width: me.helpWidth,
	                layout: 'border',
	                modal: true,
	                items: winItems, //[toolbar, queryProperty, tabPanel],
	                buttons: [{ id: 'mutilhelp_add', text: '添加常用', handler: function () { me.addCommonUseData(me, grid, commonUseStore); } },
                    { id: 'mutilhelp_del', text: '删除常用', disabled: true, handler: function () { me.delCommonUseData(me, commonUseGrid, commonUseStore) } },
                     '->',
                    { text: '确定', handler: function () { me.btnOk(me, grid, tree, tabPanel, commonUseGrid, richqueryGrid, win); } },
                    { text: '取消', handler: function () { win.close(); } }]
	            });
	            win.show();

	            //store.load();//手工调不会触发beforeload事件

	            store.on('beforeload', function () {
	                var data = { 'propertyID': propertyID, 'propertyCode': propertyCode };
	                Ext.apply(store.proxy.extraParams, data);
	                if (me.likeFilter) {
	                    Ext.apply(data, me.likeFilter);
	                }
	                if (me.outFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
	                }
	                if (me.leftLikeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
	                }
	                if (me.clientSqlFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'clientSqlFilter': me.clientSqlFilter });
	                }
	                //return true;
	            })
	        };

	        var url;
	        if (me.helpType === 'rich') {
	            url = C_ROOT + 'SUP/RichHelp/GetHelpTemplate?helpid=' + me.helpid;
	        }
	        else {
	            url = C_ROOT + 'SUP/RichHelp/GetHelpInfo?helpid=' + me.helpid;
	        }

	        Ext.Ajax.request({
	            //params: { 'id': busid },
	            url: url,
	            callback: ShowHelp,
	            success: function (response) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.status === "ok") {

	                    if (me.helpType === 'rich') {
	                        title = resp.Title;
	                        template = resp.template; //界面模板
	                    }
	                    else {
	                        title = resp.data.Title;
	                        allfield = resp.data.AllField;
	                        headText = resp.data.HeadText;
	                        existQueryProperty = resp.data.existQueryProp;
	                        queryPropertyItems = Ext.JSON.decode(resp.data.queryProperty);
	                        showTree = (resp.data.showTree == '1');
	                        richQueryItem = Ext.JSON.decode(resp.data.richQueryItem);
	                        richQueryFilter = Ext.JSON.decode(resp.data.queryFilter);
	                    }

	                } else {
	                    Ext.MessageBox.alert('取数失败', resp.status);
	                }
	            }
	        });

	    },
	    showHelp: function () {
	        this.onTriggerClick();
	    },
	    bindData: function () {
	        var me = this;
	        BindCombox(me, me.valueField, me.displayField, me.helpid, me.getValue(), me.selectMode);
	        return;
	    }, //bindData
	    btnOk: function (help, grid, tree, tabPanel, commonUseGrid, richqueryGrid, win) {

	        var activeTab = tabPanel.getActiveTab();
	        var code;
	        var name;
	        var pobj = new Object();

	        if (activeTab.id === 'listStyle') {
	            var data = grid.getSelectionModel().getSelection();
	            if (data.length > 0) {
	                code = data[0].get(help.valueField);
	                name = data[0].get(help.displayField);
	                pobj.data = data[0].data;
	            }
	        }
	        if (activeTab.id === 'commonData') {
	            var data = commonUseGrid.getSelectionModel().getSelection();
	            if (data.length > 0) {
	                code = data[0].get(help.valueField);
	                name = data[0].get(help.displayField);
	                pobj.data = data[0].data;
	            }
	        }
	        if (activeTab.id === 'richquery') {
	            var data = richqueryGrid.getSelectionModel().getSelection();
	            if (data.length > 0) {
	                code = data[0].get(help.valueField);
	                name = data[0].get(help.displayField);
	                pobj.data = data[0].data;
	            }
	        }
	        if (activeTab.id === 'treeStyle') {
	            var selectM = tree.getSelectionModel()
	            var select = selectM.getSelection();

	            code = select[0].data.id;
	            name = select[0].data.text;
	            pobj.data = Ext.decode(select[0].data.row);
	        }


	        var obj = new Object();
	        obj[help.valueField] = code;

	        if (help.displayFormat) {
	            obj[help.displayField] = Ext.String.format(help.displayFormat, code, name);
	        } else {
	            obj[help.displayField] = name;
	        }

	        Ext.define('richhelpModel', {
	            extend: 'Ext.data.Model',
	            fields: [{
	                name: help.valueField,
	                type: 'string',
	                mapping: help.valueField
	            }, {
	                name: help.displayField,
	                type: 'string',
	                mapping: help.displayField
	            }
			     ]
	        });

	        var valuepair = Ext.ModelManager.create(obj, 'richhelpModel');
	        help.setValue(valuepair); //必须这么设置才能成功
	        win.hide();
	        win.destroy();

	        pobj.code = code;
	        pobj.name = name;
	        pobj.type = 'fromhelp';
	        help.fireEvent('helpselected', pobj);

	    },
	    addCommonUseData: function (help, grid, commonUseStore) {
	        var data = grid.getSelectionModel().getSelection();
	        if (data.length > 0) {
	            var code = data[0].get(help.valueField);
	            var index = commonUseStore.find(help.valueField, code); //去重
	            if (index < 0) {

	                Ext.Ajax.request({
	                    url: C_ROOT + 'SUP/RichHelp/SaveCommonUseData',
	                    params: { 'helpid': help.helpid, 'codeValue': code },
	                    success: function (response) {
	                        var resp = Ext.JSON.decode(response.responseText);
	                        if (resp.Status === "success") {
	                            commonUseStore.insert(commonUseStore.count(), data[0].data);
	                        } else {
	                            Ext.MessageBox.alert('保存失败', resp.status);
	                        }
	                    }
	                });
	            }
	        }
	    },
	    delCommonUseData: function (help, commonUseGrid, commonUseStore) {
	        var data = commonUseGrid.getSelectionModel().getSelection();
	        if (data.length > 0) {
	            var code = data[0].get(help.valueField);
	            Ext.Ajax.request({
	                url: C_ROOT + 'SUP/RichHelp/DeleteCommonUseData',
	                params: { 'helpid': help.helpid, 'codeValue': code },
	                success: function (response) {
	                    var resp = Ext.JSON.decode(response.responseText);
	                    if (resp.Status === "success") {
	                        commonUseStore.remove(data[0]); //移除
	                    } else {
	                        Ext.MessageBox.alert('删除失败!', resp.status);
	                    }
	                }
	            });
	        }
	    },
	    gridDbClick: function (help, grid) {
	        var data = grid.getSelectionModel().getSelection();
	        if (data.length > 0) {
	            var code = data[0].get(help.valueField);
	            var name = data[0].get(help.displayField);

	            var obj = new Object();
	            obj[help.valueField] = code;

	            if (help.displayFormat) {
	                obj[help.displayField] = Ext.String.format(help.displayFormat, code, name);
	            } else {
	                obj[help.displayField] = name;
	            }

	            Ext.define('richhelpModel', {
	                extend: 'Ext.data.Model',
	                fields: [{
	                    name: help.valueField,
	                    type: 'string',
	                    mapping: help.valueField
	                }, {
	                    name: help.displayField,
	                    type: 'string',
	                    mapping: help.displayField
	                }
			     ]
	            });

	            var valuepair = Ext.ModelManager.create(obj, 'richhelpModel');
	            help.setValue(valuepair); //必须这么设置才能成功
	            win.hide();
	            win.destroy();
	            //if (me.isInGrid) {

	            var pobj = new Object();
	            pobj.code = code;
	            pobj.name = name;
	            pobj.type = 'fromhelp';
	            pobj.data = data[0].data;
	            help.fireEvent('helpselected', pobj);
	            //}

	        }
	    },
	    initParam: function () {
	        var me = this;
	        me.memory = {};
	        Ext.Ajax.request({
	            url: C_ROOT + 'SUP/RichHelp/GetTreeMemoryInfo',
	            async: false,
	            params: { type: me.helpType, busstype: me.bussType },
	            success: function (response, opts) {
	                me.memory = Ext.JSON.decode(response.responseText);
	            }
	        });
	    },
	    saveTreeMemory: function (tree, checked) {
	        var me = this;
	        if (me.memory.eOpts == "selectionchange") { return; }
	        var sd = tree.getSelectionModel().getSelection();
	        if (sd.length > 0) {
	            me.memory.FoucedNodeValue = sd[0].getPath();
	            me.memory.IsMemo = checked;
	            Ext.Ajax.request({
	                url: C_ROOT + 'SUP/RichHelp/UpdataTreeMemory',
	                async: true,
	                params: { type: me.helpType, busstype: me.bussType, foucednodevalue: me.memory.FoucedNodeValue, ismemo: checked },
	                success: function (response, opts) {
	                }
	            });
	        }
	    },
	    richQuerySearch: function (queryPanel, richqueryStore) {
	        var query = JSON.stringify(queryPanel.getForm().getValues());
	        Ext.apply(richqueryStore.proxy.extraParams, { 'query': query });
	        richqueryStore.load();
	    },
	    setQueryInfo: function (helpid) {

	        var toolbar = Ext.create('Ext.Toolbar', {
	            region: 'north',
	            border: false,
	            height: 36,
	            minSize: 26,
	            maxSize: 26,
	            items: [{ id: "query_save", text: "保存", width: this.itemWidth, iconCls: "icon-save" },
                           { id: "query_addrow", text: "增行", width: this.itemWidth, iconCls: "icon-AddRow" },
                           { id: "query_deleterow", text: "删行", width: this.itemWidth, iconCls: "icon-DeleteRow" },
                            '->',
                            { id: "query_close", text: "关闭", width: this.itemWidth, iconCls: "icon-Close", handler: function () { win.close(); } }
                           ]
	        });

	        //定义模型
	        Ext.define('queryInfoModel', {
	            extend: 'Ext.data.Model',
	            fields: [{
	                name: 'code',
	                mapping: 'code',
	                type: 'string'
	            }, {
	                name: 'tablename',
	                mapping: 'tablename',
	                type: 'string'
	            }, {
	                name: 'field',
	                mapping: 'field',
	                type: 'string'
	            }, {
	                name: 'fname_chn',
	                mapping: 'fname_chn',
	                type: 'string'
	            }, {
	                name: 'fieldtype',
	                mapping: 'fieldtype',
	                type: 'string'
	            }, {
	                name: 'operator',
	                mapping: 'operator',
	                type: 'string'
	            }, {
	                name: 'defaultdata',
	                mapping: 'defaultdata',
	                type: 'string'
	            }, {
	                name: 'displayindex',
	                mapping: 'displayindex',
	                type: 'number'
	            }, {
	                name: 'definetype',
	                mapping: 'definetype',
	                type: 'string'
	            }, ]
	        });

	        var richQueryStore = Ext.create('Ext.ng.JsonStore', {
	            model: 'queryInfoModel',
	            autoLoad: true,
	            pageSize: 50,
	            url: C_ROOT + 'SUP/RichHelp/GetRichQueryUIInfo?helpid=' + helpid
	        });

	        var richQueryCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
	            clicksToEdit: 1
	        });

	        var operatorType = Ext.create('Ext.ng.ComboBox', {
	            valueField: "code",
	            displayField: 'name',
	            queryMode: 'local',                           //local指定为本地数据  如果是后台传输  值为remote     
	            name: 'mode',
	            datasource: 'default',
	            data: [{             //编辑状态下,状态列的下拉菜单的 data
	                "code": "eq",
	                "name": "="
	            }, {
	                "code": "gt",
	                "name": ">"
	            }, {
	                "code": "lt",
	                "name": "<"
	            }, {
	                "code": "ge",
	                "name": ">="
	            }, {
	                "code": "le",
	                "name": "<="
	            }, {
	                "code": "like",
	                "name": "%*%"
	            }, {
	                "code": "LLike",
	                "name": "*%"
	            }, {
	                "code": "RLike",
	                "name": "%*"
	            }]
	        });

	        var grid = Ext.create('Ext.ng.GridPanel', {
	            region: 'center',
	            //frame: true,                  
	            width: 200,
	            stateful: true,
	            //stateId: 'sysgrid',
	            store: richQueryStore,
	            otype: otype,
	            buskey: 'code', //对应的业务表主键               
	            columnLines: true,
	            columns: [{
	                header: '代 码',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'code',
	                hidden: true
	            }, {
	                header: '字段类型',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'fieldtype',
	                hidden: true
	            }, {
	                header: '表名',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'tablename'
	            }, {
	                header: '字段',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'field'
	            }, {
	                header: '字段名称',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'fname_chn'
	            }, {
	                header: '运算符',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'operator',
	                editor: operatorType,
	                renderer: function (val) {
	                    var ret;
	                    var index = operatorType.getStore().find('code', val);
	                    var record = operatorType.getStore().getAt(index);
	                    if (record) {
	                        ret = record.data.name;
	                    }
	                    return ret;
	                }
	            }, {
	                header: '默认值',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'defaultdata',
	                editor: {}
	            }, {
	                header: '排序号',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'displayindex',
	                editor: { xtype: 'numberfield' }
	            }, {
	                header: '定义类型',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'definetype',
	                renderer: function (val) {
	                    if (val === '1') {
	                        return "用户定义";
	                    }
	                    else {
	                        return "系统定义";
	                    }
	                }
	            }],
	            plugins: [richQueryCellEditing]
	        });

	        //显示弹出窗口
	        var win = Ext.create('Ext.window.Window', {
	            title: '查询条件设置',
	            border: false,
	            height: 400,
	            width: 600,
	            layout: 'border',
	            modal: true,
	            items: [grid],
	            buttons: ['->',
                    { text: '确定', handler: function () { Save(); win.close(); } },
                    { text: '取消', handler: function () { win.close(); } }]
	        });
	        win.show();

	        function Save() {
	            var griddata = grid.getAllGridData(); //grid.getChange();
	            Ext.Ajax.request({
	                url: C_ROOT + 'SUP/RichHelp/SaveQueryInfo?helpid=' + helpid,
	                params: { 'griddata': griddata },
	                success: function (response) {
	                    var resp = Ext.JSON.decode(response.responseText);
	                    if (resp.Status === "success") {
	                        richQueryStore.commitChanges();
	                    } else {
	                        Ext.MessageBox.alert('保存失败', resp.status);
	                        name = 'error';
	                    }
	                }
	            });
	        }

	        toolbar.items.get('query_save').on('click', function () {
	            Save()
	        });

	        var data = [{             //编辑状态下,状态列的下拉菜单的 data
	            "code": "eq",
	            "name": "="
	        }, {
	            "code": "gt",
	            "name": ">"
	        }, {
	            "code": "lt",
	            "name": "<"
	        }, {
	            "code": "ge",
	            "name": ">="
	        }, {
	            "code": "le",
	            "name": "<="
	        }, {
	            "code": "like",
	            "name": "%*%"
	        }, {
	            "code": "LLike",
	            "name": "*%"
	        }, {
	            "code": "RLike",
	            "name": "%*"
	        }];

	        var otherData = [{             //编辑状态下,状态列的下拉菜单的 data
	            "code": "eq",
	            "name": "="
	        }, {
	            "code": "gt",
	            "name": ">"
	        }, {
	            "code": "lt",
	            "name": "<"
	        }, {
	            "code": "ge",
	            "name": ">="
	        }, {
	            "code": "le",
	            "name": "<="
	        }];

	        grid.on('itemclick', function (grid, record, item, index, e, eOpts) {

	            var ftype = record.data['fieldtype'];
	            if (ftype === 'Number' || ftype === 'Date') {

	                if (operatorType.datasource === 'default') {
	                    operatorType.getStore().loadData(otherData);
	                    operatorType.datasource = 'other';
	                }
	            }
	            else {
	                if (operatorType.datasource === 'other') {
	                    operatorType.getStore().loadData(data);
	                    operatorType.datasource = 'default';
	                }
	            }
	        });

	    },
	    findNodeByFuzzy: function (tree, value) {
	        if (value == "") { return; }
	        var me = this, index = -1, firstFind = me.nodeIndex == -1;
	        var findNode = tree.getRootNode().findChildBy(function (node) {
	            index++;
	            //if (!node.data.root && index > me.nodeIndex && (node.data.text.indexOf(value) > -1 || node.data.bopomofo.indexOf(value.toUpperCase()) > -1)) {
	            if (!node.data.root && index > me.nodeIndex && (node.data.text.indexOf(value) > -1)) {
	                return true;
	            }
	        }, null, true);
	        me.nodeIndex = index;
	        if (findNode) {
	            tree.selectPath(findNode.getPath());
	        }
	        else {
	            if (firstFind) {
	                Ext.MessageBox.alert('', '没有匹配的树节点.');
	            }
	            me.nodeIndex = -1;
	        }
	    },
	    saveQueryFilter: function (helpid, qpanel) {
	        var data = JSON.stringify(qpanel.getForm().getValues());

	        if (data === '{}') return; //值为空

	        Ext.Ajax.request({
	            url: C_ROOT + 'SUP/RichHelp/SaveQueryFilter',
	            async: true,
	            params: { 'helpid': helpid, 'data': data },
	            success: function (response, opts) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.Status === "success") {
	                    Ext.MessageBox.alert('保存成功!');
	                }
	            }
	        });
	    },
	    getCodeName: function (value) {
	        var me = this;
	        var name;

	        Ext.Ajax.request({
	            url: C_ROOT + 'SUP/RichHelp/GetName?helptype=Single&helpid=' + me.helpid + '&code=' + value,
	            async: false, //同步请求
	            success: function (response) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.status === "ok") {
	                    name = resp.name; //显示值                    
	                } else {
	                    Ext.MessageBox.alert('取数失败', resp.status);
	                    name = 'error';
	                }
	            }
	        });

	        return name;
	    },
	    setOutFilter: function (obj) {
	        this.outFilter = obj;
	    },
	    setLikeFilter: function (obj) {
	        this.likeFilter = obj;
	    },
	    setLeftLikeFilter: function (obj) {
	        this.leftLikeFilter = obj;
	    },
	    setClientSqlFilter: function (str) {
	        this.clientSqlFilter = str;
	    },
	    getFirstRowData: function () {
	        var me = this;
	        var fields = me.listFields.split(',');

	        var modelFields = new Array();
	        for (var i = 0; i < fields.length; i++) {

	            var tempfield = fields[i].split('.');
	            var temp;
	            if (tempfield.length > 1) {
	                temp = tempfield[1]; //去掉表名
	            }
	            else {
	                temp = fields[i];
	            }

	            modelFields.push({
	                name: fields[i],
	                type: 'string',
	                mapping: temp
	            });
	        }

	        Ext.define('model', {
	            extend: 'Ext.data.Model',
	            fields: modelFields
	        });

	        var store = Ext.create('Ext.ng.JsonStore', {
	            model: 'model',
	            pageSize: 20,
	            autoLoad: false,
	            url: C_ROOT + 'SUP/RichHelp/GetHelpList?helpid=' + me.helpid
	        });

	        store.on('beforeload', function () {

	            //            var data = new Object();
	            //            data[me.valueField] = value;

	            if (me.outFilter) {
	                //Ext.apply(me.outFilter, data);
	                Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
	            }
	            else {
	                Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(data) });
	            }

	        })

	        store.load(function () {
	            var data = store.data.items[0].data;
	            me.fireEvent('firstrowloaded', data);
	        });

	    }
	});

	Ext.define('Ext.ng.MultiRichHelp', {
	    extend: 'Ext.ng.RichHelp',
	    alias: ['widget.ngMultiRichHelp'],
	    onTriggerClick: function () {
	        var me = this;
	        if (me.readOnly || arguments.length == 3) return; //arguments.length == 3，输入框上点击           

	        if (Ext.isEmpty(me.helpid)) return;
	        //
	        var title;
	        var allfield;
	        var headText;
	        var ShowHelp;
	        var template;

	        var existQueryProperty = false;
	        var queryPropertyItems;
	        var showTree;
	        var richQueryItem;
	        var richQueryFilter;

	        me.initParam();
	        ShowHelp = function () {

	            var queryItems;
	            var modelFields;
	            var gridColumns;

	            if (me.helpType === 'rich') {//用户自定义界面的模板            
	                queryItems = template.Template.QueryItems;
	                modelFields = template.Template.Model.fields;
	                gridColumns = template.Template.GridColumns;
	            }
	            else {

	                if (!allfield) return;

	                var fields = allfield.split(','); //所有字段
	                var heads = headText.split(','); //列头

	                modelFields = new Array();
	                for (var i = 0; i < fields.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //去掉表名
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    modelFields.push({
	                        name: temp, //fields[i], //不去掉表名
	                        type: 'string',
	                        mapping: temp
	                    });
	                }

	                gridColumns = new Array();
	                for (var i = 0; i < heads.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //去掉表名
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    gridColumns.push({
	                        header: heads[i],
	                        flex: 1,
	                        //width:200,
	                        //sortable: true,
	                        dataIndex: temp//fields[i]
	                    });
	                }
	            }

	            var toolbar = Ext.create('Ext.Toolbar', {
	                region: 'north',
	                border: false,
	                //split: true,
	                height: 36,
	                minSize: 26,
	                maxSize: 26,
	                items: [
								{
								    xtype: 'textfield',
								    id: "searchkey",
								    width: 200
								},
								{
								    id: 'richhelp_query',
								    iconCls: 'icon-View'
								},
                                {
                                    id: 'richhelp_refresh',
                                    iconCls: 'icon-Refresh'
                                }, '->',
							     {
							         xtype: 'checkboxgroup',
							         name: 'hobby',
							         items: [
                                        { boxLabel: '在结果中搜索', width: 100, id: 'ch-searchInResult', inputValue: '01' },
                                        { boxLabel: '树记忆', width: 60, id: 'ch-treerem', inputValue: '02', handler: function (chk) {
                                            me.saveTreeMemory(leftTree, chk.getValue());
                                            var k = 0;
                                        }
                                        }
                                   ]
							     }
							 ]
	            });

	            var searcheArr = [];
	            var searchIndex = {}; //索引
	            Ext.getCmp('ch-searchInResult').on('change', function (me, nvalue, ovalue, eOpts) {

	                if (false == nvalue) {
	                    searcheArr.length = 0; //清空条件列表
	                    searchIndex = {}; //清空索引
	                }

	            });

	            Ext.getCmp('richhelp_query').on('click', function () {
	                var searchkey;
	                if (Ext.getCmp('ch-searchInResult').getValue()) {
	                    var key = Ext.getCmp('searchkey').getValue();

	                    if (!searchIndex[key]) {
	                        searcheArr.push(Ext.getCmp('searchkey').getValue());
	                        searchIndex[key] = key;
	                    }

	                    searchkey = searcheArr;
	                }
	                else {
	                    searcheArr.length = 0;
	                    searcheArr.push(Ext.getCmp('searchkey').getValue());
	                }

	                Ext.apply(store.proxy.extraParams, { 'searchkey': searcheArr });
	                store.load();

	            });

	            Ext.getCmp('richhelp_refresh').on('click', function () {
	                Ext.getCmp('searchkey').setValue('');

	                if (store.proxy.extraParams.searchkey || store.proxy.extraParams.treesearchkey || store.proxy.extraParams.treerefkey) {
	                    delete store.proxy.extraParams.searchkey;
	                    delete store.proxy.extraParams.treesearchkey;
	                    delete store.proxy.extraParams.treerefkey;
	                    store.load();
	                }
	            });

	            var propertyCode = queryPropertyItems[0].code;
	            var propertyID = queryPropertyItems[0].inputValue;
	            var queryProperty = Ext.create('Ext.container.Container', {
	                region: 'north',
	                //frame: true,
	                border: false,
	                //layout: 'auto', //支持自适应 	                                  
	                items: [{
	                    xtype: 'fieldset', //'fieldcontainer',
	                    title: '查询属性', //fieldLabel: 'Size',
	                    defaultType: 'radiofield',
	                    defaults: {
	                        flex: 1
	                    },
	                    layout: 'column',
	                    fieldDefaults: {
	                        margin: '0 10 0 0'
	                    },
	                    items: [{
	                        xtype: 'radiogroup',
	                        layout: 'column',
	                        fieldDefaults: {
	                            margin: '0 10 3 0'
	                        },
	                        activeItem: 0,
	                        items: queryPropertyItems,
	                        listeners: {
	                            'change': function (radioCtl, nvalue, ovalue) {

	                                var select = radioCtl.getChecked();
	                                if (select.length > 0) {

	                                    leftPanel.setTitle(select[0].boxLabel);
	                                    var code = select[0].code; //加载树的搜索id
	                                    propertyCode = code;
	                                    propertyID = select[0].inputValue;

	                                    Ext.Ajax.request({
	                                        //params: { 'id': busid },
	                                        url: C_ROOT + 'SUP/RichHelp/GetListExtendInfo?code=' + propertyCode,
	                                        //callback: ShowHelp,
	                                        success: function (response) {
	                                            var resp = Ext.JSON.decode(response.responseText);
	                                            var extFields = resp.extfields; //扩展字段
	                                            var extHeader = resp.extheader; //扩展列头

	                                            var fields = Ext.clone(modelFields);
	                                            var columns = Ext.clone(gridColumns);

	                                            if (extHeader && extHeader != '') {
	                                                var tempfs = extFields.split(',');
	                                                var cols = extHeader.split(',');
	                                                for (var i = 0; i < tempfs.length; i++) {
	                                                    fields.push({
	                                                        name: tempfs[i],
	                                                        type: 'string',
	                                                        mapping: tempfs[i]
	                                                    });

	                                                    columns.push({
	                                                        header: cols[i],
	                                                        flex: 1,
	                                                        dataIndex: tempfs[i]
	                                                    });
	                                                }
	                                            }

	                                            //使用外部的store
	                                            store = Ext.create('Ext.ng.JsonStore', {
	                                                fields: fields,
	                                                pageSize: 20,
	                                                autoLoad: true,
	                                                url: C_ROOT + 'SUP/RichHelp/GetHelpList?helpid=' + me.helpid,
	                                                listeners: {
	                                                    'beforeload': function () {
	                                                        var data = { 'propertyID': propertyID, 'propertyCode': propertyCode };
	                                                        Ext.apply(store.proxy.extraParams, data);
	                                                        if (me.likeFilter) {
	                                                            Ext.apply(data, me.likeFilter);
	                                                        }
	                                                        if (me.outFilter) {
	                                                            Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
	                                                        }
	                                                        if (me.leftLikeFilter) {
	                                                            Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
	                                                        }
	                                                        if (me.clientSqlFilter) {
	                                                            Ext.apply(store.proxy.extraParams, { 'clientSqlFilter': me.clientSqlFilter });
	                                                        }
	                                                    } //beforeload function
	                                                }//listeners
	                                            });
	                                            //重新配置grid
	                                            grid.reconfigure(store, columns);
	                                            pagingbar.bind(store);
	                                        }
	                                    });
	                                }

	                                if (nvalue.property === 'all') {

	                                    leftPanel.setVisible(false);
	                                    //leftTree.setVisible(false);
	                                    if (store.proxy.extraParams.searchkey || store.proxy.extraParams.treesearchkey || store.proxy.extraParams.treerefkey) {
	                                        delete store.proxy.extraParams.searchkey;
	                                        delete store.proxy.extraParams.treesearchkey;
	                                        delete store.proxy.extraParams.treerefkey;
	                                        store.load();
	                                    }
	                                    return;
	                                } else {

	                                    var rootNode = leftTree.getRootNode();
	                                    if (leftTree.isFirstLoad) {
	                                        rootNode.expand(); //expand会自动调用load
	                                        leftTree.isFirstLoad = false;
	                                    }
	                                    else {
	                                        leftTree.getStore().load();
	                                    }
	                                    leftPanel.setVisible(true);
	                                } //else
	                            } //change function
	                        }//listeners
	                    }]
	                }]
	            });

	            var leftTree = Ext.create('Ext.ng.TreePanel', {
	                //title: queryPropertyItems[0].boxLabel,
	                autoLoad: false,
	                //collapsible: true,
	                split: true,
	                width: 180,
	                region: 'west',
	                //hidden: true,
	                isFirstLoad: true,
	                treeFields: [{ name: 'text', type: 'string' },
                   { name: 'treesearchkey', string: 'string' },
                   { name: 'treerefkey', type: 'string'}//我的自定义属性                
                   ],
	                url: C_ROOT + "SUP/RichHelp/GetQueryProTree",
	                listeners: {
	                    selectionchange: function (m, selected, eOpts) {
	                        me.memory.eOpts = "selectionchange";

	                        //刷列表数据
	                        var record = selected[0];
	                        if (record) {
	                            if (!Ext.isEmpty(record.data.treesearchkey) && !Ext.isEmpty(record.data.treerefkey)) {
	                                Ext.apply(store.proxy.extraParams, { 'treesearchkey': record.data.treesearchkey, 'treerefkey': record.data.treerefkey });
	                                store.load();
	                            }
	                            //设置选中
	                            Ext.getCmp('ch-treerem').setValue(me.memory.IsMemo && me.memory.FoucedNodeValue == selected[0].getPath());
	                            me.memory.eOpts = "";
	                        }
	                    },
	                    viewready: function (m, eOpts) {
	                        if (!Ext.isEmpty(me.memory.FoucedNodeValue)) {
	                            leftTree.selectPath(me.memory.FoucedNodeValue, null, null, function () {
	                                if (Ext.isIE) {
	                                    window.setTimeout(function () {
	                                        var selectNode = m.view.body.query("tr." + m.view.selectedItemCls);
	                                        if (selectNode) {
	                                            selectNode[0].scrollIntoView(true);
	                                        }
	                                    }, 500);
	                                }
	                            });
	                        }
	                        else {
	                            store.load();
	                        }
	                    }
	                }
	            });

	            leftTree.getStore().on('beforeload', function (store, operation, eOpts) {
	                operation.params.code = propertyCode; //树添加参数
	            });

	            //leftTree.getStore().load(); //手动load，不然beforeload不起效果
	            //leftTree.getRootNode().expand(); //expand会自动调用load

	            var leftPanel = Ext.create('Ext.panel.Panel', {
	                title: "人力资源树",
	                autoScroll: false,
	                collapsible: true,
	                split: true,
	                hidden: true,
	                region: 'west',
	                weight: 10,
	                width: 180,
	                minSize: 180,
	                maxSize: 180,
	                border: true,
	                layout: 'border',
	                items: [{ region: 'north',
	                    height: 26,
	                    layout: 'border',
	                    border: false,
	                    items: [{
	                        region: 'center',
	                        xtype: "textfield",
	                        allowBlank: true,
	                        fieldLabel: '',
	                        emptyText: '输入关键字，定位树节点',
	                        margin: '2 0 2 2',
	                        enableKeyEvents: true,
	                        listeners: {
	                            'keydown': function (el, e, eOpts) {
	                                if (e.getKey() == e.ENTER) {
	                                    me.findNodeByFuzzy(leftTree, el.getValue());
	                                    el.focus();
	                                    return false;
	                                }
	                                else {
	                                    me.nodeIndex = -1;
	                                }
	                            }
	                        }
	                    }, { region: 'east', xtype: 'button', text: '', iconCls: 'icon-Location', width: 21, margin: '2 5 2 5',
	                        handler: function () { var el = arguments[0].prev(); me.findNodeByFuzzy(leftTree, el.getValue()); el.focus(); }
	                    }]
	                }, leftTree]
	            });

	            var tree = Ext.create('Ext.ng.TreePanel', {
	                //collapsible: true,
	                //split: true,
	                //width: 180,
	                region: 'center',
	                autoLoad: false,
	                treeFields: [{ name: 'text', type: 'string' },
                   { name: 'row', type: 'string'}//我的自定义属性                            
                  ],
	                url: C_ROOT + "SUP/RichHelp/GetTreeList?helpid=" + me.helpid
	            });

	            Ext.define('model', {
	                extend: 'Ext.data.Model',
	                fields: modelFields
	            });

	            var store = Ext.create('Ext.ng.JsonStore', {
	                fields: modelFields,
	                pageSize: 20,
	                autoLoad: true,
	                url: C_ROOT + 'SUP/RichHelp/GetHelpList?helpid=' + me.helpid
	            });

	            var pagingbar = Ext.create('Ext.ng.PagingBar', {
	                store: store
	            });

	            tree.on('itemdblclick', function (treepanel, record, item, index, e, eOpts) {

	                var code = record.data.id;
	                var name = record.data.text;

	                var obj = new Object();
	                obj[me.valueField] = code;

	                if (me.displayFormat) {
	                    obj[me.displayField] = Ext.String.format(me.displayFormat, code, name);
	                } else {
	                    obj[me.displayField] = name;
	                }

	                var valuepair = Ext.ModelManager.create(obj, 'model');
	                me.setValue(valuepair); //必须这么设置才能成功
	                win.hide();
	                win.destroy();

	                var pobj = new Object();
	                pobj.code = code;
	                pobj.name = name;
	                pobj.type = 'fromhelp';

	                var index = store.find(me.valueField, code);
	                pobj.data = Ext.decode(record.data.row);
	                me.fireEvent('helpselected', pobj);

	            });

	            var selModel = Ext.create('Ext.selection.CheckboxModel');

	            var grid = Ext.create('Ext.ng.GridPanel', {
	                region: 'center',
	                //frame: false,
	                //border: false,
	                store: store,
	                selModel: { mode: "SIMPLE" }, //多选                    
	                columnLines: true,
	                columns: gridColumns,
	                bbar: pagingbar
	            });

	            var commonUseStore = Ext.create('Ext.ng.JsonStore', {
	                fields: modelFields,
	                //pageSize: 20,
	                autoLoad: false,
	                url: C_ROOT + 'SUP/RichHelp/GetCommonUseList?helpid=' + me.helpid
	            });

	            var commonUseGrid = Ext.create('Ext.ng.GridPanel', {
	                region: 'center',
	                columnLines: true,
	                columns: gridColumns,
	                store: commonUseStore,
	                selModel: { mode: "SIMPLE"} //多选
	            });

	            var richqueryStore = Ext.create('Ext.ng.JsonStore', {
	                fields: modelFields,
	                pageSize: 20,
	                autoLoad: false,
	                url: C_ROOT + 'SUP/RichHelp/GetRichQueryList?helpid=' + me.helpid
	            });

	            var richqueryPagingbar = Ext.create('Ext.ng.PagingBar', {
	                store: richqueryStore
	            });

	            var richqueryGrid = Ext.create('Ext.ng.GridPanel', {
	                region: 'center',
	                columnLines: true,
	                columns: gridColumns,
	                store: richqueryStore,
	                selModel: { mode: "SIMPLE" }, //多选
	                bbar: richqueryPagingbar
	            });

	            var queryPanel = Ext.create('Ext.ng.TableLayoutForm', {
	                region: 'east',
	                //frame:false,            
	                //title: '查询条件',
	                split: true,
	                width: 260,
	                //minWidth: 100,
	                autoScroll: true,
	                columnsPerRow: 2,
	                fieldDefaults: {
	                    //labelAlign: 'right', //'top',
	                    labelWidth: 30,
	                    anchor: '100%',
	                    margin: '3 5 3 0',
	                    msgTarget: 'side'
	                },
	                fields: richQueryItem,
	                dockedItems: [{
	                    xtype: 'toolbar',
	                    dock: 'bottom',
	                    ui: 'footer',
	                    items: ['->', { xtype: 'button', text: '保存', handler: function () { me.saveQueryFilter(me.helpid, queryPanel); } },
                                      { xtype: 'button', text: '设置', handler: function () { me.setQueryInfo(me.helpid); } },
                                      { xtype: 'button', text: '搜索', handler: function () { me.richQuerySearch(queryPanel, richqueryStore); } },
                                      { xtype: 'button', text: '清空', handler: function () { queryPanel.getForm().reset(); } }
                              ]
	                }]

	            });

	            queryPanel.on('afterrender', function () {
	                queryPanel.getForm().setValues(richQueryFilter); //设置值
	                BatchBindCombox(queryPanel.getForm().getFields().items); //代码转名称
	            });

	            var tabItems = [{ layout: 'border', title: '列表', id: 'listStyle', items: [grid] },
	                                   { layout: 'border', title: '常用', id: 'commonData', items: [commonUseGrid] },
	                                   { layout: 'border', title: '高级', id: 'richquery', items: [richqueryGrid, queryPanel] }
                                      ];

	            if (showTree) {
	                tabItems = [{ layout: 'border', title: '列表', id: 'listStyle', items: [grid] },
                                       { layout: 'border', title: '树型', id: 'treeStyle', items: [tree] },
	                                   { layout: 'border', title: '常用', id: 'commonData', items: [commonUseGrid] },
	                                   { layout: 'border', title: '高级', id: 'richquery', items: [richqueryGrid, queryPanel] }
                                      ];
	            }

	            var tabPanel = Ext.create('Ext.tab.Panel', {
	                layout: 'border',
	                region: 'center',
	                deferredRender: false,
	                plain: true,
	                activeTab: 0,
	                //minHeight: 360,
	                //minWidth: 600,//不要设置，grid滚动条不出来
	                defaults: { bodyStyle: 'padding:3px' },
	                items: tabItems
	            });

	            var commlistLoaded = false; //已经加载标记
	            tabPanel.on('tabchange', function (tabpanel, nCard, oCard, eOpts) {

	                if (nCard.id === 'treeStyle') {
	                    tree.getRootNode().expand();
	                }
	                if (nCard.id === 'commonData') {
	                    Ext.getCmp('mutilhelp_add').disable(true);
	                    Ext.getCmp('mutilhelp_del').enable(true);
	                    if (!commlistLoaded) {
	                        commonUseStore.load();
	                        commlistLoaded = true;
	                    }
	                }
	                if (nCard.id === 'listStyle') {
	                    Ext.getCmp('mutilhelp_del').disable(true);
	                    Ext.getCmp('mutilhelp_add').enable(true);
	                }
	                if (nCard.id === 'richquery') {
	                    me.richQuerySearch(queryPanel, richqueryStore);
	                }
	            });

	            grid.on('itemdblclick', function () {
	                me.gridDbClick(me, grid);
	            });

	            commonUseGrid.on('itemdblclick', function () {
	                me.gridDbClick(me, commonUseGrid);
	            });

	            richqueryGrid.on('itemdblclick', function () {
	                me.gridDbClick(me, richqueryGrid);
	            });

	            var selectedLoaded = false;
	            //已选值记忆
	            store.on('load', function () {

	                if (!Ext.isEmpty(me.value)) {
	                    if (!selectedLoaded) {
	                        var rows = 0;
	                        var selectData = [];
	                        if (Ext.isEmpty(me.value)) return;
	                        var vals = me.value.split(',');
	                        for (var i = 0; i < vals.length; i++) {
	                            var index = store.find(me.valueField, vals[i]);
	                            var record = store.getAt(index);
	                            if (record) {
	                                selectData.push(record);
	                                rows++;
	                            }
	                        }

	                        if (rows == vals.length) {
	                            resultStore.insert(0, selectData); //批量插入
	                        }
	                        else {

	                            Ext.Ajax.request({
	                                params: { 'helpid': me.helpid, 'codes': me.value },
	                                url: C_ROOT + 'SUP/CommonHelp/GetSelectedData',
	                                success: function (response) {
	                                    var resp = Ext.JSON.decode(response.responseText);
	                                    if (resp.Record.length > 0) {
	                                        resultStore.insert(0, resp.Record);
	                                    } else {
	                                        Ext.MessageBox.alert('获取失败');
	                                    }
	                                }
	                            });
	                        }
	                        selectedLoaded = true;
	                    } //if
	                }
	            });

	            var resultStore = Ext.create('Ext.ng.JsonStore', {
	                model: 'model'
	            });

	            var resultGrid = Ext.create('Ext.ng.GridPanel', {
	                region: 'east',
	                //frame: true,
	                width: 235,
	                border: false,
	                style: {
	                    marginTop: '27px'
	                },
	                store: resultStore,
	                selModel: { mode: "SIMPLE" }, //多选
	                columnLines: true,
	                columns: gridColumns
	            });

	            var btnPanel = Ext.create('Ext.panel.Panel', {
	                region: 'east',
	                width: 80,
	                layout: 'absolute',
	                border: false,
	                frame: true,
	                padding: 0,
	                style: { borderColor: 'transparent', backgroundColor: 'transparent' }, //backgroundColor: 'transparent !important',marginTop: '22px',
	                items: [{
	                    xtype: 'button',
	                    name: 'addSelect',
	                    text: '&gt;',
	                    x: 9,
	                    y: 90,
	                    width: 60,
	                    handler: Ext.bind(function () {

	                        var activeTab = tabPanel.getActiveTab();
	                        var data;
	                        if (activeTab.id === 'listStyle') {
	                            data = grid.getSelectionModel().getSelection();
	                        } else if (activeTab.id === 'commonData') {
	                            data = commonUseGrid.getSelectionModel().getSelection();
	                        } else if (activeTab.id === 'richquery') {
	                            data = richqueryGrid.getSelectionModel().getSelection();
	                        } else {
	                            var selectM = tree.getSelectionModel()
	                            var select = selectM.getSelection();
	                            data = Ext.decode(select[0].data.row);
	                        }
	                        if (data) {
	                            me.copyData(data, resultStore);
	                        }
	                    })
	                }, {
	                    xtype: 'button',
	                    name: 'selectAll',
	                    text: '&gt;&gt;',
	                    x: 9,
	                    y: 120,
	                    width: 60,
	                    handler: Ext.bind(function () {
	                        var data = store.data.items;
	                        me.copyData(data, resultStore);
	                    })
	                }, {
	                    xtype: 'button',
	                    name: 'removeSelect',
	                    text: '&lt;',
	                    x: 9,
	                    y: 150,
	                    width: 60,
	                    handler: Ext.bind(function () {
	                        var data = resultGrid.getSelectionModel().getSelection();
	                        resultStore.remove(data);
	                    })
	                }, {
	                    xtype: 'button',
	                    name: 'removeAll',
	                    text: '&lt;&lt;',
	                    x: 9,
	                    y: 180,
	                    width: 60,
	                    handler: Ext.bind(function () {
	                        resultStore.removeAll();
	                    })
	                }]
	            });

	            var panel = Ext.create('Ext.panel.Panel', {
	                region: 'center',
	                //frame: true,
	                border: false,
	                layout: 'border',
	                items: [tabPanel, btnPanel, resultGrid]
	            });

	            var winItems = [];
	            if (existQueryProperty) {
	                winItems.push(toolbar);
	                winItems.push(queryProperty);
	                winItems.push(leftPanel);
	                winItems.push(panel);
	            }
	            else {
	                winItems.push(toolbar);
	                winItems.push(panel);
	            }

	            //显示弹出窗口
	            win = Ext.create('Ext.window.Window', {
	                title: title, //'Hello',
	                border: false,
	                height: me.helpHeight,
	                width: me.helpWidth,
	                layout: 'border',
	                modal: true,
	                items: winItems, //[toolbar, queryProperty, tabPanel],
	                buttons: [{ id: 'mutilhelp_add', text: '添加常用', handler: function () { me.addCommonUseData(me, grid, commonUseStore); } },
                    { id: 'mutilhelp_del', text: '删除常用', disabled: true, handler: function () { me.delCommonUseData(me, commonUseGrid, commonUseStore) } },
                     '->',
                    { text: '确定', handler: function () { me.btnOk(me, resultStore); } },
                    { text: '取消', handler: function () { win.close(); } }]
	            });
	            win.show();

	            //store.load();//手工调不会触发beforeload事件

	            store.on('beforeload', function () {
	                var data = { 'propertyID': propertyID, 'propertyCode': propertyCode };
	                Ext.apply(store.proxy.extraParams, data);
	                if (me.likeFilter) {
	                    Ext.apply(data, me.likeFilter);
	                }
	                if (me.outFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
	                }
	                if (me.leftLikeFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
	                }
	                if (me.clientSqlFilter) {
	                    Ext.apply(store.proxy.extraParams, { 'clientSqlFilter': me.clientSqlFilter });
	                }
	                //return true;
	            })
	        };

	        var url;
	        if (me.helpType === 'rich') {
	            url = C_ROOT + 'SUP/RichHelp/GetHelpTemplate?helpid=' + me.helpid;
	        }
	        else {
	            url = C_ROOT + 'SUP/RichHelp/GetHelpInfo?helpid=' + me.helpid;
	        }

	        Ext.Ajax.request({
	            //params: { 'id': busid },
	            url: url,
	            callback: ShowHelp,
	            success: function (response) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.status === "ok") {

	                    if (me.helpType === 'rich') {
	                        title = resp.Title;
	                        template = resp.template; //界面模板
	                    }
	                    else {
	                        title = resp.data.Title;
	                        allfield = resp.data.AllField;
	                        headText = resp.data.HeadText;
	                        existQueryProperty = resp.data.existQueryProp;
	                        queryPropertyItems = Ext.JSON.decode(resp.data.queryProperty);
	                        showTree = (resp.data.showTree == '1');
	                        richQueryItem = Ext.JSON.decode(resp.data.richQueryItem);
	                        richQueryFilter = Ext.JSON.decode(resp.data.queryFilter);
	                    }

	                } else {
	                    Ext.MessageBox.alert('取数失败', resp.status);
	                }
	            }
	        });
	    },
	    copyData: function (selectData, resultStore, tabPanel) {

	        var me = this;

	        var count = resultStore.getCount();
	        var index = count;
	        if (count > 0) {
	            if (Ext.isArray(selectData)) {
	                var dataLen = selectData.length;
	                for (var i = 0; i < dataLen; i++) {
	                    var sourceData = selectData[i].data[me.valueField];
	                    var hit = false;
	                    for (var j = 0; j < count; j++) {
	                        var selectedData = resultStore.data.items[j].data[me.valueField];
	                        if (sourceData === selectedData) {
	                            hit = true;
	                        }
	                    }
	                    if (!hit) {
	                        resultStore.insert(index, selectData[i]);
	                        index++;
	                    }
	                }
	            }
	            else {
	                var sourceData = selectData[me.valueField];
	                var hit = false;
	                for (var j = 0; j < count; j++) {
	                    var selectedData = resultStore.data.items[j].data[me.valueField];
	                    if (sourceData === selectedData) {
	                        hit = true;
	                    }
	                }
	                if (!hit) {
	                    resultStore.insert(index, selectData);
	                }
	            }

	        } else {
	            resultStore.insert(0, selectData); //批量插入
	        }
	    },
	    btnOk: function (me, resultStore) {

	        var values = new Array();
	        var names = new Array();
	        var arr = resultStore.data.items;
	        for (var i = 0; i < arr.length; i++) {

	            values.push(arr[i].data[me.valueField]);
	            names.push(arr[i].data[me.displayField]);
	        }
	        var code = values.join(',');
	        var name = names.join(',');

	        var obj = new Object();
	        obj[me.valueField] = code;
	        if (me.displayFormat) {
	            obj[me.displayField] = Ext.String.format(me.displayFormat, code, name);
	        } else {
	            obj[me.displayField] = name;
	        }

	        Ext.define('multimodel', {
	            extend: 'Ext.data.Model',
	            fields: [{
	                name: me.valueField,
	                type: 'string',
	                mapping: me.valueField
	            }, {
	                name: me.displayField,
	                type: 'string',
	                mapping: me.displayField
	            }
			]
	        });

	        var valuepair = Ext.ModelManager.create(obj, 'multimodel');
	        me.setValue(valuepair); //必须这么设置才能成功

	        win.hide();
	        win.destroy();
	        //if (me.isInGrid) {

	        var pobj = new Object();
	        pobj.code = code;
	        pobj.name = name;
	        pobj.type = 'fromhelp';
	        pobj.data = arr;

	        me.fireEvent('helpselected', pobj);

	    },
	    findNodeByFuzzy: function (tree, value) {
	        if (value == "") { return; }
	        var me = this, index = -1, firstFind = me.nodeIndex == -1;
	        var findNode = tree.getRootNode().findChildBy(function (node) {
	            index++;
	            //if (!node.data.root && index > me.nodeIndex && (node.data.text.indexOf(value) > -1 || node.data.bopomofo.indexOf(value.toUpperCase()) > -1)) {
	            if (!node.data.root && index > me.nodeIndex && (node.data.text.indexOf(value) > -1)) {
	                return true;
	            }
	        }, null, true);
	        me.nodeIndex = index;
	        if (findNode) {
	            tree.selectPath(findNode.getPath());
	        }
	        else {
	            if (firstFind) {
	                Ext.MessageBox.alert('', '没有匹配的树节点.');
	            }
	            me.nodeIndex = -1;
	        }
	    }
	});

Ext.define('Ext.ng.ComboBox', {
	extend: 'Ext.form.field.ComboBox',
	mixins: { base: 'Ext.ng.form.field.Base' },
	requires: ['Ext.ng.form.field.Base'],
	alias: ['widget.ngComboBox'],
	minChars: 1, //定义输入最少多少个字符的时候获取数据
	typeAhead: true,
	typeAheadDelay: 500,
	triggerAction: "all",
	selectMode: 'Single',
	needBlankLine: false,
	initComponent: function () {
		var me = this;

		//设置默认值
		me.valueField = me.valueField ? me.valueField : 'code';
		me.displayField = (me.displayField && me.displayField != 'text') ? me.displayField : 'name';

		me.callParent();
		this.mixins.base.initComponent.call(me);

		//me.tpl = '<div><table width="100%" ><tr><th class="x-column-header-inner x-column-header-over" >代码</th><th class="x-column-header-inner x-column-header-over">名称</th></tr><tpl for="."><tr class="x-boundlist-item"><td>{' + this.valueField + '}</td><td>{' + this.displayField + '}<td></tr></tpl></table></div>';

		var store;

		if (me.queryMode === 'remote') {

			if (Ext.isEmpty(me.helpid) || Ext.isEmpty(me.displayField) || Ext.isEmpty(me.valueField)) return;

			if (me.listFields && me.listHeadTexts) {

				var listheaders = '';
				var listfields = '';

				var heads = me.listHeadTexts.split(','); //列头 
				var fields = me.listFields.split(','); //所有字段              

				for (var i = 0; i < heads.length; i++) {
					listheaders += '<th class="x-column-header-inner x-column-header-over">' + heads[i] + '</th>';
				}

				var modelFields = new Array();
				for (var i = 0; i < fields.length; i++) {
					modelFields.push({
						name: fields[i],
						type: 'string',
						mapping: fields[i]
					});

				}

				for (var i = 0; i < heads.length; i++) {

					listfields += '<td >{' + fields[i] + '}</td>';
				}

				var temp = '<div><table width="100%" style="border-spacing:0px;" ><tr>' + listheaders + '</tr><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
				me.tpl = temp;


				store = Ext.create('Ext.data.Store', {
					pageSize: 50,
					fields: modelFields,
					proxy: {
						type: 'ajax',
						url: C_ROOT + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid,
						reader: {
							type: 'json',
							root: 'Record',
							totalProperty: 'totalRows'
						}
					}
				});

				me.bindStore(store);
			}
			else {
				me.initialListTemplate();
			}

		}
		else {

			var thetype = me.valueType ? me.valueType : 'string';

			store = Ext.create('Ext.data.Store', {
				pageSize: 50,
				fields: [
				{ name: me.valueField, type: thetype },
				{ name: me.displayField, type: 'string' }
				],
				data: me.data
			});

			me.bindStore(store);

		}

		if (!store) return;
		//处理外部条件
		store.on('beforeload', function (store) {

			Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //修改pageIndex为从0开始
			if (me.outFilter) {
				Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
			}

			if (me.likeFilter) {
				Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(me.likeFilter) });
			}
			if (me.leftLikeFilter) {
				Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
			}

		});

		if (me.needBlankLine) {
			store.on('load', function (store, records, successful, eOpts) {

				var emptydata = new Object();
				emptydata[me.valueField] = '';
				emptydata[me.displayField] = '&nbsp;'; //空html标记          

				var rs = [emptydata];
				store.insert(0, rs);
			});
		}

		me.addEvents('helpselected'); //定义值被选完的事件

		me.on('select', function (combo, records, eOpts) {

			Ext.define('themodel', {
				extend: 'Ext.data.Model',
				fields: [me.valueField, me.displayField]
			});

			var code = combo.getValue();
			var name = combo.getRawValue();

			if (Ext.isEmpty(code)) {
				name = '';
			}

			var obj = new Object();
			if (me.isInGrid) {//嵌在grid中
				obj[me.valueField] = name; //欺骗,grid那边显示有问题
			} else {
				obj[me.valueField] = code;
			}
			obj[me.displayField] = name;
			var valuepair = Ext.ModelManager.create(obj, 'themodel');
			me.setValue(valuepair); //必须这么设置才能成功

			//debugger;
			var pobj = new Object();
			pobj.code = code; //combo.getValue();
			pobj.name = name; //combo.getRawValue();
			me.fireEvent('helpselected', pobj);

		});

	},
	initialListTemplate: function (store) {
		var me = this;

		if (Ext.isEmpty(me.helpid)) return;

		var allfield;
		var headText;
		var initTpl;
		var template;

		initTpl = function () {

			var modelFields;
			var gridColumns;

			var listheaders = '';
			var listfields = '';

			if (me.helpType === 'rich') {//用户自定义界面的模板 

				modelFields = template.Template.Model.fields;
				gridColumns = template.Template.GridColumns;

				for (var i = 0; i < gridColumns.length; i++) {
					listheaders += '<th class="x-column-header-inner x-column-header-over">' + gridColumns[i].header + '</th>';
				}

				for (var i = 0; i < modelFields.length; i++) {
					listfields += '<td>{' + modelFields[i]['name'] + '}</td>';
				}
			}
			else {

				var heads = headText.split(','); //列头 
				var fields = allfield.split(','); //所有字段              

				for (var i = 0; i < heads.length; i++) {
					listheaders += '<th class="x-column-header-inner x-column-header-over">' + heads[i] + '</th>';
				}

				modelFields = new Array();
				for (var i = 0; i < fields.length; i++) {
					modelFields.push({
						name: fields[i],
						type: 'string',
						mapping: fields[i]
					});

					listfields += '<td>{' + fields[i] + '}</td>';
				}
			}

			//            var rootPath = '../';
			//            if (me.rootPath) {
			//                rootPath = me.rootPath;
			//            }
			//store.fields = modelFields; //设置store
			var store = Ext.create('Ext.data.Store', {
				pageSize: 10, //这个决定页大小                
				fields: modelFields,
				proxy: {
					type: 'ajax',
					url: C_ROOT + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid,
					reader: {
						type: 'json',
						root: 'Record',
						totalProperty: 'totalRows'
					}
				}
			});
			//me.bindStore(store); //动态绑定store
			me.store = store;

			//只能在这里写事件才能触发到
			store.on('beforeload', function (store) {

				Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //修改pageIndex为从0开始
				if (me.outFilter) {
					Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
				}
				if (me.likeFilter) {
					Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(me.likeFilter) });
				}
				if (me.leftLikeFilter) {
					Ext.apply(store.proxy.extraParams, { 'leftLikefilter': JSON.stringify(me.leftLikeFilter) });
				}


			})


			var temp = '<div><table width="100%" ><tr>' + listheaders + '</tr><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
			me.tpl = temp;
		};

		//        var rootPath = '../';
		//        if (me.rootPath) {
		//            rootPath = me.rootPath;
		//        }

		var url;
		if (me.helpType === 'rich') {
			url = C_ROOT + 'SUP/CommonHelp/GetHelpTemplate?helpid=' + me.helpid;
		}
		else {
			url = C_ROOT + 'SUP/CommonHelp/GetHelpInfo?helpid=' + me.helpid;
		}

		Ext.Ajax.request({
			url: url,
			callback: initTpl,
			success: function (response) {
				var resp = Ext.JSON.decode(response.responseText);
				if (resp.status === "ok") {

					if (me.helpType === 'rich') {
						//title = resp.Title;
						template = resp.template; //界面模板
					}
					else {
						//title = resp.data.Title;
						allfield = resp.data.AllField;
						headText = resp.data.HeadText;
					}

				} else {
					Ext.MessageBox.alert('取数失败', resp.status);
				}
			}
		});

	},
	bindData: function () {
		var me = this;

		BindCombox(me, me.valueField, me.displayField, me.helpid, me.getValue(), me.selectMode);
		return;

	},
	setOutFilter: function (obj) {
		this.outFilter = obj;
	},
	setLikeFilter: function (obj) {
		this.likeFilter = obj;
	},
	setLeftLikeFilter: function (obj) {
		this.leftLikeFilter = obj;
	}
});

Ext.define('Ext.ng.TreeComboBox', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.ngTreeComboBox',
	mixins: { base: 'Ext.ng.form.field.Base' },
	requires: ['Ext.ng.form.field.Base'],
	store: new Ext.data.ArrayStore({ fields: [], data: [[]] }),
	editable: false,
	//resizable: true,
	minWidth: 100,
	selectMode: 'Single',
	//maxWidth: 350,
	labelAlign: 'right',
	readOnly: false,
	minChars: 1, //输入一个就弹出下拉
	//typeAhead: true,
	triggerAction: 'all',
	//matchFieldWidth: false,
	initComponent: function () {

		var me = this;
		this.callParent(arguments);
		this.mixins.base.initComponent.call(me);
		this.treeRenderId = Ext.id();

		var height = me.treePanel.height || 300;
		if (me.treeMinHeight) {
			height = (me.treePanel.height < me.treeMinHeight) ? me.treeMinHeight : me.treePanel.height;
		}
		var width = me.pickerWidth || 300;
		if (me.treeMinWidth) {
			width = (me.treePanel.width < me.treeMinWidth) ? me.treeMinWidth : me.treePanel.width;
		}
		//必须要用这个定义tpl
		this.tpl = new Ext.XTemplate('<tpl for="."><div style="height:' + height + 'px;width:' + width + '"><div style="height:' + height + 'px;" id="' + this.treeRenderId + '"></div></div></tpl>');
		//this.tpl = new Ext.XTemplate('<div style="height:' + me.treePanel.height + 'px;" id="' + this.treeRenderId + '"></div>');
		//this.tpl = new Ext.XTemplate('<div style="height:150px;" id="' + this.treeRenderId + '"></div>');

		Ext.define('treemodel', {
			extend: 'Ext.data.Model',
			fields: [
							{
								name: me.valueField,
								type: 'string',
								mapping: me.valueField
							}, {
								name: me.displayField,
								type: 'string',
								mapping: me.displayField
							}]
		});

		me.treePanel.border = false, //去掉边框
		me.treePanel.width = width;
		if (!me.matchFieldWidth) {
			me.getPicker().setWidth(width);
		}

		var treeObj = me.treePanel;

		treeObj.on('itemclick', function (view, rec) {
			if (rec) {


				var isleaf = rec.get('leaf');
				if (me.effectiveNodeType === 'leaf' && (isleaf == false)) {
					return; //不是叶子节点
				}

				var code = rec.get(me.treeValueField); //rec.get('id');
				var name = rec.get('text');

				var obj = new Object();
				obj[me.valueField] = code;
				obj[me.displayField] = name;

				var valuepair = Ext.ModelManager.create(obj, 'treemodel');
				me.setValue(valuepair); //必须这么设置才能成功

				me.collapse();

			}
		});

		this.on({ 'expand': function () {

			
//			var tempdiv = Ext.query('.x-panel-body');       
//			for (var i = 0; i < tempdiv.length; i++) {
//				if (Ext.isEmpty(tempdiv[i].innerHTML)) {
//					tempdiv[i].remove();
//				}
//			}

			if (!treeObj.rendered && treeObj && !this.readOnly) {
			//if (treeObj && !this.readOnly) {
				Ext.defer(function () {
					treeObj.render(this.treeRenderId);
				}, 100, this);
			}
			
		}
		});
	},
	doQuery: function () {
		var me = this;
		me.expand();
	}
});

Ext.define('Ext.ng.AutoComplete', {
	extend: 'Ext.form.field.ComboBox',
	mixins: { base: 'Ext.ng.form.field.Base' },
	requires: ['Ext.ng.form.field.Base'],
	alias: 'widget.ngAutoComplete',
	minChars: 1, //定义输入最少多少个字符的时候获取数据
	typeAhead: true,
	typeAheadDelay: 500,
	triggerAction: "all",
	hideTrigger: true,
	initComponent: function () {
		var me = this;
		me.callParent();
		this.mixins.base.initComponent.call(me);

		var rootPath = '../';
		if (me.rootPath) {
			rootPath = me.rootPath;
		}
		store = Ext.create('Ext.data.Store', {
			pageSize: 50,
			fields: [{ name: me.valueField, type: 'string' },
				{ name: me.displayField, type: 'string'}],
			proxy: {
				type: 'ajax',
				url: C_ROOT + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid,
				reader: {
					type: 'json',
					root: 'Record',
					totalProperty: 'totalRows'
				}
			}
		});

		me.bindStore(store);
	}
});

//Text
Ext.define('Ext.ng.Text', {
	extend: 'Ext.form.field.Text',
	mixins: { base: 'Ext.ng.form.field.Base' },
	alias: 'widget.ngText', //别名,可通过设置xtype构建,或者通过Ext.widget()方法构建
	initComponent: function () {
		var me = this;
		this.mixins.base.initComponent.call(me);
		me.callParent();

	}
});

Ext.define('Ext.ng.TextArea', {
	extend: 'Ext.form.field.TextArea',
	mixins: { base: 'Ext.ng.form.field.Base' },
	alias: 'widget.ngTextArea', //别名,可通过设置xtype构建,或者通过Ext.widget()方法构建 
	initComponent: function () {
		var me = this;
		this.mixins.base.initComponent.call(me);
		me.callParent();
	}
});

Ext.define('Ext.ng.Number', {
    extend: 'Ext.form.field.Number',
    mixins: { base: 'Ext.ng.form.field.Base' },
    alias: 'widget.ngNumber', //别名,可通过设置xtype构建,或者通过Ext.widget()方法构建 
    initComponent: function () {
        var me = this;
        this.mixins.base.initComponent.call(me);
        me.callParent();
    },
    setValue: function (v) {
        
        v = typeof (v) == 'number' ? v : String(v).replace(this.decimalSeparator, ".").replace(/,/g, "");
        v = Ext.util.Format.number(String(v), "0,000.00");
        this.setRawValue(v);
        //this.callParent(v);
    },
    validateValue: function (value) {

        //        if (!Ext.form.field.Number.superclass.validateValue.call(this, value)) {
        //            return false;
        //        }

        if (!value) return true;

        if (value.length < 1) {
            return true;
        }

        value = String(value).replace(this.decimalSeparator, ".").replace(/,/g, "");
        if (isNaN(value)) {
            this.markInvalid(String.format(this.nanText, value));
            return false;
        }

        var num = this.parseValue(value);
        if (num < this.minValue) {
            this.markInvalid(String.format(this.minText, this.minValue));
            return false;
        }
        if (num > this.maxValue) {
            this.markInvalid(String.format(this.maxText, this.maxValue));
            return false;
        }
        return true;
    },
    parseValue: function (value) {
        value = parseFloat(String(value).replace(this.decimalSeparator, ".").replace(/,/g, ""));
        return isNaN(value) ? '' : value;
    },
//    getValue: function () {
//        //alert(String(Ext.form.field.Number.superclass.getValue.call(this)).replace(",", ""));
//        return parseFloat(String(Ext.form.field.Number.superclass.getValue.call(this)).replace(",", ""));       
//    },
    getSubmitData: function () {

        data = {};
        data[this.getName()] = this.getValue();
        return data;
    }
});

Ext.define('Ext.ng.Date', {
	extend: 'Ext.form.field.Date',
	mixins: { base: 'Ext.ng.form.field.Base' },
	alias: 'widget.ngDate', //别名,可通过设置xtype构建,或者通过Ext.widget()方法构建   
	initComponent: function () {
		var me = this;
		this.mixins.base.initComponent.call(me);
		me.callParent();

	}
});

Ext.define('Ext.ng.Time', {
	extend: 'Ext.form.field.Time',
	mixins: { base: 'Ext.ng.form.field.Base' },
	alias: 'widget.ngTime', //别名,可通过设置xtype构建,或者通过Ext.widget()方法构建 
	initComponent: function () {
		var me = this;
		this.mixins.base.initComponent.call(me);
		me.callParent();

	}
});

Ext.define('Ext.ng.Checkbox', {
	extend: 'Ext.form.field.Checkbox',
	mixins: { base: 'Ext.ng.form.field.Base' },
	alias: 'widget.ngCheckbox', //别名,可通过设置xtype构建,或者通过Ext.widget()方法构建
	initComponent: function () {
		var me = this;
		this.mixins.base.initComponent.call(me);
		me.callParent();

	}
});

Ext.define('Ext.ng.Radio', {
	extend: 'Ext.form.field.Radio',
	mixins: { base: 'Ext.ng.form.field.Base' },
	alias: 'widget.ngRadio', //别名,可通过设置xtype构建,或者通过Ext.widget()方法构建
	initComponent: function () {
		var me = this;
		this.mixins.base.initComponent.call(me);
		me.callParent();

	}
});

// #endregion

// #region observe

Ext.define('Ext.ng.ListRefresher', {
	mixins: {
		observable: 'Ext.util.Observable'
	},
	constructor: function (config) {
		this.mixins.observable.constructor.call(this, config);

		this.addEvents('refreshlist');
	}
});


Ext.define('Ext.ng.Checker', {
	mixins: {
		observable: 'Ext.util.Observable'
	},
	constructor: function (config) {
		this.mixins.observable.constructor.call(this, config);

		this.addEvents('checkin');
	}
});

// #endregion

// #region NG.Util


//-------获取Ext.form.Panel对象的数据-----
//
//form: 表单Ext.form.Panel对象
//key: 单据的主键,多主键以","号为分隔符
//optype:操作类型, 新增：new,修改：edit
//返回json格式数据
//----------------------------------------------
function GetExtJsFormData(form, key, optype) {


	if (optype === 'new' || optype === 'add') {
		optype = 'newRow';
	}
	else {
		optype = 'modifiedRow';
	}


	var data = DealFormData(form);


	//处理主键
	var keys = key.split(',');
	var temp = '';
	for (var i = 0; i < keys.length; i++) {

		var keytemp = keys[i];
		var arr = keys[i].split('.');
		if (arr.length > 1) {
			keytemp = arr[1];
		}

		if (i < (keys.length - 1)) {
			temp += data[keytemp] + ",";
		}
		else {
			temp += data[keytemp];
		}

	}
	data["key"] = temp;  //data[key];//主键列的值

	var obj = new Object();
	obj['key'] = key; //主键列
	obj[optype] = data;
	data = { 'form': obj };

	var json = JSON.stringify(data); //Ext.encode(data);
	return json;
}

//Ext4.0版本，复合控件不能清空值处理
//Ext4.2已经修正
function DealFormData(form) {

	var formdata = form.getForm();
	var data = formdata.getValues();

	//处理那些值为空导致getValues()取不到值，不能传值的对象
	var fields = form.getForm().getFields().items;
	for (var i = 0; i < fields.length; i++) {

		var field = fields[i];
		var classname = field.alternateClassName;
		var fieldname = field.name; //字段

		//combox控件处理
		if (classname === 'Ext.form.field.ComboBox' || classname === 'Ext.form.ComboBox') {
			if (!data.hasOwnProperty(fieldname)) {
				data[fieldname] = ''; //空值
			}
		}

		//Checkbox控件处理
		if (classname === 'Ext.form.field.Checkbox' || classname === 'Ext.form.Checkbox') {
			if (!data.hasOwnProperty(fieldname)) {
				data[fieldname] = ''; //空值
			}
		}

		//Radio控件处理
		if (classname === 'Ext.form.field.Radio' || classname === 'Ext.form.Radio') {
		    if (!data.hasOwnProperty(fieldname)) {
		        data[fieldname] = ''; //空值
		    } else if (Ext.isArray(data[fieldname])) {
		        var temppp = data[fieldname].filter(function (n) { return n != '' });
		        if (temppp.length > 0) {
		            data[fieldname] = temppp[0];
		        }
		    }
		}
	}

	return data;
}

//-------合并Ext.form.Panel对象的数据-----
//
//forms: 表单Ext.form.Panel对象数组
//key: 单据的主键,多主键以","号为分隔符
//optype:操作类型, 新增：new,修改：edit
//返回json格式数据
//----------------------------------------------
function MergeFormData(forms, key, optype) {

	if (optype === 'new' || optype === 'add') {
		optype = 'newRow';
	}
	else {
		optype = 'modifiedRow';
	}

	if (forms.length > 0) {


		var data = DealFormData(forms[0]);

		for (var i = 1; i < forms.length; i++) {

			var obj = DealFormData(forms[i]);

			for (var p in obj) {
				if (!data.hasOwnProperty(p)) {
					data[p] = obj[p]; //键值对加入data中
				}
			}
		}

		//处理主键
		var keys = key.split(',');
		var temp = '';
		for (var i = 0; i < keys.length; i++) {

			var keytemp = keys[i];
			var arr = keys[i].split('.');
			if (arr.length > 1) {
				keytemp = arr[1];
			}

			if (i < (keys.length - 1)) {
				temp += data[keytemp] + ",";
			}
			else {
				temp += data[keytemp];
			}

		}
		data["key"] = temp;  //data[key];//主键列的值

		var obj = new Object();
		obj['key'] = key; //主键列id
		obj[optype] = data;
		data = { 'form': obj };

		var json = JSON.stringify(data); //Ext.encode(data);
		return json;

	}
}

//----------获取ExtJs.Grid对象的数据----------
//store : Ext.data.Store对象
//key : 主键列，多主键以","为分隔符
//返回json格式数据
//------------------------------------------------
function GetExtJsGridData(store, key) {

	var flag = false;
	var newRecords = store.getNewRecords(); //获得新增行  
	var modifyRecords = store.getUpdatedRecords(); // 获取修改的行的数据，无法获取幻影数据 
	var removeRecords = store.getRemovedRecords(); //获取移除的行
	
	var newdata = [];
	Ext.Array.each(newRecords, function (record) {

		//
		var newobj = record.data;
		newobj["key"] = null;
		newobj = { 'row': newobj }; //行标记
		newdata.push(newobj);
	});

	var modifydata = [];
	Ext.Array.each(modifyRecords, function (record) {

		//
		var modifyobj = new Object(); //record.modified;

		//处理主键
		var keys = key.split(',');
		var values = '';
		for (i = 0; i < keys.length; i++) {
			if (i < (keys.length - 1)) {
				if (record.data[keys[i]]) {
					values += record.data[keys[i]];
				}
				else {
					values += "";
				}

				values += ",";
			}
			else {
				if (record.data[keys[i]]) {
					values += record.data[keys[i]];
				}
				else {
					values += "";
				}
			}
		}

		//处理修改的字段,只传修改的部分,减少数据传输量
		var modified = new Object();
		modified["key"] = values;
		for (var p in record.modified) {
			modified[p] = record.data[p];
		}
		modifyobj = { 'row': modified }; //行标记

		modifydata.push(modifyobj);

	});

	var removedata = [];
	Ext.Array.each(removeRecords, function (record) {
		//

		var object = new Object();
		//object[key] = record.get(key);

		var keys = key.split(',');
		var values = "";
		for (i = 0; i < keys.length; i++) {
			if (i < (keys.length - 1)) {
				if (record.data[keys[i]]) {
					values += record.data[keys[i]];
				}
				else {
					values += "";
				}

				values += ",";
			}
			else {
				if (record.data[keys[i]]) {
					values += record.data[keys[i]];
				}
				else {
					values += "";
				}
			}
		}
		object["key"] = values;
		object = { 'row': object }; //行标记
		removedata.push(object);
	});

	var data = new Object();
	data['key'] = key;

	//
	if (newdata.length > 0) {
		data['newRow'] = newdata;
		flag = true;
	}
	if (modifydata.length > 0) {
		data['modifiedRow'] = modifydata;
		flag = true;
	}
	if (removedata.length > 0) {
		data['deletedRow'] = removedata;
		flag = true;
	}
	data = { 'table': data };

	if (flag) {
	   data['isChanged'] = true;
	}
	return data;
	//    var json = JSON.stringify(data);//Ext.encode(data);
	//    return json;

}

function GetExtJsGridAllData(store, key) {
   
    var newRecords = store.getNewRecords(); //获得新增行  
    var modifyRecords = store.getUpdatedRecords(); // 获取修改的行的数据，无法获取幻影数据 
    var removeRecords = store.getRemovedRecords(); //获取移除的行

    var keyIndex = {};
    Ext.Array.each(modifyRecords, function (record) {
        keyIndex[record.data[key]] = record.data[key];
    });
    Ext.Array.each(removeRecords, function (record) {
        keyIndex[record.data[key]] = record.data[key];
    });

    var unchangeRecords = [];
    for (var i = 0; i < store.data.items.length; i++) {
        if (!Ext.isEmpty(store.data.items[i].data[key]) && !keyIndex[store.data.items[i].data[key]]) {
            unchangeRecords.push(store.data.items[i]);
        }
    }

    return GetDatatableData(newRecords, modifyRecords, removeRecords, unchangeRecords, key);

}

//----------获取DataTable的json数据----------
//新增:newRecords,修改:modifyRecords,删除:removeRecords,不变:unchangeRecords
// 数据类型都是Ext.data.Model[]
// key：业务主键
//------------------------------------------------
function GetDatatableData(newRecords, modifyRecords, removeRecords,unchangeRecords, key) {

    var flag = false;
    var newdata = [];
    Ext.Array.each(newRecords, function (record) {

        //
        var newobj = record.data;
        newobj["key"] = null;
        newobj = { 'row': newobj }; //行标记
        newdata.push(newobj);
    });

    var modifydata = [];
    Ext.Array.each(modifyRecords, function (record) {

        //
        var modifyobj = new Object(); //record.modified;

        //处理主键
        var keys = key.split(',');
        var values = '';
        for (i = 0; i < keys.length; i++) {
            if (i < (keys.length - 1)) {
                if (record.data[keys[i]]) {
                    values += record.data[keys[i]];
                }
                else {
                    values += "";
                }

                values += ",";
            }
            else {
                if (record.data[keys[i]]) {
                    values += record.data[keys[i]];
                }
                else {
                    values += "";
                }
            }
        }

        //处理修改的字段,只传修改的部分,减少数据传输量
        var modified = new Object();
        modified["key"] = values;
        //        for (var p in record.modified) {
        //            modified[p] = record.data[p];
        //        }
        Ext.apply(modified, record.data);
        modifyobj = { 'row': modified }; //行标记

        modifydata.push(modifyobj);

    });

    var removedata = [];
    Ext.Array.each(removeRecords, function (record) {
        //

        var object = new Object();
        //object[key] = record.get(key);

        var keys = key.split(',');
        var values = "";
        for (i = 0; i < keys.length; i++) {
            if (i < (keys.length - 1)) {
                if (record.data[keys[i]]) {
                    values += record.data[keys[i]];
                }
                else {
                    values += "";
                }

                values += ",";
            }
            else {
                if (record.data[keys[i]]) {
                    values += record.data[keys[i]];
                }
                else {
                    values += "";
                }
            }
        }
        object["key"] = values;
        object = { 'row': object }; //行标记
        removedata.push(object);
    });

  var unChangedData = [];
  Ext.Array.each(unchangeRecords, function (record) {

      //处理主键
      var keys = key.split(',');
      var values = '';
      for (i = 0; i < keys.length; i++) {
          if (i < (keys.length - 1)) {
              if (record.data[keys[i]]) {
                  values += record.data[keys[i]];
              }
              else {
                  values += "";
              }

              values += ",";
          }
          else {
              if (record.data[keys[i]]) {
                  values += record.data[keys[i]];
              }
              else {
                  values += "";
              }
          }
      }

      record.data['key'] = values;
      var obj = { 'row': record.data }; //行标记
      unChangedData.push(obj);
  });

    var data = new Object();
	data['key'] = key;

	if (newdata.length > 0) {
	    data['newRow'] = newdata;
	    flag = true;	    
	}
	if (modifydata.length > 0) {
	    data['modifiedRow'] = modifydata;
	    flag = true;	    
	}
	if (removedata.length > 0) {
	    data['deletedRow'] = removedata;
	    flag = true; 
	}
    if(unChangedData.length > 0) {
		data['unChangedRow'] = unChangedData;
		flag = true;
}

    data = { 'table': data };
    if (flag) {
        data['isChanged'] = true;
    }
    return data;
};

//----------获取DataTable的json数据----------
//新增:data.add,修改:data.modify,删除:data.remove,不变:data.unchange
// 数据类型都是Ext.data.Model[]
// data.key：业务主键
//------------------------------------------------
function GetTableData(data) {

    var newdata = data.add || [];
    var modifydata = data.modify || [];
    var removedata = data.remove || [];
    var unChangedData = data.unchange || [];

   return GetDatatableData(newdata, modifydata, removedata, unChangedData, data.key);
};

//----------获取ExtJs.Grid对象的所有数据----------
//store : Ext.data.Store对象
//key : 主键列，多主键以","为分隔符
//返回行状态全是新增的json格式数据
//------------------------------------------------
function GetAllGridData(store, key) {

	var all = store.getRange();

	var newdata = [];
	Ext.Array.each(all, function (record) {

		var newobj = record.data;
		newobj["key"] = null;
		newobj = { 'row': newobj }; //行标记
		newdata.push(newobj);
	});

	var data = new Object();
	data['key'] = key;

	if (newdata.length > 0) {
		data['newRow'] = newdata;
	}

	data = { 'table': data };

	var json = JSON.stringify(data); //Ext.encode(data);
	return json;

}

//----------校验ExtJs.Grid对象的数据----------
//store : Ext.grid.Panel对象
//通过:true,失败:false
//------------------------------------------------
function ValidGridData(grid) {

	var store = grid.store;
	var newRecords = store.getNewRecords(); //获得新增行  
	var modifyRecords = store.getUpdatedRecords(); // 获取修改的行的数据，无法获取幻影数据
	var removeRecords = store.getRemovedRecords(); //获取移除的行

	for (var i = 0; i < store.data.items.length; i++) {
		var curRow = store.data.items[i].data;

		var j = 0;
		for (property in curRow) {
			var name = property; //列名
			var value = curRow[property]; //值


			var colIndex = -1;
			var findColumn = false;
			//查找是第几列
			for (var k = 0; k < grid.columns.length; k++) {
				var column = grid.columns[k];
				if (name === column.dataIndex) {
					colIndex = k;
					findColumn = true;
					break;
				}
			}

			if (!findColumn) continue;
			if (!grid.columns[colIndex].getEditor) continue; //容错
			j++;

			var editor = grid.columns[colIndex].getEditor();

			if (editor) {
				if (!editor.validateValue(value) || (!editor.allowBlank && Ext.isEmpty(value))) {

				    var errorMsg = !editor.validateValue(value) ? editor.activeErrors : "该项为必输项";
				    errorMsg = '第' + (i + 1) + '行， [' + column.text + ']列输入不合法：' + errorMsg;
					//Ext.create('Ext.ng.MessageBox').Error('第' + (i+1) + '行， [' + column.text + ']列输入不合法：' + errorMsg);

					var msg = Ext.Msg.show(
								{
									title: '提示',
									msg: errorMsg,
									closable: false,
									buttons: Ext.Msg.OK,
									icon: Ext.Msg.ERROR,
									animateTarget: grid.getView().getNode(store.data.items[i]).childNodes[j].id
								}
							);

					setTimeout(function () {
						msg.close();
						grid.plugins[0].startEdit(i, (j));
					}, 1500);

					//grid.plugins[0].startEditByPosition({ row: i, column: (j+1) });
					//grid.plugins[0].startEdit(i, (j));
					return false;
				}
			}
		}
	}

	//列内容的唯一性验证
	if (grid.uniqueColumn) {

		for (var i = 0; i < grid.uniqueColumn.length; i++) {
			var temp = grid.uniqueColumn[i];
			if (temp.col.indexOf(',') > 0) {
				var obj = {};
				var arr = temp.col.split(',');
				for (var j = 0; j < store.data.items.length; j++) {

					var data = store.data.items[j].data;
					var value = '';
					for (var k = 0; k < arr.length; k++) {
						if (data[arr[k]]) {
							value += data[arr[k]];
						}
					}

					if (obj.hasOwnProperty(value)) {//已经存在

						Ext.create('Ext.ng.MessageBox').Error('第' + (j + 1) + '行输入数据重复!');
						return false;
					} else {
						if (!Ext.isEmpty(value)) {
							obj[value] = value;
						}
					}
				}
			}
			else {
				var obj = {};
				for (var j = 0; j < store.data.items.length; j++) {
					var data = store.data.items[j].data;
					var value = temp.col;
					if (obj.hasOwnProperty(data[value])) {//已经存在

						var findColumn = false;
						var colIndex = -1;
						//查找是第几列
						for (var k = 0; k < grid.columns.length; k++) {
							var column = grid.columns[k];
							if (value === column.dataIndex) {
								colIndex = k;
								findColumn = true;
								break;
							}
						}
						if (!findColumn) continue;

						Ext.create('Ext.ng.MessageBox').Error('第' + (j + 1) + '行输入数据重复!');
						grid.plugins[0].startEdit(j, colIndex);

						return false;
					} else {
						if (!Ext.isEmpty(data[value])) {
							obj[data[value]] = data[value];
						}
					}
				}
			}
		}
	}

	return true;
};

function FormatToDate(CurrTime, format) {

	//"Mon Jan 7 15:07:37 UTC+0800 2013";

	//"Thu Jan 03 2013 00:00:00 GMT+0800"

	//

	CurrTime = CurrTime + '';
	var date = '';
	var month = new Array();
	month["Jan"] = 1;
	month["Feb"] = 2;
	month["Mar"] = 3;
	month["Apr"] = 4;
	month["May"] = 5;
	month["Jun"] = 6;
	month["Jul"] = 7;
	month["Aug"] = 8;
	month["Sep"] = 9;
	month["Oct"] = 10;
	month["Nov"] = 11;
	month["Dec"] = 12;

	var str = CurrTime.split(" ");

	if (CurrTime.indexOf('UTC') > 0) {
		if (format === "yyyy-mm-dd") {
			date = str[5] + '-' + month[str[1]] + '-' + str[2];
		}
		else if (format.toLocaleLowerCase() === "yyyy-mm-dd hh:mm:ss") {
			date = str[5] + '-' + month[str[1]] + '-' + str[2] + " " + str[3];
		}
	}
	else if (CurrTime.indexOf('GMT') > 0) {
		if (format.toLocaleLowerCase() === "yyyy-mm-dd") {
			date = str[3] + '-' + month[str[1]] + '-' + str[2];
		}
		else if (format.toLocaleLowerCase() === "yyyy-mm-dd hh:mm:ss") {
			date = str[3] + '-' + month[str[1]] + '-' + str[2] + " " + str[4];
		}
	}


	return date;
}

function BindCombox(combox, code, name, helpid, codeValue, helptype) {

	Ext.Ajax.request({
		//params: { 'id': busid },
		url: C_ROOT + 'SUP/CommonHelp/GetName?helptype=' + helptype + '&helpid=' + helpid + '&code=' + codeValue,
		success: function (response) {

			var resp = Ext.JSON.decode(response.responseText);
			if (resp.status === "ok") {

				Ext.define('model', {
					extend: 'Ext.data.Model',
					fields: [{
						name: code, //'code',
						type: 'string',
						mapping: code//'code'
					}, {
						name: name, //'name',
						type: 'string',
						mapping: name//'name'
					}
					 ]
				});

				var obj = new Object();
				obj[code] = codeValue;
				if (combox.displayFormat) {
					obj[name] = Ext.String.format(combox.displayFormat, codeValue, resp.name);
				} else {
					obj[name] = resp.name;
				}
				var provincepair = Ext.ModelManager.create(obj, 'model');
				combox.setValue(provincepair);

			} else {
				Ext.MessageBox.alert('取数失败', resp.status);
			}
		}
	});
}

//----------批量做帮助控件的代码名称转换----------
//comboxs : Ext.ng.CommonHelp,Ext.form.ComboBox对象数组
//
//------------------------------------------------
function BatchBindCombox(comboxs) {

	var codeobj = [];
	var comboxColls = [];
	for (var i = 0; i < comboxs.length; i++) {
		if (comboxs[i].alternateClassName === 'Ext.ng.CommonHelp'
		|| comboxs[i].alternateClassName === 'Ext.form.ComboBox'
		|| comboxs[i].alternateClassName === 'Ext.ng.MultiHelp') {


			if (!Ext.isEmpty(comboxs[i].getValue())) {
				var config = comboxs[i].initialConfig;
				var obj = {};
				obj['HelpID'] = config['helpid'];
				obj['Code'] = comboxs[i].getValue();
				obj['HelpType'] = comboxs[i].selectMode;
				obj['Name'] = '';
				obj['OutJsonQuery'] = comboxs[i]['outFilter'] ? comboxs[i]['outFilter'] : '';
				codeobj.push(obj);

				comboxColls.push(comboxs[i]);
			}
		}
	}

	if (codeobj.length > 0) {
	    Ext.Ajax.request({
	        params: { 'valueobj': Ext.encode(codeobj) },
	        url: C_ROOT + 'SUP/CommonHelp/GetAllNames',
	        success: function (response) {

	            var resp = Ext.JSON.decode(response.responseText);
	            if (resp.status === "ok") {

	                for (var i = 0; i < comboxColls.length; i++) {


	                    var config = comboxColls[i].initialConfig;
	                    var code = config.valueField;
	                    var name = config.displayField;

	                    Ext.define('model', {
	                        extend: 'Ext.data.Model',
	                        fields: [{
	                            name: code, //'code',
	                            type: 'string',
	                            mapping: code//'code'
	                        }, {
	                            name: name, //'name',
	                            type: 'string',
	                            mapping: name//'name'
	                        }
					 ]
	                    });

	                    var nameValue = resp.name[i]['Name'];

	                    if (!Ext.isEmpty(nameValue)) {
	                        var obj = new Object();
	                        obj[code] = comboxColls[i].getValue();
	                        if (comboxColls[i].displayFormat) {
	                            obj[name] = Ext.String.format(comboxColls[i].displayFormat, comboxColls[i].getValue(), nameValue);
	                        } else {
	                            obj[name] = nameValue;
	                        }
	                        var provincepair = Ext.ModelManager.create(obj, 'model');
	                        comboxColls[i].setValue(provincepair);
	                    }

	                }

	            } else {
	                Ext.MessageBox.alert('取数失败', resp.status);
	            }
	        }
	    });
	}

}

// #endregion

// #region 业务组件之人员帮助
Ext.define("Ext.ng.EmpHelp", {
	extend: 'Ext.window.Window',
	alias: 'widget.emphelp',
	title: '员工帮助',
	closable: true,
	resizable: false,
	modal: true,
	width: 600,
	height: 400,
	nodeIndex: -1,
	border: false,
	callback: null,  //点击确定后的回调函数
	allowBank: true, //允许返回空值
	bussType: "all", //业务类型
	gridStore: null,
	sqlfilter: "",
	isMulti: false, //默认单选
	layout: {
		type: 'border',
		padding: 4
	},
	initComponent: function () {
		var me = this, center = {}, resultStore;
		me.initParam();
		var store = Ext.create('Ext.ng.JsonStore', {
			autoLoad: false,
			pageSize: 15,
			fields: [{
				name: 'cno',
				mapping: 'cno',
				type: 'string'
			}, {
				name: 'cname',
				mapping: 'cname',
				type: 'string'
			}, {
				name: 'assigntype',
				mapping: 'assigntype',
				type: 'string'
			}],
			url: C_ROOT + 'SUP/Person/GetEmpList?sqlfilter=' + me.sqlfilter
		}),
			empTree = Ext.create('Ext.ng.TreePanel', {
				region: 'center',
				border: false,
				autoScroll: true,
				rootVisible: false,
				useArrows: true,
				width: 180,
				minSize: 180,
				maxSize: 180,
				treeFields: [{ name: 'text', type: 'string' },
						 { name: 'id', type: 'string' },
						 { name: 'pid', type: 'string' },
						 { name: 'relatindex', type: 'string' },
						 { name: 'bopomofo', type: 'string'}],
				url: C_ROOT + 'SUP/Person/LoadHrTree',
				listeners: {
					selectionchange: function (m, selected, eOpts) {
						me.memory.eOpts = "selectionchange";
						me.searchData({ leaf: selected[0].data.leaf, ocode: selected[0].data.id, relatindex: selected[0].data.relatindex });
						me.getDockedItems(":last")[0].query("checkboxfield:first")[0].setValue(me.memory.IsMemo && me.memory.FoucedNodeValue == selected[0].getPath());
						me.memory.eOpts = "";
					},
					itemclick: function (m, record, item, index, e, eOpts) {
						me.nodeIndex = -1;
					},
					load: function (m, node, records, successful, eOpts) {
					},
					viewready: function (m, eOpts) {
						if (!Ext.isEmpty(me.memory.FoucedNodeValue)) {
							empTree.selectPath(me.memory.FoucedNodeValue, null, null, function () {
								if (Ext.isIE) {
									window.setTimeout(function () {
										var selectNode = m.view.body.query("tr." + m.view.selectedItemCls);
										if (selectNode) {
											selectNode[0].scrollIntoView(true);
										}
									}, 500);
								}
							});
						}
						else {
							store.load();
						}
					}
				}
			}),
			left = {
				title: "人力资源树",
				autoScroll: false,
				collapsible: true,
				split: true,
				region: 'west',
				weight: 50,
				width: 180,
				minSize: 180,
				maxSize: 180,
				border: true,
				layout: 'border',
				items: [{ region: 'north',
					height: 26,
					layout: 'border',
					border: false,
					items: [{
						region: 'center',
						xtype: "textfield",
						allowBlank: true,
						fieldLabel: '',
						emptyText: '输入关键字，定位树节点',
						margin: '2 0 2 2',
						enableKeyEvents: true,
						listeners: {
							'keydown': function (el, e, eOpts) {
								if (e.getKey() == e.ENTER) {
									me.findNodeByFuzzy(empTree, el.getValue());
									el.focus();
									return false;
								}
								else {
									me.nodeIndex = -1;
								}
							}
						}
					}, { region: 'east', xtype: 'button', text: '', iconCls: 'icon-Location', width: 21, margin: '2 5 2 5', handler: function () { var el = arguments[0].prev(); me.findNodeByFuzzy(empTree, el.getValue()); el.focus(); } }]
				}, empTree]
			},
			gridLeft = Ext.create('Ext.ng.GridPanel', Ext.apply({
				store: store,
				autoScroll: true,
				columnLines: true,
				columns: [{
					header: '编号',
					flex: 1,
					sortable: false,
					menuDisabled: true,
					draggable: false,
					dataIndex: 'cno'
				}, {
					header: '姓名',
					flex: 1,
					sortable: false,
					menuDisabled: true,
					draggable: false,
					dataIndex: 'cname',
					renderer: function (value, parm, record) {
						return me.getEmpName(value, record.data.assigntype);
					}
				}],
				listeners: {
					'itemdblclick': function (item, record, it, index, e, eOpts) {
						if (me.isMulti) {
							var data = gridLeft.getSelectionModel().getSelection();
							me.copyData(data, resultStore);
							gridLeft.getSelectionModel().deselectAll();
						}
						else if (me.callback) {
							me.close();
							me.callback({ cno: record.data.cno, cname: record.data.cname });
						}
					}
				},
				viewConfig: {
					style: {
						overflowX: 'hidden !important'
					}
				},
				bbar: me.isMulti ? null : Ext.create('Ext.ng.PagingBar', {
					store: store,
					displayMsg: '共 {2} 条数据',
					showRefresh: false
				})
			}, me.gridConfig)), pageBar;
		if (me.isMulti) {
			resultStore = Ext.create('Ext.ng.JsonStore', {
				fields: [{
					name: 'cno',
					mapping: 'cno',
					type: 'string'
				}, {
					name: 'cname',
					mapping: 'cname',
					type: 'string'
				}, {
					name: 'assigntype',
					mapping: 'assigntype',
					type: 'string'
				}]
			});
			var gridRight = Ext.create('Ext.ng.GridPanel', {
				columnWidth: .5,
				store: resultStore,
				height: 341,
				autoScroll: true,
				columnLines: true,
				border: false,
				selModel: { mode: "SIMPLE" },
				columns: [{
					header: '编号',
					flex: 1,
					sortable: false,
					menuDisabled: true,
					draggable: false,
					dataIndex: 'cno'
				}, {
					header: '姓名',
					flex: 1,
					sortable: false,
					menuDisabled: true,
					draggable: false,
					dataIndex: 'cname'
				}],
				listeners: {
					'itemdblclick': function (item, record, it, index, e, eOpts) {
						resultStore.remove([record]);
						Ext.Array.remove(me.currData.value, record.data.cno);
						Ext.Array.remove(me.currData.text, record.data.cname);
					}
				},
				viewConfig: {
					style: {
						overflowX: 'hidden !important'
					}
				},
				style: {
					"margin-right": "-1px !important"
				},
				bodyStyle: {
					top: '24px !important'
				}
			}),
				btnPanel = {
					height: 350,
					width: 80,
					layout: 'absolute',
					border: true,
					frame: true,
					style: { marginTop: "-4px" },
					items: [{
						xtype: 'button',
						name: 'addSelect',
						text: '&gt;',
						x: 6,
						y: 120,
						width: 60,
						handler: Ext.bind(function () {
							var data = gridLeft.getSelectionModel().getSelection();
							me.copyData(data, resultStore);
							gridLeft.getSelectionModel().deselectAll();
						})
					}, {
						xtype: 'button',
						name: 'selectAll',
						text: '&gt;&gt;',
						x: 6,
						y: 150,
						width: 60,
						handler: Ext.bind(function () {
							var data = store.data.items;
							me.copyData(data, resultStore);
							gridLeft.getSelectionModel().deselectAll();
						})
					}, {
						xtype: 'button',
						name: 'removeSelect',
						text: '&lt;',
						x: 6,
						y: 180,
						width: 60,
						handler: Ext.bind(function () {
							var data = gridRight.getSelectionModel().getSelection();
							me.removeData(data, resultStore);
						})
					}, {
						xtype: 'button',
						name: 'removeAll',
						text: '&lt;&lt;',
						x: 6,
						y: 210,
						width: 60,
						handler: Ext.bind(function () {
							me.removeData(null, resultStore, true);
						})
					}]
				},
				pageBar = Ext.create('Ext.ng.PagingBar', {
					store: store,
					showRefresh: false,
					displayMsg: '共 {2} 条数据&nbsp;&nbsp;&nbsp;已选 {3} 条数据',
					updateInfo: function () {
						var p = this;
						var displayItem = p.child('#displayItem'),
					pageData = p.getPageData(), msg;
						if (displayItem) {
							if (p.store.getCount() === 0) {
								msg = p.emptyMsg;
							}
							else {
								msg = Ext.String.format(
								 p.displayMsg,
								 pageData.fromRecord,
								 pageData.toRecord,
								 pageData.total,
								 me.currData.value.length
						);
							}
							displayItem.setText(msg);
						}
					}
				});
			center = {
				region: 'center',
				border: true,
				layout: 'column',
				items: [gridLeft, btnPanel, gridRight],
				bbar: pageBar
			};
		}
		else {
			center = gridLeft;
		}
		var top = {
			region: 'north',
			xtype: '',
			height: 27,
			border: false,
			layout: 'border',
			items: [{
				region: 'west',
				xtype: "combobox",
				store: Ext.create('Ext.ng.JsonStore', {
					autoLoad: false,
					pageSize: 50,
					fields: [
				{ name: 'ccode', mapping: 'ccode' },
				{ name: 'cname', mapping: 'cname' }
				],
					proxy: {
						type: 'ajax',
						url: C_ROOT + 'SUP/Person/GetEmpStatus',
						reader: {
							type: 'json',
							root: 'Record',
							totalProperty: 'totalRows'
						}
					},
					listeners: {
						load: function (m, records, successful, eOpts) {
							m.insert(0, [{ ccode: '', cname: '&nbsp;'}]);
						}
					}
				}),
				width: 100,
				labelWidth: 28,
				allowBlank: true,
				editable: false,
				fieldLabel: '',
				emptyText: '状态',
				valueField: 'ccode',
				displayField: 'cname',
				listeners: {
					select: function (combo, records, eOpts) {
						var code = combo.getValue() || records[0].data.emptype;
						if (Ext.isEmpty(code)) {
							combo.clearValue();
						}
						me.searchData({ "empstatus": code });
					}
				}
			}, {
				region: 'west',
				xtype: "combobox",
				store: Ext.create('Ext.ng.JsonStore', {
					autoLoad: false,
					fields: [
				{ name: 'emptype', mapping: 'emptype' },
				{ name: 'typename', mapping: 'typename' }
				],
					proxy: {
						type: 'ajax',
						url: C_ROOT + 'SUP/Person/GetEmpType',
						reader: {
							type: 'json',
							root: 'Record',
							totalProperty: 'totalRows'
						}
					},
					listeners: {
						load: function (m, records, successful, eOpts) {
							m.insert(0, [{ emptype: '', typename: '&nbsp;'}]);
						}
					}
				}),
				width: 100,
				labelWidth: 28,
				allowBlank: true,
				editable: false,
				fieldLabel: '',
				emptyText: '类型',
				valueField: 'emptype',
				displayField: 'typename',
				style: { marginLeft: '10px' },
				listeners: {
					select: function (combo, records, eOpts) {
						var code = combo.getValue() || records[0].data.emptype;
						if (Ext.isEmpty(code)) {
							combo.clearValue();
						}
						me.searchData({ "emptype": code });
					}
				}
			}, { region: 'center', xtype: 'container' }, {
				region: 'east',
				width: 160,
				fieldLabel: '',
				emptyText: '输入编号/姓名，回车查询',
				xtype: 'textfield',
				maxHeight: 22,
				style: {
					marginRight: '0px !important',
					marginTop: '1px !important'
				},
				enableKeyEvents: true,
				listeners: {
					'keydown': function (el, e, eOpts) {
						if (e.getKey() == e.ENTER) {
							var key = el.getValue();
							var param = { "searchtxt": "" };
							if (!Ext.isEmpty(key)) {
								if (/\d+/.test(key)) {
									param = { "searchtxt": "cno like '%" + key + "%'" };
								}
								else if (/\W+/.test(key)) {
									param = { "searchtxt": "cname like '%" + key + "%'" };
								}
								else {
									param = { "searchtxt": "cno like '%" + key + "%' or cname like '%" + key + "%' or bopomofo like '%" + key + "%'" };
								}
							}
							me.searchData(param);
							el.focus();
							return false;
						}
					}
				}
			}],
			style: {
				backgroundColor: 'transparent !important'
			}
		};
		me.items = [left, top, center];
		me.buttons = [{
			xtype: 'checkboxfield',
			boxLabel: '记忆树选中状态',
			handler: function (chk) {
				me.updataTreeMemory(empTree, chk.getValue());
			}
		}, {
			xtype: 'checkboxfield',
			boxLabel: '显示兼职',
			handler: function (chk) {
				me.searchData({ "partmark": chk.getValue() ? "1" : "" });
			}
		}, {
			xtype: 'checkboxfield',
			boxLabel: '显示代理',
			handler: function (chk) {
				me.searchData({ "proymark": chk.getValue() ? "1" : "" });
			}
		}, '->', {
			text: '确认',
			handler: function () {
				if (me.callback) {
					var data = me.isMulti ? me.currData.value : gridLeft.getSelectionModel().getSelection(), tmpdata = {};
					if (data.length > 0) {
						if (me.isMulti) {
							tmpdata = me.currData;
							tmpdata = { cno: tmpdata.value.join(","), cname: tmpdata.text.join(",") };
						}
						else {
							tmpdata = data[0].data;
							tmpdata = { cno: tmpdata.cno, cname: tmpdata.cname };
						}
					}
					else {
						if (me.allowBank) {
							tmpdata = { cno: '', cname: '' };
						}
						else {
							Ext.MessageBox.alert('', '未选择数据.');
							return;
						}
					}
					me.close();
					me.callback(tmpdata);
				}
			}
		}, {
			text: '取消',
			margin: '0 5 8 0',
			handler: function () {
				me.close();
			}
		}];
		me.callParent();
		me.show();
		me.gridStore = store;
		me.pageBar = pageBar;
	},
	initParam: function () {
		var me = this;
		me.memory = {};
		me.gridConfig = {};
		if (me.isMulti) {
			me.currData = { value: [], text: [] };
			me.helpType = "empmulti";
			me.width = 700;
			me.height = 473;
			me.gridConfig.columnWidth = .5;
			me.gridConfig.height = 341;
			me.gridConfig.border = false;
			me.gridConfig.selModel = { mode: "SIMPLE" };
			me.gridConfig.bodyStyle = {
				top: '24px !important'
			};
		}
		else {
			me.helpType = "empsingle";
			me.gridConfig.border = true;
			me.gridConfig.region = 'center';
		}
		Ext.Ajax.request({
			url: C_ROOT + 'SUP/Person/GetTreeMemoryInfo',
			async: false,
			params: { type: me.helpType, busstype: me.bussType },
			success: function (response, opts) {
				me.memory = Ext.JSON.decode(response.responseText);
			}
		});
	},
	findNodeByFuzzy: function (tree, value) {
		if (value == "") { return; }
		var me = this, index = -1, firstFind = me.nodeIndex == -1;
		var findNode = tree.getRootNode().findChildBy(function (node) {
			index++;
			if (!node.data.root && index > me.nodeIndex && (node.data.text.indexOf(value) > -1 || node.data.bopomofo.indexOf(value.toUpperCase()) > -1)) {
				return true;
			}
		}, null, true);
		me.nodeIndex = index;
		if (findNode) {
			tree.selectPath(findNode.getPath());
		}
		else {
			if (firstFind) {
				Ext.MessageBox.alert('', '没有匹配的树节点.');
			}
			me.nodeIndex = -1;
		}
	},
	searchData: function (param) {
		var me = this;
		me.gridStore.currentPage = 1;
		Ext.apply(me.gridStore.proxy.extraParams, param);
		me.gridStore.load();
	},
	updataTreeMemory: function (tree, checked) {
		var me = this;
		if (me.memory.eOpts == "selectionchange") { return; }
		var sd = tree.getSelectionModel().getSelection();
		if (sd.length > 0) {
			me.memory.FoucedNodeValue = sd[0].getPath();
			me.memory.IsMemo = checked;
			Ext.Ajax.request({
				url: C_ROOT + 'SUP/Person/UpdataTreeMemory',
				async: true,
				params: { type: me.helpType, busstype: me.bussType, foucednodevalue: me.memory.FoucedNodeValue, ismemo: checked },
				success: function (response, opts) {
				}
			});
		}
	},
	getEmpName: function (name, assigntype) {
		if (assigntype == "0" || assigntype == "") { return name; }
		else { return name + "<font color='blue'>[" + (assigntype == "1" ? "兼" : "代") + "]</font>"; }
	},
	copyData: function (selectData, resultStore) {
		var me = this;
		var dataLen = selectData.length,
			index = resultStore.getCount(),
			tmpArr = me.currData.value,
			tmpData = [];
		for (var i = 0; i < dataLen; i++) {
			var sourceData = selectData[i].data;
			if (Ext.Array.indexOf(tmpArr, sourceData.cno) < 0) {
				me.currData.value.push(sourceData.cno);
				me.currData.text.push(sourceData.cname);
				tmpData.push(sourceData);
			}
		}
		resultStore.insert(index, tmpData);
		me.pageBar.updateInfo();
	},
	removeData: function (data, resultStore, isAll) {
		var me = this;
		if (isAll) {
			resultStore.removeAll();
			me.currData.value = [];
			me.currData.text = [];
		}
		else {
			resultStore.remove(data);
			for (var i = 0; i < data.length; i++) {
				var posIndex = Ext.Array.indexOf(me.currData.value, data[i].data.cno);
				Ext.Array.erase(me.currData.value, posIndex, 1);
				Ext.Array.erase(me.currData.text, posIndex, 1);
			}
		}
		me.pageBar.updateInfo();
	}
});

//----------人员帮助组件尚在开发中----------
Ext.define("Ext.ng.PersonHelp", {
	extend: 'Ext.window.Window',
	alias: 'widget.personhelp',
	title: '人员帮助',
	closable: true,
	resizable: false,
	modal: true,
	width: 700,
	height: 480,
	nodeIndex: -1,
	border: false,
	callback: null,  //点击确定后的回调函数
	allowBank: true, //允许返回空值
	bussType: "all", //业务类型
	gridStore: null,
	sqlfilter: "",
	defaultHeight: 50,
	layout: {
		type: 'border',
		padding: 4
	},
	initComponent: function () {
		var me = this;
		me.initParam();
		var store = Ext.create('Ext.ng.JsonStore', {
			autoLoad: false,
			pageSize: 15,
			fields: [{
				name: 'cno',
				mapping: 'cno',
				type: 'string'
			}, {
				name: 'cname',
				mapping: 'cname',
				type: 'string'
			}, {
				name: 'assigntype',
				mapping: 'assigntype',
				type: 'string'
			}],
			url: C_ROOT + 'SUP/Person/GetEmpList?sqlfilter=' + me.sqlfilter
		}),
		pageBar = Ext.create('Ext.ng.PagingBar', {
			store: store,
			showRefresh: false,
			displayMsg: '共 {2} 条数据&nbsp;&nbsp;&nbsp;已选 {3} 条数据',
			updateInfo: function () {
				var p = this;
				var displayItem = p.child('#displayItem'),
					pageData = p.getPageData(), msg;
				if (displayItem) {
					if (p.store.getCount() === 0) {
						msg = p.emptyMsg;
					}
					else {
						msg = Ext.String.format(
								 p.displayMsg,
								 pageData.fromRecord,
								 pageData.toRecord,
								 pageData.total,
								 me.currData.value.length
						);
					}
					displayItem.setText(msg);
				}
			}
		}),
		resultStore = Ext.create('Ext.ng.JsonStore', {
			fields: [{
				name: 'cno',
				mapping: 'cno',
				type: 'string'
			}, {
				name: 'cname',
				mapping: 'cname',
				type: 'string'
			}, {
				name: 'assigntype',
				mapping: 'assigntype',
				type: 'string'
			}]
		}),
		empTree = Ext.create('Ext.ng.TreePanel', {
			region: 'center',
			border: false,
			autoScroll: true,
			rootVisible: false,
			useArrows: true,
			width: 180,
			minSize: 180,
			maxSize: 180,
			treeFields: [{ name: 'text', type: 'string' },
						 { name: 'id', type: 'string' },
						 { name: 'pid', type: 'string' },
						 { name: 'relatindex', type: 'string' },
						 { name: 'bopomofo', type: 'string'}],
			url: C_ROOT + 'SUP/Person/LoadHrTree',
			listeners: {
				selectionchange: function (m, selected, eOpts) {
					me.memory.eOpts = "selectionchange";
					me.searchData({ leaf: selected[0].data.leaf, ocode: selected[0].data.id, relatindex: selected[0].data.relatindex });
					me.getDockedItems(":last")[0].query("checkboxfield:first")[0].setValue(me.memory.IsMemo && me.memory.FoucedNodeValue == selected[0].getPath());
					me.memory.eOpts = "";
				},
				itemclick: function (m, record, item, index, e, eOpts) {
					me.nodeIndex = -1;
				},
				load: function (m, node, records, successful, eOpts) {
				},
				viewready: function (m, eOpts) {
					if (!Ext.isEmpty(me.memory.FoucedNodeValue)) {
						empTree.selectPath(me.memory.FoucedNodeValue, null, null, function () {
							if (Ext.isIE) {
								window.setTimeout(function () {
									var selectNode = m.view.body.query("tr." + m.view.selectedItemCls);
									if (selectNode) {
										selectNode[0].scrollIntoView(true);
									}
								}, 500);
							}
						});
					}
					else {
						store.load();
					}
				}
			}
		}),
		left = {
			title: "人力资源树",
			autoScroll: false,
			collapsible: true,
			split: true,
			weight: 50,
			region: 'west',
			width: 180,
			minSize: 180,
			maxSize: 180,
			border: true,
			layout: 'border',
			items: [{ region: 'north',
				height: 26,
				layout: 'border',
				border: false,
				items: [{
					region: 'center',
					xtype: "textfield",
					allowBlank: true,
					fieldLabel: '',
					emptyText: '输入关键字，定位树节点',
					margin: '2 0 2 2',
					enableKeyEvents: true,
					listeners: {
						'keydown': function (el, e, eOpts) {
							if (e.getKey() == e.ENTER) {
								me.findNodeByFuzzy(empTree, el.getValue());
								el.focus();
								return false;
							}
							else {
								me.nodeIndex = -1;
							}
						}
					}
				}, { region: 'east', xtype: 'button', text: '', iconCls: 'icon-Location', width: 21, margin: '2 5 2 5', handler: function () { var el = arguments[0].prev(); me.findNodeByFuzzy(empTree, el.getValue()); el.focus(); } }]
			}, empTree]
		},
		gridLeft = Ext.create('Ext.ng.GridPanel', {
			columnWidth: .5,
			height: 341,
			store: store,
			autoScroll: true,
			columnLines: true,
			border: false,
			selModel: { mode: "SIMPLE" },
			columns: [{
				header: '编号',
				flex: 1,
				sortable: false,
				menuDisabled: true,
				draggable: false,
				dataIndex: 'cno'
			}, {
				header: '姓名',
				flex: 1,
				sortable: false,
				menuDisabled: true,
				draggable: false,
				dataIndex: 'cname',
				renderer: function (value, parm, record) {
					return me.getEmpName(value, record.data.assigntype);
				}
			}],
			listeners: {
				'itemdblclick': function (item, record, it, index, e, eOpts) {
					me.copyData([record], resultStore);
				}
			},
			viewConfig: {
				style: {
					overflowX: 'hidden !important'
				}
			},
			bodyStyle: {
				top: '24px !important'
			}
		}),
		gridRight = Ext.create('Ext.ng.GridPanel', {
			columnWidth: .5,
			store: resultStore,
			height: 341,
			autoScroll: true,
			columnLines: true,
			border: false,
			selModel: { mode: "SIMPLE" },
			columns: [{
				header: '编号',
				flex: 1,
				sortable: false,
				menuDisabled: true,
				draggable: false,
				dataIndex: 'cno'
			}, {
				header: '姓名',
				flex: 1,
				sortable: false,
				menuDisabled: true,
				draggable: false,
				dataIndex: 'cname'
			}],
			listeners: {
				'itemdblclick': function (item, record, it, index, e, eOpts) {
					resultStore.remove([record]);
					Ext.Array.remove(me.currData.value, record.data.cno);
					Ext.Array.remove(me.currData.text, record.data.cname);
				}
			},
			viewConfig: {
				style: {
					overflowX: 'hidden !important'
				}
			},
			style: {
				"margin-right": "-1px !important"
			},
			bodyStyle: {
				top: '24px !important'
			}
		}),
		btnPanel = {
			height: 350,
			width: 80,
			layout: 'absolute',
			border: false,
			frame: true,
			style: { marginTop: "-4px" },
			items: [{
				xtype: 'button',
				name: 'addSelect',
				text: '&gt;',
				x: 6,
				y: 120,
				width: 60,
				handler: Ext.bind(function () {
					var data = gridLeft.getSelectionModel().getSelection();
					me.copyData(data, resultStore);
				})
			}, {
				xtype: 'button',
				name: 'selectAll',
				text: '&gt;&gt;',
				x: 6,
				y: 150,
				width: 60,
				handler: Ext.bind(function () {
					var data = store.data.items;
					me.copyData(data, resultStore);
				})
			}, {
				xtype: 'button',
				name: 'removeSelect',
				text: '&lt;',
				x: 6,
				y: 180,
				width: 60,
				handler: Ext.bind(function () {
					var data = gridRight.getSelectionModel().getSelection();
					me.removeData(data, resultStore);
				})
			}, {
				xtype: 'button',
				name: 'removeAll',
				text: '&lt;&lt;',
				x: 6,
				y: 210,
				width: 60,
				handler: Ext.bind(function () {
					me.removeData(null, resultStore, true);
				})
			}]
		},
		center = {
			region: 'center',
			border: true,
			layout: 'column',
			items: [gridLeft, btnPanel, gridRight],
			bbar: pageBar
		},
		top = {
			region: 'north',
			xtype: '',
			height: 27,
			border: false,
			layout: 'border',
			items: [{
				region: 'east',
				xtype: "combobox",
				store: Ext.create('Ext.ng.JsonStore', {
					autoLoad: false,
					pageSize: 50,
					fields: [
				{ name: 'ccode', mapping: 'ccode' },
				{ name: 'cname', mapping: 'cname' }
				],
					proxy: {
						type: 'ajax',
						url: C_ROOT + 'SUP/Person/GetEmpStatus',
						reader: {
							type: 'json',
							root: 'Record',
							totalProperty: 'totalRows'
						}
					},
					listeners: {
						load: function (m, records, successful, eOpts) {
							m.insert(0, [{ ccode: '', cname: '&nbsp;'}]);
						}
					}
				}),
				width: 100,
				labelWidth: 28,
				allowBlank: true,
				editable: false,
				fieldLabel: '',
				emptyText: '状态',
				valueField: 'ccode',
				displayField: 'cname',
				listeners: {
					select: function (combo, records, eOpts) {
						var code = combo.getValue() || records[0].data.emptype;
						if (Ext.isEmpty(code)) {
							combo.clearValue();
						}
						me.searchData({ "empstatus": code });
					}
				}
			}, {
				region: 'east',
				xtype: "combobox",
				store: Ext.create('Ext.ng.JsonStore', {
					autoLoad: false,
					fields: [
				{ name: 'emptype', mapping: 'emptype' },
				{ name: 'typename', mapping: 'typename' }
				],
					proxy: {
						type: 'ajax',
						url: C_ROOT + 'SUP/Person/GetEmpType',
						reader: {
							type: 'json',
							root: 'Record',
							totalProperty: 'totalRows'
						}
					},
					listeners: {
						load: function (m, records, successful, eOpts) {
							m.insert(0, [{ emptype: '', typename: '&nbsp;'}]);
						}
					}
				}),
				width: 100,
				labelWidth: 28,
				allowBlank: true,
				editable: false,
				fieldLabel: '',
				emptyText: '类型',
				valueField: 'emptype',
				displayField: 'typename',
				style: { marginLeft: '10px', marginRight: '10px' },
				listeners: {
					select: function (combo, records, eOpts) {
						var code = combo.getValue() || records[0].data.emptype;
						if (Ext.isEmpty(code)) {
							combo.clearValue();
						}
						me.searchData({ "emptype": code });
					}
				}
			}, {
				region: 'east',
				width: 160,
				fieldLabel: '',
				emptyText: '输入编号/姓名，回车查询',
				xtype: 'textfield',
				maxHeight: 22,
				style: {
					marginRight: '0px !important',
					marginTop: '1px !important'
				},
				enableKeyEvents: true,
				listeners: {
					'keydown': function (el, e, eOpts) {
						if (e.getKey() == e.ENTER) {
							var key = el.getValue();
							var param = { "searchtxt": "" };
							if (!Ext.isEmpty(key)) {
								if (/\d+/.test(key)) {
									param = { "searchtxt": "cno like '%" + key + "%'" };
								}
								else if (/\W+/.test(key)) {
									param = { "searchtxt": "cname like '%" + key + "%'" };
								}
								else {
									param = { "searchtxt": "cno like '%" + key + "%' or cname like '%" + key + "%' or bopomofo like '%" + key + "%'" };
								}
							}
							me.searchData(param);
							el.focus();
							return false;
						}
					}
				}
			}],
			style: {
				backgroundColor: 'transparent !important'
			}
		};
		me.items = [left, top, center];
		me.buttons = [{
			xtype: 'checkboxfield',
			boxLabel: '记忆树选中状态',
			handler: function (chk) {
				me.updataTreeMemory(empTree, chk.getValue());
			}
		}, {
			xtype: 'checkboxfield',
			boxLabel: '显示兼职',
			handler: function (chk) {
				me.searchData({ "partmark": chk.getValue() ? "1" : "" });
			}
		}, {
			xtype: 'checkboxfield',
			boxLabel: '显示代理',
			handler: function (chk) {
				me.searchData({ "proymark": chk.getValue() ? "1" : "" });
			}
		}, '->', {
			text: '确认',
			handler: function () {
				if (me.callback) {
					var data = me.currData, tmpdata = {};
					if (data.value.length > 0) {
						tmpdata = { cno: data.value.join(","), cname: data.text.join(",") };
					}
					else {
						if (me.allowBank) {
							tmpdata = { cno: '', cname: '' };
						}
						else {
							Ext.MsgBox.sliDown("提示", "未选择数据", me.el.dom, 200);
							return;
						}
					}
					me.close();
					me.callback(tmpdata);
				}
			}
		}, {
			text: '取消',
			margin: '0 5 8 0',
			handler: function () {
				me.close();
			}
		}];
		me.callParent();
		me.show();
		me.gridStore = store;
		me.pageBar = pageBar;
	},
	initParam: function () {
		var me = this;
		me.memory = {};
		me.gridConfig = {};
		me.currData = { value: [], text: [] };
		me.helpType = "person";
		me.width = 700;
		me.height = 473;
		me.gridConfig.height = 350;
		me.gridConfig.border = false;
		me.gridConfig.selModel = { mode: "SIMPLE" };

		Ext.Ajax.request({
			url: C_ROOT + 'SUP/Person/GetTreeMemoryInfo',
			async: false,
			params: { type: me.helpType, busstype: me.bussType },
			success: function (response, opts) {
				me.memory = Ext.JSON.decode(response.responseText);
			}
		});
	},
	findNodeByFuzzy: function (tree, value) {
		if (value == "") { return; }
		var me = this, index = -1, firstFind = me.nodeIndex == -1;
		var findNode = tree.getRootNode().findChildBy(function (node) {
			index++;
			if (!node.data.root && index > me.nodeIndex && (node.data.text.indexOf(value) > -1 || node.data.bopomofo.indexOf(value.toUpperCase()) > -1)) {
				return true;
			}
		}, null, true);
		me.nodeIndex = index;
		if (findNode) {
			tree.selectPath(findNode.getPath());
		}
		else {
			if (firstFind) {
				Ext.MsgBox.sliDown("提示", "没有匹配的树节点", me.el.dom, 200);
			}
			me.nodeIndex = -1;
		}
	},
	searchData: function (param) {
		var me = this;
		me.gridStore.currentPage = 1;
		Ext.apply(me.gridStore.proxy.extraParams, param);
		me.gridStore.load();
	},
	updataTreeMemory: function (tree, checked) {
		var me = this;
		if (me.memory.eOpts == "selectionchange") { return; }
		var sd = tree.getSelectionModel().getSelection();
		if (sd.length > 0) {
			me.memory.FoucedNodeValue = sd[0].getPath();
			me.memory.IsMemo = checked;
			Ext.Ajax.request({
				url: C_ROOT + 'SUP/Person/UpdataTreeMemory',
				async: true,
				params: { type: "empmulti", busstype: me.bussType, foucednodevalue: me.memory.FoucedNodeValue, ismemo: checked },
				success: function (response, opts) {
				}
			});
		}
	},
	getEmpName: function (name, assigntype) {
		if (assigntype == "0" || assigntype == "") { return name; }
		else { return name + "<font color='blue'>[" + (assigntype == "1" ? "兼" : "代") + "]</font>"; }
	},
	copyData: function (selectData, resultStore) {
		var me = this;
		var dataLen = selectData.length,
			index = resultStore.getCount(),
			tmpArr = me.currData.value,
			tmpData = [];
		for (var i = 0; i < dataLen; i++) {
			var sourceData = selectData[i].data;
			if (Ext.Array.indexOf(tmpArr, sourceData.cno) < 0) {
				me.currData.value.push(sourceData.cno);
				me.currData.text.push(sourceData.cname);
				if (tmpArr.length < me.defaultHeight) {
					tmpData.push(sourceData);
				}
			}
		}
		resultStore.insert(index, tmpData);
		me.pageBar.updateInfo();
	},
	removeData: function (data, resultStore, isAll) {
		var me = this;
		if (isAll) {
			resultStore.removeAll();
			me.currData.value = [];
			me.currData.text = [];
		}
		else {
			resultStore.remove(data);
			for (var i = 0; i < data.length; i++) {
				var posIndex = Ext.Array.indexOf(me.currData.value, data[i].data.cno);
				Ext.Array.erase(me.currData.value, posIndex, 1);
				Ext.Array.erase(me.currData.text, posIndex, 1);
			}
		}
		me.pageBar.updateInfo();
	}
});
// #endregion

