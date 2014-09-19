Ext.define("LayoutWizard.view.CardPanel", {
    extend: 'Ext.panel.Panel',
    xtype: 'cardPanel',
    title: '界面布局向导',
    layout: 'card',
    //bodyStyle: 'padding:15px',
    region: 'center',

    bbar: [
        {
            id: 'move-prev',
            text: '上一步',
            disabled: true
        },
        '->',
        {
            id: 'move-next',
            text: '下一步'
        }
    ],
    items: [
        {
            xtype: 'layoutSettingView'
        },
        {
            xtype: 'headAndBodySelectMainView'
        },
        {
            xtype: 'headZoneMainView'
        },
        {
            xtype: 'bodyZoneMainView'
        }
    ],
    renderTo: Ext.getBody()
});