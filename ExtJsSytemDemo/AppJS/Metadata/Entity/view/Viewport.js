Ext.define("Entity.view.Viewport", {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'border'
    },
    initComponent: function () {
        this.items = [Ext.create('Entity.view.Toolbar'), Ext.create('Entity.view.TabPanel')];
        this.callParent();
    }
});