

var treeForm = Ext.create('Ext.ng.TableLayoutForm', {
    buskey: 'id',
    otype: 'add',
    region: 'west',
    flex: 0.2,
    columnsPerRow: 3,
    fields: [{
        id: 'treeZone',
        xtype: 'ngCheckbox',
        fieldLabel: '树形查询导航区域',
        name: 'treeZone',
        colspan: 3
    }]
});

var toolbarForm = Ext.create('Ext.ng.TableLayoutForm', {
    buskey: 'id',
    otype: 'add',
    flex: 0.3,
    columnsPerRow: 3,
    fields: [{
        id: 'toolbarZone',
        xtype: 'ngCheckbox',
        fieldLabel: '工具栏区域',
        name: 'toolbarZone',
        colspan: 3
    }]
});

var queryForm = Ext.create('Ext.ng.TableLayoutForm', {
    buskey: 'id',
    otype: 'add',
    flex: 0.5,
    columnsPerRow: 3,
    fields: [{
        id: 'queryZone',
        xtype: 'ngCheckbox',
        fieldLabel: '查询区域(可折叠)',
        name: 'queryZone',
        colspan: 3
    }]
});

//var headForm = Ext.create('Ext.ng.TableLayoutForm', {
//    buskey: 'id',
//    otype: 'add',
//    flex: 1,
//    columnsPerRow: 3,
//    fields: [{
//        id: 'headZone',
//        xtype: 'ngCheckbox',
//        fieldLabel: '表头区域(可以多Tab页)',
//        name: 'headZone',
//        colspan: 3
//    }]
//});

var contentForm = Ext.create('Ext.ng.TableLayoutForm', {
    buskey: 'id',
    otype: 'add',
    flex: 1,
    columnsPerRow: 3,
    fields: [{
        id: 'contentZone',
        xtype: 'ngCheckbox',
        fieldLabel: '内容区域',
        name: 'contentZone',
        colspan: 3
    }, {
        xtype: 'combo',
        store: uiInteractionStyleStore,
        fieldLabel: '界面交互风格',
        queryMode: 'local',
        id: 'UiInteractionStyle',
        name: 'UiInteractionStyle',
        valueField: 'value',
        displayField: 'text'
    }]
});

var centerViewPanel = Ext.create('Ext.form.Panel', {
    id: "centerViewPanel",
    region: 'center',
    layout: {
        type: 'vbox',
        padding: '5',
        align: 'stretch'
    },
    items:
    [
        toolbarForm, queryForm, contentForm
    ]
});

var layoutSettingViewPanel = Ext.create('Ext.form.Panel', {
    id: "layoutSettingViewPanel",
    layout: 'border',
    items:
    [
        treeForm, centerViewPanel
    ]
});

var treeZone = Ext.getCmp('treeZone');
var toolbarZone = Ext.getCmp('toolbarZone');
var queryZone = Ext.getCmp('queryZone');
//var headZone = Ext.getCmp('headZone');
//var contentZone = Ext.getCmp('contentZone');
var uiInteractionStyle = Ext.getCmp('UiInteractionStyle');

uiInteractionStyle.on('change', function (newValue, oldValue, eOpts) {
    transferData.UiStyle = oldValue;
});

treeZone.on('change', function (newValue, oldValue, eOpts) {
    transferData.IsHaveTree = oldValue;
});

toolbarZone.on('change', function (newValue, oldValue, eOpts) {
    transferData.IsHaveToolbar = oldValue;
});

queryZone.on('change', function (newValue, oldValue, eOpts) {
    transferData.IsHaveQuery = oldValue;
});

//headZone.on('change', function (newValue, oldValue, eOpts) {
//    transferData.IsHaveHead = oldValue;
//});

//Zone.on('change', function (newValue, oldValue, eOpts) {
//    transferData.IsHaveBody = oldValue;
//});


