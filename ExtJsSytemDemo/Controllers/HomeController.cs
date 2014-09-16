using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using ExtJsSytemDemo.MyData;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NG3;
using NG3.Data.Service;
using SUP.Common.Base;


namespace ExtJsSytemDemo.Controllers
{

    public class EventData
    {
        public string EventName { get; set; }

        public string ComponentName { get; set; }
    }


    public class HomeController : Controller
    {

        private const string oracleuserstr = "ConnectType=OracleClient;Data Source={0};User ID={1};Password={2};;persist security info=false";
        private const string sqluserstr = "ConnectType=SqlClient;Server={0};Database={1};User ID={2};Password={3}";


        private void InitialDb()
        {
            //string conn = string.Format(sqluserstr, "127.0.0.1", "NG0001", "sa", "123");

            string conn  = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();

            ConnectionInfoService.SetSessionConnectString(conn);
        }

        public ActionResult Index()
        {
            InitialDb();//初始化dbhelper

            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();           
        }
               

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View("Login");
        }

        public string Check()
        {
            Uri url = this.HttpContext.Request.Url;

            return "{ success: true}";            
        }

        public JsonResult LoadTree()
        {

            IList<TreeJSON> rootlist = new List<TreeJSON>();

            IList<TreeJSON> list = new List<TreeJSON>();

            TreeJSON root = new TreeJSON();
            root.id = "root";
            root.cls = "folder";
            root.text = "ExtJS 4.x";
            root.expanded = true;
            // root.@checked = false;
            root.children = list;

            TreeJSON firstchild = new TreeJSON();
            firstchild.id = "first";
            firstchild.cls = "file";
            firstchild.text = "Grid";
            firstchild.leaf = true;
            firstchild.hrefTarget = "../StudentInfo";
            // firstchild.@checked = false;

            TreeJSON secchild = new TreeJSON();
            secchild.id = "secchild";
            secchild.cls = "file";
            secchild.text = "Form";
            secchild.leaf = true;
            secchild.hrefTarget = "../StudentInfo/StudentInfoDetail";
            // secchild.@checked = false;

            TreeJSON thirdchild = new TreeJSON();
            thirdchild.id = "third";
            thirdchild.cls = "file";
            thirdchild.text = "Combox";
            thirdchild.leaf = true;
            thirdchild.hrefTarget = "../Help";

            TreeJSON fourchild = new TreeJSON();
            fourchild.id = "four";
            fourchild.cls = "file";
            fourchild.text = "员工信息列表";
            fourchild.leaf = true;
            fourchild.hrefTarget = "../HR/EmpInfoList";

            root.children.Add(fourchild);
            root.children.Add(thirdchild);
            root.children.Add(secchild);
            root.children.Add(firstchild);


            rootlist.Add(root);

            JsonResult jsons = this.Json(rootlist, JsonRequestBehavior.AllowGet);
            return jsons;

        }

        [OutputCache(Location = OutputCacheLocation.None)]
        public string GetMasters()
        {
            try
            {
                int StartRow = Convert.ToInt32(Request.QueryString["startRow"]);
                int Rows = Convert.ToInt32(Request.QueryString["rows"]);

                string query = string.Empty;
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

        [ValidateInput(false)]
        [OutputCache(Location = OutputCacheLocation.None)]
        public string GetMaster(string select)
        {
            try
            {
                //DataTable dt = null;
                ////IsoDateTimeConverter idtc = new IsoDateTimeConverter();
                ////idtc.DateTimeFormat = "yyyy-MM-dd";
                //JObject jo = dt.Rows[0].ToJObject();

                //string json = JsonConvert.SerializeObject(jo);
                //return json;

                return string.Empty;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [ValidateInput(false)]
        [OutputCache(Location = OutputCacheLocation.None)]
        public string GetDetails(string id)
        {
            try
            {
                DataTable dt = null;
                //IsoDateTimeConverter idtc = new IsoDateTimeConverter();
                //idtc.DateTimeFormat = "yyyy-MM-dd";

                return DataConverterHelper.ToJson(dt, dt.Rows.Count);
            }
            catch (Exception)
            {

                throw;
            }
        }



        [ValidateInput(false)]
        public void UpdateDetails()
        {
            try
            {
                //string form = Request.Form["data"];
                //if (form.Length == 0)
                //    return;
                //DataTable dt = DataConverterHelper.ToDataTable(form, DataHelp.GetMasterSchemaSql());
                //DataHelp.UpdateMasters(dt);

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [ValidateInput(false)]
        public void HandleEvent()
        {
            try
            {
                string eventStr = Request.Form["eventStr"];
                IList<EventData> eventDatas = JsonConvert.DeserializeObject<IList<EventData>>(eventStr);
                Console.WriteLine(eventStr);

            }
            catch (Exception)
            {

                throw;
            }
        }

        [ValidateInput(false)]
        public void UpdateMasters()
        {
            try
            {
                string form = Request.Form["data"];
                if (form.Length == 0)
                    return;
                DataTable dt = DataConverterHelper.ToDataTable(form, DataHelp.GetMasterSchemaSql());
                //DataHelp.UpdateMasters(dt);

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [ValidateInput(false)]
        public void UpdateMastersAndDetails()
        {
            try
            {
                //string masterData = Request.Form["masterData"];
                //DataTable dtMaster = null;
                //if (masterData.Length < 5)
                //{
                //    dtMaster = new DataTable();
                //}
                //else
                //{
                //    dtMaster = DataConverterHelper.ToDataTable(masterData, DataHelp.GetMasterSchemaSql());
                //}

                //string detailData = Request.Form["detailData"];
                //DataTable dtDetail = null;
                //if (detailData.Length < 5)
                //{
                //    dtDetail = new DataTable();
                //}
                //else
                //{
                //    dtDetail = DataConverterHelper.ToDataTable(detailData, DataHelp.GetDetailSchemaSql());
                //}
                //DataHelp.UpdateMastersAndDetails(dtMaster, dtDetail);

            }
            catch (Exception)
            {

                throw;
            }
        }
    

    }
}
