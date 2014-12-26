using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core;
using NG3.Metadata.UI.PowserBuilder.Events.Implementation;

namespace NG3.Metadata.UI.PowserBuilder.Events
{
    public class PbEvent<T>:MetadataGod where T:PbBaseImp,new()
    {
        private T _pbImp = new T();

        public T PbImp
        {
            get { return _pbImp; }
            set { _pbImp = value; }
        }
    }
}
