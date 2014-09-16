using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
using NG3.Data;
using NG3.Data.Service;
using NG3.Metadata.Core;
using NG3.Metadata.Core.Entity;
using SUP.Common.Base;

namespace NG3.Metadata.Parse
{
    public sealed class EntityParse
    {
        private MetadataForEntity _metadataForEntity = null;
        private string _originalSelectSql = string.Empty;
        private string _originalWhereSql = string.Empty;

        public EntityParse(MetadataForEntity metadataForEntity)
        {
            _metadataForEntity = metadataForEntity;
            Debug.Assert(_metadataForEntity != null);
            ParseOriginalSql();
        }

        private void ParseOriginalSql()
        {
            try
            {
                string[] strArray = _metadataForEntity.Sql.Split(new string[] {" where "},StringSplitOptions.RemoveEmptyEntries);

                Debug.Assert(strArray.Length >= 1);
                _originalSelectSql = strArray[0];
                if (strArray.Length == 2)
                {
                    _originalWhereSql = strArray[1];
                }
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        #region 曝露服务解析

        public string GetEntity()
        {
            return GetEntity(string.Empty);
        }

        public string GetEntity(string columnString)
        {
            try
            {

                string sql = _metadataForEntity.Sql;
                if (!string.IsNullOrEmpty(columnString))
                {
                    StringBuilder sb = new StringBuilder();
                    sb.Append(_originalSelectSql);
                    sb.Append(" where ");
                    DataTable dt = DataConverterHelper.ToDataTable(columnString, _originalSelectSql);
                    if (dt != null && dt.Rows.Count != 0)
                    {
                        foreach (DataColumn dc in dt.Columns)
                        {
                            sb.Append(dc.ColumnName);
                            sb.Append("=");
                            if (dc.DataType == typeof (string))
                            {
                                sb.Append(DbConvert.ToSqlString(dt.Rows[0][dc.ColumnName].ToString()));
                            }
                            else if (dc.DataType == typeof (int) || dc.DataType == typeof (long) ||
                                     dc.DataType == typeof (decimal))
                            {
                                sb.Append(DbConvert.ToSqlNumber(dt.Rows[0][dc.ColumnName].ToString()));
                            }
                            else if (dc.DataType == typeof (DateTime))
                            {
                                sb.Append(DbConvert.ToSqlDateTime(dt.Rows[0][dc.ColumnName].ToString()));
                            }
                            sb.Append(" and ");
                        }
                    }
                    if (string.IsNullOrEmpty(_originalWhereSql))
                    {
                        sb.Append("1=1");
                    }
                    else
                    {
                        sb.Append(_originalWhereSql);
                    }

                    sql = sb.ToString();
                }

                DbHelper.Open();
                DataTable dtRet = DbHelper.GetDataTable(sql);
                return DataConverterHelper.ToJson(dtRet, dtRet.Rows.Count);

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

        public void UpdateEntity(string dataString)
        {
            try
            {
                Debug.Assert(!string.IsNullOrEmpty(dataString));
                DataTable dt = DataConverterHelper.ToDataTable(dataString, _originalSelectSql);
                DbHelper.Open();

                DbHelper.BeginTran();

                DbHelper.Update(dt, _originalSelectSql);

                DbHelper.CommitTran();
            }
            catch (Exception ex)
            {
                DbHelper.RollbackTran();
                throw;
            }
            finally
            {
                DbHelper.Close();
            }
        }

        #endregion 
    }
}
