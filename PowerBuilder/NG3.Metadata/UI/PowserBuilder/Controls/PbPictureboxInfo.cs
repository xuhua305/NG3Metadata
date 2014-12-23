using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbPictureboxInfo:PbBaseControlInfo
    {
        public PbPictureboxInfo()
        {
            ControlType = PbControlType.Picturebox;
        }

        private string _filePath = string.Empty;

        public string FilePath
        {
            get { return _filePath; }
            set { _filePath = value; }
        }
    }
}
