using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
    /// <summary>
    /// 内置事件实现-打开附件
    /// </summary>
    public class PbAttachmentImp:PbBaseImp
    {
        public PbAttachmentImp()
        {
            EventImpType = PbEventImpType.Attachment;
        }
    }
}
