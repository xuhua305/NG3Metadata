using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
    public class PbCurrentBillFunctionImp:PbBaseImp
    {
        private string _funtionId = string.Empty;

        public string FuntionId
        {
            get { return _funtionId; }
            set { _funtionId = value; }
        }

        public PbCurrentBillFunctionImp()
        {
            EventImpType = PbEventImpType.CurrentBillFunction;
        }
    }
}
