using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Data;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly UniDBContext _context;

        public StudentController(UniDBContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            return await _context.Students.Include(x => x.Department).ToListAsync();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            var student = await _context.Students.Include(x => x.Department).FirstOrDefaultAsync(s => s.Id == id);
            if (student == null)
            {
                return NotFound();
            }
            return student;
        }

        [HttpPost]

        public async Task<ActionResult<IEnumerable<Student>>> PostStudent(Student student, int departmentId)
        {
            // Kontrollo nëse ka ndonjë departament me id 1 (Computer Science)
            var department = await _context.Department.FirstOrDefaultAsync(d => d.DepartmentId == departmentId);

            if (department == null)
            {
                // Kthe një gabim nëse nuk gjendet departamenti i Computer Science
                return BadRequest($"Department with id {departmentId} not found.");
            }

            // Lidh studentin me departamentin e Computer Science
            student.DepartmentId = department.DepartmentId;

            // Shto studentin në bazën e të dhënave
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, [FromBody] Student s)
        {
            // Gjej studentin që do të përditësohet
            var student = await _context.Students.FindAsync(id);

            // Kontrollo nëse studenti ekziston
            if (student == null)
            {
                return NotFound($"Studenti me id {id} nuk u gjet.");
            }

            // Përditëso fushat e studentit në varësi të të dhënave të reja të marrura nga request-i
            //if (!s.Name.IsNullOrEmpty())
            //{
            //    student.Name = s.Name;
            //}
            //
            //if (!s.Surname.IsNullOrEmpty())
            //{
            //    student.Surname = s.Surname;
            //}
            //
            //if (s.BirthDate != null)
            //{
            //    student.BirthDate = s.BirthDate;
            //}
            //
            //if (!s.Gender.IsNullOrEmpty())
            //{
            //    student.Gender = s.Gender;
            //}
            //
            //if (!s.City.IsNullOrEmpty())
            //{
            //    student.City = s.City;
            //}
            //
            //if (!s.Email.IsNullOrEmpty())
            //{
            //    student.Email = s.Email;
            //}
            //
            //// Kontrollo nëse ekziston departamenti
            //if (s.DepartmentId != null)
            //{
            //    student.DepartmentId = s.DepartmentId;
            //}

            _context.Students.Update(student);
            return Ok(student);
        }


        /*[HttpPut("{id}")]

        public async Task<ActionResult<Student>> PutStudent(int id, Student student)
        {
            if (id != student.Id)
            {
                return BadRequest();
            }
            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }*/

        /*[HttpPut("{id}")]
        public async Task<ActionResult<Student>> PutStudent(int id, Student student)
        {
            if (id != student.Id)
            {
                return BadRequest();
            }

            var existingStudent = await _context.Students.FindAsync(id);
            if (existingStudent == null)
            {
                return NotFound();
            }

            // Kontrollo dhe modifiko vetëm fushat që janë ndryshuar
            existingStudent.Name = student.Name;
            existingStudent.Surname = student.Surname;
            existingStudent.BirthDate = student.BirthDate;
            existingStudent.Gender = student.Gender;
            existingStudent.City = student.City;
            existingStudent.Email = student.Email;
            existingStudent.DepartmentId = student.DepartmentId; // Modifikimi i id-së së departamentit

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }*/

        /*[HttpPut("{id}")]
        public async Task<ActionResult<Student>> PutStudent(int id, [FromBody] Student student, int departmentId)
        {
            if (id != student.Id)
            {
                return BadRequest();
            }

            // Kontrollo nëse departamenti ekziston
            var department = await _context.Department.FirstOrDefaultAsync(d => d.DepartmentId == departmentId);
            if (department == null)
            {
                return BadRequest($"Department with id {departmentId} not found.");
            }

            // Gjej studentin ekzistues
            var existingStudent = await _context.Students.FindAsync(id);
            if (existingStudent == null)
            {
                return NotFound();
            }

            // Përditëso fushat e studentit ekzistues
            existingStudent.Name = student.Name;
            existingStudent.Surname = student.Surname;
            existingStudent.BirthDate = student.BirthDate;
            existingStudent.Gender = student.Gender;
            existingStudent.City = student.City;
            existingStudent.Email = student.Email;
            existingStudent.DepartmentId = departmentId; // Përditëso id-në e departamentit

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(existingStudent);
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.Id == id);
        }*/

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteStudent(int id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }
            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
