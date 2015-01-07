using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace NG3.Metadata.Core
{
    /// <summary>
    /// 分类节点相关的元数据
    /// </summary>
    public class MetadataForNode : MetadataBizBase
    {
        public MetadataForNode()
        {
            Catalogue = MetadataCatalogue.Node;
        }

        public bool IsDependencyPackage { get; set; }


    }
}
