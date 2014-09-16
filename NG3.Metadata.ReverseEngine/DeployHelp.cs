using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using NG3.Metadata.Core.Ui;

namespace NG3.Metadata.ReverseEngine
{
    public sealed class DeployHelp
    {
        public static void DeploySupcanXml(string xmlStr,string fileName)
        {
            if (!string.IsNullOrEmpty(xmlStr))
                File.WriteAllText(fileName, xmlStr, Encoding.UTF8);

        }

        public static void DeployHtml(string htmlStr,string fileName)
        {
            if (!string.IsNullOrEmpty(htmlStr))
                File.WriteAllText(fileName, htmlStr, Encoding.UTF8);
        }


        private static StringBuilder _jsSb = new StringBuilder(); 
        public static void DeployJavaScript(JsCodeInfo jsCodeInfo,string fileName)
        {
            try
            {
                if (jsCodeInfo == null)
                    return;

                foreach (var jsCodeStructure in jsCodeInfo.CodeInfos)
                {
                    _jsSb.Append("function ");
                    _jsSb.Append(jsCodeStructure.MethodName);
                    _jsSb.Append("(");
                    _jsSb.Append(jsCodeStructure.MethodParam);
                    _jsSb.Append("){");
                    _jsSb.Append(Environment.NewLine);
                    _jsSb.Append(jsCodeStructure.MethodBody);
                    _jsSb.Append(Environment.NewLine);
                    _jsSb.Append("}");
                    _jsSb.Append(Environment.NewLine);
                }

                if(_jsSb.Length > 0)
                    File.WriteAllText(fileName,_jsSb.ToString(),Encoding.UTF8);
            }
            catch (Exception)
            {
                
                throw;
            }
        }
    }
}
