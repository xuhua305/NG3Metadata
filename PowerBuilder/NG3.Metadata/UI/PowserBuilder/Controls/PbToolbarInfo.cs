using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    /// <summary>
    /// PB的工具条信息
    /// </summary>
    public class PbToolbarInfo:PbBaseInfo
    {
        private IList<PbToolbarInfo> _toolbarButtonInfos = new List<PbToolbarInfo>();

        /// <summary>
        /// 工具栏按钮按照list的顺序排列
        /// </summary>
        public IList<PbToolbarInfo> ToolbarButtonInfos
        {
            get { return _toolbarButtonInfos; }
            set { _toolbarButtonInfos = value; }
        }
    }
}
