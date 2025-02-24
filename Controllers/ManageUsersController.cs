using Microsoft.AspNetCore.Mvc;

namespace AEET.Controllers
{
    public class ManageUsersController : Controller
    {
        public IActionResult Index()
        {
            return View(); // ✅ Automatically loads Views/ManageUsers/Index.cshtml
        }
    }
}
