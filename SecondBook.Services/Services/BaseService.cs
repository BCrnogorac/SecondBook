using SecondBook.EF.Database;

namespace SecondBook.Services.Services
{
    public class BaseService
    {
        protected SecondBookDBContext dbContext;

        public BaseService(SecondBookDBContext dbContext)
        {
            this.dbContext = dbContext;
        }
    }
}
