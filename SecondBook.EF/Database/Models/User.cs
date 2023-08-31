using System.ComponentModel.DataAnnotations;

namespace SecondBook.EF.Database.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string HashedPassword { get; set; }
        [Required]
        public string Role { get; set; }

        public ICollection<Order>? Orders { get; set; } = new List<Order>();

    }
}
