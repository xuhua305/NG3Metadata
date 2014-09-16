Ext.define('queryPropertyGridModel', {
    //编辑状态下,状态列的下拉菜单的 model
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Id',
        type: 'string'
    }, {
        name: 'Name',
        type: 'string'
    }, {
        name: 'DisplayName',
        type: 'string'
    }]
});

var sourceQueryPropertyGridStore = Ext.create('Ext.data.Store', {
    model: 'queryPropertyGridModel'
});

var targetQueryPropertyGridStore = Ext.create('Ext.data.Store', {
    model: 'queryPropertyGridModel'
});

var sourceQueryPropertyGrid = Ext.create('Ext.ng.GridPanel', {
    region: 'center',
    layout: 'border',
    title: '可用属性',
    flex: 2,
    store: sourceQueryPropertyGridStore,
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
            header: '显示名称',
            flex: 1,
            sortable: true,
            dataIndex: 'DisplayName',
            editor: {
                allowBlank: false
            }
        }],
    viewConfig: {
        forceFit: true,
        scrollOffset: 0
    }
});

var targetQueryPropertyGrid = Ext.create('Ext.ng.GridPanel', {
    region: 'center',
    layout: 'border',
    title: '启用属性',
    flex: 2,
    store: targetQueryPropertyGridStore,
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

var leftQueryButton = Ext.create("Ext.Button", {
    text: ">",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "leftQueryButton",
    scale: 'medium'
});

var rightQueryButton = Ext.create("Ext.Button", {
    text: "<",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "rightQueryButton",
    scale: 'medium'
});

var leftAllQueryButton = Ext.create("Ext.Button", {
    text: ">>",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "leftAllQueryButton",
    scale: 'medium'
});

var rightAllQueryButton = Ext.create("Ext.Button", {
    text: "<<",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "rightAllQueryButton",
    scale: 'medium'
});



var queryZoneButtonPanel = Ext.create('Ext.form.Panel', {
    id: "queryZoneButtonPanel",
    layout: {
        type: 'vbox',
        padding: '5',
        pack: 'center',
        align: 'center'
    },
    flex: 0.3,
    items:
    [
        leftQueryButton, rightQueryButton, leftAllQueryButton, rightAllQueryButton
    ]
});

var queryZoneViewPanel = Ext.create('Ext.form.Panel', {
    id: "queryZoneViewPanel",
    region: 'center',
    //layout: 'border',
    layout: {
        type: 'hbox',
        padding: '5',
        align: 'stretch'
    },
    items:
    [
        sourceQueryPropertyGrid, queryZoneButtonPanel, targetQueryPropertyGrid
    ]
});