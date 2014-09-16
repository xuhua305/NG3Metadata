using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using NG3.Metadata.Core.Service;
using ParameterInfo = NG3.Metadata.Core.Service.ParameterInfo;

namespace NG3.Metadata.Parse.Service
{
    public sealed class AssemblyImplement : IServiceImplement
    {
        public ParameterInfo Invoke(IList<ParameterInfo> inputParams, ParameterInfo outputParam, ImplementWay implementWay)
        {
            try
            {
                Assembly assembly = Assembly.LoadFrom(implementWay.DllName);
                object obj = assembly.CreateInstance(implementWay.ClassName);
                Type objType = obj.GetType();
                MethodInfo methodInfo = objType.GetMethod(implementWay.MethodName);
                object result = null;

                ParameterInfo parameterInfo = null;
                if (outputParam != null)
                {
                    parameterInfo = outputParam.Clone() as ParameterInfo;
                }
                else
                {
                    parameterInfo = outputParam;
                }

                if (inputParams != null && inputParams.Count != 0)
                {
                    object[] pObjects = new object[inputParams.Count];
                    for (int i = 0; i < inputParams.Count; i++)
                    {
                        pObjects[i] = inputParams[i].Value;
                    }
                    result = methodInfo.Invoke(obj, pObjects);
                }
                else
                {
                    result = methodInfo.Invoke(obj, null);
                }

                if (parameterInfo != null)
                    parameterInfo.Value = result;

                return parameterInfo;
            }
            catch (Exception)
            {
                
                throw;
            }
        }
    }
}
