using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core.Entity
{
    /// <summary>
    /// 实体关系描述
    /// </summary>
    public class EntityRelation
    {

        private EntityRelationStyle _relationType = EntityRelationStyle.None;

        public EntityRelationStyle RelationType
        {
            get { return _relationType; }
            set { _relationType = value; }
        }

        public string Id { get; set; }

        public string TargetEntityId { get; set; }

        public string SourcePropertyId { get; set; }

        public string TargetPropertyId { get; set; }

        public bool IsGenerateCascadedUpdate { get; set; }

        public string CascadedUpdateId { get; set; }

        
    }
}
