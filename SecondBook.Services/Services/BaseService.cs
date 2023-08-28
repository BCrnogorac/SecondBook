using AutoMapper;
using SecondBook.EF.Database;

namespace SecondBook.Services.Services
{
    public class BaseService
    {
        protected SecondBookDBContext dbContext;
        protected IMapper mapper;

        public BaseService(SecondBookDBContext dbContext , IMapper mapperConfiguration)
        {
            this.dbContext = dbContext;
            this.mapper = mapperConfiguration;
        }
    }
}
