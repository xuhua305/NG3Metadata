using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using NG3.Metadata.Core;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbColumnInfo:MetadataGod
    {
        private SqlDbType _columnDataType = SqlDbType.UniqueIdentifier;

        private string _columnName = string.Empty;

        private string _defaultValue = string.Empty;

        private int _textLen = 0;

        private int _precision = 0;

        private int _scale = 0;

        private bool _isPrimaryKey = false;

        private bool _isForeignKey = false;

        private string _tableName = string.Empty;

        public SqlDbType ColumnDataType
        {
            get { return _columnDataType; }
            set { _columnDataType = value; }
        }

        public string ColumnName
        {
            get { return _columnName; }
            set { _columnName = value; }
        }

        public int TextLen
        {
            get { return _textLen; }
            set { _textLen = value; }
        }

        public int Precision
        {
            get { return _precision; }
            set { _precision = value; }
        }

        public int Scale
        {
            get { return _scale; }
            set { _scale = value; }
        }

        public bool IsPrimaryKey
        {
            get { return _isPrimaryKey; }
            set { _isPrimaryKey = value; }
        }

        public bool IsForeignKey
        {
            get { return _isForeignKey; }
            set { _isForeignKey = value; }
        }

        public string TableName
        {
            get { return _tableName; }
            set { _tableName = value; }
        }

        public string DefaultValue
        {
            get { return _defaultValue; }
            set { _defaultValue = value; }
        }
    }
}
