using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace NG3.Metadata.Core.Ui.Toolbar
{
    public class ToolScripButton : UiComponent
    {
        public ToolbarButtonAligment Aligment { get; set; }

        public string Text { get; set; }

        public bool Enable { get; set; }

        public bool Visible { get; set; }

        public ToolbarButtonStyle ButtonStyle { get; set; }
    }
}
