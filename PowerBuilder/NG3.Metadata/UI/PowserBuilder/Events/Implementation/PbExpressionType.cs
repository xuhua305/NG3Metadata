using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
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
