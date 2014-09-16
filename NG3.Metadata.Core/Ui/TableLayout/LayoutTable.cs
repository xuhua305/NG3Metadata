using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Ui.TableLayout
{
    /// <summary>
    /// 布局器表描述
    /// </summary>
    public class LayoutTable
    {
        public List<LayoutColumn> Columns { get; set; }

        public List<LayoutRow> Rows { get; set; }

        public List<LayoutComponent> Components { get; set; } 
    }
}
