Ext.define("Service.view.InputToolbar", {
    extend: 'Ext.ng.Toolbar',
    xtype: 'inputToolbar',
    region: 'north',
    items: [
        {
            id: "addInputRow",
            text: '增行',
            iconCls: 'add'
        },
        {
            id: "deleteInputRow",
            text: '删行',
            iconCls: 'cross'
        }
    ]
});