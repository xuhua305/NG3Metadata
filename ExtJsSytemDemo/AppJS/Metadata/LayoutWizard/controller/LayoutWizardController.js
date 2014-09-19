Ext.define('LayoutWizard.controller.LayoutWizardController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'headAndBodySelectMainView',
            selector: 'headAndBodySelectMainView'
        },
        {
            ref: 'sourceEntityGrid',
            selector: 'headAndBodySelectMainView ngGridPanel[name=sourceEntityGrid]'
        },
        {
            ref: 'targetEntityGrid',
            selector: 'headAndBodySelectMainView ngGridPanel[name=targetEntityGrid]'
        },
        {
            ref: 'headZoneMainView',
            selector: 'headZoneMainView'
        },
        {
            ref: 'headTabGrid',
            selector: 'headZoneMainView #headTabGrid'
        },
        {
            ref: 'sourceHeadPropertyGrid',
            selector: 'headZoneMainView #sourceHeadPropertyGrid'
        },
        {
            ref: 'targetHeadPropertyGrid',
            selector: 'headZoneMainView #targetHeadPropertyGrid'
        },

        {
            ref: 'bodyZoneMainView',
            selector: 'bodyZoneMainView'
        },
        {
            ref: 'sourceBodyPropertyGrid',
            selector: 'bodyZoneMainView #sourceBodyPropertyGrid'
        },
        {
            ref: 'targetBodyPropertyGrid',
            selector: 'bodyZoneMainView #targetBodyPropertyGrid'
        },

        {
            ref: 'cardPanel',
            selector: 'cardPanel'
        }
    ],
    stores: ['SourceEntitys', 'TargetEntitys', 'HeadTabs', 'SourceHeadPropertys', 'TargetHeadPropertys', 'BodyEntitys', 'SourceBodyPropertys', 'TargetBodyPropertys'],
    views: ['BodyZoneMainView', 'CardPanel', 'HeadAndBodySelectMainView', 'HeadZoneMainView', 'LayoutSettingView'],
    init: function () {
        this.control({
            'layoutSettingView #treeZone': {
                change: this.onTreeZoneChange
            },
            'layoutSettingView #toolbarZone': {
                change: this.onToolbarZoneChange
            },
            'layoutSettingView #queryZone': {
                change: this.onQueryZoneChange
            },
            'layoutSettingView #UiInteractionStyle': {
                change: this.onUiInteractionStyleChange
            },
            'headAndBodySelectMainView .ngTreeComboBox[name=sourceEntityTreeCombo]': {
                change: this.onSourceEntityTreeComboChange
            },
            'headAndBodySelectMainView .button[name=leftBodyButton]': {
                click: this.onHeadAndBodyLeftBtnClick
            },
            'headAndBodySelectMainView .button[name=rightBodyButton]': {
                click: this.onHeadAndBodyRightBtnClick
            },
            'headAndBodySelectMainView .button[name=leftAllBodyButton]': {
                click: this.onHeadAndBodyLeftAllBtnClick
            },
            'headAndBodySelectMainView .button[name=rightAllBodyButton]': {
                click: this.onHeadAndBodyRightAllBtnClick
            },
            'headZoneMainView #addTab': {
                click: this.onAddTabClick
            },
            'headZoneMainView #deleteTab': {
                click: this.onDeleteTabClick
            },

            'headZoneMainView #leftHeadPropertyButton': {
                click: this.onLeftHeadPropertyClick
            },
            'headZoneMainView #rightHeadPropertyButton': {
                click: this.onRightHeadPropertyClick
            },
            'headZoneMainView #leftAllHeadPropertyButton': {
                click: this.onLeftAllHeadPropertyClick
            },
            'headZoneMainView #rightAllHeadPropertyButton': {
                click: this.onRightAllHeadPropertyClick
            },

            'bodyZoneMainView #leftBodyPropertyButton': {
                click: this.onLeftBodyPropertyClick
            },
            'bodyZoneMainView #rightBodyPropertyButton': {
                click: this.onRightBodyPropertyClick
            },
            'bodyZoneMainView #leftAllBodyPropertyButton': {
                click: this.onLeftAllBodyPropertyClick
            },
            'bodyZoneMainView #rightAllBodyPropertyButton': {
                click: this.onRightAllBodyPropertyClick
            },

            'cardPanel #move-prev': {
                click: this.movePrev
            },
            'cardPanel #move-next': {
                click: this.moveNext
            }
        });
    },
    onTreeZoneChange: function (newValue, oldValue, eOpts) {
        transferData.IsHaveTree = oldValue;
    },
    onToolbarZoneChange: function (newValue, oldValue, eOpts) {
        transferData.IsHaveToolbar = oldValue;
    },
    onQueryZoneChange: function (newValue, oldValue, eOpts) {
        transferData.IsHaveQuery = oldValue;
    },
    onUiInteractionStyleChange: function (newValue, oldValue, eOpts) {
        transferData.UiStyle = oldValue;
    },
    onSourceEntityTreeComboChange: function (newValue, oldValue, eOpts) {
        var me = this;
        Ext.Ajax.request({
            params: { 'id': oldValue },
            url: C_ROOT + 'GetEntityByRelationId',
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                me.getSourceEntitysStore().insert(me.getSourceEntitysStore().getCount(), resp);
                transferData.HeadEntityId = oldValue;
            }
        });
    },
    onHeadAndBodyLeftBtnClick: function () {
        var me = this,
            sourceEntityGrid = me.getSourceEntityGrid(),
            sourceEntityGridStore = me.getSourceEntitysStore(),
            targetEntityGridStore = me.getTargetEntitysStore();

        var selectionModel = sourceEntityGrid.getSelectionModel();
        var selectedNodes = selectionModel.selected.items;
        if (selectedNodes.length > 0) {
            var selectedNode = selectedNodes[0];
            targetEntityGridStore.insert(targetEntityGridStore.getCount(), selectedNode.data);
            sourceEntityGridStore.remove(selectedNodes);
        }
    },
    onHeadAndBodyRightBtnClick: function () {
        var me = this,
            targetEntityGrid = me.getTargetEntityGrid(),
            sourceEntityGridStore = me.getSourceEntitysStore(),
            targetEntityGridStore = me.getTargetEntitysStore();

        var selectionModel = targetEntityGrid.getSelectionModel();
        var selectedNodes = selectionModel.selected.items;
        if (selectedNodes.length > 0) {
            var selectedNode = selectedNodes[0];
            sourceEntityGridStore.insert(sourceEntityGridStore.getCount(), selectedNode.data);
            targetEntityGridStore.remove(selectedNodes);
        }
    },
    onHeadAndBodyLeftAllBtnClick: function () {
        var me = this,
            sourceEntityGridStore = me.getSourceEntitysStore(),
            targetEntityGridStore = me.getTargetEntitysStore();
        targetEntityGridStore.insert(targetEntityGridStore.getCount(), sourceEntityGridStore.data.items);
        sourceEntityGridStore.removeAll();
    },
    onHeadAndBodyRightAllBtnClick: function () {
        var me = this,
            sourceEntityGridStore = me.getSourceEntitysStore(),
            targetEntityGridStore = me.getTargetEntitysStore();
        sourceEntityGridStore.insert(sourceEntityGridStore.getCount(), targetEntityGridStore.data.items);
        targetEntityGridStore.removeAll();
    },
    collectHeadAndBodyData: function () {
        var me = this;
        var items = me.getTargetEntitysStore().data.items;
        if (items.length != 0)
            transferData.BodyGridInfoForJses = [];
        for (var i in items) {
            if (i) {
                transferData.BodyGridInfoForJses[i] = {};
                transferData.BodyGridInfoForJses[i].Name = items[i].data.CurrentDisplayName;
                transferData.BodyGridInfoForJses[i].GridEntityId = items[i].data.Id;
            }
        }
    },

    onAddTabClick: function () {
        var me = this;
        if (me.getHeadZoneMainView().isFirstLoadHeadZoneSetting) {
            me.getHeadZoneMainView().isFirstLoadHeadZoneSetting = false;
            Ext.Ajax.request({
                params: { 'id': transferData.HeadEntityId },
                url: C_ROOT + 'GetPropertyByEntityId',
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText);
                    me.getSourceHeadPropertysStore().insert(me.getSourceHeadPropertysStore().getCount(), resp);
                }
            });
        }
        var data = [{
            'TabName': ''
        }];

        var count = me.getHeadTabsStore().getCount();
        me.getHeadTabsStore().insert(count, data);
        me.getHeadTabGrid().getSelectionModel().select(count);
    },
    onDeleteTabClick: function () {
        var me = this;
        var data = me.getHeadTabGrid().getSelectionModel().getSelection();
        if (data.length > 0) {
            Ext.Array.each(data, function (record) {
                me.getHeadTabsStore().remove(record);
            });
        }
    },
    onLeftHeadPropertyClick: function () {
        var me = this;
        var selectionModel = me.getSourceHeadPropertyGrid().getSelectionModel();
        var selectedNodes = selectionModel.selected.items;
        if (selectedNodes.length > 0) {
            var selectedNode = selectedNodes[0];
            me.getTargetHeadPropertysStore().insert(me.getTargetHeadPropertysStore().getCount(), selectedNode.data);
            me.getSourceHeadPropertysStore().remove(selectedNodes);
        }
    },
    onRightHeadPropertyClick: function () {
        var me = this;
        var selectionModel = me.getTargetHeadPropertyGrid().getSelectionModel();
        var selectedNodes = selectionModel.selected.items;
        if (selectedNodes.length > 0) {
            var selectedNode = selectedNodes[0];
            me.getSourceHeadPropertysStore().insert(me.getSourceHeadPropertysStore().getCount(), selectedNode.data);
            me.getTargetHeadPropertysStore().remove(selectedNodes);
        }
    },
    onLeftAllHeadPropertyClick: function () {
        var me = this;
        me.getTargetHeadPropertysStore().insert(me.getTargetHeadPropertysStore().getCount(), me.getSourceHeadPropertysStore().data.items);
        me.getSourceHeadPropertysStore().removeAll();
    },
    onRightAllHeadPropertyClick: function () {
        var me = this;
        me.getSourceHeadPropertysStore().insert(me.getSourceHeadPropertysStore().getCount(), me.getTargetHeadPropertysStore().data.items);
        me.getTargetHeadPropertysStore().removeAll();
    },
    loadHeadZoneSettingData: function () {
        var me = this;
        Ext.Ajax.request({
            params: { 'id': transferData.HeadEntityId },
            url: C_ROOT + 'GetPropertyByEntityId',
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                me.getSourceHeadPropertysStore().insert(me.getSourceHeadPropertysStore().getCount(), resp);
            }
        });
    },
    collectHeadZoneData: function () {
        var me = this;
        var items = me.getTargetHeadPropertysStore().data.items;
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
    },

    onLeftBodyPropertyClick: function () {
        var me = this;
        var selectionModel = me.getSourceBodyPropertyGrid().getSelectionModel();
        var selectedNodes = selectionModel.selected.items;
        if (selectedNodes.length > 0) {
            var selectedNode = selectedNodes[0];
            me.getTargetBodyPropertysStore().insert(me.getTargetBodyPropertysStore().getCount(), selectedNode.data);
            me.getSourceBodyPropertysStore().remove(selectedNodes);
        }
    },
    onRightBodyPropertyClick: function () {
        var me = this;
        var selectionModel = me.getTargetBodyPropertyGrid().getSelectionModel();
        var selectedNodes = selectionModel.selected.items;
        if (selectedNodes.length > 0) {
            var selectedNode = selectedNodes[0];
            me.getSourceBodyPropertysStore().insert(me.getSourceBodyPropertysStore().getCount(), selectedNode.data);
            me.getTargetBodyPropertysStore().remove(selectedNodes);
        }
    },
    onLeftAllBodyPropertyClick: function () {
        var me = this;
        me.getTargetBodyPropertysStore().insert(me.getTargetBodyPropertysStore().getCount(), me.getSourceBodyPropertysStore().data.items);
        me.getSourceBodyPropertysStore().removeAll();
    },
    onRightAllBodyPropertyClick: function () {
        var me = this;
        me.getSourceBodyPropertysStore().insert(me.getSourceBodyPropertysStore().getCount(), me.getTargetBodyPropertysStore().data.items);
        me.getTargetBodyPropertysStore().removeAll();
    },
    loadBodyZoneData: function () {
        var me = this;
        if (me.getBodyZoneMainView().isFirstLoadBodyZoneSetting) {
            me.getBodyZoneMainView().isFirstLoadBodyZoneSetting = false;
            Ext.Ajax.request({
                params: { 'id': transferData.BodyGridInfoForJses[0].GridEntityId },
                url: C_ROOT + 'GetPropertyByEntityId',
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText);
                    me.getSourceBodyPropertysStore().insert(me.getSourceBodyPropertysStore().getCount(), resp);
                }
            });
        }
    },
    collectBodyZoneData: function () {
        var me = this;
        var items = me.getTargetBodyPropertysStore().data.items;
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
    },

    movePrev: function () {
        this.navigate(this.getCardPanel(), "prev");
    },
    moveNext: function () {
        this.navigate(this.getCardPanel(), "next");
    },
    navigate: function (panel, direction) {
        var me = this;
        if (panel.title == '界面布局向导') {
                    
        }
        else if (panel.title == '表头表体选择') {
            me.collectHeadAndBodyData();
            me.loadHeadZoneSettingData();
        }
        else if (panel.title == '表头设置') {
            me.collectHeadZoneData();
            me.loadBodyZoneData();
        }
        else if (panel.title == '表体设置') {
            me.collectBodyZoneData();
            window.close();
        }
                              
        var layout = panel.getLayout();
        layout[direction]();
        Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
        if (!layout.getNext()) {
            Ext.getCmp('move-next').setText('完成');
        } else {
            Ext.getCmp('move-next').setDisabled(false);
            Ext.getCmp('move-next').setText('下一步');
        }

        if (!layoutSettingViewPanel.hidden) {
            me.getCardView().setTitle('界面布局向导');
        }
        else if (!me.getHeadAndBodySelectMainView().hidden) {
            me.getCardView().setTitle('表头表体选择');
        }
        else if (!me.getHeadZoneMainView().hidden) {
            me.getCardView().setTitle('表头设置');
        }
        else if (!me.getBodyZoneMainView().hidden) {
            me.getCardView().setTitle('表体设置');
        }
    },
    onLaunch: function () {
    }
});