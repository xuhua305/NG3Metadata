using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Service
{
    public class MetadataForSystemVariable : MetadataBizBase
    {
        public MetadataForSystemVariable()
        {
            Catalogue = MetadataCatalogue.SystemVariable;
        }

        #region 技术特性

        /// <summary>
        /// 系统变量是否缓存
        /// </summary>
        public bool IsCache { get; set; }

        /// <summary>
        /// 缓存超时时间(0表示永远不超时)
        /// </summary>
        public int CacheOverTime { get; set; }

        #endregion 

        #region Xml序列化

        public override void ReadBaseXml(System.Xml.XmlReader reader)
        {
            base.ReadBaseXml(reader);
            if (reader.IsStartElement("CacheOverTime"))
            {
                CacheOverTime = Convert.ToInt32(reader.ReadString());
            }
            else if (reader.IsStartElement("IsCache"))
            {
                IsCache = Convert.ToBoolean(reader.ReadString().Trim());
            }
        }

        public override void WriteBaseXml(System.Xml.XmlWriter writer)
        {
            base.WriteBaseXml(writer);

            writer.WriteElementString("IsCache", IsCache.ToString());
            writer.WriteElementString("CacheOverTime", CacheOverTime.ToString());

        }

        #endregion 
    }
}
