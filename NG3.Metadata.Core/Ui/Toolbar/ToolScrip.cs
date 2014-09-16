using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Ui.Toolbar
{
    public class ToolScrip : UiComponent
    {
        private IList<ToolScripButton> _buttons = new List<ToolScripButton>();

        public IList<ToolScripButton> Buttons
        {
            get { return _buttons; }
            set { _buttons = value; }
        }
    }
}
