using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SecondBook.EF.Database;
using SecondBook.EF.Database.Models;
using SecondBook.Services.Models.BM;
using SecondBook.Services.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondBook.Services.Services
{
    public class OrderService : BaseService
    {
        public OrderService(SecondBookDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {
        }

        public bool InsertOrder(OrderBM model)
        {
            var bookIds = model.BookOrders.Select(bo => bo.BookID).ToList();
            var books = dbContext.Books.Where(x => bookIds.Contains(x.Id)).ToList();

            var notEnoughQuantity = books.Any(e =>
            {
                var quantity = model.BookOrders.FirstOrDefault(bo => bo.BookID == e.Id)?.Quantity;
                return e.Quantity < quantity;
            });

            if (model == null || books.Count == 0 || notEnoughQuantity)
            {
                return false;
            }

            decimal totalPrice = books.Sum(book => book.Price * model.BookOrders.First(bo => bo.BookID == book.Id).Quantity);

            var bookOrders = model.BookOrders.Select(b => new BookOrder()
            {
                BookId = b.BookID,
                Quantity = b.Quantity
            }).ToList();

            var orderModel = new Order()
            {
                UserId = model.UserId,
                CreatedDate = DateTime.UtcNow,
                Price = totalPrice,
                BookOrders = bookOrders
            };

            dbContext.Orders.Add(orderModel);
            dbContext.SaveChanges();

            
            books.ForEach(e =>
            {
                var quantity = model.BookOrders.First(bo => bo.BookID == e.Id).Quantity;
                e.Quantity -= quantity;
            });
            dbContext.UpdateRange(books);
            dbContext.SaveChanges();

            return true;
        }

        public IEnumerable<OrderDTO> GetOrdersByUserId(int id)
        {
            var query = dbContext.Orders
                .Include(x => x.BookOrders)
                    .ThenInclude(b => b.Book)
                        .ThenInclude(b => b.Category)
                .Include(x => x.BookOrders)
                    .ThenInclude(b => b.Book)
                        .ThenInclude(b => b.Author)
                
                .Where(x => x.UserId == id)
                .ToList();

            return mapper.Map<IEnumerable<OrderDTO>>(query);
        }

        public void DeleteOrderById(int id)
        {
            var order = dbContext.Orders.Find(id);
            if (order != null)
            {
                dbContext.Orders.Remove(order);
                dbContext.SaveChanges();
            }
        }
    }
}
