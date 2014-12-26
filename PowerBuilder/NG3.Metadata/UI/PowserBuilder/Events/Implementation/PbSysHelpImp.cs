using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
    /// <summary>
    /// 内置事件实现-打开帮助
    /// </summary>
    public class PbSysHelpImp:PbBaseImp
    {
        private string _sysHelpId = string.Empty;

        /// <summary>
        /// 系统内置帮助编号
        /// </summary>
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
