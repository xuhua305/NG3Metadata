using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NG.Data.DB;

namespace TableGenerator
{
    public class TableExporter : NGDbCommon
    {
        private Dialect _dialect = null;

        public TableExporter(string constr)
        {
            //if sqlserver
            _dialect = new SqlServerDialect();
            this.ConnectString = constr;
        }

        public bool ExportTable(DataSet ds)
        {
            if (ds != null)
            {
                foreach (DataTable dt in ds.Tables)
                {
                    ExportTable(dt);
                }
            }
            return true;
        }

        public bool ExportTable(DataTable dt)
        {
            if (CreateTable(dt))
            {
                UpdateColumns(dt);
            }
            return true;
        }

        public bool CreateTable(DataTable dt)
        {
            if (CheckTableExist(dt)) return true;
            string createsql = GetCreateSql(dt);
            try
            {
                bool result = this.Sqlca.ExecuteNonQuery(createsql);
                return result;
            }
            catch (Exception ex)
            {
                Logger.Log(ex.Message);
            }
            return false;
        }       

        public bool UpdateColumns(DataTable dt)
        {
            DataTable schemaDt = GetSchemaDataTableFromDb(dt);
            foreach (DataColumn dc in dt.Columns)
            {
                if (!schemaDt.Columns.Contains(dc.ColumnName))
                {
                    string schema = "alter table {0} add " + GetOneColumnSchema(dc, null, false);
                    schema = string.Format(schema, dt.TableName);
                    this.Sqlca.ExecuteNonQuery(schema);
                }
            }
            return true;
        }

        private DataTable GetSchemaDataTableFromDb(DataTable dt)
        {
            try
            {
                string sql = "select * from " + dt.TableName + " where 1!=1";//仅仅获取数据表结构
                DataTable schemaDt = this.Sqlca.GetDataTable(sql);
                return schemaDt;
            }
            catch (Exception ex)
            {
                Logger.Log(ex.Message);
                return null;
            }
        }

        private string GetCreateSql(DataTable dt)
        {
            StringBuilder createSql = new StringBuilder();
            createSql.Append("create table " + dt.TableName + "(");
            foreach (DataColumn dc in dt.Columns)
            {
                createSql.Append(GetOneColumnSchema(dc, dt.PrimaryKey, true) + ",");
            }
            createSql[createSql.Length - 1] = ' ';
            createSql.Append("CONSTRAINT [PK_{0}] PRIMARY KEY ({1}))");

            return string.Format(createSql.ToString(), dt.TableName, GetPrimaryKeyString(dt.PrimaryKey));
        }

        private string GetPrimaryKeyString(DataColumn[] dcPrimaryKey)
        {
            string primarykey = string.Empty;
            foreach (DataColumn dc in dcPrimaryKey)
            {
                primarykey += dc.ColumnName + ",";
            }
            primarykey = primarykey.Remove(primarykey.Length - 1, 1);
            return primarykey;
        }

        private bool CheckTableExist(DataTable dt)
        {
            string checksql = _dialect.GetCheckTableSql(dt); 
            bool isTableExist = false;
            try
            {
                object obj = this.Sqlca.ExecuteScalar(checksql);
                if (obj != null && obj != DBNull.Value)
                {
                    isTableExist = (obj.ToString() == "1");
                }
            }
            catch (Exception ex)
            {
                Logger.Log(ex.Message);
            }
            return isTableExist;
        }

        private string GetOneColumnSchema(DataColumn dc, DataColumn[] primaryKey, bool isAdd)
        {
            string cname = dc.ColumnName;
            if (isAdd)
            {
                cname = _dialect.ParseFieldName(cname);
            }
            string dialectdbtype = string.Format(_dialect[dc.DataType], dc.MaxLength);//varchar设置长度
            bool isPrimaryKey = CheckIsPrimaryKey(dc, primaryKey);
            string allownull = isAdd ? ((dc.AllowDBNull && !isPrimaryKey) ? "NULL" : "NOT NULL") : string.Empty;
            string schema = cname + " " + dialectdbtype + " " + allownull;
            //if (CheckIsPrimaryKey(dc, primaryKey))
            //{
            //    schema += " primary key";
            //}
            return schema;
        }

        private bool CheckIsPrimaryKey(DataColumn dc, DataColumn[] primaryKey)
        {
            if (primaryKey != null)
            {
                foreach (DataColumn dcTemp in primaryKey)
                {
                    if (dc.ColumnName.Equals(dcTemp.ColumnName, StringComparison.CurrentCultureIgnoreCase))
                    {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
