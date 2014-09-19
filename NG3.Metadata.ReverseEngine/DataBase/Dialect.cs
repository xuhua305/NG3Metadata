using System;
using System.Collections.Generic;
using System.Text;
using System.Data;

namespace NG3.Metadata.ReverseEngine.DataBase
{
    public abstract class Dialect
    {
        protected Dictionary<Type, string> _dbTypes = new Dictionary<Type, string>();

        public Dictionary<Type, string> DbTypes
        {
            get { return _dbTypes; }
        }

        public Dialect()
        {
            LoadDBTypes();
            InitDialectTypes();
        }

        private void LoadDBTypes()
        {
            _dbTypes.Add(typeof(System.Boolean), string.Empty);
            _dbTypes.Add(typeof(System.Byte), string.Empty);
            _dbTypes.Add(typeof(System.Byte[]), string.Empty);
            _dbTypes.Add(typeof(System.Char), string.Empty);
            _dbTypes.Add(typeof(System.DateTime), string.Empty);
            _dbTypes.Add(typeof(System.DateTimeOffset), string.Empty);
            _dbTypes.Add(typeof(System.Decimal), string.Empty);
            _dbTypes.Add(typeof(System.Double), string.Empty);
            _dbTypes.Add(typeof(System.Guid), string.Empty);
            _dbTypes.Add(typeof(System.Int16), string.Empty);
            _dbTypes.Add(typeof(System.Int32), string.Empty);
            _dbTypes.Add(typeof(System.Int64), string.Empty);
            _dbTypes.Add(typeof(System.Object), string.Empty);
            _dbTypes.Add(typeof(System.SByte), string.Empty);
            _dbTypes.Add(typeof(System.Single), string.Empty);
            _dbTypes.Add(typeof(System.String), string.Empty);
            _dbTypes.Add(typeof(System.TimeSpan), string.Empty);
            _dbTypes.Add(typeof(System.UInt16), string.Empty);
            _dbTypes.Add(typeof(System.UInt32), string.Empty);
            _dbTypes.Add(typeof(System.UInt64), string.Empty);
        }

        public abstract string GetCheckTableSql(DataTable dt);

        protected abstract void InitDialectTypes();

        public string this[Type type] 
        {
            get
            {
                if (_dbTypes.ContainsKey(type))
                {
                    return _dbTypes[type];
                }
                return string.Empty;
            }
        }

        public virtual string ParseFieldName(string fieldname)
        {
            return fieldname;
        }
        
    }
}
