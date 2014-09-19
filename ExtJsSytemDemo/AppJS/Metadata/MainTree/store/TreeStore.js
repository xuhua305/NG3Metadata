Ext.define('MainTree.store.TreeStore', {
    extend: 'Ext.data.TreeStore',
    autoLoad: false,
    fields: [{ name: 'text', type: 'string' },
        { name: 'nodeType', type: 'int' },
        { name: 'nodeNamespace', type: 'string' }
    ],
    proxy: {
        type: 'ajax',
        url: 'GetTreeNodes',
        extraParams: {
            currentNodeId: '',  //节点参数
            isNewNode: false,
            nodeStyle: 0
        }
    },
    folderSort: true,
    sorters: [{
        property: 'text',
        direction: 'ASC'
    }]
});