using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core.Service;

namespace NG3.Metadata.Parse.Service
{
    public interface IServiceImplement
    {
        ParameterInfo Invoke(IList<ParameterInfo> inputParams, ParameterInfo outputParam, ImplementWay implementWay);
    }
}
