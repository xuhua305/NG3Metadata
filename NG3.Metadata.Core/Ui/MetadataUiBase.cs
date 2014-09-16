using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Ui
{
    /// <summary>
    /// 元数据界面基础类
    /// </summary>
    public abstract class MetadataUiBase:MetadataBizBase
    {

        /// <summary>
        /// 外部的格式字符串(例如楼工控件的格式)
        /// </summary>
        public string ExternalStyleString { get; set; }
    }
}
