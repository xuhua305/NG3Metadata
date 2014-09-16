using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using NG3.Data;
using NG3.Data.Service;
using NG3.Metadata.Core;

namespace Metadata.DataAccess
{
    public sealed class KnowledgeDac
    {

        #region 单键构造

        private static object syncLock = new object();
        private static KnowledgeDac _instance;
        static public KnowledgeDac Instance
        {
            get
            {
                if (_instance == null)
                {
                    lock (syncLock)
                    {

                        _instance = new KnowledgeDac();
                    }
                }
                return _instance;
            }
        }

        #endregion

        public void AddModel(MetadataGod model)
        {
            try
            {

                MemoryStream memoryStream = (MemoryStream)SerializationHelp.XmlSerialize(model);
                byte[] bytes = memoryStream.ToArray();
                memoryStream.Close();
                string sql = "insert into md_Knowledge(Id,ParentId,ParentVersionId,TreeLevel,TimeStamp,IsCheckOut,Content,Catalogue,Name,DisplayName,IsLastVersion)";
                sql += " values({0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10})";
                DbHelper.ExecuteNonQuery(sql, new NGDataParameter("Id", NGDbType.VarChar, model.Id),
                                         new NGDataParameter("ParentId", NGDbType.VarChar,
                                                             model.ParentId),
                                         new NGDataParameter("ParentVersionId", NGDbType.VarChar,
                                                             model.ParentVersionId),
                                         new NGDataParameter("TreeLevel", NGDbType.Integer, model.TreeLevel),
                                         new NGDataParameter("TimeStamp", NGDbType.DateTime,
                                                             model.TimeStamp),
                                         new NGDataParameter("IsCheckOut", NGDbType.Integer, model.IsCheckOut),
                                         new NGDataParameter("Content", NGDbType.Binary, bytes),
                                         new NGDataParameter("Catalogue", NGDbType.Integer, (int)model.Catalogue),
                                         new NGDataParameter("Name", NGDbType.VarChar, model.Name),
                                         new NGDataParameter("DisplayName", NGDbType.VarChar, model.CurrentDisplayName),
                                         new NGDataParameter("IsLastVersion", NGDbType.Integer, model.IsLastVersion));
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {

            }
        }

        public void UpdateModel(MetadataGod model)
        {
            try
            {

                MemoryStream memoryStream = (MemoryStream)SerializationHelp.XmlSerialize(model);
                byte[] bytes = memoryStream.ToArray();
                memoryStream.Close();
                string sql = "update md_Knowledge set ParentId = {0},ParentVersionId = {1},TreeLevel={2},TimeStamp={3},IsCheckOut = {4},Content = {5}," +
                             "Name = {6},DisplayName = {7},IsLastVersion={8} where Id={9}";
                DbHelper.ExecuteNonQuery(sql,
                                         new NGDataParameter("ParentId", NGDbType.VarChar,
                                                             model.ParentId),
                                         new NGDataParameter("ParentVersionId", NGDbType.VarChar,
                                                             model.ParentVersionId),
                                         new NGDataParameter("TreeLevel", NGDbType.Integer,
                                                             model.TreeLevel),
                                         new NGDataParameter("TimeStamp", NGDbType.DateTime,
                                                             model.TimeStamp),
                                         new NGDataParameter("IsCheckOut", NGDbType.Integer,
                                                             model.IsCheckOut),
                                         new NGDataParameter("Content", NGDbType.Binary, bytes),
                                         new NGDataParameter("Name", NGDbType.VarChar,
                                                             model.Name),
                                        new NGDataParameter("DisplayName", NGDbType.VarChar,
                                                             model.CurrentDisplayName),
                                        new NGDataParameter("IsLastVersion", NGDbType.Integer,
                                                             model.IsLastVersion),
                    new NGDataParameter("Id", NGDbType.VarChar, model.Id));
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {

            }
        }

        public void ClearModelParentVersion(string id)
        {
            try
            {
                Debug.Assert(!string.IsNullOrEmpty(id));

                string sql = "update md_Knowledge set parentversionid='' where Id = {0}";
                DbHelper.ExecuteNonQuery(sql, new NGDataParameter("Id", NGDbType.VarChar, id));
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {

            }
        }

        public void ClearModelParent(string id)
        {
            try
            {
                Debug.Assert(!string.IsNullOrEmpty(id));


                string sql = "update md_Knowledge set parentid='' where Id = {0}";
                DbHelper.ExecuteNonQuery(sql, new NGDataParameter("Id", NGDbType.VarChar, id));
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {

            }
        }

        public DataTable GetModel()
        {
            try
            {
                DataTable dt = DbHelper.GetDataTable("select * from md_Knowledge where IsLastVersion=1");
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
            }
        }

        public DataTable GetModel(string id)
        {
            try
            {
                DataTable dt = DbHelper.GetDataTable("select * from md_Knowledge where id={0} and IsLastVersion=1",
                    new NGDataParameter("Id", NGDbType.VarChar, id));
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {

            }
        }

        public DataTable GetModel(IList<string> ids)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("select * from md_Knowledge where IsLastVersion=1 and id in(");
                for (int i = 0; i < ids.Count; i++)
                {
                    sb.Append(DbConvert.ToSqlString(ids[i]));
                    if (i < ids.Count - 1)
                        sb.Append(",");
                }
                sb.Append(")");
                DataTable dt = DbHelper.GetDataTable(sb.ToString());
                return dt;
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        public DataTable GetModelByParentId(string parentId)
        {
            try
            {
                DataTable dt = DbHelper.GetDataTable("select * from md_Knowledge where ParentId={0} and IsLastVersion=1",
                    new NGDataParameter("ParentId", NGDbType.VarChar, parentId));
                return dt;
            }
            catch (Exception ex)
            {

                throw;
            }
            finally
            {

            }
        }

        public DataTable GetModelByParentId(string parentId, MetadataCatalogue metadataCatalogue)
        {
            try
            {
                DataTable dt = DbHelper.GetDataTable("select * from md_Knowledge where ParentId={0} and Catalogue={1} and IsLastVersion=1",
                    new NGDataParameter("ParentId", NGDbType.VarChar, parentId), new NGDataParameter("Catalogue", NGDbType.Integer, (int)metadataCatalogue));
                return dt;
            }
            catch (Exception ex)
            {

                throw;
            }
            finally
            {
            }
        }



        public DataTable GetModel(int treeLevel)
        {
            try
            {
                DataTable dt = DbHelper.GetDataTable("select * from md_Knowledge where treelevel={0} and IsLastVersion=1",
                    new NGDataParameter("treelevel", NGDbType.Integer, treeLevel));
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
            }
        }



        public DataTable GetModel(MetadataCatalogue metadataCatalogue)
        {
            try
            {
                DataTable dt = DbHelper.GetDataTable("select * from md_Knowledge where Catalogue={0} and IsLastVersion=1",
                    new NGDataParameter("Catalogue", NGDbType.Integer, (int)metadataCatalogue));
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
            }
        }



        public void DeleteModel(string id)
        {
            try
            {
                Debug.Assert(!string.IsNullOrEmpty(id));

                string sql = "delete from md_Knowledge where Id = {0}";
                DbHelper.ExecuteNonQuery(sql, new NGDataParameter("Id", NGDbType.VarChar, id));
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
            }
        }

        public void Checkout(string id)
        {
            try
            {
                //Debug.Assert(!string.IsNullOrEmpty(id));


                //string sql = "update md_Knowledge set IsCheckOut = {0} where Id = {1}";
                //DbHelper.ExecuteNonQuery(sql, new NGDataParameter("IsCheckOut", NGDbType.SmallInt, 1), new NGDataParameter("Id", NGDbType.VarChar, id));
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {

            }
        }

        public void Checkin(string id)
        {
            try
            {
                Debug.Assert(!string.IsNullOrEmpty(id));

                string sql = "update md_Knowledge set IsCheckOut = {0} where Id = {1}";
                DbHelper.ExecuteNonQuery(sql, new NGDataParameter("IsCheckOut", NGDbType.SmallInt, 0),
                                         new NGDataParameter("Id", NGDbType.VarChar, id));
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {

            }
        }
    }
}
