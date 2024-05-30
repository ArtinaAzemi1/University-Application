using System.ComponentModel.DataAnnotations;

namespace WebApplication3.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }

        public string? Name { get; set; }

        public string? Semester { get; set; }

        public int? ECTS { get; set; }
    }
}
