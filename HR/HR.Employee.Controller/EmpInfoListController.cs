using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Web.Mvc;

using NG.Web.Mvc;
using NG.Web.Controller;
using HR.Employee.Facade;
using NG3.Aop.Transaction;
using SUP.Common.Base;

namespace HR.Employee.Controller
{
    public class EmpInfoListController : System.Web.Mvc.Controller //NGController
    {

        private IEmpInfoFacade proxy;

        public EmpInfoListController()
        {
            proxy = AopObjectProxy.GetObject<IEmpInfoFacade>(new EmpInfoFacade());
        }

        public ActionResult Index()
        {
            return View("EmpInfoList");
        }

        public string GetEmpList()
        {
            string clientJsonQuery = System.Web.HttpContext.Current.Request.Params["queryfilter"];//查询条件
            string limit = System.Web.HttpContext.Current.Request.Params["limit"];
            string page = System.Web.HttpContext.Current.Request.Params["page"];
            //string start = System.Web.HttpContext.Current.Request.Params["start"];

            string clientQuery = string.Empty;
            if (!string.IsNullOrEmpty(clientJsonQuery))
            {
                clientQuery = DataConverterHelper.BuildQuery(clientJsonQuery);
            }
                

            int pageSize = 20;
            int.TryParse(limit, out pageSize);
            int pageIndex = 0;
            int.TryParse(page, out pageIndex);

            int totalRecord = 0;
            //DataTable dt = proxy.GetEmpList(clientQuery,pageSize,(pageIndex-1),ref totalRecord);
            DataTable dt = proxy.GetEmpList(clientJsonQuery, pageSize, (pageIndex - 1), ref totalRecord);

            string json = DataConverterHelper.ToJson(dt, totalRecord);

           return json;
        }

        public string Delete()
        {
            string id = System.Web.HttpContext.Current.Request.Form["id"];

            int iret = proxy.Delete(id);

            if (iret > 0)
            {
                return "{status : \"ok\"}";
            }
            else
            {
                return "{status : \"error\"}";
            }

        }

    }
}
