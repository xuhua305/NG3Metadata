using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace NG3.Metadata.Core
{
    /// <summary>
    /// 元数据祖先类
    /// </summary>
    public class MetadataGod:IXmlSerializable
    {
        public MetadataGod()
        {
            Id = Guid.NewGuid().ToString();
        }

        #region 内部编号(一般是GUID)
        /// <summary>
        /// 元数据编号(GUID)
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 父亲节点的元数据编号
        /// </summary>
        public string ParentId { get; set; }

        /// <summary>
        /// 版本父节点的元数据编号
        /// </summary>
        public string ParentVersionId { get; set; }


        #endregion

        private MetadataCatalogue _catalogue = MetadataCatalogue.Other;
        /// <summary>
        /// 元数据类型
        /// </summary>
        public MetadataCatalogue Catalogue
        {
            get { return _catalogue; }
            set { _catalogue = value; }
        }

        /// <summary>
        /// 英文名称(简称,节点的名称用来作为命名空间)
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 命名空间
        /// </summary>
        public string Namespace { get; set; }

        #region 需要多语言支持的显示描述属性

        private IList<NGLanguageInfo> _displayName = new List<NGLanguageInfo>();
        ///<summary>
        /// 显示名称(多国语言)
        /// </summary>
        [JsonIgnore]
        public IList<NGLanguageInfo> DisplayName
        {
            get { return _displayName; }
            set { _displayName = value; }
        } 

        public string CurrentDisplayName
        {
            get
            {
                if (DisplayName != null)
                {
                    foreach (NGLanguageInfo languageInfo in DisplayName)
                    {
                        if (languageInfo.CultureName.Equals(NGCultureInfo.CurrentCulture,StringComparison.OrdinalIgnoreCase))
                        {
                            return languageInfo.Value;
                        }
                    }
                }
                return string.Empty;
            }
            set
            {
                DisplayName.Clear();
                DisplayName.Add(new NGLanguageInfo(NGCultureInfo.CurrentCulture,value));
            }
        }

        private IList<NGLanguageInfo> _description = new List<NGLanguageInfo>();

        /// <summary>
        /// 详细描述(业务详细的描述)
        /// </summary>
        [JsonIgnore]
        public IList<NGLanguageInfo> Description
        {
            get { return _description; }
            set { _description = value; }
        }

        public string CurrentDescription
        {
            get
            {
                if (Description != null)
                {
                    foreach (NGLanguageInfo languageInfo in Description)
                    {
                        if (languageInfo.CultureName == NGCultureInfo.CurrentCulture)
                        {
                            return languageInfo.Value;
                        }
                    }
                }

                return string.Empty;
            }
            set
            {
                
            }
        }
        #endregion 

        private NGVersion _version = new NGVersion(1,0,0,0);
        /// <summary>
        /// 元数据版本号
        /// </summary>
        [JsonConverter(typeof(NGVersionJsonConverter))]
        public NGVersion Version
        {
            get { return _version; }
            set { _version = value; }
        }

        public bool IsLastVersion { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 修改时间戳
        /// </summary>
        public DateTime TimeStamp { get; set; }

        /// <summary>
        /// 树等级
        /// </summary>
        public int TreeLevel
        {
            get
            {
                if (!string.IsNullOrEmpty(Namespace))
                {
                    string[] strArray = Namespace.Split('.');
                    return strArray.Length-1;
                }

                return 0;
            }
        }


        #region 团队协作
        /// <summary>
        /// 是否牵出
        /// </summary>
        public bool IsCheckOut { get; set; }
        #endregion 

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }


        public virtual void ReadBaseXml(System.Xml.XmlReader reader)
        {
            try
            {
                if (reader.IsStartElement("Id"))
                {
                    Id = reader.ReadString().Trim();
                }
                else if (reader.IsStartElement("ParentId"))
                {
                    ParentId = reader.ReadString().Trim();
                }
                else if (reader.IsStartElement("ParentVersionId"))
                {
                    ParentVersionId = reader.ReadString().Trim();
                }
                else if (reader.IsStartElement("Name"))
                {
                    Name = reader.ReadString().Trim();
                }
                //else if (reader.IsStartElement("TreeLevel"))
                //{
                //    TreeLevel = Convert.ToInt32(reader.ReadString());
                //}
                else if (reader.IsStartElement("DisplayName"))
                {
                    for (int i = 0; i < reader.AttributeCount; i++)
                    {
                        reader.MoveToAttribute(i);
                        NGLanguageInfo languageInfo = new NGLanguageInfo();
                        languageInfo.CultureName = reader.Name;
                        languageInfo.Value = reader.ReadContentAsString();
                        DisplayName.Add(languageInfo);
                    }
                }
                else if (reader.IsStartElement("Namespace"))
                {
                    Namespace = reader.ReadString().Trim();
                }
                else if (reader.IsStartElement("Version"))
                {
                    Version = new NGVersion(reader.ReadString().Trim());
                }
                else if (reader.IsStartElement("IsLastVersion"))
                {
                    IsLastVersion = Convert.ToBoolean(reader.ReadString().Trim());
                }
                else if (reader.IsStartElement("IsCheckOut"))
                {
                    IsCheckOut = Convert.ToBoolean(reader.ReadString().Trim());
                }
                else if (reader.IsStartElement("Description"))
                {
                    for (int i = 0; i < reader.AttributeCount; i++)
                    {
                        reader.MoveToAttribute(i);
                        NGLanguageInfo languageInfo = new NGLanguageInfo();
                        languageInfo.CultureName = reader.Name;
                        languageInfo.Value = reader.ReadContentAsString();
                        Description.Add(languageInfo);
                    }
                }
                else if (reader.IsStartElement("MetadataType"))
                {
                    Catalogue = (MetadataCatalogue)(Convert.ToInt32(reader.ReadString().Trim()));
                }
                else if (reader.IsStartElement("Remark"))
                {
                    Remark = reader.ReadString().Trim();
                }
                else if (reader.IsStartElement("CreateTime"))
                {
                    CreateTime = Convert.ToDateTime(reader.ReadString().Trim());
                }
                else if (reader.IsStartElement("TimeStamp"))
                {
                    TimeStamp = Convert.ToDateTime(reader.ReadString().Trim());
                }

            }
            catch (Exception)
            {

                throw;
            }
        }

        public virtual void WriteBaseXml(System.Xml.XmlWriter writer)
        {
            try
            {
                writer.WriteElementString("Id", Id);
                writer.WriteElementString("ParentId", ParentId);
                writer.WriteElementString("ParentVersionId", ParentVersionId);
                writer.WriteElementString("Name", Name);


                NGLanguageInfo languageInfo = null;
                if (DisplayName != null)
                {
                    writer.WriteStartElement("DisplayName");
                    foreach (var e in DisplayName)
                    {
                        writer.WriteAttributeString(e.CultureName, e.Value);
                        if (e.CultureName == NGCultureInfo.CurrentCulture)
                        {
                            languageInfo = new NGLanguageInfo();
                            languageInfo.CultureName = e.CultureName;
                            languageInfo.Value = e.Value;
                        }
                    }
                    if (languageInfo != null)
                    {
                        writer.WriteString(languageInfo.Value);
                    }
                    writer.WriteEndElement();
                }

                writer.WriteElementString("Namespace", Namespace);
                writer.WriteElementString("Version", Version.ToString());
                writer.WriteElementString("IsLastVersion", IsLastVersion.ToString());
                writer.WriteElementString("IsCheckOut", IsCheckOut.ToString());

                languageInfo = null;

                if (Description != null)
                {
                    writer.WriteStartElement("Description");
                    foreach (var e in Description)
                    {
                        writer.WriteAttributeString(e.CultureName, e.Value);
                        if (e.CultureName == NGCultureInfo.CurrentCulture)
                        {
                            languageInfo = new NGLanguageInfo();
                            languageInfo.CultureName = e.CultureName;
                            languageInfo.Value = e.Value;
                        }
                    }
                    if (languageInfo != null)
                    {
                        writer.WriteString(languageInfo.Value);
                    }
                    writer.WriteEndElement();
                }


                writer.WriteElementString("Catalogue", ((int)Catalogue).ToString());
                writer.WriteElementString("Remark", Remark);
                writer.WriteElementString("CreateTime", CreateTime.ToLongTimeString());
                writer.WriteElementString("TimeStamp", TimeStamp.ToLongTimeString());
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public System.Xml.Schema.XmlSchema GetSchema()
        {
            return (null);
        }

        public void ReadXml(System.Xml.XmlReader reader)
        {
            while (reader.Read())
            {
                ReadBaseXml(reader);
            }
        }

        public void WriteXml(System.Xml.XmlWriter writer)
        {
            WriteBaseXml(writer);
        }
    }
}
