using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core.Entity;
using NG3.Metadata.Core.Service;

namespace NG3.Metadata.Core.Ui.Layout
{
    public class UiHeadInfo
    {

        private MetadataForEntity _headEntity = new MetadataForEntity();

        public MetadataForService UpdateService { get; set; }

        public MetadataForService QueryService { get; set; }

        private IList<UiHeadZoneInfo> _headZoneInfos = new List<UiHeadZoneInfo>();


        public IList<UiHeadZoneInfo> HeadZoneInfos
        {
            get { return _headZoneInfos; }
            set { _headZoneInfos = value; }
        }


        public MetadataForEntity HeadEntity
        {
            get { return _headEntity; }
            set { _headEntity = value; }
        }

        public IList<MetadataForProperty> Keys
        {
            get { return _Keys; }
            set { _Keys = value; }
        }

        private IList<MetadataForProperty> _Keys = new List<MetadataForProperty>();
 

    }
}
