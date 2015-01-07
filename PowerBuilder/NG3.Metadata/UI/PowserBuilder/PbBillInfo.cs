using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core;
using NG3.Metadata.UI.PowserBuilder.Controls;
using NG3.Metadata.UI.PowserBuilder.Events;
using NG3.Metadata.UI.PowserBuilder.Events.Implementation;

namespace NG3.Metadata.UI.PowserBuilder
{
    /// <summary>
    /// PB单据信息
    /// </summary>
    public class PbBillInfo:MetadataGod
    {
        private string _description = string.Empty;
        private int _height = -1;
        private int _width = -1;
        private bool _isReadOnly = false;
        private string _text = string.Empty;

        private PbGridInfo _pbList = new PbGridInfo();
        private PbHeadInfo _headInfo = new PbHeadInfo();
        private IList<PbGridInfo> _pbGrids = new List<PbGridInfo>();
        private IList<PbTabInfo> _pbTabInfos = new List<PbTabInfo>();
        private PbToolbarInfo _toolbarInfo = new PbToolbarInfo();

        private PbEvent<PbExpressionImp> _editAddInitEvent = new PbEvent<PbExpressionImp>();
        private PbEvent<PbExpressionImp> _billDelCheckEvent = new PbEvent<PbExpressionImp>();
        private PbEvent<PbExpressionImp> _billDelUpdateEvent = new PbEvent<PbExpressionImp>();
        private PbEvent<PbExpressionImp> _billSaveUpdateEvent = new PbEvent<PbExpressionImp>();
        private PbEvent<PbExpressionImp> _billApprovalUpdateEvent = new PbEvent<PbExpressionImp>();
        private PbEvent<PbExpressionImp> _billUnApprovalUpdateEvent = new PbEvent<PbExpressionImp>();

        /// <summary>
        /// 窗口描述
        /// </summary>
        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }

        /// <summary>
        /// 窗口高度
        /// </summary>
        public int Height
        {
            get { return _height; }
            set { _height = value; }
        }

        /// <summary>
        /// 窗口宽度
        /// </summary>
        public int Width
        {
            get { return _width; }
            set { _width = value; }
        }

        /// <summary>
        /// 是否只读
        /// </summary>
        public bool IsReadOnly
        {
            get { return _isReadOnly; }
            set { _isReadOnly = value; }
        }

        /// <summary>
        /// 窗口标题
        /// </summary>
        public string Text
        {
            get { return _text; }
            set { _text = value; }
        }

        /// <summary>
        /// PB表头信息
        /// </summary>
        public PbHeadInfo HeadInfo
        {
            get { return _headInfo; }
            set { _headInfo = value; }
        }

        /// <summary>
        /// PB表体信息(多表体)
        /// </summary>
        public IList<PbGridInfo> PbGrids
        {
            get { return _pbGrids; }
            set { _pbGrids = value; }
        }

        /// <summary>
        /// 编辑窗口新增状态的事件
        /// </summary>
        public PbEvent<PbExpressionImp> EditAddInitEvent
        {
            get { return _editAddInitEvent; }
            set { _editAddInitEvent = value; }
        }

        /// <summary>
        /// 编辑窗口删除前的检测事件(和删除事件同一事务)
        /// </summary>
        public PbEvent<PbExpressionImp> BillDelCheckEvent
        {
            get { return _billDelCheckEvent; }
            set { _billDelCheckEvent = value; }
        }

        /// <summary>
        /// 列表窗口删除后的更新事件
        /// </summary>
        public PbEvent<PbExpressionImp> BillDelUpdateEvent
        {
            get { return _billDelUpdateEvent; }
            set { _billDelUpdateEvent = value; }
        }

        /// <summary>
        /// 编辑窗口保存事件
        /// </summary>
        public PbEvent<PbExpressionImp> BillSaveUpdateEvent
        {
            get { return _billSaveUpdateEvent; }
            set { _billSaveUpdateEvent = value; }
        }

        /// <summary>
        /// 核准单据事件
        /// </summary>
        public PbEvent<PbExpressionImp> BillApprovalUpdateEvent
        {
            get { return _billApprovalUpdateEvent; }
            set { _billApprovalUpdateEvent = value; }
        }

        /// <summary>
        /// 取消核准单据事件
        /// </summary>
        public PbEvent<PbExpressionImp> BillUnApprovalUpdateEvent
        {
            get { return _billUnApprovalUpdateEvent; }
            set { _billUnApprovalUpdateEvent = value; }
        }

        /// <summary>
        /// PB列表界面信息
        /// </summary>
        public PbGridInfo PbList
        {
            get { return _pbList; }
            set { _pbList = value; }
        }

        /// <summary>
        /// 对应的Tab信息(Tab页有多个)
        /// </summary>
        public IList<PbTabInfo> PbTabInfos
        {
            get { return _pbTabInfos; }
            set { _pbTabInfos = value; }
        }

        /// <summary>
        /// 工具栏信息
        /// </summary>
        public PbToolbarInfo ToolbarInfo
        {
            get { return _toolbarInfo; }
            set { _toolbarInfo = value; }
        }
    }
}
