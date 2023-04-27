using Backend.DbContextBD;
using Backend.Models;
using Backend.Requests;
//using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AccessController : ControllerBase
    {

        private readonly DataContext _context;

        public AccessController(DataContext context)
        {
            _context = context;
        }

        /**************************************
              * 
              * Add  new Access 
              * 
              * ***************/



        [HttpPost("addNewAccess")]
        public async Task<ActionResult<Access>> Create(AccessAddRequest request)
        {
            foreach (int moduleId in request.ModuleIds)
            {

                var access = new Access
                {
                    AccessName = request.AccessName,
                    ProductId = request.ProductId,
                    ModuleId = moduleId,
                    ModuleIds=request.ModuleIds,
                    CreatedDate = request.CreatedDate,
                    LastModificatedDate = request.LastModificatedDate = DateTime.Now,
                CreatedBy = request.CreatedBy
                };
                _context.Accesss.Add(access);
            }
            return Ok(new { Message = "Access Added succesfully" });
        }
        private bool AccessExists(int id)
        {
            return _context.Accesss.Any(e => e.AccessId == id);
        }
        /**************************************
         * 
         * Display All Accesss
         * 
         * ***************/
        [HttpGet("GetAllAccess")]
        public async Task<ActionResult<List<Access>>> index()
        {
            return Ok(await _context.Accesss.ToListAsync());
        }

        /**************************************
        * 
        * Display One Access
        * 
        * ***************/
        [HttpGet("{id} GetAccessByOne")]
        public async Task<ActionResult<Access>> GetById(int id)
        {
            var access = await _context.Accesss.FindAsync(id);

            return Ok(access);
        }
        /**************************************
         * 
         * Update Access
         * 
         * ***************/
        [HttpPut("UpdateAccess/{id}")]
        public async Task<ActionResult<Access>> UpdateAccess(int id, AccessUpdateRequest request)
        {
            var findAccess = await _context.Accesss.FindAsync(id);

            if (findAccess == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            findAccess.AccessName = request.AccessName;

            findAccess.LastModificatedDate = request.LastModificatedDate = DateTime.Now;
            findAccess.CreatedBy= request.CreatedBy;

            findAccess.LastModificatedDate = request.LastModificatedDate =DateTime.Now;


            _context.Entry(findAccess).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                ModelState.AddModelError("", "Unable to save change. " +
                        "Try Again, if you have problem persists, " +
                        "Contact your system administrator");
            }

            return Ok(findAccess);
        }

        /**************************************
         * 
         * Delete Access
         * 
         * ***************/

        [HttpDelete("DeleteAccess/{id}")]

        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Accesss == null)
            {
                return Problem("Entity set 'MyDbContext.Accesss'  is null.");
            }
            var access = await _context.Accesss.FindAsync(id);
            if (access != null)
            {
                _context.Accesss.Remove(access);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}

