Ext.define("LayoutWizard.view.HeadZoneMainView", {
    extend: 'Ext.container.Container',
    xtype: 'headZoneMainView',
    region: 'center',
    layout: {
        type: 'vbox',
        padding: '5',
        align: 'stretch'
    },
    items:
    [
        {
            xtype: 'container',
            flex: 1,
            layout: 'border',
            items:
            [
                {
                    xtype: 'toolbar',
                    region: 'north',
                    border: false,
                    height: 26,
                    minSize: 26,
                    maxSize: 26,
                    items: [
                        {
                            id: "addTab",
                            text: '增行',
                            iconCls: 'add'
                        },
                        {
                            id: "deleteTab",
                            text: '删行',
                            iconCls: 'cross'
                        }
                    ]
                },
                {
                    xtype: 'ngGridPanel',
                    id:'headTabGrid',
                    region: 'center',
                    flex: 2,
                    store: 'HeadTabs',
                    columnLines: true,
                    buskey: 'id', 
                    otype: 'add',
                    layout: 'border',
                    columns: [Ext.create('Ext.grid.RowNumberer', { text: '行号', width: 35 }),
                        {
                            header: '名称',
                            flex: 1,
                            sortable: true,
                            dataIndex: 'TabName',
                            editor: {
                                allowBlank: false
                            }
                        }
                    ],
                    viewConfig: {
                        forceFit: true,
                        scrollOffset: 0
                    },
                    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit: 1
                    })]
                }
            ]
        },
        {
            xtype: 'container',
            region: 'center',
            flex: 1,
            layout: {
                type: 'hbox',
                padding: '5',
                align: 'stretch'
            },
            items:
            [
                {
                    xtype: 'ngGridPanel',
                    id: 'sourceHeadPropertyGrid',
                    region: 'center',
                    layout: 'border',
                    title: '可用属性',
                    flex: 2,
                    store: 'SourceHeadPropertys',
                    columnLines: true,
                    buskey: 'id',
                    otype: 'add',
                    layout: {
                        align: 'stretch'
                    },
                    columns: [Ext.create('Ext.grid.RowNumberer', { text: '行号', width: 35 }),
                        {
                            header: '编号',
                            flex: 1,
                            sortable: true,
                            dataIndex: 'Id',
                            editor: {
                                allowBlank: false
                            }
                        }, {
                            header: '名称',
                            flex: 1,
                            sortable: true,
                            dataIndex: 'Name',
                            editor: {
                                allowBlank: false
                            }
                        }, {
                            header: '显示名称',
                            flex: 1,
                            sortable: true,
                            dataIndex: 'CurrentDisplayName',
                            editor: {
                                allowBlank: false
                            }
                        }],
                    viewConfig: {
                        forceFit: true,
                        scrollOffset: 0
                    }
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        padding: '5',
                        pack: 'center',
                        align: 'center'
                    },
                    flex: 0.3,
                    items:
                    [
                        {
                            xtype: 'button',
                            text: ">",
                            width: 50,
                            id: "leftHeadPropertyButton",
                            scale: 'medium'
                        },
                        {
                            xtype: 'button',
                            text: "<",
                            width: 50,
                            id: "rightHeadPropertyButton",
                            scale: 'medium'
                        },
                        {
                            xtype: 'button',
                            text: ">>",
                            width: 50,
                            id: "leftAllHeadPropertyButton",
                            scale: 'medium'
                        },
                        {
                            xtype: 'button',
                            text: "<<",
                            width: 50,
                            id: "rightAllHeadPropertyButton",
                            scale: 'medium'
                        }
                    ]
                },
                {
                    xtype: 'ngGridPanel',
                    id: 'targetHeadPropertyGrid',
                    region: 'center',
                    layout: 'border',
                    title: '启用属性',
                    flex: 2,
                    store: 'TargetHeadPropertys',
                    columnLines: true,
                    buskey: 'id',
                    otype: 'add',
                    layout: {
                        align: 'stretch'
                    },
                    columns: [Ext.create('Ext.grid.RowNumberer', { text: '行号', width: 35 }),
                        {
                            header: '编号',
                            flex: 1,
                            sortable: true,
                            dataIndex: 'Id',
                            editor: {
                                allowBlank: false
                            }
                        }, {
                            header: '名称',
                            flex: 1,
                            sortable: true,
                            dataIndex: 'Name',
                            editor: {
                                allowBlank: false
                            }
                        }, {
                            header: '显示名称',
                            flex: 1,
                            sortable: true,
                            dataIndex: 'CurrentDisplayName',
                            editor: {
                                allowBlank: false
                            }
                        }],
                    viewConfig: {
                        forceFit: true,
                        scrollOffset: 0
                    }
                }
            ]
        }
    ],
    initComponent: function () {
        this.callParent();
        this.isFirstLoadHeadZoneSetting = true;
    }
});