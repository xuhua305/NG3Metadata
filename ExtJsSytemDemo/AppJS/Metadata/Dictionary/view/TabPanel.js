Ext.define("Dictionary.view.TabPanel", {
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
            layout: 'border',
            title: '技术信息'
        },
        {
            layout: 'border',
            title: '字典内容',
            items: [
                {
                    xtype: 'childToolbar'
                },
                {
                    xtype: 'contentGrid'
                }
            ]
        }
    ]
});