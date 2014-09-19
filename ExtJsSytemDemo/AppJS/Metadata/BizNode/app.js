Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

Ext.application({
    name: 'BizNode',
    extend: 'Ext.app.Application',
    appFolder: '../../AppJS/Metadata/BizNode',
    autoCreateViewport: true,
    models: [],
    stores: [],
    controllers: ['BizNodeController']
});