using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Service
{
    /// <summary>
    /// 实现方式
    /// </summary>
    public enum ImplementSytle
    {
        Other,
        NoUpdateSql,
        UpdateSql,
        StoredProcedure,
        Expression,
        Assembly,
        EntityUpdateService,
        EntityDeleteService,
        EntityQueryService,
        RuleEngine
    }
}
