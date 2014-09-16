var entityComboTree = Ext.create('Ext.ng.TreePanel', {
    treeFields: [{ name: 'text', type: 'string' }
    ],
    url: 'GetEntityTree',
    height: 200
});


var sourceEntityTreeCombo = Ext.create('Ext.ng.TreeComboBox', {
    name: 'sourceEntityTreeCombo',
    valueField: 'id',
    fieldLabel: '表头选择',
    displayField: 'text',
    treePanel: entityComboTree,
    effectiveNodeType: 'leaf', // 'all',leaf仅叶子有效果
    treeValueField: 'id',
    anchor: '95%'
});

sourceEntityTreeCombo.on('change', function (newValue, oldValue, eOpts) {
    Ext.Ajax.request({
        params: { 'id': oldValue },
        url: 'GetEntityByRelationId',
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            sourceEntityGridStore.insert(sourceEntityGridStore.getCount(), resp);
            transferData.HeadEntityId = oldValue;
        }
    });
});

Ext.define('entityGridModel', {
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

var sourceEntityGridStore = Ext.create('Ext.data.Store', {
    model: 'entityGridModel'
});

var targetEntityGridStore = Ext.create('Ext.data.Store', {
    model: 'entityGridModel'
});

var sourceEntityGrid = Ext.create('Ext.ng.GridPanel', {
    region: 'center',
    layout: 'border',
    title: '可用明细表',
    flex: 2,
    store: sourceEntityGridStore,
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

var targetEntityGrid = Ext.create('Ext.ng.GridPanel', {
    region: 'center',
    layout: 'border',
    title: '启用明细表',
    flex: 2,
    store: targetEntityGridStore,
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

var collectHeadAndBodyData = function () {
    var items = targetEntityGridStore.data.items;
    if (items.length != 0)
        transferData.BodyGridInfoForJses = [];
    for (var i in items) {
        if (i) {
            transferData.BodyGridInfoForJses[i] = {};
            transferData.BodyGridInfoForJses[i].Name = items[i].data.CurrentDisplayName;
            transferData.BodyGridInfoForJses[i].GridEntityId = items[i].data.Id;
        }
    }
};

var leftBodyButton = Ext.create("Ext.Button", {
    text: ">",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "leftBodyButton",
    scale: 'medium'
});

leftBodyButton.on("click", function (e,eOpts) {
    var selectionModel = sourceEntityGrid.getSelectionModel();
    var selectedNodes = selectionModel.selected.items;
    if (selectedNodes.length > 0) {
        var selectedNode = selectedNodes[0];
        targetEntityGridStore.insert(targetEntityGridStore.getCount(), selectedNode.data);
        sourceEntityGridStore.remove(selectedNodes);
    }
});

var rightBodyButton = Ext.create("Ext.Button", {
    text: "<",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "rightBodyButton",
    scale: 'medium'
});

rightBodyButton.on("click", function (e, eOpts) {
    var selectionModel = targetEntityGrid.getSelectionModel();
    var selectedNodes = selectionModel.selected.items;
    if (selectedNodes.length > 0) {
        var selectedNode = selectedNodes[0];
        sourceEntityGridStore.insert(sourceEntityGridStore.getCount(), selectedNode.data);
        targetEntityGridStore.remove(selectedNodes);
    }
});

var leftAllBodyButton = Ext.create("Ext.Button", {
    text: ">>",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "leftAllBodyButton",
    scale: 'medium'
});

leftAllBodyButton.on("click", function (e, eOpts) {
    targetEntityGridStore.insert(targetEntityGridStore.getCount(), sourceEntityGridStore.data.items);
    sourceEntityGridStore.removeAll();
});

var rightAllBodyButton = Ext.create("Ext.Button", {
    text: "<<",
    width: 50,
    listeners: {
        "click": function () {

        }
    },
    id: "rightAllBodyButton",
    scale: 'medium'
});

rightAllBodyButton.on("click", function (e, eOpts) {
    sourceEntityGridStore.insert(sourceEntityGridStore.getCount(), targetEntityGridStore.data.items);
    targetEntityGridStore.removeAll();
});



var headAndBodySelectButtonPanel = Ext.create('Ext.form.Panel', {
    id: "headAndBodySelectButtonPanel",
    layout: {
        type: 'vbox',
        padding: '5',
        pack: 'center',
        align: 'center'
    },
    flex: 0.3,
    items:
    [
        leftBodyButton, rightBodyButton, leftAllBodyButton, rightAllBodyButton
    ]
});

var headAndBodySelectCenterViewPanel = Ext.create('Ext.form.Panel', {
    id: "headAndBodySelectCenterViewPanel",
    region: 'center',
    flex:1,
    //layout: 'border',
    layout: {
        type: 'hbox',
        padding: '5',
        align: 'stretch'
    },
    items:
    [
        sourceEntityGrid, headAndBodySelectButtonPanel, targetEntityGrid
    ]
});

var headSelectPanel = Ext.create('Ext.ng.TableLayoutForm', {
    buskey: 'id',
    otype: 'add',
    flex:0.2,
    columnsPerRow: 3,
    fields: [sourceEntityTreeCombo]
});

var headAndBodySelectMainViewPanel = Ext.create('Ext.form.Panel', {
    id: "headAndBodySelectMainViewPanel",
    region: 'center',
    //layout: 'border',
    layout: {
        type: 'vbox',
        padding: '5',
        align: 'stretch'
    },
    items:
    [
        headSelectPanel, headAndBodySelectCenterViewPanel
    ]
});