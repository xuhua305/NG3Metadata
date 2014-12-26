using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
    /// <summary>
    /// PB表达式的类型
    /// </summary>
    public enum PbExpressionType
    {
        Other,
        BoolExpression,
        FunctionExpression,
        HeadEqualFormula,
        HeadEqualSql,
        BodysEqualSql,
        HeadEqualExpression,
        BodysVisibleEqualExpression,
    }
}
