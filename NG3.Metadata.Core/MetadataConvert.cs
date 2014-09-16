using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using NG3.Metadata.Core.Entity;
using NG3.Metadata.Core.Service;

namespace NG3.Metadata.Core
{
    /// <summary>
    /// 元数据转换
    /// </summary>
    public sealed class MetadataConvert
    {
        private const string DicSplitStr = "@@**";
        private const string DicSplitChildStr = "@*";

        public static string ConvertDicToString(IDictionary<string,string> dic)
        {
            try
            {
                if (dic == null)
                    return string.Empty;
                StringBuilder sb = new StringBuilder();
                foreach (var value in dic)
                {
                    sb.Append(value.Key);
                    sb.Append("=");
                    sb.Append(value.Value);
                    sb.Append(DicSplitStr);
                }
                return sb.ToString();
            }
            catch (Exception ex)
            {
                
                throw;
            }
        }

        public static IDictionary<string, string> ConvertStringToDic(string inputStr)
        {
            try
            {
                IDictionary<string,string> dictionary = new Dictionary<string, string>();
                string[] strArray = inputStr.Split(new string[] { DicSplitStr }, StringSplitOptions.RemoveEmptyEntries);
                foreach (var str in strArray)
                {
                    string[] childArray = str.Split(':');
                    if (childArray.Length == 2)
                    {
                        dictionary.Add(childArray[0],childArray[1]);
                    }
                }
                return dictionary;
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        public static string ConvertDicContentToString(IList<DictionaryContent> dictionaryContents)
        {
            try
            {
                if (dictionaryContents == null)
                    return string.Empty;
                StringBuilder sb = new StringBuilder();
                foreach (var dictionaryContent in dictionaryContents)
                {
                    sb.Append(dictionaryContent.Id);
                    sb.Append(DicSplitChildStr);
                    sb.Append(dictionaryContent.ContentItem);
                    sb.Append(DicSplitChildStr);
                    sb.Append(dictionaryContent.Description);
                    sb.Append(DicSplitStr);
                }

                return sb.ToString();
            }
            catch (Exception ex)
            {
                
                throw;
            }
        }

        public static IList<DictionaryContent> ConvertStringToDicContent(string inputStr)
        {
            try
            {
                IList<DictionaryContent> dictionaryContents = new List<DictionaryContent>(); 
                string[] strArray = inputStr.Split(new string[] { DicSplitStr }, StringSplitOptions.RemoveEmptyEntries);
                foreach (var str in strArray)
                {
                    string[] childArray = str.Split(new string[]{DicSplitChildStr},StringSplitOptions.None);
                    if (childArray.Length == 3)
                    {
                        DictionaryContent dictionaryContent = new DictionaryContent();
                        dictionaryContent.Id = childArray[0];
                        dictionaryContent.ContentItem = childArray[1];
                        dictionaryContent.Description = childArray[2];
                    }
                }
                return dictionaryContents;
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        public static object ConvertStirngParamToObj(string value,DataType dataType)
        {
            try
            {
                object obj = null;
                    switch (dataType)
                    {
                        case DataType.String:
                            obj = value;
                            break;
                        case DataType.Bool:
                            obj = (value.Length == 0 ? false : Convert.ToBoolean(value));
                            break;
                        case DataType.Char:
                            obj = Convert.ToChar(value);
                            break;
                        case DataType.DateTime:
                            obj = (value.Length == 0 ? DateTime.MinValue : Convert.ToDateTime(value));
                            break;
                        case DataType.Int:
                            obj = (value.Length == 0 ? 0 : Convert.ToInt32(value));
                            break;
                        case DataType.Long:
                            obj = (value.Length == 0 ? 0 : Convert.ToInt64(value));
                            break;
                        case DataType.Byte:
                            obj = (value.Length == 0 ? 0 : Convert.ToByte(value));
                            break;
                        case DataType.Decimal:
                            obj = (value.Length == 0 ? 0 : Convert.ToDecimal(value));
                            break;
                        default:
                            break;
                    }

                return obj;

            }
            catch (Exception)
            {
                
                throw;
            }
        }

        public static string ConvertNamespaceToRalativePath(string metadataNamespace)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                string[] pathArray = metadataNamespace.Split(new string[]{"."},StringSplitOptions.RemoveEmptyEntries);
                foreach (string path in pathArray)
                {
                    sb.Append(path);
                    sb.Append(Path.DirectorySeparatorChar);
                }
                return sb.ToString();

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
