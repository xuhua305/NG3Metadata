Ext.define("UiInteraction.view.Toolbar", {
    extend: 'Ext.ng.Toolbar',
    xtype: 'maintoolbar',
    region: 'north',
    ngbuttons: [
        'save', { id: "import", text: "移动应用型" }, { id: "compute", text: "办公表单型" }, { id: "config", text: "业务表单型" }, "->",'close'
    ]
});