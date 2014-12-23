using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbTextInfo : PbBaseTextInfo
    {
        private PbColumnInfo _pbColumnInfo = new PbColumnInfo();



        public PbTextInfo()
        {
            ControlType = PbControlType.Text;
        }

        public PbColumnInfo ColumnInfo
        {
            get { return _pbColumnInfo; }
            set { _pbColumnInfo = value; }
        }
    }
}
