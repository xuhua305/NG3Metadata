Ext.define("Service.view.TabPanel", {
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
            layout: 'border',
            title: '输入参数',
            items: [
                {
                    xtype: 'inputToolbar'
                },
                {
                    xtype: 'inputParamsGrid'
                }
            ]
        },
        {
            xtype: 'outputParamForm'
        },
        {
            xtype: 'implementWayForm'
        }
    ]
});