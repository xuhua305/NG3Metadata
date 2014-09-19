Ext.define("MainTree.view.ContextMenu", {
    extend: 'Ext.menu.Menu',
    xtype: 'treeContextMenu',
    margin: '0 0 10 0',
    items: [
        {
            id: 'addMenu',
            text: '新增',
            menu: {
                margin: '0 0 10 0',
                items: [
                    {
                        id: 'nodeMenu',
                        text: '业务节点'
                    },
                    {
                        id: 'dictionaryMenu',
                        text: '字典模型'
                    },
                    {
                        id: 'entityMenu',
                        text: '实体模型'
                    },
                    {
                        id: 'serviceMenu',
                        text: '服务模型'
                    },
                    {
                        id: 'uiMenu',
                        text: '界面模型'
                    }
                ]
            }
        },
        {
            id: 'editMenu',
            text: '修改'
        },
        {
            id: 'deleteMenu',
            text: '删除',
            menu: {
                margin: '0 0 10 0',
                items: [
                    {
                        id: 'commonDeleteMenu',
                        text: '删除(保留历史)'
                    },
                    {
                        id: 'absoluteDeleteMenu',
                        text: '彻底删除'
                    }
                ]
            }
        },
        {
            id: 'viewMenu',
            text: '查看'
        }]
});