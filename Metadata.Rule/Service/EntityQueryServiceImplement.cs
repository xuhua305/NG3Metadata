using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
using NG3.Data;
using NG3.Data.Service;
using NG3.Metadata.Core.Entity;
using NG3.Metadata.Core.Service;
using Newtonsoft.Json.Linq;
using SUP.Common.Base;

namespace Metadata.Rule.Service
{
    public class EntityQueryServiceImplement : IServiceImplement
    {

        private string _originalSelectSql = string.Empty;
        private string _originalWhereSql = string.Empty;

        private void ParseOriginalSql(string sql)
        {
            try
            {
                string[] strArray = sql.Split(new string[] { " where " }, StringSplitOptions.RemoveEmptyEntries);

                Debug.Assert(strArray.Length >= 1);
                _originalSelectSql = strArray[0];
                if (strArray.Length == 2)
                {
                    _originalWhereSql = strArray[1];
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        private string ConvertPropertyNameToField(IList<MetadataForProperty> metadataForProperties, string propertyName)
        {
            try
            {
                if (metadataForProperties == null || metadataForProperties.Count == 0)
                    return string.Empty;

                foreach (var metadataForProperty in metadataForProperties)
                {
                    if (metadataForProperty.Name.Equals(propertyName, StringComparison.OrdinalIgnoreCase))
                    {
                        return metadataForProperty.MapFieldName;
                    }
                }

                return string.Empty;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public ParameterInfo Invoke(ServiceContext serviceContext)
        {
            try
            {
                MetadataForService metadataForService = serviceContext.Service;
                ParameterInfo inputParam = metadataForService.InputParams[0];
                List<MetadataForEntity> metadataForEntities = serviceContext.AssociateEntitys as List<MetadataForEntity>;


                MetadataForEntity metadataForEntity =
                    metadataForEntities.Find(entity => entity.Id == inputParam.AssociateId);
                IList<MetadataForProperty> metadataForProperties =
                    serviceContext.PropertyDictionary[metadataForEntity.Id];
                string sql = string.Empty;
                ParseOriginalSql(metadataForEntity.Sql);

                Debug.Assert(metadataForService.InputParams != null);
                Debug.Assert(metadataForService.InputParams.Count == 1);

                int pageIndex = metadataForService.PagingInfo.PageIndex;
                int pageSize = metadataForService.PagingInfo.PageSize;
                int totalRecord = metadataForService.PagingInfo.TotalRecord;

                DataTable dtRet = null;
                DbHelper.Open();
                StringBuilder sb = new StringBuilder();
                sb.Append(_originalSelectSql);
                sb.Append(" where ");
                if (_originalWhereSql.Length > 0)
                {
                    sb.Append(_originalWhereSql);
                }
                else
                {
                    sb.Append("1=1");
                }


                if (inputParam.Value != null)
                {
                    string clientJson = inputParam.Value.ToString();
                    string query = string.Empty;
                    JObject jformObject = JObject.Parse(clientJson);

                    IDataParameter[] dataParams = DataConverterHelper.BuildQueryWithParam(jformObject["form"]["newRow"]["row"].ToString(), string.Empty, ref query);

                    if (!string.IsNullOrEmpty(query))
                    {
                        sb.Append(" and ");
                        sb.Append(query);
                    }

                    sql = sb.ToString();
                    if (metadataForService.PagingInfo.PageSize > 0)
                    {
                        //sql = PaginationAdapter.GetPageDataSql(sql, pageSize, ref pageIndex, ref totalRecord, metadataForEntity.FullKeyNameString, dataParams);
                    }


                    dtRet = DbHelper.GetDataTable(sql, dataParams);
                }
                else
                {
                    sql = sb.ToString();
                    if (metadataForService.PagingInfo.PageSize > 0)
                    {
                        //sql = PaginationAdapter.GetPageDataSql(sql, metadataForService.PagingInfo.PageSize, ref pageIndex, ref totalRecord, metadataForEntity.FullKeyNameString);
                    }

                    dtRet = DbHelper.GetDataTable(sql);
                }

                metadataForService.PagingInfo.PageIndex = pageIndex;
                metadataForService.PagingInfo.TotalRecord = totalRecord;


                string retString = DataConverterHelper.ToJson(dtRet, dtRet.Rows.Count);
                ParameterInfo returnParameterInfo = metadataForService.OutputParam.Clone() as ParameterInfo;
                returnParameterInfo.Value = retString;
                return returnParameterInfo;


            }
            catch (Exception ex)
            {

                throw;
            }
            finally
            {
                DbHelper.Close();
            }
        }
    }
}
