Ext.define("MainTree.view.Viewport", {
    extend: 'Ext.container.Viewport',
    requires: [],
    layout: {
        type: 'border'
    },
    initComponent: function () {
        this.items = [Ext.create('MainTree.view.TabPanel'), Ext.create('MainTree.view.TreePanel')];
        this.callParent();
    }
});