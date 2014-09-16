using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core
{
    public sealed class NGLanguageInfo
    {

        public string CultureName { get; set; }

        public string Value { get; set; }

        public NGLanguageInfo()
        {
            
        }

        public NGLanguageInfo(string cultureName, string value)
        {
            CultureName = cultureName;
            Value = value;
        }
    }

    /// <summary>
    /// 文化相关的信息
    /// </summary>
    public sealed class NGCultureInfo
    {
        #region 公有属性
        /// <summary>
        /// 当前文化
        /// </summary>
        public static string CurrentCulture
        {
            get { return CultureInfo.InstalledUICulture.Name.ToLower(); }
        }

        #endregion 
    }
}
