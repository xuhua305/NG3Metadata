﻿Ext.define("EntityProperty.view.Toolbar", {
    extend: 'Ext.ng.Toolbar',
    xtype: 'maintoolbar',
    region: 'north',
    ngbuttons: [
        'save', "->", 'close'
    ]
});