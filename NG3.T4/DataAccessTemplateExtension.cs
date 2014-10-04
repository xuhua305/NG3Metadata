using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core.Entity;

namespace NG3.T4
{
    public partial class DataAccessTemplate
    {
        private MetadataForEntity _metadataForEntity = null;

        public DataAccessTemplate(MetadataForEntity entity)
        {
            _metadataForEntity = entity;
            string sql = string.Empty;
            if (sql.IndexOf(" where ", StringComparison.OrdinalIgnoreCase) < 0)
                sql += " where id={0}"
        }
    }
}
