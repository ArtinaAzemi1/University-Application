using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication3.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set;  }

        public string? Surname { get; set;  }

        public string? BirthDate { get; set;  }

        public string? Gender { get; set;  }

        public string? City { get; set;  }

        public string? Email { get; set;  }

        public int DepartmentId { get; set; }

        [ForeignKey(nameof(DepartmentId))]
        public virtual Department? Department { get; set;  }


    }
}
