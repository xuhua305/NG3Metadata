using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core.Ui;

namespace NG3.Metadata.ReverseEngine.JavaScript
{
    public interface ICustomJavaScript
    {
        JsCodeInfo GenerateAllCode();
    }
}
