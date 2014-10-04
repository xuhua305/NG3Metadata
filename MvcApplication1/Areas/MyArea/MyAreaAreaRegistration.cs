using System.Web.Mvc;

namespace MvcApplication1.Areas.MyArea
{
    public class MyAreaAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "MyArea";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "MyArea_default",
                "MyArea/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
