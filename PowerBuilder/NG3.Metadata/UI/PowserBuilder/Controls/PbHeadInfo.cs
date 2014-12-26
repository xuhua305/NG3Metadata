using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    /// <summary>
    /// PB表头控件
    /// </summary>
    public class PbHeadInfo : PbBaseControlInfo
    {
        public PbHeadInfo()
        {
            ControlType = PbControlType.Head;
        }

        IList<PbBaseControlInfo> _pbColumns = new List<PbBaseControlInfo>();

        IList<PbBaseControlInfo> _pbBaseControlInfos = new List<PbBaseControlInfo>();

        /// <summary>
        /// 表头其他控件信息(包括表体的Group)
        /// </summary>
        public IList<PbBaseControlInfo> PbBaseControlInfos
        {
            get { return _pbBaseControlInfos; }
            set { _pbBaseControlInfos = value; }
        }

        /// <summary>
        /// 表头列信息
        /// </summary>
        public IList<PbBaseControlInfo> PbColumns
        {
            get { return _pbColumns; }
            set { _pbColumns = value; }
        }
    }
}
