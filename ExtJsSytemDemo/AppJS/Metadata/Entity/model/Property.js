Ext.define('Entity.model.Property', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Id',
        type: 'string'
    }, {
        name: 'Name',
        type: 'string'
    }, {
        name: 'DisplayName',
        type: 'string'
    }, {
        name: 'DataType',
        type: 'int'
    }, {
        name: 'IsPrimaryKey',
        type: 'bool'
    }, {
        name: 'IsAllowRepeat',
        type: 'bool'
    }, {
        name: 'IsAllowNull',
        type: 'bool'
    }]
});