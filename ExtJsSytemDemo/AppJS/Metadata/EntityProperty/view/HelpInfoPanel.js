Ext.define("EntityProperty.view.HelpInfoPanel", {
    extend: 'Ext.panel.Panel',
    title:'帮助信息',
    xtype: 'helpInfoPanel',
    region: 'center',
    layout: 'border',
    items:
    [
        {
            xtype: 'container',
            height:40,
            region:'north',
            items: [
                {
                    xtype: 'ngTreeComboBox',
                    name: 'helpEntityTreeCombo',
                    valueField: 'id',
                    displayField: 'text',
                    treePanel: Ext.create('Ext.ng.TreePanel', {
                        treeFields: [{ name: 'text', type: 'string' }
                        ],
                        url: C_ROOT + 'GetEntityTree',
                        height: 200
                    }),
                    effectiveNodeType: 'leaf',
                    treeValueField: 'id',
                    width:200,
                    anchor: '95%',
                    style: {
                        'marginLeft': '6px',
                        'marginTop': '10px'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            region: 'center',
            layout: {
                type: 'hbox',
                padding: '5',
                align: 'stretch'
            },
            items:
            [
                {
                    xtype:'sourcePropertyGrid'
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        padding: '5',
                        pack: 'center',
                        align: 'center'
                    },
                    flex: 0.3,
                    items:
                    [
                        {
                            xtype: 'button',
                            text: ">",
                            width: 50,
                            listeners: {
                                "click": function () {

                                }
                            },
                            id: "leftBodyPropertyButton",
                            scale: 'medium'

                        },
                        {
                            xtype: 'button',
                            text: "<",
                            width: 50,
                            listeners: {
                                "click": function () {

                                }
                            },
                            id: "rightBodyPropertyButton",
                            scale: 'medium'
                        }
                    ]
                },
                {
                    xtype: 'targetPropertyGrid'
                }
            ]
        }
    ]
});