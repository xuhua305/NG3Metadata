using System;
using System.Collections.Generic;
using System.Text;
using System.Diagnostics;

namespace TableGenerator
{
    public class Logger
    {
        public static void Log(string msg)
        {
            Debug.WriteLine(msg);
        }
    }
}
