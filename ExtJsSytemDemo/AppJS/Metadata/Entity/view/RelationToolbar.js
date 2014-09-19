Ext.define("Entity.view.RelationToolbar", {
    extend: 'Ext.ng.Toolbar',
    xtype: 'relationToolbar',
    region: 'north',
    items: [
        {
            id: "addRelation",
            text: '增行',
            iconCls: 'add'
        },
        {
            id: "deleteRelation",
            text: '删行',
            iconCls: 'cross'
        }
    ]
});