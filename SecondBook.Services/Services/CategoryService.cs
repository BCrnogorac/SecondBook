using AutoMapper;
using SecondBook.EF.Database;
using SecondBook.Services.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondBook.Services.Services
{
    public class CategoryService : BaseService
    {
        public CategoryService(SecondBookDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {
        }

        public IEnumerable<CategoryDTO> GetCategories()
        {
            var categories = dbContext.Categories;
            return mapper.Map<IEnumerable<CategoryDTO>>(categories);
        }
    }
}
