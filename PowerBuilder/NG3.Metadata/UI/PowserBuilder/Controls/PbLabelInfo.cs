using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.UI.PowserBuilder.Events;
using NG3.Metadata.UI.PowserBuilder.Events.Implementation;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbLabelInfo:PbBaseControlInfo
    {
        public PbLabelInfo()
        {
            ControlType = PbControlType.Label;
        }

        private string _text = string.Empty;

        public string Text
        {
            get { return _text; }
            set { _text = value; }
        }
    }
}
