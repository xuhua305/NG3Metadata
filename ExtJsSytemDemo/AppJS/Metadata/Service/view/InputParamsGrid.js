Ext.define("Service.view.InputParamsGrid", {
    extend: 'Ext.ng.GridPanel',
    xtype: 'inputParamsGrid',
    region: 'center',
    layout: 'border',
    multiSelect: false,
    enableColumnHide: false,
    enableColumnMove: false,
    buskey: 'id',
    otype: otype,
    columnLines: true,
    //store: 'InputParams',
    columns: [
        Ext.create('Ext.grid.RowNumberer', { text: '行号', width: 35 }),
        {
            header: '编号',
            flex: 1,
            dataIndex: 'Id',
            hidden: true
        },
        {
            header: '名称',
            flex: 1,
            sortable: true,
            dataIndex: 'Name',
            editor: {
                allowBlank: false
            }
        },
        {
            header: '数据类型',
            flex: 1,
            sortable: true,
            dataIndex: 'DataType',
            editor: {
                xtype: 'comboBox',
                store: dataTypeStoreEx,
                queryMode: 'local',
                id: 'DataType',
                name: 'DataType',
                valueField: 'value',
                displayField: 'text'
            },
            renderer: Ext.Function.bind(function (val, cell, record, rowIndex, colIndex, store) {
                var record = this.getAt(val);
                if (record == null) {
                    return val;
                } else {
                    return record.data.text; 
                }
            }, dataTypeStore)
        },
        {
            header: '关联',
            flex: 1,
            sortable: true,
            dataIndex: 'AssociateId',
            editor: {
                xtype: 'ngTreeComboBox',
                name: 'sourceEntityTreeCombo',
                valueField: 'id',
                displayField: 'text',
                treePanel: {
                    xtype: 'ngTreePanel',
                    treeFields: [{ name: 'text', type: 'string' }],
                    url: C_ROOT + 'GetEntityTree',
                    height: 200
                },
                effectiveNodeType: 'leaf',
                treeValueField: 'id',
                anchor: '95%'
            }
        }
    ],
    viewConfig: {
        forceFit: true,
        autoScroll: true,
        scrollOffset: 0
    },
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })]
});