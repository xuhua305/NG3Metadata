Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {

    }
});

Ext.application({
    name: 'MainTree',
    extend: 'Ext.app.Application',
    appFolder: '../../AppJS/Metadata/MainTree',
    autoCreateViewport: true,
    models: [],
    stores: ['TreeStore'],
    controllers: ['MainTreeController'],
    init: function () {
        console.log("MainTree app init");
    },
    launch: function () {
        console.log("MainTree app launch");
    }
});
