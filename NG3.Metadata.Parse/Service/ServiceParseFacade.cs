using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Diagnostics;
using System.Linq;
using System.Text;
using Metadata.Rule;
using NG3.Metadata.Core.Service;
using Newtonsoft.Json;

namespace NG3.Metadata.Parse.Service
{

    public sealed class ServiceParseFacade
    {

        private IServiceImplement CreateServiceImplement(MetadataForService metadataForService)
        {
            try
            {
                Debug.Assert(metadataForService != null);
                switch (metadataForService.Implement.Style)
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
                    case ImplementSytle.EntityService:
                        return new EntityServiceImplement();
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

        private IList<ParameterInfo> ParseInputParam(NameValueCollection valueCollection, IList<ParameterInfo> inputParams)
        {
            try
            {
                IList<ParameterInfo> retParams = new List<ParameterInfo>();
                if (inputParams != null && inputParams.Count != 0)
                {
                    foreach (var info in inputParams)
                    {
                        ParameterInfo parameterInfo = info.Clone() as ParameterInfo;
                        parameterInfo.Value = valueCollection[parameterInfo.Name];
                        retParams.Add(parameterInfo);
                    }
                }

                return retParams;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private string ConvertReturnValueToString(ParameterInfo parameterInfo)
        {
            try
            {
                if (parameterInfo.Value != null)
                {
                    if (parameterInfo.DataType == Core.DataType.Entity)
                    {
                        return JsonConvert.SerializeObject(parameterInfo.Value);
                    }
                    else
                    {
                        return parameterInfo.Value.ToString();
                    }
                }

                return string.Empty;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string InvokeService(NameValueCollection valueCollection)
        {
            try
            {
                Debug.Assert(valueCollection != null);
                string id = valueCollection["id"];
                if (!string.IsNullOrEmpty(id))
                {
                    MetadataForService metadataForService = KnowledgeRule.Instance.GetModel<MetadataForService>(id);
                    if (metadataForService != null)
                    {
                        IServiceImplement serviceImplement = CreateServiceImplement(metadataForService);
                        IList<ParameterInfo> inputParams = ParseInputParam(valueCollection,
                                                                           metadataForService.InputParams);
                        ParameterInfo parameterInfo = serviceImplement.Invoke(inputParams,
                                                                              metadataForService.OutputParam,
                                                                              metadataForService.Implement);
                        return ConvertReturnValueToString(parameterInfo);
                    }
                }
                return string.Empty;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
