using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core
{
    [Flags]
    public enum IndustryStyle
    {
        General = 0,
        Manufacture = 2,
        ProjectConstruction = 4,
        ProjectInvestment = 8,
        Service = 16,
    }
}
