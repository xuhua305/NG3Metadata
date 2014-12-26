using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
    public class PbSysHelpImp:PbBaseImp
    {
        private string _sysHelpId = string.Empty;

        public string SysHelpId
        {
            get { return _sysHelpId; }
            set { _sysHelpId = value; }
        }

        public PbSysHelpImp()
        {
            EventImpType = PbEventImpType.SysHelp;
        }
    }
}
