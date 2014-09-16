using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace Metadata.Controller
{
    public class WizardController : System.Web.Mvc.Controller
    {
        public ActionResult LayoutWizardView()
        {
            return View();
        }
    }
}
