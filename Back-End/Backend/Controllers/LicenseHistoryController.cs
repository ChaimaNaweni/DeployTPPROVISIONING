using Backend.DbContextBD;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LicenseHistoryController : ControllerBase
    {

        private readonly DataContext _context;

        public LicenseHistoryController(DataContext context)
        {
            _context = context;
        }



        /**************************************
        * 
        * Display All License History
        * 
        * ***************/

        [HttpGet("GetAllLicenseHistory")]
        public async Task<ActionResult<List<LicenseHistory>>> index()
        {
            return Ok(await _context.LicensesHistory.ToListAsync());
        }


        /**************************************
         * 
         * Display One License History
         * 
         * ***************/

        [HttpGet("{id} GetLicenseHistoryByOne")]
        public async Task<ActionResult<LicenseHistory>> GetById(int id)
        {
            var licenseHistory = await _context.LicensesHistory.FindAsync(id);

            return Ok(licenseHistory);
        }



        /**************************************
         * 
         * Delete License History
         * 
         * ***************/


        [HttpDelete("DeleteLicenseHistory/{id}")]

        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.LicensesHistory == null)
            {
                return Problem("Entity set 'MyDbContext.LicenseHistory'  is null.");
            }
            var LicenseHistory = await _context.LicensesHistory.FindAsync(id);
            if (LicenseHistory != null)
            {
                _context.LicensesHistory.Remove(LicenseHistory);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
