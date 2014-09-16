using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core.Entity;
using NG3.Metadata.Core.Service;

namespace NG3.Metadata.Core.Ui.Layout
{
    public class UiGridInfo
    {
        private MetadataForEntity _MetadataForEntity = new MetadataForEntity();

        public MetadataForEntity MetadataForEntity
        {
            get { return _MetadataForEntity; }
            set { _MetadataForEntity = value; }
        }

        public MetadataForService UpdateService { get; set; }

        public MetadataForService QueryService { get; set; }

        private IList<MetadataForProperty> _keys = new List<MetadataForProperty>();



        public IList<MetadataForProperty> Properties
        {
            get { return _properties; }
            set { _properties = value; }
        }

        public IList<MetadataForProperty> Keys
        {
            get { return _keys; }
            set { _keys = value; }
        }

        private IList<MetadataForProperty> _properties = new List<MetadataForProperty>();

        public MetadataForProperty RelationProperty { get; set; }


    }
}
