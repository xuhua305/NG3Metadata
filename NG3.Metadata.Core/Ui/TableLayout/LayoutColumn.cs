using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Ui.TableLayout
{
    /// <summary>
    /// 行信息
    /// </summary>
    public class LayoutColumn
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public bool Visible { get; set; }

        public UnitStyle WidthUnitStyle { get; set; }

        public double Width { get; set; }

        public double MinWidth { get; set; }
    }
}
