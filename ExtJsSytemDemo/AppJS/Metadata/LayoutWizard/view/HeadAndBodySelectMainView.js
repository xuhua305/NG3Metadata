Ext.define("LayoutWizard.view.HeadAndBodySelectMainView", {
    extend: 'Ext.container.Container',
    xtype: 'headAndBodySelectMainView',
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
            height: 40,
            items: [
                {
                    xtype: 'ngTreeComboBox',
                    name: 'sourceEntityTreeCombo',
                    valueField: 'id',
                    fieldLabel: '表头选择',
                    displayField: 'text',
                    treePanel: Ext.create('Ext.ng.TreePanel', {
                        treeFields: [{ name: 'text', type: 'string' }],
                        url: C_ROOT + 'GetEntityTree',
                        height: 200
                    }),
                    effectiveNodeType: 'leaf',
                    treeValueField: 'id',
                    anchor: '95%'
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
            items: [
                {
                    xtype: 'ngGridPanel',
                    name: 'sourceEntityGrid',
                    region: 'center',
                    layout: 'border',
                    title: '可用明细表',
                    flex: 2,
                    store: 'SourceEntitys',
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
                            name: "leftBodyButton",
                            scale: 'medium'
                        },
                        {
                            xtype: 'button',
                            text: "<",
                            width: 50,
                            name: "rightBodyButton",
                            scale: 'medium'
                        },
                        {
                            xtype: 'button',
                            text: ">>",
                            width: 50,
                            name: "leftAllBodyButton",
                            scale: 'medium'
                        },
                        {
                            xtype: 'button',
                            text: "<<",
                            width: 50,
                            name: "rightAllBodyButton",
                            scale: 'medium'
                        }
                    ]
                },
                {
                    xtype: 'ngGridPanel',
                    name: 'targetEntityGrid',
                    region: 'center',
                    layout: 'border',
                    title: '启用明细表',
                    flex: 2,
                    store: 'TargetEntitys',
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
    ]
});