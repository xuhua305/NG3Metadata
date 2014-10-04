using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using Metadata.Rule;
using NG3.Data.Service;
using NG3.Metadata.Core;
using NG3.Metadata.Core.Entity;
using NG3.Metadata.Core.Service;
using NG3.Metadata.Core.Ui.Layout;

namespace Metadata.Facade
{
    public class KnowledgeFacade
    {
        public KnowledgeFacade()
        {
            ConnectionInfoService.SetSessionConnectString(@"ConnectType=SqlClient;Server=XUHUA305\SQLEXPRESS;Database=MetadataDB;User ID=sa;Password=newgrand123456");
        }

        public IList<MetadataForEntity> GetEntityByRelationId(string id)
        {
            try
            {
                DbHelper.Open();
                KnowledgeRule rule = new KnowledgeRule();
                return rule.GetEntityByRelationId(id);
            }
            catch (Exception ex)
            {

                throw;
            }
            finally
            {
                DbHelper.Close();
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

                DbHelper.Open();
                KnowledgeRule rule = new KnowledgeRule();
                return rule.GetModelByParentId<T>(id,metadataCatalogue,includeTreeNode);
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

        public T GetModel<T>(string id) where T : MetadataGod
        {
            try
            {
                DbHelper.Open();
                KnowledgeRule rule = new KnowledgeRule();
                return rule.GetModel<T>(id);
            }
            catch (Exception ex)
            {

                throw;
            }
            finally
            {
                DbHelper.Close();
            }
        }

        public void AddModel<T>(T obj) where T : MetadataGod
        {
            try
            {
                DbHelper.Open();

                DbHelper.BeginTran();
                KnowledgeRule rule = new KnowledgeRule();
                rule.AddModel<T>(obj);
                

                DbHelper.CommitTran();
            }
            catch (Exception ex)
            {
                DbHelper.RollbackTran();
                throw;
            }
            finally
            {
                DbHelper.Close();
            }
        }

        public void AddEntityModel(MetadataForEntity metadataForEntity)
        {
            try
            {
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
                DbHelper.Open();

                DbHelper.BeginTran();
                KnowledgeRule rule = new KnowledgeRule();
                string ret = rule.UpdateModel<T>(obj);
                DbHelper.CommitTran();
                return ret;
            }
            catch (Exception ex)
            {
                DbHelper.RollbackTran();
                throw;
            }
            finally
            {
                DbHelper.Close();
            }
        }

        public string UpdateEntityModel(MetadataForEntity metadataForEntity)
        {
            KnowledgeRule rule = new KnowledgeRule();
            return rule.UpdateEntityModel(metadataForEntity);
        }

        public void DeleteModel(string id)
        {
            try
            {
                DbHelper.Open();

                DbHelper.BeginTran();

                KnowledgeRule rule = new KnowledgeRule();
                rule.DeleteModel(id);
                DbHelper.CommitTran();
            }
            catch (Exception ex)
            {
                DbHelper.RollbackTran();
                throw;
            }
            finally
            {
                DbHelper.Close();
            }
        }

        public void DeleteModelAbsolute(string id)
        {
            try
            {
                DbHelper.Open();

                DbHelper.BeginTran();
                KnowledgeRule rule = new KnowledgeRule();
                rule.DeleteModelAbsolute(id);
                DbHelper.CommitTran();
            }
            catch (Exception ex)
            {
                DbHelper.RollbackTran();
                throw;
            }
            finally
            {
                DbHelper.Close();
            }
        }

        public void Checkout(string id)
        {
            try
            {
                DbHelper.Open();

                DbHelper.BeginTran();
                KnowledgeRule rule = new KnowledgeRule();
                rule.Checkout(id);
                DbHelper.CommitTran();
            }
            catch (Exception ex)
            {
                DbHelper.RollbackTran();
                throw;
            }
            finally
            {
                DbHelper.Close();
            }
        }

        public bool IsCheckout(string id)
        {
            try
            {
                DbHelper.Open();
                KnowledgeRule rule = new KnowledgeRule();
                return rule.IsCheckout(id);
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

        public void DeployUiTemplate(UiTemplate uiTemplate, string basePath)
        {
            KnowledgeRule rule = new KnowledgeRule();
            rule.DeployUiTemplate(uiTemplate,basePath);
        }

        public UiTemplate ConvertUiTemplate(UiTemplateForJs uiTemplateForJs)
        {
            KnowledgeRule rule = new KnowledgeRule();
            return rule.ConvertUiTemplate(uiTemplateForJs);
        }

        public MetadataForService GetEntityUpdateService(string entityId)
        {
            KnowledgeRule rule = new KnowledgeRule();
            return rule.GetEntityQueryService(entityId);
        }

        public MetadataForService GetEntityQueryService(string entityId)
        {
            KnowledgeRule rule = new KnowledgeRule();
            return rule.GetEntityQueryService(entityId);
        }

        public MetadataForService CreateEntityRelationUpdateService(MetadataForEntity metadataForEntity, string targetEntityId)
        {
            KnowledgeRule rule = new KnowledgeRule();
            return rule.CreateEntityRelationUpdateService(metadataForEntity,targetEntityId);
        }

        public MetadataForProperty GetRelationPropertyByEntity(MetadataForEntity metadataForEntity, MetadataForEntity targetEntity)
        {
            KnowledgeRule rule = new KnowledgeRule();
            return rule.GetRelationPropertyByEntity(metadataForEntity, targetEntity);
        }
    }
}
