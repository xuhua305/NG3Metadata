using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Entity
{
    /// <summary>
    /// 字典的内容结构
    /// </summary>
    public class DictionaryContent
    {
        private string _id = Guid.NewGuid().ToString();
        public string Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string ContentItem { get; set; }

        public string Description { get; set; }
    }
}
