using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbFormInfo:MetadataGod
    {
        private PbControlType _pbControlType = PbControlType.Unknow;
        private string _description = string.Empty;
        private int _height = -1;
        private int _width = -1;
        private bool _readOnly = false;

        public PbControlType ControlType
        {
            get { return _pbControlType; }
            set { _pbControlType = value; }
        }

        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }

        public int Height
        {
            get { return _height; }
            set { _height = value; }
        }

        public int Width
        {
            get { return _width; }
            set { _width = value; }
        }

        public bool ReadOnly
        {
            get { return _readOnly; }
            set { _readOnly = value; }
        }
    }
}
