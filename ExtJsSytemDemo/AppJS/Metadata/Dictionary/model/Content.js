Ext.define('Dictionary.model.Content', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Id',
        type: 'string'
    }, {
        name: 'ContentItem',
        type: 'string'
    }, {
        name: 'Description',
        type: 'string'
    }]
});