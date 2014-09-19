Ext.define("EntityProperty.view.SourcePropertyGrid", {
    extend: 'Ext.ng.GridPanel',
    xtype: 'sourcePropertyGrid',
    region: 'center',
    layout: 'border',
    title: '可用属性',
    flex: 2,
    store: 'SourcePropertys',
    columnLines: true,
    buskey: 'id', 
    otype: 'add',
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
        }
    ],
    viewConfig: {
        forceFit: true,
        scrollOffset: 0
    }
});