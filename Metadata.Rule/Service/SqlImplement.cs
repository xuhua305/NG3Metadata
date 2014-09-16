using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using NG3.Data;
using NG3.Data.Service;
using NG3.Metadata.Core;
using NG3.Metadata.Core.Service;

namespace Metadata.Rule.Service
{
    public sealed class SqlImplement : IServiceImplement
    {

        public ParameterInfo Invoke(ServiceContext serviceContext)
        {
            MetadataForService metadataForService = serviceContext.Service;
            try
            {
                DbHelper.Open();
                ParameterInfo returnParameterInfo = null;
                if (metadataForService.OutputParam != null)
                {
                    returnParameterInfo = metadataForService.OutputParam.Clone() as ParameterInfo;
                }
                else
                {
                    returnParameterInfo = metadataForService.OutputParam;
                }

                IDataParameter[] dataParameters = ParamsHelp.ParseSqlParams(metadataForService.InputParams);
                if (metadataForService.ImpStyle == ImplementSytle.NoUpdateSql)
                {
                    if (returnParameterInfo == null)
                    {
                        DbHelper.ExecuteNonQuery(metadataForService.Expression, dataParameters);
                    }
                    else
                    {
                        if (returnParameterInfo.DataType == DataType.Entity)
                        {
                            DataTable dt = DbHelper.GetDataTable(metadataForService.Expression, dataParameters);
                            returnParameterInfo.Value = dt;

                        }
                        else
                        {
                            returnParameterInfo.Value = DbHelper.ExecuteScalar(metadataForService.Expression, dataParameters);
                        }
                    }

                }
                else if (metadataForService.ImpStyle == ImplementSytle.UpdateSql)
                {
                    DbHelper.BeginTran();
                    DbHelper.ExecuteNonQuery(metadataForService.Expression, dataParameters);
                    DbHelper.CommitTran();
                }


                return returnParameterInfo;
            }
            catch (Exception)
            {
                if (metadataForService.ImpStyle == ImplementSytle.UpdateSql)
                {
                    DbHelper.RollbackTran();
                }
                throw;
            }
            finally
            {
                DbHelper.Close();
            }
        }
    }
}
