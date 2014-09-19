Ext.define("BizNode.view.BizNodeInfoForm", {
    extend: 'Ext.ng.TableLayoutForm',
    xtype: 'bizNodeInfoForm',
    title: '业务信息',
    split: true,
    autoScroll: true,
    buskey: 'id',
    otype: otype,
    columnsPerRow: 3,
    fieldDefaults: {
        labelWidth: 70,
        anchor:'100%'
    },
    fields: [{
        xtype: 'combo',
        store: industryStyleStore,
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
        colspan: 3
    }]
});