using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using NG3.Data.Service;
using NG3.Metadata.Core.Service;

namespace NG3.Metadata.Parse.Service
{
    public class StoreProcedureImplement : IServiceImplement
    {

        public ParameterInfo Invoke(IList<ParameterInfo> inputParams, ParameterInfo outputParam, ImplementWay implementWay)
        {
            try
            {
                DbHelper.Open();
                ParameterInfo parameterInfo = null;
                if (outputParam != null)
                {
                    parameterInfo = outputParam.Clone() as ParameterInfo;
                }
                else
                {
                    parameterInfo = outputParam;
                }

                IDataParameter[] dataParameters = ParamsHelp.ParseSqlParams(inputParams);
                if (parameterInfo == null)
                {
                    DbHelper.ExecuteNonQuery(implementWay.Expression, dataParameters);
                }
                else
                {
                    parameterInfo.Value = DbHelper.ExecuteScalar(implementWay.Expression, dataParameters);
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
