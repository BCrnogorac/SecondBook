using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondBook.EF.Database.Models
{
    public class Order
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public ICollection<Book>? Books { get; set; } = new List<Book>();
    }
}
