Ext.define("Entity.view.Toolbar", {
    extend: 'Ext.ng.Toolbar',
    xtype: 'maintoolbar',
    region: 'north',
    ngbuttons: [
        'save', { id: "export", text: "同步表结构", iconCls: 'icon-Export' }, "->", 'close'
    ]
});