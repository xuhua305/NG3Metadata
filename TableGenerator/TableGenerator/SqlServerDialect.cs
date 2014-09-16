using System;
using System.Collections.Generic;
using System.Text;

namespace TableGenerator
{
    public class SqlServerDialect : Dialect
    {
        public SqlServerDialect()
        { 
            
        }

        public override string GetCheckTableSql(System.Data.DataTable dt)
        {
            string sql = "select count(1) from sysobjects where xtype='U' and name='{0}'";
            return string.Format(sql, dt.TableName);
        }

        protected override void InitDialectTypes()
        {
            _dbTypes[typeof(System.Boolean)] = "bit";
            _dbTypes[typeof(System.Byte)] = "bit";
            _dbTypes[typeof(System.Byte[])] = "image";
            _dbTypes[typeof(System.Char)] = "varchar(1)";
            _dbTypes[typeof(System.DateTime)] = "datetime";
            _dbTypes[typeof(System.DateTimeOffset)] = "int";
            _dbTypes[typeof(System.Decimal)] = "decimal";
            _dbTypes[typeof(System.Double)] = "decimal(16, 15)";
            _dbTypes[typeof(System.Guid)] = "varchar(36)";
            _dbTypes[typeof(System.Int16)] = "decimal(2, 0)";
            _dbTypes[typeof(System.Int32)] = "decimal(4, 0)";
            _dbTypes[typeof(System.Int64)] = "decimal(8, 0)";
            _dbTypes[typeof(System.Object)] = string.Empty;
            _dbTypes[typeof(System.SByte)] = "bit";
            _dbTypes[typeof(System.Single)] = "float";
            _dbTypes[typeof(System.String)] = "varchar({0})";
            _dbTypes[typeof(System.TimeSpan)] = string.Empty;
            _dbTypes[typeof(System.UInt16)] = "decimal(2, 0)";
            _dbTypes[typeof(System.UInt32)] = "decimal(4, 0)";
            _dbTypes[typeof(System.UInt64)] = "decimal(8, 0)";
        }
    }
}
