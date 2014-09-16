using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

using NG3.Data;
using NG3.Data.Service;
using SUP.Common.Base;

namespace HR.Employee.DataAccess
{
    public class EmpInfoDac
    {

        public DataTable GetEmpList(string clientJson,int pageSize, int PageIndex, ref int totalRecord)
        {
            //string sql = "select * from hr_employee ";

            //if (!string.IsNullOrEmpty(where))
            //{
            //    sql += " where " + where;
            //}
            //string sortField = " id asc ";

            //string sqlstr = PaginationAdapter.GetPageDataSql(sql, pageSize, ref PageIndex, ref totalRecord, sortField);
            //return DbHelper.GetDataTable(sqlstr);


            //string sql = "select * from hr_employee where name like '%' + {0} +'%' ";
            //string sortField = " id asc ";

            //IDataParameter[] p = new NGDataParameter[1];
            //p[0] = new NGDataParameter("name", DbType.AnsiString);
            //p[0].Value = "ee";

            //string sqlstr = PaginationAdapter.GetPageDataSql(sql, pageSize, ref PageIndex, ref totalRecord, sortField, p);
            //return DbHelper.GetDataTable(sql, p);


            string sql = "select * from hr_employee ";         
            string sortField = " id asc ";

            if (!string.IsNullOrEmpty(clientJson))
            {
                string query = string.Empty;
                IDataParameter[] p = DataConverterHelper.BuildQueryWithParam(clientJson, ref query);

                if (!string.IsNullOrEmpty(query))
                {
                    sql += " where " + query;
                }

                string sqlstr = PaginationAdapter.GetPageDataSql(sql, pageSize, ref PageIndex, ref totalRecord, sortField, p);
                return DbHelper.GetDataTable(sql, p);
            }
            else
            {
                string sqlstr = PaginationAdapter.GetPageDataSql(sql, pageSize, ref PageIndex, ref totalRecord, sortField);
                return DbHelper.GetDataTable(sql);
            }
            
        }


        public int Save(DataTable masterdt, DataTable detaildt)
        {
            string masterid = string.Empty;

            //处理主表的主键
            foreach (DataRow dr in masterdt.Rows)
            {
                if (dr.RowState == DataRowState.Deleted) continue;

                if (dr.RowState == DataRowState.Added)
                {
                    masterid = Guid.NewGuid().ToString();//主表的主键
                    dr["id"] = masterid;
                }
                else
                {
                    masterid = dr["id"].ToString();
                }
            }

            //处理明细表
            foreach (DataRow dr in detaildt.Rows)
            {
                if (dr.RowState == DataRowState.Added)
                {
                    dr["id"] = Guid.NewGuid().ToString();
                    dr["mainid"] = masterid; //主表的主键                 
                }
            }

            int m = DbHelper.Update(masterdt, "select * from hr_employee");
            int d = DbHelper.Update(detaildt, "select * from hr_emp_positoninfo");

            return m;
        }


        public DataTable GetMasterInfo(string id)
        {
            //string sql = "select * from hr_employee where id='"+ id +"'";
            //return DbHelper.GetDataTable(sql);


            string sql = "select * from hr_employee where id={0}";
            IDataParameter[] p = new NGDataParameter[1];
            p[0] = new NGDataParameter("id", DbType.AnsiString);
            p[0].Value = id;

            return DbHelper.GetDataTable(sql, p);

        }

        public DataTable GetDetailInfo(string mainid)
        {
            string sql = "select * from hr_emp_positoninfo where mainid='"+ mainid +"'";

            return DbHelper.GetDataTable(sql);
        }


        public int Delete(string id)
        {
            string sql = "delete from hr_employee where id='" + id + "'";

            int iret = DbHelper.ExecuteNonQuery(sql);

            sql = "delete from hr_emp_positoninfo where mainid='" + id + "'";

            iret += DbHelper.ExecuteNonQuery(sql);

            return iret;
        }

    }
}
