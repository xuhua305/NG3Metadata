Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

Ext.application({
    name: 'Dictionary',
    extend: 'Ext.app.Application',
    appFolder: '../../AppJS/Metadata/Dictionary',
    autoCreateViewport: true,
    stores: ['Contents'],
    controllers: ['DictionaryController']
});