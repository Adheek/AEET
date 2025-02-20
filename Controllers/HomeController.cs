using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace AEET.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Landing()
        {
            string? role = HttpContext.Session.GetString("UserRole");
            ViewBag.UserRole = role;  // Pass role to the view
            return View();
        }
    }
}
