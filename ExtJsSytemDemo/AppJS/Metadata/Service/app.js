Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

Ext.application({
    name: 'Service',
    extend: 'Ext.app.Application',
    appFolder: '../../AppJS/Metadata/Service',
    autoCreateViewport: true,
    stores: ['InputParams', 'ImplementSytles'],
    controllers: ['ServiceController'],
    init: function () {
        console.log("Service1 app init");
    },
    launch: function () {
        console.log("Service1 app launch");
    }
});