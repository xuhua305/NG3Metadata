Ext.define("Entity.view.PropertyToolbar", {
    extend: 'Ext.ng.Toolbar',
    xtype: 'propertyToolbar',
    region: 'north',
    items: [
        {
            id: "addProperty",
            text: '新增',
            iconCls: 'add'
        },
        {
            id: "editProperty",
            text: '编辑',
            iconCls: 'cog_edit'
        },
        {
            id: "DeleteProperty",
            text: '删除',
            iconCls: 'delete'
        },
        {
            id: "ViewProperty",
            text: '查看',
            iconCls: 'icon-View'
        }
    ]
});