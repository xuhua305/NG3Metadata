using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using NG3.Metadata.Core;
using NG3.Metadata.Core.Service;
using NG3.Metadata.Core.Ui;
using NG3.Metadata.Core.Ui.Layout;
using NG3.Metadata.ReverseEngine.Supcan;

namespace NG3.Metadata.ReverseEngine.JavaScript
{
    /// <summary>
    /// Javascript生成
    /// </summary>
    public class CustomJavaScript
    {

        private JsCodeInfo _jsCodeInfo = new JsCodeInfo();
        private IList<JsEventData> _jsEventDatas = null;
        private string _pageName = string.Empty;
        private string _namesapce = string.Empty;
        private bool _isList = false;
        private UiTemplate _uiTemplate = null;
        private const string MainRuntimeComponentName = "AF";

        public CustomJavaScript(string pageName, string np, UiTemplate uiTemplate, bool isList, IList<JsEventData> jsEventDatas)
        {
            _pageName = pageName;
            _namesapce = np;
            _uiTemplate = uiTemplate;
            _isList = isList;
            _jsEventDatas = jsEventDatas;
        }

        private string GetRelativePath()
        {
            string[] strArray = _namesapce.Split('.');
            int num = strArray.Length + 2;
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < num; i++)
            {
                sb.Append("../");
            }
            return sb.ToString();
        }

        //protected string GenerateFields()
        //{
        //    try
        //    {
        //        StringBuilder sb = new StringBuilder();
        //        sb.Append("var currentRowindex = 0;");
        //        sb.Append(Environment.NewLine);
        //        return sb.ToString();
        //    }
        //    catch (Exception)
        //    {
                
        //        throw;
        //    }
        //}

        protected void GenerateOnReady(string layoutXml)
        {
            try
            {
                JsCodeStructure jsCodeStructure = new JsCodeStructure();
                jsCodeStructure.MethodName = "OnReady";
                jsCodeStructure.MethodParam = "id";
                jsCodeStructure.Comment = string.Empty;

                StringBuilder jsContentBuilder = new StringBuilder();
                string path = _namesapce.Replace(".", "/");
                if (_isList)
                {
                    jsContentBuilder.Append("AF.func('Build', '"+GetRelativePath()+"xml/"+path+"/List/Layout.xml');");
                }
                else
                {
                    jsContentBuilder.Append("AF.func('Build', '"+GetRelativePath()+"xml/"+path+"/Edit/Layout.xml');");
                }

                jsContentBuilder.Append(Environment.NewLine);
                jsContentBuilder.Append("GenerateFunctionAndProperty(AF, '');");
                jsContentBuilder.Append(Environment.NewLine);
                jsContentBuilder.Append("if (onBeforeLoadUi){");
                jsContentBuilder.Append(Environment.NewLine);
                jsContentBuilder.Append("onLoadUi();");
                jsContentBuilder.Append(Environment.NewLine);
                jsContentBuilder.Append("onAfterLoadUi();");
                jsContentBuilder.Append(Environment.NewLine);
                jsContentBuilder.Append("}");
                jsContentBuilder.Append(Environment.NewLine);
                jsContentBuilder.Append("if (onBeforeLoadData){");
                jsContentBuilder.Append(Environment.NewLine);
                jsContentBuilder.Append("onLoadData();");
                jsContentBuilder.Append(Environment.NewLine);
                jsContentBuilder.Append("onAfterLoadData();");
                jsContentBuilder.Append(Environment.NewLine);
                jsContentBuilder.Append("}");
                jsContentBuilder.Append(Environment.NewLine);

                jsCodeStructure.MethodBody = jsContentBuilder.ToString();
                _jsCodeInfo.AddFunc(jsCodeStructure);
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        protected void GenerateOnBeforeLoadUi()
        {
            try
            {
                JsCodeStructure jsCodeStructure = new JsCodeStructure();
                jsCodeStructure.MethodName = "onBeforeLoadUi";
                jsCodeStructure.MethodParam = string.Empty;
                jsCodeStructure.Comment = string.Empty;

                jsCodeStructure.MethodBody = string.Empty;
                _jsCodeInfo.AddFunc(jsCodeStructure);
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        protected void GenerateOnLoadUi()
        {
            try
            {
                JsCodeStructure jsCodeStructure = new JsCodeStructure();
                jsCodeStructure.MethodName = "onLoadUi";
                jsCodeStructure.MethodParam = string.Empty;
                jsCodeStructure.Comment = string.Empty;

                StringBuilder sb = new StringBuilder();
                if (!_isList)
                {
                    sb.Append("switch (otype) {");
                    sb.Append(Environment.NewLine);
                    sb.Append("case uiStatus.Add:");
                    sb.Append(Environment.NewLine);
                    sb.Append("break;");
                    sb.Append(Environment.NewLine);
                    sb.Append("case uiStatus.Edit:");
                    sb.Append(Environment.NewLine);
                    sb.Append("break;");
                    sb.Append(Environment.NewLine);
                    sb.Append("case uiStatus.View:");
                    sb.Append(Environment.NewLine);
                    sb.Append("AF.self.setEditAble(false);");
                    sb.Append(Environment.NewLine);
                    sb.Append("break;");
                    sb.Append(Environment.NewLine);
                    sb.Append("default:");
                    sb.Append(Environment.NewLine);
                    sb.Append("break;");
                    sb.Append(Environment.NewLine);
                    sb.Append("}");
                    sb.Append(Environment.NewLine);
                }

                jsCodeStructure.MethodBody = sb.ToString();
                _jsCodeInfo.AddFunc(jsCodeStructure);
            }
            catch (Exception)
            {

                throw;
            }
        }

        protected void GenerateOnAfterLoadUi()
        {
            try
            {
                JsCodeStructure jsCodeStructure = new JsCodeStructure();
                jsCodeStructure.MethodName = "onAfterLoadUi";
                jsCodeStructure.MethodParam = string.Empty;
                jsCodeStructure.Comment = string.Empty;

                jsCodeStructure.MethodBody = string.Empty;
                _jsCodeInfo.AddFunc(jsCodeStructure);
            }
            catch (Exception)
            {

                throw;
            }
        }

        protected void GenerateOnBeforeLoadData()
        {
            try
            {
                JsCodeStructure jsCodeStructure = new JsCodeStructure();
                jsCodeStructure.MethodName = "onBeforeLoadData";
                jsCodeStructure.MethodParam = string.Empty;
                jsCodeStructure.Comment = string.Empty;

                jsCodeStructure.MethodBody = string.Empty;
                _jsCodeInfo.AddFunc(jsCodeStructure);
            }
            catch (Exception)
            {

                throw;
            }
        }

        protected void GenerateOnLoadData()
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                JsCodeStructure jsCodeStructure = new JsCodeStructure();
                jsCodeStructure.MethodName = "onLoadData";
                jsCodeStructure.MethodParam = string.Empty;
                jsCodeStructure.Comment = string.Empty;
                if (_isList)
                {
                    sb.Append(MainRuntimeComponentName);
                    sb.Append(".");
                    sb.Append(SupcanElementDic.MainBodyId);
                    sb.Append(".Load('"+GetRelativePath()+"Metadata/Runtime/InvokeService?id=");
                    sb.Append(_uiTemplate.HeadInfo.QueryService.Id);
                    sb.Append("&startRow=@startRow&rows=@rows','mode=Asynch');");
                    sb.Append(Environment.NewLine);
                    sb.Append(MainRuntimeComponentName);
                    sb.Append(".");
                    sb.Append(SupcanElementDic.MainBodyId);
                    sb.Append(".SelectRow(currentRowindex);");
                    sb.Append(Environment.NewLine);
                    jsCodeStructure.MethodBody = sb.ToString();
                }
                else
                {
                    sb.Append("switch (otype) {");
                    sb.Append(Environment.NewLine);
                    sb.Append("case uiStatus.Add:");
                    sb.Append(Environment.NewLine);
                    sb.Append("break;");
                    sb.Append(Environment.NewLine);
                    sb.Append("case uiStatus.Edit:");
                    sb.Append(Environment.NewLine);
                    sb.Append("case uiStatus.View:");
                    sb.Append(Environment.NewLine);

                    sb.Append("AF.self.setEditAble(false);");
                    sb.Append(Environment.NewLine);

                    sb.Append("break;");
                    sb.Append(Environment.NewLine);
                    sb.Append("default:");
                    sb.Append(Environment.NewLine);
                    sb.Append("break;");
                    sb.Append(Environment.NewLine);
                    sb.Append("}");
                    sb.Append(Environment.NewLine);
                    jsCodeStructure.MethodBody = string.Empty;
                }
                _jsCodeInfo.AddFunc(jsCodeStructure);
            }
            catch (Exception)
            {

                throw;
            }
        }

        protected void GenerateOnAfterLoadData()
        {
            try
            {
                JsCodeStructure jsCodeStructure = new JsCodeStructure();
                jsCodeStructure.MethodName = "onAfterLoadData";
                jsCodeStructure.MethodParam = string.Empty;
                jsCodeStructure.Comment = string.Empty;

                jsCodeStructure.MethodBody = string.Empty;
                _jsCodeInfo.AddFunc(jsCodeStructure);
            }
            catch (Exception)
            {

                throw;
            }
        }

        protected void GenerateOnBeforeSave()
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                if (_isList)
                {
                    sb.Append("if(");
                    sb.Append(MainRuntimeComponentName);
                    sb.Append(".");
                    sb.Append(SupcanElementDic.MainBodyId);
                    sb.Append(".Validate('') == 0)");
                    sb.Append(Environment.NewLine);
                    sb.Append("return false;");
                    sb.Append(Environment.NewLine);
                    sb.Append("return true;");
                    sb.Append(Environment.NewLine);
                }
                else
                {
                    sb.Append("if(");
                    sb.Append(MainRuntimeComponentName);
                    sb.Append(".");
                    sb.Append(SupcanElementDic.MainHeadId);
                    sb.Append(".Validate('') == 0)");
                    sb.Append(Environment.NewLine);
                    sb.Append("return false;");
                    sb.Append(Environment.NewLine);
                    if (_uiTemplate.UiStyle == UiStyle.TraditionUpdateWithHeadAndBody)
                    {
                        sb.Append("if(");
                        sb.Append(MainRuntimeComponentName);
                        sb.Append(".");
                        sb.Append(SupcanElementDic.MainBodyId);
                        sb.Append(".Validate('') == 0)");
                        sb.Append(Environment.NewLine);
                        sb.Append("return false;");
                        sb.Append(Environment.NewLine);
                    }

                    //if (_uiTemplate.IsHaveHead)
                    //{
                    //    sb.Append("if(");
                    //    sb.Append(MainRuntimeComponentName);
                    //    sb.Append(".");
                    //    sb.Append(SupcanElementDic.MainHeadId);
                    //    sb.Append(".Validate('') == 0)");
                    //    sb.Append(Environment.NewLine);
                    //    sb.Append("return false;");
                    //    sb.Append(Environment.NewLine);
                    //}

                    //if (_uiTemplate.IsHaveBody)
                    //{
                    //    sb.Append("if(");
                    //    sb.Append(MainRuntimeComponentName);
                    //    sb.Append(".");
                    //    sb.Append(SupcanElementDic.MainBodyId);
                    //    sb.Append(".Validate('') == 0)");
                    //    sb.Append(Environment.NewLine);
                    //    sb.Append("return false;");
                    //    sb.Append(Environment.NewLine);
                    //}

                    sb.Append("return true;");
                    sb.Append(Environment.NewLine);

                }

                JsCodeStructure jsCodeStructure = new JsCodeStructure();
                jsCodeStructure.MethodName = "onBeforeSave";
                jsCodeStructure.MethodParam = string.Empty;
                jsCodeStructure.Comment = string.Empty;

                jsCodeStructure.MethodBody = sb.ToString();
                _jsCodeInfo.AddFunc(jsCodeStructure);
            }
            catch (Exception)
            {

                throw;
            }
        }

        protected void GenerateOnBeforeClose()
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                JsCodeStructure jsCodeStructure = new JsCodeStructure();
                jsCodeStructure.MethodName = "onBeforeClose";
                jsCodeStructure.MethodParam = string.Empty;
                jsCodeStructure.Comment = string.Empty;

                sb.Append("return true;");
                sb.Append(Environment.NewLine);
                jsCodeStructure.MethodBody = sb.ToString();
                _jsCodeInfo.AddFunc(jsCodeStructure);
            }
            catch (Exception)
            {

                throw;
            }
        }

        protected void GenerateEvents()
        {
            JsCodeStructure jsCodeStructure = new JsCodeStructure();
            jsCodeStructure.MethodName = "OnEvent";
            jsCodeStructure.MethodParam = "id, Event, p1, p2, p3, p4";
            jsCodeStructure.Comment = string.Empty;

            StringBuilder bodyBuilder = new StringBuilder();
            bodyBuilder.Append("if(1 != 1)");
            bodyBuilder.Append(Environment.NewLine);
            bodyBuilder.Append("{");
            bodyBuilder.Append(Environment.NewLine);
            bodyBuilder.Append("}");
            bodyBuilder.Append(Environment.NewLine);

            foreach (var jsEventData in _jsEventDatas)
            {
                JsCodeStructure jsChildCodeStructure = new JsCodeStructure();
                if (jsEventData.ComponentName.Length == 0)
                {
                    jsChildCodeStructure.MethodName = "on" + jsEventData.EventName.Replace('.', '_');
                }
                else
                {
                    jsChildCodeStructure.MethodName = "on" + jsEventData.EventName.Replace('.', '_') + "_" + jsEventData.ComponentName;
                }
                jsChildCodeStructure.MethodParam = "p2, p3, p4";
                jsChildCodeStructure.Comment = string.Empty;
                jsChildCodeStructure.MethodBody = GetEventBody(jsChildCodeStructure.MethodName);
                _jsCodeInfo.AddFunc(jsChildCodeStructure);

                bodyBuilder.Append("if(Event == '");
                bodyBuilder.Append(jsEventData.EventName);
                bodyBuilder.Append("' && p1 == '");
                bodyBuilder.Append(jsEventData.ComponentName);
                bodyBuilder.Append("')");
                bodyBuilder.Append(Environment.NewLine);
                bodyBuilder.Append("{");
                bodyBuilder.Append(Environment.NewLine);
                bodyBuilder.Append(jsChildCodeStructure.MethodName);
                bodyBuilder.Append("();");
                bodyBuilder.Append(Environment.NewLine);
                bodyBuilder.Append("}");
                bodyBuilder.Append(Environment.NewLine);
            }

            jsCodeStructure.MethodBody = bodyBuilder.ToString();
            _jsCodeInfo.AddFunc(jsCodeStructure);
        }

        private string GenerateAddFunction()
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                switch (_uiTemplate.UiStyle)
                {
                    case UiStyle.ListUpdate:
                        sb.Append(MainRuntimeComponentName);
                        sb.Append(".");
                        sb.Append(SupcanElementDic.MainBodyId);
                        sb.Append(".InsertRows(-1, 1, true, 'raiseEvent=true;SelectRow=false;isOpenEdit=true');");
                        sb.Append(Environment.NewLine);
                        break;
                    case UiStyle.ListUpdateWithEdit:
                        break;
                    case UiStyle.TraditionUpdate:
                        sb.Append("window.open('../Edit/");
                        sb.Append(_pageName);
                        sb.Append("Edit.html?otype=add');");
                        sb.Append(Environment.NewLine);
                        break;
                    case UiStyle.Other:
                        break;
                    default:
                        break;
                }
                return sb.ToString();
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        private string GenerateEditFunction(bool isReadOnly)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                switch (_uiTemplate.UiStyle)
                {
                    case UiStyle.ListUpdate:
                        break;
                    case UiStyle.ListUpdateWithEdit:
                        break;
                    case UiStyle.TraditionUpdate:
                        sb.Append("var rowIndex = ");
                        sb.Append(MainRuntimeComponentName);
                        sb.Append(".");
                        sb.Append(SupcanElementDic.MainBodyId);
                        sb.Append(".GetCurrentRow();");
                        sb.Append(Environment.NewLine);
                        sb.Append("currentRowindex = rowIndex;");
                        sb.Append(Environment.NewLine);
                        sb.Append("var idValue = ");
                        sb.Append(MainRuntimeComponentName);
                        sb.Append(".");
                        sb.Append(SupcanElementDic.MainBodyId);
                        sb.Append(".GetCellData(rowIndex, 'id');");
                        sb.Append(Environment.NewLine);
                        sb.Append("window.open('../Edit/");
                        sb.Append(_pageName);
                        if (isReadOnly)
                        {
                            sb.Append("Edit.htmlhtml?otype=view&id=' + idValue);");
                        }
                        else
                        {
                            sb.Append("Edit.htmlhtml?otype=edit&id=' + idValue);");
                        }

                        sb.Append(Environment.NewLine);
                        break;
                    case UiStyle.Other:
                        break;
                    default:
                        break;
                }
                return sb.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }

        private string GenerateDeleteFunction()
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                switch (_uiTemplate.UiStyle)
                {
                    case UiStyle.TraditionUpdate:
                    case UiStyle.ListUpdate:
                        sb.Append(MainRuntimeComponentName);
                        sb.Append(".");
                        sb.Append(SupcanElementDic.MainBodyId);
                        sb.Append(".DeleteCurrentRow(-1, 1, true, 'raiseEvent=true;SelectRow=false;isOpenEdit=true');");
                        sb.Append(Environment.NewLine);
                        break;
                    case UiStyle.ListUpdateWithEdit:
                       
                        break;
                    case UiStyle.Other:
                        break;
                    default:
                        break;
                }
                return sb.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }

        private string GenerateAddRowFunction()
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                switch (_uiTemplate.UiStyle)
                {
                    case UiStyle.ListUpdate:
                        
                        break;
                    case UiStyle.ListUpdateWithEdit:
                        break;
                    case UiStyle.TraditionUpdate:
                        sb.Append("var id = ");
                        sb.Append(MainRuntimeComponentName);
                        sb.Append(".");
                        sb.Append(SupcanElementDic.MainHeadId);
                        sb.Append(".GetValue('");
                        //sb.Append(_uiTemplate.HeadInfo.HeadEntity.PrimaryKeyColumnName);
                        sb.Append("');");
                        sb.Append(Environment.NewLine);

                        sb.Append(MainRuntimeComponentName);
                        sb.Append(".");
                        sb.Append(SupcanElementDic.MainBodyId);
                        sb.Append(".InsertRows(-1, 1, true, 'raiseEvent=true;SelectRow=false;isOpenEdit=true');");
                        sb.Append(Environment.NewLine);

                        sb.Append("var rowIndex = ");
                        sb.Append(MainRuntimeComponentName);
                        sb.Append(".");
                        sb.Append(SupcanElementDic.MainBodyId);
                        sb.Append(".GetCurrentRow();");
                        sb.Append(Environment.NewLine);

                        sb.Append(MainRuntimeComponentName);
                        sb.Append(".");
                        sb.Append(SupcanElementDic.MainBodyId);
                        sb.Append(".SetCellData(rowIndex, '");
                        sb.Append(_uiTemplate.BodyInfo.UiGridInfos[0].RelationProperty);
                        sb.Append("', id);");
                        sb.Append(Environment.NewLine);

                        break;
                    case UiStyle.Other:
                        break;
                    default:
                        break;
                }
                return sb.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }

        private string GenerateDeleteRowFunction()
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                switch (_uiTemplate.UiStyle)
                {
                    case UiStyle.ListUpdate:
                        break;
                    case UiStyle.TraditionUpdate:
                        sb.Append(MainRuntimeComponentName);
                        sb.Append(".");
                        sb.Append(SupcanElementDic.MainBodyId);
                        sb.Append(".DeleteCurrentRow(-1, 1, true, 'raiseEvent=true;SelectRow=false;isOpenEdit=true');");
                        sb.Append(Environment.NewLine);
                        break;
                    case UiStyle.ListUpdateWithEdit:

                        break;
                    case UiStyle.Other:
                        break;
                    default:
                        break;
                }
                return sb.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }

        private string GenerateSaveFunction(bool isList)
        {
            StringBuilder sb = new StringBuilder();
            if (isList)
            {

                switch (_uiTemplate.UiStyle)
                {
                    case UiStyle.ListUpdate:

                        break;
                    case UiStyle.ListUpdateWithEdit:
                        break;
                    case UiStyle.TraditionUpdate:
                        sb.Append("if (!onBeforeSave())");
                        sb.Append(Environment.NewLine);
                        sb.Append("return;");
                        sb.Append(Environment.NewLine);
                        sb.Append("var ret = ");
                        sb.Append(MainRuntimeComponentName);
                        sb.Append(".");
                        sb.Append(SupcanElementDic.MainBodyId);
                        sb.Append(".GetChangedXML('level=1; CompKeySep=;isValidateKey=true');");
                        sb.Append(Environment.NewLine);
                        sb.Append("var ret = ");
                        sb.Append(MainRuntimeComponentName);
                        sb.Append(".");
                        sb.Append(SupcanElementDic.MainBodyId);
                        sb.Append(".ToJson(ret);");
                        sb.Append(Environment.NewLine);
                        sb.Append("$.post(getRootPath()+'/Metadata/Runtime/InvokeService?id=+");
                        sb.Append(_uiTemplate.HeadInfo.QueryService.Id);
                        sb.Append("',");
                        sb.Append(Environment.NewLine);
                        sb.Append("{");
                        sb.Append(Environment.NewLine);
                        sb.Append("data: ret");
                        sb.Append(Environment.NewLine);
                        sb.Append("},");
                        sb.Append(Environment.NewLine);
                        sb.Append("function (data, status) {");
                        sb.Append(Environment.NewLine);
                        sb.Append(MainRuntimeComponentName);
                        sb.Append(".");
                        sb.Append(SupcanElementDic.MainBodyId);
                        sb.Append(".ResetChanged('');");
                        sb.Append(Environment.NewLine);
                        sb.Append("});");
                        break;
                    case UiStyle.Other:
                        break;
                    default:
                        break;
                }
            }
            else
            {
                sb.Append("if (!onBeforeSave())");
                sb.Append(Environment.NewLine);
                sb.Append("return;");
                sb.Append(Environment.NewLine);

                if (_uiTemplate.UiStyle == UiStyle.TraditionUpdateWithHeadAndBody)
                {
                    sb.Append("$.post(getRootPath()+'/Metadata/Runtime/InvokeService?id=+");
                    sb.Append(_uiTemplate.BodyInfo.UiGridInfos[0].UpdateService.Id);
                    sb.Append("',");
                    sb.Append(Environment.NewLine);
                    sb.Append("{");
                    sb.Append(Environment.NewLine);
                    sb.Append("masterData: master,");
                    sb.Append(Environment.NewLine);
                    sb.Append("detailData: detail");
                    sb.Append(Environment.NewLine);
                    sb.Append("},");
                    sb.Append(Environment.NewLine);
                    sb.Append("function (data, status) {");
                    sb.Append(Environment.NewLine);
                    sb.Append(MainRuntimeComponentName);
                    sb.Append(".");
                    sb.Append(SupcanElementDic.MainBodyId);
                    sb.Append(".ResetChanged('');");
                    sb.Append(Environment.NewLine);
                    sb.Append(MainRuntimeComponentName);
                    sb.Append(".");
                    sb.Append(SupcanElementDic.MainHeadId);
                    sb.Append(".ResetChanged('');");
                    sb.Append(Environment.NewLine);
                    sb.Append("window.opener.onLoadData();");
                    sb.Append(Environment.NewLine);
                    sb.Append("window.close();");
                    sb.Append(Environment.NewLine);
                    sb.Append("});");
                }
                else
                {
                    sb.Append("var masterRet = ");
                    sb.Append(MainRuntimeComponentName);
                    sb.Append(".");
                    sb.Append(SupcanElementDic.MainHeadId);
                    sb.Append(".GetChangedXML('level=1');");
                    sb.Append(Environment.NewLine);

                    sb.Append("var detail = ");
                    sb.Append(MainRuntimeComponentName);
                    sb.Append(".");
                    sb.Append(SupcanElementDic.MainHeadId);
                    sb.Append(".ToJson(ret);");
                    sb.Append(Environment.NewLine);
                }

                //if (_uiTemplate.IsHaveHead)
                //{
                //    sb.Append("var masterRet = ");
                //    sb.Append(MainRuntimeComponentName);
                //    sb.Append(".");
                //    sb.Append(SupcanElementDic.MainHeadId);
                //    sb.Append(".GetChangedXML('level=1');");
                //    sb.Append(Environment.NewLine);

                //    sb.Append("var detail = ");
                //    sb.Append(MainRuntimeComponentName);
                //    sb.Append(".");
                //    sb.Append(SupcanElementDic.MainHeadId);
                //    sb.Append(".ToJson(ret);");
                //    sb.Append(Environment.NewLine);
                //}

                //if (_uiTemplate.IsHaveBody)
                //{
                //    sb.Append("var detailRet = ");
                //    sb.Append(MainRuntimeComponentName);
                //    sb.Append(".");
                //    sb.Append(SupcanElementDic.MainBodyId);
                //    sb.Append(".GetChangedXML('level=1; CompKeySep=;isValidateKey=true');");
                //    sb.Append(Environment.NewLine);

                //    sb.Append("var detail = ");
                //    sb.Append(MainRuntimeComponentName);
                //    sb.Append(".");
                //    sb.Append(SupcanElementDic.MainBodyId);
                //    sb.Append(".ToJson(ret);");
                //    sb.Append(Environment.NewLine);
                //}

                //if (_uiTemplate.IsHaveHead)
                //{
                //    if (_uiTemplate.IsHaveBody)
                //    {
                        
                //    }
                //    else
                //    {
                        
                //    }
                //}

            }

            return sb.ToString();
        }

        private string GenerateExpandFunction()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("isExpandQuery = !isExpandQuery;");
            sb.Append(Environment.NewLine);
            sb.Append("if (isExpandQuery) {");
            sb.Append(Environment.NewLine);
            sb.Append("var ret = ");
            sb.Append(MainRuntimeComponentName);
            sb.Append(".");
            sb.Append(SupcanElementDic.MainToolbarId);
            sb.Append(".");
            sb.Append(SupcanElementDic.ToolbarExpandButtonId);
            sb.Append(".setText('收拢');");
            sb.Append(Environment.NewLine);
            sb.Append(MainRuntimeComponentName);
            sb.Append(".func('SetObjProp', '");
            sb.Append(SupcanElementDic.MainLayoutId);
            sb.Append(" \\r\\n TR.mainQueryTr \\r\\n visible \\r\\n true');");
            sb.Append(Environment.NewLine);
            sb.Append("}");
            sb.Append(Environment.NewLine);
            sb.Append(" else {");
            sb.Append(Environment.NewLine);
            sb.Append("var ret = ");
            sb.Append(MainRuntimeComponentName);
            sb.Append(".");
            sb.Append(SupcanElementDic.MainToolbarId);
            sb.Append(".");
            sb.Append(SupcanElementDic.ToolbarExpandButtonId);
            sb.Append(".setText('展开');");
            sb.Append(Environment.NewLine);
            sb.Append(MainRuntimeComponentName);
            sb.Append(".func('SetObjProp', '");
            sb.Append(SupcanElementDic.MainLayoutId);
            sb.Append(" \\r\\n TR.mainQueryTr \\r\\n visible \\r\\n false');");
            sb.Append(Environment.NewLine);
            sb.Append("}");
            sb.Append(Environment.NewLine);
            return sb.ToString();
        }

        private string GenerateHelpFunction()
        {
            return string.Empty;
        }

        private string GeneratePrintFunction()
        {
            return string.Empty;
        }

        private string GenerateExitFunction()
        {
            try
            {
                return string.Empty;
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        private string GenerateClearFunction()
        {
            return string.Empty;
        }

        private string GenerateQueryFunction()
        {
            StringBuilder sb = new StringBuilder();

            sb.Append("var queryRet = ");
            sb.Append(MainRuntimeComponentName);
            sb.Append(".");
            sb.Append(SupcanElementDic.MainQueryId);
            sb.Append(".GetChangedXML('level=1');");
            sb.Append(Environment.NewLine);

            sb.Append("var queryStr = ");
            sb.Append(MainRuntimeComponentName);
            sb.Append(".");
            sb.Append(SupcanElementDic.MainQueryId);
            sb.Append(".ToJson(queryRet);");
            sb.Append(Environment.NewLine);

            sb.Append(MainRuntimeComponentName);
            sb.Append(".");
            sb.Append(SupcanElementDic.MainBodyId);
            sb.Append(".Load('" + GetRelativePath() + "Metadata/Runtime/InvokeService?id=");
            sb.Append(_uiTemplate.HeadInfo.QueryService.Id);
            sb.Append("&startRow=@startRow&rows=@rows&");
            sb.Append(_uiTemplate.HeadInfo.HeadEntity.Name);
            sb.Append("='+queryStr, 'mode=Asynch');");
            sb.Append(Environment.NewLine);
            return sb.ToString();
        }

        private string GetEventBody(string methodName)
        {
            try
            {
                string mainToolbarMethodPrefix = "on" + SupcanElementDic.MainToolbarId + "_ButtonClicked_";
                string queryMethodPreFix = "on" + SupcanElementDic.MainQueryId + "_ButtonClicked_";
                string childTolbarMethodPrefix = "on" + SupcanElementDic.ChildToolbarId + "_ButtonClicked_"; 
                string retString = string.Empty;

                if (methodName == mainToolbarMethodPrefix + SupcanElementDic.ToolbarAddButtonId)
                {
                    retString = GenerateAddFunction();
                }
                else if (methodName == mainToolbarMethodPrefix + SupcanElementDic.ToolbarEditButtonId)
                {
                    retString = GenerateEditFunction(false);
                }
                else if (methodName == mainToolbarMethodPrefix + SupcanElementDic.ToolbarDeleteButtonId)
                {
                    retString = GenerateDeleteFunction();
                }
                else if (methodName == childTolbarMethodPrefix + SupcanElementDic.ToolbarAddRowButtonId)
                {
                    retString = GenerateAddRowFunction();
                }
                else if (methodName == childTolbarMethodPrefix + SupcanElementDic.ToolbarDeleteRowButtonId)
                {
                    retString = GenerateDeleteRowFunction();
                }
                else if (methodName == mainToolbarMethodPrefix + SupcanElementDic.ToolbarViewButtonId)
                {
                    retString = GenerateEditFunction(true);
                }
                else if (methodName == mainToolbarMethodPrefix + SupcanElementDic.ToolbarSaveButtonId)
                {
                    retString = GenerateSaveFunction(_isList);
                }
                else if (methodName == mainToolbarMethodPrefix + SupcanElementDic.ToolbarExpandButtonId)
                {
                    retString = GenerateExpandFunction();
                }
                else if (methodName == mainToolbarMethodPrefix + SupcanElementDic.ToolbarPrintButtonId)
                {
                    retString = GeneratePrintFunction();
                }
                else if (methodName == mainToolbarMethodPrefix + SupcanElementDic.ToolbarHelpButtonId)
                {
                    retString = GenerateHelpFunction();
                }
                else if (methodName == mainToolbarMethodPrefix + SupcanElementDic.ToolbarExitButtonId)
                {
                    retString = GenerateExitFunction();
                }
                else if (methodName == queryMethodPreFix + SupcanElementDic.QueryButtonId)
                {
                    retString = GenerateQueryFunction();
                }
                else if (methodName == queryMethodPreFix + SupcanElementDic.ClearButtonId)
                {
                    retString = GenerateClearFunction();
                }

                return retString;
            }
            catch (Exception ex)
            {
                
                throw;
            }
        }

        public JsCodeInfo GenerateAllCode()
        {
            
            GenerateOnReady(string.Empty);
            GenerateOnBeforeLoadUi();
            GenerateOnLoadUi();
            GenerateOnAfterLoadUi();
            GenerateOnBeforeLoadData();
            GenerateOnLoadData();
            GenerateOnAfterLoadData();
            GenerateEvents();
            GenerateOnBeforeSave();
            GenerateOnBeforeClose();
            return _jsCodeInfo;
        }

        public string ConvertJsCodeInfoToString(JsCodeInfo jsCodeInfo)
        {
            try
            {
                if (jsCodeInfo == null)
                    return string.Empty;

                StringBuilder jsSb = new StringBuilder();


                foreach (var jsCodeStructure in jsCodeInfo.CodeInfos)
                {
                    jsSb.Append("function ");
                    jsSb.Append(jsCodeStructure.MethodName);
                    jsSb.Append("(");
                    jsSb.Append(jsCodeStructure.MethodParam);
                    jsSb.Append("){");
                    jsSb.Append(Environment.NewLine);
                    jsSb.Append(jsCodeStructure.MethodBody);
                    jsSb.Append(Environment.NewLine);
                    jsSb.Append("}");
                    jsSb.Append(Environment.NewLine);
                }

                return jsSb.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }

        //public void Deploy(string basePath)
        //{
        //    try
        //    {
        //        string jsCode = string.Empty;
        //        jsCode += ConvertJsCodeInfoToString(GenerateAllCode());
        //        if (_isList)
        //        {
        //            string listPath = Path.Combine(basePath, "List");
        //            if (!Directory.Exists(listPath))
        //                Directory.CreateDirectory(listPath);

        //            listPath = Path.Combine(listPath, _pageName + "List.js");
                    
        //            File.WriteAllText(listPath, jsCode, Encoding.UTF8);
        //        }
        //        else
        //        {
        //            string editPath = Path.Combine(basePath, "Edit");
        //            if (!Directory.Exists(editPath))
        //                Directory.CreateDirectory(editPath);
        //            File.WriteAllText(Path.Combine(editPath, _pageName + "Edit.js"), jsCode, Encoding.UTF8);
        //        }
        //    }
        //    catch (Exception)
        //    {
                
        //        throw;
        //    }
        //}
    }
}
