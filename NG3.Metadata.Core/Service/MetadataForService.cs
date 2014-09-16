using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace NG3.Metadata.Core.Service
{
    /// <summary>
    /// 服务元数据描述
    /// </summary>
    public class MetadataForService : MetadataBizBase
    {

        public MetadataForService()
        {
            Catalogue = MetadataCatalogue.Service;
        }

        #region XML序列化

        public override void ReadBaseXml(System.Xml.XmlReader reader)
        {
            base.ReadBaseXml(reader);

            if (reader.IsStartElement("InputParams"))
            {

                reader.MoveToAttribute("Count");
                int count = Convert.ToInt32(reader.ReadContentAsString());
                for (int i = 0; i < count; i++)
                {
                    reader.Read();
                    if (reader.IsStartElement("InputParam"))
                    {
                        ParameterInfo inputParam = new ParameterInfo();
                        reader.MoveToAttribute("Id");
                        inputParam.Id = reader.ReadContentAsString();
                        reader.MoveToAttribute("AssociateId");
                        inputParam.AssociateId = reader.ReadContentAsString();
                        reader.MoveToAttribute("Name");
                        inputParam.Name = reader.ReadContentAsString();
                        reader.MoveToAttribute("DataType");
                        inputParam.DataType = (DataType)(Convert.ToInt32(reader.ReadContentAsString()));
                        reader.MoveToAttribute("Value");
                        inputParam.Value = MetadataConvert.ConvertStirngParamToObj(reader.ReadContentAsString(),inputParam.DataType);
                        InputParams.Add(inputParam);
                    }

                }
            }
            else if (reader.IsStartElement("OutputParam"))
            {
                reader.MoveToAttribute("Id");
                OutputParam.Id = reader.ReadContentAsString();
                reader.MoveToAttribute("AssociateId");
                OutputParam.AssociateId = reader.ReadContentAsString();
                reader.MoveToAttribute("Name");
                OutputParam.Name = reader.ReadContentAsString();
                reader.MoveToAttribute("DataType");
                OutputParam.DataType = (DataType)(Convert.ToInt32(reader.ReadContentAsString()));
                reader.MoveToAttribute("Value");
                OutputParam.Value = MetadataConvert.ConvertStirngParamToObj(reader.ReadContentAsString(), OutputParam.DataType);

            }
            else if (reader.IsStartElement("ClassName"))
            {
                ClassName = reader.ReadString();
            }
            else if (reader.IsStartElement("DllName"))
            {
                DllName = reader.ReadString();
            }
            else if (reader.IsStartElement("Expression"))
            {
                Expression = reader.ReadString();
            }
            else if (reader.IsStartElement("MethodName"))
            {
                MethodName = reader.ReadString();
            }
            else if (reader.IsStartElement("ImpStyle"))
            {
                ImpStyle = (ImplementSytle)(Convert.ToInt32(reader.ReadString()));
            }
            else if (reader.IsStartElement("IsAsynchronous"))
            {
                IsAsynchronous = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("PublishAddress"))
            {
                PublishAddress = reader.ReadString();
            }
        }

        public override void WriteBaseXml(System.Xml.XmlWriter writer)
        {
            base.WriteBaseXml(writer);

            writer.WriteStartElement("InputParams");
            writer.WriteAttributeString("Count", InputParams.Count.ToString());
            foreach (var inputParam in InputParams)
            {
                writer.WriteStartElement("InputParam");
                writer.WriteAttributeString("Id", inputParam.Id);
                writer.WriteAttributeString("AssociateId", inputParam.AssociateId);
                writer.WriteAttributeString("Name", inputParam.Name);
                writer.WriteAttributeString("DataType", ((int)inputParam.DataType).ToString());
                writer.WriteAttributeString("Value", inputParam.Value == null ? string.Empty : inputParam.Value.ToString());
                writer.WriteString(inputParam.Value == null ? string.Empty : inputParam.Value.ToString());
                writer.WriteEndElement();
            }
            writer.WriteEndElement();

            writer.WriteStartElement("OutputParam");
            writer.WriteAttributeString("Id", OutputParam.Id);
            writer.WriteAttributeString("AssociateId", OutputParam.AssociateId);
            writer.WriteAttributeString("Name", OutputParam.Name);
            writer.WriteAttributeString("Value", OutputParam.Value == null ? string.Empty : OutputParam.Value.ToString());
            writer.WriteAttributeString("DataType", ((int)OutputParam.DataType).ToString());
            writer.WriteString(OutputParam.Value == null ? string.Empty : OutputParam.Value.ToString());
            writer.WriteEndElement();

            writer.WriteElementString("ClassName", ClassName);
            writer.WriteElementString("DllName", DllName);
            writer.WriteElementString("Expression", Expression);
            writer.WriteElementString("MethodName", MethodName);
            writer.WriteElementString("ImpStyle", ((int)ImpStyle).ToString());

            writer.WriteElementString("IsAsynchronous", IsAsynchronous.ToString());
            writer.WriteElementString("PublishAddress", PublishAddress);

        }

        #endregion 

        #region 基本特性

        private IList<ParameterInfo> _inputParams = new List<ParameterInfo>();

        public IList<ParameterInfo> InputParams
        {
            get { return _inputParams; }
            set { _inputParams = value; }
        }

        private ParameterInfo _outputParam = new ParameterInfo();

        public ParameterInfo OutputParam
        {
            get { return _outputParam; }
            set { _outputParam = value; }
        }

        #endregion 

        private PagingInfo _pagingInfo = new PagingInfo();

        [JsonIgnore]
        public PagingInfo PagingInfo
        {
            get { return _pagingInfo; }
            set { _pagingInfo = value; }
        }

        #region 实现方式

        public ImplementSytle ImpStyle { get; set; }

        public string Expression
        {
            get { return _expression; }
            set { _expression = value; }
        }

        public string DllName
        {
            get { return _dllName; }
            set { _dllName = value; }
        }

        public string ClassName
        {
            get { return _className; }
            set { _className = value; }
        }

        public string MethodName
        {
            get { return _methodName; }
            set { _methodName = value; }
        }

        private string _expression = string.Empty;

        private string _dllName = string.Empty;

        private string _className = string.Empty;

        private string _methodName = string.Empty;

        #endregion 

        #region 业务特性

        #endregion

        #region 技术特性

        /// <summary>
        /// 是否异步
        /// </summary>
        public bool IsAsynchronous { get; set; }

        /// <summary>
        /// 服务发布的相对地址
        /// </summary>
        public string PublishAddress { get; set; }

        #endregion 
    }
}
