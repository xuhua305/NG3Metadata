using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Metadata
{
    public class MetadataAreaRegistration : AreaRegistration
    {

        public override string AreaName
        {
            get
            {
                return "Metadata";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Metadata_default",
                "Metadata/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }

    }
}