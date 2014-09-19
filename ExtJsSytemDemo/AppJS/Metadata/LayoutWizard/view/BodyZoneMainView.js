Ext.define("LayoutWizard.view.BodyZoneMainView", {
    extend: 'Ext.container.Container',
    xtype: 'bodyZoneMainView',
    region: 'center',
    layout: {
        type: 'vbox',
        padding: '5',
        align: 'stretch'
    },
    items:
    [
        {
            xtype: 'ngGridPanel',
            title: '表体实体',
            flex: 1,
            store: 'BodyEntitys',
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
                    id: 'sourceBodyPropertyGrid',
                    region: 'center',
                    layout: 'border',
                    title: '可用属性',
                    flex: 2,
                    store: 'SourceBodyPropertys',
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
                            id: "leftBodyPropertyButton",
                            scale: 'medium'
                        },
                        {
                            xtype: 'button',
                            text: "<",
                            width: 50,
                            id: "rightBodyPropertyButton",
                            scale: 'medium'
                        },
                        {
                            xtype: 'button',
                            text: ">>",
                            width: 50,
                            id: "leftAllBodyPropertyButton",
                            scale: 'medium'
                        },
                        {
                            xtype: 'button',
                            text: "<<",
                            width: 50,
                            id: "rightAllBodyPropertyButton",
                            scale: 'medium'
                        }
                    ]
                },
                {
                    xtype: 'ngGridPanel',
                    id:'targetBodyPropertyGrid',
                    region: 'center',
                    layout: 'border',
                    title: '启用属性',
                    flex: 2,
                    store: 'TargetBodyPropertys',
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
        this.isFirstLoadBodyZoneSetting = true;
    }
});