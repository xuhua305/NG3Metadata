Ext.define("Entity.view.TabPanel", {
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
            title: '字段维护',
            items: [
                {
                    xtype: 'propertyToolbar'
                },
                {
                    xtype: 'propertyGrid'
                }
            ]
        },
        {
            layout: 'border',
            title: '实体关系',
            items: [
                {
                    xtype: 'relationToolbar'
                },
                {
                    xtype: 'relationGrid'
                }
            ]
        },
        {
            xtype: 'entityHelpForm'
        }
    ]
});