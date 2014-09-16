using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using ExtJsSytemDemo.MyData;
using Newtonsoft.Json.Linq;
using NG3.Data.Service;
using SUP.Common.Base;

namespace ExtJsSytemDemo.Controllers
{
    public class TestController : Controller
    {
        public string GetMasterList()
        {
            try
            {
                int StartRow = Convert.ToInt32(Request.QueryString["startRow"]);
                int Rows = Convert.ToInt32(Request.QueryString["rows"]);
                string queryStr = Request.QueryString["queryStr"];
                DbHelper.Open();
                if (!string.IsNullOrEmpty(queryStr))
                {
                    JObject jformObject = JObject.Parse(queryStr);
                    string str = DataConverterHelper.BuildQuery(jformObject["form"]["newRow"]["row"].ToString());
                }


                int pageIndex = StartRow / Rows - 1;
                if (pageIndex < 0)
                    pageIndex = 0;
                int totalRows = 0;
                DataTable dt = DataHelp.GetMasters(string.Empty, Rows, pageIndex, ref totalRows);
                //IsoDateTimeConverter idtc = new IsoDateTimeConverter();
                //idtc.DateTimeFormat = "yyyy-MM-dd";
                return DataConverterHelper.ToJson(dt, totalRows);
            }
            catch (Exception ex)
            {

                throw;
            }
            finally
            {
                DbHelper.Close();
            }
        }

        public string GetDetailList(string id)
        {
            return string.Empty;
        }

        public string GetDetai1lList(string id)
        {
            return string.Empty;
        }

        public void UpdateMasterAndDetails()
        {
            
        }


    }
}
