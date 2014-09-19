Ext.define("BizNode.view.TabPanel", {
    extend: 'Ext.tab.Panel',
    xtype: 'bizNodeTabPanel',
    region: 'center',
    enableTabScroll: true,
    activeTab: 0,
    defaults:{
        style: {
            'padding':'0px'
        }
    },
    items: [
        {
            xtype: 'baseNodeInfoForm'
        },
        {
            xtype: 'bizNodeInfoForm'
        }
    ]
});