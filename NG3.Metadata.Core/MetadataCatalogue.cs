using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NG3.Metadata.Core
{
        /// <summary>
        /// 元数据类型
        /// </summary>
        public enum MetadataCatalogue
        {

            /// <summary>
            /// 其他模型
            /// </summary>
            Other=0,

            /// <summary>
            /// 角色模型
            /// </summary>
            Role=1,

            /// <summary>
            /// 行业化模型
            /// </summary>
            Industry=2,

            /// <summary>
            /// 组织模型
            /// </summary>
            Organization=3,

            /// <summary>
            /// 节点模型(包括解决方案根节点)
            /// </summary>
            Node=4,

            /// <summary>
            /// 值类型实体模型
            /// </summary>
            Dictionary=5,

            /// <summary>
            /// 普通实体模型
            /// </summary>
            Entity=6,

            /// <summary>
            /// 实体关系模型
            /// </summary>
            EntityRelation=7,

            /// <summary>
            /// 实体字段模型
            /// </summary>
            Property=8,

            /// <summary>
            /// 实体字段模型
            /// </summary>
            PropertyTemplate = 9,


            /// <summary>
            /// 服务模型
            /// </summary>
            Service=10,

            /// <summary>
            /// 服务参数
            /// </summary>
            ServiceParam=11,

            /// <summary>
            /// 界面交互模型
            /// </summary>
            Ui=12,

            /// <summary>
            /// 系统变量
            /// </summary>
            SystemVariable=13
        }

}
