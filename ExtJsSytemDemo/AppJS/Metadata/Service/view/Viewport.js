Ext.define("Service.view.Viewport", {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'border'
    },
    initComponent:function () {
        this.items = [Ext.create('Service.view.Toolbar'), Ext.create('Service.view.TabPanel')];
        this.callParent();
    }
});