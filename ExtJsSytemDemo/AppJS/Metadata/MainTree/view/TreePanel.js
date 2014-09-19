Ext.define("MainTree.view.TreePanel", {
    extend: 'Ext.tree.Panel',
    xtype: 'mainTreePanel',
    region: "west",
    title: "知识模型",
    store: 'TreeStore',
    autoScroll: true,
    enableTabScroll: true,
    collapsible: true,
    collapsed: false,
    split: true,
    rootVisible: false,
    lines: true,
    useArrows: true,
    width: 220,
    minSize: 220,
    maxSize: 220,
    dockedItems: [
        {
            xtype: 'ngToolbar',
            dock: 'top',
            ngbuttons: [
                    { groupitem: true, tooltip: '新增', items: ['clear', 'copy'], iconCls: 'add' },
                    { id: "editModel", text: "", tooltip: "修改", iconCls: "add" }, { id: "deleteModel", text: "", tooltip: "删除", iconCls: "add" },
                    { id: "viewModel", tooltip: "查看", text: "", iconCls: "add" }, '-', { id: "checkoutModel", tooltip: "签出", text: "", iconCls: "add" },
                    { id: "checkinModel", tooltip: "签入", text: "", iconCls: "add" }
            ]
        }
    ],
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop'
        }
    }
});