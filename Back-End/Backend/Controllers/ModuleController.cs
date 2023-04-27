using Azure.Core;
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
    public class ModuleController : ControllerBase
    {

        private readonly DataContext _context;

        public ModuleController(DataContext context)
        {
            _context = context;
        }



        /**************************************
        * 
        * Add new Module
        * 
        * ***************/

        [HttpPost("addNewModule")]
        public async Task<ActionResult<Module>> Create(ModuleAddRequest request)
        {




            var module = new Module
            {
                ModuleName = request.ModuleName,
                Description = request.Description,
                ModulePackage = request.ModulePackage,
                LastModificatedDate = request.LastModificatedDate = DateTime.Now,
                CreatedDate = request.CreatedDate,
                ModuleStatut = request.ModuleStatut,
              


            };


            _context.Modules.Add(module);
            await _context.SaveChangesAsync();

            
            return Ok(new { Message = "Module Added succesfuly" });
        }


        private bool ModuleExists(int id)
        {
            return _context.Modules.Any(e => e.ModuleId == id);
        }



        /**************************************
               * 
               * Display All Modules
               * 
               * ***************/
        [HttpGet("GetAllModules")]
        public async Task<ActionResult<List<Module>>> index()
        {
            return Ok(await _context.Modules.ToListAsync());
        }

        /**************************************
               * 
               * Display One Module
               * 
               * ***************/
        [HttpGet("{id} GetModuleByOne")]
        public async Task<ActionResult<Module>> GetById(int id)
        {
            var module = await _context.Modules.FindAsync(id);

            return Ok(module);
        }


               /**************************************
               * 
               * UpDate Module
               * 
               * ***************/

        [HttpPut("UpdateModule/{id}")]
        public async Task<ActionResult<Module>> UpdateModule(int id, ModuleUpdateRequest request)
        {
            var findModule = await _context.Modules.FindAsync(id);

            if (findModule == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            findModule.ModuleName = request.ModuleName;
            findModule.Description = request.Description;
            findModule.ModulePackage = request.ModulePackage;

            findModule.ModuleStatut = request.ModuleStatut;

            findModule.LastModificatedDate = request.LastModificatedDate = DateTime.Now;


            _context.Entry(findModule).State = EntityState.Modified;

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

            return Ok(findModule);
        }


        /**************************************
               * 
               * Delete Modules
               * 
               * ***************/
        [HttpDelete("DeleteModule/{id}")]

        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Modules == null)
            {
                return Problem("Entity set 'MyDbContext.Module'  is null.");
            }
            var module = await _context.Modules.FindAsync(id);
            if (module != null)
            {
                _context.Modules.Remove(module);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}

