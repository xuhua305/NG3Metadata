using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace NG3.Metadata.Core.Entity
{

    /// <summary>
    /// 字典类型的实体元数据
    /// </summary>
    public class MetadataForDictionary : MetadataBizBase
    {
        public MetadataForDictionary()
        {
            Catalogue = MetadataCatalogue.Dictionary;
        }

        private IList<DictionaryContent> _dictionaryContents = new List<DictionaryContent>();

        [JsonIgnore]
        public IList<DictionaryContent> DictionaryContents
        {
            get { return _dictionaryContents; }
            set { _dictionaryContents = value; }
        }

        public override void ReadBaseXml(System.Xml.XmlReader reader)
        {
            base.ReadBaseXml(reader);

            if (reader.IsStartElement("DictionaryContents"))
            {

                reader.MoveToAttribute("Count");
                int count = Convert.ToInt32(reader.ReadContentAsString());
                for (int i = 0; i < count; i++)
                {
                    reader.Read();
                    if (reader.IsStartElement("DictionaryContent"))
                    {
                        DictionaryContent contentItem = new DictionaryContent();
                        reader.MoveToAttribute("Id");
                        contentItem.Id = Convert.ToInt32(reader.ReadContentAsString());
                        reader.MoveToAttribute("ContentItem");
                        contentItem.ContentItem = reader.ReadContentAsString();
                        reader.MoveToAttribute("Description");
                        contentItem.Description = reader.ReadContentAsString();
                        DictionaryContents.Add(contentItem);
                    }

                }

            }
        }

        public override void WriteBaseXml(System.Xml.XmlWriter writer)
        {
            base.WriteBaseXml(writer);

            writer.WriteStartElement("DictionaryContents");
            writer.WriteAttributeString("Count", DictionaryContents.Count.ToString());
            foreach (var dictionaryContent in DictionaryContents)
            {
                writer.WriteStartElement("DictionaryContent");
                writer.WriteAttributeString("Id", dictionaryContent.Id.ToString());
                writer.WriteAttributeString("ContentItem", dictionaryContent.ContentItem);
                writer.WriteAttributeString("Description", dictionaryContent.Description);
                writer.WriteEndElement();
            }
            writer.WriteEndElement();

        }
    }
}
