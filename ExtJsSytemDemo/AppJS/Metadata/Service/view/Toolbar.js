Ext.define("Service.view.Toolbar", {
    extend: 'Ext.ng.Toolbar',
    xtype: 'maintoolbar',
    region: 'north',
    ngbuttons: [
        'save', "->", 'close'
    ]
});