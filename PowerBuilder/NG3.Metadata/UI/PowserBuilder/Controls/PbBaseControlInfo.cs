using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{

    public class PbBaseControlInfo : MetadataGod
    {

        private PbControlType _pbControlType = PbControlType.Unknow;
        private int _xPos = -1;
        private int _yPos = -1;
        private string _description = string.Empty;
        private bool _visible = false;
        private int _height = -1;
        private int _width = -1;
        private bool _readOnly = false;
        private string _name = string.Empty;
        private string _fullName = string.Empty;

        public PbControlType ControlType
        {
            get { return _pbControlType; }
            set { _pbControlType = value; }
        }

        public int XPos
        {
            get { return _xPos; }
            set { _xPos = value; }
        }

        public int YPos
        {
            get { return _yPos; }
            set { _yPos = value; }
        }

        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }

        public bool Visible
        {
            get { return _visible; }
            set { _visible = value; }
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

        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        public string FullName
        {
            get { return _fullName; }
            set { _fullName = value; }
        }
    }

}