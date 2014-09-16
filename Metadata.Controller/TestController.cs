using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Web.UI;
using Metadata.Rule;
using Metadata.Rule.Service;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NG3;
using NG3.Data.Service;
using NG3.Metadata.Core.Service;
using SUP.Common.Base;

namespace Metadata.Controller
{
    //public class TestController : System.Web.Mvc.Controller
    //{
    //    //
    //    // GET: /Designer/

    //    public ActionResult Index()
    //    {
    //        ConnectionInfoService.SetSessionConnectString(
    //            @"ConnectType=SqlClient;Server=192.168.6.134;Database=MySampleDB;User ID=sa;Password=123");
    //        return View();
    //    }

    //    [OutputCache(Location = OutputCacheLocation.None)]
    //    public string GetMasters()
    //    {
    //        try
    //        {
    //            int StartRow = Convert.ToInt32(Request.QueryString["startRow"]);
    //            int Rows = Convert.ToInt32(Request.QueryString["rows"]);

    //            string query = string.Empty;
    //            string queryStr = Request.QueryString["queryStr"];
    //            DbHelper.Open();
    //            if (!string.IsNullOrEmpty(queryStr))
    //            {
    //                JObject jformObject = JObject.Parse(queryStr);

    //                string str = DataConverterHelper.BuildQuery(jformObject["form"]["newRow"]["row"].ToString());
    //            }


    //            int pageIndex = StartRow / Rows - 1;
    //            if (pageIndex < 0)
    //                pageIndex = 0;
    //            int totalRows = 0;
    //            DataTable dt = DataHelp.GetMasters(string.Empty, Rows, pageIndex, ref totalRows);
    //            //IsoDateTimeConverter idtc = new IsoDateTimeConverter();
    //            //idtc.DateTimeFormat = "yyyy-MM-dd";
    //            return DataConverterHelper.ToJson(dt, totalRows);
    //        }
    //        catch (Exception ex)
    //        {

    //            throw;
    //        }
    //        finally
    //        {
    //            DbHelper.Close();
    //        }
    //    }

    //    [ValidateInput(false)]
    //    [OutputCache(Location = OutputCacheLocation.None)]
    //    public string GetMaster(string select)
    //    {
    //        try
    //        {
    //            DataTable dt = null;
    //            //IsoDateTimeConverter idtc = new IsoDateTimeConverter();
    //            //idtc.DateTimeFormat = "yyyy-MM-dd";
    //            JObject jo = dt.Rows[0].ToJObject();

    //            string json = JsonConvert.SerializeObject(jo);
    //            return json;
    //        }
    //        catch (Exception ex)
    //        {

    //            throw;
    //        }
    //    }

    //    [ValidateInput(false)]
    //    [OutputCache(Location = OutputCacheLocation.None)]
    //    public string GetDetails(string id)
    //    {
    //        try
    //        {
    //            DataTable dt = null;
    //            //IsoDateTimeConverter idtc = new IsoDateTimeConverter();
    //            //idtc.DateTimeFormat = "yyyy-MM-dd";

    //            return DataConverterHelper.ToJson(dt, dt.Rows.Count);
    //        }
    //        catch (Exception)
    //        {

    //            throw;
    //        }
    //    }



    //    [ValidateInput(false)]
    //    public void UpdateDetails()
    //    {
    //        try
    //        {
    //            string form = Request.Form["data"];
    //            if (form.Length == 0)
    //                return;
    //            DataTable dt = DataConverterHelper.ToDataTable(form, DataHelp.GetMasterSchemaSql());
    //            DataHelp.UpdateMasters(dt);

    //        }
    //        catch (Exception ex)
    //        {

    //            throw;
    //        }
    //    }

    //    [ValidateInput(false)]
    //    public void HandleEvent()
    //    {
    //        try
    //        {
    //            string eventStr = Request.Form["eventStr"];
    //            IList<EventData> eventDatas = JsonConvert.DeserializeObject<IList<EventData>>(eventStr);
    //            Console.WriteLine(eventStr);

    //        }
    //        catch (Exception)
    //        {

    //            throw;
    //        }
    //    }

    //    [ValidateInput(false)]
    //    public void UpdateMasters()
    //    {
    //        try
    //        {
    //            string form = Request.Form["data"];
    //            if (form.Length == 0)
    //                return;
    //            DataTable dt = DataConverterHelper.ToDataTable(form, DataHelp.GetMasterSchemaSql());
    //            DataHelp.UpdateMasters(dt);

    //        }
    //        catch (Exception ex)
    //        {

    //            throw;
    //        }
    //    }

    //    [ValidateInput(false)]
    //    public void UpdateMastersAndDetails()
    //    {
    //        try
    //        {
    //            //string masterData = Request.Form["masterData"];
    //            //DataTable dtMaster = null;
    //            //if (masterData.Length < 5)
    //            //{
    //            //    dtMaster = new DataTable();
    //            //}
    //            //else
    //            //{
    //            //    dtMaster = DataConverterHelper.ToDataTable(masterData, DataHelp.GetMasterSchemaSql());
    //            //}

    //            //string detailData = Request.Form["detailData"];
    //            //DataTable dtDetail = null;
    //            //if (detailData.Length < 5)
    //            //{
    //            //    dtDetail = new DataTable();
    //            //}
    //            //else
    //            //{
    //            //    dtDetail = DataConverterHelper.ToDataTable(detailData, DataHelp.GetDetailSchemaSql());
    //            //}
    //            //DataHelp.UpdateMastersAndDetails(dtMaster, dtDetail);

    //        }
    //        catch (Exception)
    //        {

    //            throw;
    //        }
    //    }
    //}
}
