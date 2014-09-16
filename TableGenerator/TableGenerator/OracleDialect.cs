using System;
using System.Collections.Generic;
using System.Text;

namespace TableGenerator
{
    public class OracleDialect : Dialect
    {
        public OracleDialect()
        { 
            
        }

        public override string GetCheckTableSql(System.Data.DataTable dt)
        {
            string sql = "select count(1) from tabs where table_name='{0}'";
            return string.Format(sql, dt.TableName);
        }

        protected override void InitDialectTypes()
        {
            _dbTypes[typeof(System.Boolean)] = "NUMBER(1)";
            _dbTypes[typeof(System.Byte)] = "NUMBER(1)";
            _dbTypes[typeof(System.Byte[])] = "BOLB";
            _dbTypes[typeof(System.Char)] = "VARCHAR2(1)";
            _dbTypes[typeof(System.DateTime)] = "DATE";
            _dbTypes[typeof(System.DateTimeOffset)] = "NUMBER";
            _dbTypes[typeof(System.Decimal)] = "NUMBER";
            _dbTypes[typeof(System.Double)] = "NUMBER(16, 15)";
            _dbTypes[typeof(System.Guid)] = "VARCHAR2(36)";
            _dbTypes[typeof(System.Int16)] = "NUMBER(2, 0)";
            _dbTypes[typeof(System.Int32)] = "NUMBER(4, 0)";
            _dbTypes[typeof(System.Int64)] = "NUMBER(8, 0)";
            _dbTypes[typeof(System.Object)] = string.Empty;
            _dbTypes[typeof(System.SByte)] = "NUMBER(1)";
            _dbTypes[typeof(System.Single)] = "NUMBER(8, 7)";
            _dbTypes[typeof(System.String)] = "VARCHAR2({0})";
            _dbTypes[typeof(System.TimeSpan)] = string.Empty;
            _dbTypes[typeof(System.UInt16)] = "NUMBER(2, 0)";
            _dbTypes[typeof(System.UInt32)] = "NUMBER(4, 0)";
            _dbTypes[typeof(System.UInt64)] = "NUMBER(8, 0)";
        }

        public override string ParseFieldName(string fieldname)
        {
            return "\"" + fieldname + "\"";
        }
    }
}
