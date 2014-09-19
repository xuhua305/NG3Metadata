Ext.define("BizNode.view.Toolbar", {
    extend: 'Ext.ng.Toolbar',
    xtype:'ngtoolbar',
    region:'north',
    ngbuttons: ['save', "->", 'close']
});