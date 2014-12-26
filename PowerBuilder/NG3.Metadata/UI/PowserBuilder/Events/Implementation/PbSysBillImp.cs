using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
    public class PbSysBillImp:PbBaseImp
    {
        private string _billAddress = string.Empty;
        private string _billParam = string.Empty;

        public string BillAddress
        {
            get { return _billAddress; }
            set { _billAddress = value; }
        }

        public string BillParam
        {
            get { return _billParam; }
            set { _billParam = value; }
        }

        public PbSysBillImp()
        {
            EventImpType = PbEventImpType.SysBill;
        }
    }
}
