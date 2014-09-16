using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Ui
{
    public sealed class JsCodeInfo
    {

        private List<JsCodeStructure> _codeInfos = new List<JsCodeStructure>();

        public List<JsCodeStructure> CodeInfos
        {
            get { return _codeInfos; }
            set { _codeInfos = value; }
        }

        public void AddFunc(JsCodeStructure jsCodeStructure)
        {
            JsCodeStructure findCode = _codeInfos.Find(p => p.MethodName == jsCodeStructure.MethodName);
            if (findCode != null)
            {
                int index = _codeInfos.IndexOf(findCode);
                _codeInfos[index] = jsCodeStructure;
            }
            else
            {
                CodeInfos.Add(jsCodeStructure);
            }
        }

        public void RemoveFunc(JsCodeStructure jsCodeStructure)
        {
            JsCodeStructure findCode = _codeInfos.Find(p => p.MethodName == jsCodeStructure.MethodName);
            if (findCode != null)
                CodeInfos.Remove(findCode);
        }

        public JsCodeInfo()
        {
            
        }
    }
}
