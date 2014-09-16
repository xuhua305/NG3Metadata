using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
using Metadata.Rule;
using NG3.Metadata.Core;
using NG3.Metadata.Core.Entity;
using NG3.Metadata.Core.Service;
using Newtonsoft.Json;
using SUP.Common.Base;

namespace Metadata.Rule.Service
{

    public sealed class ServiceParseFacade
    {

        private IServiceImplement CreateServiceImplement(ImplementSytle implementSytle)
        {
            try
            {
                switch (implementSytle)
                {
                    case ImplementSytle.UpdateSql:
                    case ImplementSytle.NoUpdateSql:
                        return new SqlImplement();
                    case ImplementSytle.Assembly:
                        return new AssemblyImplement();
                    case ImplementSytle.Expression:
                        return new ExpressionImplement();
                    case ImplementSytle.StoredProcedure:
                        return new StoreProcedureImplement();
                    case ImplementSytle.EntityUpdateService:
                        return new EntityUpdateServiceImplement();
                    case ImplementSytle.EntityQueryService:
                        return new EntityQueryServiceImplement();

                    default:
                        break;

                }
                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private void ParseInputParam(NameValueCollection valueCollection, ServiceContext serviceContext)
        {
            try
            {
                IList<ParameterInfo> retParams = new List<ParameterInfo>();
                IList<ParameterInfo> inputParams = serviceContext.Service.InputParams;
                if (inputParams != null && inputParams.Count != 0)
                {
                    foreach (var info in inputParams)
                    {
                        ParameterInfo parameterInfo = info.Clone() as ParameterInfo;
                        List<MetadataForEntity> metadataForEntities =
                            serviceContext.AssociateEntitys as List<MetadataForEntity>;
                        MetadataForEntity metadataForEntity =
                            metadataForEntities.Find(entity => entity.Id == info.AssociateId);
                        parameterInfo.Value = DeserilizeParamValue(parameterInfo.DataType, valueCollection[parameterInfo.Name], metadataForEntity.Sql);
                        retParams.Add(parameterInfo);
                    }
                }

                serviceContext.Service.InputParams = retParams;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private void ParsePagingParam(NameValueCollection valueCollection, ServiceContext serviceContext)
        {
            try
            {
                PagingInfo pagingInfo = new PagingInfo();
                int startRow = Convert.ToInt32(valueCollection["startRow"]);
                int rows = Convert.ToInt32(valueCollection["rows"]);

                int pageIndex = 0;
                if (rows != 0)
                {
                    pageIndex = startRow/rows - 1;
                }

                if (pageIndex < 0)
                    pageIndex = 0;
                pagingInfo.PageIndex = pageIndex;
                pagingInfo.PageSize = rows;
                serviceContext.Service.PagingInfo = pagingInfo;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private object DeserilizeParamValue(DataType dataType,string value,string sql)
        {
            try
            {
                if (value != null)
                {
                    switch (dataType)
                    {
                        case DataType.Bool:
                            return Convert.ToBoolean(value);
                        case DataType.Byte:
                            return Convert.ToByte(value);
                        case DataType.Char:
                            return Convert.ToChar(value);
                        case DataType.DateTime:
                            return Convert.ToDateTime(value);
                        case DataType.Decimal:
                            return Convert.ToDateTime(value);
                        case DataType.Int:
                            return Convert.ToInt32(value);
                        case DataType.Long:
                            return Convert.ToInt64(value);
                        case DataType.String:
                            return value;
                        case DataType.Entity:
                            return value;
                    }
                }

                return null;
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        private string SerilizeReturnValue(ParameterInfo parameterInfo)
        {
            try
            {
                if (parameterInfo.Value != null)
                {
                    //if (parameterInfo.DataType == DataType.Entity)
                    //{
                    //    Debug.Assert(parameterInfo.Value.GetType().IsAssignableFrom(typeof(DataTable)));
                    //    DataTable dt = parameterInfo.Value as DataTable;
                    //    return DataConverterHelper.ToJson(dt,dt.Rows.Count);
                    //}
                    //else
                    //{
                    //    return parameterInfo.Value.ToString();
                    //}
                    return parameterInfo.Value.ToString();
                }

                return string.Empty;
            }
            catch (Exception)
            {

                throw;
            }
        }


        private ServiceContext PrepareServiceContext(string id)
        {
            ServiceContext serviceContext = new ServiceContext();
            MetadataGod metadataGod = KnowledgeRule.Instance.GetModel<MetadataGod>(id);
            MetadataForService metadataForService = null;
            if (metadataGod.Catalogue == MetadataCatalogue.Service)
            {
                metadataForService = metadataGod as MetadataForService;
                serviceContext.Service = metadataForService;
            }

            if (metadataForService.ImpStyle == ImplementSytle.EntityQueryService ||
                metadataForService.ImpStyle == ImplementSytle.EntityUpdateService)
            {
                if (metadataForService.InputParams != null && metadataForService.InputParams.Count != 0)
                {
                    foreach (var info in metadataForService.InputParams)
                    {
                        ParameterInfo parameterInfo = info.Clone() as ParameterInfo;
                        MetadataForEntity metadataForEntity = KnowledgeRule.Instance.GetModel<MetadataForEntity>(parameterInfo.AssociateId);
                        if (metadataForEntity != null)
                        {
                            serviceContext.AssociateEntitys.Add(metadataForEntity);
                            List<MetadataForProperty> metadataForProperties = KnowledgeRule.Instance.GetModelByParentId<MetadataForProperty>(metadataForEntity.Id) 
                                as List<MetadataForProperty>;
                            serviceContext.PropertyDictionary.Add(metadataForEntity.Id,metadataForProperties);
                        }

                    }
                }
            }
            return serviceContext;
        }

        public string InvokeService(NameValueCollection valueCollection)
        {
            try
            {
                Debug.Assert(valueCollection != null);
                string id = valueCollection["id"];
                if (!string.IsNullOrEmpty(id))
                {
                    ServiceContext serviceContext = PrepareServiceContext(id);
                    IServiceImplement serviceImplement = CreateServiceImplement(serviceContext.Service.ImpStyle);
                    ParseInputParam(valueCollection, serviceContext);
                    ParsePagingParam(valueCollection,serviceContext);
                    ParameterInfo parameterInfo = serviceImplement.Invoke(serviceContext);
                    return SerilizeReturnValue(parameterInfo);
                }
                return string.Empty;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
