using System;
using System.Collections.Generic;
using System.Text;
using System.Diagnostics;

namespace NG3.Metadata.ReverseEngine.DataBase
{
    public class Logger
    {
        public static void Log(string msg)
        {
            Debug.WriteLine(msg);
        }
    }
}
