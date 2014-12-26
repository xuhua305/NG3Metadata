using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core;
using NG3.Metadata.UI.PowserBuilder.Events;
using NG3.Metadata.UI.PowserBuilder.Events.Implementation;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbFormInfo:MetadataGod
    {
        private PbControlType _pbControlType = PbControlType.Unknow;
        private string _description = string.Empty;
        private int _height = -1;
        private int _width = -1;
        private bool _readOnly = false;
        private string _text = string.Empty;

        private PbHeadInfo _headInfo = new PbHeadInfo();
        private IList<PbGridInfo> _pbGrids = new List<PbGridInfo>(); 

        private PbEvent<PbExpressionImp> _editAddInitEvent = new PbEvent<PbExpressionImp>();
        private PbEvent<PbExpressionImp> _billDelCheckEvent = new PbEvent<PbExpressionImp>();
        private PbEvent<PbExpressionImp> _billDelUpdateEvent = new PbEvent<PbExpressionImp>();
        private PbEvent<PbExpressionImp> _billSaveUpdateEvent = new PbEvent<PbExpressionImp>();
        private PbEvent<PbExpressionImp> _billApprovalUpdateEvent = new PbEvent<PbExpressionImp>();
        private PbEvent<PbExpressionImp> _billUnApprovalUpdateEvent = new PbEvent<PbExpressionImp>();

        public PbControlType ControlType
        {
            get { return _pbControlType; }
            set { _pbControlType = value; }
        }

        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }

        public int Height
        {
            get { return _height; }
            set { _height = value; }
        }

        public int Width
        {
            get { return _width; }
            set { _width = value; }
        }

        public bool ReadOnly
        {
            get { return _readOnly; }
            set { _readOnly = value; }
        }

        public string Text
        {
            get { return _text; }
            set { _text = value; }
        }

        public PbHeadInfo HeadInfo
        {
            get { return _headInfo; }
            set { _headInfo = value; }
        }

        public IList<PbGridInfo> PbGrids
        {
            get { return _pbGrids; }
            set { _pbGrids = value; }
        }

        public PbEvent<PbExpressionImp> EditAddInitEvent
        {
            get { return _editAddInitEvent; }
            set { _editAddInitEvent = value; }
        }

        public PbEvent<PbExpressionImp> BillDelCheckEvent
        {
            get { return _billDelCheckEvent; }
            set { _billDelCheckEvent = value; }
        }

        public PbEvent<PbExpressionImp> BillDelUpdateEvent
        {
            get { return _billDelUpdateEvent; }
            set { _billDelUpdateEvent = value; }
        }

        public PbEvent<PbExpressionImp> BillSaveUpdateEvent
        {
            get { return _billSaveUpdateEvent; }
            set { _billSaveUpdateEvent = value; }
        }

        public PbEvent<PbExpressionImp> BillApprovalUpdateEvent
        {
            get { return _billApprovalUpdateEvent; }
            set { _billApprovalUpdateEvent = value; }
        }

        public PbEvent<PbExpressionImp> BillUnApprovalUpdateEvent
        {
            get { return _billUnApprovalUpdateEvent; }
            set { _billUnApprovalUpdateEvent = value; }
        }
    }
}
