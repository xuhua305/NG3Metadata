Ext.define("EntityProperty.view.TechInfoForm", {
    extend: 'Ext.ng.TableLayoutForm',
    xtype: 'techInfoForm',
    title: '技术信息',
    split: true,
    autoScroll: true,
    buskey: 'id',
    otype: otype,
    columnsPerRow: 3,
    fields: [{
        xtype: 'combo',
        store: yesAndNo,
        fieldLabel: '允许修改',
        queryMode: 'local',
        id: 'IsALlowEdit',
        name: 'IsALlowEdit',
        valueField: 'value',
        displayField: 'text'
    }, {
        id: 'EditMask',
        xtype: 'ngText',
        fieldLabel: '显示格式',
        mustInput: true,
        name: 'EditMask'
    }]
});