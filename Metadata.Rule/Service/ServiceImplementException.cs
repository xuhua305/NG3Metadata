using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Metadata.Rule.Service
{
    public class ServiceImplementException : Exception
    {
        public ServiceImplementException()
        {
        }

        public ServiceImplementException(string message)
            : base(message)
        {
        }

        public ServiceImplementException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
