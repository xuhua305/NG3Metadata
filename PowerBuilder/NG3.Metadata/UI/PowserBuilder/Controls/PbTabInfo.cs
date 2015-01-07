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

        private IList<string> _gridIds = new List<string>();

        /// <summary>
        /// Tab页中对应的Grid编号集合，按照顺序
        /// </summary>
        public IList<string> GridIds
        {
            get { return _gridIds; }
            set { _gridIds = value; }
        }
    }
}
