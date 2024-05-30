using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;
using System;
using System.Collections.Generic;
//using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace WebApplication3.Data
{
    public class UniDBContext : DbContext
    {
        public UniDBContext(DbContextOptions<UniDBContext> options) : base(options)
        {

        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Professor> Professors { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<Course> Course { get; set; }
        //public DbSet<Course> Course { get; set; }
    }
}
