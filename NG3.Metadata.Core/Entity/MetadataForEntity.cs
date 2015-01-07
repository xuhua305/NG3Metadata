using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace NG3.Metadata.Core.Entity
{

    /// <summary>
    /// 实体元数据模版
    /// </summary>
    public class MetadataForEntity : MetadataBizBase
    {

        public MetadataForEntity()
        {
            Catalogue = MetadataCatalogue.Entity;
        }

        #region 基础特性


        /// <summary>
        /// 对应的SQL语句
        /// </summary>
        public string Sql { get; set; }

        /// <summary>
        /// SQL语句的select部分
        /// </summary>
        public string SelectSql { get; set; }

        /// <summary>
        /// SQL语句的Where部分
        /// </summary>
        public string WhereSql { get; set; }

        /// <summary>
        /// SQL语句的Order by 部分
        /// </summary>
        public string OrderSql { get; set; }

        /// <summary>
        /// 是否多表查询
        /// </summary>
        public bool IsMultiTable { get; set; }

        /// <summary>
        /// 需要更新的表(只能是一张，而且必须提供主表的继承)
        /// </summary>
        public string UpdateTable { get; set; }

        /// <summary>
        /// 主键映射的物理字段
        /// </summary>
        public string KeyMapColumn { get; set; }

        /// <summary>
        /// 主键产生规则
        /// </summary>
        public PrimaryKeyGenerateStyle KeyGenerateStyle { get; set; }

        public DataType KeyDataType { get; set; }

        /// <summary>
        /// 是否树形展示
        /// </summary>
        public bool IsTreeStyle { get; set; }

        /// <summary>
        /// 父节点对应的属性编号
        /// </summary>
        public string ParentNodePropertyId { get; set; }


        /// <summary>
        /// 子节点对应的属性编号
        /// </summary>
        public string ChildNodePropertyId { get; set; }


        private IList<EntityRelation> _entityRelations = new List<EntityRelation>();

        /// <summary>
        /// 实体关系列表
        /// </summary>
        [JsonIgnore]
        public IList<EntityRelation> EntityRelations
        {
            get { return _entityRelations; }
            set { _entityRelations = value; }
        }

        #endregion

        #region 业务特性

        /// <summary>
        /// 是否多组织
        /// </summary>
        public bool IsMultiOrg { get; set; }

        /// <summary>
        /// 是否支持删除历史模式
        /// </summary>
        public bool IsDeleteHistory { get; set; }

        #endregion

        #region 技术特性

        /// <summary>
        /// 是否归档
        /// </summary>
        public bool IsArchive { get; set; }

        /// <summary>
        /// 是否缓存
        /// </summary>
        public bool IsCache { get; set; }

        /// <summary>
        /// 是否产生数据库视图(多表的时候)
        /// </summary>
        public bool IsGenerateView { get; set; }

        /// <summary>
        /// 表空间大小(兆为单位)
        /// </summary>
        public int TableSpaceSize { get; set; }

        #endregion

        #region 实体帮助维护

        /// <summary>
        /// 是否保持唯一性(过滤重复行)
        /// </summary>
        public bool IsDistinct { get; set; }

        /// <summary>
        /// 再次过滤条件的SQL语句
        /// </summary>
        public string FilterSql { get; set; }

        #endregion

        #region XML序列化部分

        public override void ReadBaseXml(System.Xml.XmlReader reader)
        {
            base.ReadBaseXml(reader);

            if (reader.IsStartElement("Sql"))
            {
                Sql = reader.ReadString().Trim();
            }
            else if (reader.IsStartElement("SelectSql"))
            {
                SelectSql = reader.ReadString().Trim();
            }
            else if (reader.IsStartElement("WhereSql"))
            {
                WhereSql = reader.ReadString().Trim();
            }
            else if (reader.IsStartElement("OrderSql"))
            {
                OrderSql = reader.ReadString().Trim();
            }
            else if (reader.IsStartElement("UpdateTable"))
            {
                UpdateTable = reader.ReadString().Trim();
            }
            else if (reader.IsStartElement("KeyMapColumn"))
            {
                KeyMapColumn = reader.ReadString().Trim();
            }
            else if (reader.IsStartElement("KeyDataType"))
            {
                KeyDataType = (DataType)(Convert.ToInt32(reader.ReadString().Trim()));
            }
            else if (reader.IsStartElement("KeyGenerateStyle"))
            {
                KeyGenerateStyle = (PrimaryKeyGenerateStyle)(Convert.ToInt32(reader.ReadString().Trim()));
            }
            else if (reader.IsStartElement("IsTreeStyle"))
            {
                IsTreeStyle = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("ParentNodePropertyId"))
            {
                ParentNodePropertyId = reader.ReadString().Trim();
            }
            else if (reader.IsStartElement("ChildNodePropertyId"))
            {
                ChildNodePropertyId = reader.ReadString().Trim();
            }
            else if (reader.IsStartElement("IsMultiOrg"))
            {
                IsMultiOrg = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("IsArchive"))
            {
                IsArchive = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("IsDeleteHistory"))
            {
                IsDeleteHistory = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("IsCache"))
            {
                IsCache = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("IsGenerateView"))
            {
                IsGenerateView = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("TableSpaceSize"))
            {
                TableSpaceSize = Convert.ToInt32(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("IsDistinct"))
            {
                IsDistinct = Convert.ToBoolean(reader.ReadString().Trim());
            }
            else if (reader.IsStartElement("FilterSql"))
            {
                FilterSql = reader.ReadString().Trim();
            }
            else if (reader.IsStartElement("EntityRelations"))
            {

                reader.MoveToAttribute("Count");
                int count = Convert.ToInt32(reader.ReadContentAsString());
                for (int i = 0; i < count; i++)
                {
                    reader.Read();
                    if (reader.IsStartElement("EntityRelation"))
                    {
                        EntityRelation entityRelation = new EntityRelation();
                        reader.MoveToAttribute("Id");
                        entityRelation.Id = reader.ReadContentAsString();
                        reader.MoveToAttribute("RelationType");
                        entityRelation.RelationType = (EntityRelationStyle)(Convert.ToInt32(reader.ReadContentAsString()));
                        reader.MoveToAttribute("TargetEntityId");
                        entityRelation.TargetEntityId = reader.ReadContentAsString();
                        reader.MoveToAttribute("SourcePropertyId");
                        entityRelation.SourcePropertyId = reader.ReadContentAsString();
                        reader.MoveToAttribute("TargetPropertyId");
                        entityRelation.TargetPropertyId = reader.ReadContentAsString();

                        EntityRelations.Add(entityRelation);
                    }

                }

            }
        }

        public override void WriteBaseXml(System.Xml.XmlWriter writer)
        {
            base.WriteBaseXml(writer);
            writer.WriteElementString("Sql", Sql);
            writer.WriteElementString("SelectSql", SelectSql);
            writer.WriteElementString("WhereSql", WhereSql);
            writer.WriteElementString("OrderSql", OrderSql);
            writer.WriteElementString("UpdateTable", UpdateTable);
            writer.WriteElementString("KeyMapColumn", KeyMapColumn);
            writer.WriteElementString("KeyDataType", ((int)KeyDataType).ToString());
            writer.WriteElementString("KeyGenerateStyle", ((int)KeyGenerateStyle).ToString());

            writer.WriteElementString("IsTreeStyle", IsTreeStyle.ToString());
            writer.WriteElementString("ParentNodePropertyId", ParentNodePropertyId);
            writer.WriteElementString("ChildNodePropertyId", ChildNodePropertyId);

            writer.WriteElementString("IsMultiOrg", IsMultiOrg.ToString());
            writer.WriteElementString("IsArchive", IsArchive.ToString());
            writer.WriteElementString("IsDeleteHistory", IsDeleteHistory.ToString());
            writer.WriteElementString("IsCache", IsCache.ToString());
            writer.WriteElementString("IsGenerateView", IsGenerateView.ToString());
            writer.WriteElementString("TableSpaceSize", TableSpaceSize.ToString());
            writer.WriteElementString("IsDistinct", IsDistinct.ToString());
            writer.WriteElementString("FilterSql", FilterSql);

            writer.WriteStartElement("EntityRelations");
            writer.WriteAttributeString("Count", EntityRelations.Count.ToString());
            foreach (var entityRelation in EntityRelations)
            {
                writer.WriteStartElement("EntityRelation");
                writer.WriteAttributeString("Id", entityRelation.Id);
                writer.WriteAttributeString("RelationType", ((int)entityRelation.RelationType).ToString());
                writer.WriteAttributeString("TargetEntityId", entityRelation.TargetEntityId);
                writer.WriteAttributeString("SourcePropertyId", entityRelation.SourcePropertyId);
                writer.WriteAttributeString("TargetPropertyId", entityRelation.TargetPropertyId);
                writer.WriteEndElement();
            }
            writer.WriteEndElement();

        }

        #endregion


    }
}
