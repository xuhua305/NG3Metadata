﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbBaseInfo:MetadataGod
    {
        private PbControlType _pbControlType = PbControlType.Unknow;
        private string _description = string.Empty;
        private bool _visible;
        private string _name = string.Empty;
        private string _fullName = string.Empty;

        /// <summary>
        /// PB的控件类型
        /// </summary>
        public PbControlType ControlType
        {
            get { return _pbControlType; }
            set { _pbControlType = value; }
        }

        /// <summary>
        /// 控件描述
        /// </summary>
        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }

        /// <summary>
        /// 可见性
        /// </summary>
        public bool Visible
        {
            get { return _visible; }
            set { _visible = value; }
        }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        /// <summary>
        /// 全名
        /// </summary>
        public string FullName
        {
            get { return _fullName; }
            set { _fullName = value; }
        }
    }
}
