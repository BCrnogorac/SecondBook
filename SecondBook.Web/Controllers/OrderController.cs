using Microsoft.AspNetCore.Mvc;
using SecondBook.Services.Models.BM;
using SecondBook.Services.Services;

namespace SecondBook.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly OrderService orderService;

        public OrderController(OrderService orderService)
        {
            this.orderService = orderService;
        }

        [HttpGet("userId/{id}")]
        public IActionResult GetOrdersByUserId([FromRoute] int id)
        {
            return Ok(orderService.GetOrdersByUserId(id));
        }

        [HttpPost]
        public IActionResult InsertOrder([FromBody] OrderBM model)
        {
            orderService.InsertOrder(model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder([FromRoute] int id)
        {
            orderService.DeleteOrderById(id);
            return Ok();
        }
    }
}
