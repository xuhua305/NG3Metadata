using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core;

namespace Metadata.Controller
{
    //ext树的数据格式
    [Serializable]
    public class TreeJson
    {
        public virtual string id { get; set; }

        public virtual string text { get; set; }

        public virtual string cls { get; set; }

        public virtual bool expanded { get; set; }

        public virtual IList<TreeJson> children { get; set; }

        public virtual bool leaf { get; set; }

        public int nodeType { get; set; }

        public string nodeNamespace { get; set; }

        //public virtual bool @checked { get; set; }

        public virtual string hrefTarget { get; set; }

    }

    public sealed class TreeBuilderHelp
    {
        public static IList<TreeJson> BuildTree(IList<MetadataGod> metadataGods, bool isIncludeRoot)
        {
            try
            {
                IList<TreeJson> list = new List<TreeJson>();
                IList<TreeJson> childList = new List<TreeJson>();
                TreeJson node = null;

                if (metadataGods == null)
                    return null;

                if (isIncludeRoot)
                {
                    node = new TreeJson();
                    node.id = "root";
                    node.cls = "folder";
                    node.leaf = false;
                    node.text = "根节点(root)";
                    node.nodeType = (int)MetadataCatalogue.Node;
                    node.nodeNamespace = "root";
                    node.children = childList;
                    list.Add(node);
                    
                }
                else
                {
                    childList = list;
                }

                foreach(MetadataGod metadataGod in metadataGods)
                {
                    node = new TreeJson();
                    node.id = metadataGod.Id;
                    if (metadataGod.Catalogue == MetadataCatalogue.Node)
                    {
                        node.leaf = false;
                        node.cls = "folder";
                    }
                    else
                    {
                        node.leaf = true;
                        node.cls = "file";
                    }
                    node.text = metadataGod.CurrentDisplayName + "(" + metadataGod.Name + ")";
                    node.nodeType = (int)metadataGod.Catalogue;
                    node.nodeNamespace = metadataGod.Namespace;
                    childList.Add(node);
                }

                return list;
            }
            catch (Exception)
            {
                
                throw;
            }
        }
    }
}
