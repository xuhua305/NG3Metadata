using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbGridInfo:PbBaseControlInfo
    {
        public PbGridInfo()
        {
            ControlType = PbControlType.Grid;
        }

        private bool _isInTab = false;

        private string _tableName = string.Empty;

        private string _parentId = string.Empty;

        IList<PbBaseTextInfo> _pbBaseTextInfos = new List<PbBaseTextInfo>();

        public bool IsInTab
        {
            get { return _isInTab; }
            set { _isInTab = value; }
        }

        public string TableName
        {
            get { return _tableName; }
            set { _tableName = value; }
        }

        public IList<PbBaseTextInfo> PbBaseTextInfos
        {
            get { return _pbBaseTextInfos; }
            set { _pbBaseTextInfos = value; }
        }

        public string ParentId
        {
            get { return _parentId; }
            set { _parentId = value; }
        }
    }
}
