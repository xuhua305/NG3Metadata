Ext.define('EntityProperty.model.HelpProperty', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Id',
        type: 'string'
    }, {
        name: 'Name',
        type: 'string'
    }, {
        name: 'CurrentDisplayName',
        type: 'string'
    }]
});