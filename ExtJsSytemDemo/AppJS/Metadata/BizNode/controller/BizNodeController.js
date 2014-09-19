Ext.define('BizNode.controller.BizNodeController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'bizNodeInfoForm',
            selector: 'bizNodeInfoForm'
        },
        {
            ref: 'baseNodeInfoForm',
            selector: 'baseNodeInfoForm'
        },
        {
            ref: 'baseFormNamespaceField',
            selector: 'baseNodeInfoForm #Namespace'
        },
        {
            ref: 'baseFormVersionField',
            selector: 'baseNodeInfoForm #Version'
        },
        {
            ref: 'baseFormNameField',
            selector: 'baseNodeInfoForm #Name'
        },
        {
            ref: 'baseFormCurrentDisplayNameField',
            selector: 'baseNodeInfoForm #CurrentDisplayName'
        },
        {
            ref: 'baseFormDisplayNameField',
            selector: 'baseNodeInfoForm #DisplayName'
        },
        {
            ref: 'baseFormParentIdField',
            selector: 'baseNodeInfoForm #ParentId'
        },
        {
            ref: 'bizFormDescriptionField',
            selector: 'bizNodeInfoForm #Description'
        },
        {
            ref: 'baseFormIdField',
            selector: 'baseNodeInfoForm #Id'
        }
    ],
    stores: [],
    views: ['BaseNodeInfoForm', 'BizNodeInfoForm', 'TabPanel', 'Toolbar'],
    init: function () {
        this.control({
            'baseNodeInfoForm #Name': {
                change: this.onNameChange
            },
            'baseNodeInfoForm #CurrentDisplayName': {
                focus: this.onCurrentDisplayNameFocus
            },
            'bizNodeInfoForm #Description': {
                focus: this.onDescriptionFocus
            },
            'ngtoolbar #save': {
                click: this.onSave
            }
        });
        this.currentDisplayNameWin = Ext.create('Ext.ng.languageWin');
        this.descriptionWin = Ext.create('Ext.ng.languageWin');
    },
    onSave: function () {
        var me = this;
        var mergeData = MergeFormData([me.getBaseNodeInfoForm(), me.getBizNodeInfoForm()], 'id', otype);
                
        var displayNameData = me.currentDisplayNameWin.getLanguageGridInfo();
        var descriptionData = me.descriptionWin.getLanguageGridInfo();
                
        var action = '';
        switch (otype) {
            case oType.Add:
                action = "AddNode";
                break;
            case oType.Edit:
                action = "UpdateNode";
                break;
            default:
        }

        Ext.Ajax.request({
            params: { 'mergeData': mergeData, 'displayNameData': displayNameData, 'descriptionData': descriptionData },
            url: C_ROOT + action,
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.status === "ok") {
                    if (resp.id && resp.id.length != 0 && resp.name && resp.name.length != 0) {
                        top.setCurrentNodeValue(resp.id, resp.name);
                    }
                    Ext.MessageBox.alert('保存成功', resp.status);
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
            if (displayData[0])
            me.currentDisplayNameWin.initLanguageGridInfo(displayData);
            if (descriptionData[0])
            me.descriptionWin.initLanguageGridInfo(descriptionData);
        }
        me.getBaseFormCurrentDisplayNameField().setReadOnly(true);
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
    }
});