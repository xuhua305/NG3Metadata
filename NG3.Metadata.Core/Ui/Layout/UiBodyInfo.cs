using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Ui.Layout
{
    public class UiBodyInfo
    {
        private IList<UiGridInfo> _uiGridInfos = new List<UiGridInfo>();

        public IList<UiGridInfo> UiGridInfos
        {
            get { return _uiGridInfos; }
            set { _uiGridInfos = value; }
        }
    }
}
