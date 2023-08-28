using SecondBook.Services.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondBook.Services.Models.BM
{
    public class BookBM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime PublishedDate { get; set; }
        public int Price { get; set; }
        public int CategoryId { get; set; }
        public int AuthorId { get; set; }
    }
}
