using NG3.Metadata.Core;
using NG3.Metadata.UI.PowserBuilder.Events.Implementation;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    /// <summary>
    /// PB控件基础类
    /// </summary>
    public class PbBaseControlInfo : PbBaseInfo
    {

        private int _xPos = -1;
        private int _yPos = -1;
        private PbExpressionImp _visibleExpressionImp = new PbExpressionImp(); 
        private long _textColor = 0;
        private PbExpressionImp _textColorExpressionImp = new PbExpressionImp();
        private int _height = -1;
        private int _width = -1;

        /// <summary>
        /// 绝对坐标X轴
        /// </summary>
        public int XPos
        {
            get { return _xPos; }
            set { _xPos = value; }
        }

        /// <summary>
        /// 绝对坐标y轴
        /// </summary>
        public int YPos
        {
            get { return _yPos; }
            set { _yPos = value; }
        }


        /// <summary>
        /// 高度
        /// </summary>
        public int Height
        {
            get { return _height; }
            set { _height = value; }
        }

        /// <summary>
        /// 宽度
        /// </summary>
        public int Width
        {
            get { return _width; }
            set { _width = value; }
        }


        /// <summary>
        /// 字体颜色(RGB的数字表示)
        /// </summary>
        public long TextColor
        {
            get { return _textColor; }
            set { _textColor = value; }
        }

        /// <summary>
        /// 可见性的表达式控制(表达式输出1或者0)
        /// </summary>
        public PbExpressionImp VisibleExpressionImp
        {
            get { return _visibleExpressionImp; }
            set { _visibleExpressionImp = value; }
        }

        /// <summary>
        /// 字体颜色的表达式控制(不同的表达式显示不同的字体)
        /// </summary>
        public PbExpressionImp TextColorExpressionImp
        {
            get { return _textColorExpressionImp; }
            set { _textColorExpressionImp = value; }
        }
    }

}