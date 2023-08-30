using Microsoft.AspNetCore.Mvc;
using SecondBook.Services.Models.BM;
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

        [HttpPost]
        public IActionResult InsertCategory([FromBody] CategoryBM model)
        {
            categoryService.InsertCategory(model);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateCategory([FromBody] CategoryBM model)
        {
            categoryService.UpdateCategory(model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCategory([FromRoute] int id)
        {
            categoryService.DeleteCategoryById(id);
            return Ok();
        }
    }
}
