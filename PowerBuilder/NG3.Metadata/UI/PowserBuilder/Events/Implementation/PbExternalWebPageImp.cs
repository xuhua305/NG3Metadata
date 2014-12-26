using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
    /// <summary>
    /// 内置事件实现-打开外部页面
    /// </summary>
    public class PbExternalWebPageImp:PbBaseImp
    {
        private string _externalWebAddress = string.Empty;
        private string _externalWebParam = string.Empty;

        public string ExternalWebAddress
        {
            get { return _externalWebAddress; }
            set { _externalWebAddress = value; }
        }

        public string ExternalWebParam
        {
            get { return _externalWebParam; }
            set { _externalWebParam = value; }
        }

        public PbExternalWebPageImp()
        {
            EventImpType = PbEventImpType.ExternalWebPage;
        }
    }
}
