using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace NG3.Metadata.Core.Entity
{
    /// <summary>
    /// 实体字段元数据
    /// </summary>
    public class MetadataForProperty : MetadataForPropertyTemplate
    {
        public MetadataForProperty()
        {
            Catalogue = MetadataCatalogue.Property;
        }
    }
}
