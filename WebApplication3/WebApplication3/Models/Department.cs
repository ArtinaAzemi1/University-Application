using System.ComponentModel.DataAnnotations;

namespace WebApplication3.Models
{
    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }

        public string? Name { get; set; }

        public string? DeanName { get; set; }

        public int? StafCount { get; set; }

        //public ICollection<Student> Students { get; set; }
    }
}
