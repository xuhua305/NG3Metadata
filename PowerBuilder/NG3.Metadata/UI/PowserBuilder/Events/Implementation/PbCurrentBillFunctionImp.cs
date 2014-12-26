using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
    /// <summary>
    /// 内置事件实现-打开单据的按钮的功能
    /// </summary>
    public class PbCurrentBillFunctionImp:PbBaseImp
    {
        private string _funtionId = string.Empty;

        /// <summary>
        /// 按钮的编号
        /// </summary>
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
