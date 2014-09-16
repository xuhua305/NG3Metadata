using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
using NG3.Data.Service;
using NG3.Metadata.Core;
using NG3.Metadata.Core.Entity;
using NG3.Metadata.Core.Service;
using SUP.Common.Base;

namespace Metadata.Rule.Service
{
    public class EntityUpdateServiceImplement : IServiceImplement
    {

        private string GeneratePrimacyKey(object originalStr, PrimaryKeyGenerateStyle primaryKeyGenerateStyle)
        {
            if (originalStr != null && originalStr != DBNull.Value)
            {
                return originalStr.ToString();
            }

            string generateStr = string.Empty;
            switch (primaryKeyGenerateStyle)
            {
                case PrimaryKeyGenerateStyle.Guid:
                    generateStr = Guid.NewGuid().ToString();
                    break;
                default:
                    break;
            }
            return generateStr;
        }

        public ParameterInfo Invoke(ServiceContext serviceContext)
        {
            try
            {
                MetadataForService metadataForService = serviceContext.Service;
                Debug.Assert(metadataForService.InputParams != null);
                DbHelper.Open();
                DbHelper.BeginTran();
                foreach (ParameterInfo inputParam in metadataForService.InputParams)
                {
                    Debug.Assert(inputParam.DataType == DataType.Entity);
                    List<MetadataForEntity> metadataForEntities =serviceContext.AssociateEntitys;
                    MetadataForEntity metadataForEntity = metadataForEntities.Find(entity => entity.Id == inputParam.Id);
                    List<MetadataForProperty> metadataForProperties =
                        serviceContext.PropertyDictionary[metadataForEntity.Id];
                    if (inputParam.Value != null)
                    {
                        DataTable dt = DataConverterHelper.ToDataTable(inputParam.Value.ToString(),
                                                                       metadataForEntity.Sql);
                        foreach (DataRow dr in dt.Rows)
                        {
                            foreach (DataColumn dc in dt.PrimaryKey)
                            {
                                MetadataForProperty metadataForProperty = metadataForProperties.Find(entity => entity.MapFieldName == dc.ColumnName);
                                if (metadataForProperty != null)
                                {
                                    dr[dc.ColumnName] = GeneratePrimacyKey(dr[dc.ColumnName],
                                        metadataForProperty.KeyGenerateStyle);
                                }
                            }
                        }
                        DbHelper.Update(dt, metadataForEntity.Sql);
                    }

                }


                DbHelper.CommitTran();
                ParameterInfo parameterInfo = metadataForService.OutputParam;
                parameterInfo.Value = true;
                return parameterInfo;
            }
            catch (Exception)
            {
                DbHelper.RollbackTran();
                throw;
            }
            finally
            {
                DbHelper.Close();
            }
        }
    }
}
