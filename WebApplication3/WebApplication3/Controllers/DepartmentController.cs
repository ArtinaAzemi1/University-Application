using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Data;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly UniDBContext _context;

        public DepartmentController(UniDBContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
            if (_context.Department == null)
            {
                return NotFound();
            }
            return await _context.Department.ToListAsync();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            if (_context.Department == null)
            {
                return NotFound();
            }
            var department = await _context.Department.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            return department;
        }

        [HttpPost]

        public async Task<ActionResult<IEnumerable<Department>>> PostDepartment(Department department)
        {
            _context.Department.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDepartment), new { id = department.DepartmentId }, department);
        }

        [HttpPut("{id}")]

        public async Task<ActionResult<Department>> PutDepartment(int id, Department department)
        {
            if (id != department.DepartmentId)
            {
                return BadRequest();
            }
            _context.Entry(department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteDepartment(int id)
        {
            if (_context.Department == null)
            {
                return NotFound();
            }
            var department = await _context.Department.FindAsync(id);

            if (department == null)
            {
                return NotFound();
            }
            _context.Department.Remove(department);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
