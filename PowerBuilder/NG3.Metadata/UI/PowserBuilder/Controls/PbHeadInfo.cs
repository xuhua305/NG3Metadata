using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbHeadInfo : PbBaseControlInfo
    {
        public PbHeadInfo()
        {
            ControlType = PbControlType.Head;
        }

        IList<PbBaseControlInfo> _pbColumns = new List<PbBaseControlInfo>();

        IList<PbBaseControlInfo> _pbBaseControlInfos = new List<PbBaseControlInfo>();

        public IList<PbBaseControlInfo> PbBaseControlInfos
        {
            get { return _pbBaseControlInfos; }
            set { _pbBaseControlInfos = value; }
        }

        public IList<PbBaseControlInfo> PbColumns
        {
            get { return _pbColumns; }
            set { _pbColumns = value; }
        }
    }
}
