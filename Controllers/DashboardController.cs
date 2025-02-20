using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace AEET.Controllers
{
    public class DashboardController : Controller
    {
        // API to get user role
        [HttpGet]
        public IActionResult GetUserRole()
        {
            var userRole = HttpContext.Session.GetString("UserRole");
            if (userRole != null)
            {
                return Json(new { role = userRole });
            }
            return Json(new { role = "" });
        }

        // Redirect users based on role after login
        public IActionResult Index()
        {
            var userRole = HttpContext.Session.GetString("UserRole");

            if (userRole == "Admin")
            {
                return RedirectToAction("AdminDashboard");
            }
            else if (userRole == "IT")
            {
                return RedirectToAction("ITDashboard");
            }
            else if (userRole == "Security")
            {
                return RedirectToAction("SecurityDashboard");
            }

            return RedirectToAction("Login", "Account");
        }

        public IActionResult AdminDashboard()
        {
            return View();
        }

        public IActionResult ITDashboard()
        {
            return View();
        }

        public IActionResult SecurityDashboard()
        {
            return View();
        }
    }
}
