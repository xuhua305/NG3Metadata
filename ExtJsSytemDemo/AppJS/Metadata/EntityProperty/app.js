Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

Ext.application({
    name: 'EntityProperty',
    extend: 'Ext.app.Application',
    appFolder: '../../AppJS/Metadata/EntityProperty',
    autoCreateViewport: true,
    stores: ['SourcePropertys', 'TargetPropertys'],
    controllers: ['EntityPropertyController']
});