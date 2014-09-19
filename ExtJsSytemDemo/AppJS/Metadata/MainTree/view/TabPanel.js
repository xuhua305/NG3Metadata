Ext.define("MainTree.view.TabPanel", {
    extend: 'Ext.tab.Panel',
    xtype:'mainTabPanel',
    region: "center",
    autoScroll: true,
    enableTabScroll: true,
    activeTab: 0,
    onTitleDbClick: function (e, target, o) {
        var t = this.findTargets(e);
        if (t.item && t.item.closable) {
            if (t.item.fireEvent('beforeclose', t.item) !== false) {
                t.item.fireEvent('close', t.item);
                this.remove(t.item);
            }
        }
    },
    items: [{
        xtype: 'panel',
        id: "tab1",
        title: '首页',
        html: "这只是一个非常普通的Tab。"
        //closable: false,
        //autoLoad: {
        //    url: 'home/xxx',
        //    scope: this,
        //    scripts: true,
        //    text: '页面加载中,请稍候....'
        //}
    }]
});