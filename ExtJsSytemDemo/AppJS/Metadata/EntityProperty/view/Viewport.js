Ext.define("EntityProperty.view.Viewport", {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'border'
    },
    initComponent: function () {
        this.items = [Ext.create('EntityProperty.view.Toolbar'), Ext.create('EntityProperty.view.TabPanel')];
        this.callParent();
    }
});