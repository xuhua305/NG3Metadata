using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace NG3.Metadata.Core.Entity
{
    public class MetadataForPropertyTemplate : MetadataBizBase, ICloneable
    {
        public MetadataForPropertyTemplate()
        {
            Catalogue = MetadataCatalogue.PropertyTemplate;
        }

        #region 基础特性

        /// <summary>
        /// 对应的表字段名称(表名.字段名的形式，和Sql语句里面的名称对应)
        /// </summary>
        public string MapFieldName { get; set; }

        /// <summary>
        /// 是否字段模版(字段模版可以独立维护，引入作为字段的模版,模版的一些内容不允许引入的字段修改)
        /// </summary>
        public bool IsTemplate { get; set; }

        /// <summary>
        /// 是否主键
        /// </summary>
        public bool IsPrimaryKey { get; set; }

        /// <summary>
        /// 主键产生方式
        /// </summary>
        public PrimaryKeyGenerateStyle KeyGenerateStyle { get; set; }

        /// <summary>
        /// 数据类型
        /// </summary>
        public DataType DataType { get; set; }

        private object _defaultValue = new object();

        /// <summary>
        /// 默认值(根据类型)
        /// </summary>
        public object DefaultValue
        {
            get { return _defaultValue; }
            set { _defaultValue = value; }
        }

        /// <summary>
        /// 如果是字符串类型的时候的最大长度
        /// </summary>
        [JsonConverter(typeof(NumberJsonConverter))]
        public int MaxStringLength { get; set; }

        /// <summary>
        /// 如果是小数类型的时候的最大长度
        /// </summary>
        [JsonConverter(typeof(NumberJsonConverter))]
        public int MaxNumLength { get; set; }

        /// <summary>
        /// 如果是小数类型的时候的最大精度
        /// </summary>
        [JsonConverter(typeof(NumberJsonConverter))]
        public int MaxNumPrecision { get; set; }

        /// <summary>
        /// 是否允许空
        /// </summary>
        public bool IsAllowNull { get; set; }

        /// <summary>
        /// 是否允许重复
        /// </summary>
        public bool IsAllowRepeat { get; set; }

        /// <summary>
        /// 是否是计算字段
        /// </summary>
        public bool IsCompute { get; set; }

        /// <summary>
        /// 计算表达式
        /// </summary>
        public string ComputeExpression { get; set; }


        #endregion 

        #region 业务特性

        /// <summary>
        /// 是否可以作为查询字段
        /// </summary>
        public bool IsQuery { get; set; }

        #endregion 

        #region 技术特性

        /// <summary>
        /// 编辑掩码
        /// </summary>
        public string EditMask { get; set; }

        /// <summary>
        /// 是否允许修改
        /// </summary>
        public bool IsALlowEdit { get; set; }


        #endregion 

        #region 帮助特性

        /// <summary>
        /// 帮助实体的ID
        /// </summary>
        public string HelpEntityId { get; set; }

        private List<string> _helpEntityPropertys = new List<string>();

        /// <summary>
        /// 帮助实体的内容列(按照列表的顺序)
        /// </summary>
        public List<string> HelpEntityPropertys
        {
            get { return _helpEntityPropertys; }
            set { _helpEntityPropertys = value; }
        }

        #endregion 

        #region XML序列化部分

        public override void ReadBaseXml(System.Xml.XmlReader reader)
        {
            base.ReadBaseXml(reader);

            if (reader.IsStartElement("MapFieldName"))
            {
                MapFieldName = reader.ReadString().Trim();
            }
            else if (reader.IsStartElement("IsTemplate"))
            {
                IsTemplate = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("DataType"))
            {
                DataType = (DataType)(Convert.ToInt32(reader.ReadString().Trim()));
            }
            else if (reader.IsStartElement("DefaultValue"))
            {
                DefaultValue = MetadataConvert.ConvertStirngParamToObj(reader.ReadString().Trim(), DataType);
            }
            else if (reader.IsStartElement("MaxStringLength"))
            {
                MaxStringLength = Convert.ToInt32(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("MaxNumLength"))
            {
                MaxNumLength = Convert.ToInt32(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("MaxNumPrecision"))
            {
                MaxNumPrecision = Convert.ToInt32(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("IsAllowNull"))
            {
                IsAllowNull = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("IsAllowRepeat"))
            {
                IsAllowRepeat = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("IsCompute"))
            {
                IsCompute = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("ComputeExpression"))
            {
                ComputeExpression = reader.ReadString().Trim();
            }
            else if (reader.IsStartElement("IsQuery"))
            {
                IsQuery = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("EditMask"))
            {
                EditMask = reader.ReadString().Trim();
            }
            else if (reader.IsStartElement("IsALlowEdit"))
            {
                IsALlowEdit = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("HelpEntityPropertys"))
            {

                reader.MoveToAttribute("Count");
                int count = Convert.ToInt32(reader.ReadContentAsString());
                for (int i = 0; i < count; i++)
                {
                    reader.Read();
                    if (reader.IsStartElement("HelpEntityProperty"))
                    {
                        reader.MoveToAttribute("HelpEntityPropertyId");
                        HelpEntityPropertys.Add(reader.ReadContentAsString());
                    }

                }

            }
        }

        public override void WriteBaseXml(System.Xml.XmlWriter writer)
        {
            base.WriteBaseXml(writer);
            writer.WriteElementString("MapFieldName", MapFieldName);
            writer.WriteElementString("IsTemplate", IsTemplate.ToString());
            writer.WriteElementString("DataType", ((int)DataType).ToString());
            writer.WriteElementString("DefaultValue", DefaultValue.ToString());
            writer.WriteElementString("MaxStringLength", MaxStringLength.ToString());
            writer.WriteElementString("MaxNumLength", MaxNumLength.ToString());
            writer.WriteElementString("MaxNumPrecision", MaxNumPrecision.ToString());
            writer.WriteElementString("IsAllowNull", IsAllowNull.ToString());
            writer.WriteElementString("IsAllowRepeat", IsAllowRepeat.ToString());
            writer.WriteElementString("IsCompute", IsCompute.ToString());
            writer.WriteElementString("ComputeExpression", ComputeExpression);
            writer.WriteElementString("IsQuery", IsQuery.ToString());
            writer.WriteElementString("EditMask", EditMask);
            writer.WriteElementString("IsALlowEdit", IsALlowEdit.ToString());
            writer.WriteElementString("HelpEntityId", HelpEntityId);

            writer.WriteStartElement("HelpEntityPropertys");
            writer.WriteAttributeString("Count", HelpEntityPropertys.Count.ToString());
            foreach (string entityPropertyId in HelpEntityPropertys)
            {
                writer.WriteStartElement("HelpEntityProperty");
                writer.WriteAttributeString("HelpEntityPropertyId", entityPropertyId);
                writer.WriteEndElement();
            }
            writer.WriteEndElement();
        }

        #endregion 
    
        public object Clone()
        {
            MetadataForProperty metadataForProperty = new MetadataForProperty();
            metadataForProperty.ComputeExpression = ComputeExpression;
            metadataForProperty.CreateTime = CreateTime;
            metadataForProperty.CurrentDescription = CurrentDescription;
            metadataForProperty.CurrentDisplayName = CurrentDisplayName;
            metadataForProperty.DataType = DataType;
            metadataForProperty.DefaultValue = DefaultValue;
            metadataForProperty.Description = Description;
            metadataForProperty.DisplayName = DisplayName;
            metadataForProperty.EditMask = EditMask;
            metadataForProperty.Id = Id;
            metadataForProperty.IndustryStyleString = IndustryStyleString;
            metadataForProperty.IsALlowEdit = IsALlowEdit;
            metadataForProperty.IsAllowNull = IsAllowNull;
            metadataForProperty.IsAllowRepeat = IsAllowRepeat;
            metadataForProperty.IsCheckOut = IsCheckOut;
            metadataForProperty.IsCompute = IsCompute;
            metadataForProperty.IsHaveRights = IsHaveRights;
            metadataForProperty.IsLastVersion = IsLastVersion;
            metadataForProperty.IsQuery = IsQuery;
            metadataForProperty.IsSensitive = IsSensitive;
            metadataForProperty.IsTemplate = IsTemplate;
            metadataForProperty.MapFieldName = MapFieldName;
            metadataForProperty.MaxNumLength = MaxNumLength;
            metadataForProperty.MaxNumPrecision = MaxNumPrecision;
            metadataForProperty.MaxStringLength = MaxStringLength;
            metadataForProperty.Name = Name;
            metadataForProperty.Namespace = Namespace;
            metadataForProperty.ParentId = ParentId;
            metadataForProperty.ParentVersionId = ParentVersionId;
            metadataForProperty.Remark = Remark;
            metadataForProperty.TimeStamp = TimeStamp;
            metadataForProperty.Version = Version;
            metadataForProperty.HelpEntityId = HelpEntityId;
            metadataForProperty.HelpEntityPropertys = new List<string>();
            metadataForProperty.HelpEntityPropertys.AddRange(HelpEntityPropertys);
            return metadataForProperty;

        }
    }
}
