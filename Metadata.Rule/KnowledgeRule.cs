using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using Metadata.DataAccess;
using NG3.Data.Service;
using NG3.Metadata.Core;
using NG3.Metadata.Core.Entity;
using NG3.Metadata.Core.Service;
using NG3.Metadata.Core.Ui;
using NG3.Metadata.Core.Ui.Layout;
using NG3.Metadata.ReverseEngine;
using NG3.Metadata.ReverseEngine.Supcan;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Metadata.Rule
{
    /// <summary>
    /// 知识模型业务逻辑
    /// </summary>
    public sealed class KnowledgeRule
    {

        public static readonly string QueryServiceName = "QueryService";
        public static readonly string UpdateServiceName = "UpdateService";
        public static readonly string MultiUpdateServiceName = "MultiUpdateService";

        //private MetadataGod 

        private MetadataGod XmlDeserialize(MetadataCatalogue catalogue, Stream stream)
        {
            MetadataGod metadataGod = null;
            switch (catalogue)
            {
                case MetadataCatalogue.Node:
                    metadataGod = SerializationHelp.XmlDeserialize<MetadataForNode>(stream);
                    break;
                case MetadataCatalogue.Dictionary:
                    metadataGod = SerializationHelp.XmlDeserialize<MetadataForDictionary>(stream);
                    break;
                case MetadataCatalogue.Service:
                    metadataGod = SerializationHelp.XmlDeserialize<MetadataForService>(stream);
                    break;
                case MetadataCatalogue.Entity:
                    metadataGod = SerializationHelp.XmlDeserialize<MetadataForEntity>(stream);
                    break;
                case MetadataCatalogue.Property:
                    metadataGod = SerializationHelp.XmlDeserialize<MetadataForProperty>(stream);
                    break;
                case MetadataCatalogue.Ui:
                    metadataGod = SerializationHelp.XmlDeserialize<MetadataForUi>(stream);
                    break;
                default:
                    break;
            }
            return metadataGod;
        }

        public IList<MetadataForEntity> GetEntityByRelationId(string id)
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                    return null;

                DataTable dt = KnowledgeDac.Instance.GetModel(id);


                if (dt == null || dt.Rows.Count == 0)
                    return null;

                Stream stream = new MemoryStream((byte[])dt.Rows[0]["Content"]);
                    MetadataGod metadataGod = XmlDeserialize((MetadataCatalogue)Convert.ToInt32(dt.Rows[0]["Catalogue"]),
                                                             stream);
                MetadataForEntity metadataForEntity = metadataGod as MetadataForEntity;
                if (metadataForEntity == null)
                    return null;

                IList<MetadataForEntity> metadataForEntities = new List<MetadataForEntity>();

                foreach (var relation in metadataForEntity.EntityRelations)
                {
                    if (relation.RelationType == EntityRelationStyle.OneToMany)
                    {
                        DataTable dtChild = KnowledgeDac.Instance.GetModel(relation.TargetEntityId);

                        if (dtChild != null && dtChild.Rows.Count != 0)
                        {
                            Stream streamChild = new MemoryStream((byte[])dtChild.Rows[0]["Content"]);
                            MetadataForEntity entity = XmlDeserialize((MetadataCatalogue)Convert.ToInt32(dtChild.Rows[0]["Catalogue"]),
                                                                     streamChild) as MetadataForEntity;
                            if (entity != null)
                            {
                                metadataForEntities.Add(entity);
                            }
                        }
                    }
                }

                return metadataForEntities;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public IList<T> GetModelByParentId<T>(string id) where T : MetadataGod
        {
            return GetModelByParentId<T>(id, MetadataCatalogue.Other);
        }

        public IList<T> GetModelByParentId<T>(string id, MetadataCatalogue metadataCatalogue) where T : MetadataGod
        {
            return GetModelByParentId<T>(id, metadataCatalogue, false);
        }

        public IList<T> GetModelByParentId<T>(string id, MetadataCatalogue metadataCatalogue, bool includeTreeNode) where T : MetadataGod
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                    return null;

                DataTable dt = null;
                if (metadataCatalogue == MetadataCatalogue.Other)
                {
                    dt = KnowledgeDac.Instance.GetModelByParentId(id);
                }
                else
                {
                    dt = KnowledgeDac.Instance.GetModelByParentId(id, metadataCatalogue);
                    if (includeTreeNode)
                    {
                        DataTable dtNode = KnowledgeDac.Instance.GetModelByParentId(id, MetadataCatalogue.Node);
                        dt.Merge(dtNode);
                        dt.AcceptChanges();
                    }
                }

                if (dt == null || dt.Rows.Count == 0)
                    return null;
                IList<T> list = new List<T>();
                foreach (DataRow dr in dt.Rows)
                {

                    Stream stream = new MemoryStream((byte[])dr["Content"]);
                    MetadataGod metadataGod = XmlDeserialize((MetadataCatalogue)Convert.ToInt32(dr["Catalogue"]),
                                                             stream);
                    list.Add(metadataGod as T);
                }

                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public T GetModel<T>(string id) where T : MetadataGod
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                    return null;

                DataTable dt = KnowledgeDac.Instance.GetModel(id);
                if (dt == null || dt.Rows.Count == 0)
                    return null;

                Stream stream = new MemoryStream((byte[])dt.Rows[0]["Content"]);
                T obj = (T)XmlDeserialize((MetadataCatalogue)Convert.ToInt32(dt.Rows[0]["Catalogue"]), stream);


                return obj;

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public void AddModel<T>(T obj) where T : MetadataGod
        {
            try
            {

                obj.CreateTime = DateTime.Now;
                obj.TimeStamp = DateTime.Now;
                obj.ParentVersionId = "";
                obj.IsLastVersion = true;
                KnowledgeDac.Instance.AddModel(obj);

                if (obj.Catalogue == MetadataCatalogue.Entity)
                    CreateEntityService(obj as MetadataForEntity);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void AddEntityModel(MetadataForEntity metadataForEntity)
        {
            try
            {
                foreach (EntityRelation relation in metadataForEntity.EntityRelations)
                {
                    if (relation.IsGenerateCascadedUpdate)
                    {
                        MetadataForService metadataForService = CreateEntityRelationUpdateService(metadataForEntity, relation.TargetEntityId);
                        relation.CascadedUpdateId = metadataForService.Id;
                    }
                }
                AddModel<MetadataForEntity>(metadataForEntity);
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        public string UpdateModel<T>(T obj) where T : MetadataGod
        {
            try
            {

                obj.TimeStamp = DateTime.Now;
                obj.IsCheckOut = false;
                obj.Version.NextRevision();

                string originalId = obj.Id;

                T originalModel = GetModel<T>(originalId);
                originalModel.Id = Guid.NewGuid().ToString();
                originalModel.IsLastVersion = false;

                obj.ParentVersionId = originalModel.Id;
                obj.IsLastVersion = true;

                KnowledgeDac.Instance.UpdateModel(obj);


                originalModel.TimeStamp = DateTime.Now;
                originalModel.ParentVersionId = "";
                originalModel.IsCheckOut = false;
                KnowledgeDac.Instance.AddModel(originalModel);

                return obj.Id;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public string UpdateEntityModel(MetadataForEntity metadataForEntity)
        {
            MetadataForEntity originalEntity = GetModel<MetadataForEntity>(metadataForEntity.Id);

            foreach (EntityRelation relation in originalEntity.EntityRelations)
            {
                if (relation.IsGenerateCascadedUpdate)
                {
                    DeleteModel(relation.CascadedUpdateId);
                }
            }

            foreach (EntityRelation relation in metadataForEntity.EntityRelations)
            {
                if (relation.IsGenerateCascadedUpdate)
                {
                    MetadataForService metadataForService = CreateEntityRelationUpdateService(metadataForEntity, relation.TargetEntityId);
                    relation.CascadedUpdateId = metadataForService.Id;
                }
            }
            return UpdateModel(metadataForEntity);
        }

        public void DeleteModel(string id)
        {
            try
            {
                KnowledgeDac.Instance.ClearModelParentVersion(id);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void DeleteModelAbsolute(string id)
        {
            try
            {
                KnowledgeDac.Instance.DeleteModel(id);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void Checkout(string id)
        {
            try
            {
                KnowledgeDac.Instance.Checkout(id);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public bool IsCheckout(string id)
        {
            try
            {
                DataTable dt = KnowledgeDac.Instance.GetModel(id);
                if (dt != null && dt.Rows.Count != 0)
                {
                    object obj = dt.Rows[0]["IsCheckOut"];
                    if (obj != null)
                    {
                        return Convert.ToBoolean(obj);
                    }
                }

                return false;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeployUiTemplate(UiTemplate uiTemplate,string basePath)
        {
            IFileDeploy fileDeploy = new CustomSupcanXml(uiTemplate, true);
            fileDeploy.Deploy(basePath);
            fileDeploy = new CustomSupcanXml(uiTemplate, false);
            fileDeploy.Deploy(basePath);
        }

        public UiTemplate ConvertUiTemplate(UiTemplateForJs uiTemplateForJs)
        {
            try
            {
                if (uiTemplateForJs == null)
                    return null;

                UiTemplate uiTemplate = new UiTemplate();
                uiTemplate.IsHaveTree = uiTemplateForJs.IsHaveTree;
                uiTemplate.IsHaveToolbar = uiTemplateForJs.IsHaveToolbar;
                uiTemplate.IsHaveQuery = uiTemplateForJs.IsHaveQuery;
                //uiTemplate.IsHaveHead = uiTemplateForJs.IsHaveHead;
                //uiTemplate.IsHaveBody = uiTemplateForJs.IsHaveBody;
                uiTemplate.UiStyle = uiTemplateForJs.UiStyle;
                DataTable headEntitydt = KnowledgeDac.Instance.GetModel(uiTemplateForJs.HeadEntityId);
                if (headEntitydt.Rows.Count > 0)
                {
                    Stream streamHead = new MemoryStream((byte[])headEntitydt.Rows[0]["Content"]);
                    MetadataGod headEntity = XmlDeserialize((MetadataCatalogue)Convert.ToInt32(headEntitydt.Rows[0]["Catalogue"]),
                                                             streamHead);
                    uiTemplate.HeadInfo.HeadEntity = headEntity as MetadataForEntity;
                }




                if (uiTemplateForJs.HeadTabInfoForJses.Count != 0)
                {
                    DataTable dtHeads = KnowledgeDac.Instance.GetModel(uiTemplateForJs.HeadTabInfoForJses[0].Properterys);

                    foreach (DataRow dr in dtHeads.Rows)
                    {
                        Stream stream = new MemoryStream((byte[]) dr["Content"]);
                        MetadataGod metadataGod = XmlDeserialize((MetadataCatalogue) Convert.ToInt32(dr["Catalogue"]),
                                                                 stream);
                        uiTemplate.HeadInfo.HeadZoneInfos.Add(new UiHeadZoneInfo());
                        MetadataForProperty property = metadataGod as MetadataForProperty;
                        uiTemplate.HeadInfo.HeadZoneInfos[0].Properties.Add(property);
                        if (property.IsQuery)
                        {
                            uiTemplate.QueryInfo.Properties.Add(property);
                        }
                        
                    }

                    uiTemplate.HeadInfo.QueryService = GetEntityQueryService(uiTemplate.HeadInfo.HeadEntity.Id);
                    uiTemplate.HeadInfo.UpdateService = GetEntityUpdateService(uiTemplate.HeadInfo.HeadEntity.Id);
                }

                if (uiTemplateForJs.BodyGridInfoForJses.Count != 0)
                {
                    DataTable dtBodys = KnowledgeDac.Instance.GetModel(uiTemplateForJs.BodyGridInfoForJses[0].Properterys);
                    foreach (DataRow dr in dtBodys.Rows)
                    {
                        Stream stream = new MemoryStream((byte[])dr["Content"]);
                        MetadataGod metadataGod = XmlDeserialize((MetadataCatalogue)Convert.ToInt32(dr["Catalogue"]),
                                                                 stream);
                        uiTemplate.BodyInfo.UiGridInfos.Add(new UiGridInfo());
                        uiTemplate.BodyInfo.UiGridInfos[0].Properties.Add(metadataGod as MetadataForProperty);
                        MetadataForProperty metadataForProperty = GetRelationPropertyByEntity(uiTemplate.HeadInfo.HeadEntity, uiTemplate.BodyInfo.UiGridInfos[0].MetadataForEntity);
                        uiTemplate.BodyInfo.UiGridInfos[0].RelationProperty = metadataForProperty;
                        uiTemplate.BodyInfo.UiGridInfos[0].QueryService = GetEntityQueryService(uiTemplate.BodyInfo.UiGridInfos[0].MetadataForEntity.Id);
                        uiTemplate.BodyInfo.UiGridInfos[0].UpdateService = GetEntityUpdateService(uiTemplate.BodyInfo.UiGridInfos[0].MetadataForEntity.Id);
                        //uiTemplate.BodyInfo.UiGridInfos[0].RelationPropertyId = 
                    }
                }

                return uiTemplate;
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                DbHelper.Close();
            }
        }

        private MetadataForService CreateUpdateEntityService(MetadataForEntity metadataForEntity)
        {
            try
            {
                MetadataForService metadataForService = new MetadataForService();
                metadataForService.CreateTime = DateTime.Now;
                metadataForService.Description.Add(new NGLanguageInfo(NGCultureInfo.CurrentCulture, metadataForEntity.CurrentDescription + "更新服务"));
                metadataForService.DisplayName.Add(new NGLanguageInfo(NGCultureInfo.CurrentCulture, metadataForEntity.CurrentDisplayName + "更新服务"));

                metadataForService.IsCheckOut = false;
                metadataForService.IsHaveRights = true;
                metadataForService.IsSensitive = false;
                metadataForService.Name = UpdateServiceName;
                metadataForService.Namespace = metadataForEntity.Namespace + "." + metadataForService.Name;
                metadataForService.ParentVersionId = "";
                metadataForService.ParentId = metadataForEntity.Id;
                metadataForService.TimeStamp = DateTime.Now;
                metadataForService.IsAsynchronous = false;
                metadataForService.IsLastVersion = true;

                //实现方式
                metadataForService.ImpStyle = ImplementSytle.EntityUpdateService;
                metadataForService.Expression = string.Empty;

                //输出参数
                metadataForService.OutputParam = new ParameterInfo();
                metadataForService.OutputParam.DataType = DataType.Bool;
                metadataForService.OutputParam.Name = "ReturnValue";
                metadataForService.OutputParam.Value = true;

                //输入参数
                ParameterInfo parameterInfo = new ParameterInfo();
                parameterInfo.AssociateId = metadataForEntity.Id;
                parameterInfo.Name = metadataForEntity.Name;
                parameterInfo.DataType = DataType.Entity;
                metadataForService.InputParams.Add(parameterInfo);

                return metadataForService;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private MetadataForService CreateQueryEntityService(MetadataForEntity metadataForEntity)
        {
            try
            {
                MetadataForService metadataForService = new MetadataForService();
                metadataForService.CreateTime = DateTime.Now;
                metadataForService.Description.Add(new NGLanguageInfo(NGCultureInfo.CurrentCulture, metadataForEntity.CurrentDescription + "查询服务"));
                metadataForService.DisplayName.Add(new NGLanguageInfo(NGCultureInfo.CurrentCulture, metadataForEntity.CurrentDisplayName + "查询服务"));

                metadataForService.IsCheckOut = false;
                metadataForService.IsHaveRights = true;
                metadataForService.IsSensitive = false;
                metadataForService.Name = QueryServiceName;
                metadataForService.Namespace = metadataForEntity.Namespace + "." + metadataForService.Name;
                metadataForService.ParentVersionId = "";
                metadataForService.ParentId = metadataForEntity.Id;
                metadataForService.TimeStamp = DateTime.Now;
                metadataForService.IsAsynchronous = false;
                metadataForService.IsLastVersion = true;

                //实现方式
                metadataForService.ImpStyle = ImplementSytle.EntityQueryService;
                metadataForService.Expression = string.Empty;

                //输出参数
                metadataForService.OutputParam = new ParameterInfo();
                metadataForService.OutputParam.DataType = DataType.Entity;
                metadataForService.OutputParam.Name = "ReturnValue";

                //输入参数
                ParameterInfo parameterInfo = new ParameterInfo();
                parameterInfo.AssociateId = metadataForEntity.Id;
                parameterInfo.Name = metadataForEntity.Name;
                parameterInfo.DataType = DataType.Entity;
                metadataForService.InputParams.Add(parameterInfo);

                return metadataForService;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private void CreateEntityService(MetadataForEntity metadataForEntity)
        {
            try
            {
                if (metadataForEntity != null)
                {
                    MetadataForService updateService = CreateUpdateEntityService(metadataForEntity);
                    MetadataForService queryService = CreateQueryEntityService(metadataForEntity);
                    KnowledgeDac.Instance.AddModel(updateService);
                    KnowledgeDac.Instance.AddModel(queryService);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
            }
        }

        public MetadataForService GetEntityUpdateService(string entityId)
        {
            try
            {
                IList<MetadataForService> metadataForServices = GetModelByParentId<MetadataForService>(entityId,MetadataCatalogue.Service);
                if (metadataForServices != null)
                {
                    foreach (var metadataForService in metadataForServices)
                    {
                        if (metadataForService.Name == UpdateServiceName)
                        {
                            return metadataForService;
                        }
                    }
                }


                return null;
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        public MetadataForService GetEntityQueryService(string entityId)
        {
            IList<MetadataForService> metadataForServices = GetModelByParentId<MetadataForService>(entityId, MetadataCatalogue.Service);
            if (metadataForServices != null)
            {
                foreach (var metadataForService in metadataForServices)
                {
                    if (metadataForService.Name == QueryServiceName)
                    {
                        return metadataForService;
                    }
                }
            }


            return null;
        }
 
        public MetadataForService CreateEntityRelationUpdateService(MetadataForEntity metadataForEntity,string targetEntityId)
        {
            try
            {
                MetadataForService metadataForService = new MetadataForService();
                metadataForService.CreateTime = DateTime.Now;
                metadataForService.Description.Add(new NGLanguageInfo(NGCultureInfo.CurrentCulture, "主从表更新服务"));
                metadataForService.DisplayName.Add(new NGLanguageInfo(NGCultureInfo.CurrentCulture, "主从表更新服务"));

                metadataForService.IsCheckOut = false;
                metadataForService.IsHaveRights = true;
                metadataForService.IsSensitive = false;
                metadataForService.Name = MultiUpdateServiceName;
                metadataForService.Namespace = metadataForEntity.Namespace + "." + metadataForService.Name;
                metadataForService.ParentVersionId = "";
                metadataForService.ParentId = metadataForEntity.Id;
                metadataForService.TimeStamp = DateTime.Now;
                metadataForService.IsAsynchronous = false;
                metadataForService.IsLastVersion = true;

                //实现方式
                metadataForService.ImpStyle = ImplementSytle.EntityUpdateService;
                metadataForService.Expression = string.Empty;

                //输出参数
                metadataForService.OutputParam = new ParameterInfo();
                metadataForService.OutputParam.DataType = DataType.Bool;
                metadataForService.OutputParam.Name = "ReturnValue";
                metadataForService.OutputParam.Value = true;

                MetadataForEntity targetEntity = GetModel<MetadataForEntity>(targetEntityId);

                //输入参数
                ParameterInfo parameterInfo = new ParameterInfo();
                parameterInfo.AssociateId = metadataForEntity.Id;
                parameterInfo.Name = metadataForEntity.Name;
                parameterInfo.DataType = DataType.Entity;
                metadataForService.InputParams.Add(parameterInfo);

                parameterInfo = new ParameterInfo();
                parameterInfo.AssociateId = targetEntity.Id;
                parameterInfo.Name = targetEntity.Name;
                parameterInfo.DataType = DataType.Entity;
                metadataForService.InputParams.Add(parameterInfo);

                return metadataForService;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public MetadataForProperty GetRelationPropertyByEntity(MetadataForEntity metadataForEntity, MetadataForEntity targetEntity)
        {
            try
            {
                foreach (EntityRelation relation in metadataForEntity.EntityRelations)
                {
                    if (relation.TargetEntityId == targetEntity.Id)
                    {
                        return GetModel<MetadataForProperty>(targetEntity.Id);
                    }
                }
                return null;
            }
            catch (Exception)
            {
                
                throw;
            }
        }

    }
}
