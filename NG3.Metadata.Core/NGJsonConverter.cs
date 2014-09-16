using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace NG3.Metadata.Core
{
    public class NGVersionJsonConverter : JsonConverter
    {

        public override bool CanConvert(Type objectType)
        {
            if (objectType.IsAssignableFrom(typeof(NGVersion)))
                return true;
            return false;
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            try
            {
                NGVersion version = new NGVersion(reader.Value.ToString());
                return version;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            try
            {
                if (value is NGVersion)
                {
                    NGVersion version = value as NGVersion;
                    writer.WriteValue(version.ToString());
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }

    public class StringDicJsonConverter : JsonConverter
    {

        public override bool CanConvert(Type objectType)
        {
            if (objectType.IsAssignableFrom(typeof(IDictionary<string, string>)))
                return true;
            return false;
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            try
            {
                //IDictionary<string,string> dic = MetadataConvert.ConvertStringToDic(reader.Value.ToString());
                IDictionary<string, string> dic = new Dictionary<string, string>();
                dic.Add(NGCultureInfo.CurrentCulture, reader.Value.ToString());
                return dic;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            try
            {
                if (value is IDictionary<string, string>)
                {
                    IDictionary<string, string> dic = value as IDictionary<string, string>;
                    if (dic.ContainsKey(NGCultureInfo.CurrentCulture))
                    {
                        writer.WriteValue(dic[NGCultureInfo.CurrentCulture]);
                    }
                    else
                    {
                        writer.WriteValue(string.Empty);
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }

    public class LanguageInfosJsonConverter : JsonConverter
    {

        public override bool CanConvert(Type objectType)
        {
            if (objectType.IsAssignableFrom(typeof(IList<NGLanguageInfo>)))
                return true;
            return false;
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            try
            {
                IList<NGLanguageInfo> languageInfos =
                    JsonConvert.DeserializeObject<IList<NGLanguageInfo>>(reader.Value.ToString());
                return languageInfos;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            try
            {
                if (value is IList<NGLanguageInfo>)
                {
                    IList<NGLanguageInfo> languageInfos = value as IList<NGLanguageInfo>;
                    string str = JsonConvert.SerializeObject(languageInfos);
                    writer.WriteValue(str);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }

    public class NumberJsonConverter : JsonConverter
    {

        public override bool CanConvert(Type objectType)
        {
            if (objectType.IsAssignableFrom(typeof(int)) || objectType.IsAssignableFrom(typeof(long)) || objectType.IsAssignableFrom(typeof(short)) ||
                objectType.IsAssignableFrom(typeof(float)) || objectType.IsAssignableFrom(typeof(decimal)) || objectType.IsAssignableFrom(typeof(double)))
                return true;
            return false;
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            try
            {
                string value = reader.Value.ToString().Trim();
                if (!string.IsNullOrEmpty(value))
                {
                    if (objectType == typeof(int))
                    {
                        return Convert.ToInt32(value);
                    }
                    else if (objectType == typeof(long))
                    {
                        return Convert.ToInt64(value);
                    }
                    else if (objectType == typeof(short))
                    {
                        return Convert.ToInt16(value);
                    }
                    else if (objectType == typeof(double))
                    {
                        return Convert.ToDouble(value);
                    }
                    else if (objectType == typeof(decimal))
                    {
                        return Convert.ToDecimal(value);
                    }
                }


                return 0;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            try
            {
                writer.WriteValue(value);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
