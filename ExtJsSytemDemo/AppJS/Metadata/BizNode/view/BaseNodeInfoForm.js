Ext.define("BizNode.view.BaseNodeInfoForm", {
    extend: 'Ext.ng.TableLayoutForm',
    xtype: 'baseNodeInfoForm',
    title: '基本信息',
    split: true,
    autoScroll:true,
    buskey: 'id',
    otype: otype,
    columnsPerRow: 3,
    fields: [ {
        id: 'ParentVersionId',
        xtype: 'ngText',
        fieldLabel: '父亲节点版本编号',
        name: 'ParentVersionId',
        hidden: true
    }, {
        id: 'Name',
        xtype: 'ngText',
        fieldLabel: '名称',
        name: 'Name',
        mustInput: true
    }, {
        id: 'CurrentDisplayName',
        xtype: 'ngText',
        fieldLabel: '显示名称',
        name: 'CurrentDisplayName',
        mustInput: true
    }, {
        id: 'DisplayName',
        xtype: 'ngText',
        fieldLabel: '显示名称',
        name: 'DisplayName',
        hidden: true
    }, {
        id: 'Namespace',
        xtype: 'ngText',
        fieldLabel: '命名空间',
        mustInput: true, //必输列
        name: 'Namespace'
    }, {
        id: 'Version',
        xtype: 'ngText',
        fieldLabel: '版本',
        mustInput: true,
        name: 'Version'
    }, {
        id: 'Remark',
        xtype: 'ngTextArea',
        fieldLabel: '备注',
        name: 'Remark',
        colspan: 3
    }, {
        id: 'Id',
        xtype: 'hiddenfield',
        fieldLabel: '编号',
        name: 'Id'
    }, {
        id: 'ParentId',
        xtype: 'hiddenfield',
        fieldLabel: '父亲节点编号',
        name: 'ParentId'
    }],
    initComponent: function () {
        this.callParent();

    }
});