using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Entity
{
    /// <summary>
    /// 实体关系类型
    /// </summary>
    public enum EntityRelationStyle
    {
        None=0,
        OneToOne,
        OneToMany,
        ManyToMany,
        Inherit,
    }
}
