using Microsoft.AspNetCore.Mvc;
using SecondBook.Services.Models.BM;
using SecondBook.Services.Services;

namespace SecondBook.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly BookService bookService;

        public BookController(BookService bookService)
        {
            this.bookService = bookService;
        }

        [HttpGet]
        public IActionResult GetBooks()
        {
            return Ok(bookService.GetBooks());
        }

        [HttpGet("category/{categoryId}")]
        public IActionResult GetBooksWithCategoryId([FromRoute] int? categoryid)
        {
            return Ok(bookService.GetBooks(categoryid, null));
        }

        [HttpGet("author/{authorId}")]
        public IActionResult GetBooksWithAuthorId([FromRoute] int? authorId)
        {
            return Ok(bookService.GetBooks(null, authorId));
        }

        [HttpGet("category/{categoryId}/author/{authorId}")]
        public IActionResult GetBooks([FromRoute] int? categoryid, [FromRoute] int? authorId)
        {
            return Ok(bookService.GetBooks(categoryid, authorId));
        }

        [HttpGet("{id}")]
        public IActionResult GetBookById([FromRoute] int id)
        {
            return Ok(bookService.GetBookById(id));
        }

        [HttpPost]
        public IActionResult InsertBook([FromBody] BookBM model)
        {
            bookService.InsertBook(model);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateBook([FromBody] BookBM model)
        {
            bookService.UpdateBook(model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook([FromRoute] int id)
        {
            bookService.DeleteBookById(id);
            return Ok();
        }
    }
}
