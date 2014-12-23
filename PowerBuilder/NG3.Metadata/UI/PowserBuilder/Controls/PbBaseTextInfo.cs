using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbBaseTextInfo:PbBaseControlInfo
    {
        private string _leftText = string.Empty;
        private string _rightText = string.Empty;

        public string LeftText
        {
            get { return _leftText; }
            set { _leftText = value; }
        }

        public string RightText
        {
            get { return _rightText; }
            set { _rightText = value; }
        }
    }
}
