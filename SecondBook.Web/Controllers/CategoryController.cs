using Microsoft.AspNetCore.Mvc;
using SecondBook.Services.Services;

namespace SecondBook.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly CategoryService categoryService;
      
        public CategoryController(CategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [HttpGet]
        public IActionResult GetCategories()
        {
            return Ok(this.categoryService.GetCategories());
        }
    }
}
