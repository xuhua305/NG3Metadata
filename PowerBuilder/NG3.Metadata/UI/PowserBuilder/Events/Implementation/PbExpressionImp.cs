using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.UI.PowserBuilder.Events.Implementation;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
    public class PbExpressionImp:PbBaseImp
    {
        private string _expression = string.Empty;
        private PbExpressionType _expressionType = PbExpressionType.Other;

        public string Expression
        {
            get { return _expression; }
            set { _expression = value; }
        }

        public PbExpressionType ExpressionType
        {
            get { return _expressionType; }
            set { _expressionType = value; }
        }

        public PbExpressionImp()
        {
            EventImpType = PbEventImpType.Expression;
        }
    }
}
