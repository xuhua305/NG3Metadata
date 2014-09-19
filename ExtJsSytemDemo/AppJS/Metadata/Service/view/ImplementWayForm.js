Ext.define("Service.view.ImplementWayForm", {
    extend: 'Ext.ng.TableLayoutForm',
    xtype: 'implementWayForm',
    title: '实现方式',
    split: true,
    autoScroll: true,
    buskey: 'id',
    otype: otype,
    columnsPerRow: 3,
    fields: [
        {
            xtype: 'combo',
            store: 'ImplementSytles',
            labelWidth: 80,
            fieldLabel: '实现方式选择',
            queryMode: 'local',
            id: 'Style',
            name: 'Style',
            valueField: 'value',
            displayField: 'text'
        }, {
            xtype: 'ngText',
            fieldLabel: 'Dll名称',
            name: 'DllName'
        }, {
            xtype: 'ngText',
            fieldLabel: '类名称',
            name: 'ClassName'
        }, {
            xtype: 'ngText',
            fieldLabel: '方法名称',
            labelWidth: 80,
            name: 'MethodName'
        }, {
            xtype: 'ngTextArea',
            fieldLabel: '表达式',
            labelWidth: 80,
            name: 'Expression',
            colspan: 3
        }
    ]
});