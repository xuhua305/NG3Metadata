Ext.define("BizNode.view.Viewport", {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'border'
    },
    initComponent: function () {
        this.items = [Ext.create('BizNode.view.Toolbar'), Ext.create('BizNode.view.TabPanel')];
        this.callParent();
    }
});