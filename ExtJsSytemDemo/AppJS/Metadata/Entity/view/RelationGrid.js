Ext.define("Entity.view.RelationGrid", {
    extend: 'Ext.ng.GridPanel',
    xtype: 'relationGrid',
    region: 'center',
    layout: 'border',
    multiSelect: false,
    enableColumnHide: false,
    enableColumnMove: false,
    buskey: 'id',
    otype: otype,
    columnLines: true,
    store: 'Relations',
    columns: [
        Ext.create('Ext.grid.RowNumberer', { text: '行号', width: 35 }),
        {
            header: '关系',
            flex: 1,
            sortable: true,
            dataIndex: 'RelationType',
            editor: {
                xtype:'comboBox',
                store: relationStyleSore,
                queryMode: 'local',
                id: 'RelationType',
                name: 'RelationType',
                valueField: 'value',
                displayField: 'text'
            },
            renderer: Ext.Function.bind(function (val, cell, record, rowIndex, colIndex, store) {
                var record = this.getAt(val);
                if (record == null) {
                    return val;
                } else {
                    return record.data.text; // 获取record中的数据集中的display字段的值 
                }
            }, relationStyleSore)
        }, {
            header: '源字段',
            flex: 1,
            sortable: true,
            dataIndex: 'SourcePropertyId',
            editor: {
                xtype: 'ngComboBox',
                valueField: "id",
                displayField: 'displayname',
                helpid: 'metadataEntity',
                queryMode: 'remote',     
                name: 'metadataEntity',
                rootPath: '../../',
                listFields: 'name,displayname',
                listHeadTexts: '名称,显示名称'
            }
        }, {
            header: '目标表',
            flex: 1,
            sortable: true,
            dataIndex: 'TargetEntityId',
            editor: {
                xtype:'ngTreeComboBox',
                name: 'targetEntityTreeCombo',
                valueField: 'id',
                displayField: 'text',
                treePanel: {
                    xtype: 'ngTreePanel',
                    treeFields: [{ name: 'text', type: 'string' }
                    ],
                    url: C_ROOT + 'GetEntityTree',
                    height: 200
                },
                effectiveNodeType: 'leaf', 
                treeValueField: 'id',
                anchor: '95%'
            }
        }, {
            header: '目标字段',
            flex: 1,
            sortable: true,
            dataIndex: 'TargetPropertyId',
            editor: {
                xtype: 'ngComboBox',
                valueField: "id",
                displayField: 'displayname',
                helpid: 'metadataEntity',
                queryMode: 'remote',     
                name: 'metadataEntity',
                rootPath: '../../',
                listFields: 'name,displayname',
                listHeadTexts: '名称,显示名称'
            }
        }
    ],
    viewConfig: {
        forceFit: true,
        autoScroll: true,
        scrollOffset: 0
    },
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })],
    initComponent: function () {
        this.callParent();
    }
});