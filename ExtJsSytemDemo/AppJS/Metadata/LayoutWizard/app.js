Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

Ext.application({
    name: 'LayoutWizard',
    extend: 'Ext.app.Application',
    appFolder: '../../AppJS/Metadata/LayoutWizard',
    autoCreateViewport: true,
    stores: ['SourceEntitys', 'TargetEntitys', 'HeadTabs', 'SourceHeadPropertys', 'TargetHeadPropertys', 'BodyEntitys', 'SourceBodyPropertys', 'TargetBodyPropertys'],
    controllers: ['LayoutWizardController']
});