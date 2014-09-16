using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace HR.Controllers
{
    public class StudentInfoController : Controller
    {
        //
        // GET: /StudentInfo/

        public ActionResult Index()
        {
            return View(); 
        }


        public string GetList()
        {
           Uri url =  this.HttpContext.Request.Url;

           //string data = "{total:200,items:[{id:'01',name:'韦忠吉',sex:'0',age:30,email:'weizhongji2001@163.com'},"
           //                                         + "{id:'02',name:'沈文文',sex:'0',age:24,email:'shenww@gmail.com'},"
           //                                         + "{id:'03',name:'徐天宇',sex:'0',age:23,email:'xutianyu@hotmail.com'}]}";

           DataTable dt = this.GetData();

           string str = JsonConvert.SerializeObject(dt);

           string data = "{total: " + dt.Rows.Count.ToString() +", items: "+ str + "}";

           return data;

            #region

            //IList<Student> list = new List<Student>();
            //Student wei = new Student();
            //wei.name = "韦忠吉";
            //wei.age = 30;
            //wei.email = "weizhongji2001@163.com";

            //list.Add(wei);

            //JsonResult ret = Json(list, JsonRequestBehavior.AllowGet);
            //return ret;

            #endregion           
           
        }


        public ActionResult StudentInfoDetail()
        {
            return View();
        }
        
        public string  Save()
        {
           string str = System.Web.HttpContext.Current.Request.Form["data"];

           string temp = HttpUtility.HtmlDecode(str);

           return "{status : \"ok\"}";
        }

        public DataTable GetData()
        {
            
            DataTable dt = new DataTable();

            DataColumn col = new DataColumn("id", typeof(string));
            dt.Columns.Add(col);

            col = new DataColumn("name", typeof(string));
            dt.Columns.Add(col);

            col = new DataColumn("sex", typeof(string));
            dt.Columns.Add(col);

            col = new DataColumn("age", typeof(Int32));
            dt.Columns.Add(col);

            col = new DataColumn("birthday", typeof(string));
            dt.Columns.Add(col);

            col = new DataColumn("province", typeof(string));
            dt.Columns.Add(col);

            col = new DataColumn("email", typeof(string));
            dt.Columns.Add(col);        


            for (int i = 0; i < 1; i++)
            {
                DataRow dr = dt.NewRow();

                dr["id"] = i.ToString();
                dr["name"] = "张三";
                dr["sex"] = "0";
                dr["age"] = 31;
                dr["province"] = "110";
                dr["birthday"] = DateTime.Now.ToString("yyyy-MM-dd");
                dr["email"] = "zhangsan@gmail.com";

                dt.Rows.Add(dr);
            }

            return dt;

        }
    }

    [Serializable]
    public class Student
    {
        public virtual string name { get; set;}

        public virtual int age { get; set; }

        public virtual string email { get; set; }


    }
}