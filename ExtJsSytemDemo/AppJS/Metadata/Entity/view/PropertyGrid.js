Ext.define("Entity.view.PropertyGrid", {
    extend: 'Ext.ng.GridPanel',
    xtype: 'propertyGrid',
    region: 'center',
    layout: 'border',
    multiSelect: false,
    enableColumnHide: false,
    enableColumnMove: false,
    buskey: 'id',
    otype: otype,
    columnLines: true,
    store: 'Propertys',
    columns: [
        Ext.create('Ext.grid.RowNumberer', { text: '行号', width: 35 }),
        {
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
            dataIndex: 'DisplayName',
            editor: {
                allowBlank: false
            }
        }, {
            header: '数据类型',
            flex: 1,
            sortable: true,
            dataIndex: 'DataType',
            editor: {
                allowBlank: false
            }
        }, {
            header: '主键',
            flex: 1,
            sortable: true,
            dataIndex: 'IsPrimaryKey',
            editor: {
                allowBlank: false
            }
        }, {
            header: '唯一',
            flex: 1,
            sortable: true,
            dataIndex: 'IsAllowRepeat',
            editor: {
                allowBlank: false
            }
        }, {
            header: '非空',
            flex: 1,
            sortable: true,
            dataIndex: 'IsAllowNull',
            editor: {
                allowBlank: false
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