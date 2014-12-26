using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.UI.PowserBuilder.Events;
using NG3.Metadata.UI.PowserBuilder.Events.Implementation;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbButtonInfo:PbBaseControlInfo
    {
        public PbButtonInfo()
        {
            ControlType = PbControlType.Button;
        }

        private string _text = string.Empty;

        public string Text
        {
            get { return _text; }
            set { _text = value; }
        }

        public PbEvent<PbExpressionImp> ClickEvent
        {
            get { return _clickEvent; }
            set { _clickEvent = value; }
        }

        private PbEvent<PbExpressionImp> _clickEvent = new PbEvent<PbExpressionImp>();
    }
}
