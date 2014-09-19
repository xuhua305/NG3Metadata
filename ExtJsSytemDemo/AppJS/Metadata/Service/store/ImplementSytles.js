Ext.define('Service.store.ImplementSytles', {
    extend: 'Ext.data.Store',
    fields: ['value', 'text'],
    data: [
        { "value": 1, "text": "非更新SQL语句" },
        { "value": 2, "text": "更新SQL语句" },
        { "value": 3, "text": "存储过程" },
        { "value": 4, "text": "表达式" },
        { "value": 5, "text": "程序集" }
    ]
});