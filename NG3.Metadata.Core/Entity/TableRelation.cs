using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Entity
{
    /// <summary>
    /// 物理表关联类型
    /// </summary>
    public enum TableRelationType
    {
        InnerJoin,
        LeftJoin,
        RightJoin
    }

    /// <summary>
    /// 物理表关联关系
    /// </summary>
    public class TableRelation
    {
        public TableRelationType RelationType { get; set; }

        public string SourceTableName { get; set; }

        public string SourceTablePropertyName { get; set; }

        public string TargetTableName { get; set; }

        public string TargetTablePropertyName { get; set; }

    }
}
