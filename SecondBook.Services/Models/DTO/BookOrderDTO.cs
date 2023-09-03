using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondBook.Services.Models.DTO
{
    public class BookOrderDTO
    {
        public BookDTO Book { get; set; }
        public int Quantity { get; set; }
    }
}
