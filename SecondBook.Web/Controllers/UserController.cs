using Microsoft.AspNetCore.Mvc;
using SecondBook.Services.Models.BM;
using SecondBook.Services.Services;

namespace SecondBook.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserService userService;
        private readonly ValidationService validationService;

        public UserController(UserService userService, ValidationService validationService)
        {
            this.userService = userService;
            this.validationService = validationService;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginBM model)
        {
            var token = userService.Login(model);

            return token != null ? Ok(token) : BadRequest();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterBM model)
        {
            var result = await validationService.ValidateRegister(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            userService.Register(model);

            var loginModel = new LoginBM()
            {
                Email = model.Email,
                Password = model.Password,
            };

            return Ok(userService.Login(loginModel));
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(userService.GetUsers());
        }

        [HttpGet("userProtected")]
        public IActionResult GetUsersProtected()
        {
            return Ok(userService.GetUsers());
        }
    }
}
