

Ext.define('Ext.ux.TriggerField', {
    extend: 'Ext.form.field.Trigger',
    helpid: 'secuser',
    onTriggerClick: function () {

        Ext.define('model', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'code',
                type: 'string',
                mapping: 'code'
            }, {
                name: 'name',
                type: 'string',
                mapping: 'name'
            }
            ]
        });

        var store = Ext.create('Ext.data.Store', {
            model: 'model',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: '../Help/GetItemHelp',
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'total'
                }
            }
        });
        store.load();

        var pagingbar = Ext.create('Ext.PagingToolbar', {
            store: store,
            displayInfo: true,
            displayMsg: '第 {0} - {1}条 共 {2} 条数据',
            emptyMsg: "没有任何数据",
            beforePageText: "第",
            afterPageText: "/{0} 页",
            firstText: "首页",
            prevText: "上一页",
            nextText: "下一页",
            lastText: "尾页",
            refreshText: "刷新"
        });

        var grid = Ext.create('Ext.grid.Panel', {
            region: 'center',
            //frame: true,
            store: store,
            columnLines: true,
            //selType: 'cellmodel',
            //selModel: Ext.create('Ext.selection.CheckboxModel'),
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            columns: [Ext.create('Ext.grid.RowNumberer', { text: '行号', width: 35 }),
             {
                 header: '代码',
                 flex: 1,
                 sortable: true,
                 dataIndex: 'code',
                 hidden: false
             }, {
                 header: '名称',
                 flex: 1,
                 sortable: true,
                 dataIndex: 'name',
                 editor: {
                     allowBlank: false
                 }
             }],
            viewConfig: {
                forceFit: true,
                scrollOffset: 0
            },
            //forceFit: true,
            //plugins: [cellEditing],
            bbar: pagingbar
        });

        var win = Ext.create('Ext.window.Window', {
            title: 'Hello',
            height: 300,
            width: 400,
            layout: 'fit',
            items: [grid]
        }).show();

        var me = this;

        grid.on('itemdblclick', function () {
            //debugger;
            var data = grid.getSelectionModel().getSelection();

            if (data.length > 0) {
                var code = data[0].get('code');
                var name = data[0].get('name');
                this.setValue(code);
                win.hide();
            }
        }, this)

    }
})

Ext.define('Ext.ux.ComboBox', {
    extend: 'Ext.form.ComboBox',
    pageSize: 10,
    minChars: 1,
    //fieldLabel: 'Country:',
    //hiddenName: String,
    valueField: 'code',
    displayField: 'name',
    //forceSelection: true,
    //selectOnFoucus: true,
    typeAhead: true,//延时查询
    typeAheadDelay: 1000,//延迟500毫秒，默认是250
    //valueNotFoundText: 'Select a Country!!...',
    mode: 'remote',
    triggerAction: 'all', //'query',
    //emptyText: 'Select a Country...',
    store: new Ext.data.JsonStore({
        //url: 'Help/GetProvince',
        pageSize: 10,//这个决定页大小
        //autoLoad:true,
        fields: [
        { name: 'name', mapping: 'name' },
        { name: 'code', mapping: 'code' },
        { name: 'flag', mapping: 'flag' }
        ],
        proxy: {
            type: 'ajax',
            url: '../Help/GetProvince',
            reader: {
                type: 'json',
                root: 'provinces',
                totalProperty: 'total'
                //idProperty: 'name'
            }
        }
        //root:'provinces',
        //sortInfo:{field: "name", direction: "ASC"}
    }),
    listeners: {
        load: function (records, operation, success) {
            alert('xx');
            //this.setValue(this.getValue);
        }
    },
    //tpl: '<tpl for="."><div ext:qtip="{name}. ({code})" class="x-combo-list-item"><img src="resources/images/flags/{flag}.png" width="16" height="11" alt="" border="0" />{name}</div></tpl>',
    listConfig: {
        getInnerTpl: function() {
            return '<div data-qtip="{code}. {slogan}">{code}  ({name})</div>';
        }
    },
    initComponent: function () {
        this.callParent();

        var me = this;
        //this.setRawValue("01");
        this.store.on("load", function (records, operation, success) {
            //debugger;
            //alert(me.getValue());
            //me.setValue(me.getValue());
        });
    },
    onTriggerClick: function () {
        var me = this;
        //this.setRawValue('01');

        Ext.define('model', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'code',
                type: 'string',
                mapping: 'code'
            }, {
                name: 'name',
                type: 'string',
                mapping: 'name'
            }
            ]
        });

        var store = Ext.create('Ext.data.Store', {
            model: 'model',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: '../Help/GetItemHelp',
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'total'
                }
            }
        });
        store.load();

        var pagingbar = Ext.create('Ext.PagingToolbar', {
            store: store,
            displayInfo: true,
            displayMsg: '第 {0} - {1}条 共 {2} 条数据',
            emptyMsg: "没有任何数据",
            beforePageText: "第",
            afterPageText: "/{0} 页",
            firstText: "首页",
            prevText: "上一页",
            nextText: "下一页",
            lastText: "尾页",
            refreshText: "刷新"
        });

        var grid = Ext.create('Ext.grid.Panel', {
            region: 'center',
            //frame: true,
            store: store,
            columnLines: true,
            //selType: 'cellmodel',
            //selModel: Ext.create('Ext.selection.CheckboxModel'),
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            columns: [Ext.create('Ext.grid.RowNumberer', { text: '行号', width: 35 }),
             {
                 header: '代码',
                 flex: 1,
                 sortable: true,
                 dataIndex: 'code',
                 hidden: false
             }, {
                 header: '名称',
                 flex: 1,
                 sortable: true,
                 dataIndex: 'name',
                 editor: {
                     allowBlank: false
                 }
             }],
            viewConfig: {
                forceFit: true,
                scrollOffset: 0
            },
            //forceFit: true,
            //plugins: [cellEditing],
            bbar: pagingbar
        });

          grid.on('itemdblclick', function () {
            //debugger;
            var data = grid.getSelectionModel().getSelection();

            if (data.length > 0) {
                var code = data[0].get('code');
                var name = data[0].get('name');

                //this.setRawValue(name);                
                //this.setValue(code);               

                var valuepair = Ext.ModelManager.create({
                    code: code,
                    name: name
                }, 'model');

                this.setValue(valuepair);//必须这么设置才能成功

                win.hide();
            }
        }, this)

        var win = Ext.create('Ext.window.Window', {
            title: 'Hello',
            height: 300,
            width: 400,
            layout: 'fit',
            items: [grid]
        }).show();


      

    }

})


//-------获取Ext.form.Panel对象的数据-----
//
//form: 表单Ext.form.Panel对象
//key: 单据的主键,多主键以","号为分隔符
//optype:操作类型, 新增：new,修改：edit
//返回json格式数据
//----------------------------------------------
function GetExtJsFormData(form, key, optype) {

    if (optype === 'new') {
        optype = 'newRow';
    }
    else {
        optype = 'modifiedRow';
    } 

    var formdata = form.getForm();
    var data = formdata.getValues();
    data["key"] = data[key];
    
    var obj = new Object();
    obj['key'] = key;
    obj[optype] = data;    
    data = { 'form': obj };

    var json = JSON.stringify(data);//Ext.encode(data);
    return json;
}

//----------获取ExtJs.Grid对象的数据----------
//store : Ext.data.Store对象
//key : 主键列，多主键以","为分隔符
//返回json格式数据
//------------------------------------------------
function GetExtJsGridData(store, key) {

    var newRecords = store.getNewRecords(); //获得新增行  
    var modifyRecords = store.getUpdatedRecords(); // 获取修改的行的数据，无法获取幻影数据 
    var removeRecords = store.getRemovedRecords(); //获取移除的行
   
    var newdata = [];
    Ext.Array.each(newRecords, function (record) {

        //debugger;
        var newobj = record.data;
        newobj["key"] = null;
        newobj = { 'row': newobj }; //行标记
        newdata.push(newobj);
    });


    var modifydata = [];
    Ext.Array.each(modifyRecords, function (record) {

        debugger;
        var modifyobj = new Object(); //record.modified;

        //处理主键
        var keys = key.split(',');
        var values = '';
        for (i = 0; i < keys.length; i++) {
            if (i < (keys.length - 1)) {
                if (record.data[keys[i]]) {
                    values += record.data[keys[i]];
                }
                else {
                    values += "";
                }

                values += ",";
            }
            else {
                if (record.data[keys[i]]) {
                    values += record.data[keys[i]];
                }
                else {
                    values += "";
                }
            }
        }      

        //处理修改的字段,只传修改的部分,减少数据传输量
        var modified = new Object();
        modified["key"] = values;
        for (var p in record.modified) {
            modified[p] = record.data[p];
        }       
        modifyobj = { 'row': modified }; //行标记

        modifydata.push(modifyobj);

    });

    var removedata = [];
    Ext.Array.each(removeRecords, function (record) {
        //debugger;

        var object = new Object();
        //object[key] = record.get(key);

        var keys = key.split(',');
        var values = "";
        for (i = 0; i < keys.length; i++) {
            if (i < (keys.length - 1)) {
                if (record.data[keys[i]]) {
                    values += record.data[keys[i]];
                }
                else {
                    values += "";
                }

                values += ",";
            }
            else {
                if (record.data[keys[i]]) {
                    values += record.data[keys[i]];
                }
                else {
                    values += "";
                }
            }
        }
        object["key"] = values;
        object = { 'row': object }; //行标记
        removedata.push(object);
    });

    var data = new Object();
    data['key'] = key;

    //debugger;
    if (newdata.length > 0) {
        data['newRow'] = newdata;
    }
    if (modifydata.length > 0) {
        data['modifiedRow'] = modifydata;
    }
    if (removedata.length > 0) {
        data['deletedRow'] = removedata;
    }
    data = { 'table': data };

    var json = JSON.stringify(data);//Ext.encode(data);
    return json;
}

function FormatToDate(CurrTime,format) {

    //"Mon Jan 7 15:07:37 UTC+0800 2013";

    //"Thu Jan 03 2013 00:00:00 GMT+0800"

    //debugger;

    CurrTime = CurrTime + '';
    var date = '';
    var month = new Array();
    month["Jan"] = 1;
    month["Feb"] = 2;
    month["Mar"] = 3;
    month["Apr"] = 4;
    month["May"] = 5;
    month["Jun"] = 6;
    month["Jul"] = 7;
    month["Aug"] = 8;
    month["Sep"] = 9;
    month["Oct"] = 10;
    month["Nov"] = 11;
    month["Dec"] = 12;

    var str = CurrTime.split(" ");

    if (CurrTime.indexOf('UTC') > 0) {
        if (format === "yyyy-mm-dd") {
            date = str[5] + '-' + month[str[1]] + '-' + str[2];
        }
        else if (format.toLocaleLowerCase() === "yyyy-mm-dd hh:mm:ss") {
            date = str[5] + '-' + month[str[1]] + '-' + str[2] + " " + str[3];
        }
    }
    else if (CurrTime.indexOf('GMT') > 0) {
        if (format.toLocaleLowerCase() === "yyyy-mm-dd") {
            date = str[3] + '-' + month[str[1]] + '-' + str[2];
        }
        else if (format.toLocaleLowerCase() === "yyyy-mm-dd hh:mm:ss") {
            date = str[3] + '-' + month[str[1]] + '-' + str[2] + " " + str[4];
        }
    }
   

    return date;
}


function BindCombox(combox,code,name,helpid, codeValue) {
    Ext.Ajax.request({
        //params: { 'id': busid },
        url: '../SUP/CommonHelp?helpid=' + helpid,
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            if (resp.status === "ok") {

                //debugger;
               
                Ext.define('model', {
                    extend: 'Ext.data.Model',
                    fields: [{
                        name: code,//'code',
                        type: 'string',
                        mapping: code//'code'
                    }, {
                        name: name,//'name',
                        type: 'string',
                        mapping: name//'name'
                    }
                     ]
                });

                var provincepair = Ext.ModelManager.create({
                    code: codeValue,
                    name: resp.name
                }, 'model');
                combox.setValue(provincepair);
               
            } else {
                Ext.MessageBox.alert('取数失败', resp.status);
            }
        }
    });
}

