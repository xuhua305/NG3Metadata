using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using NG3.Metadata.Core.Service;

namespace NG3.Metadata.Parse.Service
{
    public class EntityServiceImplement : IServiceImplement
    {

        public ParameterInfo Invoke(IList<ParameterInfo> inputParams, ParameterInfo outputParam, ImplementWay implementWay)
        {
            try
            {
                Debug.Assert(inputParams != null);
                Debug.Assert(inputParams.Count == 1);

                ParameterInfo inputParam = inputParams[0];
                if (inputParam.DataType == Core.DataType.Entity)
                {
                    
                }
                else if (inputParam.DataType == Core.DataType.String)
                {
                    
                }

            }
            catch (Exception)
            {
                
                throw;
            }
        }
    }
}
