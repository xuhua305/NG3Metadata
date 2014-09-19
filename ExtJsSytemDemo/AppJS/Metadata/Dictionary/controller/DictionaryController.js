Ext.define('Dictionary.controller.DictionaryController', {
    extend: 'Ext.app.Controller',
    refs: [
        { 
            ref: 'contentGrid',
            selector: 'contentGrid'
        },
        {
            ref: 'bizInfoForm',
            selector: 'bizInfoForm'
        },
        {
            ref: 'baseInfoForm',
            selector: 'baseInfoForm'
        },
        {
            ref: 'baseFormNamespaceField',
            selector: 'baseInfoForm #Namespace'
        },
        {
            ref: 'baseFormVersionField',
            selector: 'baseInfoForm #Version'
        },
        {
            ref: 'baseFormNameField',
            selector: 'baseInfoForm #Name'
        },
        {
            ref: 'baseFormCurrentDisplayNameField',
            selector: 'baseInfoForm #CurrentDisplayName'
        },
        {
            ref: 'baseFormDisplayNameField',
            selector: 'baseInfoForm #DisplayName'
        },
        {
            ref: 'baseFormParentIdField',
            selector: 'baseInfoForm #ParentId'
        },
        {
            ref: 'bizFormDescriptionField',
            selector: 'bizInfoForm #Description'
        },
        {
            ref: 'baseFormIdField',
            selector: 'baseInfoForm #Id'
        }
    ],
    stores: ['Contents'],
    views: ['BaseInfoForm', 'BizInfoForm', 'ChildToolbar', 'ContentGrid', 'Toolbar', 'TabPanel'],
    init: function () {
        this.control({
            'baseInfoForm #Name': {
                change: this.onNameChange
            },
            'baseInfoForm #CurrentDisplayName': {
                focus: this.onCurrentDisplayNameFocus
            },
            'bizInfoForm #Description': {
                focus: this.onDescriptionFocus
            },
            'maintoolbar #save': {
                click: this.onSave
            },
            'childToolbar #addrow': {
                click: this.onContentAddrow
            },
            'childToolbar #deleterow': {
                click: this.onContentDeleterow
            }
        });
        this.currentDisplayNameWin = Ext.create('Ext.ng.languageWin');
        this.descriptionWin = Ext.create('Ext.ng.languageWin');
    },
    onLaunch: function () {
        var me = this;
        if (otype == oType.Add) {
            me.getBaseFormIdField().setValue(buskey);
            me.getBaseFormParentIdField().setValue(transferData.ParentId);
            me.getBaseFormNamespaceField().setReadOnly(true);
            me.getBaseFormNamespaceField().setValue(transferData.Namespace + '.');
            me.getBaseFormVersionField().setReadOnly(true);
            me.getBaseFormVersionField().setValue('1.0.0.0');
            me.getBaseFormNameField().setValue(transferData.Name);
            me.getBaseFormCurrentDisplayNameField().setValue(transferData.CurrentDisplayName);
        }
        else if (otype == oType.Edit) {
            var baseNodeInfoForm = me.getBaseNodeInfoForm().getForm();
            var bizNodeInfoForm = me.getBizNodeInfoForm().getForm();
            baseNodeInfoForm.setValues(transferData);
            bizNodeInfoForm.setValues(transferData);
            me.getBaseFormCurrentDisplayNameField().setValue(transferData.CurrentDisplayName);
            var gridStore = me.getContentsStore();
            gridStore.insert(gridStore.getCount(), transferGridData);
        }

        var frame = $GetWFrame();
        if (frame) {
            var listref = Ext.create('Ext.ng.LanguageRefresher');
            frame.ListObserver.add('list', listref);
            listref.on('RefreshLanguage', function () {
                me.getBaseFormCurrentDisplayNameField().setValue(me.currentDisplayNameWin.getCurrentLanguageValue());
                me.getBizFormDescriptionField().setValue(me.descriptionWin.getCurrentLanguageValue());
            });
        }
    },
    onNameChange: function (newValue, oldValue, eOpts) {
        this.getBaseFormNamespaceField().setValue(transferData.Namespace + '.' + newValue.getValue());
    },
    onSave: function () {
        var me = this,
            baseNodeInfoPanel = me.getBizInfoForm(),
            bizNodeInfoPanel = me.getBizInfoForm(),
            dicContentGrid = me.getContentGrid();
        if (!baseNodeInfoPanel.isValid() || !bizNodeInfoPanel.isValid() || !dicContentGrid.isValid()) {
            alert('格式不符合要求');
            return;
        }
        var mergeData = MergeFormData([baseNodeInfoPanel, bizNodeInfoPanel], 'id', otype);
        var gridData = dicContentGrid.getAllGridData();

        var action = '';
        switch (otype) {
            case oType.Add:
                action = "AddDictionary";
                break;
            case oType.Edit:
                action = "UpdateDictionary";
                break;
            default:
        }

        var displayNameData = me.currentDisplayNameWin.getLanguageGridInfo();
        var descriptionData = me.descriptionWin.getLanguageGridInfo();

        Ext.Ajax.request({
            params: { 'mergeData': mergeData, 'gridData': gridData, 'displayNameData': displayNameData, 'descriptionData': descriptionData },
            url: C_ROOT + action,
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.status === "ok") {
                    if (resp.id && resp.id.length != 0 && resp.name && resp.name.length != 0) {
                        top.setCurrentNodeValue(resp.id, resp.name);
                    }
                    $CloseTab();
                } else {
                    Ext.MessageBox.alert('保存失败', resp.status);
                }
            }
        });
    },
    onCurrentDisplayNameFocus: function () {
        this.currentDisplayNameWin.showLanguageInfoWindow();
    },
    onDescriptionFocus: function () {
        this.descriptionWin.showLanguageInfoWindow();
    },
    onContentAddrow: function () {
        var me = this;
        var data = [{
            'Id': '',
            'ContentItem': '',
            'Description': ''
        }];
        var gridStore = me.getContentsStore();
        var count = gridStore.getCount();
        gridStore.insert(count, data);
        me.getContentGrid().getSelectionModel().select(count);
    },
    onContentDeleterow: function () {
        var me = this;
        var gridStore = me.getContentsStore();
        var dicContentGrid = me.getContentGrid()
        var data = dicContentGrid.getSelectionModel().getSelection();
        if (data.length > 0) {
            Ext.Array.each(data, function (record) {
                gridStore.remove(record);
            });
        }
    }
});