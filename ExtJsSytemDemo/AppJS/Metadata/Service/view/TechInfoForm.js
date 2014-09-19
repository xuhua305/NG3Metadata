Ext.define("Service.view.TechInfoForm", {
    extend: 'Ext.ng.TableLayoutForm',
    xtype: 'techInfoForm',
    title: '技术信息',
    split: true,
    autoScroll: true,
    buskey: 'id',
    otype: otype,
    columnsPerRow: 3,
    fields: [{
        xtype: 'ngText',
        fieldLabel: '发布地址',
        name: 'PublishAddress'
    }, {
        xtype: 'combo',
        store: yesAndNo,
        fieldLabel: '异步访问',
        queryMode: 'local',
        id: 'IsAsynchronous',
        name: 'IsAsynchronous',
        valueField: 'value',
        displayField: 'text'
    }]
});