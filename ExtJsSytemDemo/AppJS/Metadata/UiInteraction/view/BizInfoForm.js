Ext.define("UiInteraction.view.BizInfoForm", {
    extend: 'Ext.ng.TableLayoutForm',
    xtype: 'bizInfoForm',
    title: '业务信息',
    split: true,
    autoScroll: true,
    buskey: 'id',
    otype: otype,
    columnsPerRow: 3,
    fields: [{
        xtype: 'combo',
        store: industryStyleStore,
        labelWidth: 80,
        fieldLabel: '行业化分类',
        queryMode: 'local',
        id: 'IndustryStyle',
        name: 'IndustryStyle',
        valueField: 'value',
        displayField: 'text'
    }, {
        id: 'Description',
        xtype: 'ngTextArea',
        fieldLabel: '业务描述',
        name: 'Description',
        labelWidth: 80,
        colspan: 3
    }]
});