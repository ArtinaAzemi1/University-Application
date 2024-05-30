using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Data;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfessorController : ControllerBase
    {
        private readonly UniDBContext _context;

        public ProfessorController(UniDBContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<Professor>>> GetProfessors()
        {
            if (_context.Professors == null)
            {
                return NotFound();
            }
            return await _context.Professors.ToListAsync();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Professor>> GetProfessor(int id)
        {
            if (_context.Professors == null)
            {
                return NotFound();
            }
            var professor = await _context.Professors.FindAsync(id);
            if (professor == null)
            {
                return NotFound();
            }
            return professor;
        }

        [HttpPost]

        public async Task<ActionResult<IEnumerable<Professor>>> PostProfessor(Professor professor)
        {
            _context.Professors.Add(professor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProfessor), new { id = professor.Id }, professor);
        }

        [HttpPut("{id}")]

        public async Task<ActionResult<Professor>> PutProfessor(int id, Professor professor)
        {
            if (id != professor.Id)
            {
                return BadRequest();
            }
            _context.Entry(professor).State = EntityState.Modified;

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

        public async Task<ActionResult> DeleteProfessor(int id)
        {
            if (_context.Professors == null)
            {
                return NotFound();
            }
            var professor = await _context.Professors.FindAsync(id);

            if (professor == null)
            {
                return NotFound();
            }
            _context.Professors.Remove(professor);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
