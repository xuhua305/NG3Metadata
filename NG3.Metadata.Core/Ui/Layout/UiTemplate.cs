using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using NG3.Metadata.Core.Entity;
using NG3.Metadata.Core.Service;
using NG3.Metadata.Core.Ui.Toolbar;

namespace NG3.Metadata.Core.Ui.Layout
{
    public class UiTemplate
    {
        private UiStyle _uiStyle = UiStyle.TraditionUpdate;

        public UiStyle UiStyle
        {
            get { return _uiStyle; }
            set { _uiStyle = value; }
        }

        #region 树形检索区域

        public bool IsHaveTree { get; set; }

        private MetadataForEntity _treeEntityInfo = new MetadataForEntity();

        public MetadataForEntity TreeEntityInfo
        {
            get { return _treeEntityInfo; }
            set { _treeEntityInfo = value; }
        }

        #endregion

        #region 工具栏区域

        public bool IsHaveToolbar { get; set; }

        #endregion

        #region 查询区域

        public bool IsHaveQuery { get; set; }

        private UiQueryInfo _queryInfo = new UiQueryInfo();

        public UiQueryInfo QueryInfo
        {
            get { return _queryInfo; }
            set { _queryInfo = value; }
        }

        #endregion

        #region 表头区域

        private UiHeadInfo _headInfo = new UiHeadInfo();

        public UiHeadInfo HeadInfo
        {
            get { return _headInfo; }
            set { _headInfo = value; }
        }

        #endregion

        #region 表体区域

        public UiBodyInfo BodyInfo
        {
            get { return _bodyInfo; }
            set { _bodyInfo = value; }
        }

        private UiBodyInfo _bodyInfo = new UiBodyInfo();

        #endregion 
    }
}
