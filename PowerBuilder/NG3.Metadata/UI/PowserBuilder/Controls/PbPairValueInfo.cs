using NG3.Metadata.Core;

namespace NG3.Metadata.UI.PowserBuilder.Controls
{
    public class PbPairValueInfo:MetadataGod
    {
        private string _displayValue = string.Empty;

        private string _saveValue = string.Empty;

        public PbPairValueInfo(string displayValue, string saveValue)
        {
            _displayValue = displayValue;
            _saveValue = saveValue;
        }

        public string DisplayValue
        {
            get { return _displayValue; }
            set { _displayValue = value; }
        }

        public string SaveValue
        {
            get { return _saveValue; }
            set { _saveValue = value; }
        }
    }
}