using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.UI.PowserBuilder.Events;
using NG3.Metadata.UI.PowserBuilder.Events.Implementation;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    /// <summary>
    /// 工具条按钮信息
    /// </summary>
    public class PbToolbarButtonInfo:PbBaseInfo
    {
        private PbEvent<PbExpressionImp> _clickEvent = new PbEvent<PbExpressionImp>();
        private bool _isDockLeft = false;


        /// <summary>
        /// 工具条按钮单击事件
        /// </summary>
        public PbEvent<PbExpressionImp> ClickEvent
        {
            get { return _clickEvent; }
            set { _clickEvent = value; }
        }

        /// <summary>
        /// 是否在左边停靠，如果是否，就是右边停靠
        /// </summary>
        public bool IsDockLeft
        {
            get { return _isDockLeft; }
            set { _isDockLeft = value; }
        }
    }
}
