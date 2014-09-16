using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace NG3.Metadata.Core.Entity
{

    public class EntityRelationsJsonConverter : JsonConverter
    {

        public override bool CanConvert(Type objectType)
        {
            if (objectType.IsAssignableFrom(typeof(IList<EntityRelation>)))
                return true;
            return false;
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            try
            {
                //IList<DictionaryContent> dictionaryContents = JsonConvert.DeserializeObject<IList<DictionaryContent>>(reader.Value.ToString());
                IList<EntityRelation> entityRelations = new List<EntityRelation>();
                return entityRelations;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            //try
            //{
            //    if (value is IList<DictionaryContent>)
            //    {
            //        IList<DictionaryContent> dictionaryContents = value as IList<DictionaryContent>;

            //        writer.WriteValue(JsonConvert.SerializeObject(dictionaryContents));
            //    }
            //}
            //catch (Exception)
            //{

            //    throw;
            //}
        }
    }
}
