using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using NG3.Metadata.Core.Ui.Layout;
using NG3.Metadata.ReverseEngine.JavaScript;

namespace NG3.Metadata.ReverseEngine.Html
{
    /// <summary>
    /// 自定义表单的Html容器
    /// </summary>
    public sealed class CustomHtml : IFileDeploy
    {
        private string _generateHtmlStr = string.Empty;
        private string _pageName = string.Empty;
        private bool _isList = false;
        private UiTemplate _uiTemplate = null;
        private string _np = string.Empty;
        private IList<JsEventData> _jsEventDatas = null;

        public CustomHtml(string pageName, string np, UiTemplate uiTemplate, bool isList, IList<JsEventData> jsEventDatas)
        {
            _pageName = pageName;
            _np = np;
            _uiTemplate = uiTemplate;
            _isList = isList;
            _jsEventDatas = jsEventDatas;

            GenerateHtml();
        }

        private string GetRelativePath()
        {
            string[] strArray = _np.Split('.');
            int num = strArray.Length + 2;
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < num; i++)
            {
                sb.Append("../");
            }
            return sb.ToString();
        }

        private string GenerateScriptHtml(string srcPath)
        {
            TagBuilder scriptTabBuilder = new TagBuilder("script");
            scriptTabBuilder.Attributes.Add("type", "text/javascript");
            scriptTabBuilder.Attributes.Add("src", srcPath);
            return scriptTabBuilder.ToString();
        }

        private string GenerateScriptHtmlWithContent(string jsCode)
        {
            TagBuilder scriptTabBuilder = new TagBuilder("script");
            scriptTabBuilder.Attributes.Add("language", "javascript");
            StringBuilder sb = new StringBuilder();

            sb.Append(Environment.NewLine);
            sb.Append("var currentRowindex = 0;");
            sb.Append(Environment.NewLine);
            sb.Append("var isExpandQuery = true;");
            sb.Append(Environment.NewLine);
            sb.Append("var otype = getQueryStringByName('otype');");
            sb.Append(Environment.NewLine);
            sb.Append("var idKey = getQueryStringByName('id');");
            sb.Append(Environment.NewLine);
            


            sb.Append(jsCode);
            scriptTabBuilder.InnerHtml = sb.ToString();
            return scriptTabBuilder.ToString();
        }

        private string GenerateFreeFormHtml()
        {
            TagBuilder scriptTabBuilder = new TagBuilder("script");
            scriptTabBuilder.InnerHtml = "insertFreeForm('AF', '')";
            return scriptTabBuilder.ToString();
        }

        private void GenerateHtml()
        {
            TagBuilder htmlTagBuilder = new TagBuilder(HtmlElementDic.HtmlElementSection);
            TagBuilder headTagBuilder = new TagBuilder(HtmlElementDic.HeadElementSecion);
            TagBuilder bodyTabBuilder = new TagBuilder(HtmlElementDic.BodyElementSecion);

            TagBuilder metaTabBuilder = new TagBuilder("meta");
            metaTabBuilder.Attributes.Add("http-equiv","content-type");
            metaTabBuilder.Attributes.Add("content", "text/html; charset=GB2312");

            StringBuilder sb = new StringBuilder();
            sb.Append(metaTabBuilder.ToString(TagRenderMode.StartTag));
            sb.Append(Environment.NewLine);
            sb.Append(GenerateScriptHtml(GetRelativePath()+"binary/dynaload.js?72"));
            sb.Append(Environment.NewLine);
            sb.Append(GenerateScriptHtml(GetRelativePath() + "Scripts/LggControl.js"));
            sb.Append(Environment.NewLine);

            CustomJavaScript customJavaScript = new CustomJavaScript(_pageName, _np, _uiTemplate,_isList, _jsEventDatas);
            string js = GenerateScriptHtmlWithContent(customJavaScript.ConvertJsCodeInfoToString(customJavaScript.GenerateAllCode()));
            sb.Append(js);
            //if (_isList)
            //{
            //    sb.Append(GenerateScriptHtml(_pageName + "List.js"));
            //}
            //else
            //{
            //    sb.Append(GenerateScriptHtml(_pageName + "Edit.js"));
            //}

            headTagBuilder.InnerHtml = sb.ToString();

            bodyTabBuilder.Attributes.Add("topmargin", "0");
            bodyTabBuilder.Attributes.Add("leftmargin", "0");
            bodyTabBuilder.Attributes.Add("rightmargin", "0");
            bodyTabBuilder.Attributes.Add("bottommargin", "0");
            bodyTabBuilder.Attributes.Add("scroll", "no");
            bodyTabBuilder.Attributes.Add("style", "overflow:hidden");
            bodyTabBuilder.InnerHtml = GenerateFreeFormHtml();

            htmlTagBuilder.InnerHtml = headTagBuilder.ToString()+Environment.NewLine+bodyTabBuilder.ToString();

            _generateHtmlStr = htmlTagBuilder.ToString();
        }

        public override string ToString()
        {
            return _generateHtmlStr;
        }



        public void Deploy(string basePath)
        {
            if (_isList)
            {
                string listPath = Path.Combine(basePath, "List");
                if (!Directory.Exists(listPath))
                    Directory.CreateDirectory(listPath);
                File.WriteAllText(Path.Combine(listPath, _pageName + "List.html"), _generateHtmlStr, Encoding.UTF8);
            }
            else
            {
                string editPath = Path.Combine(basePath, "Edit");
                if (!Directory.Exists(editPath))
                    Directory.CreateDirectory(editPath);
                File.WriteAllText(Path.Combine(editPath, _pageName + "Edit.html"), _generateHtmlStr, Encoding.UTF8);
            }
        }
    }
}
