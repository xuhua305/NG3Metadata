Ext.define('Service.controller.ServiceController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'outputParamForm',
            selector: 'outputParamForm'
        },
        {
            ref: 'implementWayForm',
            selector: 'implementWayForm'
        },
        {
            ref: 'techInfoForm',
            selector: 'techInfoForm'
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
            ref: 'inputParamsGrid',
            selector: 'inputParamsGrid'
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
    stores: ['ImplementSytles', 'InputParams'],
    //'BaseInfoForm', 'BizInfoForm', 'ImplementWayForm', 'InputParamsGrid','InputToolbar','OutputParamForm','TabPanel', 'TechInfoForm',
    views: ['Toolbar', 'BaseInfoForm', 'BizInfoForm', 'ImplementWayForm', 'InputParamsGrid', 'InputToolbar', 'OutputParamForm', 'TabPanel', 'TechInfoForm'],
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
            'inputToolbar #addInputRow': {
                click: this.onInputTbAddRow
            },
            'inputToolbar #deleteInputRow': {
                click: this.onInputTbDeleteRow
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
            var baseNodeInfoForm = me.getBaseInfoForm().getForm(),
                bizNodeInfoForm = me.getBizInfoForm().getForm(),
                techNodeInfoForm = me.getTechInfoForm().getForm(),
                implementWayForm = me.getImplementWayForm().getForm(),
                outputParamForm = me.getOutputParamForm().getForm(),
                intputParamsGridStore = me.getInputParamsStore();


            baseNodeInfoForm.setValues(transferData);
            bizNodeInfoForm.setValues(transferData);
            techNodeInfoForm.setValues(transferData);
            implementWayForm.setValues(transferData);
            outputParamForm.setValues(outputParamData);
            intputParamsGridStore.insert(intputParamsGridStore.getCount(), inputParamsGridData);

            me.getBaseFormCurrentDisplayNameField().setValue(transferData.CurrentDisplayName);

            if (displayData[0])
                currentDisplayNameWin.initLanguageGridInfo(displayData);
            if (descriptionData[0])
                descriptionWin.initLanguageGridInfo(descriptionData);
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
    onSave: function () {
        var me = this;
        var baseNodeInfoPanel = me.getBaseInfoForm().getForm(),
            bizNodeInfoPanel = me.getBizInfoForm().getForm(),
            techNodeInfoPanel = me.getTechInfoForm().getForm(),

            implementWayPanel = me.getImplementWayForm().getForm(),

            outputParamInfoPanel = me.getOutputParamForm().getForm(),
            inputParamsGrid = me.getInputParamsGrid();

        if (!baseNodeInfoPanel.isValid() || !bizNodeInfoPanel.isValid() || !techNodeInfoPanel.isValid() || !implementWayPanel.isValid() ||
                !outputParamInfoPanel.isValid() || !inputParamsGrid.isValid()) {
            alert('格式不符合要求');
            return;
        }
        var mergeData = MergeFormData([baseNodeInfoPanel, bizNodeInfoPanel, techNodeInfoPanel, implementWayPanel], 'id', otype);
        var outputData = outputParamInfoPanel.getFormData();
        var inputGriddData = inputParamsGrid.getAllGridData();

        var displayNameData = me.currentDisplayNameWin.getLanguageGridInfo();
        var descriptionData = me.descriptionWin.getLanguageGridInfo();

        var action = '';
        switch (otype) {
            case oType.Add:
                action = "AddService";
                break;
            case oType.Edit:
                action = "UpdateService";
                break;
            default:
        }

        Ext.Ajax.request({
            params: { 'mergeData': mergeData, 'outputParamData': outputData, 'inputParamGridData': inputGriddData, 'displayNameData': displayNameData, 'descriptionData': descriptionData },
            url: C_ROOT + action,
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.status === "ok") {
                    if (resp.id && resp.id.length != 0 && resp.name && resp.name.length != 0) {
                        top.setCurrentNodeValue(resp.id, resp.name);
                    }

                } else {
                    Ext.MessageBox.alert('保存失败', resp.status);
                }
            }
        });
    },
    onInputTbAddRow: function () {
        var data = [{
            'Id': '',
            'Name': '',
            'DataType': 0,
            'AssociateId': ''
        }];
        var inputParamsGrid = this.getInputParamsGrid();
        var intputParamsGridStore = this.getInputParamsStore();
        var count = intputParamsGridStore.getCount();
        intputParamsGridStore.insert(count, data);
        inputParamsGrid.getSelectionModel().select(count);
    },
    onInputTbDeleteRow: function () {
        var inputParamsGrid = this.getInputParamsGrid(),
            intputParamsGridStore = this.getInputParamsGrid();
        var data = inputParamsGrid.getSelectionModel().getSelection();
        if (data.length > 0) {
            Ext.Array.each(data, function (record) {
                intputParamsGridStore.remove(record);
            });
        }
    }
});