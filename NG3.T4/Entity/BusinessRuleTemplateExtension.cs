using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.T4.Entity
{

    public partial class BusinessRuleTemplate
    {
        private MetadataForEntity _metadataForEntity = null;

        public DataAccessTemplate(MetadataForEntity entity)
        {
            _metadataForEntity = entity;
        }
    }
}
