Ext.define("LayoutWizard.view.Viewport", {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'border'
    },
    initComponent: function () {
        this.items = [Ext.create('LayoutWizard.view.CardPanel')];
        this.callParent();
    }
});