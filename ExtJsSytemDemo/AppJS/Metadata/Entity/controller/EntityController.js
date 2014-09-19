Ext.define('Entity.controller.EntityController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'targetPropertyCombo',
            selector: 'ngComboBox [name=metadataEntity]'
        },
        {
            ref: 'relationGrid',
            selector: 'relationGrid'
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
            ref: 'entityHelpForm',
            selector: 'entityHelpForm'
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
    stores: ['Relations', 'Propertys'],
    views: ['BaseInfoForm', 'BizInfoForm', 'EntityHelpForm', 'PropertyGrid', 'PropertyToolbar', 'RelationGrid', 'RelationToolbar', 'TabPanel', 'TechInfoForm', 'Toolbar'],
    init: function () {
        this.control({
            'relationGrid': {
                edit: this.onRelationGridEdit
            },
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
            'relationToolbar #addRelation': {
                click: this.onRelationTbAddRow
            },
            'relationToolbar #deleteRelation': {
                click: this.onRelationTbDeleteRow
            },
            'propertyToolbar #addProperty': {
                click: this.onPropertyTbAddRow
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
            var baseNodeInfoForm = me.getBaseInfoForm().getForm(),
                bizNodeInfoForm = me.getBizInfoForm().getForm(),
                entityHelpForm = me.getEntityHelpForm().getForm(),
                techNodeInfoForm = me.getTechInfoForm().getForm(),
                relationGridStore = me.getRelationsStore(),
                propertyGridStore = me.getPropertysStore();

            baseNodeInfoForm.setValues(transferData);
            bizNodeInfoForm.setValues(transferData);
            entityHelpForm.setValues(transferData);
            techNodeInfoForm.setValues(transferData);

            me.getBaseFormCurrentDisplayNameField().setValue(transferData.CurrentDisplayName);
            relationGridStore.insert(relationGridStore.getCount(), transferGridData);
            propertyGridStore.insert(propertyGridStore.getCount(), transferPropertiesGridData);

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
            var propertiesListref = Ext.create('Ext.ng.PropertiesRefresher');
            frame.ListObserver.add('propertiesList', propertiesListref);
            propertiesListref.on('RefreshProperties', function (data) {
                propertyGridStore.insert(propertyGridStore.getCount(), data);
            });
        }
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
    onRelationGridEdit: function (editor, e) {
        if (e.field == 'TargetEntityId') {
            this.getTargetPropertyCombo().setOutFilter({ ParentId: e.value });
        }
    },
    onSave: function () {
        var me=this;
        var baseNodeInfoPanel = me.getBaseInfoForm(),
            bizNodeInfoPanel = me.getBizInfoForm(),
            techNodeInfoPanel = me.getTechInfoForm(),
            relationGrid = me.getRelationGrid(),
            entityHelpPanel = me.getEntityHelpForm();

        if (!baseNodeInfoPanel.isValid() || !bizNodeInfoPanel.isValid() || !techNodeInfoPanel.isValid() || !relationGrid.isValid() || !entityHelpPanel.isValid()) {
            alert('格式不符合要求');
            return;
        }
        var mergeData = MergeFormData([baseNodeInfoPanel, bizNodeInfoPanel, techNodeInfoPanel, entityHelpPanel], 'id', otype);
        var gridData = relationGrid.getAllGridData();

        var displayNameData = currentDisplayNameWin.getLanguageGridInfo();
        var descriptionData = descriptionWin.getLanguageGridInfo();

        var action = '';
        switch (otype) {
            case oType.Add:
                action = "AddEntity";
                break;
            case oType.Edit:
                action = "UpdateEntity";
                break;
            default:
        }

        Ext.Ajax.request({
            params: { 'mergeData': mergeData, 'gridData': gridData, 'displayNameData': displayNameData, 'descriptionData': descriptionData },
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
    onRelationTbAddRow: function () {
        var relationGridStore = this.getRelationsStore();
        var data = [{
            'Id': '',
            'RelationType': '',
            'SourcePropertyId': '',
            'TargetEntityId': '',
            'TargetPropertyId': ''
        }];
        var count = relationGridStore.getCount();
        relationGridStore.insert(count, data);
        this.getRelationGrid().getSelectionModel().select(count);
    },
    onRelationTbDeleteRow: function () {
        var me = this;
        var data = this.getRelationGrid().getSelectionModel().getSelection();
        if (data.length > 0) {
            Ext.Array.each(data, function (record) {
                me.getRelationsStore().remove(record);
            });
        }
    },
    onPropertyTbAddRow: function () {
        top.createNewNodeAndTab('NewEntityProperty', '新建实体字段', 'EntityPropertyView', oType.Add, nodeType.propertyNode);
    }
});