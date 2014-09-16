Ext.define('Ext.ng.LanguageRefresher', {
    mixins: {
        observable: 'Ext.util.Observable'
    },
    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);

        this.addEvents('RefreshLanguage');
    }
});

var languageNum = 0;
Ext.define('Ext.ng.languageWin', {
    constructor: function () {
        languageNum++;
        var me = this;
        me.languageInnerNum = languageNum;
        var languageStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: [
                { 'value': 'zh-CN', 'text': '中文' },
                { 'value': 'en-US', 'text': '英文' }
            ]
        });

        var languageDrop = Ext.create('Ext.form.ComboBox', {
            store: languageStore,
            queryMode: 'local',
            id: 'CultureName' + me.languageInnerNum,
            name: 'CultureName',
            valueField: 'value',
            displayField: 'text'
        });

        var renderLanguageDrop = function (val, cell, record, rowIndex, colIndex, store) {
            var record = this.getAt(val);
            if (record == null) {
                return val;
            } else {
                return record.data.text; // 获取record中的数据集中的display字段的值 
            }
        };

        var languageToolbar = Ext.create('Ext.ng.Toolbar',
                        {
                            region: 'north',
                            //renderTo: 'toolbar',
                            border: false,
                            //split: true,
                            height: 26,
                            minSize: 26,
                            maxSize: 26,
                            items: [
                                {
                                    id: "addRow" + me.languageInnerNum,
                                    text: '添加语言',
                                    iconCls: 'add'
                                },
                                {
                                    id: "deleteRow" + me.languageInnerNum,
                                    text: '删除语言',
                                    iconCls: 'cross'
                                }
                            ]
                        });

        Ext.define('languageGridModel', {                //编辑状态下,状态列的下拉菜单的 model
            extend: 'Ext.data.Model',
            fields: [{
                name: 'CultureName',
                type: 'string'
            }, {
                name: 'Value',
                type: 'string'
            }]
        });

        var languageGridStore = Ext.create('Ext.data.Store', {
            model: 'languageGridModel'
        });

        var languageCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        var languageGrid = Ext.create('Ext.ng.GridPanel', {

            region: 'center',
            layout: 'border',
            flex: 2,
            store: languageGridStore,
            columnLines: true,
            buskey: 'CultureName', //对应的业务表主键
            otype: 'add', //操作类型,add||edit
            layout: {
                align: 'stretch'
            },
            columns: [Ext.create('Ext.grid.RowNumberer', { text: '行号', width: 35 }),
                {
                    header: '语言',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'CultureName',
                    editor: languageDrop,
                    renderer: Ext.Function.bind(renderLanguageDrop, languageStore)
                }, {
                    header: '内容',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'Value',
                    editor: {
                        allowBlank: false
                    }
                }],
            viewConfig: {
                forceFit: true,
                scrollOffset: 0
            },
            //forceFit: true,
            plugins: [languageCellEditing]
        });

        var languageInfoPanel = Ext.create('Ext.ng.FormPanel', {
            region: 'center',
            flex: 2,
            items: [languageToolbar, languageGrid]
        });

        var languageWin = Ext.create('widget.window', {
            title: '多语言设置',
            closable: true,
            closeAction: 'hide',
            width: 600,
            minWidth: 350,
            height: 350,
            layout: {
                type: 'border',
                padding: 5
            },
            items: [languageInfoPanel]
        });

        //增行
        languageToolbar.items.get('addRow'+me.languageInnerNum).on('click', function () {
            var data = [{
                'CultureName': '',
                'Value': ''
            }];

            var count = languageGridStore.getCount();
            languageGridStore.insert(count, data);
            languageGrid.getSelectionModel().select(count);
        });

        //删行
        languageToolbar.items.get('deleteRow' + me.languageInnerNum).on('click', function () {
            //;
            var data = languageGrid.getSelectionModel().getSelection();
            if (data.length > 0) {
                Ext.Array.each(data, function (record) {
                    languageGridStore.remove(record); //前端删除

                });

            }

        });
        
        languageWin.on('beforehide', function (the, eOpts) {
            languageGrid.getView().focusRow(0);
            var frame = $GetWFrame();
            if (frame) {
                var listref = frame.ListObserver.get('list');
                listref.fireEvent('RefreshLanguage');
            }

        });

        me.languageGridStore = languageGridStore;
        me.languageGrid = languageGrid;
        me.languageWin = languageWin;

    },

    showLanguageInfoWindow: function () {
        var me = this;
        if (me.languageWin) {
            me.languageWin.show();
        }
    },
    
    getCurrentLanguageValue:function() {
        var me = this;
        if (me.languageGrid) {
            var selectionModel = me.languageGrid.getSelectionModel();
            var selectedNodes = selectionModel.selected.items;
            if (selectedNodes.length > 0) {
                var selectedNode = selectedNodes[0];
                return selectedNode.data.Value;
            }
        }
        
        return '';
    },
    
    getLanguageGridInfo: function () {
        var me = this;
        if (me.languageGrid) {
            var gridData = me.languageGrid.getAllGridData();
            return gridData;
        }
        
        return '';
    },
    
    initLanguageGridInfo: function (data) {
        var me = this;
        if (me.languageGridStore) {
            me.languageGridStore.insert(me.languageGridStore.getCount(), data);
        }
    }
   


})