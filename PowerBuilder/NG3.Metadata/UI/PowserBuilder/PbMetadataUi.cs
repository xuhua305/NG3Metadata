using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NG3.Metadata.Core;
using NG3.Metadata.UI.PowserBuilder.Controls;

namespace NG3.Metadata.UI.PowserBuilder
{
    public class PbMetadataUi:MetadataGod
    {
        private PbFormInfo _pbFormInfo = new PbFormInfo();

        private IList<PbBaseControlInfo> _pbControlInfos  = new List<PbBaseControlInfo>();
    }
}
