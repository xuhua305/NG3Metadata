using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using NG3.Metadata.Core.Service;

namespace Metadata.Rule.Service
{
    public sealed class AssemblyImplement : IServiceImplement
    {
        public NG3.Metadata.Core.Service.ParameterInfo Invoke(ServiceContext serviceContext)
        {

            MetadataForService metadataForService = serviceContext.Service;
            try
            {
                Assembly assembly = Assembly.LoadFrom(metadataForService.DllName);
                object obj = assembly.CreateInstance(metadataForService.ClassName);
                Type objType = obj.GetType();
                MethodInfo methodInfo = objType.GetMethod(metadataForService.MethodName);
                object result = null;

                NG3.Metadata.Core.Service.ParameterInfo parameterInfo = null;
                if (metadataForService.OutputParam != null)
                {
                    parameterInfo = metadataForService.OutputParam.Clone() as NG3.Metadata.Core.Service.ParameterInfo;
                }
                else
                {
                    parameterInfo = metadataForService.OutputParam;
                }

                if (metadataForService.InputParams != null && metadataForService.InputParams.Count != 0)
                {
                    object[] pObjects = new object[metadataForService.InputParams.Count];
                    for (int i = 0; i < metadataForService.InputParams.Count; i++)
                    {
                        pObjects[i] = metadataForService.InputParams[i].Value;
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
