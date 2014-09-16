if (typeof nodeType == "undefined") {
    var nodeType = {
        root: 0,
        classNode: 4,
        dicNode: 5,
        entityNode: 6,
        propertyNode: 8,
        serviceNode: 10,
        ui: 12
    };
}

if (typeof oType == "undefined") {
    var oType = {
        Add: 'add',
        Edit: 'edit',
        View: 'view'
    };
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function NewGuid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

var relationStyleSore = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: [
        { "value": 0, "text": "无" },
        { "value": 1, "text": "一对一" },
        { "value": 2, "text": "一对多" },
        { "value": 3, "text": "多对多" },
        { "value": 4, "text": "继承" }
    ]
});

var yesAndNo = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: [
        { "value": true, "text": "是" },
        { "value": false, "text": "否" }
    ]
});

var industryStyleStore = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: [
        { "value": 0, "text": "通用" },
        { "value": 2, "text": "制造业" },
        { "value": 4, "text": "工程建造" },
        { "value": 8, "text": "工程投资" },
        { "value": 16, "text": "服务业" }
    ]
});


var keyGenerateStyleStore = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: [
        { "value": 1, "text": "Guid" },
        { "value": 2, "text": "整数自增" },
        { "value": 3, "text": "程序分配" }
    ]
});

var uiInteractionStyleStore = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: [
        { "value": 0, "text": "其他方式" },
        { "value": 1, "text": "传统列表更新" },
        { "value": 2, "text": "列表编辑一体更新" },
        { "value": 3, "text": "传统编辑" },
        { "value": 4, "text": "传统编辑(表头表体)" }
    ]
});


var primaryKeyGenerateStyleStore = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: [
        { "value": 0, "text": "其他方式" },
        { "value": 1, "text": "程序分配" },
        { "value": 2, "text": "Guid方式" },
        { "value": 3, "text": "自增方式" }
    ]
});


var dataTypeStore = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: [
        { "value": 0, "text": "布尔型" },
        { "value": 1, "text": "字节型" },
        { "value": 2, "text": "字符型" },
        { "value": 3, "text": "日期型" },
        { "value": 4, "text": "短整型" },
        { "value": 5, "text": "长整型" },
        { "value": 6, "text": "浮点型" },
        { "value": 7, "text": "字符串型" },
        { "value": 8, "text": "字典型" }
    ]
});

var dataTypeStoreEx = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: [
        { "value": 0, "text": "布尔型" },
        { "value": 1, "text": "字节型" },
        { "value": 2, "text": "字符型" },
        { "value": 3, "text": "日期型" },
        { "value": 4, "text": "短整型" },
        { "value": 5, "text": "长整型" },
        { "value": 6, "text": "浮点型" },
        { "value": 7, "text": "字符型" },
        { "value": 8, "text": "字符串型" },
        { "value": 9, "text": "实体型" }
    ]
});

w = window;

function $GetWFrame() {
    try {
        var cw = window;
        while (cw != top) {
            if (cw.MainFrame)
                break;
            else
                cw = cw.parent;
        }
    } catch (e) { }
    return cw.MainFrame;
}

function $CloseTab(n) {

    var f = $GetWFrame();
    if (f && f.Center) {

        //;
        //f.Checker.fireEvent('checkin', f.Checker);//触发签入操作

        var tab = f.Center.getComponent(n) || f.Center.getActiveTab();

        f.Center.remove(tab);
    }
    else {
        w.close();
    }
}

Ext.define('Ext.ng.PropertiesRefresher', {
    mixins: {
        observable: 'Ext.util.Observable'
    },
    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);

        this.addEvents('RefreshProperties');
    }
});
