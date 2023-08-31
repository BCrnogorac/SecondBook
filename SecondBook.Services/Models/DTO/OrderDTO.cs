using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondBook.Services.Models.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public ICollection<BookDTO> Books { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal Price { get; set; }

    }
}
