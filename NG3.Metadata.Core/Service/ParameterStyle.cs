using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Service
{
    /// <summary>
    /// 参数类型
    /// </summary>
    public enum ParameterStyle
    {
        Other,
        /// <summary>
        /// 系统参数(系统提供取数的实现)
        /// </summary>
        System,

        /// <summary>
        /// 用户参数(需要用户输入)
        /// </summary>
        User,
    }
}
