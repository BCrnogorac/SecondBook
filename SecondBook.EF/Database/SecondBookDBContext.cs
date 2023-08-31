using Microsoft.EntityFrameworkCore;
using SecondBook.EF.Database.Models;

namespace SecondBook.EF.Database
{
    public class SecondBookDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=SecondBook");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>()
                .HasOne(e => e.Category)
                .WithMany(e => e.Books)
                .HasForeignKey(e => e.CategoryId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Book>()
                .HasOne(e => e.Author)
                .WithMany(e => e.Books)
                .HasForeignKey(e => e.AuthorId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Order>()
                .HasOne(e => e.User)
                .WithMany(e => e.Orders)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Book>()
                .HasMany(e => e.Orders)
                .WithMany(e => e.Books);
        }
    }
}
