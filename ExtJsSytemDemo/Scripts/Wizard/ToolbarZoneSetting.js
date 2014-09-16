

Ext.define('toolbarButtonGridModel', {
    //编辑状态下,状态列的下拉菜单的 model
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Id',
        type: 'string'
    }, {
        name: 'Name',
        type: 'string'
    }, {
        name: 'Description',
        type: 'string'
    }]
});

var sourceToolbarButtonGridStore = Ext.create('Ext.data.Store', {
    model: 'toolbarButtonGridModel'
});

var targetToolbarButtonGridStore = Ext.create('Ext.data.Store', {
    model: 'toolbarButtonGridModel'
});

var sourceToolbarButtonGrid = Ext.create('Ext.ng.GridPanel', {
    region: 'center',
    layout: 'border',
    title:'可用功能',
    flex: 2,
    store: sourceToolbarButtonGridStore,
    columnLines: true,
    buskey: 'id', //对应的业务表主键
    otype: 'add', //操作类型,add||edit
    layout: {
        align: 'stretch'
    },
    columns: [Ext.create('Ext.grid.RowNumberer', { text: '行号', width: 35 }),
        {
            header: '编号',
            flex: 1,
            sortable: true,
            hidden: true,
            dataIndex: 'Id',
            editor: {
                allowBlank: false
            }
        }, {
            header: '名称',
            flex: 1,
            sortable: true,
            dataIndex: 'Name',
            editor: {
                allowBlank: false
            }
        }, {
            header: '描述',
            flex: 1,
            sortable: true,
            dataIndex: 'Description',
            editor: {
                allowBlank: false
            }
        }],
    viewConfig: {
        forceFit: true,
        scrollOffset: 0
    }
});

var targetToolbarButtonGrid = Ext.create('Ext.ng.GridPanel', {
    region: 'center',
    layout: 'border',
    title:'启用功能',
    flex: 2,
    store: targetToolbarButtonGridStore,
    columnLines: true,
    buskey: 'id', //对应的业务表主键
    otype: 'add', //操作类型,add||edit
    layout: {
        align: 'stretch'
    },
    columns: [Ext.create('Ext.grid.RowNumberer', { text: '行号', width: 35 }),
        {
            header: '编号',
            flex: 1,
            sortable: true,
            hidden:true,
            dataIndex: 'Id',
            editor: {
                allowBlank: false
            }
        }, {
            header: '名称',
            flex: 1,
            sortable: true,
            dataIndex: 'Name',
            editor: {
                allowBlank: false
            }
        }, {
            header: '描述',
            flex: 1,
            sortable: true,
            dataIndex: 'Description',
            editor: {
                allowBlank: false
            }
        }],
    viewConfig: {
        forceFit: true,
        scrollOffset: 0
    }
});

var leftToolbarButton = Ext.create("Ext.Button", {
    text: ">",
    width: 50,
    listeners: {
        "click": function () {
            
        }
    },
    id: "leftToolbarButton",
    scale: 'medium'
});

var rightToolbarButton = Ext.create("Ext.Button", {
    text: "<",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "rightToolbarButton",
    scale: 'medium'
});

var leftAllToolbarButton = Ext.create("Ext.Button", {
    text: ">>",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "leftAllToolbarButton",
    scale: 'medium'
});

var rightAllToolbarButton = Ext.create("Ext.Button", {
    text: "<<",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "rightAllToolbarButton",
    scale: 'medium'
});



var toolbarZoneSettingButtonPanel = Ext.create('Ext.form.Panel', {
    id: "toolbarZoneSettingButtonPanel",
    layout: {
        type: 'vbox',
        padding: '5',
        pack: 'center',
        align: 'center'
    },
    flex:0.3,
    items:
    [
        leftToolbarButton,rightToolbarButton,leftAllToolbarButton,rightAllToolbarButton
    ]
});

var toolbarZoneSettingViewPanel = Ext.create('Ext.form.Panel', {
    id: "toolbarZoneSettingViewPanel",
    region: 'center',
    //layout: 'border',
    layout: {
        type: 'hbox',
        padding: '5',
        align: 'stretch'
    },
    items:
    [
        sourceToolbarButtonGrid,toolbarZoneSettingButtonPanel, targetToolbarButtonGrid
    ]
});