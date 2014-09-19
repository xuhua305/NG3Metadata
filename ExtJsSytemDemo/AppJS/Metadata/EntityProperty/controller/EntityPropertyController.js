Ext.define('EntityProperty.controller.EntityPropertyController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'baseInfoForm',
            selector: 'baseInfoForm'
        },
        {
            ref: 'bizInfoForm',
            selector: 'bizInfoForm'
        },
        {
            ref: 'techInfoForm',
            selector: 'techInfoForm'
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
    stores: ['SourcePropertys', 'TargetPropertys'],
    views: ['Toolbar', 'TabPanel', 'TechInfoForm', 'BaseInfoForm', 'BizInfoForm', 'HelpInfoPanel', 'SourcePropertyGrid', 'TargetPropertyGrid'],
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
            }
        });
        this.currentDisplayNameWin = Ext.create('Ext.ng.languageWin');
        this.descriptionWin = Ext.create('Ext.ng.languageWin');
    },
    onNameChange: function (newValue, oldValue, eOpts) {
        this.getBaseFormNamespaceField().setValue(transferData.Namespace + '.' + newValue.getValue());
    },
    onCurrentDisplayNameFocus: function () {
        this.currentDisplayNameWin.showLanguageInfoWindow();
    },
    onDescriptionFocus: function () {
        this.descriptionWin.showLanguageInfoWindow();
    },
    onSave: function () {
        var me = this;
        var baseNodeInfoPanel = me.getBaseInfoForm().getForm(),
            bizNodeInfoPanel = me.getBizInfoForm().getForm(),
            techNodeInfoPanel = me.getTechInfoForm().getForm();
        

        if (!baseNodeInfoPanel.isValid() || !bizNodeInfoPanel.isValid() || !techNodeInfoPanel.isValid()) {
            alert('格式不符合要求');
            return;
        }
        var mergeData = MergeFormData([baseNodeInfoPanel, bizNodeInfoPanel, techNodeInfoPanel], 'id', otype);

        var displayNameData = me.currentDisplayNameWin.getLanguageGridInfo();
        var descriptionData = me.descriptionWin.getLanguageGridInfo();

        var action = '';
        switch (otype) {
            case oType.Add:
                action = "AddProperty";
                break;
            case oType.Edit:
                action = "UpdateProperty";
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
                    var frame = $GetWFrame();
                    if (frame) {
                        var listref = frame.ListObserver.get('propertiesList');
                        listref.fireEvent('RefreshProperties', baseNodeInfoPanel.getValues());
                    }
                } else {
                    Ext.MessageBox.alert('保存失败', resp.status);
                }
            }
        });
    },
    mobileApp: function () {
        top.createNewNodeAndTab('UiWizard', '界面向导', 'LayoutWizardView', oType.Add, nodeType.ui);
    },
    oaForm: function () {
        var me = this;
        window.open('../../html/Designer.html?pageName=' + me.getBaseFormNameField().getValue() + '&namespace=' + me.getBaseFormNamespaceField().getValue() + '&designerBillType=List');
    },
    bizForm: function () {
        var me = this;
        window.open('../../html/Designer.html?pageName=' + me.getBaseFormNameField().getValue() + '&namespace=' + me.getBaseFormNamespaceField().getValue() + '&designerBillType=Edit');
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

        var frame = $GetWFrame();
        if (frame) {
            var listref = Ext.create('Ext.ng.LanguageRefresher');
            frame.ListObserver.add('list', listref);
            listref.on('RefreshLanguage', function () {
                me.getBaseFormCurrentDisplayNameField().setValue(me.currentDisplayNameWin.getCurrentLanguageValue());
                me.getBizFormDescriptionField().setValue(me.descriptionWin.getCurrentLanguageValue());
            });
        }
    }
});