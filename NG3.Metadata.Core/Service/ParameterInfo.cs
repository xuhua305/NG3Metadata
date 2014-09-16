using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace NG3.Metadata.Core.Service
{
    public class ParameterInfo : ICloneable
    {
        public ParameterInfo()
        {
            if (string.IsNullOrEmpty(Id))
            {
                Id = Guid.NewGuid().ToString();
            }
        }



        public string AssociateId { get; set; }

        public DataType DataType { get; set; }

        public string Name { get; set; }

        public string Id { get; set; }


        /// <summary>
        /// 参数值(默认的数值也在这里赋予)
        /// </summary>
        public object Value { get; set; }



        public object Clone()
        {
            ParameterInfo parameterInfo  =new ParameterInfo();
            parameterInfo.Id = Id;
            parameterInfo.AssociateId = AssociateId;
            parameterInfo.DataType = DataType;
            parameterInfo.Name = Name;
            parameterInfo.Value = Value;
            return parameterInfo;
        }
    }
}
