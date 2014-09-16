using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core.Entity;

namespace NG3.Metadata.Core.Ui.Layout
{
    public class UiHeadZoneInfo
    {
        private IList<MetadataForProperty> _properties = new List<MetadataForProperty>();

        public IList<MetadataForProperty> Properties
        {
            get { return _properties; }
            set { _properties = value; }
        }
    }
}
