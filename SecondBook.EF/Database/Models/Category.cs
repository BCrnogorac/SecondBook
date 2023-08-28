namespace SecondBook.EF.Database.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Book>? Books { get; } = new List<Book>();
    }
}
