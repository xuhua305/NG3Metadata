var isFirstLoadHeadZoneSetting = true;
var tabGridToolbar = Ext.create('Ext.ng.Toolbar',
                {
                    region: 'north',
                    //renderTo: 'toolbar',
                    border: false,
                    //split: true,
                    height: 26,
                    minSize: 26,
                    maxSize: 26,
                    items: [
                        {
                            id: "addTab",
                            text: '增行',
                            iconCls: 'add'
                        },
                        {
                            id: "deleteTab",
                            text: '删行',
                            iconCls: 'cross'
                        }
                    ]
                });

Ext.define('headTabGridModel', {
    //编辑状态下,状态列的下拉菜单的 model
    extend: 'Ext.data.Model',
    fields: [{
        name: 'TabName',
        type: 'string'
    }]
});

var headTabGridStore = Ext.create('Ext.data.Store', {
    model: 'headTabGridModel'
});

var headTabGridCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1
});

var headTabGrid = Ext.create('Ext.ng.GridPanel', {
    region: 'center',
    flex: 2,
    store: headTabGridStore,
    columnLines: true,
    buskey: 'id', //对应的业务表主键
    otype: 'add', //操作类型,add||edit
    layout: 'border',
    columns: [Ext.create('Ext.grid.RowNumberer', { text: '行号', width: 35 }),
        {
            header: '名称',
            flex: 1,
            sortable: true,
            dataIndex: 'TabName',
            editor: {
                allowBlank: false
            }
        }
    ],
    viewConfig: {
        forceFit: true,
        scrollOffset: 0
    },
    plugins: [headTabGridCellEditing]
});

var tabSettingPanel = Ext.create('Ext.form.Panel', {
    id: "tabSettingPanel",
    flex: 1,
    layout: 'border',
    items:
    [
        tabGridToolbar, headTabGrid
    ]
});


Ext.define('headPropertyGridModel', {
    //编辑状态下,状态列的下拉菜单的 model
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Id',
        type: 'string'
    }, {
        name: 'Name',
        type: 'string'
    }, {
        name: 'CurrentDisplayName',
        type: 'string'
    }]
});


var sourceHeadPropertyGridStore = Ext.create('Ext.data.Store', {
    model: 'headPropertyGridModel'
});


var targetHeadPropertyGridStore = Ext.create('Ext.data.Store', {
    model: 'headPropertyGridModel'
});

var sourceHeadPropertyGrid = Ext.create('Ext.ng.GridPanel', {
    region: 'center',
    layout: 'border',
    title: '可用属性',
    flex: 2,
    store: sourceHeadPropertyGridStore,
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
            dataIndex: 'CurrentDisplayName',
            editor: {
                allowBlank: false
            }
        }],
    viewConfig: {
        forceFit: true,
        scrollOffset: 0
    }
});

var targetHeadPropertyGrid = Ext.create('Ext.ng.GridPanel', {
    region: 'center',
    layout: 'border',
    title: '启用属性',
    flex: 2,
    store: targetHeadPropertyGridStore,
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
            dataIndex: 'CurrentDisplayName',
            editor: {
                allowBlank: false
            }
        }],
    viewConfig: {
        forceFit: true,
        scrollOffset: 0
    }
});

var collectHeadZoneData = function () {
    var items = targetHeadPropertyGridStore.data.items;
    if (items.length != 0) {
        transferData.HeadTabInfoForJses = [];
        transferData.HeadTabInfoForJses[0] = {};
        transferData.HeadTabInfoForJses[0].Properterys = [];
    }

    for (var i in items) {
        if (i) {
            transferData.HeadTabInfoForJses[0].Properterys[i] = {};
            transferData.HeadTabInfoForJses[0].Name = '';
            transferData.HeadTabInfoForJses[0].Properterys[i] = items[i].data.Id;
        }
    }
};

var loadHeadZoneSettingData = function() {
    Ext.Ajax.request({
        params: { 'id': transferData.HeadEntityId },
        url: 'GetPropertyByEntityId',
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            sourceHeadPropertyGridStore.insert(sourceHeadPropertyGridStore.getCount(), resp);
        }
    });
    
};

tabGridToolbar.items.get('addTab').on('click', function () {
    if (isFirstLoadHeadZoneSetting) {
        isFirstLoadHeadZoneSetting = false;
        Ext.Ajax.request({
            params: { 'id': transferData.HeadEntityId },
            url: 'GetPropertyByEntityId',
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                sourceHeadPropertyGridStore.insert(sourceHeadPropertyGridStore.getCount(), resp);
            }
        });
    }
    var data = [{
        'TabName': ''
    }];

    var count = headTabGridStore.getCount();
    headTabGridStore.insert(count, data);
    headTabGrid.getSelectionModel().select(count);
});

tabGridToolbar.items.get('deleteTab').on('click', function () {
    var data = headTabGrid.getSelectionModel().getSelection();
    if (data.length > 0) {
        Ext.Array.each(data, function (record) {
            headTabGridStore.remove(record); //前端删除
        });
    }
});



var leftHeadPropertyButton = Ext.create("Ext.Button", {
    text: ">",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "leftHeadPropertyButton",
    scale: 'medium'
});

leftHeadPropertyButton.on("click", function (e, eOpts) {
    var selectionModel = sourceHeadPropertyGrid.getSelectionModel();
    var selectedNodes = selectionModel.selected.items;
    if (selectedNodes.length > 0) {
        var selectedNode = selectedNodes[0];
        targetHeadPropertyGridStore.insert(targetHeadPropertyGridStore.getCount(), selectedNode.data);
        sourceHeadPropertyGridStore.remove(selectedNodes);
    }

});

var rightHeadPropertyButton = Ext.create("Ext.Button", {
    text: "<",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "rightHeadPropertyButton",
    scale: 'medium'
});

rightHeadPropertyButton.on("click", function (e, eOpts) {
    var selectionModel = targetHeadPropertyGrid.getSelectionModel();
    var selectedNodes = selectionModel.selected.items;
    if (selectedNodes.length > 0) {
        var selectedNode = selectedNodes[0];
        sourceHeadPropertyGridStore.insert(sourceHeadPropertyGridStore.getCount(), selectedNode.data);
        targetHeadPropertyGridStore.remove(selectedNodes);
    }
});

var leftAllHeadPropertyButton = Ext.create("Ext.Button", {
    text: ">>",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "leftAllHeadPropertyButton",
    scale: 'medium'
});

leftAllHeadPropertyButton.on("click", function (e, eOpts) {
    targetHeadPropertyGridStore.insert(targetHeadPropertyGridStore.getCount(), sourceHeadPropertyGridStore.data.items);
    sourceHeadPropertyGridStore.removeAll();
});

var rightAllHeadPropertyButton = Ext.create("Ext.Button", {
    text: "<<",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "rightAllHeadPropertyButton",
    scale: 'medium'
});

rightAllBodyButton.on("click", function (e, eOpts) {
    sourceHeadPropertyGridStore.insert(sourceHeadPropertyGridStore.getCount(), targetHeadPropertyGridStore.data.items);
    targetHeadPropertyGridStore.removeAll();
});



var headZoneButtonPanel = Ext.create('Ext.form.Panel', {
    id: "headZoneButtonPanel",
    layout: {
        type: 'vbox',
        padding: '5',
        pack: 'center',
        align: 'center'
    },
    flex: 0.3,
    items:
    [
        leftHeadPropertyButton, rightHeadPropertyButton, leftAllHeadPropertyButton, rightAllHeadPropertyButton
    ]
});

var headZoneCenterViewPanel = Ext.create('Ext.form.Panel', {
    id: "headZoneCenterViewPanel",
    region: 'center',
    flex: 1,
    //layout: 'border',
    layout: {
        type: 'hbox',
        padding: '5',
        align: 'stretch'
    },
    items:
    [
        sourceHeadPropertyGrid, headZoneButtonPanel, targetHeadPropertyGrid
    ]
});

var headZoneMainViewPanel = Ext.create('Ext.form.Panel', {
    id: "headZoneMainViewPanel",
    region: 'center',
    //layout: 'border',
    layout: {
        type: 'vbox',
        padding: '5',
        align: 'stretch'
    },
    items:
    [
        tabSettingPanel, headZoneCenterViewPanel
    ]
});