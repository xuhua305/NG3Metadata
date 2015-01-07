using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using NG.Web.Controller;

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
