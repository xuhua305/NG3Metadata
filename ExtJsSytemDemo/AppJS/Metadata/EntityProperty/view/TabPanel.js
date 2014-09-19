Ext.define("EntityProperty.view.TabPanel", {
    extend: 'Ext.tab.Panel',
    xtype: 'mainTabPanel',
    region: 'center',
    enableTabScroll: true,
    activeTab: 0,
    defaults: {
        style: {
            'padding': '0px'
        }
    },
    items: [
        {
            xtype: 'baseInfoForm'
        },
        {
            xtype: 'bizInfoForm'
        },
        {
            xtype: 'techInfoForm'
        },
        {
            xtype: 'helpInfoPanel'
        }
    ]
});