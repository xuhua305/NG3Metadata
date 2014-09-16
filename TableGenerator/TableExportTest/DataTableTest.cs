using System;
using System.Collections.Generic;
using System.Text;
using TableGenerator;
using System.Data;

namespace TableExportTest
{
    public class DataTableTest
    {
        static void Main()
        {
            ExportTable();
        }

        /// <summary>
        /// 导入table
        /// </summary>
        public static void ExportTable()
        {
            //连接串
            string constr = "Data Source=.;Initial Catalog=NHTEST;Integrated Security=True;Pooling=False";
            TableExporter exporter = new TableExporter(constr);
            DataTable dt = new DataTable();
            dt.TableName = "testtb";
            DataColumn dcid = new DataColumn("id", typeof(string));
            dcid.MaxLength = 32;
            DataColumn dcname = new DataColumn("name", typeof(string));
            dcname.MaxLength = 16;
            DataColumn dcimage = new DataColumn("obj", typeof(System.Byte[]));
            dcname.MaxLength = 16;
            DataColumn dcname2 = new DataColumn("name2", typeof(Decimal));
            dt.Columns.Add(dcid);
            dt.Columns.Add(dcname);
            dt.Columns.Add(dcimage);
            dt.Columns.Add(dcname2);
            dt.PrimaryKey = new DataColumn[] { dcid, dcname2 }; //设置主键列，只能初始化时设置，目前无法修改

            exporter.ExportTable(dt);
        }
    }
}
