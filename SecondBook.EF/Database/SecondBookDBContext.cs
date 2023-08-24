using Microsoft.EntityFrameworkCore;
using SecondBook.EF.Database.Models;

namespace SecondBook.EF.Database
{
    public class SecondBookDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=SecondBook");
        }
    }
}
