using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbTabInfo:PbBaseControlInfo
    {
        public PbTabInfo()
        {
            ControlType = PbControlType.Tab;
        }

        private string _gridId = string.Empty;

        /// <summary>
        /// Tab页对应的Grid编号
        /// </summary>
        public string GridId
        {
            get { return _gridId; }
            set { _gridId = value; }
        }
    }
}
