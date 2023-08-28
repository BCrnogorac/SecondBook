﻿using AutoMapper;
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

        public void InsertCategory(CategoryBM model)
        {
            if(model == null)
            {
                return;
            }

            var categoryModel = new Category()
            {
                Name = model.Name
            };
            dbContext.Categories.Add(categoryModel);
            dbContext.SaveChanges();
        }
    }
}
