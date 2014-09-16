using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExtJsSytemDemo.Controllers
{
    public class HelpController : Controller
    {
        //
        // GET: /Help/

        public ActionResult Index()
        {
            return View("Combox");
        }

        public string GetItemHelp()
        {
            string json = "{total:200,items:[{code:'01',name:'中国'},{code:'02',name:'美国'},{code:'03',name:'日本'}]}";

            return json;
        }

        public string GetProvince()
        {            
            string query = System.Web.HttpContext.Current.Request.Params["query"];
            string pageIndex = System.Web.HttpContext.Current.Request.Params["page"];           
            string pageSize = System.Web.HttpContext.Current.Request.Params["limit"];
            //string start = System.Web.HttpContext.Current.Request.Params["start"];

            string json = "{total:200,provinces:[{code:'01',name:'中国',flag:''},{code:'02',name:'美国',flag:''},"
                            + "{code:'03',name:'日本',flag:''},{code:'04',name:'英国',flag:''}]}";
            
            return json;
        }

    }
}
