using Microsoft.AspNetCore.Mvc;
using SecondBook.Services.Models.BM;
using SecondBook.Services.Services;

namespace SecondBook.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorController : Controller
    {
        private readonly AuthorService authorService;
        public AuthorController(AuthorService authorService)
        {
            this.authorService = authorService;
        }

        [HttpGet]
        public IActionResult GetAuthors()
        {
            return Ok(this.authorService.GetAuthors());
        }

        [HttpPost]
        public IActionResult InsertAuthor([FromBody] AuthorBM model)
        {
            authorService.InsertAuthor(model);
            return Ok();
        }
    }
}
