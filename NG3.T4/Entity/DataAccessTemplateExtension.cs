using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core.Entity;

namespace NG3.T4.Entity
{
    public partial class DataAccessTemplate
    {
        private MetadataForEntity _metadataForEntity = null;

        public DataAccessTemplate(MetadataForEntity entity)
        {
            _metadataForEntity = entity;
        }
    }
}
