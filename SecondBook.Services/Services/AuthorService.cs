using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SecondBook.EF.Database;
using SecondBook.EF.Database.Models;
using SecondBook.Services.Models.BM;
using SecondBook.Services.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondBook.Services.Services
{
    public class AuthorService : BaseService
    {
        public AuthorService(SecondBookDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {
        }

        public IEnumerable<AuthorDTO> GetAuthors()
        {
            var authors = dbContext.Authors;
            return mapper.Map<IEnumerable<AuthorDTO>>(authors);
        }

        public void InsertAuthor(AuthorBM model)
        {
            if (model == null)
            {
                return;
            }

            var authorModel = new Author()
            {
                Name = model.Name
            };
            dbContext.Authors.Add(authorModel);
            dbContext.SaveChanges();
        }

        public void DeleteAuthorById(int id)
        {
            var author = dbContext.Authors.Find(id);
            if(author != null)
            {
                dbContext.Authors.Remove(author);
                dbContext.SaveChanges();
            }
        }

        public void UpdateAuthor(AuthorBM model)
        {
            var author = dbContext.Authors.Find(model.Id);
            author.Name = model.Name;

            dbContext.Authors.Update(author);
            dbContext.SaveChanges();
        }
    }
}