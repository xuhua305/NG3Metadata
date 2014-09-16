using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Entity
{
    public enum PrimaryKeyGenerateStyle
    {
        Other=0,
        Guid,
        Increment,
        Assigned
    }
}
