using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Metadata.Rule;
using Metadata.Rule.Service;
using NG3.Data.Service;
using NG3.Metadata.Core.Service;

namespace Metadata.Controller
{
    public class RuntimeController: System.Web.Mvc.Controller
    {
        public string InvokeService()
        {
            try
            {
                ConnectionInfoService.SetSessionConnectString(@"ConnectType=SqlClient;Server=192.168.6.134;Database=MetadataDB;User ID=sa;Password=123");
                ServiceParseFacade serviceParseFacade = new ServiceParseFacade();
                return serviceParseFacade.InvokeService(System.Web.HttpContext.Current.Request.Params);
            }
            catch (Exception)
            {
                
                throw;
            }
        }
    }
}
