///<reference path="../../extjs/ext-all-debug.js">

Ext.define('Ext.ng.Toolbar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.ngToolbar', //����,��ͨ������xtype����,����ͨ��Ext.widget()��������         
	pageSize: 20,
	itemWidth: 60,
	rightName: "", //Ȩ������
	ngbuttons: [],   //��ť
	//��ѡ��ť
	candidateButtons: [{ id: "add", text: "����", width: this.itemWidth, iconCls: "icon-New" },
							   { id: "edit", text: "�޸�", width: this.itemWidth, iconCls: "icon-Edit" },
							   { id: "delete", text: "ɾ��", width: this.itemWidth, iconCls: "icon-delete" },
							   { id: "view", text: "�鿴", width: this.itemWidth, iconCls: "icon-View" },
							   { id: "save", text: "����", width: this.itemWidth, iconCls: "icon-save" },
							   { id: "query", text: "��ѯ", width: this.itemWidth, iconCls: "icon-Query" },
							   { id: "refresh", text: "ˢ��", width: this.itemWidth, iconCls: "icon-Refresh" },
							   { id: "clear", text: "���", width: this.itemWidth, iconCls: "icon-Clear" },
							   { id: "copy", text: "���ݿ���", width: this.itemWidth, iconCls: "icon-Copy" },
							   { id: "import", text: "����", width: this.itemWidth, iconCls: "icon-Import" },
							   { id: "export", text: "����", width: this.itemWidth, iconCls: "icon-Export" },
							   { id: "create", text: "����", width: this.itemWidth, iconCls: "icon-create" },
							   { id: "verify", text: "���", width: this.itemWidth, iconCls: "icon-Verify" },
							   { id: "valid", text: "����", width: this.itemWidth, iconCls: "icon-Valid" },
							   { id: "unvalid", text: "ȥ����", width: this.itemWidth, iconCls: "icon-Unvalid" },
							   { id: "addrow", text: "����", width: this.itemWidth, iconCls: "icon-AddRow" },
							   { id: "deleterow", text: "ɾ��", width: this.itemWidth, iconCls: "icon-DeleteRow" },
							   { id: "assign", text: "����", width: this.itemWidth, iconCls: "icon-Assign" },
							   { id: "config", text: "����", width: this.itemWidth, iconCls: "icon-Setup" },
							   { id: "compute", text: "����", width: this.itemWidth, iconCls: "icon-Compute" },
							   { id: "location", text: "��λ", width: this.itemWidth, iconCls: "icon-Location" },
							   { id: "subbill", text: "�¼�ҵ��", width: this.itemWidth, iconCls: "icon-Backbill" },
							   { id: "relabill", text: "��ص���", width: this.itemWidth, iconCls: "icon-Relabill" },
							   { id: "check", text: "����", width: this.itemWidth, iconCls: "icon-Check" },
							   { id: "checkview", text: "����鿴", width: this.itemWidth, iconCls: "icon-CheckView" },
							   { id: "history", text: "������ʷ", width: this.itemWidth, iconCls: "icon-History" },
							   { id: "ok", text: "ȷ��", width: this.itemWidth, iconCls: "icon-Confirm" },
							   { id: "cancel", text: "ȡ��", width: this.itemWidth, iconCls: "icon-Cancel" },
							   { id: "help", text: "����", width: this.itemWidth, iconCls: "icon-Help" },
							   { id: "print", text: "��ӡ", width: this.itemWidth, iconCls: "icon-Print" },
							   { id: "exit", text: "�˳�", width: this.itemWidth, iconCls: "icon-Exit" },
							   { id: "back", text: "����", width: this.itemWidth, iconCls: "icon-back" },
							   { id: "editrow", text: "�޸�", width: this.itemWidth, iconCls: "icon-EditRow" },
							   { id: "first", text: "��", width: this.itemWidth, iconCls: "icon-Firstrec" },
							   { id: "pre", text: "ǰ", width: this.itemWidth, iconCls: "icon-PriorRec" },
							   { id: "next", text: "��", width: this.itemWidth, iconCls: "icon-NextRec" },
							   { id: "last", text: "β", width: this.itemWidth, iconCls: "icon-LastRec" },
							   { id: "deal", text: "����", width: this.itemWidth, iconCls: "icon-Operate" },
							   { id: "note", text: "���±�", width: this.itemWidth, iconCls: "icon-Note" },
							   { id: "orgselect", text: "��֯ѡ��", width: this.itemWidth, iconCls: "icon-Boo" },
							   { id: "addbrother", text: "ͬ������", width: this.itemWidth, iconCls: "icon-AddBrother" },
							   { id: "addchild", text: "�¼�����", width: this.itemWidth, iconCls: "icon-AddChild" },
							   { id: "attachment", text: "����", width: this.itemWidth, iconCls: "icon-Attachment" },
							   { id: "hide", text: "����", width: this.itemWidth, iconCls: "icon-Close" },
							   { id: "close", text: "�ر�", width: this.itemWidth, iconCls: "icon-Close" }
							   ],
	initComponent: function () {
		this.border = false;
		this.height = 26;
		this.minSize = 26;
		this.maxSize = 26;
		//Ext.Toolbar.superclass.initComponent.call(this);
		this.callParent();

		this.on("beforerender", this.beforeRender); //����Ȩ��
		this.createButton(); //������ť    

		var clostbtn = this.get('close');
		if (clostbtn) {
			this.get('close').addEvents('beforeclose'); //��ӹر�ǰ�¼�
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

				if (button.groupitem) {//����������
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
							else {//object,�Զ���İ�ť
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
							tempbutton = this.findButton(subbotton); //ngbotton��id
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
						tmpBtn = this.add(button); //��׼��ť�б�û�ҵ�
						if (hideBtns[tmpBtn.id] === 1) { tmpBtn.hide(); chkflg = false; }
						menus.push({ text: button.text, checked: chkflg, targetBtnID: tmpBtn.id, checkHandler: this.onItemClick });
					}
				}
			}
			else {
				stdbutton = this.findButton(button); //�ַ���

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

		if (!toolbar) return; //����¼��ᱻ��������

		if (me.rightName) {
			//��ťȨ�޿���
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
							btn = Ext.getCmp(arr[i]); //��������İ�ť
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
			//            alert("��ǰֵ��ԭʼֵ��ͬ");
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
	alias: 'widget.ngFormPanel', //����,��ͨ������xtype����,����ͨ��Ext.widget()��������         
	initComponent: function () {
		this.callParent();
		var me = this;
		var otype = me.otype;

		if (!me.border) {
			me.style = { borderColor: 'transparent', backgroundColor: 'transparent' };
		}

		//form��Ϊֻ��
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
				//alert('��' + field.fieldLabel + '�����벻�Ϸ�:' + field.activeErrors);

				//NG2.Msg.Error('[' + field.fieldLabel + ']���벻�Ϸ�:' + field.activeErrors);

				Ext.create('Ext.ng.MessageBox').Error('[' + field.fieldLabel + ']���벻�Ϸ�:' + field.activeErrors);

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
    queryAutoLoad: true, //�Զ�load
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
    buttons: [{ xtype: "checkbox", boxLabel: '��������', name: 'QueryPanel_checkbox_rembname', inputValue: '1', id: 'QueryPanel_checkbox_rember', margin: '0 0 0 6' }, "->",
			  { text: "�� ѯ", iconCls: 'icon-Query' }, { text: "�� ��", iconCls: 'icon-Clear' },
			  { xtype: 'label', text: '', margin: '0 0 0 20'}],
    initComponent: function () {
        var me = this;
        var store = new Object();
        if (!me.pageid) {
            me.pageid = window.location.pathname.replace(/[\/\.]/g, '');
        }
        //#region button ����
        me.buttons[3].handler = function () {
            var formdata = me.getForm();
            var items = formdata.getFields().items;
            Ext.Array.each(items, function (f) {
                if (f.id == "QueryPanel_checkbox_rember") { //��������ѡ���
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
                text: me.hidePanel ? '��ʾ' : '����',
                handler: function () {
                    if (this.iconCls == 'icon-unfold') {
                        me.show();
                        this.setIconCls('icon-fold');
                        this.setText("����");
                        if (!me.isBindCombox) {
                            me.isBindCombox = true;
                            BatchBindCombox(me.getForm().getFields().items);
                        }
                    }
                    else {
                        me.hide();
                        this.setIconCls('icon-unfold');
                        this.setText("��ʾ");
                    }
                }
            });
            if (me.hidePanel) { me.hide(); }
        }
        //#endregion

        //#region ���ɲ�ѯ��
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
            //Ԥ������
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
                    continue; //������,�кţ����߷ǲ�ѯ������
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
                //���ֻ���������
                if (flag) {

                    var lowColumn = new Object(); //Ext.clone(column);
                    for (var p in column) {

                        if (p === 'text') {
                            lowColumn.text = column.text + '(����)';
                        }
                        else if (p === 'dataIndex') {
                            if (column.queryCtl.xtype === 'datefield') {
                                lowColumn.dataIndex = column.dataIndex + '*date*ngLow'; //�޸������ֶ�����,�����ֶ�:date
                            }
                            else if (column.queryCtl.xtype === 'numberfield') {
                                lowColumn.dataIndex = column.dataIndex + '*num*ngLow'; //�޸������ֶ����ƣ������ֶ�:num
                            }
                            else {
                                lowColumn.dataIndex = column.dataIndex + '*char*ngLow'; //�޸������ֶ����ƣ��ַ��ֶ�:num
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
                            upColumn.text = column.text + '(����)';
                        }
                        else if (p === 'dataIndex') {
                            if (column.queryCtl.xtype === 'datefield') {
                                upColumn.dataIndex = column.dataIndex + '*date*ngUP'; //�޸������ֶ�����
                            }
                            else if (column.queryCtl.xtype === 'numberfield') {
                                upColumn.dataIndex = column.dataIndex + '*num*ngUP'; //�޸������ֶ�����
                            }
                            else {
                                upColumn.dataIndex = column.dataIndex + '*char*ngUP'; //�޸������ֶ�����
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

        var cols; //��һ�����зֿ�
        var columnWith;

        //Ĭ�ϵ�
        if (!me.columnsPerRow) {
            cols = 4; //��һ�����зֿ�
            columnWith = .25;
            if (columns.length < 6) {
                cols = 2; //С��6�о�����
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

        var rows = Math.ceil(totalColumns / cols); //��������

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
                    break; //����
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
                    field = Ext.clone(column.queryCtl); //���
                }
                else {
                    field.xtype = 'textfield'; //Ĭ�ϵĿؼ����ı���
                }

                var theName = column.dataIndex;
                if (column.queryCtl && column.queryCtl.name) {
                    theName = column.queryCtl.name;
                }

                var obj = { fieldLabel: column.header || column.text, name: theName };
                Ext.apply(field, obj); //��������,�ֶ�ֵ      

                inItems.items = [field];
                inarr.push(inItems);
            }
            outobj.items = inarr;
            outarr.push(outobj);
        }
        me.items = outarr;
        //#endregion

        this.callParent();

        //#region ���ݼ������ѯ����ֵ
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
                        if (f.id == "QueryPanel_checkbox_rember") { //��������ѡ���
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
        delete data.QueryPanel_checkbox_rembname; ;   //���˵���������
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
    alias: 'widget.ngTableLayoutForm', //����,��ͨ������xtype����,����ͨ��Ext.widget()�������� 
    region: 'north',
    autoHeight: true,
    frame: true,
    border: false,
    bodyStyle: 'padding:5px',
    //layout: 'form',//Ĭ����auto    
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

        var items = fields; //me.fields; //me.items; //���пؼ�
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

        var cols; //Ĭ�ϰ�һ�����зֿ�
        var columnWith;
        if (!columnsPerRow) {

            cols = 3; //Ĭ�ϰ�һ�����зֿ�
            columnWith = .3;
            if (items) {
                if (items.length < 6) {
                    cols = 2; //С��6�о�����
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

        var rows = Math.ceil(totalColumns / cols); //��������

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
                    break; //����
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
	alias: 'widget.ngFieldSetForm', //����,��ͨ������xtype����,����ͨ��Ext.widget()�������� 
	region: 'north',
	frame: true,
	border: false,
	layout: 'auto', //֧������Ӧ  
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

		var items = fields; //me.fields; //me.items; //���пؼ�
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

		var cols; //Ĭ�ϰ�һ�����зֿ�
		var columnWith;
		if (!columnsPerRow) {

			cols = 3; //Ĭ�ϰ�һ�����зֿ�
			columnWith = .3;
			if (items) {
				if (items.length < 6) {
					cols = 2; //С��6�о�����
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

		var rows = Math.ceil(totalColumns / cols); //��������
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
					break; //����
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
	alias: 'widget.ngPagingBar', //����,��ͨ������xtype���� 
	border: false,
	displayInfo: true,
	displayMsg: '�� {0} - {1}�� �� {2} ������',
	emptyMsg: "û������",
	beforePageText: "��",
	afterPageText: "/{0} ҳ",
	firstText: "��ҳ",
	prevText: "��һҳ",
	nextText: "��һҳ",
	lastText: "βҳ",
	refreshText: "ˢ��",
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
    alias: 'widget.ngGridPanel', //����,��ͨ������xtype����
    //autoScroll: true, 

    viewConfig: {
        enableTextSelection: true
    },
    initComponent: function () {

        var me = this;
        var otype = me.otype;

        var bbar = me.bbar; //callParent������bbar������Ϊ��
        this.callParent(arguments);

        if (me.table) {
            var fields = me.store.model.getFields();

            var columninfo;
            Ext.Ajax.request({
                url: C_ROOT + 'SUP/IndividualProperty/GetColomnInfo?tname=' + me.table,
                async: false, //ͬ������
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText);
                    if (resp.status === "ok") {
                        columninfo = resp.data; //��ʾֵ                    
                    } else {
                        Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
                        columninfo = 'error';
                    }
                }
            });

            for (var i = 0; i < columninfo.length; i++) {
                var modelobj = {};
                modelobj['name'] = columninfo[i]['fieldname'];
                modelobj['type'] = 'string';
                modelobj['mapping'] = columninfo[i]['fieldname'];

                fields.push(modelobj); //����model

                var tempcolumn = Ext.create('Ext.grid.column.Column', {
                    text: columninfo[i]['fieldchn'],
                    dataIndex: columninfo[i]['fieldname']
                });

                //            tempcolumn['header'] = columninfo[i]['fieldchn'];
                //            tempcolumn['flex'] = 1;
                //            tempcolumn['dataIndex'] = columninfo[i]['fieldname'];

                me.initialConfig.columns.push(tempcolumn); //����column
            }

            me.store.model.setFields(fields); //
            me.reconfigure(me.store, me.initialConfig.columns);
        }

        //�б�����뷽ʽ����
        for (var i = 0; i < me.columns.length; i++) {
            var column = me.columns[i];
            if (!column.hidden) {
                if (column.titleAlign) {
                    column.style = "text-align:" + column.titleAlign;
                }
                else {
                    column.style = "text-align:center"; //Ĭ����ͷ����
                }

                //�����п���
                if (column.mustInput) {
                    column.style += ";color:OrangeRed";
                }
            }
        }

        //��������UI״̬
        if (me.workFlowUIState) {
            var info = me.workFlowUIState;
            for (field in info) {
                for (var k = 0; k < me.columns.length; k++) {
                    if (field === me.columns[k].dataIndex) {
                        //������
                        if (info[field] == '2') {
                            if (!me.columns[k].editor) {
                                me.columns[k].editor = { xtype: 'textfield' };
                            }

                            me.columns[k].editor.allowBlank = false;
                            me.columns[k].style += ";color:OrangeRed";
                        }
                        //����
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

        //�鿴״̬����Ϊֻ��
        if (otype === 'view') {
            //grid��Ϊֻ��
            me.on('beforeedit', function () {
                return false;
            })
        }


        //������ҳ����ҳ��
        if (bbar) {
            me.store.on('load', function (store, records) {
                //debugger;
                //����ҳ��
                var item = bbar.items.get('inputItem');
                var pageindex = item.getValue(); //ҳ��

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
            //���Ӳ��ֲ˵�
            if (me.stateful && me.stateId != undefined) {
                var menu = me.headerCt.getMenu();

                menu.add([{
                    text: 'Ĭ�ϲ���',
                    iconCls: 'icon-Clear',
                    handler: function () {
                        Ext.state.Manager.clear(me.stateId);
                        window.location.reload();
                    }
                }]);
            }
        });

        me.on('columnmove', function () {
            //            //���Ӳ˵�
            //            if (me.stateful && me.stateId != undefined) {
            //                var menu = me.headerCt.getMenu();
            //                
            //                menu.add([{
            //                    text: 'Ĭ�ϲ���',
            //                    iconCls: 'icon-Clear',
            //                    handler: function () {
            //                        Ext.state.Manager.clear(me.stateId);
            //                        window.location.reload();
            //                    }
            //                }]);
            //            }
        });

        //�б�����˫���鿴����
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

        var serialflag = serial || true; //Ĭ��ֵ��true�����л�
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

        var serialflag = serial || true; //Ĭ��ֵ��true,���л�
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
        var newRecords = me.store.getNewRecords(); //���������  
        var modifyRecords = me.store.getUpdatedRecords(); // ��ȡ�޸ĵ��е����ݣ��޷���ȡ��Ӱ���� 
        var removeRecords = me.store.getRemovedRecords(); //��ȡ�Ƴ�����

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

		me.addEvents('prepareparam'); //׼������
		me.addEvents('detailitemclick'); //��ϸ�б���

		me.getView().on('expandbody', function (node, record, eNode) {
			var element = Ext.get(eNode).down('.ux-row-expander-box');
			//IE��offsetWidth
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

			//��ֹ�¼�ð�ݣ��̵��¼�
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
			
			var isNeptune = document.getElementById("themestyle").href.indexOf('neptune') > 0 ? true : false; //����������
			for (var i = 0; i < me.items.length; i++) {


				var oldtitle = me.tabBar.items.items[i].text; //me.items.items[i].title;
				var newtitle = oldtitle.split('').join('<br>'); //Ĭ����IE�ı���
				if (!Ext.isIE || Ext.isIE10) {

					var width = oldtitle.length * 14;
					var left = oldtitle.length * 6;
					//firefox
					if (!Ext.isChrome) {
						width = oldtitle.length * 18; //��ȱ�߶�
						left = oldtitle.length * 7.5; //����俿��
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
					//���ƿ�ȣ�ȥ����ת��ȥ������,Բ�Ǵ���            
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
					//�����һ��tab
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
	alias: 'widget.ngJsonStore', //����,��ͨ������xtype����
	cachePageData: false, //�����ҳ����
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

		me.dataContainer = Ext.create('Ext.util.MixedCollection'); //���ݻ���

		me.on('beforeload', function (store, operation, eOpts) {

			Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //�޸�pageIndexΪ��0��ʼ
			if (this.queryObj) {
				Ext.apply(store.proxy.extraParams, this.queryObj); //��ѯ���ڵ�����   
			}

			//            if (this.outQueryObj) {
			//                Ext.apply(store.proxy.extraParams, this.outQueryObj); //�ⲿ�������� 
			//            }

			if (store.cachePageData) {
				if (store.dataContainer.containsKey(store.currentPage)) {

					var records = store.dataContainer.get(store.currentPage);
					store.loadData(records);

					//store.loadRawData(store.dataContainer.get(store.currentPage));//���޸���ҳ��,��ҳ������ֻ��1ҳ

					//var result = store.proxy.reader.read(store.dataContainer.get(store.currentPage));
					//var records = result.records;
					//store.loadRecords(records, { addRecords: false });

					store.fireEvent('load', me, records, true); //����load�¼������·�ҳ����ҳ��

					return false; //��ֹajax����ȥ����˶�ȡ����
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
	title: '����',
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
	btnWebOk: '2', //����ʾȷ����ť�������ύ��ʱ��ű��渽��
	autoSave: '1',
	status: 'edit',
	busTName: '',
	busID: '',
	initComponent: function () {
		var me = this;

		if (me.busTName.length == 0) {
			alert("������ҵ���������busTName��");
			me.callParent(arguments);
			return;
		}
		//        if (me.busID.length == 0) {
		//            alert("������ҵ����������busID��");
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
					Ext.MessageBox.alert('����ʧ��:' + resp.msg);
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
					Ext.MessageBox.alert('����ʧ��:' + resp.msg);
				}
			}
		});
	}
});

Ext.define('Ext.ng.MessageBox', {

	/*******************************
	����Ի���,��ʾ��,��ģ̬,һ��ʱ����Զ���ʧ
	msg:�Ի�����Ϣ��
	hold:�Ի�����ʾ����ʱ��
	********************************/
	Error: function (msg, hold) {
		this.Show('Error', msg, hold, 'alert-error');
	},

	/*******************************
	��Ϣ�Ի���,��ʾ��,��ģ̬,һ��ʱ����Զ���ʧ
	msg:�Ի�����Ϣ��
	hold:�Ի�����ʾ����ʱ��
	********************************/
	Info: function (msg, hold) {
		this.Show('Info', msg, hold, 'alert-information');
	},

	/*******************************
	����Ի���,��ʾ��,��ģ̬,һ��ʱ����Զ���ʧ
	msg:�Ի�����Ϣ��
	hold:�Ի�����ʾ����ʱ��
	********************************/
	Warning: function (msg, hold) {
		this.Show('Warning', msg, hold, 'alert-warn');
	},

	/*******************************
	�ɹ��Ի���,��ʾ��,��ģ̬,һ��ʱ����Զ���ʧ
	msg:�Ի�����Ϣ��
	hold:�Ի�����ʾ����ʱ��
	********************************/
	Success: function (msg, hold) {
		this.Show('Sccess', msg, hold, 'alert-success');
	},

	/*******************************
	ȷ�϶Ի���,��ʾ��,ģ̬,�����Զ���ʧ
	����ֵ yes/no
	msg:�Ի�����Ϣ��
	********************************/
	Confirm: function (msg) {
		Ext.MessageBox.confirm('Confirm', msg);
	},

	/*******************************
	������ĶԻ���,��ʾ��,ģ̬,�����Զ���ʧ
	����ֵ �����value
	title:������
	msg:��ʾ����Ϣ
	********************************/
	Prompt: function (title, msg) {
		Ext.MessageBox.prompt(title, msg, true, 'alert-information');
	},

	/*******************************
	����������ĶԻ���,��ʾ��,ģ̬,�����Զ���ʧ
	����ֵ �����value
	title:������
	msg:��ʾ����Ϣ
	width:��Ϣ����
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
	����ť�ĶԻ���,��ʾ��,ģ̬,�����Զ���ʧ
	����ֵ ����İ�ť��Ӧ��ֵ
	title:������
	msg:��ʾ����Ϣ
	buttons:Ҫ��ʾ�İ�ť,��Ext.MessageBox.YESNOCANCEL,
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
	�������Ի���,��ʾ��,ģ̬,������ɺ��Զ���ʧ
	����ֵ 
	title:������
	msg:��ʾ����Ϣ
	progressText:��������Ҫ��ʾ����Ϣ
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
	�ȴ��Ի���,��ʾ��,ģ̬,�����Զ���ʧ
	����ֵ ����İ�ť��Ӧ��ֵ
	msg:��ʾ����Ϣ
	progressText:��������Ҫ��ʾ����Ϣ
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
	��ʾ�Ի���,��ʾ��,��ģ̬,һ��ʱ����Զ���ʧ
	title:�Ի������
	msg:�Ի�����Ϣ��
	hold:�Ի�����ʾ����ʱ��
	icon:Ҫ��ʾ��ͼƬ
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

//#region ���ּ���
Ext.define('Ext.state.HttpProvider',
	{
		extend: 'Ext.state.Provider',

		//���캯��
		constructor: function (config) {
			config = config || {};
			var me = this;
			Ext.apply(me, config);

			this.superclass.constructor.call(this);
			this.state = this.readValues();
		},

		//�����ַ
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

		// �������
		clear: function (name) {
			this.clearValue(name);
			this.superclass.clear.call(this, name);
		},

		// ��ȡָ���û���ȫ����������
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

		// ��������
		setValue: function (name, value) {
			var me = this;
			Ext.Ajax.request({
				url: C_ROOT + 'SUP/LayoutLog/SaveLayout', //this.url + '/SaveLayout',
				params: { bustype: name, layoutValue: me.encodeValue(value) },
				success: function (res, opts) {
				}
			});
		},

		// �������
		clearValue: function (name) {
			Ext.Ajax.request({
				url: C_ROOT + 'SUP/LayoutLog/ClearLayout', //this.url + '/ClearLayout',
				params: { bustype: name },
				success: function (res, opts) {
				}
			});
		}
	});

//��ʱ������
//Ext.state.Manager.setProvider(new Ext.state.HttpProvider({ url:  '../Sup' }));
//#endregion

// #region Ext.ng.form.field

//����
	Ext.define('Ext.ng.form.field.Base', {
		extend: 'Ext.form.field.Base',
		textChange: false,
		initComponent: function () {
			var me = this;
			me.callParent();

			if (me.mustInput)//������
			{
				//me.labelStyle = 'color:RoyalBlue';
				me.labelStyle = 'color:OrangeRed'; //'color:RoyalBlue';
				me.allowBlank = false;
			}

			me.on('afterrender', function (panel, eOpts) {

				//checkbox���ܱ�ɫ,����ֻ��ʱ����������
			    if ('ngCheckbox' === me.xtype) return;
			    if ('ngRadio' === me.xtype) return;

				var input = me.el.down('input') || me.el.down('textarea');
				if (me.readOnly) {
					//me.setReadOnly(true);

					input.setStyle({ backgroundImage: 'none', backgroundColor: '#eaeaea' });
					me.preventMark = true;

					//����ؼ����
					var errmsg = me.el.down('div.x-form-error-msg')
					if (errmsg) {
						errmsg.up('td').setStyle({ display: 'none' });
					}
				}

			});

			me.addEvents('itemchanged'); //ģ��pb��itemchanged�¼�
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
			//����ؼ����
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
	    minChars: 1, //�����������ٶ��ٸ��ַ���ʱ���ȡ����
	    helpType: 'simple', //Ĭ����simple,�Զ�����棺rich
	    helpWidth: 600, //�������
	    helpHeight: 400, //�����߶�
	    showAutoHeader: false,
	    //outFilter: {}, //�ⲿ��ѯ����,��ȷ����
	    //likeFilter: {}, //�ⲿģ����ѯ������like����
	    selectMode: 'Single', //multiple  
	    needBlankLine: false,
	    //forceSelection: true,
	    autoSelect: false, //��Ҫ�Զ�ѡ���һ��
	    enableKeyEvents: true, //����key�¼�
	    selectOnFoucus: true,
	    typeAhead: true, //��ʱ��ѯ
	    typeAheadDelay: 500, //�ӳ�500���룬Ĭ����250
	    //valueNotFoundText: 'Select a Country!!...',
	    queryMode: 'remote',
	    triggerAction: 'all', //'query'
	    //triggerCls: 'icon-create',       
	    //    listConfig: {
	    //        //tpl: '<div><table width="100%" ><tr><th class="x-column-header-inner x-column-header-over" >����</th><th class="x-column-header-inner x-column-header-over">����</th></tr><tpl for="."><tr class="x-boundlist-item"><td>{provinceno}</td><td>{prvcname}<td></tr></tpl></table></div>',
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
	        this.mixins.base.initComponent.call(me); //��callParent�������ɵ���

	        //me.tpl = '<div><table width="100%" ><tr><th class="x-column-header-inner x-column-header-over" >����</th><th class="x-column-header-inner x-column-header-over">����</th></tr><tpl for="."><tr class="x-boundlist-item"><td>{' + this.valueField + '}</td><td>{' + this.displayField + '}<td></tr></tpl></table></div>';
	        if (Ext.isEmpty(me.helpid) || Ext.isEmpty(me.displayField) || Ext.isEmpty(me.valueField)) return;

	        if (me.listFields && me.listHeadTexts) {

	            var listheaders = '';
	            var listfields = '';

	            var heads = me.listHeadTexts.split(','); //��ͷ 
	            var fields = me.listFields.split(','); //�����ֶ�              

	            var modelFields = new Array();
	            for (var i = 0; i < fields.length; i++) {

	                var tempfield = fields[i].split('.');
	                var temp;
	                if (tempfield.length > 1) {
	                    temp = tempfield[1]; //ȥ������
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
	                    temp = tempfield[1]; //ȥ������
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

	            //ֻ��������д�¼����ܴ�����
	            store.on('beforeload', function (store) {

	                Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //�޸�pageIndexΪ��0��ʼ
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

	                    //ȥ������
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
	                    emptydata[myDisplayField] = '&nbsp;'; //��html���          

	                    var rs = [emptydata];
	                    store.insert(0, rs);
	                });
	            }

	        }
	        else {
	            me.initialListTemplate(); //��ʼ�������б���ʽ 
	        }

	        me.addEvents('helpselected'); //����ֵ��ѡ����¼�
	        me.addEvents('firstrowloaded');

	        me.on('select', function (combo, records, eOpts) {

	            var theField;

	            //����
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

	            //ȥ������
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
	            if (me.isInGrid) {//Ƕ��grid��
	                obj[me.valueField] = name; //��ƭ,grid�Ǳ���ʾ������
	            } else {
	                obj[me.valueField] = code;
	            }
	            if (me.displayFormat) {
	                obj[me.displayField] = Ext.String.format(me.displayFormat, code, name);
	            } else {
	                obj[me.displayField] = (name ===  '&nbsp;')? '' : name;
	            }

	            var valuepair = Ext.ModelManager.create(obj, 'themodel');
	            me.setValue(valuepair); //������ô���ò��ܳɹ�

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

	            //ˢ�°�ťȥ��
	            var autoPagingbar = me.getPicker().pagingToolbar;
	            autoPagingbar.items.items[10].hide();
	            autoPagingbar.items.items[9].hide();

	        });

	        me.on('keydown', function (combo, e, eOpts) {


	            if (me.isExpanded) {

	                //�س�
	                if (e.keyCode == Ext.EventObject.ENTER) {
	                    if (me.picker.el.query('.' + me.picker.overItemCls).length > 0) return false;
	                    me.onTriggerClick();
	                }

	                //��ҳ
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

            //�Ϸ���֤
//	        me.on('blur', function () {
//	            var value = me.getValue();
//	            Ext.Ajax.request({
//	                url: C_ROOT + 'SUP/CommonHelp/ValidateData?helpid=' + me.helpid + '&inputValue=' + value,
//	                async: false, //ͬ������
//	                success: function (response) {
//	                    var resp = Ext.JSON.decode(response.responseText);
//	                    if (resp.Status === "success") {
//	                        if (resp.Data == false) {
//	                            me.setValue('');
//	                        }
//	                    } else {
//	                        Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
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

	            if (me.helpType === 'rich') {//�û��Զ�������ģ�� 

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

	                var fields = allfield.split(','); //�����ֶ�
	                var heads = headText.split(','); //��ͷ 

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
	                        temp = tempfield[1]; //ȥ������
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
	                    temp = tempfield[1]; //ȥ������
	                }
	                else {
	                    temp = fields[i];
	                }

	                listfields += '<td>{' + temp + '}</td>';
	            }

	            var store = Ext.create('Ext.data.Store', {
	                pageSize: 10, //�������ҳ��С                
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
	            //me.bindStore(store); //��̬��store
	            me.store = store;

	            //ֻ��������д�¼����ܴ�����
	            store.on('beforeload', function (store) {

	                Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //�޸�pageIndexΪ��0��ʼ
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

	                    //ȥ������
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
	                    emptydata[myDisplayField] = '&nbsp;'; //��html���          

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
	                        template = resp.template; //����ģ��
	                    }
	                    else {
	                        //title = resp.data.Title;
	                        allfield = resp.data.AllField;
	                        headText = resp.data.HeadText;
	                    }

	                } else {
	                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
	                }
	            }
	        });



	    },
	    onTriggerClick: function () {
	        var me = this;
	        if (me.readOnly || arguments.length == 3) return; //arguments.length == 3��������ϵ��           

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

	            if (me.helpType === 'rich') {//�û��Զ�������ģ��            
	                queryItems = template.Template.QueryItems;
	                modelFields = template.Template.Model.fields;
	                gridColumns = template.Template.GridColumns;
	            }
	            else {

	                if (!allfield) return;

	                var fields = allfield.split(','); //�����ֶ�
	                var heads = headText.split(','); //��ͷ


	                queryItems = new Array();
	                for (var i = 0; i < heads.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp = fields[i]; ;
	                    //                    if (tempfield.length > 1) {
	                    //                        temp = tempfield[1]; //ȥ������
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
	                        temp = tempfield[1]; //ȥ������
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    modelFields.push({
	                        name: fields[i], //��ȥ������
	                        type: 'string',
	                        mapping: temp
	                    });
	                }

	                gridColumns = new Array();
	                //                for (var i = 0; i < fields.length; i++) {

	                //                    var tempfield = fields[i].split('.');
	                //                    var temp;
	                //                    if (tempfield.length > 1) {
	                //                        temp = tempfield[1]; //ȥ������
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
	                        temp = tempfield[1]; //ȥ������
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
								    text: "��ѯ",
								    iconCls: 'add'
								},
								{
								    id: 'help_show',
								    text: '��ʾ',
								    iconCls: 'icon-unfold',
								    handler: function () {
								        if (this.iconCls == 'icon-unfold') {
								            this.setIconCls('icon-fold');
								            this.setText("����");
								            querypanel.show();
								        } else {
								            this.setIconCls('icon-unfold');
								            this.setText("��ʾ");
								            querypanel.hide();
								        }
								    }
								},
								 "->",
							   {
							       id: "help_close",
							       text: "�ر�",
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

	            //store.load();//����load��IE�Ľ����Ť��

	            var pagingbar = Ext.create('Ext.ng.PagingBar', {
	                store: store
	            });

	            var selModel = Ext.create('Ext.selection.CheckboxModel');

	            var grid;
	            //��ѡ
	            if (me.selectMode === 'multiple') {

	                grid = Ext.create('Ext.ng.GridPanel', {
	                    region: 'center',
	                    frame: true,
	                    border: false,
	                    store: store,
	                    selModel: selModel, //��ѡ
	                    columnLines: true,
	                    columns: gridColumns,
	                    bbar: pagingbar
	                });
	            }
	            else {//��ѡ
	                grid = Ext.create('Ext.ng.GridPanel', {
	                    region: 'center',
	                    frame: true,
	                    border: false,
	                    store: store,
	                    //autoScroll:true,
	                    columnLines: true,
	                    //                    layout: {
	                    //                        type: 'hbox', //�������ֺ�����������ѿ�
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

	                    me.setValue(valuepair); //������ô���ò��ܳɹ�

	                    win.hide();
	                    win.destroy();

	                    //if (me.isInGrid) {

	                    var pobj = new Object();
	                    pobj.code = code;
	                    pobj.name = name;
	                    pobj.type = 'fromhelp';
	                    pobj.data = data[0].data;

	                    //��ֵ����
	                    for (var p in pobj.data) {
	                        if (pobj.data[p] && pobj.data[p] === '&nbsp;') {
	                            pobj.data[p] = '';
	                        }
	                    }

	                    me.fireEvent('helpselected', pobj);
	                    //}

	                }
	            }, this)

	            //��ʾ��������
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

	            //store.load();//�ֹ������ᴥ��beforeload�¼�


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
                       
	                    //ȥ������
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
	                    emptydata[myDisplayField] = '&nbsp;'; //��html���          

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
	                        template = resp.template; //����ģ��
	                    }
	                    else {
	                        title = resp.data.Title;
	                        allfield = resp.data.AllField;
	                        headText = resp.data.HeadText;
	                    }

	                } else {
	                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
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
	        //                            obj[me.displayField] = resp.name; //��ʾֵ
	        //                        }

	        //                        var provincepair = Ext.ModelManager.create(obj, 'model');
	        //                        me.setValue(provincepair);
	        //                    }

	        //                } else {
	        //                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
	        //                }
	        //            }
	        //        });

	    }, //bindData
	    getCodeName: function (value) {
	        var me = this;
	        var name;

	        Ext.Ajax.request({
	            url: C_ROOT + 'SUP/CommonHelp/GetName?helptype=Single&helpid=' + me.helpid + '&code=' + value,
	            async: false, //ͬ������
	            success: function (response) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.status === "ok") {
	                    name = resp.name; //��ʾֵ                    
	                } else {
	                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
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
	                temp = tempfield[1]; //ȥ������
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
	    minChars: 100, //�����������ٶ��ٸ��ַ���ʱ������������ȡ����,��100����ֹ��������
	    helpType: 'simple', //Ĭ����simple,�Զ�����棺rich
	    helpWidth: 600, //�������
	    helpHeight: 400, //�����߶�
	    showAutoHeader: false,
	    //outFilter: {}, //�ⲿ��ѯ����,��ȷ����
	    //likeFilter: {}, //�ⲿģ����ѯ������like����
	    selectMode: 'Multi', //multiple  
	    needBlankLine: false,
	    //forceSelection: true,
	    autoSelect: false, //��Ҫ�Զ�ѡ���һ��
	    enableKeyEvents: true, //����key�¼�
	    selectOnFoucus: true,
	    typeAhead: false, //��ʱ��ѯ
	    typeAheadDelay: 500, //�ӳ�500���룬Ĭ����250
	    //valueNotFoundText: 'Select a Country!!...',
	    queryMode: 'remote',
	    triggerAction: 'all', //'query'
	    //triggerCls: 'icon-ComHelp',        
	    initComponent: function () {
	        //
	        var me = this;
	        this.callParent();
	        this.mixins.base.initComponent.call(me); //��callParent�������ɵ���

	        //me.tpl = '<div><table width="100%" ><tr><th class="x-column-header-inner x-column-header-over" >����</th><th class="x-column-header-inner x-column-header-over">����</th></tr><tpl for="."><tr class="x-boundlist-item"><td>{' + this.valueField + '}</td><td>{' + this.displayField + '}<td></tr></tpl></table></div>';
	        if (Ext.isEmpty(me.helpid) || Ext.isEmpty(me.displayField) || Ext.isEmpty(me.valueField)) return;

	        if (me.listFields && me.listHeadTexts) {

	            var listheaders = '';
	            var listfields = '';

	            var heads = me.listHeadTexts.split(','); //��ͷ 
	            var fields = me.listFields.split(','); //�����ֶ�              

	            var modelFields = new Array();
	            for (var i = 0; i < fields.length; i++) {

	                var tempfield = fields[i].split('.');
	                var temp;
	                if (tempfield.length > 1) {
	                    temp = tempfield[1]; //ȥ������
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
	                    temp = tempfield[1]; //ȥ������
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

	            //ֻ��������д�¼����ܴ�����
	            store.on('beforeload', function (store) {

	                Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //�޸�pageIndexΪ��0��ʼ
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

	                    //ȥ������
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
	                    emptydata[myDisplayField] = '&nbsp;'; //��html���          

	                    var rs = [emptydata];
	                    store.insert(0, rs);
	                });
	            }

	        }
	        else {
	            me.initialListTemplate(); //��ʼ�������б���ʽ 
	        }

	        me.addEvents('helpselected'); //����ֵ��ѡ����¼�
	        me.addEvents('firstrowloaded');

	        me.on('select', function (combo, records, eOpts) {

	            var theField;

	            //����
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

	            //ȥ������
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
	            if (me.isInGrid) {//Ƕ��grid��
	                obj[me.valueField] = name; //��ƭ,grid�Ǳ���ʾ������
	            } else {
	                obj[me.valueField] = code;
	            }
	            if (me.displayFormat) {
	                obj[me.displayField] = Ext.String.format(me.displayFormat, code, name);
	            } else {
	                obj[me.displayField] = name;
	            }

	            var valuepair = Ext.ModelManager.create(obj, 'themodel');
	            me.setValue(valuepair); //������ô���ò��ܳɹ�

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

	            //ˢ�°�ťȥ��
	            var autoPagingbar = me.getPicker().pagingToolbar;
	            autoPagingbar.remove(autoPagingbar.items.items[10]);
	            autoPagingbar.remove(autoPagingbar.items.items[9]);

	        });

	        me.on('keydown', function (combo, e, eOpts) {


	            if (me.isExpanded) {

	                //�س�
	                if (e.keyCode == Ext.EventObject.ENTER) {
	                    if (me.picker.el.query('.' + me.picker.overItemCls).length > 0) return false;
	                    me.onTriggerClick();
	                }

	                //��ҳ
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
	            me.el.down('input').dom.readOnly = true; //���������
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

	            if (me.helpType === 'rich') {//�û��Զ�������ģ�� 

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

	                var fields = allfield.split(','); //�����ֶ�
	                var heads = headText.split(','); //��ͷ 

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
	                        temp = tempfield[1]; //ȥ������
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
	                    temp = tempfield[1]; //ȥ������
	                }
	                else {
	                    temp = fields[i];
	                }

	                listfields += '<td>{' + temp + '}</td>';
	            }

	            var store = Ext.create('Ext.data.Store', {
	                pageSize: 10, //�������ҳ��С                
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
	            //me.bindStore(store); //��̬��store
	            me.store = store;

	            //ֻ��������д�¼����ܴ�����
	            store.on('beforeload', function (store) {
	                //debugger;
	                Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //�޸�pageIndexΪ��0��ʼ
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

	                    //ȥ������
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
	                    emptydata[myDisplayField] = '&nbsp;'; //��html���          

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
	                        template = resp.template; //����ģ��
	                    }
	                    else {
	                        //title = resp.data.Title;
	                        allfield = resp.data.AllField;
	                        headText = resp.data.HeadText;
	                    }

	                } else {
	                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
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

	            if (me.helpType === 'rich') {//�û��Զ�������ģ��            
	                queryItems = template.Template.QueryItems;
	                modelFields = template.Template.Model.fields;
	                gridColumns = template.Template.GridColumns;
	            }
	            else {

	                if (!allfield) return;

	                var fields = allfield.split(','); //�����ֶ�
	                var heads = headText.split(','); //��ͷ

	                queryItems = new Array();
	                for (var i = 0; i < heads.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp = fields[i]; ;
	                    //                    if (tempfield.length > 1) {
	                    //                        temp = tempfield[1]; //ȥ������
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
	                        temp = tempfield[1]; //ȥ������
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    modelFields.push({
	                        name: fields[i], //��ȥ������
	                        type: 'string',
	                        mapping: temp
	                    });
	                }

	                gridColumns = new Array();
	                for (var i = 0; i < heads.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //ȥ������
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
								    text: "��ѯ",
								    iconCls: 'add'
								},
								{
								    id: 'help_show',
								    text: '��ʾ',
								    iconCls: 'icon-unfold',
								    handler: function () {
								        if (this.iconCls == 'icon-unfold') {
								            this.setIconCls('icon-fold');
								            this.setText("����");
								            querypanel.show();
								        } else {
								            this.setIconCls('icon-unfold');
								            this.setText("��ʾ");
								            querypanel.hide();
								        }
								    }
								},
								 "->",
							   {
							       id: "help_close",
							       text: "�ر�",
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

	            //store.load();//����load��IE�Ľ����Ť��

	            var pagingbar = Ext.create('Ext.ng.PagingBar', {
	                store: store,
	                displayMsg: '�� {2} ������',
	                //emptyMsg: "û������",
	                beforePageText: "��",
	                afterPageText: "/{0} ҳ",
	                style: { backgroundImage: 'none', backgroundColor: 'transparent' }
	            });

	            var selModel = Ext.create('Ext.selection.CheckboxModel');
	            var grid = Ext.create('Ext.ng.GridPanel', {
	                region: 'center',
	                //frame: true,
	                border: false,
	                store: store,
	                selModel: { mode: "SIMPLE" }, //MULTI, //��ѡ
	                columnLines: true,
	                columns: gridColumns
	                //bbar: pagingbar
	            });

	            var resultStore = Ext.create('Ext.ng.JsonStore', {
	                model: 'model'
	            });

	            var selectedLoaded = false;
	            //��ѡֵ����
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
	                            resultStore.insert(0, selectData); //��������
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
	                                        Ext.MessageBox.alert('��ȡʧ��');
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
	                selModel: { mode: "SIMPLE" }, //��ѡ
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

	            //��ʾ��������
	            var win = Ext.create('Ext.window.Window', {
	                title: title, //'Hello',
	                border: false,
	                height: me.helpHeight,
	                width: me.helpWidth,
	                layout: 'border',
	                modal: true,
	                items: [toolbar, querypanel, panel],
	                buttons: [pagingbar, '->', { text: 'ȷ��', handler: function () { me.btnOk(me, resultStore,win); } }, { text: 'ȡ��', handler: function () { win.close(); } }],
	                layout: {
	                    type: 'border',
	                    padding: 1
	                }
	            });

	            win.show();

	            //pagingbar.el.down('.x-box-inner').setStyle({ backgroundColor: 'transparent' }); //#dfe8f6

	            //store.load();//�ֹ������ᴥ��beforeload�¼�

	            grid.on('itemdblclick', function (grid, record, item) {
	                var data = [];
	                data = grid.getSelectionModel().getSelection();
	                if (data.length == 0) {//ֱ��˫��ȡ����ѡ�е���
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
	                        template = resp.template; //����ģ��
	                    }
	                    else {
	                        title = resp.data.Title;
	                        allfield = resp.data.AllField;
	                        headText = resp.data.HeadText;
	                    }

	                } else {
	                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
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
	            resultStore.insert(0, selectData); //��������
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
	        me.setValue(valuepair); //������ô���ò��ܳɹ�

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
	            async: false, //ͬ������
	            success: function (response) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.status === "ok") {
	                    name = resp.name; //��ʾֵ                    
	                } else {
	                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
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
	    minChars: 1, //�����������ٶ��ٸ��ַ���ʱ���ȡ����
	    helpType: 'simple', //Ĭ����simple,�Զ�����棺rich
	    helpWidth: 750, //�������
	    helpHeight: 400, //�����߶�
	    showAutoHeader: false,
	    //outFilter: {}, //�ⲿ��ѯ����,��ȷ����
	    //likeFilter: {}, //�ⲿģ����ѯ������like����
	    selectMode: 'Single', //multiple  
	    needBlankLine: false,
	    //forceSelection: true,
	    autoSelect: false, //��Ҫ�Զ�ѡ���һ��
	    enableKeyEvents: true, //����key�¼�
	    selectOnFoucus: true,
	    typeAhead: true, //��ʱ��ѯ
	    typeAheadDelay: 500, //�ӳ�500���룬Ĭ����250
	    //valueNotFoundText: 'Select a Country!!...',
	    queryMode: 'remote',
	    triggerAction: 'all', //'query'        
	    initComponent: function () {
	        //
	        var me = this;
	        this.callParent();
	        this.mixins.base.initComponent.call(me); //��callParent�������ɵ���
	        me.helpType = 'RichHelp_' + me.helpid;
	        me.bussType = me.bussType || 'all';

	        //me.tpl = '<div><table width="100%" ><tr><th class="x-column-header-inner x-column-header-over" >����</th><th class="x-column-header-inner x-column-header-over">����</th></tr><tpl for="."><tr class="x-boundlist-item"><td>{' + this.valueField + '}</td><td>{' + this.displayField + '}<td></tr></tpl></table></div>';
	        if (Ext.isEmpty(me.helpid) || Ext.isEmpty(me.displayField) || Ext.isEmpty(me.valueField)) return;

	        if (me.listFields && me.listHeadTexts) {

	            var listheaders = '';
	            var listfields = '';

	            var heads = me.listHeadTexts.split(','); //��ͷ 
	            var fields = me.listFields.split(','); //�����ֶ�              

	            var modelFields = new Array();
	            for (var i = 0; i < fields.length; i++) {

	                var tempfield = fields[i].split('.');
	                var temp;
	                if (tempfield.length > 1) {
	                    temp = tempfield[1]; //ȥ������
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
	                    temp = tempfield[1]; //ȥ������
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

	            //ֻ��������д�¼����ܴ�����
	            store.on('beforeload', function (store) {

	                //debugger;
	                Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //�޸�pageIndexΪ��0��ʼ
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

	                    //ȥ������
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
	                    emptydata[myDisplayField] = '&nbsp;'; //��html���          

	                    var rs = [emptydata];
	                    store.insert(0, rs);
	                });
	            }

	        }
	        else {
	            me.initialListTemplate(); //��ʼ�������б���ʽ 
	        }

	        me.addEvents('helpselected'); //����ֵ��ѡ����¼�
	        me.addEvents('firstrowloaded');

	        me.on('select', function (combo, records, eOpts) {

	            var theField;

	            //����
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

	            //ȥ������
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
	            if (me.isInGrid) {//Ƕ��grid��
	                obj[me.valueField] = name; //��ƭ,grid�Ǳ���ʾ������
	            } else {
	                obj[me.valueField] = code;
	            }
	            if (me.displayFormat) {
	                obj[me.displayField] = Ext.String.format(me.displayFormat, code, name);
	            } else {
	                obj[me.displayField] = name;
	            }

	            var valuepair = Ext.ModelManager.create(obj, 'themodel');
	            me.setValue(valuepair); //������ô���ò��ܳɹ�

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

	            //ˢ�°�ťȥ��
	            var autoPagingbar = me.getPicker().pagingToolbar;
	            autoPagingbar.items.items[10].hide();
	            autoPagingbar.items.items[9].hide();

	        });

	        me.on('keydown', function (combo, e, eOpts) {
	            if (me.isExpanded) {

	                //�س�
	                if (e.keyCode == Ext.EventObject.ENTER) {
	                    if (me.picker.el.query('.' + me.picker.overItemCls).length > 0) return false;
	                    me.onTriggerClick();
	                }

	                //��ҳ
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
	                async: false, //ͬ������
	                success: function (response) {
	                    var resp = Ext.JSON.decode(response.responseText);
	                    if (resp.Status === "success") {
	                        if (resp.Data == false) {
	                            me.setValue('');
	                        }
	                    } else {
	                        Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
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

	            if (me.helpType === 'rich') {//�û��Զ�������ģ�� 

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

	                var fields = allfield.split(','); //�����ֶ�
	                var heads = headText.split(','); //��ͷ 

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
	                        temp = tempfield[1]; //ȥ������
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
	                    temp = tempfield[1]; //ȥ������
	                }
	                else {
	                    temp = fields[i];
	                }

	                listfields += '<td>{' + temp + '}</td>';
	            }

	            var store = Ext.create('Ext.data.Store', {
	                pageSize: 10, //�������ҳ��С                
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
	            //me.bindStore(store); //��̬��store
	            me.store = store;

	            //ֻ��������д�¼����ܴ�����
	            store.on('beforeload', function (store) {

	                Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //�޸�pageIndexΪ��0��ʼ
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

	                    //ȥ������
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
	                    emptydata[myDisplayField] = '&nbsp;'; //��html���          

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
	                        template = resp.template; //����ģ��
	                    }
	                    else {
	                        //title = resp.data.Title;
	                        allfield = resp.data.AllField;
	                        headText = resp.data.HeadText;
	                    }

	                } else {
	                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
	                }
	            }
	        });
	    },
	    onTriggerClick: function () {
	        var me = this;
	        if (me.readOnly || arguments.length == 3) return; //arguments.length == 3��������ϵ��           

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

	            if (me.helpType === 'rich') {//�û��Զ�������ģ��            
	                queryItems = template.Template.QueryItems;
	                modelFields = template.Template.Model.fields;
	                gridColumns = template.Template.GridColumns;
	            }
	            else {

	                if (!allfield) return;

	                var fields = allfield.split(','); //�����ֶ�
	                var heads = headText.split(','); //��ͷ

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
	                        temp = tempfield[1]; //ȥ������
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    modelFields.push({
	                        name: fields[i], //��ȥ������
	                        type: 'string',
	                        mapping: temp
	                    });
	                }

	                gridColumns = new Array();
	                for (var i = 0; i < heads.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //ȥ������
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
                                        { boxLabel: '�ڽ��������', width: 100, id: 'ch-searchInResult', inputValue: '01' },
                                        { boxLabel: '������', width: 60, id: 'ch-treerem', inputValue: '02', handler: function (chk) {
                                            me.saveTreeMemory(leftTree, chk.getValue());
                                            var k = 0;
                                        }
                                        }
                                   ]
							     }
							 ]
	            });

	            var searcheArr = [];
	            var searchIndex = {}; //����
	            Ext.getCmp('ch-searchInResult').on('change', function (me, nvalue, ovalue, eOpts) {

	                if (false == nvalue) {
	                    searcheArr.length = 0; //��������б�
	                    searchIndex = {}; //�������
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
	                //layout: 'auto', //֧������Ӧ 	              
	                items: [{
	                    xtype: 'fieldset', //'fieldcontainer',
	                    title: '��ѯ����', //fieldLabel: 'Size',
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
	                                    var code = select[0].code; //������������id
	                                    propertyCode = code;
	                                    propertyID = select[0].inputValue;

	                                    Ext.Ajax.request({
	                                        //params: { 'id': busid },
	                                        url: C_ROOT + 'SUP/RichHelp/GetListExtendInfo?code=' + propertyCode,
	                                        //callback: ShowHelp,
	                                        success: function (response) {
	                                            var resp = Ext.JSON.decode(response.responseText);
	                                            var extFields = resp.extfields; //��չ�ֶ�
	                                            var extHeader = resp.extheader; //��չ��ͷ

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

	                                            //ʹ���ⲿ��store
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
	                                            //��������grid
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
	                                        rootNode.expand(); //expand���Զ�����load
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
                   { name: 'treerefkey', type: 'string'}//�ҵ��Զ�������                
                   ],
	                url: C_ROOT + "SUP/RichHelp/GetQueryProTree",
	                listeners: {
	                    selectionchange: function (m, selected, eOpts) {
	                        me.memory.eOpts = "selectionchange";

	                        //ˢ�б�����
	                        var record = selected[0];
	                        if (record) {
	                            if (!Ext.isEmpty(record.data.treesearchkey) && !Ext.isEmpty(record.data.treerefkey)) {
	                                Ext.apply(store.proxy.extraParams, { 'treesearchkey': record.data.treesearchkey, 'treerefkey': record.data.treerefkey });
	                                store.load();
	                            }
	                            //����ѡ��
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
	                operation.params.code = propertyCode; //����Ӳ���	                
	            });

	            //leftTree.getStore().load(); //�ֶ�load����Ȼbeforeload����Ч��
	            //leftTree.getRootNode().expand(); //expand���Զ�����load

	            var leftPanel = Ext.create('Ext.panel.Panel', {
	                title: "������Դ��",
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
	                        emptyText: '����ؼ��֣���λ���ڵ�',
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
                   { name: 'row', type: 'string'}//�ҵ��Զ�������                            
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
	                me.setValue(valuepair); //������ô���ò��ܳɹ�
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
	            //��������
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
	            //�߼���ѯ�б�
	            var richqueryGrid = Ext.create('Ext.ng.GridPanel', {
	                region: 'center',
	                columnLines: true,
	                columns: gridColumns,
	                store: richqueryStore,
	                bbar: richqueryPagingbar
	            });
	            //��ѯ���
	            var queryPanel = Ext.create('Ext.ng.TableLayoutForm', {
	                region: 'east',
	                //frame:false,            
	                //title: '��ѯ����',
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
	                    items: ['->', { xtype: 'button', text: '����', handler: function () { me.saveQueryFilter(me.helpid, queryPanel); } },
                                      { xtype: 'button', text: '����', handler: function () { me.setQueryInfo(me.helpid); } },
                                      { xtype: 'button', text: '����', handler: function () { me.richQuerySearch(queryPanel, richqueryStore); } },
                                      { xtype: 'button', text: '���', handler: function () { queryPanel.getForm().reset(); } }
                              ]
	                }]

	            });

	            var tabItems = [{ layout: 'border', title: '�б�', id: 'listStyle', items: [grid] },
	                                   { layout: 'border', title: '����', id: 'commonData', items: [commonUseGrid] },
	                                   { layout: 'border', title: '�߼�', id: 'richquery', items: [richqueryGrid, queryPanel] }
                                      ];

	            if (showTree) {
	                tabItems = [{ layout: 'border', title: '�б�', id: 'listStyle', items: [grid] },
                                       { layout: 'border', title: '����', id: 'treeStyle', items: [tree] },
	                                   { layout: 'border', title: '����', id: 'commonData', items: [commonUseGrid] },
	                                   { layout: 'border', title: '�߼�', id: 'richquery', items: [richqueryGrid, queryPanel] }
                                      ];
	            }

	            var tabPanel = Ext.create('Ext.tab.Panel', {
	                layout: 'border',
	                region: 'center',
	                deferredRender: false,
	                plain: true,
	                activeTab: 0,
	                //minHeight: 360,
	                //minWidth: 600,//��Ҫ���ã�grid������������
	                defaults: { bodyStyle: 'padding:3px' },
	                items: tabItems
	            });

	            var commlistLoaded = false; //�Ѿ����ر��
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
	                queryPanel.getForm().setValues(richQueryFilter); //����ֵ
	                BatchBindCombox(queryPanel.getForm().getFields().items); //����ת����
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

	            //��ʾ��������
	            var win = Ext.create('Ext.window.Window', {
	                title: title, //'Hello',
	                border: false,
	                height: me.helpHeight,
	                width: me.helpWidth,
	                layout: 'border',
	                modal: true,
	                items: winItems, //[toolbar, queryProperty, tabPanel],
	                buttons: [{ id: 'mutilhelp_add', text: '��ӳ���', handler: function () { me.addCommonUseData(me, grid, commonUseStore); } },
                    { id: 'mutilhelp_del', text: 'ɾ������', disabled: true, handler: function () { me.delCommonUseData(me, commonUseGrid, commonUseStore) } },
                     '->',
                    { text: 'ȷ��', handler: function () { me.btnOk(me, grid, tree, tabPanel, commonUseGrid, richqueryGrid, win); } },
                    { text: 'ȡ��', handler: function () { win.close(); } }]
	            });
	            win.show();

	            //store.load();//�ֹ������ᴥ��beforeload�¼�

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
	                        template = resp.template; //����ģ��
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
	                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
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
	        help.setValue(valuepair); //������ô���ò��ܳɹ�
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
	            var index = commonUseStore.find(help.valueField, code); //ȥ��
	            if (index < 0) {

	                Ext.Ajax.request({
	                    url: C_ROOT + 'SUP/RichHelp/SaveCommonUseData',
	                    params: { 'helpid': help.helpid, 'codeValue': code },
	                    success: function (response) {
	                        var resp = Ext.JSON.decode(response.responseText);
	                        if (resp.Status === "success") {
	                            commonUseStore.insert(commonUseStore.count(), data[0].data);
	                        } else {
	                            Ext.MessageBox.alert('����ʧ��', resp.status);
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
	                        commonUseStore.remove(data[0]); //�Ƴ�
	                    } else {
	                        Ext.MessageBox.alert('ɾ��ʧ��!', resp.status);
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
	            help.setValue(valuepair); //������ô���ò��ܳɹ�
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
	            items: [{ id: "query_save", text: "����", width: this.itemWidth, iconCls: "icon-save" },
                           { id: "query_addrow", text: "����", width: this.itemWidth, iconCls: "icon-AddRow" },
                           { id: "query_deleterow", text: "ɾ��", width: this.itemWidth, iconCls: "icon-DeleteRow" },
                            '->',
                            { id: "query_close", text: "�ر�", width: this.itemWidth, iconCls: "icon-Close", handler: function () { win.close(); } }
                           ]
	        });

	        //����ģ��
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
	            queryMode: 'local',                           //localָ��Ϊ��������  ����Ǻ�̨����  ֵΪremote     
	            name: 'mode',
	            datasource: 'default',
	            data: [{             //�༭״̬��,״̬�е������˵��� data
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
	            buskey: 'code', //��Ӧ��ҵ�������               
	            columnLines: true,
	            columns: [{
	                header: '�� ��',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'code',
	                hidden: true
	            }, {
	                header: '�ֶ�����',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'fieldtype',
	                hidden: true
	            }, {
	                header: '����',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'tablename'
	            }, {
	                header: '�ֶ�',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'field'
	            }, {
	                header: '�ֶ�����',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'fname_chn'
	            }, {
	                header: '�����',
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
	                header: 'Ĭ��ֵ',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'defaultdata',
	                editor: {}
	            }, {
	                header: '�����',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'displayindex',
	                editor: { xtype: 'numberfield' }
	            }, {
	                header: '��������',
	                flex: 1,
	                sortable: false,
	                dataIndex: 'definetype',
	                renderer: function (val) {
	                    if (val === '1') {
	                        return "�û�����";
	                    }
	                    else {
	                        return "ϵͳ����";
	                    }
	                }
	            }],
	            plugins: [richQueryCellEditing]
	        });

	        //��ʾ��������
	        var win = Ext.create('Ext.window.Window', {
	            title: '��ѯ��������',
	            border: false,
	            height: 400,
	            width: 600,
	            layout: 'border',
	            modal: true,
	            items: [grid],
	            buttons: ['->',
                    { text: 'ȷ��', handler: function () { Save(); win.close(); } },
                    { text: 'ȡ��', handler: function () { win.close(); } }]
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
	                        Ext.MessageBox.alert('����ʧ��', resp.status);
	                        name = 'error';
	                    }
	                }
	            });
	        }

	        toolbar.items.get('query_save').on('click', function () {
	            Save()
	        });

	        var data = [{             //�༭״̬��,״̬�е������˵��� data
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

	        var otherData = [{             //�༭״̬��,״̬�е������˵��� data
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
	                Ext.MessageBox.alert('', 'û��ƥ������ڵ�.');
	            }
	            me.nodeIndex = -1;
	        }
	    },
	    saveQueryFilter: function (helpid, qpanel) {
	        var data = JSON.stringify(qpanel.getForm().getValues());

	        if (data === '{}') return; //ֵΪ��

	        Ext.Ajax.request({
	            url: C_ROOT + 'SUP/RichHelp/SaveQueryFilter',
	            async: true,
	            params: { 'helpid': helpid, 'data': data },
	            success: function (response, opts) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.Status === "success") {
	                    Ext.MessageBox.alert('����ɹ�!');
	                }
	            }
	        });
	    },
	    getCodeName: function (value) {
	        var me = this;
	        var name;

	        Ext.Ajax.request({
	            url: C_ROOT + 'SUP/RichHelp/GetName?helptype=Single&helpid=' + me.helpid + '&code=' + value,
	            async: false, //ͬ������
	            success: function (response) {
	                var resp = Ext.JSON.decode(response.responseText);
	                if (resp.status === "ok") {
	                    name = resp.name; //��ʾֵ                    
	                } else {
	                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
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
	                temp = tempfield[1]; //ȥ������
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
	        if (me.readOnly || arguments.length == 3) return; //arguments.length == 3��������ϵ��           

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

	            if (me.helpType === 'rich') {//�û��Զ�������ģ��            
	                queryItems = template.Template.QueryItems;
	                modelFields = template.Template.Model.fields;
	                gridColumns = template.Template.GridColumns;
	            }
	            else {

	                if (!allfield) return;

	                var fields = allfield.split(','); //�����ֶ�
	                var heads = headText.split(','); //��ͷ

	                modelFields = new Array();
	                for (var i = 0; i < fields.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //ȥ������
	                    }
	                    else {
	                        temp = fields[i];
	                    }

	                    modelFields.push({
	                        name: temp, //fields[i], //��ȥ������
	                        type: 'string',
	                        mapping: temp
	                    });
	                }

	                gridColumns = new Array();
	                for (var i = 0; i < heads.length; i++) {

	                    var tempfield = fields[i].split('.');
	                    var temp;
	                    if (tempfield.length > 1) {
	                        temp = tempfield[1]; //ȥ������
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
                                        { boxLabel: '�ڽ��������', width: 100, id: 'ch-searchInResult', inputValue: '01' },
                                        { boxLabel: '������', width: 60, id: 'ch-treerem', inputValue: '02', handler: function (chk) {
                                            me.saveTreeMemory(leftTree, chk.getValue());
                                            var k = 0;
                                        }
                                        }
                                   ]
							     }
							 ]
	            });

	            var searcheArr = [];
	            var searchIndex = {}; //����
	            Ext.getCmp('ch-searchInResult').on('change', function (me, nvalue, ovalue, eOpts) {

	                if (false == nvalue) {
	                    searcheArr.length = 0; //��������б�
	                    searchIndex = {}; //�������
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
	                //layout: 'auto', //֧������Ӧ 	                                  
	                items: [{
	                    xtype: 'fieldset', //'fieldcontainer',
	                    title: '��ѯ����', //fieldLabel: 'Size',
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
	                                    var code = select[0].code; //������������id
	                                    propertyCode = code;
	                                    propertyID = select[0].inputValue;

	                                    Ext.Ajax.request({
	                                        //params: { 'id': busid },
	                                        url: C_ROOT + 'SUP/RichHelp/GetListExtendInfo?code=' + propertyCode,
	                                        //callback: ShowHelp,
	                                        success: function (response) {
	                                            var resp = Ext.JSON.decode(response.responseText);
	                                            var extFields = resp.extfields; //��չ�ֶ�
	                                            var extHeader = resp.extheader; //��չ��ͷ

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

	                                            //ʹ���ⲿ��store
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
	                                            //��������grid
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
	                                        rootNode.expand(); //expand���Զ�����load
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
                   { name: 'treerefkey', type: 'string'}//�ҵ��Զ�������                
                   ],
	                url: C_ROOT + "SUP/RichHelp/GetQueryProTree",
	                listeners: {
	                    selectionchange: function (m, selected, eOpts) {
	                        me.memory.eOpts = "selectionchange";

	                        //ˢ�б�����
	                        var record = selected[0];
	                        if (record) {
	                            if (!Ext.isEmpty(record.data.treesearchkey) && !Ext.isEmpty(record.data.treerefkey)) {
	                                Ext.apply(store.proxy.extraParams, { 'treesearchkey': record.data.treesearchkey, 'treerefkey': record.data.treerefkey });
	                                store.load();
	                            }
	                            //����ѡ��
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
	                operation.params.code = propertyCode; //����Ӳ���
	            });

	            //leftTree.getStore().load(); //�ֶ�load����Ȼbeforeload����Ч��
	            //leftTree.getRootNode().expand(); //expand���Զ�����load

	            var leftPanel = Ext.create('Ext.panel.Panel', {
	                title: "������Դ��",
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
	                        emptyText: '����ؼ��֣���λ���ڵ�',
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
                   { name: 'row', type: 'string'}//�ҵ��Զ�������                            
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
	                me.setValue(valuepair); //������ô���ò��ܳɹ�
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
	                selModel: { mode: "SIMPLE" }, //��ѡ                    
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
	                selModel: { mode: "SIMPLE"} //��ѡ
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
	                selModel: { mode: "SIMPLE" }, //��ѡ
	                bbar: richqueryPagingbar
	            });

	            var queryPanel = Ext.create('Ext.ng.TableLayoutForm', {
	                region: 'east',
	                //frame:false,            
	                //title: '��ѯ����',
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
	                    items: ['->', { xtype: 'button', text: '����', handler: function () { me.saveQueryFilter(me.helpid, queryPanel); } },
                                      { xtype: 'button', text: '����', handler: function () { me.setQueryInfo(me.helpid); } },
                                      { xtype: 'button', text: '����', handler: function () { me.richQuerySearch(queryPanel, richqueryStore); } },
                                      { xtype: 'button', text: '���', handler: function () { queryPanel.getForm().reset(); } }
                              ]
	                }]

	            });

	            queryPanel.on('afterrender', function () {
	                queryPanel.getForm().setValues(richQueryFilter); //����ֵ
	                BatchBindCombox(queryPanel.getForm().getFields().items); //����ת����
	            });

	            var tabItems = [{ layout: 'border', title: '�б�', id: 'listStyle', items: [grid] },
	                                   { layout: 'border', title: '����', id: 'commonData', items: [commonUseGrid] },
	                                   { layout: 'border', title: '�߼�', id: 'richquery', items: [richqueryGrid, queryPanel] }
                                      ];

	            if (showTree) {
	                tabItems = [{ layout: 'border', title: '�б�', id: 'listStyle', items: [grid] },
                                       { layout: 'border', title: '����', id: 'treeStyle', items: [tree] },
	                                   { layout: 'border', title: '����', id: 'commonData', items: [commonUseGrid] },
	                                   { layout: 'border', title: '�߼�', id: 'richquery', items: [richqueryGrid, queryPanel] }
                                      ];
	            }

	            var tabPanel = Ext.create('Ext.tab.Panel', {
	                layout: 'border',
	                region: 'center',
	                deferredRender: false,
	                plain: true,
	                activeTab: 0,
	                //minHeight: 360,
	                //minWidth: 600,//��Ҫ���ã�grid������������
	                defaults: { bodyStyle: 'padding:3px' },
	                items: tabItems
	            });

	            var commlistLoaded = false; //�Ѿ����ر��
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
	            //��ѡֵ����
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
	                            resultStore.insert(0, selectData); //��������
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
	                                        Ext.MessageBox.alert('��ȡʧ��');
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
	                selModel: { mode: "SIMPLE" }, //��ѡ
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

	            //��ʾ��������
	            win = Ext.create('Ext.window.Window', {
	                title: title, //'Hello',
	                border: false,
	                height: me.helpHeight,
	                width: me.helpWidth,
	                layout: 'border',
	                modal: true,
	                items: winItems, //[toolbar, queryProperty, tabPanel],
	                buttons: [{ id: 'mutilhelp_add', text: '��ӳ���', handler: function () { me.addCommonUseData(me, grid, commonUseStore); } },
                    { id: 'mutilhelp_del', text: 'ɾ������', disabled: true, handler: function () { me.delCommonUseData(me, commonUseGrid, commonUseStore) } },
                     '->',
                    { text: 'ȷ��', handler: function () { me.btnOk(me, resultStore); } },
                    { text: 'ȡ��', handler: function () { win.close(); } }]
	            });
	            win.show();

	            //store.load();//�ֹ������ᴥ��beforeload�¼�

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
	                        template = resp.template; //����ģ��
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
	                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
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
	            resultStore.insert(0, selectData); //��������
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
	        me.setValue(valuepair); //������ô���ò��ܳɹ�

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
	                Ext.MessageBox.alert('', 'û��ƥ������ڵ�.');
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
	minChars: 1, //�����������ٶ��ٸ��ַ���ʱ���ȡ����
	typeAhead: true,
	typeAheadDelay: 500,
	triggerAction: "all",
	selectMode: 'Single',
	needBlankLine: false,
	initComponent: function () {
		var me = this;

		//����Ĭ��ֵ
		me.valueField = me.valueField ? me.valueField : 'code';
		me.displayField = (me.displayField && me.displayField != 'text') ? me.displayField : 'name';

		me.callParent();
		this.mixins.base.initComponent.call(me);

		//me.tpl = '<div><table width="100%" ><tr><th class="x-column-header-inner x-column-header-over" >����</th><th class="x-column-header-inner x-column-header-over">����</th></tr><tpl for="."><tr class="x-boundlist-item"><td>{' + this.valueField + '}</td><td>{' + this.displayField + '}<td></tr></tpl></table></div>';

		var store;

		if (me.queryMode === 'remote') {

			if (Ext.isEmpty(me.helpid) || Ext.isEmpty(me.displayField) || Ext.isEmpty(me.valueField)) return;

			if (me.listFields && me.listHeadTexts) {

				var listheaders = '';
				var listfields = '';

				var heads = me.listHeadTexts.split(','); //��ͷ 
				var fields = me.listFields.split(','); //�����ֶ�              

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
		//�����ⲿ����
		store.on('beforeload', function (store) {

			Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //�޸�pageIndexΪ��0��ʼ
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
				emptydata[me.displayField] = '&nbsp;'; //��html���          

				var rs = [emptydata];
				store.insert(0, rs);
			});
		}

		me.addEvents('helpselected'); //����ֵ��ѡ����¼�

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
			if (me.isInGrid) {//Ƕ��grid��
				obj[me.valueField] = name; //��ƭ,grid�Ǳ���ʾ������
			} else {
				obj[me.valueField] = code;
			}
			obj[me.displayField] = name;
			var valuepair = Ext.ModelManager.create(obj, 'themodel');
			me.setValue(valuepair); //������ô���ò��ܳɹ�

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

			if (me.helpType === 'rich') {//�û��Զ�������ģ�� 

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

				var heads = headText.split(','); //��ͷ 
				var fields = allfield.split(','); //�����ֶ�              

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
			//store.fields = modelFields; //����store
			var store = Ext.create('Ext.data.Store', {
				pageSize: 10, //�������ҳ��С                
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
			//me.bindStore(store); //��̬��store
			me.store = store;

			//ֻ��������д�¼����ܴ�����
			store.on('beforeload', function (store) {

				Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //�޸�pageIndexΪ��0��ʼ
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
						template = resp.template; //����ģ��
					}
					else {
						//title = resp.data.Title;
						allfield = resp.data.AllField;
						headText = resp.data.HeadText;
					}

				} else {
					Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
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
	minChars: 1, //����һ���͵�������
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
		//����Ҫ���������tpl
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

		me.treePanel.border = false, //ȥ���߿�
		me.treePanel.width = width;
		if (!me.matchFieldWidth) {
			me.getPicker().setWidth(width);
		}

		var treeObj = me.treePanel;

		treeObj.on('itemclick', function (view, rec) {
			if (rec) {


				var isleaf = rec.get('leaf');
				if (me.effectiveNodeType === 'leaf' && (isleaf == false)) {
					return; //����Ҷ�ӽڵ�
				}

				var code = rec.get(me.treeValueField); //rec.get('id');
				var name = rec.get('text');

				var obj = new Object();
				obj[me.valueField] = code;
				obj[me.displayField] = name;

				var valuepair = Ext.ModelManager.create(obj, 'treemodel');
				me.setValue(valuepair); //������ô���ò��ܳɹ�

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
	minChars: 1, //�����������ٶ��ٸ��ַ���ʱ���ȡ����
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
	alias: 'widget.ngText', //����,��ͨ������xtype����,����ͨ��Ext.widget()��������
	initComponent: function () {
		var me = this;
		this.mixins.base.initComponent.call(me);
		me.callParent();

	}
});

Ext.define('Ext.ng.TextArea', {
	extend: 'Ext.form.field.TextArea',
	mixins: { base: 'Ext.ng.form.field.Base' },
	alias: 'widget.ngTextArea', //����,��ͨ������xtype����,����ͨ��Ext.widget()�������� 
	initComponent: function () {
		var me = this;
		this.mixins.base.initComponent.call(me);
		me.callParent();
	}
});

Ext.define('Ext.ng.Number', {
    extend: 'Ext.form.field.Number',
    mixins: { base: 'Ext.ng.form.field.Base' },
    alias: 'widget.ngNumber', //����,��ͨ������xtype����,����ͨ��Ext.widget()�������� 
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
	alias: 'widget.ngDate', //����,��ͨ������xtype����,����ͨ��Ext.widget()��������   
	initComponent: function () {
		var me = this;
		this.mixins.base.initComponent.call(me);
		me.callParent();

	}
});

Ext.define('Ext.ng.Time', {
	extend: 'Ext.form.field.Time',
	mixins: { base: 'Ext.ng.form.field.Base' },
	alias: 'widget.ngTime', //����,��ͨ������xtype����,����ͨ��Ext.widget()�������� 
	initComponent: function () {
		var me = this;
		this.mixins.base.initComponent.call(me);
		me.callParent();

	}
});

Ext.define('Ext.ng.Checkbox', {
	extend: 'Ext.form.field.Checkbox',
	mixins: { base: 'Ext.ng.form.field.Base' },
	alias: 'widget.ngCheckbox', //����,��ͨ������xtype����,����ͨ��Ext.widget()��������
	initComponent: function () {
		var me = this;
		this.mixins.base.initComponent.call(me);
		me.callParent();

	}
});

Ext.define('Ext.ng.Radio', {
	extend: 'Ext.form.field.Radio',
	mixins: { base: 'Ext.ng.form.field.Base' },
	alias: 'widget.ngRadio', //����,��ͨ������xtype����,����ͨ��Ext.widget()��������
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


//-------��ȡExt.form.Panel���������-----
//
//form: ��Ext.form.Panel����
//key: ���ݵ�����,��������","��Ϊ�ָ���
//optype:��������, ������new,�޸ģ�edit
//����json��ʽ����
//----------------------------------------------
function GetExtJsFormData(form, key, optype) {


	if (optype === 'new' || optype === 'add') {
		optype = 'newRow';
	}
	else {
		optype = 'modifiedRow';
	}


	var data = DealFormData(form);


	//��������
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
	data["key"] = temp;  //data[key];//�����е�ֵ

	var obj = new Object();
	obj['key'] = key; //������
	obj[optype] = data;
	data = { 'form': obj };

	var json = JSON.stringify(data); //Ext.encode(data);
	return json;
}

//Ext4.0�汾�����Ͽؼ��������ֵ����
//Ext4.2�Ѿ�����
function DealFormData(form) {

	var formdata = form.getForm();
	var data = formdata.getValues();

	//������ЩֵΪ�յ���getValues()ȡ����ֵ�����ܴ�ֵ�Ķ���
	var fields = form.getForm().getFields().items;
	for (var i = 0; i < fields.length; i++) {

		var field = fields[i];
		var classname = field.alternateClassName;
		var fieldname = field.name; //�ֶ�

		//combox�ؼ�����
		if (classname === 'Ext.form.field.ComboBox' || classname === 'Ext.form.ComboBox') {
			if (!data.hasOwnProperty(fieldname)) {
				data[fieldname] = ''; //��ֵ
			}
		}

		//Checkbox�ؼ�����
		if (classname === 'Ext.form.field.Checkbox' || classname === 'Ext.form.Checkbox') {
			if (!data.hasOwnProperty(fieldname)) {
				data[fieldname] = ''; //��ֵ
			}
		}

		//Radio�ؼ�����
		if (classname === 'Ext.form.field.Radio' || classname === 'Ext.form.Radio') {
		    if (!data.hasOwnProperty(fieldname)) {
		        data[fieldname] = ''; //��ֵ
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

//-------�ϲ�Ext.form.Panel���������-----
//
//forms: ��Ext.form.Panel��������
//key: ���ݵ�����,��������","��Ϊ�ָ���
//optype:��������, ������new,�޸ģ�edit
//����json��ʽ����
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
					data[p] = obj[p]; //��ֵ�Լ���data��
				}
			}
		}

		//��������
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
		data["key"] = temp;  //data[key];//�����е�ֵ

		var obj = new Object();
		obj['key'] = key; //������id
		obj[optype] = data;
		data = { 'form': obj };

		var json = JSON.stringify(data); //Ext.encode(data);
		return json;

	}
}

//----------��ȡExtJs.Grid���������----------
//store : Ext.data.Store����
//key : �����У���������","Ϊ�ָ���
//����json��ʽ����
//------------------------------------------------
function GetExtJsGridData(store, key) {

	var flag = false;
	var newRecords = store.getNewRecords(); //���������  
	var modifyRecords = store.getUpdatedRecords(); // ��ȡ�޸ĵ��е����ݣ��޷���ȡ��Ӱ���� 
	var removeRecords = store.getRemovedRecords(); //��ȡ�Ƴ�����
	
	var newdata = [];
	Ext.Array.each(newRecords, function (record) {

		//
		var newobj = record.data;
		newobj["key"] = null;
		newobj = { 'row': newobj }; //�б��
		newdata.push(newobj);
	});

	var modifydata = [];
	Ext.Array.each(modifyRecords, function (record) {

		//
		var modifyobj = new Object(); //record.modified;

		//��������
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

		//�����޸ĵ��ֶ�,ֻ���޸ĵĲ���,�������ݴ�����
		var modified = new Object();
		modified["key"] = values;
		for (var p in record.modified) {
			modified[p] = record.data[p];
		}
		modifyobj = { 'row': modified }; //�б��

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
		object = { 'row': object }; //�б��
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
   
    var newRecords = store.getNewRecords(); //���������  
    var modifyRecords = store.getUpdatedRecords(); // ��ȡ�޸ĵ��е����ݣ��޷���ȡ��Ӱ���� 
    var removeRecords = store.getRemovedRecords(); //��ȡ�Ƴ�����

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

//----------��ȡDataTable��json����----------
//����:newRecords,�޸�:modifyRecords,ɾ��:removeRecords,����:unchangeRecords
// �������Ͷ���Ext.data.Model[]
// key��ҵ������
//------------------------------------------------
function GetDatatableData(newRecords, modifyRecords, removeRecords,unchangeRecords, key) {

    var flag = false;
    var newdata = [];
    Ext.Array.each(newRecords, function (record) {

        //
        var newobj = record.data;
        newobj["key"] = null;
        newobj = { 'row': newobj }; //�б��
        newdata.push(newobj);
    });

    var modifydata = [];
    Ext.Array.each(modifyRecords, function (record) {

        //
        var modifyobj = new Object(); //record.modified;

        //��������
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

        //�����޸ĵ��ֶ�,ֻ���޸ĵĲ���,�������ݴ�����
        var modified = new Object();
        modified["key"] = values;
        //        for (var p in record.modified) {
        //            modified[p] = record.data[p];
        //        }
        Ext.apply(modified, record.data);
        modifyobj = { 'row': modified }; //�б��

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
        object = { 'row': object }; //�б��
        removedata.push(object);
    });

  var unChangedData = [];
  Ext.Array.each(unchangeRecords, function (record) {

      //��������
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
      var obj = { 'row': record.data }; //�б��
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

//----------��ȡDataTable��json����----------
//����:data.add,�޸�:data.modify,ɾ��:data.remove,����:data.unchange
// �������Ͷ���Ext.data.Model[]
// data.key��ҵ������
//------------------------------------------------
function GetTableData(data) {

    var newdata = data.add || [];
    var modifydata = data.modify || [];
    var removedata = data.remove || [];
    var unChangedData = data.unchange || [];

   return GetDatatableData(newdata, modifydata, removedata, unChangedData, data.key);
};

//----------��ȡExtJs.Grid�������������----------
//store : Ext.data.Store����
//key : �����У���������","Ϊ�ָ���
//������״̬ȫ��������json��ʽ����
//------------------------------------------------
function GetAllGridData(store, key) {

	var all = store.getRange();

	var newdata = [];
	Ext.Array.each(all, function (record) {

		var newobj = record.data;
		newobj["key"] = null;
		newobj = { 'row': newobj }; //�б��
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

//----------У��ExtJs.Grid���������----------
//store : Ext.grid.Panel����
//ͨ��:true,ʧ��:false
//------------------------------------------------
function ValidGridData(grid) {

	var store = grid.store;
	var newRecords = store.getNewRecords(); //���������  
	var modifyRecords = store.getUpdatedRecords(); // ��ȡ�޸ĵ��е����ݣ��޷���ȡ��Ӱ����
	var removeRecords = store.getRemovedRecords(); //��ȡ�Ƴ�����

	for (var i = 0; i < store.data.items.length; i++) {
		var curRow = store.data.items[i].data;

		var j = 0;
		for (property in curRow) {
			var name = property; //����
			var value = curRow[property]; //ֵ


			var colIndex = -1;
			var findColumn = false;
			//�����ǵڼ���
			for (var k = 0; k < grid.columns.length; k++) {
				var column = grid.columns[k];
				if (name === column.dataIndex) {
					colIndex = k;
					findColumn = true;
					break;
				}
			}

			if (!findColumn) continue;
			if (!grid.columns[colIndex].getEditor) continue; //�ݴ�
			j++;

			var editor = grid.columns[colIndex].getEditor();

			if (editor) {
				if (!editor.validateValue(value) || (!editor.allowBlank && Ext.isEmpty(value))) {

				    var errorMsg = !editor.validateValue(value) ? editor.activeErrors : "����Ϊ������";
				    errorMsg = '��' + (i + 1) + '�У� [' + column.text + ']�����벻�Ϸ���' + errorMsg;
					//Ext.create('Ext.ng.MessageBox').Error('��' + (i+1) + '�У� [' + column.text + ']�����벻�Ϸ���' + errorMsg);

					var msg = Ext.Msg.show(
								{
									title: '��ʾ',
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

	//�����ݵ�Ψһ����֤
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

					if (obj.hasOwnProperty(value)) {//�Ѿ�����

						Ext.create('Ext.ng.MessageBox').Error('��' + (j + 1) + '�����������ظ�!');
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
					if (obj.hasOwnProperty(data[value])) {//�Ѿ�����

						var findColumn = false;
						var colIndex = -1;
						//�����ǵڼ���
						for (var k = 0; k < grid.columns.length; k++) {
							var column = grid.columns[k];
							if (value === column.dataIndex) {
								colIndex = k;
								findColumn = true;
								break;
							}
						}
						if (!findColumn) continue;

						Ext.create('Ext.ng.MessageBox').Error('��' + (j + 1) + '�����������ظ�!');
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
				Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
			}
		}
	});
}

//----------�����������ؼ��Ĵ�������ת��----------
//comboxs : Ext.ng.CommonHelp,Ext.form.ComboBox��������
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
	                Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
	            }
	        }
	    });
	}

}

// #endregion

// #region ҵ�����֮��Ա����
Ext.define("Ext.ng.EmpHelp", {
	extend: 'Ext.window.Window',
	alias: 'widget.emphelp',
	title: 'Ա������',
	closable: true,
	resizable: false,
	modal: true,
	width: 600,
	height: 400,
	nodeIndex: -1,
	border: false,
	callback: null,  //���ȷ����Ļص�����
	allowBank: true, //�����ؿ�ֵ
	bussType: "all", //ҵ������
	gridStore: null,
	sqlfilter: "",
	isMulti: false, //Ĭ�ϵ�ѡ
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
				title: "������Դ��",
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
						emptyText: '����ؼ��֣���λ���ڵ�',
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
					header: '���',
					flex: 1,
					sortable: false,
					menuDisabled: true,
					draggable: false,
					dataIndex: 'cno'
				}, {
					header: '����',
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
					displayMsg: '�� {2} ������',
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
					header: '���',
					flex: 1,
					sortable: false,
					menuDisabled: true,
					draggable: false,
					dataIndex: 'cno'
				}, {
					header: '����',
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
					displayMsg: '�� {2} ������&nbsp;&nbsp;&nbsp;��ѡ {3} ������',
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
				emptyText: '״̬',
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
				emptyText: '����',
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
				emptyText: '������/�������س���ѯ',
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
			boxLabel: '������ѡ��״̬',
			handler: function (chk) {
				me.updataTreeMemory(empTree, chk.getValue());
			}
		}, {
			xtype: 'checkboxfield',
			boxLabel: '��ʾ��ְ',
			handler: function (chk) {
				me.searchData({ "partmark": chk.getValue() ? "1" : "" });
			}
		}, {
			xtype: 'checkboxfield',
			boxLabel: '��ʾ����',
			handler: function (chk) {
				me.searchData({ "proymark": chk.getValue() ? "1" : "" });
			}
		}, '->', {
			text: 'ȷ��',
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
							Ext.MessageBox.alert('', 'δѡ������.');
							return;
						}
					}
					me.close();
					me.callback(tmpdata);
				}
			}
		}, {
			text: 'ȡ��',
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
				Ext.MessageBox.alert('', 'û��ƥ������ڵ�.');
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
		else { return name + "<font color='blue'>[" + (assigntype == "1" ? "��" : "��") + "]</font>"; }
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

//----------��Ա����������ڿ�����----------
Ext.define("Ext.ng.PersonHelp", {
	extend: 'Ext.window.Window',
	alias: 'widget.personhelp',
	title: '��Ա����',
	closable: true,
	resizable: false,
	modal: true,
	width: 700,
	height: 480,
	nodeIndex: -1,
	border: false,
	callback: null,  //���ȷ����Ļص�����
	allowBank: true, //�����ؿ�ֵ
	bussType: "all", //ҵ������
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
			displayMsg: '�� {2} ������&nbsp;&nbsp;&nbsp;��ѡ {3} ������',
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
			title: "������Դ��",
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
					emptyText: '����ؼ��֣���λ���ڵ�',
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
				header: '���',
				flex: 1,
				sortable: false,
				menuDisabled: true,
				draggable: false,
				dataIndex: 'cno'
			}, {
				header: '����',
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
				header: '���',
				flex: 1,
				sortable: false,
				menuDisabled: true,
				draggable: false,
				dataIndex: 'cno'
			}, {
				header: '����',
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
				emptyText: '״̬',
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
				emptyText: '����',
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
				emptyText: '������/�������س���ѯ',
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
			boxLabel: '������ѡ��״̬',
			handler: function (chk) {
				me.updataTreeMemory(empTree, chk.getValue());
			}
		}, {
			xtype: 'checkboxfield',
			boxLabel: '��ʾ��ְ',
			handler: function (chk) {
				me.searchData({ "partmark": chk.getValue() ? "1" : "" });
			}
		}, {
			xtype: 'checkboxfield',
			boxLabel: '��ʾ����',
			handler: function (chk) {
				me.searchData({ "proymark": chk.getValue() ? "1" : "" });
			}
		}, '->', {
			text: 'ȷ��',
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
							Ext.MsgBox.sliDown("��ʾ", "δѡ������", me.el.dom, 200);
							return;
						}
					}
					me.close();
					me.callback(tmpdata);
				}
			}
		}, {
			text: 'ȡ��',
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
				Ext.MsgBox.sliDown("��ʾ", "û��ƥ������ڵ�", me.el.dom, 200);
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
		else { return name + "<font color='blue'>[" + (assigntype == "1" ? "��" : "��") + "]</font>"; }
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

