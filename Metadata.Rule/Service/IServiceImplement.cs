using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core.Service;

namespace Metadata.Rule.Service
{
    public interface IServiceImplement
    {
        ParameterInfo Invoke(ServiceContext serviceContext);
    }
}
