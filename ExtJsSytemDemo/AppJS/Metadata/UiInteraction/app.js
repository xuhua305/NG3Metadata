Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

Ext.application({
    name: 'UiInteraction',
    extend: 'Ext.app.Application',
    appFolder: '../../AppJS/Metadata/UiInteraction',
    autoCreateViewport: true,
    //stores: ['InputParams', 'ImplementSytles'],
    controllers: ['UiInteractionController'],
    init: function () {
        console.log("UiInteraction app init");
    },
    launch: function () {
        console.log("UiInteraction app launch");
    }
});