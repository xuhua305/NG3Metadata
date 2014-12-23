using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbGridInfo:PbBaseControlInfo
    {
        public PbGridInfo()
        {
            ControlType = PbControlType.Grid;
        }

        private bool _isInTab = false;

        public bool IsInTab
        {
            get { return _isInTab; }
            set { _isInTab = value; }
        }
    }
}
