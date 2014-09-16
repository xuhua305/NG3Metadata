using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Runtime.Serialization.Formatters.Soap;
using System.Text;
using System.Xml.Serialization;

namespace NG3.Metadata.Core
{
    /// <summary>
    /// 序列化类型
    /// </summary>
    public enum SerializationType
    {
        Binary,
        Soap,
        Xml,
    }

    /// <summary>
    /// NG的序列化基础帮助类
    /// </summary>
    [Serializable]
    public sealed class SerializationHelp
    {
        #region private method

        private static Stream ObjSerialize(SerializationType serializationType, object obj, Stream stream)
        {
            try
            {
                XmlSerializer xmlFormatter = null;
                IFormatter formatter = null;
                switch (serializationType)
                {
                    case SerializationType.Binary:
                        formatter = new BinaryFormatter();
                        break;
                    case SerializationType.Soap:
                        formatter = new SoapFormatter();
                        break;
                    case SerializationType.Xml:
                        xmlFormatter = new XmlSerializer(obj.GetType());
                        break;
                    default:
                        break;
                }

                if (serializationType == SerializationType.Xml)
                {
                    xmlFormatter.Serialize(stream, obj);
                }
                else
                {
                    formatter.Serialize(stream, obj);
                }
                return stream;
            }
            catch (System.Exception ex)
            {
                throw new Exception("序列化异常", ex);
            }
        }

        /// <summary>
        /// Objs the serialize.
        /// </summary>
        /// <param name="serializationType">Type of the serializer.</param>
        /// <param name="obj">The obj.</param>
        /// <param name="fileName">Name of the file.</param>
        private static void ObjSerialize(SerializationType serializationType, object obj, string fileName)
        {
            Stream stream = new FileStream(fileName, FileMode.OpenOrCreate, FileAccess.Write);

            ObjSerialize(serializationType, obj, stream);
        }

        /// <summary>
        /// Objs the deserialize.
        /// </summary>
        /// <param name="serializationType">Type of the serializer.</param>
        /// <param name="metaDataType">Type of the meta data.</param>
        /// <param name="fileName">Name of the file.</param>
        /// <returns></returns>
        private static object ObjDeserialize(SerializationType serializationType, Type metaDataType, string fileName)
        {

            Stream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read);
            return ObjDeserialize(serializationType, metaDataType, stream);

        }

        /// <summary>
        /// Objs the deserialize.
        /// </summary>
        /// <param name="serializationType">Type of the serializer.</param>
        /// <param name="metaDataType">Type of the meta data.</param>
        /// <param name="fileName">Name of the file.</param>
        /// <returns></returns>
        private static object ObjDeserialize(SerializationType serializationType, Type metaDataType, Stream stream)
        {
            try
            {
                if (stream == null)
                    return null;

                XmlSerializer xmlFormatter = null;
                IFormatter formatter = null;
                object objReturn = null;
                switch (serializationType)
                {
                    case SerializationType.Binary:
                        formatter = new BinaryFormatter();
                        break;
                    case SerializationType.Soap:
                        formatter = new SoapFormatter();
                        break;
                    case SerializationType.Xml:
                        xmlFormatter = new XmlSerializer(metaDataType);
                        break;
                    default:
                        break;
                }

                using (stream)
                {
                    if (serializationType == SerializationType.Xml)
                    {
                        objReturn = xmlFormatter.Deserialize(stream);
                    }
                    else
                    {
                        objReturn = formatter.Deserialize(stream);
                    }
                }
                return objReturn;
            }
            catch (System.Exception ex)
            {
                throw new Exception("反序列化异常", ex);
            }
        }

        #endregion

        #region BinaryFormatter

        /// <summary>
        /// Binaries the serialize.
        /// </summary>
        /// <param name="obj">The obj.</param>
        /// <param name="fileName">Name of the file.</param>
        public static void BinarySerialize(object obj, string fileName)
        {
            ObjSerialize(SerializationType.Binary, obj, fileName);
        }

        public static Stream BinarySerialize(object obj)
        {
            Stream stream = new MemoryStream();
            return ObjSerialize(SerializationType.Binary, obj, stream);
        }

        public static object BinaryDeserialize(string fileName)
        {
            return ObjDeserialize(SerializationType.Binary, typeof(object), fileName);
        }

        /// <summary>
        /// Binaries the deserialize.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="fileName">Name of the file.</param>
        /// <returns></returns>
        public static T BinaryDeserialize<T>(string fileName) where T : class
        {
            return ObjDeserialize(SerializationType.Binary, typeof(T), fileName) as T;
        }

        public static T BinaryDeserialize<T>(Stream stream) where T : class
        {
            return ObjDeserialize(SerializationType.Binary, typeof(T), stream) as T;
        }

        #endregion

        #region SoapFormatter

        /// <summary>
        /// SOAPs the serialize.
        /// </summary>
        /// <param name="obj">The obj.</param>
        /// <param name="fileName">Name of the file.</param>
        public static void SoapSerialize(object obj, string fileName)
        {
            ObjSerialize(SerializationType.Soap, obj, fileName);
        }

        /// <summary>
        /// SOAPs the serialize.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj">The obj.</param>
        /// <param name="fileName">Name of the file.</param>
        public static void SoapSerialize<T>(T obj, string fileName)
        {
            ObjSerialize(SerializationType.Soap, obj, fileName);
        }

        public static Stream SoapSerialize(object obj)
        {
            Stream stream = new MemoryStream();
            return ObjSerialize(SerializationType.Soap, obj, stream);
        }



        /// <summary>
        /// SOAPs the deserialize.
        /// </summary>
        /// <param name="fileName">Name of the file.</param>
        /// <returns></returns>
        public static object SoapDeserialize(string fileName)
        {
            return ObjDeserialize(SerializationType.Soap, typeof(object), fileName);
        }

        /// <summary>
        /// SOAPs the deserialize.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="fileName">Name of the file.</param>
        /// <returns></returns>
        public static T SoapDeserialize<T>(string fileName) where T : class
        {
            return ObjDeserialize(SerializationType.Soap, typeof(T), fileName) as T;
        }

        #endregion

        #region XmlSerializer

        /// <summary>
        /// XMLs the serialize.
        /// </summary>
        /// <param name="obj">The obj.</param>
        /// <param name="fileName">Name of the file.</param>
        public static void XmlSerialize(object obj, string fileName)
        {
            ObjSerialize(SerializationType.Xml, obj, fileName);
        }

        public static Stream XmlSerialize(object obj)
        {
            Stream stream = new MemoryStream();
            return ObjSerialize(SerializationType.Xml, obj, stream);
        }



        /// <summary>
        /// XMLs the deserialize.
        /// </summary>
        /// <param name="fileName">Name of the file.</param>
        /// <param name="metaDataType">Type of the meta data.</param>
        /// <returns></returns>
        public static object XmlDeserialize(string fileName, Type metaDataType)
        {
            return ObjDeserialize(SerializationType.Xml, metaDataType.GetType(), fileName);
        }

        /// <summary>
        /// XMLs the deserialize.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="fileName">Name of the file.</param>
        /// <returns></returns>
        public static T XmlDeserialize<T>(string fileName) where T : class
        {
            return ObjDeserialize(SerializationType.Xml, typeof(T), fileName) as T;
        }

        public static T XmlDeserialize<T>(Stream stream) where T : class
        {
            return ObjDeserialize(SerializationType.Xml, typeof(T), stream) as T;
        }

        #endregion
    }
}
