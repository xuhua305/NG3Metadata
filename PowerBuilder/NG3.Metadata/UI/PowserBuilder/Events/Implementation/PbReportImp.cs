using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
    public class PbReportImp:PbBaseImp
    {
        private string _reportAddress = string.Empty;

        private string _reportParam = string.Empty;

        public string ReportAddress
        {
            get { return _reportAddress; }
            set { _reportAddress = value; }
        }

        public string ReportParam
        {
            get { return _reportParam; }
            set { _reportParam = value; }
        }

        public PbReportImp()
        {
            EventImpType = PbEventImpType.Report;
        }
    }
}
