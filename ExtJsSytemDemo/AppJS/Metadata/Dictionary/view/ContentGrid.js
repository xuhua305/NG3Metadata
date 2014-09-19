Ext.define("Dictionary.view.ContentGrid", {
    extend: 'Ext.ng.GridPanel',
    xtype: 'contentGrid',
    region: 'center',
    layout: 'border',
    multiSelect: false,
    enableColumnHide: false,
    enableColumnMove: false,
    buskey: 'id',
    otype: otype,
    columnLines: true,
    store: 'Contents',
    columns: [Ext.create('Ext.grid.RowNumberer', { text: '行号', width: 35 }),
                    {
                        header: '编号',
                        flex: 1,
                        dataIndex: 'Id',
                        hidden: true
                    }, {
                        header: '内容',
                        flex: 1,
                        sortable: true,
                        dataIndex: 'ContentItem',
                        editor: {
                            allowBlank: false
                        }
                    }, {
                        header: '描述',
                        flex: 1,
                        sortable: true,
                        dataIndex: 'Description',
                        editor: {
                            allowBlank: true
                        }
                    }],
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