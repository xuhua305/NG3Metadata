using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
    /// <summary>
    /// 内置事件实现-打开系统表单
    /// </summary>
    public class PbSysBillImp:PbBaseImp
    {
        private string _billAddress = string.Empty;
        private string _billParam = string.Empty;

        /// <summary>
        /// 系统表单地址
        /// </summary>
        public string BillAddress
        {
            get { return _billAddress; }
            set { _billAddress = value; }
        }

        /// <summary>
        /// 系统表单参数
        /// </summary>
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
