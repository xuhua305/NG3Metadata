
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using NG3.Data;
using NG3.Data.Service;
using SUP.Common.Base;

namespace ExtJsSytemDemo.MyData
{
    /// <summary>
    /// 数据帮助类
    /// </summary>
    public static class DataHelp
    {
        static DataHelp()
        {
            
        }

        public static string GetMasterSchemaSql()
        {
            return "select * from Emp";
        }

        public static string GetDetailSchemaSql()
        {
            return "select * from EmpDetail";
        }

        public static string GetDetail1SchemaSql()
        {
            return "select * from EmpDetail1";
        }

        public static DataTable GetMasters(string select,int pageSize, int PageIndex, ref int totalRecord)
        {
            try
            {
                DbHelper.Open();
                string sql = GetMasterSchemaSql();

                if (!string.IsNullOrEmpty(select))
                {
                    string query = string.Empty;
                    IDataParameter[] p = DataConverterHelper.BuildQueryWithParam(select, string.Empty,ref query);

                    if (!string.IsNullOrEmpty(query))
                    {
                        sql += " where " + query;
                    }

                    string sqlstr = PaginationAdapter.GetPageDataSql(sql, pageSize, ref PageIndex, ref totalRecord, string.Empty, p);
                    return DbHelper.GetDataTable(sql, p);
                }
                else
                {
                    string sqlstr = PaginationAdapter.GetPageDataSql(sql, pageSize, ref PageIndex, ref totalRecord, string.Empty);
                    return DbHelper.GetDataTable(sql);
                }

                DataTable dt = DbHelper.GetDataTable("select * from Emp");
                return dt;

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

        public static DataTable GetDetail(string Id, int pageSize, int PageIndex, ref int totalRecord)
        {
            try
            {
                //DbHelper.Open();
                //string sql = GetDetailSchemaSql();

                //if (!string.IsNullOrEmpty(select))
                //{
                //    string query = string.Empty;
                //    IDataParameter[] p = DataConverterHelper.BuildQueryWithParam(select, string.Empty, ref query);

                //    if (!string.IsNullOrEmpty(query))
                //    {
                //        sql += " where id=" + NGDBConvert.;
                //    }

                //    string sqlstr = PaginationAdapter.GetPageDataSql(sql, pageSize, ref PageIndex, ref totalRecord, string.Empty, p);
                //    return DbHelper.GetDataTable(sql, p);
                //}
                //else
                //{
                //    string sqlstr = PaginationAdapter.GetPageDataSql(sql, pageSize, ref PageIndex, ref totalRecord, string.Empty);
                //    return DbHelper.GetDataTable(sql);
                //}
                return null;
            }
            catch (Exception ex)
            {

                throw;
            }
            finally
            {
                //DbHelper.Close();
            }
        }

        public static DataTable GetDetail1(string Id, int pageSize, int PageIndex, ref int totalRecord)
        {
            try
            {
                //DbHelper.Open();
                //string sql = GetDetailSchemaSql();

                //if (!string.IsNullOrEmpty(select))
                //{
                //    string query = string.Empty;
                //    IDataParameter[] p = DataConverterHelper.BuildQueryWithParam(select, string.Empty, ref query);

                //    if (!string.IsNullOrEmpty(query))
                //    {
                //        sql += " where " + query;
                //    }

                //    string sqlstr = PaginationAdapter.GetPageDataSql(sql, pageSize, ref PageIndex, ref totalRecord, string.Empty, p);
                //    return DbHelper.GetDataTable(sql, p);
                //}
                //else
                //{
                //    string sqlstr = PaginationAdapter.GetPageDataSql(sql, pageSize, ref PageIndex, ref totalRecord, string.Empty);
                //    return DbHelper.GetDataTable(sql);
                //}

                return null;

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

        public static void UpdateMastersAndDetails(DataTable dtMaster,DataTable dtDetail,DataTable dtDetail1)
        {
            try
            {
                DbHelper.Open();
                DbHelper.BeginTran();
                if(dtMaster != null && dtMaster.Rows.Count != 0)
                    DbHelper.Update(dtMaster, GetMasterSchemaSql());
                if (dtDetail != null && dtDetail.Rows.Count != 0)
                {
                    DbHelper.Update(dtDetail, GetDetailSchemaSql());
                }
                if (dtDetail1 != null && dtDetail1.Rows.Count != 0)
                {
                    DbHelper.Update(dtDetail1, GetDetail1SchemaSql());
                }
                DbHelper.CommitTran();

            }
            catch (Exception)
            {
                DbHelper.RollbackTran();
                throw;
            }
            finally
            {
                DbHelper.Close();
            }
        }
    }
}