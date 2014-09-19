using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web.UI.WebControls;
using NG3.Metadata.Core.Entity;

namespace NG3.Metadata.ReverseEngine.DataBase
{
    public sealed class DbExportHelp
    {
        private static DataTable ConvertMetadataToDataTable(MetadataForEntity metadataForEntity)
        {
            try
            {
                DataTable dt = new DataTable(metadataForEntity.UpdateTable);

            }
            catch (Exception ex)
            {
                
                throw;
            }
        }

        public static void Export(MetadataForEntity metadataForEntity, string connectString)
        {
            TableExporter tableExporter = new TableExporter(connectString);
            DataTable dt = ConvertMetadataToDataTable(metadataForEntity);
            if (dt != null)
            {
                tableExporter.ExportTable(dt);
            }
        }
    }
}
