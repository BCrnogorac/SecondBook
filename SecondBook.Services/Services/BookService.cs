using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SecondBook.EF.Database;
using SecondBook.EF.Database.Models;
using SecondBook.Services.Models.BM;
using SecondBook.Services.Models.DTO;

namespace SecondBook.Services.Services
{
    public class BookService : BaseService
    {
        public BookService(SecondBookDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {
        }

        public IEnumerable<BookDTO> GetBooks()
        {
            var books = dbContext.Books.Include(b => b.Category).Include(b => b.Author).ToList();
            return mapper.Map<IEnumerable<BookDTO>>(books);
        }

        public IEnumerable<BookDTO> GetBooks(int? categoryId, int? authorId)
        {
            var query = dbContext.Books.Include(b => b.Category).Include(b => b.Author).AsQueryable();

            if (categoryId.HasValue)
            {
                query = query.Where(b => b.CategoryId == categoryId);
            }

            if (authorId.HasValue)
            {
                query = query.Where(b => b.AuthorId == authorId);
            }
            var books = query.ToList();
            return mapper.Map<IEnumerable<BookDTO>>(books);
        }

        public BookDTO GetBookById(int id)
        {
            var book = dbContext.Books.Include(b => b.Category).Include(b => b.Author).FirstOrDefault(b => b.Id == id);
            return mapper.Map<BookDTO>(book);
        }

        public void InsertBook(BookBM model)
        {
            if (model == null)
            {
                return;
            }

            var bookModel = new Book()
            {
                Name = model.Name,
                Price = model.Price,
                Description = model.Description,
                CategoryId = model.CategoryId,
                AuthorId = model.AuthorId,
                //PublishedDate = model.PublishedDate
            };
            dbContext.Books.Add(bookModel);
            dbContext.SaveChanges();
        }

        public void DeleteBookById(int id)
        {
            var book = dbContext.Books.Find(id);
            if(book != null)
            {
                dbContext.Books.Remove(book);
                dbContext.SaveChanges();
            }
        }

        public void UpdateBook(BookBM model)
        {
            var book = dbContext.Books.Find(model.Id);
            book.Name = model.Name;
            book.Price = model.Price;
            book.Description = model.Description;
            book.CategoryId = model.CategoryId;
            book.AuthorId = model.AuthorId;
            //book.PublishedDate = model.PublishedDate;

            dbContext.Books.Update(book);
            dbContext.SaveChanges();
        }
    }
}
