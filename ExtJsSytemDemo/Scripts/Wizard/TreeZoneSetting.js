var treeEntityComboTree = Ext.create('Ext.ng.TreePanel', {
    treeFields: [{ name: 'text', type: 'string' }
    ],
    url: 'GetEntityTree',
    height: 200
});


var treeSourceEntityTreeCombo = Ext.create('Ext.ng.TreeComboBox', {
    name: 'sourceEntityTreeCombo',
    valueField: 'id',
    fieldLabel: '实体选择',
    displayField: 'text',
    treePanel: treeEntityComboTree,
    effectiveNodeType: 'leaf', // 'all',leaf仅叶子有效果
    treeValueField: 'id',
    anchor: '95%'
});

var treeParentPropertyCombo = Ext.create('Ext.ng.ComboBox', {
    valueField: "id",
    fieldLabel: '父节点选择',
    displayField: 'displayname',
    helpid: 'metadataEntity',
    queryMode: 'remote', //local指定为本地数据  远程为remote      
    name: 'metadataEntity',
    rootPath: '../../',
    listFields: 'Name,displayname',
    listHeadTexts: '名称,显示名称'
});

var treeChildPropertyCombo = Ext.create('Ext.ng.ComboBox', {
    valueField: "id",
    fieldLabel: '子节点选择',
    displayField: 'displayname',
    helpid: 'metadataEntity',
    queryMode: 'remote', //local指定为本地数据  远程为remote      
    name: 'metadataEntity',
    rootPath: '../../',
    listFields: 'Name,displayname',
    listHeadTexts: '名称,显示名称'
});

var treeZoneSettingPanel = Ext.create('Ext.ng.TableLayoutForm', {
    buskey: 'id',
    otype: 'add',
    columnsPerRow: 3,
    fields: [treeSourceEntityTreeCombo, treeParentPropertyCombo,treeChildPropertyCombo]
});