Ext.define('Service.model.InputParam', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Id',
        type: 'string'
    }, {
        name: 'Name',
        type: 'string'
    }, {
        name: 'DataType',
        type: 'int'
    }, {
        name: 'AssociateId',
        type: 'string'
    }]
});