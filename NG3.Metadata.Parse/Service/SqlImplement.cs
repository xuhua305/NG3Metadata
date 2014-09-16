using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using NG3.Data;
using NG3.Data.Service;
using NG3.Metadata.Core.Service;

namespace NG3.Metadata.Parse.Service
{
    public sealed class SqlImplement : IServiceImplement
    {

        public ParameterInfo Invoke(IList<ParameterInfo> inputParams, ParameterInfo outputParam, ImplementWay implementWay)
        {
            try
            {
                DbHelper.Open();
                ParameterInfo returnParameterInfo = null;
                if (outputParam != null)
                {
                    returnParameterInfo = outputParam.Clone() as ParameterInfo; 
                }
                else
                {
                    returnParameterInfo = outputParam; 
                }

                IDataParameter[] dataParameters = ParamsHelp.ParseSqlParams(inputParams);
                if (implementWay.Style == ImplementSytle.NoUpdateSql)
                {
                    if (returnParameterInfo == null)
                    {
                        DbHelper.ExecuteNonQuery(implementWay.Expression, dataParameters);
                    }
                    else
                    {
                        if (returnParameterInfo.DataType == Core.DataType.Entity)
                        {
                            DataTable dt = DbHelper.GetDataTable(implementWay.Expression, dataParameters);
                            returnParameterInfo.Value = dt;

                        }
                        else
                        {
                            returnParameterInfo.Value = DbHelper.ExecuteScalar(implementWay.Expression, dataParameters);
                        }
                    }

                }
                else if (implementWay.Style == ImplementSytle.UpdateSql)
                {
                    DbHelper.BeginTran();
                    DbHelper.ExecuteNonQuery(implementWay.Expression, dataParameters);
                    DbHelper.CommitTran();
                }


                return returnParameterInfo;
            }
            catch (Exception)
            {
                if (implementWay.Style == ImplementSytle.UpdateSql)
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
