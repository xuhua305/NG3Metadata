Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

Ext.application({
    name: 'Entity',
    extend: 'Ext.app.Application',
    appFolder: '../../AppJS/Metadata/Entity',
    autoCreateViewport: true,
    stores: ['Relations', 'Propertys'],
    controllers: ['EntityController']
});