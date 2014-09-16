using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core
{
    public enum UiStyle
    {
        /// <summary>
        /// 其他类型
        /// </summary>
        Other,
        /// <summary>
        /// 传统列表更新(没有编辑界面)
        /// </summary>
        ListUpdate,
        /// <summary>
        /// 新式列表更新(编辑和列表在一起(不支持主从维护))
        /// </summary>
        ListUpdateWithEdit,
        /// <summary>
        /// 传统编辑模式(只有表体)
        /// </summary>
        TraditionUpdate,

        /// <summary>
        /// 传统编辑模式(有表头表体)
        /// </summary>
        TraditionUpdateWithHeadAndBody
    }
}
