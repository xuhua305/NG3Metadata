using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.UI;
using Metadata.Rule;
using NG3.Data.Service;
using NG3.Metadata.Core;
using NG3.Metadata.Core.Entity;
using NG3.Metadata.Core.Service;
using NG3.Metadata.Core.Ui;
using NG3.Metadata.Core.Ui.Layout;
using NG3.Metadata.ReverseEngine;
using NG3.Metadata.ReverseEngine.Html;
using NG3.Metadata.ReverseEngine.JavaScript;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using SUP.Common.Base;

namespace Metadata.Controller
{
    public class KnowledgeController : System.Web.Mvc.Controller
    {
        private const string OkStatus = "{status : \"ok\"}";
        private const string TrueStatus = "{status : \"true\"}";
        private const string FalseStatus = "{status : \"false\"}";

        private string GetReturnStatusString(MetadataGod metadataGod, string id)
        {
            if (id.Length == 0)
                return "{status : \"ok\",id:\"" + metadataGod.Id + "\",name:\"" + metadataGod.CurrentDisplayName + "(" + metadataGod.Name + ")\"}";
            else
            {
                return "{status : \"ok\",id:\"" + id + "\",name:\"" + metadataGod.CurrentDisplayName + "(" + metadataGod.Name + ")\"}";
            }
        }

        private void ParamsHandle<T>() where T : MetadataGod, new()
        {
            Request.ContentEncoding = System.Text.Encoding.GetEncoding("gb2312");
            ViewBag.OType = System.Web.HttpContext.Current.Request.Params["otype"];
            ViewBag.Id = System.Web.HttpContext.Current.Request.Params["id"];
            T metadataGod = null;

            if (ViewBag.OType == "add")
            {
                metadataGod = new T();
                metadataGod.Id = System.Web.HttpContext.Current.Request.Params["id"];
                metadataGod.ParentId = System.Web.HttpContext.Current.Request.Params["parentId"];
                metadataGod.Name = System.Web.HttpContext.Current.Request.Params["name"];
                metadataGod.Namespace = System.Web.HttpContext.Current.Request.Params["namespace"];
            }
            else
            {
                metadataGod = KnowledgeRule.Instance.GetModel<T>(ViewBag.Id);
            }

            if (metadataGod == null)
                return;

            ViewBag.TransferData = JsonConvert.SerializeObject(metadataGod);
            ViewBag.DisplayLanguageData = JsonConvert.SerializeObject(metadataGod.DisplayName);
            ViewBag.DescriptionLanguageData = JsonConvert.SerializeObject(metadataGod.Description);

            switch (metadataGod.Catalogue)
            {
                case MetadataCatalogue.Dictionary:
                    MetadataForDictionary metadataForDictionary = metadataGod as MetadataForDictionary;
                    ViewBag.TransferGridData = JsonConvert.SerializeObject(metadataForDictionary.DictionaryContents);
                    break;
                case MetadataCatalogue.Service:
                    MetadataForService metadataForService = metadataGod as MetadataForService;
                    ViewBag.InputParamsGridData = JsonConvert.SerializeObject(metadataForService.InputParams);
                    ViewBag.OutputParamData = JsonConvert.SerializeObject(metadataForService.OutputParam);
                    break;
                case MetadataCatalogue.Entity:
                    MetadataForEntity metadataForEntity = metadataGod as MetadataForEntity;
                    ViewBag.TransferGridData = JsonConvert.SerializeObject(metadataForEntity.EntityRelations);
                    IList<MetadataForProperty> metadataForProperties = KnowledgeRule.Instance.GetModelByParentId<MetadataForProperty>(metadataGod.Id, MetadataCatalogue.Property);
                    if (metadataForProperties == null)
                    {
                        ViewBag.TransferPropertiesGridData = "[]";
                    }
                    else
                    {
                        ViewBag.TransferPropertiesGridData = JsonConvert.SerializeObject(metadataForProperties);
                    }
                    break;
                case MetadataCatalogue.Ui:
                    MetadataForUi metadataForUi = metadataGod as MetadataForUi;

                    break;
                default:
                    break;
            }
        }

        private void HandleLanguageInfo(MetadataGod metadataGod)
        {
            try
            {
                string displayNameDataStr = System.Web.HttpContext.Current.Request.Form["displayNameData"];
                string descriptionDataStr = System.Web.HttpContext.Current.Request.Form["descriptionData"];

                JObject displayNameData = JObject.Parse(displayNameDataStr);
                JObject descriptionData = JObject.Parse(descriptionDataStr);

                List<NGLanguageInfo> displayLanguageInfos = new List<NGLanguageInfo>();
                List<NGLanguageInfo> descriptionLanguageInfos = new List<NGLanguageInfo>();

                if (displayNameData["table"]["newRow"] != null)
                {
                    foreach (var jRowObject in displayNameData["table"]["newRow"])
                    {
                        NGLanguageInfo languageInfo = JsonConvert.DeserializeObject<NGLanguageInfo>(jRowObject["row"].ToString());
                        displayLanguageInfos.Add(languageInfo);
                    }
                }

                if (descriptionData["table"]["newRow"] != null)
                {
                    foreach (var jRowObject in descriptionData["table"]["newRow"])
                    {
                        NGLanguageInfo languageInfo = JsonConvert.DeserializeObject<NGLanguageInfo>(jRowObject["row"].ToString());
                        descriptionLanguageInfos.Add(languageInfo);
                    }
                }

                metadataGod.DisplayName = displayLanguageInfos;
                metadataGod.Description = descriptionLanguageInfos;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public ActionResult TestView()
        {
            return View();
        }

        public ActionResult CardTestView()
        {
            return View();
        }

        public ActionResult MainTreeView()
        {
            return View();
        }

        #region 服务节点相关

        public ActionResult ServiceView()
        {
            ParamsHandle<MetadataForService>();
            return View();
        }

        public string AddService()
        {
            try
            {
                string mergeData = System.Web.HttpContext.Current.Request.Form["mergeData"];
                string outputParamData = System.Web.HttpContext.Current.Request.Form["outputParamData"];
                string inputParamGridData = System.Web.HttpContext.Current.Request.Form["inputParamGridData"];

                JObject jformObject = JObject.Parse(mergeData);

                JObject outputParamFormObject = JObject.Parse(outputParamData);
                JObject inputParamGridObejct = JObject.Parse(inputParamGridData);

                MetadataForService metadataForService = JsonConvert.DeserializeObject<MetadataForService>(jformObject["form"]["newRow"].ToString());

                if (outputParamFormObject["form"] != null)
                {
                    if (outputParamFormObject["form"]["newRow"] != null)
                    {
                        metadataForService.OutputParam = JsonConvert.DeserializeObject<ParameterInfo>(outputParamFormObject["form"]["newRow"].ToString());
                        metadataForService.OutputParam.Id = Guid.NewGuid().ToString();
                    }
                }

                if (inputParamGridObejct["table"] != null)
                {
                    if (inputParamGridObejct["table"]["newRow"] != null)
                    {
                        foreach (var jRowObject in inputParamGridObejct["table"]["newRow"])
                        {
                            ParameterInfo parameterInfo = JsonConvert.DeserializeObject<ParameterInfo>(jRowObject["row"].ToString());
                            parameterInfo.Id = Guid.NewGuid().ToString();
                            metadataForService.InputParams.Add(parameterInfo);
                        }
                    }

                }

                HandleLanguageInfo(metadataForService);

                KnowledgeRule.Instance.AddModel<MetadataForService>(metadataForService);
                return GetReturnStatusString(metadataForService, string.Empty);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public string UpdateService()
        {
            try
            {

                string mergeData = System.Web.HttpContext.Current.Request.Form["mergeData"];
                string outputParamData = System.Web.HttpContext.Current.Request.Form["outputParamData"];
                string inputParamGridData = System.Web.HttpContext.Current.Request.Form["inputParamGridData"];

                JObject jformObject = JObject.Parse(mergeData);

                JObject outputParamFormObject = JObject.Parse(outputParamData);
                JObject inputParamGridObejct = JObject.Parse(inputParamGridData);

                MetadataForService metadataForService = JsonConvert.DeserializeObject<MetadataForService>(jformObject["form"]["modifiedRow"].ToString());

                if (outputParamFormObject["form"] != null)
                {
                    if (outputParamFormObject["form"]["modifiedRow"] != null)
                    {
                        metadataForService.OutputParam = JsonConvert.DeserializeObject<ParameterInfo>(outputParamFormObject["form"]["modifiedRow"].ToString());
                    }
                }

                if (inputParamGridObejct["table"] != null)
                {
                    if (inputParamGridObejct["table"]["newRow"] != null)
                    {
                        foreach (var jRowObject in inputParamGridObejct["table"]["newRow"])
                        {
                            ParameterInfo parameterInfo = JsonConvert.DeserializeObject<ParameterInfo>(jRowObject["row"].ToString());
                            metadataForService.InputParams.Add(parameterInfo);
                        }
                    }

                }

                HandleLanguageInfo(metadataForService);

                string id = KnowledgeRule.Instance.UpdateModel<MetadataForService>(metadataForService);
                return GetReturnStatusString(metadataForService, id);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        #endregion

        #region 分类节点相关

        public ActionResult BizNodeView()
        {

            ParamsHandle<MetadataForNode>();

            return View();
        }

        public string AddNode()
        {
            try
            {
                string mergeData = System.Web.HttpContext.Current.Request.Form["mergeData"];

                JObject jObject = JObject.Parse(mergeData);
                MetadataForNode metadataForNode = JsonConvert.DeserializeObject<MetadataForNode>(jObject["form"]["newRow"].ToString());
                HandleLanguageInfo(metadataForNode);
                KnowledgeRule.Instance.AddModel<MetadataForNode>(metadataForNode);
                return GetReturnStatusString(metadataForNode, string.Empty);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public string UpdateNode()
        {
            try
            {
                string mergeData = System.Web.HttpContext.Current.Request.Form["mergeData"];

                JObject jObject = JObject.Parse(mergeData);
                MetadataForNode metadataForNode = JsonConvert.DeserializeObject<MetadataForNode>(jObject["form"]["modifiedRow"].ToString());
                HandleLanguageInfo(metadataForNode);
                string id = KnowledgeRule.Instance.UpdateModel<MetadataForNode>(metadataForNode);
                return GetReturnStatusString(metadataForNode, id);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        #endregion

        #region 向导相关

        public ActionResult LayoutWizardView()
        {
            UiTemplateForJs uiTemplateForJs = new UiTemplateForJs();

            ViewBag.TransferData = JsonConvert.SerializeObject(uiTemplateForJs);
            return View();
        }

        public string GetEntityByRelationId(string id)
        {
            IList<MetadataForEntity> metadataForEntities = KnowledgeRule.Instance.GetEntityByRelationId(id);
            if (metadataForEntities == null)
                return "{}";

            return JsonConvert.SerializeObject(metadataForEntities);
        }

        public string GetPropertyByEntityId(string id)
        {
            try
            {
                IList<MetadataForProperty> metadataForProperties = KnowledgeRule.Instance.GetModelByParentId<MetadataForProperty>(id, MetadataCatalogue.Property);
                return JsonConvert.SerializeObject(metadataForProperties);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string HandleUiTemplate()
        {
            try
            {
                string baseXmlPath = Request.PhysicalApplicationPath;
                baseXmlPath = Path.Combine(baseXmlPath, "Xml");
                string np = System.Web.HttpContext.Current.Request.Params["namespace"];
                baseXmlPath = Path.Combine(baseXmlPath, MetadataConvert.ConvertNamespaceToRalativePath(np));


                string data = System.Web.HttpContext.Current.Request.Params["data"];
                UiTemplateForJs uiTemplateForJs = JsonConvert.DeserializeObject<UiTemplateForJs>(data);
                UiTemplate uiTemplate = KnowledgeRule.Instance.ConvertUiTemplate(uiTemplateForJs);
                Session["UiTemplate"] = uiTemplate;

                KnowledgeRule.Instance.DeployUiTemplate(uiTemplate, baseXmlPath);
                return OkStatus;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        #endregion

        #region 字典实体相关

        public ActionResult DictionaryView()
        {
            ParamsHandle<MetadataForDictionary>();
            return View();
        }

        public string AddDictionary()
        {
            try
            {
                string mergeData = System.Web.HttpContext.Current.Request.Form["mergeData"];
                string gridData = System.Web.HttpContext.Current.Request.Form["gridData"];

                JObject jformObject = JObject.Parse(mergeData);
                JObject jGridObject = JObject.Parse(gridData);

                MetadataForDictionary metadataForDictionary = JsonConvert.DeserializeObject<MetadataForDictionary>(jformObject["form"]["newRow"].ToString());
                if (jGridObject["table"] != null)
                {
                    if (jGridObject["table"]["newRow"] != null)
                    {
                        foreach (var jRowObject in jGridObject["table"]["newRow"])
                        {
                            DictionaryContent dictionaryContent = JsonConvert.DeserializeObject<DictionaryContent>(jRowObject["row"].ToString());
                            dictionaryContent.Id = Guid.NewGuid().ToString();
                            metadataForDictionary.DictionaryContents.Add(dictionaryContent);
                        }
                    }
                }

                HandleLanguageInfo(metadataForDictionary);

                KnowledgeRule.Instance.AddModel<MetadataForDictionary>(metadataForDictionary);
                return GetReturnStatusString(metadataForDictionary, string.Empty);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public string UpdateDictionary()
        {
            try
            {
                string mergeData = System.Web.HttpContext.Current.Request.Form["mergeData"];
                string gridData = System.Web.HttpContext.Current.Request.Form["gridData"];

                JObject jformObject = JObject.Parse(mergeData);
                JObject jGridObject = JObject.Parse(gridData);

                MetadataForDictionary metadataForDictionary = JsonConvert.DeserializeObject<MetadataForDictionary>(jformObject["form"]["modifiedRow"].ToString());
                IList<DictionaryContent> dictionaryContents = JsonConvert.DeserializeObject<IList<DictionaryContent>>(jGridObject["table"]["newRow"].ToString());
                metadataForDictionary.DictionaryContents = dictionaryContents;
                HandleLanguageInfo(metadataForDictionary);
                string id = KnowledgeRule.Instance.UpdateModel<MetadataForDictionary>(metadataForDictionary);
                return GetReturnStatusString(metadataForDictionary, id);
            }
            catch (Exception ex)
            {

                throw;
            }
        }


        #endregion

        #region 标准实体相关

        public ActionResult EntityView()
        {
            ParamsHandle<MetadataForEntity>();
            return View();
        }

        public ActionResult GetEntityTree(string id)
        {
            try
            {
                IList<MetadataGod> metadataGods = KnowledgeRule.Instance.GetModelByParentId<MetadataGod>(id, MetadataCatalogue.Entity, true);
                IList<TreeJson> treeJsons = new List<TreeJson>();
                if (id == "root")
                {
                    treeJsons = TreeBuilderHelp.BuildTree(metadataGods, true);
                }
                else
                {
                    treeJsons = TreeBuilderHelp.BuildTree(metadataGods, false);
                }

                JsonResult jsons = this.Json(treeJsons, JsonRequestBehavior.AllowGet);
                return jsons;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public ActionResult EntityPropertyView()
        {
            ParamsHandle<MetadataForProperty>();
            return View();
        }

        public string AddEntity()
        {
            try
            {
                string mergeData = System.Web.HttpContext.Current.Request.Form["mergeData"];
                string gridData = System.Web.HttpContext.Current.Request.Form["gridData"];

                JObject jformObject = JObject.Parse(mergeData);
                JObject jGridObject = JObject.Parse(gridData);

                MetadataForEntity metadataForEntity = JsonConvert.DeserializeObject<MetadataForEntity>(jformObject["form"]["newRow"].ToString());
                if (jGridObject["table"] != null)
                {
                    if (jGridObject["table"]["newRow"] != null)
                    {
                        foreach (var jRowObject in jGridObject["table"]["newRow"])
                        {
                            EntityRelation entityRelation = JsonConvert.DeserializeObject<EntityRelation>(jRowObject["row"].ToString());
                            entityRelation.Id = Guid.NewGuid().ToString();
                            metadataForEntity.EntityRelations.Add(entityRelation);
                        }
                    }
                }

                HandleLanguageInfo(metadataForEntity);

                KnowledgeRule.Instance.AddEntityModel(metadataForEntity);
                return GetReturnStatusString(metadataForEntity, string.Empty);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public string UpdateEntity()
        {
            try
            {
                string mergeData = System.Web.HttpContext.Current.Request.Form["mergeData"];
                string gridData = System.Web.HttpContext.Current.Request.Form["gridData"];

                JObject jformObject = JObject.Parse(mergeData);
                JObject jGridObject = JObject.Parse(gridData);

                MetadataForEntity metadataForEntity = JsonConvert.DeserializeObject<MetadataForEntity>(jformObject["form"]["modifiedRow"].ToString());

                if (jGridObject["table"] != null)
                {
                    if (jGridObject["table"]["newRow"] != null)
                    {
                        foreach (var jRowObject in jGridObject["table"]["newRow"])
                        {
                            EntityRelation entityRelation = JsonConvert.DeserializeObject<EntityRelation>(jRowObject["row"].ToString());
                            entityRelation.Id = Guid.NewGuid().ToString();
                            metadataForEntity.EntityRelations.Add(entityRelation);
                        }
                    }

                }

                HandleLanguageInfo(metadataForEntity);
                string id = KnowledgeRule.Instance.UpdateEntityModel(metadataForEntity);
                return GetReturnStatusString(metadataForEntity, id);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public string AddProperty()
        {
            try
            {
                string mergeData = System.Web.HttpContext.Current.Request.Form["mergeData"];

                JObject jformObject = JObject.Parse(mergeData);

                MetadataForProperty metadataForProperty = JsonConvert.DeserializeObject<MetadataForProperty>(jformObject["form"]["newRow"].ToString());

                HandleLanguageInfo(metadataForProperty);
                KnowledgeRule.Instance.AddModel<MetadataForProperty>(metadataForProperty);
                return GetReturnStatusString(metadataForProperty, string.Empty);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public string UpdateProperty()
        {
            try
            {
                string mergeData = System.Web.HttpContext.Current.Request.Form["mergeData"];

                JObject jformObject = JObject.Parse(mergeData);

                MetadataForProperty metadataForProperty = JsonConvert.DeserializeObject<MetadataForProperty>(jformObject["form"]["modifiedRow"].ToString());

                HandleLanguageInfo(metadataForProperty);
                string id = KnowledgeRule.Instance.UpdateModel<MetadataForProperty>(metadataForProperty);
                return GetReturnStatusString(metadataForProperty, id);
            }
            catch (Exception ex)
            {

                throw;
            }
        }



        #endregion

        #region 界面设计相关

        public ActionResult UiInteractionView()
        {

            ParamsHandle<MetadataForUi>();
            return View();
        }

        private  void CopyDir(string srcPath, string aimPath)
        {
            try
            {
                if (aimPath[aimPath.Length - 1] != Path.DirectorySeparatorChar)
                    aimPath += Path.DirectorySeparatorChar;
                //判断目标目录是否存在如果不存在则新建之  
                if (!Directory.Exists(aimPath)) Directory.CreateDirectory(aimPath);
                //string[]fileList=Directory.GetFiles(srcPath);  
                string[] fileList = Directory.GetFileSystemEntries(srcPath);
                //遍历所有的文件和目录  
                foreach (string file in fileList)
                {
                    //先当作目录处理如果存在这个  目录就递归Copy该目录下面的文件  
                    if (Directory.Exists(file))
                        CopyDir(file, aimPath + Path.GetFileName(file));
                    else
                    {
                        System.IO.File.Copy(file, aimPath + Path.GetFileName(file), true);
                    }
                        
                }
            }
            catch (Exception e)
            {
            }
        }

        public string SaveDesignerFile()
        {
            try
            {
                UiTemplate uiTemplateData = Session["UiTemplate"] as UiTemplate;
                if (uiTemplateData == null)
                {
                    return string.Empty;
                }

                //部署Xml文件
                string basePath = Request.PhysicalApplicationPath;
                //string xmlBasePath = Path.Combine(basePath, "Xml");
                string htmlBasePath = Path.Combine(basePath, "Html");

                string namesapce = System.Web.HttpContext.Current.Request.Params["namesapce"];
                string billType = System.Web.HttpContext.Current.Request.Params["billType"];
                string eventString = System.Web.HttpContext.Current.Request.Params["eventString"];
                string pageName = System.Web.HttpContext.Current.Request.Params["pageName"];

                htmlBasePath = Path.Combine(htmlBasePath, MetadataConvert.ConvertNamespaceToRalativePath(namesapce));

                //string sourcePath = Path.Combine(xmlBasePath, "Designer");
                //sourcePath = Path.Combine(sourcePath, billType);

                //string targetPath = Path.Combine(xmlBasePath, MetadataConvert.ConvertNamespaceToRalativePath(namesapce));
                //targetPath = Path.Combine(targetPath, billType);

                //CopyDir(sourcePath, targetPath);

                IList<JsEventData> jsEventDatas = JsonConvert.DeserializeObject<IList<JsEventData>>(eventString);
                if (billType == "List")
                {
                    IFileDeploy jsFileDeploy = new CustomHtml(pageName, namesapce, uiTemplateData, true, jsEventDatas);
                    jsFileDeploy.Deploy(htmlBasePath);
                }
                else
                {
                    IFileDeploy jsFileDeploy = new CustomHtml(pageName, namesapce, uiTemplateData, false, jsEventDatas);
                    jsFileDeploy.Deploy(htmlBasePath);
                }


                return OkStatus; 
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public string AddUi()
        {
            try
            {
                string mergeData = System.Web.HttpContext.Current.Request.Form["mergeData"];

                JObject jObject = JObject.Parse(mergeData);
                MetadataForUi metadataForUi = JsonConvert.DeserializeObject<MetadataForUi>(jObject["form"]["newRow"].ToString());
                HandleLanguageInfo(metadataForUi);
                KnowledgeRule.Instance.AddModel<MetadataForUi>(metadataForUi);
                return GetReturnStatusString(metadataForUi, string.Empty);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public string UpdateUi()
        {
            try
            {
                string mergeData = System.Web.HttpContext.Current.Request.Form["mergeData"];

                JObject jObject = JObject.Parse(mergeData);
                MetadataForUi metadataForUi = JsonConvert.DeserializeObject<MetadataForUi>(jObject["form"]["modifiedRow"].ToString());
                HandleLanguageInfo(metadataForUi);
                string id = KnowledgeRule.Instance.UpdateModel<MetadataForUi>(metadataForUi);
                return GetReturnStatusString(metadataForUi, id);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        #endregion

        public string DeleteModel(string id)
        {
            try
            {
                KnowledgeRule.Instance.DeleteModel(id);
                //Dictionary<string, string> dictionary =
                //    JsonConvert.DeserializeObject<Dictionary<string, string>>(mergeData);

                //DataTable dt = DataConverterHelper.ToDataTable(mergeData, "select * from md_Knowledge");
                return "{status : \"ok\"}";
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public string IsCheckOut(string id)
        {
            try
            {
                if (KnowledgeRule.Instance.IsCheckout(id))
                {
                    return TrueStatus;
                }
                else
                {
                    return FalseStatus;
                }
                //Dictionary<string, string> dictionary =
                //    JsonConvert.DeserializeObject<Dictionary<string, string>>(mergeData);

                //DataTable dt = DataConverterHelper.ToDataTable(mergeData, "select * from md_Knowledge");
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string CheckOut(string id)
        {
            try
            {
                KnowledgeRule.Instance.Checkout(id);
                //Dictionary<string, string> dictionary =
                //    JsonConvert.DeserializeObject<Dictionary<string, string>>(mergeData);

                //DataTable dt = DataConverterHelper.ToDataTable(mergeData, "select * from md_Knowledge");
                return "{status : \"ok\"}";
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string DeleteModelAbsolute(string id)
        {
            try
            {
                KnowledgeRule.Instance.DeleteModelAbsolute(id);
                //Dictionary<string, string> dictionary =
                //    JsonConvert.DeserializeObject<Dictionary<string, string>>(mergeData);

                //DataTable dt = DataConverterHelper.ToDataTable(mergeData, "select * from md_Knowledge");
                return "{status : \"ok\"}";
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public JsonResult GetTreeNodes()
        {
            try
            {
                string currentNodeId = System.Web.HttpContext.Current.Request.Params["currentNodeId"];
                int nodeStyle = System.Web.HttpContext.Current.Request.Params["nodeStyle"].Length == 0
                                    ? 0
                                    : Convert.ToInt32(System.Web.HttpContext.Current.Request.Params["nodeStyle"]);
                MetadataCatalogue catalogue = (MetadataCatalogue)nodeStyle;
                bool isNewNode = Convert.ToBoolean(System.Web.HttpContext.Current.Request.Params["isNewNode"]);

                IList<TreeJson> list = new List<TreeJson>();
                TreeJson node = null;
                MetadataGod metadataForNodeParent = null;
                if (currentNodeId == "root")
                {
                    metadataForNodeParent = new MetadataGod();
                    metadataForNodeParent.Namespace = "root";
                }
                else
                {
                    metadataForNodeParent = KnowledgeRule.Instance.GetModel<MetadataGod>(currentNodeId);
                }



                IList<MetadataGod> metadataForNodes = null;
                if (isNewNode)
                {
                    node = new TreeJson();
                    node.id = Guid.NewGuid().ToString();
                    node.cls = "folder";
                    switch (catalogue)
                    {
                        case MetadataCatalogue.Node:
                            node.text = "新建节点(NewNode)";
                            node.nodeType = (int)MetadataCatalogue.Node;
                            node.nodeNamespace = metadataForNodeParent.Namespace + ".NewNode";
                            list.Add(node);
                            break;
                        case MetadataCatalogue.Entity:
                            node.text = "新建实体(NewEntity)";
                            node.nodeType = (int)MetadataCatalogue.Entity;
                            node.nodeNamespace = metadataForNodeParent.Namespace + ".NewEntity";
                            break;
                        case MetadataCatalogue.Property:
                            node.text = "新建实体属性(NewProperty)";
                            node.nodeType = (int)MetadataCatalogue.Property;
                            node.nodeNamespace = metadataForNodeParent.Namespace + ".NewProperty";
                            break;
                        default:
                            break;
                    }

                    list.Add(node);
                }
                else
                {
                    metadataForNodes = KnowledgeRule.Instance.GetModelByParentId<MetadataGod>(currentNodeId);
                    if (metadataForNodes != null && metadataForNodes.Count != 0)
                    {
                        foreach (var metadataForNode in metadataForNodes)
                        {
                            if(metadataForNode == null)
                                continue;
                            node = new TreeJson();
                            node.id = metadataForNode.Id;
                            node.cls = metadataForNode.Catalogue == MetadataCatalogue.Node ? "folder" : "file";
                            node.text = metadataForNode.CurrentDisplayName + "(" + metadataForNode.Name + ")";
                            node.nodeType = (int)metadataForNode.Catalogue;
                            node.nodeNamespace = metadataForNode.Namespace;
                            list.Add(node);
                        }
                    }
                    else
                    {
                        if (currentNodeId.Length == 0)
                        {
                            node = new TreeJson();
                            node.id = "root";
                            node.cls = "folder";
                            node.text = "根节点(root)";
                            node.nodeType = (int)MetadataCatalogue.Node;
                            node.nodeNamespace = "root";
                            list.Add(node);
                        }
                    }

                }

                if (list == null || list.Count == 0)
                    return new JsonResult();

                JsonResult jsons = this.Json(list, JsonRequestBehavior.AllowGet);
                return jsons;

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public JsonResult LoadMainTree()
        {
            try
            {
                IList<TreeJson> list = new List<TreeJson>();
                TreeJson node = new TreeJson();
                node.id = "root";
                node.cls = "folder";
                node.text = "根节点(root)";
                //node.children = null;
                node.nodeType = (int)MetadataCatalogue.Node;
                node.nodeNamespace = "root";
                list.Add(node);
                JsonResult jsons = this.Json(list, JsonRequestBehavior.AllowGet);
                return jsons;
            }
            catch (Exception)
            {

                throw;
            }
        }


    }
}