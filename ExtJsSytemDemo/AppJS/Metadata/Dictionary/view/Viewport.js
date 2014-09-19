Ext.define("Dictionary.view.Viewport", {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'border'
    },
    initComponent: function () {
        this.items = [Ext.create('Dictionary.view.Toolbar'), Ext.create('Dictionary.view.TabPanel')];
        this.callParent();
    }
});