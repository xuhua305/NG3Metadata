using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Service
{
    public sealed class PagingInfo
    {
        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public int TotalRecord { get; set; }
    }
}
