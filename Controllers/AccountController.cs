using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace AEET.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            string role = GetRoleFromDatabase(username, password);

            if (!string.IsNullOrEmpty(role))
            {
                HttpContext.Session.SetString("UserRole", role);
                return RedirectToAction("Landing", "Home"); // Redirect to Default.cshtml
            }

            ViewBag.Error = "Invalid username or password.";
            return View();
        }

        private string GetRoleFromDatabase(string username, string password)
        {
            // Dummy logic for now (replace with actual database authentication)
            if (username == "admin" && password == "admin123") return "Admin";
            if (username == "ituser" && password == "itpassword") return "IT";
            if (username == "security" && password == "securitypass") return "Security";

            return "";
        }
        [HttpGet]
        public IActionResult Logout()
        {
            // Clear all session data
            HttpContext.Session.Clear();
            // Redirect the user to the Login page
            return RedirectToAction("Login", "Account");
        }

    }
}
