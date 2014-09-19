using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using NG3.Metadata.Core;
using NG3.Metadata.Core.Entity;
using NG3.Metadata.Core.Ui.Layout;

namespace NG3.Metadata.ReverseEngine.Supcan
{
    /// <summary>
    /// 
    /// </summary>
    public sealed class CustomSupcanXml : IFileDeploy
    {
        private UiTemplate _uiTemplate = null;
        private StringBuilder _xmlSb = new StringBuilder();

        private string _mainToolbarHeight = "23";
        private string _detailToolbarHeight = "23";
        private string _queryHeight = "";
        private string _headHeight = "";
        private string _bodyHeight = "";

        private const string ToolbarWidth = "5%";
        private const string ToolbarMinWidth = "50";
        private const string ToolbarHeight = "23";
        private int EveryRowNum = 3;

        private const string LayoutFileName = "Layout.xml";
        private const string TreeFileName = "Tree.xml";
        private const string MainToolbarFileName = "MainToolbar.xml";
        private const string ChildToolbarFileName = "ChildToolbar.xml"; 
        private const string QueryFileName = "Query.xml";
        private const string HeadFileName = "Head.xml";
        private const string BodyFileName = "Body.xml";

        private bool _isList = false;

        private void ComputeLayoutHeight()
        {
            int baseNum = 81;
            int realNum = 0;
            int num = 0;
            if (_uiTemplate.IsHaveQuery)
                num++;
            if (_uiTemplate.UiStyle == UiStyle.TraditionUpdateWithHeadAndBody)
            {
                num += 2;
            }
            else
            {
                num++;
            }

            if (num == 0)
                realNum = 0;
            else
                realNum = baseNum / num;

            if (_uiTemplate.IsHaveQuery)
                _queryHeight = realNum.ToString() + "%";

            _headHeight = realNum.ToString() + "%";
            _bodyHeight = realNum.ToString() + "%";

            //if (_uiTemplate.IsHaveHead)
            //    _headHeight = realNum.ToString() + "%";

            //if (_uiTemplate.IsHaveBody)
            //    _bodyHeight = realNum.ToString() + "%";
        }

        private string ConvertDataTypeToString(Core.DataType dataType)
        {
            try
            {
                string retString = string.Empty;
                switch (dataType)
                {
                    case Core.DataType.Bool:
                        retString = "bool";
                        break;
                    case Core.DataType.Char:
                    case Core.DataType.String:
                        retString = "string";
                        break;
                    case Core.DataType.Int:
                        retString = "int";
                        break;
                    case Core.DataType.Decimal:
                        retString = "double";
                        break;
                    case Core.DataType.DateTime:
                        retString = "datetime";
                        break;
                    default:
                        break;
                }
                return retString;
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        private IList<MetadataForProperty> GetQueryPropertys(IList<MetadataForProperty> metadataForProperties)
        {
            try
            {
                IList<MetadataForProperty> properties = new List<MetadataForProperty>();
                MetadataForProperty newProperty = null;
                foreach (var metadataForProperty in metadataForProperties)
                {
                    switch (metadataForProperty.DataType)
                    {
                        case Core.DataType.Decimal:
                        case Core.DataType.Int:
                        case Core.DataType.Long:
                            newProperty = metadataForProperty.Clone() as MetadataForProperty;
                            metadataForProperty.Name += "*num*ngLow";
                            metadataForProperty.CurrentDisplayName = metadataForProperty.CurrentDisplayName+"上限";
                            newProperty.Name += "*num*ngUP";
                            newProperty.CurrentDisplayName = newProperty.CurrentDisplayName + "下限";
                            properties.Add(metadataForProperty);
                            properties.Add(newProperty);
                            break;
                        case Core.DataType.DateTime:
                            newProperty = metadataForProperty.Clone() as MetadataForProperty;
                            metadataForProperty.Name += "*date*ngLow";
                            newProperty.Name += "*date*ngUP";
                            metadataForProperty.CurrentDisplayName = metadataForProperty.CurrentDisplayName+"上限";
                            newProperty.CurrentDisplayName = newProperty.CurrentDisplayName + "下限";
                            properties.Add(metadataForProperty);
                            properties.Add(newProperty);
                            break;
                        default:
                            properties.Add(metadataForProperty);
                            break;
                    }
                }
                return properties;
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        public CustomSupcanXml(UiTemplate uiTemplate,bool isList)
        {
            _uiTemplate = uiTemplate;
            _isList = isList;
            ComputeLayoutHeight();
        }

        //private string ConvertKeysToString(IList<MetadataForProperty> keys)
        //{
        //    StringBuilder sb = new StringBuilder();
            

        //    for (int i = 0; i < keys.Count; i++)
        //    {
        //        if (keys[i].IsPrimaryKey)
        //        {
        //            sb.Append(keys[i].Name);
        //            if (i < keys.Count - 1)
        //                sb.Append(",");
        //        }
        //    }
        //    return sb.ToString();
        //}

        public string GenerateLayout()
        {
            try
            {
                string xml = string.Empty;
                using (MemoryStream ms = new MemoryStream())
                {

                    XmlWriterSettings settings = new XmlWriterSettings();
                    settings.Indent = true;
                    settings.Encoding = new UTF8Encoding();
                    //设置换行符 
                    settings.NewLineChars = Environment.NewLine;
                    using (XmlWriter xmlWriter = XmlWriter.Create(ms, settings))
                    {
                        xmlWriter.WriteStartDocument(false);
                        xmlWriter.WriteStartElement(SupcanElementDic.FreeFormElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.PropertiesElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.BackGroundElement);

                        xmlWriter.WriteAttributeString("bgColor", "#E5EAFF,#FAFFFF");

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.ObjectsElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.TableLayoutElement);

                        xmlWriter.WriteAttributeString("id", SupcanElementDic.MainLayoutId);
                        xmlWriter.WriteAttributeString("x", "0");
                        xmlWriter.WriteAttributeString("y", "0");
                        xmlWriter.WriteAttributeString("width", "100%");
                        xmlWriter.WriteAttributeString("height", "100%");

                        xmlWriter.WriteStartElement(SupcanElementDic.ColumnElement);

                        xmlWriter.WriteAttributeString("width", "100%");

                        if (_uiTemplate.IsHaveToolbar)
                        {
                            xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                            xmlWriter.WriteAttributeString("id", "mainToolbarTr");
                            xmlWriter.WriteAttributeString("height", "23");

                            xmlWriter.WriteStartElement(SupcanElementDic.TdElement);

                            xmlWriter.WriteStartElement(SupcanElementDic.ComponentElement);

                            xmlWriter.WriteAttributeString("id", "mainToolbar");
                            xmlWriter.WriteAttributeString("Type", "freeform");
                            xmlWriter.WriteAttributeString("CreatePara", "border=none");
                            xmlWriter.WriteAttributeString("URL", MainToolbarFileName);

                            xmlWriter.WriteEndElement();

                            xmlWriter.WriteEndElement();


                            xmlWriter.WriteEndElement();
                        }

                        if (_uiTemplate.IsHaveQuery && _isList)
                        {
                            xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                            xmlWriter.WriteAttributeString("id", "mainQueryTr");
                            xmlWriter.WriteAttributeString("height", _queryHeight);

                            xmlWriter.WriteStartElement(SupcanElementDic.TdElement);

                            xmlWriter.WriteStartElement(SupcanElementDic.ComponentElement);

                            xmlWriter.WriteAttributeString("id", "mainQuery");
                            xmlWriter.WriteAttributeString("Type", "freeform");
                            xmlWriter.WriteAttributeString("CreatePara", "border=none");
                            xmlWriter.WriteAttributeString("URL", QueryFileName);

                            xmlWriter.WriteEndElement();

                            xmlWriter.WriteEndElement();


                            xmlWriter.WriteEndElement();
                        }

                        if (_uiTemplate.UiStyle == UiStyle.TraditionUpdateWithHeadAndBody)
                        {
                            if (_isList)
                            {
                                xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                                xmlWriter.WriteAttributeString("id", "mainBodyTr");
                                xmlWriter.WriteAttributeString("height", _bodyHeight);

                                xmlWriter.WriteStartElement(SupcanElementDic.TdElement);

                                xmlWriter.WriteStartElement(SupcanElementDic.ComponentElement);

                                xmlWriter.WriteAttributeString("id", SupcanElementDic.MainBodyId);
                                xmlWriter.WriteAttributeString("Type", "TreeList");
                                xmlWriter.WriteAttributeString("CreatePara", "border=single");
                                xmlWriter.WriteAttributeString("URL", BodyFileName);

                                xmlWriter.WriteEndElement();

                                xmlWriter.WriteEndElement();


                                xmlWriter.WriteEndElement();
                            }
                            else
                            {
                                xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                                xmlWriter.WriteAttributeString("id", "mainHeadTr");
                                xmlWriter.WriteAttributeString("height", _headHeight);

                                xmlWriter.WriteStartElement(SupcanElementDic.TdElement);

                                xmlWriter.WriteStartElement(SupcanElementDic.ComponentElement);

                                xmlWriter.WriteAttributeString("id", "mainHead");
                                xmlWriter.WriteAttributeString("Type", "freeform");
                                xmlWriter.WriteAttributeString("CreatePara", "border=single");
                                xmlWriter.WriteAttributeString("URL", HeadFileName);

                                xmlWriter.WriteEndElement();

                                xmlWriter.WriteEndElement();


                                xmlWriter.WriteEndElement();

                                xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                                xmlWriter.WriteAttributeString("id", "detailToolbarTr");
                                xmlWriter.WriteAttributeString("height", "23");

                                xmlWriter.WriteStartElement(SupcanElementDic.TdElement);

                                xmlWriter.WriteStartElement(SupcanElementDic.ComponentElement);

                                xmlWriter.WriteAttributeString("id", "detailToolbar");
                                xmlWriter.WriteAttributeString("Type", "freeform");
                                xmlWriter.WriteAttributeString("CreatePara", "border=none");
                                xmlWriter.WriteAttributeString("URL", ChildToolbarFileName);

                                xmlWriter.WriteEndElement();

                                xmlWriter.WriteEndElement();


                                xmlWriter.WriteEndElement();


                                xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                                xmlWriter.WriteAttributeString("id", "mainBodyTr");
                                xmlWriter.WriteAttributeString("height", _bodyHeight);

                                xmlWriter.WriteStartElement(SupcanElementDic.TdElement);

                                xmlWriter.WriteStartElement(SupcanElementDic.ComponentElement);

                                xmlWriter.WriteAttributeString("id", SupcanElementDic.MainBodyId);
                                xmlWriter.WriteAttributeString("Type", "TreeList");
                                xmlWriter.WriteAttributeString("CreatePara", "border=single");
                                xmlWriter.WriteAttributeString("URL", BodyFileName);

                                xmlWriter.WriteEndElement();

                                xmlWriter.WriteEndElement();


                                xmlWriter.WriteEndElement();
                            }
                        }
                        else if (_uiTemplate.UiStyle == UiStyle.TraditionUpdate)
                        {
                            if (_isList)
                            {
                                xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                                xmlWriter.WriteAttributeString("id", "mainBodyTr");
                                xmlWriter.WriteAttributeString("height", _bodyHeight);

                                xmlWriter.WriteStartElement(SupcanElementDic.TdElement);

                                xmlWriter.WriteStartElement(SupcanElementDic.ComponentElement);

                                xmlWriter.WriteAttributeString("id", SupcanElementDic.MainBodyId);
                                xmlWriter.WriteAttributeString("Type", "TreeList");
                                xmlWriter.WriteAttributeString("CreatePara", "border=single");
                                xmlWriter.WriteAttributeString("URL", BodyFileName);

                                xmlWriter.WriteEndElement();

                                xmlWriter.WriteEndElement();


                                xmlWriter.WriteEndElement();
                            }
                            else
                            {
                                xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                                xmlWriter.WriteAttributeString("id", "mainHeadTr");
                                xmlWriter.WriteAttributeString("height", _headHeight);

                                xmlWriter.WriteStartElement(SupcanElementDic.TdElement);

                                xmlWriter.WriteStartElement(SupcanElementDic.ComponentElement);

                                xmlWriter.WriteAttributeString("id", "mainHead");
                                xmlWriter.WriteAttributeString("Type", "freeform");
                                xmlWriter.WriteAttributeString("CreatePara", "border=single");
                                xmlWriter.WriteAttributeString("URL", HeadFileName);

                                xmlWriter.WriteEndElement();

                                xmlWriter.WriteEndElement();


                                xmlWriter.WriteEndElement();
                            }
                        }

                        //if (_uiTemplate.IsHaveBody)
                        //{
                        //    if (_uiTemplate.IsHaveHead && !_isList)
                        //    {
                        //        xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                        //        xmlWriter.WriteAttributeString("id", "detailToolbarTr");
                        //        xmlWriter.WriteAttributeString("height", "23");

                        //        xmlWriter.WriteStartElement(SupcanElementDic.TdElement);

                        //        xmlWriter.WriteStartElement(SupcanElementDic.ComponentElement);

                        //        xmlWriter.WriteAttributeString("id", "detailToolbar");
                        //        xmlWriter.WriteAttributeString("Type", "freeform");
                        //        xmlWriter.WriteAttributeString("CreatePara", "border=none");
                        //        xmlWriter.WriteAttributeString("URL", ChildToolbarFileName);

                        //        xmlWriter.WriteEndElement();

                        //        xmlWriter.WriteEndElement();


                        //        xmlWriter.WriteEndElement();
                        //    }

                        //    xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                        //    xmlWriter.WriteAttributeString("id", "mainBodyTr");
                        //    xmlWriter.WriteAttributeString("height", _bodyHeight);

                        //    xmlWriter.WriteStartElement(SupcanElementDic.TdElement);

                        //    xmlWriter.WriteStartElement(SupcanElementDic.ComponentElement);

                        //    xmlWriter.WriteAttributeString("id", SupcanElementDic.MainBodyId);
                        //    xmlWriter.WriteAttributeString("Type", "TreeList");
                        //    xmlWriter.WriteAttributeString("CreatePara", "border=single");
                        //    xmlWriter.WriteAttributeString("URL", BodyFileName);

                        //    xmlWriter.WriteEndElement();

                        //    xmlWriter.WriteEndElement();


                        //    xmlWriter.WriteEndElement();
                        //}

                        xmlWriter.WriteEndElement();


                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndDocument();
                    }
                    xml = Encoding.UTF8.GetString(ms.ToArray());
                }

                return xml;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string GenerateToolbar(ToolbarStyle toolbarStyle)
        {
            try
            {
                string xml = string.Empty;
                using (MemoryStream ms = new MemoryStream())
                {

                    XmlWriterSettings settings = new XmlWriterSettings();
                    settings.Indent = true;
                    settings.Encoding = new UTF8Encoding();
                    //设置换行符 
                    settings.NewLineChars = Environment.NewLine;
                    using (XmlWriter xmlWriter = XmlWriter.Create(ms, settings))
                    {
                        xmlWriter.WriteStartDocument(false);
                        xmlWriter.WriteStartElement(SupcanElementDic.FreeFormElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.PropertiesElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.BackGroundElement);

                        xmlWriter.WriteAttributeString("bgColor", "#E5EAFF,#FAFFFF");

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.ObjectsElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.TableLayoutElement);

                        xmlWriter.WriteAttributeString("id", "mainToolbarLayout");
                        xmlWriter.WriteAttributeString("y", "0");
                        xmlWriter.WriteAttributeString("width", "100%");

                        if (toolbarStyle == ToolbarStyle.MainList)
                        {
                            int leftButtonNums = 0;
                            if (_uiTemplate.UiStyle == UiStyle.ListUpdate)
                            {
                                leftButtonNums = 4;
                            }
                            else
                            {
                                leftButtonNums = 6;
                            }
                            for (int i = 0; i < leftButtonNums; i++)
                            {
                                xmlWriter.WriteStartElement(SupcanElementDic.ColumnElement);
                                xmlWriter.WriteAttributeString("width", ToolbarWidth);
                                xmlWriter.WriteAttributeString("minWidth", ToolbarMinWidth);
                                xmlWriter.WriteEndElement();
                            }

                            xmlWriter.WriteStartElement(SupcanElementDic.ColumnElement);
                            xmlWriter.WriteAttributeString("width", "55%");
                            xmlWriter.WriteAttributeString("minWidth", ToolbarMinWidth);
                            xmlWriter.WriteEndElement();

                            for (int i = 0; i < 3; i++)
                            {
                                xmlWriter.WriteStartElement(SupcanElementDic.ColumnElement);
                                xmlWriter.WriteAttributeString("width", ToolbarWidth);
                                xmlWriter.WriteAttributeString("minWidth", ToolbarMinWidth);
                                xmlWriter.WriteEndElement();
                            }

                            xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                            xmlWriter.WriteAttributeString("height", ToolbarHeight);

                            string[] buttonNames = null;
                            string[] buttonIds = null;

                            if (_uiTemplate.UiStyle == UiStyle.ListUpdate)
                            {
                                string[] inputButtonNames = { "新增", "删除", "保存", "收拢", "", "打印", "帮助", "退出" };
                                string[] inputButtonIds = { SupcanElementDic.ToolbarAddButtonId, SupcanElementDic.ToolbarDeleteButtonId, 
                                                          SupcanElementDic.ToolbarSaveButtonId, SupcanElementDic.ToolbarExpandButtonId, 
                                                          "",SupcanElementDic.ToolbarPrintButtonId, SupcanElementDic.ToolbarHelpButtonId, SupcanElementDic.ToolbarExitButtonId };
                                buttonNames = inputButtonNames;
                                buttonIds = inputButtonIds;
                            }
                            else
                            {
                                string[] inputButtonNames = { "新增", "修改", "删除", "查看", "保存", "收拢", "", "打印", "帮助", "退出" };
                                string[] inputButtonIds = { SupcanElementDic.ToolbarAddButtonId, SupcanElementDic.ToolbarEditButtonId, SupcanElementDic.ToolbarDeleteButtonId, 
                                                          SupcanElementDic.ToolbarViewButtonId, SupcanElementDic.ToolbarSaveButtonId, SupcanElementDic.ToolbarExpandButtonId, 
                                                          "",SupcanElementDic.ToolbarPrintButtonId, SupcanElementDic.ToolbarHelpButtonId, SupcanElementDic.ToolbarExitButtonId };
                                buttonNames = inputButtonNames;
                                buttonIds = inputButtonIds;
                            }


                            for (int i = 0; i < buttonIds.Length; i++)
                            {
                                xmlWriter.WriteStartElement(SupcanElementDic.TdElement);
                                if (buttonIds[i].Length != 0)
                                {
                                    xmlWriter.WriteStartElement(SupcanElementDic.InputElement);
                                    xmlWriter.WriteAttributeString("id", buttonIds[i]);
                                    xmlWriter.WriteAttributeString("type", "Button");
                                    xmlWriter.WriteAttributeString("textColor", "black");
                                    xmlWriter.WriteAttributeString("text", buttonNames[i]);
                                    xmlWriter.WriteAttributeString("style", "flat,transparent");
                                    xmlWriter.WriteEndElement();
                                }
                                xmlWriter.WriteEndElement();
                            }

                            xmlWriter.WriteEndElement();
                        }
                        else if (toolbarStyle == ToolbarStyle.MainEdit)
                        {

                            xmlWriter.WriteStartElement(SupcanElementDic.ColumnElement);
                            xmlWriter.WriteAttributeString("width", ToolbarWidth);
                            xmlWriter.WriteAttributeString("minWidth", ToolbarMinWidth);
                            xmlWriter.WriteEndElement();

                            xmlWriter.WriteStartElement(SupcanElementDic.ColumnElement);
                            xmlWriter.WriteAttributeString("width", "80%");
                            xmlWriter.WriteAttributeString("minWidth", ToolbarMinWidth);
                            xmlWriter.WriteEndElement();

                            for (int i = 0; i < 3; i++)
                            {
                                xmlWriter.WriteStartElement(SupcanElementDic.ColumnElement);
                                xmlWriter.WriteAttributeString("width", ToolbarWidth);
                                xmlWriter.WriteAttributeString("minWidth", ToolbarMinWidth);
                                xmlWriter.WriteEndElement();
                            }

                            xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                            xmlWriter.WriteAttributeString("height", ToolbarHeight);

                            string[] inputButtonNames = { "保存", "","打印", "帮助", "退出" };
                            string[] inputButtonIds = { SupcanElementDic.ToolbarSaveButtonId, "",SupcanElementDic.ToolbarPrintButtonId, SupcanElementDic.ToolbarHelpButtonId, 
                                                          SupcanElementDic.ToolbarExitButtonId };

                            for (int i = 0; i < inputButtonIds.Length; i++)
                            {
                                xmlWriter.WriteStartElement(SupcanElementDic.TdElement);

                                if (inputButtonIds[i].Length != 0)
                                {
                                    xmlWriter.WriteStartElement(SupcanElementDic.InputElement);
                                    xmlWriter.WriteAttributeString("id", inputButtonIds[i]);
                                    xmlWriter.WriteAttributeString("type", "Button");
                                    xmlWriter.WriteAttributeString("textColor", "black");
                                    xmlWriter.WriteAttributeString("text", inputButtonNames[i]);
                                    xmlWriter.WriteAttributeString("style", "flat,transparent");
                                    xmlWriter.WriteEndElement();
                                }

                                xmlWriter.WriteEndElement();
                            }


                            xmlWriter.WriteEndElement();
                        }
                        else if (toolbarStyle == ToolbarStyle.Child)
                        {
                            for (int i = 0; i < 2; i++)
                            {
                                xmlWriter.WriteStartElement(SupcanElementDic.ColumnElement);
                                xmlWriter.WriteAttributeString("width", ToolbarWidth);
                                xmlWriter.WriteAttributeString("minWidth", ToolbarMinWidth);
                                xmlWriter.WriteEndElement();
                            }

                            xmlWriter.WriteStartElement(SupcanElementDic.ColumnElement);
                            xmlWriter.WriteAttributeString("width", "80%");
                            xmlWriter.WriteAttributeString("minWidth", ToolbarMinWidth);
                            xmlWriter.WriteEndElement();

                            xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                            xmlWriter.WriteAttributeString("height", ToolbarHeight);

                            string[] inputButtonNames = { "增行", "删行"};
                            string[] inputButtonIds = { "btnAddRow", "btnDeleteRow"};

                            for (int i = 0; i < inputButtonIds.Length; i++)
                            {
                                xmlWriter.WriteStartElement(SupcanElementDic.TdElement);
                                xmlWriter.WriteStartElement(SupcanElementDic.InputElement);
                                xmlWriter.WriteAttributeString("id", inputButtonIds[i]);
                                xmlWriter.WriteAttributeString("type", "Button");
                                xmlWriter.WriteAttributeString("textColor", "black");
                                xmlWriter.WriteAttributeString("text", inputButtonNames[i]);
                                xmlWriter.WriteAttributeString("style", "flat,transparent");
                                xmlWriter.WriteEndElement();
                                xmlWriter.WriteEndElement();
                            }


                            xmlWriter.WriteEndElement();
                        }


                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.RectElement);
                        xmlWriter.WriteAttributeString("id", "mainToolbarBottom");
                        xmlWriter.WriteAttributeString("x1", "0");
                        xmlWriter.WriteAttributeString("y1", "toolbar1.bottom");
                        xmlWriter.WriteAttributeString("x2", "100%");
                        xmlWriter.WriteAttributeString("y2", "100%");
                        xmlWriter.WriteAttributeString("color", "#7f9db9");

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndDocument();
                    }
                    xml = Encoding.UTF8.GetString(ms.ToArray());
                }

                return xml;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string GenerateQuery()
        {
            try
            {
                string xml = string.Empty;
                using (MemoryStream ms = new MemoryStream())
                {

                    XmlWriterSettings settings = new XmlWriterSettings();
                    settings.Indent = true;
                    settings.Encoding = new UTF8Encoding();
                    //设置换行符 
                    settings.NewLineChars = Environment.NewLine;
                    using (XmlWriter xmlWriter = XmlWriter.Create(ms, settings))
                    {
                        xmlWriter.WriteStartDocument(false);
                        xmlWriter.WriteStartElement(SupcanElementDic.FreeFormElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.PropertiesElement);

                        xmlWriter.WriteAttributeString("bgColor", "#E5EAFF,#FAFFFF");

                        //xmlWriter.WriteAttributeString("key", _uiTemplate.HeadInfo.HeadEntity.FullKeyNameString);

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.FontsElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.FontElement);
                        xmlWriter.WriteAttributeString("faceName", "微软雅黑");
                        xmlWriter.WriteAttributeString("size", "-13");
                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.FontElement);
                        xmlWriter.WriteAttributeString("size", "14");
                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.FontElement);
                        xmlWriter.WriteAttributeString("size", "-16");
                        xmlWriter.WriteAttributeString("bold", "1");
                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.ObjectsElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.TableLayoutElement);

                        xmlWriter.WriteAttributeString("id", "mainQueryFormLayout");
                        xmlWriter.WriteAttributeString("y1", ".bottom + 20");
                        xmlWriter.WriteAttributeString("width", "100%");

                        string[] columnWidths = { "2%", "5%", "27%", "5%", "27%", "5%", "27%", "2%" };
                        foreach (var columnWidth in columnWidths)
                        {
                            xmlWriter.WriteStartElement(SupcanElementDic.ColumnElement);
                            xmlWriter.WriteAttributeString("width", columnWidth);
                            xmlWriter.WriteEndElement();
                        }


                        IList<MetadataForProperty> properties = GetQueryPropertys(_uiTemplate.QueryInfo.Properties);
                        for (int i = 0; i < properties.Count; i++)
                        {

                            if (i % EveryRowNum == 0 || i == 0)
                            {
                                xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                                xmlWriter.WriteAttributeString("height", "24");
                            }

                            xmlWriter.WriteStartElement(SupcanElementDic.TdElement);
                            xmlWriter.WriteEndElement();
                            xmlWriter.WriteStartElement(SupcanElementDic.TdElement);
                            xmlWriter.WriteStartElement(SupcanElementDic.InputElement);
                            xmlWriter.WriteAttributeString("id", properties[i].Name);
                            xmlWriter.WriteAttributeString("LeftText", properties[i].CurrentDisplayName + ":");
                            xmlWriter.WriteAttributeString("datatype", ConvertDataTypeToString(properties[i].DataType));
                            xmlWriter.WriteAttributeString("width", "2");
                            xmlWriter.WriteAttributeString("editSize", "1");
                            xmlWriter.WriteEndElement();
                            xmlWriter.WriteEndElement();

                            if (i % EveryRowNum == 2)
                                xmlWriter.WriteEndElement();
                        }

                        int lastNum = properties.Count % 3;

                        if (lastNum == 1 || lastNum == 0)
                        {
                            xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                            xmlWriter.WriteAttributeString("height", "24");

                            for (int i = 0; i < 3; i++)
                            {
                                xmlWriter.WriteStartElement(SupcanElementDic.TdElement);
                                xmlWriter.WriteEndElement();
                            }
                            xmlWriter.WriteStartElement(SupcanElementDic.TdElement);
                            xmlWriter.WriteStartElement(SupcanElementDic.InputElement);
                            xmlWriter.WriteAttributeString("type", "button");
                            xmlWriter.WriteAttributeString("width", "2");
                            xmlWriter.WriteAttributeString("id", "btnQuery");
                            xmlWriter.WriteAttributeString("text", "查询");
                            xmlWriter.WriteEndElement();
                            xmlWriter.WriteEndElement();

                            xmlWriter.WriteStartElement(SupcanElementDic.TdElement);
                            xmlWriter.WriteEndElement();
                            xmlWriter.WriteStartElement(SupcanElementDic.TdElement);
                            xmlWriter.WriteStartElement(SupcanElementDic.InputElement);
                            xmlWriter.WriteAttributeString("type", "button");
                            xmlWriter.WriteAttributeString("width", "2");
                            xmlWriter.WriteAttributeString("id", "btnClear");
                            xmlWriter.WriteAttributeString("text", "清空");
                            xmlWriter.WriteEndElement();
                            xmlWriter.WriteEndElement();

                            xmlWriter.WriteEndElement();
                            xmlWriter.WriteEndElement();
                        }
                        else if (lastNum == 2)
                        {
                            xmlWriter.WriteEndElement();

                            xmlWriter.WriteStartElement(SupcanElementDic.TrElement);
                            xmlWriter.WriteAttributeString("height", "24");

                            xmlWriter.WriteStartElement(SupcanElementDic.TdElement);
                            xmlWriter.WriteStartElement(SupcanElementDic.InputElement);
                            xmlWriter.WriteAttributeString("type", "button");
                            xmlWriter.WriteAttributeString("width", "2");
                            xmlWriter.WriteAttributeString("id", "btnQuery");
                            xmlWriter.WriteAttributeString("text", "查询");
                            xmlWriter.WriteEndElement();
                            xmlWriter.WriteEndElement();

                            xmlWriter.WriteStartElement(SupcanElementDic.TdElement);
                            xmlWriter.WriteEndElement();
                            xmlWriter.WriteStartElement(SupcanElementDic.TdElement);
                            xmlWriter.WriteStartElement(SupcanElementDic.InputElement);
                            xmlWriter.WriteAttributeString("type", "button");
                            xmlWriter.WriteAttributeString("width", "2");
                            xmlWriter.WriteAttributeString("id", "btnClear");
                            xmlWriter.WriteAttributeString("text", "清空");
                            xmlWriter.WriteEndElement();
                            xmlWriter.WriteEndElement();
                            xmlWriter.WriteEndElement();
                        }


                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndDocument();
                    }
                    xml = Encoding.UTF8.GetString(ms.ToArray());
                }

                return xml;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string GenerateHead()
        {
            try
            {
                string xml = string.Empty;
                using (MemoryStream ms = new MemoryStream())
                {

                    XmlWriterSettings settings = new XmlWriterSettings();
                    settings.Indent = true;
                    settings.Encoding = new UTF8Encoding();
                    //设置换行符 
                    settings.NewLineChars = Environment.NewLine;
                    using (XmlWriter xmlWriter = XmlWriter.Create(ms, settings))
                    {
                        xmlWriter.WriteStartDocument(false);
                        xmlWriter.WriteStartElement(SupcanElementDic.FreeFormElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.PropertiesElement);

                        xmlWriter.WriteAttributeString("bgColor", "#E5EAFF,#FAFFFF");

                        //xmlWriter.WriteAttributeString("key", _uiTemplate.HeadInfo.HeadEntity.FullKeyNameString);

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.FontsElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.FontElement);
                        xmlWriter.WriteAttributeString("faceName", "微软雅黑");
                        xmlWriter.WriteAttributeString("size", "-13");
                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.FontElement);
                        xmlWriter.WriteAttributeString("size", "14");
                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.FontElement);
                        xmlWriter.WriteAttributeString("size", "-16");
                        xmlWriter.WriteAttributeString("bold", "1");
                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.ObjectsElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.TableLayoutElement);

                        xmlWriter.WriteAttributeString("id", "mainQueryFormLayout");
                        xmlWriter.WriteAttributeString("y1", ".bottom + 20");
                        xmlWriter.WriteAttributeString("width", "100%");

                        string[] columnWidths = { "2%", "5%", "27%", "5%", "27%", "5%", "27%", "2%" };
                        foreach (var columnWidth in columnWidths)
                        {
                            xmlWriter.WriteStartElement(SupcanElementDic.ColumnElement);
                            xmlWriter.WriteAttributeString("width", columnWidth);
                            xmlWriter.WriteEndElement();
                        }

                        //暂时不支持多tab页
                        IList<MetadataForProperty> properties = _uiTemplate.HeadInfo.HeadZoneInfos[0].Properties;
                        for (int i = 0; i < properties.Count; i += EveryRowNum)
                        {
                            xmlWriter.WriteStartElement(SupcanElementDic.TrElement);

                            xmlWriter.WriteAttributeString("height", "24");

                            for (int j = 0; j < EveryRowNum; j++)
                            {
                                if ((i + j) >= properties.Count)
                                    continue;
                                xmlWriter.WriteStartElement(SupcanElementDic.TdElement);
                                xmlWriter.WriteEndElement();
                                xmlWriter.WriteStartElement(SupcanElementDic.TdElement);
                                xmlWriter.WriteStartElement(SupcanElementDic.InputElement);
                                xmlWriter.WriteAttributeString("id", properties[i + j].Name);
                                xmlWriter.WriteAttributeString("LeftText", properties[i + j].CurrentDisplayName + ":");
                                xmlWriter.WriteAttributeString("width", "2");
                                xmlWriter.WriteAttributeString("datatype", ConvertDataTypeToString(properties[i+j].DataType));
                                xmlWriter.WriteAttributeString("editSize", "1");
                                xmlWriter.WriteEndElement();
                                xmlWriter.WriteEndElement();
                            }

                            xmlWriter.WriteEndElement();
                        }



                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndDocument();
                    }
                    xml = Encoding.UTF8.GetString(ms.ToArray());
                }

                return xml;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string GenerateBody()
        {
            try
            {
                string xml = string.Empty;
                using (MemoryStream ms = new MemoryStream())
                {

                    XmlWriterSettings settings = new XmlWriterSettings();
                    settings.Indent = true;
                    settings.Encoding = new UTF8Encoding();
                    //设置换行符 
                    settings.NewLineChars = Environment.NewLine;
                    using (XmlWriter xmlWriter = XmlWriter.Create(ms, settings))
                    {
                        xmlWriter.WriteStartDocument(false);

                        xmlWriter.WriteStartElement(SupcanElementDic.TreeListElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.PropertiesElement);

                        MetadataForEntity metadataForEntity = null;
                        IList<MetadataForProperty> metadataForBodyProperties = null;
                        IList<MetadataForProperty> metadataForHeadProperties = null;

                        IList<MetadataForProperty> metadataForProperties = null;
                        if (_uiTemplate.UiStyle == UiStyle.TraditionUpdateWithHeadAndBody && !_isList)
                        {
                            metadataForProperties = _uiTemplate.BodyInfo.UiGridInfos[0].Properties;
                            metadataForEntity = _uiTemplate.BodyInfo.UiGridInfos[0].MetadataForEntity;
                        }
                        else
                        {
                            metadataForProperties = _uiTemplate.HeadInfo.HeadZoneInfos[0].Properties;
                            metadataForEntity = _uiTemplate.HeadInfo.HeadEntity;
                        }
                        //if (_isList)
                        //{
                        //    metadataForProperties = _uiTemplate.BodyInfo;
                            
                        //}
                        //else
                        //{
                        //    metadataForProperties = metadataForBodyProperties;
                        //    metadataForEntity = _uiTemplate.BodyInfo.UiGridInfos[0].MetadataForEntity;
                        //}

                        xmlWriter.WriteAttributeString("Title", metadataForEntity.CurrentDisplayName);
                        xmlWriter.WriteAttributeString("editAble", "true");
                        xmlWriter.WriteAttributeString("HeaderFontIndex", "2");
                        //xmlWriter.WriteAttributeString("key", metadataForEntity.FullKeyNameString);


                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.FontsElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.FontElement);
                        xmlWriter.WriteAttributeString("faceName", "微软雅黑");
                        xmlWriter.WriteAttributeString("bold", "1");
                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.FontElement);
                        xmlWriter.WriteAttributeString("faceName", "Consolas");
                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.FontElement);
                        xmlWriter.WriteAttributeString("bold", "true");
                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteEndElement();

                        xmlWriter.WriteStartElement(SupcanElementDic.ColumnsElement);

                        xmlWriter.WriteStartElement(SupcanElementDic.ColumnElement);

                        //xmlWriter.WriteAttributeString("name", metadataForEntity.PrimaryKeyColumnName);
                        xmlWriter.WriteAttributeString("width", "100");
                        xmlWriter.WriteAttributeString("align", "center");
                        xmlWriter.WriteAttributeString("datatype", ConvertDataTypeToString(Core.DataType.String));
                        xmlWriter.WriteAttributeString("key", "true");
                        xmlWriter.WriteAttributeString("isHide", "true");
                        xmlWriter.WriteEndElement();

                        foreach (var property in metadataForProperties)
                        {
                            xmlWriter.WriteStartElement(SupcanElementDic.ColumnElement);
                            xmlWriter.WriteAttributeString("name", property.Name);
                            xmlWriter.WriteAttributeString("width", "100");
                            xmlWriter.WriteAttributeString("align", "center");
                            xmlWriter.WriteAttributeString("datatype", ConvertDataTypeToString(property.DataType));
                            xmlWriter.WriteString(property.CurrentDisplayName);
                            xmlWriter.WriteEndElement();
                        }

                        xmlWriter.WriteEndElement();


                        xmlWriter.WriteEndDocument();
                    }
                    xml = Encoding.UTF8.GetString(ms.ToArray());
                }

                return xml;
            }
            catch (Exception)
            {

                throw;
            }
        }



        public override string ToString()
        {
            return _xmlSb.ToString();
        }

        public void Deploy(string basePath)
        {
            try
            {
                string listPath = Path.Combine(basePath, "List");
                string editPath = Path.Combine(basePath, "Edit");

                if (!Directory.Exists(listPath))
                    Directory.CreateDirectory(listPath);

                if (!Directory.Exists(editPath))
                    Directory.CreateDirectory(editPath);

                if (_isList)
                {
                    string layoutXml = GenerateLayout();
                    File.WriteAllText(Path.Combine(listPath, LayoutFileName), layoutXml, Encoding.UTF8);
                    string bodyXml = GenerateBody();
                    File.WriteAllText(Path.Combine(listPath, BodyFileName), bodyXml, Encoding.UTF8);
                    //if (_uiTemplate.IsHaveBody)
                    //{

                    //}

                }
                else
                {
                    string layoutXml = GenerateLayout();
                    File.WriteAllText(Path.Combine(editPath, LayoutFileName), layoutXml, Encoding.UTF8);
                    string headXml = GenerateHead();
                    File.WriteAllText(Path.Combine(editPath, HeadFileName), headXml, Encoding.UTF8);
                    if (_uiTemplate.UiStyle == UiStyle.TraditionUpdateWithHeadAndBody)
                    {
                        string bodyXml = GenerateBody();
                        File.WriteAllText(Path.Combine(editPath, BodyFileName), bodyXml, Encoding.UTF8);
                        string childToolbarXml = GenerateToolbar(ToolbarStyle.Child);
                        File.WriteAllText(Path.Combine(editPath, ChildToolbarFileName), childToolbarXml, Encoding.UTF8);
                    }

                    //if (_uiTemplate.IsHaveBody)
                    //{
                    //    if (_uiTemplate.IsHaveHead)
                    //    {
                            
                    //    }
                    //}

                }
                
                if(_uiTemplate.IsHaveToolbar)
                {
                    string mainToolbarXml = GenerateToolbar(ToolbarStyle.MainList);
                    File.WriteAllText(Path.Combine(listPath, MainToolbarFileName), mainToolbarXml, Encoding.UTF8);
                    mainToolbarXml = GenerateToolbar(ToolbarStyle.MainEdit);
                    File.WriteAllText(Path.Combine(editPath, MainToolbarFileName), mainToolbarXml, Encoding.UTF8);
                }
                if (_uiTemplate.IsHaveQuery)
                {
                    string queryXml = GenerateQuery();
                    File.WriteAllText(Path.Combine(listPath, QueryFileName), queryXml, Encoding.UTF8);
                }
                //if (_uiTemplate.IsHaveHead)
                //{
                //    string headXml = GenerateHead();
                //    File.WriteAllText(Path.Combine(editPath, HeadFileName), headXml, Encoding.UTF8);
                //}
            }
            catch (Exception)
            {
                
                throw;
            }
        }
    }
}
