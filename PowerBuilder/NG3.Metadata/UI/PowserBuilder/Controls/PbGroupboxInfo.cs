using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbGroupboxInfo:PbBaseControlInfo
    {
        public PbGroupboxInfo()
        {
            ControlType = PbControlType.Gruopbox;
        }

        private string _text = string.Empty;

        public string Text
        {
            get { return _text; }
            set { _text = value; }
        }
    }
}
