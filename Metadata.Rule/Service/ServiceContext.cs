using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core.Entity;
using NG3.Metadata.Core.Service;

namespace Metadata.Rule.Service
{
    /// <summary>
    /// 服务上下文
    /// </summary>
    public sealed class ServiceContext
    {
        private MetadataForService _service = null;

        private List<MetadataForEntity> _associateEntitys = new List<MetadataForEntity>();

        private IDictionary<string,List<MetadataForProperty>> _propertyDictionary = new Dictionary<string, List<MetadataForProperty>>();

        public MetadataForService Service
        {
            get { return _service; }
            set { _service = value; }
        }

        public List<MetadataForEntity> AssociateEntitys
        {
            get { return _associateEntitys; }
            set { _associateEntitys = value; }
        }

        public IDictionary<string, List<MetadataForProperty>> PropertyDictionary
        {
            get { return _propertyDictionary; }
            set { _propertyDictionary = value; }
        }
    }
}
