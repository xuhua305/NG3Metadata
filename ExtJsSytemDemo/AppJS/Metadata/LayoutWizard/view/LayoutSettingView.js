Ext.define("LayoutWizard.view.LayoutSettingView", {
    extend: 'Ext.container.Container',
    xtype: 'layoutSettingView',
    layout: 'border',
    items:
    [
        {
            xtype: 'ngTableLayoutForm',
            name: 'treeForm',
            otype: 'add',
            region: 'west',
            flex: 0.3,
            columnsPerRow: 3,
            fields: [{
                xtype: 'ngCheckbox',
                fieldLabel: '树形查询导航区域',
                labelWidth:110,
                id: 'treeZone',
                name: 'treeZone',
                colspan: 3
            }]
        },
        {
            xtype: 'container',
            region: 'center',
            layout: {
                type: 'vbox',
                padding: '5',
                align: 'stretch'
            },
            items:
            [
                {
                    xtype: 'ngTableLayoutForm',
                    name: 'toolbarForm',
                    otype: 'add',
                    flex: 0.3,
                    columnsPerRow: 3,
                    fields: [{
                        xtype: 'ngCheckbox',
                        fieldLabel: '工具栏区域',
                        labelWidth: 110,
                        name: 'toolbarZone',
                        id:'toolbarZone',
                        colspan: 3
                    }]
                },
                {
                    xtype: 'ngTableLayoutForm',
                    name: 'queryForm',
                    otype: 'add',
                    flex: 0.5,
                    columnsPerRow: 3,
                    fields: [{
                        id: 'queryZone',
                        xtype: 'ngCheckbox',
                        fieldLabel: '查询区域(可折叠)',
                        labelWidth: 110,
                        name: 'queryZone',
                        colspan: 3
                    }]
                },
                {
                    xtype: 'ngTableLayoutForm',
                    name: 'contentForm',
                    otype: 'add',
                    flex: 1,
                    columnsPerRow: 3,
                    fields: [{
                        id: 'contentZone',
                        xtype: 'ngCheckbox',
                        fieldLabel: '内容区域',
                        name: 'contentZone',
                        colspan: 3
                    }, {
                        xtype: 'combo',
                        store: uiInteractionStyleStore,
                        fieldLabel: '界面交互风格',
                        labelWidth: 110,
                        queryMode: 'local',
                        id: 'UiInteractionStyle',
                        name: 'UiInteractionStyle',
                        valueField: 'value',
                        displayField: 'text'
                    }]
                }
            ]
        }
    ]
});