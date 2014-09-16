using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Ui.Layout
{
    public class UiTemplateForJs
    {
        private UiStyle _uiStyle = UiStyle.TraditionUpdate;

        public UiStyle UiStyle
        {
            get { return _uiStyle; }
            set { _uiStyle = value; }
        }

        #region 树形检索区域

        public bool IsHaveTree { get; set; }

        public string TreeEntityId { get; set; }

        #endregion

        #region 工具栏区域

        public bool IsHaveToolbar { get; set; }

        #endregion

        #region 查询区域

        public bool IsHaveQuery { get; set; }

        public IList<string> Querys { get; set; } 

        #endregion

        #region 表头区域

        public bool IsHaveHead { get; set; }

        public string HeadEntityId { get; set; }

        private IList<HeadTabInfoForJs> _headTabInfoForJses = new List<HeadTabInfoForJs>();

        public IList<HeadTabInfoForJs> HeadTabInfoForJses
        {
            get { return _headTabInfoForJses; }
            set { _headTabInfoForJses = value; }
        }

        #endregion

        #region 表体区域

        public bool IsHaveBody { get; set; }

        public IList<BodyGridInfoForJs> BodyGridInfoForJses
        {
            get { return _bodyGridInfoForJses; }
            set { _bodyGridInfoForJses = value; }
        }

        private IList<BodyGridInfoForJs> _bodyGridInfoForJses = new List<BodyGridInfoForJs>();
 


        #endregion 
    }

    public class HeadTabInfoForJs
    {
        private IList<string> _properterys = new List<string>();


        public IList<string> Properterys
        {
            get { return _properterys; }
            set { _properterys = value; }
        }

        public string Name { get; set; }
    }

    public class BodyGridInfoForJs
    {
        private IList<string> _properterys = new List<string>();


        public IList<string> Properterys
        {
            get { return _properterys; }
            set { _properterys = value; }
        }

        public string GridEntityId { get; set; }

        public string Name { get; set; }
    }
}
