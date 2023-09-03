using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondBook.EF.Database.Models
{
    public class BookOrder
    {
        public int BookId { get; set; }
        public int OrdersId { get; set; }
        public Book Book { get; set; }
        public Order Order { get; set; }
        public int Quantity { get; set; }
    }
}
