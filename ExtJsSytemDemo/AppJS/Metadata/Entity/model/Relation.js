Ext.define('Entity.model.Relation', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Id',
        type: 'string'
    }, {
        name: 'RelationType',
        type: 'string'
    }, {
        name: 'SourcePropertyId',
        type: 'string'
    }, {
        name: 'TargetEntityId',
        type: 'string'
    }, {
        name: 'TargetPropertyId',
        type: 'string'
    }]
});