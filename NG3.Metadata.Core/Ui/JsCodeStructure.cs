using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Ui
{
    public sealed class JsCodeStructure
    {

        public string EventStr { get; set; }

        public string P1ParamStr { get; set; }

        public string MethodName { get; set; }

        public string MethodParam { get; set; }

        public string MethodBody { get; set; }

        public string Comment { get; set; }

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(Comment);
            sb.Append(Environment.NewLine);
            sb.Append("function ");
            sb.Append(MethodName);
            sb.Append("{");
            sb.Append(Environment.NewLine);
            sb.Append(MethodBody);
            sb.Append(Environment.NewLine);
            sb.Append("}");
            return sb.ToString();
        }
    }
}
