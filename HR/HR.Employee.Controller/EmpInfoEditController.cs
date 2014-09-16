using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

using Newtonsoft.Json.Linq;
using System.Web.Mvc;
using NG.Web.Controller;
using SUP.Common.Base;
using HR.Employee.Facade;
using NG3.Aop.Transaction;
using NG3;
using Newtonsoft.Json;

namespace HR.Employee.Controller
{
    public class EmpInfoEditController : System.Web.Mvc.Controller//NGController
    {
        private IEmpInfoFacade proxy;

        public EmpInfoEditController()
        {
            proxy = AopObjectProxy.GetObject<IEmpInfoFacade>(new EmpInfoFacade());
        }
        public ActionResult Index()
        {
            ViewBag.OType = System.Web.HttpContext.Current.Request.Params["otype"];
            ViewBag.ID = System.Web.HttpContext.Current.Request.Params["id"];

            return View("EmpInfoEdit");
        }


        public string Save()
        {
            string formdata = System.Web.HttpContext.Current.Request.Form["formdata"];
            string griddata = System.Web.HttpContext.Current.Request.Form["griddata"];

            DataTable masterdt = DataConverterHelper.ToDataTable(formdata, "select * from hr_employee");
            DataTable detaildt = DataConverterHelper.ToDataTable(griddata, "select * from hr_emp_positoninfo");

            int iret = proxy.Save(masterdt, detaildt);
            
            return "{status : \"ok\"}";
        }


        public string GetMasterInfo(string id)
        {
            //string id = System.Web.HttpContext.Current.Request.Form["id"];

            try
            {
                DataTable dt = proxy.GetMasterInfo(id);

                if (dt.Rows.Count > 0)
                {
                    JObject jo = dt.Rows[0].ToJObject();

                    string json = JsonConvert.SerializeObject(jo);

                    return "{status : \"ok\", data:" + json + "}";
                }
                else
                {
                    return "{status : \"error\"}";
                }
            }
            catch (Exception)
            {                
                throw;
            }
          
        }

        public string GetDetailInfo(string mainid)
        {
            //string id = System.Web.HttpContext.Current.Request.Form["mainid"];


            DataTable dt = proxy.GetDetailInfo(mainid);
            
            string json = DataConverterHelper.ToJson(dt, dt.Rows.Count);

            return json;
        }
    }
}
