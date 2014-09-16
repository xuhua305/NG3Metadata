Ext.define('bodyEntityGridModel', {
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

var bodyEntityGridStore = Ext.create('Ext.data.Store', {
    model: 'bodyEntityGridModel'
});

var bodyEntityGrid = Ext.create('Ext.ng.GridPanel', {
    title: '表体实体',
    flex: 1,
    store: bodyEntityGridStore,
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

bodyEntityGrid.on("show", function (eOpts) {
    alert('');
});


Ext.define('bodyPropertyGridModel', {
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


var sourceBodyPropertyGridStore = Ext.create('Ext.data.Store', {
    model: 'bodyPropertyGridModel'
});


var targetBodyPropertyGridStore = Ext.create('Ext.data.Store', {
    model: 'bodyPropertyGridModel'
});

var sourceBodyPropertyGrid = Ext.create('Ext.ng.GridPanel', {
    region: 'center',
    layout: 'border',
    title: '可用属性',
    flex: 2,
    store: sourceBodyPropertyGridStore,
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

var targetBodyPropertyGrid = Ext.create('Ext.ng.GridPanel', {
    region: 'center',
    layout: 'border',
    title: '启用属性',
    flex: 2,
    store: targetBodyPropertyGridStore,
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

var leftBodyPropertyButton = Ext.create("Ext.Button", {
    text: ">",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "leftBodyPropertyButton",
    scale: 'medium'
});

leftBodyPropertyButton.on("click", function (e, eOpts) {
    var selectionModel = sourceBodyPropertyGrid.getSelectionModel();
    var selectedNodes = selectionModel.selected.items;
    if (selectedNodes.length > 0) {
        var selectedNode = selectedNodes[0];
        targetBodyPropertyGridStore.insert(targetBodyPropertyGridStore.getCount(), selectedNode.data);
        sourceBodyPropertyGridStore.remove(selectedNodes);
    }

});

var rightBodyPropertyButton = Ext.create("Ext.Button", {
    text: "<",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "rightBodyPropertyButton",
    scale: 'medium'
});

rightBodyPropertyButton.on("click", function (e, eOpts) {
    var selectionModel = targetBodyPropertyGrid.getSelectionModel();
    var selectedNodes = selectionModel.selected.items;
    if (selectedNodes.length > 0) {
        var selectedNode = selectedNodes[0];
        sourceBodyPropertyGridStore.insert(sourceBodyPropertyGridStore.getCount(), selectedNode.data);
        targetBodyPropertyGridStore.remove(selectedNodes);
    }
});

var leftAllBodyPropertyButton = Ext.create("Ext.Button", {
    text: ">>",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "leftAllBodyPropertyButton",
    scale: 'medium'
});

leftAllBodyPropertyButton.on("click", function (e, eOpts) {
    targetBodyPropertyGridStore.insert(targetBodyPropertyGridStore.getCount(), sourceBodyPropertyGridStore.data.items);
    sourceBodyPropertyGridStore.removeAll();
});

var rightAllBodyPropertyButton = Ext.create("Ext.Button", {
    text: "<<",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "rightAllBodyPropertyButton",
    scale: 'medium'
});

rightAllBodyPropertyButton.on("click", function (e, eOpts) {
    sourceBodyPropertyGridStore.insert(sourceBodyPropertyGridStore.getCount(), targetBodyPropertyGridStore.data.items);
    targetBodyPropertyGridStore.removeAll();
});



var BodyZoneButtonPanel = Ext.create('Ext.form.Panel', {
    id: "BodyZoneButtonPanel",
    layout: {
        type: 'vbox',
        padding: '5',
        pack: 'center',
        align: 'center'
    },
    flex: 0.3,
    items:
    [
        leftBodyPropertyButton, rightBodyPropertyButton, leftAllBodyPropertyButton, rightAllBodyPropertyButton
    ]
});

var bodyZoneCenterViewPanel = Ext.create('Ext.form.Panel', {
    id: "bodyZoneCenterViewPanel",
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
        sourceBodyPropertyGrid, BodyZoneButtonPanel, targetBodyPropertyGrid
    ]
});

var bodyZoneMainViewPanel = Ext.create('Ext.form.Panel', {
    id: "bodyZoneMainViewPanel",
    region: 'center',
    //layout: 'border',
    layout: {
        type: 'vbox',
        padding: '5',
        align: 'stretch'
    },
    items:
    [
        bodyEntityGrid, bodyZoneCenterViewPanel
    ]
});

var isFirstLoadBodyZoneSetting = true;
var loadBodyZoneData = function() {
    if (isFirstLoadBodyZoneSetting) {
        isFirstLoadBodyZoneSetting = false;
        Ext.Ajax.request({
            params: { 'id': transferData.BodyGridInfoForJses[0].GridEntityId },
            url: 'GetPropertyByEntityId',
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                sourceBodyPropertyGridStore.insert(sourceBodyPropertyGridStore.getCount(), resp);
            }
        });
    }
};

var collectBodyZoneData = function () {
    var items = targetBodyPropertyGridStore.data.items;
    if (items.length != 0) {
        transferData.BodyGridInfoForJses = [];
        transferData.BodyGridInfoForJses[0] = {};
        transferData.BodyGridInfoForJses[0].Properterys = [];
    }

    for (var i in items) {
        if (i) {
            transferData.BodyGridInfoForJses[0].Properterys[i] = {};
            transferData.BodyGridInfoForJses[0].Name = '';
            transferData.BodyGridInfoForJses[0].Properterys[i] = items[i].data.Id;
        }
    }
    
    Ext.Ajax.request({
        params: {
            'data': Ext.encode(transferData),
            'namespace': namespace
        },
        url: 'HandleUiTemplate',
        success: function (response) {
        }
    });
};