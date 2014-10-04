Ext.define('MainTree.controller.MainTreeController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'treeContextMenu',
            selector: 'treeContextMenu'
        },
        {
            ref: 'mainTreePanel',
            selector: 'mainTreePanel'
        },
        {
            ref: 'mainTabPanel',
            selector: 'mainTabPanel'
        }
    ],
    stores: ['TreeStore'],
    views: ['ContextMenu', 'TabPanel'],
    init: function () {
        this.control({
            'mainTreePanel': {
                itemcontextmenu: this.onTreeItemcontextmenu,
                beforeitemexpand: this.onTreeBeforeitemexpand
            },
            'treeContextMenu #editMenu': {
                click: this.openTabWithCurrentNode
            },
            'treeContextMenu #nodeMenu': {
                click: this.addChildClick
            },
            'treeContextMenu #dictionaryMenu': {
                click: this.addChildClick
            },
            'treeContextMenu #entityMenu': {
                click: this.addChildClick
            },
            'treeContextMenu #serviceMenu': {
                click: this.addChildClick
            },
            'treeContextMenu #uiMenu': {
                click: this.addChildClick
            },
            'treeContextMenu #commonDeleteMenu': {
                click: this.deleteCurrentNode
            }
        });
    },
    onLaunch: function () {
        var frame = $GetWFrame();
        frame.Center = this.getMainTreePanel();
        window.setCurrentNodeValue = Ext.bind(this.setCurrentNodeValue, this);
        window.createNewNodeAndTab = Ext.bind(this.createNewNodeAndTab, this);
    },
    onTreeItemcontextmenu: function (view, record, item, index, e, eOpts) {
        e.preventDefault();
        var menu = this.getTreeContextMenu();
        if (!menu) {
            menu = Ext.create('MainTree.view.ContextMenu');
        }
        menu.showAt(e.getXY());
        e.stopEvent();
    },
    onTreeBeforeitemexpand: function (node, eOpts) {
        var stationsStore = this.getTreeStoreStore();
        if (stationsStore) {
            stationsStore.proxy.extraParams.currentNodeId = node.internalId;
            stationsStore.proxy.extraParams.isNewNode = false;
            stationsStore.proxy.extraParams.nodeStyle = nodeType.classNode;
        }
    },
    setCurrentNodeValue: function (id, text) {
        var me = this;
        var selectionModel = me.getMainTreePanel().getSelectionModel();
        var selectedNodes = selectionModel.selected.items;
        if (selectedNodes.length > 0) {
            var selectedNode = selectedNodes[0];
            selectedNode.data.id = id;
            selectedNode.set('text', text);
        }
    },
    //删除
    deleteCurrentNode: function () {
        var me = this;
        var selectionModel = me.getMainTreePanel().getSelectionModel();
        var selectedNodes = selectionModel.selected.items;
        if (selectedNodes.length > 0) {
            var selectedNode = selectedNodes[0];
            var id = selectedNode.data.id;
            Ext.Ajax.request({
                params: { 'id': id },
                url: C_ROOT + 'IsCheckOut',
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText);
                    if (resp.status === "true") {
                        Ext.MessageBox.alert('警告', '当前节点已经被签出');
                    } else {

                        if (selectedNode.data.root) {
                            Ext.Msg.alert("删除节点", "根节点不允许删除！");
                            return;
                        }

                        if (selectedNode.hasChildNodes()) {
                            Ext.Msg.alert("删除节点", "请先删除所有子节点，再删除该节点！");
                            return;
                        } else {
                            Ext.Ajax.request({
                                params: { 'id': id },
                                url: C_ROOT + 'DeleteModel',
                                success: function (response) {
                                    var resp = Ext.JSON.decode(response.responseText);
                                    if (resp.status === "ok") {

                                        var previousNode = selectedNode.previousSibling;
                                        var parentNode = selectedNode.parentNode;
                                        var nextNode = selectedNode.nextSibling;
                                        selectedNode.remove();
                                        if (previousNode) {
                                            selectionModel.select(previousNode);
                                        } else {
                                            if (nextNode) {
                                                selectionModel.select(nextNode);
                                            } else {
                                                if (parentNode) {
                                                    selectionModel.select(parentNode);
                                                }
                                            }
                                        }

                                        Ext.MessageBox.alert('删除成功', resp.status);
                                    } else {
                                        Ext.MessageBox.alert('删除失败', resp.status);
                                    }
                                }
                            });
                        }

                    }
                }
            });
        }
    },
    //修改
    openTabWithCurrentNode: function () {
        var me = this;
        var selectionModel = me.getMainTreePanel().getSelectionModel();
        var selectedNodes = selectionModel.selected.items;
        if (selectedNodes.length > 0) {
            var selectedNode = selectedNodes[0];
            var id = selectedNode.data.id;
            Ext.Ajax.request({
                params: { 'id': id },
                url: C_ROOT + 'Knowledge/IsCheckOut',
                sync: false,
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText);
                    if (resp.status === "true") {
                        isCheckOut = true;
                        Ext.MessageBox.alert('警告', '当前节点已经被签出');
                    } else {
                        Ext.Ajax.request({
                            params: { 'id': id },
                            url: C_ROOT + 'Knowledge/CheckOut',
                            success: function (response) {
                                var resp = Ext.JSON.decode(response.responseText);
                                if (resp.status === "ok") {
                                    var viewName = '';
                                    var displayName = selectedNode.data.text;
                                    var nodeStyle = selectedNode.data.nodeType;

                                    switch (nodeStyle) {
                                        case nodeType.classNode:
                                            viewName = 'BizNodeView';
                                            break;
                                        case nodeType.dicNode:
                                            viewName = 'DictionaryView';
                                            break;
                                        case nodeType.serviceNode:
                                            viewName = 'ServiceView';
                                            break;
                                        case nodeType.entityNode:
                                            viewName = 'EntityView';
                                            break;
                                        case nodeType.propertyNode:
                                            viewName = 'EntityPropertyView';
                                            break;
                                        case nodeType.ui:
                                            viewName = 'UiInteractionView';
                                            break;
                                        default:
                                            break;
                                    }

                                    OpenTab(viewName + '?otype=' + oType.Edit + '&id=' + id, id, displayName);
                                } else {
                                    Ext.MessageBox.alert('警告', '当前节点签出失败,可能已经被签出');
                                }

                            }
                        });
                    }

                }
            });
        }
    },
    //增加相关
    addChildClick: function (bt) {
        var me = this;
        switch (bt.id) {
            case 'nodeMenu':
                me.createNewNodeAndTab('NewNode', '新建分类节点', 'BizNodeView', oType.Add, nodeType.classNode);
                break;
            case 'dictionaryMenu':
                me.createNewNodeAndTab('NewDictionary', '新建字典模型', 'DictionaryView', oType.Add, nodeType.dicNode);
                break;
            case 'entityMenu':
                me.createNewNodeAndTab('NewEntity', '新建实体模型', 'EntityView', oType.Add, nodeType.entityNode);
                break;
            case 'serviceMenu':
                me.createNewNodeAndTab('NewService', '新建服务模型', 'ServiceView', oType.Add, nodeType.serviceNode);
                break;
            case 'uiMenu':
                me.createNewNodeAndTab('NewUi', '新建界面模型', 'UiInteractionView', oType.Add, nodeType.ui);
                break;
            default:
                break;
        }
    },
    createNewNodeAndTab: function (nodeName, nodeDisplayName, viewName, openOType, nType) {
        var me = this;
        var selectionModel = me.getMainTreePanel().getSelectionModel();
        var selectedNodes = selectionModel.selected.items;
        if (selectedNodes.length > 0) {
            var selectedNode = selectedNodes[0];
            var id = NewGuid();
            var name = nodeName;
            var displayName = nodeDisplayName;
            var parentId = selectedNode.data.id;
            selectedNode.appendChild({ id: id, text: nodeDisplayName + '(' + name + ')', leaf: false, nodeType: nType, nodeNamespace: selectedNode.data.nodeNamespace + '.' + name });
            selectedNode.expand();
            var record = selectedNode.findChild("id", id, true);
            selectionModel.select(record);
            me.OpenTab(viewName + '?otype=' + openOType + '&id=' + id + '&parentId=' + parentId + '&name=' + name + '&displayName=' + displayName + '&namespace=' +
                selectedNode.data.nodeNamespace, id, displayName);
        }
    },
    OpenTab: function (url, id, text) {
        var frame1 = document.createElement("IFRAME");
        frame1.id = "frame1";
        frame1.frameBorder = 0;
        frame1.src = url;
        frame1.height = "99.5%";
        frame1.width = "99.5%";
        var panel = Ext.create("Ext.Panel", {
            title: text,
            id: id,
            //html: '<iframe id="frame1" src="home/About" frameborder="0" width="100%" height="100%"></iframe>',
            closable: true,
            listeners: {
            },
            contentEl: frame1
        });
        var tabMain = this.getMainTabPanel();
        if (!tabMain.getComponent(id)) {
            tabMain.add(panel);
        }
        frame1.parentContainer = panel;
        var curtab = tabMain.getComponent(id);
        tabMain.setActiveTab(curtab);
    }
});