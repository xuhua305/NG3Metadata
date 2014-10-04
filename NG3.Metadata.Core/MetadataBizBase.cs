using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace NG3.Metadata.Core
{
    /// <summary>
    /// 元数据业务组件模型
    /// </summary>
    public class MetadataBizBase : MetadataGod
    {
        /// <summary>
        /// 是否敏感信息
        /// </summary>
        public bool IsSensitive { get; set; }

        /// <summary>
        /// 是否需要权限控制
        /// </summary>
        public bool IsHaveRights { get; set; }

        /// <summary>
        /// 行业模型编号
        /// </summary>
        public string IndustryStyleString { get; set; }

        [JsonIgnore]
        public IList<IndustryStyle> IndustryStyles
        {
            get
            {
                IList<IndustryStyle> industryStyles = new List<IndustryStyle>();
                if (!string.IsNullOrEmpty(IndustryStyleString))
                {
                    string[] strArray = IndustryStyleString.Split(new string[]{","},StringSplitOptions.RemoveEmptyEntries);
                    industryStyles.Add((IndustryStyle)Convert.ToInt32(strArray));
                }
                return industryStyles;
            }
        }

        public override void ReadBaseXml(System.Xml.XmlReader reader)
        {
            base.ReadBaseXml(reader);
            if (reader.IsStartElement("IsSensitive"))
            {
                IsSensitive = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("IsHaveRights"))
            {
                IsHaveRights = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("IndustryStyleString"))
            {
                IndustryStyleString = reader.ReadString().Trim();
            }
        }

        public override void WriteBaseXml(System.Xml.XmlWriter writer)
        {
            base.WriteBaseXml(writer);
            writer.WriteElementString("IsSensitive", IsSensitive.ToString());
            writer.WriteElementString("IsHaveRights", IsHaveRights.ToString());
            writer.WriteElementString("IndustryStyleString", IndustryStyleString);
        }
    }
}
