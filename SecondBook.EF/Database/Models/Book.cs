namespace SecondBook.EF.Database.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int Quantity { get; set; }
        public int? CategoryId { get; set; }    
        public int? AuthorId { get; set; }
        public Category? Category { get; set; }
        public Author? Author { get; set; }
    }
}
