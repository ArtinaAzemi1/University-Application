using System.ComponentModel.DataAnnotations;

namespace WebApplication3.Models
{
    public class Professor
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Surname { get; set; }

        public string? BirthDate { get; set; }

        public string? Gender { get; set; }

        public string? City { get; set; }

        public string? Email { get; set; }
    }
}
