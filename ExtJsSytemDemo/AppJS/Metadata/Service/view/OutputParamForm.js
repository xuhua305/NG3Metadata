Ext.define("Service.view.OutputParamForm", {
    extend: 'Ext.ng.TableLayoutForm',
    xtype: 'outputParamForm',
    title: '输出参数',
    split: true,
    autoScroll: true,
    buskey: 'id',
    otype: otype,
    columnsPerRow: 3,
    fields: [{
        xtype: 'ngText',
        fieldLabel: '名称',
        name: 'Name'
    }, {
        xtype: 'combo',
        store: dataTypeStoreEx,
        fieldLabel: '数据类型',
        queryMode: 'local',
        id: 'DataType',
        name: 'DataType',
        valueField: 'value',
        displayField: 'text'
    },
    {
        xtype: 'ngTreeComboBox',
        name: 'AssociateId',
        fieldLabel: '名称',
        valueField: 'id',
        displayField: 'text',
        treePanel: Ext.create('Ext.ng.TreePanel',{
                treeFields: [{ name: 'text', type: 'string' }],
                url: C_ROOT + 'GetEntityTree',
                height: 200
            }),
        effectiveNodeType: 'leaf',
        treeValueField: 'id',
        anchor: '95%'
    }
    ]
});