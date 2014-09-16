using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core.Entity;

namespace NG3.Metadata.Core.Ui.Layout
{
    public class UiQueryInfo
    {
        public IList<MetadataForProperty> Properties
        {
            get { return _properties; }
            set { _properties = value; }
        }

        private IList<MetadataForProperty> _properties = new List<MetadataForProperty>();
    }
}
