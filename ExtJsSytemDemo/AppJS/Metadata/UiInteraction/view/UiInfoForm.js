Ext.define("UiInteraction.view.UiInfoForm", {
    extend: 'Ext.ng.TableLayoutForm',
    xtype: 'uiInfoForm',
    title: '界面信息',
    split: true,
    autoScroll: true,
    buskey: 'id',
    otype: otype,
    columnsPerRow: 3,
    fields: [{
        xtype: 'combo',
        store: uiInteractionStyleStore,
        labelWidth: 80,
        fieldLabel: '界面交互风格',
        queryMode: 'local',
        id: 'UiInteractionStyle',
        name: 'UiInteractionStyle',
        valueField: 'value',
        displayField: 'text'
    }]
});