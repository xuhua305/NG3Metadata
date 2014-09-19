Ext.define("Dictionary.view.ChildToolbar", {
    extend: 'Ext.ng.Toolbar',
    xtype: 'childToolbar',
    region: 'north',
    ngbuttons: ['addrow', "deleterow"]
});