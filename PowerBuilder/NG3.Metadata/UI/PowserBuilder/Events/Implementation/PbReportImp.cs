using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
    /// <summary>
    /// 内置事件实现-打开报表
    /// </summary>
    public class PbReportImp:PbBaseImp
    {
        private string _reportAddress = string.Empty;

        private string _reportParam = string.Empty;

        /// <summary>
        /// 报表地址
        /// </summary>
        public string ReportAddress
        {
            get { return _reportAddress; }
            set { _reportAddress = value; }
        }

        /// <summary>
        /// 报表参数
        /// </summary>
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
