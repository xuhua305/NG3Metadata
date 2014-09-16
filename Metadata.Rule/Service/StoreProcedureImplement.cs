using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using NG3.Data.Service;
using NG3.Metadata.Core.Service;

namespace Metadata.Rule.Service
{
    public class StoreProcedureImplement : IServiceImplement
    {

        public ParameterInfo Invoke(ServiceContext serviceContext)
        {
            try
            {
                MetadataForService metadataForService = serviceContext.Service;
                DbHelper.Open();
                ParameterInfo parameterInfo = null;
                if (metadataForService.OutputParam != null)
                {
                    parameterInfo = metadataForService.OutputParam.Clone() as ParameterInfo;
                }
                else
                {
                    parameterInfo = metadataForService.OutputParam;
                }

                IDataParameter[] dataParameters = ParamsHelp.ParseSqlParams(metadataForService.InputParams);
                if (parameterInfo == null)
                {
                    DbHelper.ExecuteNonQuery(metadataForService.Expression, dataParameters);
                }
                else
                {
                    parameterInfo.Value = DbHelper.ExecuteScalar(metadataForService.Expression, dataParameters);
                }


                return parameterInfo;
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
    }
}
