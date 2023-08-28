using AutoMapper;
using SecondBook.EF.Database.Models;
using SecondBook.Services.Models.BM;
using SecondBook.Services.Models.DTO;
using SecondBook.Services.Services;

namespace SecondBook.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDTO>();
            CreateMap<RegisterBM, User>()
                .ForMember(dest => dest.HashedPassword, opt => opt.MapFrom(src => UserService.HashPassword(src.Password)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Username));
            CreateMap<Book, BookDTO>();
            CreateMap<Category, CategoryDTO>();

        }
    }
}
