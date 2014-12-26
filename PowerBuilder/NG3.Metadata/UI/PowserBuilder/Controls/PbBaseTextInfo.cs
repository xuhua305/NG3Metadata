using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.UI.PowserBuilder.Events;
using NG3.Metadata.UI.PowserBuilder.Events.Implementation;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbBaseTextInfo:PbBaseControlInfo
    {
        private string _leftText = string.Empty;
        private string _rightText = string.Empty;

        private PbColumnInfo _pbColumnInfo = new PbColumnInfo();

        private bool _isInGrid = false;

        private bool _isReadOnly = false;
        private PbExpressionImp _isReadOnlyExpressionImp = new PbExpressionImp();

        private bool _isMustInput = false;
        private PbExpressionImp _isMustInputExpressionImp = new PbExpressionImp();

        private string _helpDataSource = string.Empty;
        private bool _isHelpDsMultiSelect = false;
        private string _editMask = string.Empty;

        private PbEvent<PbExpressionImp> _clickEvent = new PbEvent<PbExpressionImp>();
        private PbEvent<PbExpressionImp> _doubleClickEvent = new PbEvent<PbExpressionImp>();
        private PbEvent<PbExpressionImp> _updateEvent = new PbEvent<PbExpressionImp>();

        public string LeftText
        {
            get { return _leftText; }
            set { _leftText = value; }
        }

        public string RightText
        {
            get { return _rightText; }
            set { _rightText = value; }
        }

        public bool IsMustInput
        {
            get { return _isMustInput; }
            set { _isMustInput = value; }
        }

        public string HelpDataSource
        {
            get { return _helpDataSource; }
            set { _helpDataSource = value; }
        }

        public bool IsHelpDsMultiSelect
        {
            get { return _isHelpDsMultiSelect; }
            set { _isHelpDsMultiSelect = value; }
        }

        public string EditMask
        {
            get { return _editMask; }
            set { _editMask = value; }
        }

        public bool IsReadOnly
        {
            get { return _isReadOnly; }
            set { _isReadOnly = value; }
        }

        public PbExpressionImp IsReadOnlyExpressionImp
        {
            get { return _isReadOnlyExpressionImp; }
            set { _isReadOnlyExpressionImp = value; }
        }

        public PbExpressionImp IsMustInputExpressionImp
        {
            get { return _isMustInputExpressionImp; }
            set { _isMustInputExpressionImp = value; }
        }

        public PbEvent<PbExpressionImp> ClickEvent
        {
            get { return _clickEvent; }
            set { _clickEvent = value; }
        }

        public PbEvent<PbExpressionImp> DoubleClickEvent
        {
            get { return _doubleClickEvent; }
            set { _doubleClickEvent = value; }
        }

        public PbEvent<PbExpressionImp> UpdateEvent
        {
            get { return _updateEvent; }
            set { _updateEvent = value; }
        }


        public PbColumnInfo ColumnInfo
        {
            get { return _pbColumnInfo; }
            set { _pbColumnInfo = value; }
        }
    }
}
