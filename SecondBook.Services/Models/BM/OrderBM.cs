using SecondBook.EF.Database.Models;
using SecondBook.Services.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondBook.Services.Models.BM
{
    public class OrderBM
    {
        public int UserId { get; set; }
        public ICollection<int> BookIds { get; set; }
    }
}
