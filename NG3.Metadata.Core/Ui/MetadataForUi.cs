using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;

namespace NG3.Metadata.Core.Ui
{
    public class MetadataForUi : MetadataGod
    {
        public MetadataForUi()
        {
            Catalogue = MetadataCatalogue.Ui;
        }

        public UIStyle UiStyle { get; set; }

        public string ExternalListStyleString { get; set; }

        public string ExternalEditStyleString { get; set; }

        private JsCodeInfo _jsListCodeInfos = new JsCodeInfo();

        public JsCodeInfo JsListCodeInfos
        {
            get { return _jsListCodeInfos; }
            set { _jsListCodeInfos = value; }
        }

        public JsCodeInfo JsEditCodeInfos
        {
            get { return _jsEditCodeInfos; }
            set { _jsEditCodeInfos = value; }
        }

        private JsCodeInfo _jsEditCodeInfos = new JsCodeInfo();


        private string EncodeToBase64(string inputString)
        {
            try
            {
                if (string.IsNullOrEmpty(inputString))
                    return string.Empty;

                byte[] bytes = Encoding.Default.GetBytes(inputString);
                string retString = Convert.ToBase64String(bytes);
                return retString;
            }
            catch (Exception)
            {
                
                throw;
            }

        }

        private string DecodeFromBase64(string inputString)
        {
            try
            {
                if (string.IsNullOrEmpty(inputString))
                    return string.Empty;

                byte[] bytes = Convert.FromBase64String(inputString);
                string retString = Encoding.UTF8.GetString(bytes);
                return retString;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private void ReadJsCodeInfos(XmlReader reader,JsCodeInfo codeInfo)
        {
            try
            {
                reader.MoveToAttribute("Count");
                int count = Convert.ToInt32(reader.ReadContentAsString());
                for (int i = 0; i < count; i++)
                {
                    reader.Read();
                    if (reader.IsStartElement("JsCodeInfo"))
                    {
                        JsCodeStructure jsCodeStructure = new JsCodeStructure();
                        reader.MoveToAttribute("Comment");
                        jsCodeStructure.Comment = DecodeFromBase64(reader.ReadContentAsString());
                        reader.MoveToAttribute("MethodBody");
                        jsCodeStructure.MethodBody = DecodeFromBase64(reader.ReadContentAsString());
                        reader.MoveToAttribute("MethodName");
                        jsCodeStructure.MethodName = DecodeFromBase64(reader.ReadContentAsString());
                        reader.MoveToAttribute("MethodParam");
                        jsCodeStructure.MethodParam = DecodeFromBase64(reader.ReadContentAsString());
                        codeInfo.AddFunc(jsCodeStructure);
                    }

                }
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        public virtual void ReadBaseXml(System.Xml.XmlReader reader)
        {
            try
            {
                base.ReadBaseXml(reader);
                //if (reader.IsStartElement("UiInteractionStyle"))
                //{
                //    UiInteractionStyle = (UiStyle)(Convert.ToInt32(reader.ReadString().Trim()));
                //}
                if (reader.IsStartElement("ExternalListStyleString"))
                {
                    ExternalListStyleString = DecodeFromBase64(reader.ReadString().Trim());
                }
                else if (reader.IsStartElement("JsListCodeInfos"))
                {
                    ReadJsCodeInfos(reader, JsListCodeInfos);
                }
                else if (reader.IsStartElement("ExternalEditStyleString"))
                {
                    ExternalEditStyleString = DecodeFromBase64(reader.ReadString().Trim());
                }
                else if (reader.IsStartElement("JsEditCodeInfos"))
                {
                    ReadJsCodeInfos(reader, JsEditCodeInfos);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        private void WriteJsCodeInfosXml(XmlWriter writer, JsCodeInfo codeInfo)
        {
            writer.WriteAttributeString("Count", codeInfo.CodeInfos.Count.ToString());
            foreach (var jsCodeInfo in codeInfo.CodeInfos)
            {
                writer.WriteStartElement("JsCodeInfo");
                writer.WriteAttributeString("Comment", EncodeToBase64(jsCodeInfo.Comment));
                writer.WriteAttributeString("MethodBody", EncodeToBase64(jsCodeInfo.MethodBody));
                writer.WriteAttributeString("MethodName", EncodeToBase64(jsCodeInfo.MethodName));
                writer.WriteAttributeString("MethodParam", EncodeToBase64(jsCodeInfo.MethodParam));
                writer.WriteString(EncodeToBase64(jsCodeInfo.ToString()));
                writer.WriteEndElement();
            }
            writer.WriteEndElement();
        }

        public virtual void WriteBaseXml(System.Xml.XmlWriter writer)
        {
            try
            {
                base.WriteBaseXml(writer);
                //writer.WriteElementString("UiInteractionStyle", ((int)UiInteractionStyle).ToString());
                writer.WriteElementString("ExternalListStyleString", EncodeToBase64(ExternalListStyleString));

                if (_jsListCodeInfos != null)
                {
                    writer.WriteStartElement("JsListCodeInfos");
                    WriteJsCodeInfosXml(writer, JsListCodeInfos);
                }

                writer.WriteElementString("ExternalEditStyleString", EncodeToBase64(ExternalEditStyleString));

                if (_jsEditCodeInfos != null)
                {
                    writer.WriteStartElement("JsEditCodeInfos");
                    WriteJsCodeInfosXml(writer, JsEditCodeInfos);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }

    }
}
