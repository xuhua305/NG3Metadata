using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core;

namespace NG3.Metadata.UI.PowserBuilder.Events.Implementation
{
    public class PbBaseImp:MetadataGod
    {
        private PbEventImpType _pbEventImpType = PbEventImpType.Other;


        public PbEventImpType EventImpType
        {
            get { return _pbEventImpType; }
            set { _pbEventImpType = value; }
        }
    }
}
