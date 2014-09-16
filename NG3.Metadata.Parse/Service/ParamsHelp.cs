using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Text;
using NG3.Data;
using NG3.Metadata.Core.Service;

namespace NG3.Metadata.Parse.Service
{
    public sealed class ParamsHelp
    {
        public static IDataParameter[] ParseSqlParams(IList<ParameterInfo> inputParams)
        {
            if (inputParams == null || inputParams.Count == 0)
                return null;

            IDataParameter[] dataParameters = new IDataParameter[inputParams.Count];
            for (int i = 0; i < inputParams.Count; i++)
            {
                NGDataParameter dataParameter = null;
                switch (inputParams[i].DataType)
                {
                    case Core.DataType.String:
                        dataParameter = new NGDataParameter(inputParams[i].Name, NGDbType.Text, inputParams[i].Value);
                        break;
                    case Core.DataType.Bool:
                        dataParameter = new NGDataParameter(inputParams[i].Name, NGDbType.SmallInt, inputParams[i].Value);
                        break;
                    case Core.DataType.Char:
                        dataParameter = new NGDataParameter(inputParams[i].Name, NGDbType.Char, inputParams[i].Value);
                        break;
                    case Core.DataType.DateTime:
                        dataParameter = new NGDataParameter(inputParams[i].Name, NGDbType.DateTime, inputParams[i].Value);
                        break;
                    case Core.DataType.Int:
                    case Core.DataType.Long:
                        dataParameter = new NGDataParameter(inputParams[i].Name, NGDbType.Integer, inputParams[i].Value);
                        break;
                    case Core.DataType.Byte:
                        dataParameter = new NGDataParameter(inputParams[i].Name, NGDbType.Binary, inputParams[i].Value);
                        break;
                    case Core.DataType.Decimal:
                        dataParameter = new NGDataParameter(inputParams[i].Name, NGDbType.Numeric, inputParams[i].Value);
                        break;
                    default:
                        break;
                }
                dataParameters[i] = dataParameter;
            }

            return dataParameters;
        }


    }
}
