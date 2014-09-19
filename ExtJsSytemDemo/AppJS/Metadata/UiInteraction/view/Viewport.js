Ext.define("UiInteraction.view.Viewport", {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'border'
    },
    initComponent: function () {
        this.items = [Ext.create('UiInteraction.view.Toolbar'), Ext.create('UiInteraction.view.TabPanel')];
        this.callParent();
    }
});