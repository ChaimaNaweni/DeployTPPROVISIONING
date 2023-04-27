using Backend.DbContextBD;
using Backend.Models;
using Backend.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LicenseController : Controller
    {
        private readonly DataContext _context;

        public LicenseController(DataContext context)
        {
            _context = context;
        }


        /**************************************
         * 
         * Add new License 
         * 
         * ***************/
        [HttpPost("addLicense")]

        public async Task<IActionResult> Create([Bind("AccessId,LicenseKey,StartDate,EndDate,LicenseStatus,RenewMode" +
            "CreatedDate,LastModificatedDate,CreatedBy")] License license, int UserId, int ProductId, int activationMonths)
        {
            // exist User Par guid 

            if (_context.Users.FirstOrDefault(x => x.UserId == UserId) == null)
            {
                return Problem("Entity set 'MyDbContext.User'  is null.");
            }
            // exist produits par guid 
            if (_context.Products.FirstOrDefault(x => x.ProductId == ProductId) == null)
            {
                return Problem("Entity set 'MyDbContext.Product'  is null.");
            }

            /// creation key 
            var User = _context.Users.Find(UserId);
            var Product = _context.Products.Find(ProductId);
            license.CreatedDate = DateTime.Now;
            license.LastModificatedDate = DateTime.Now;
            license.LicenseKey = User.CodeUser.ToString() + Product.CodeProduct.ToString() + "0101";
            switch (activationMonths)
            {
                case 3:
                    license.EndDate = DateTime.Today.AddMonths(3);
                    //license.RenewMode = RenewMode.Quarterly.ToString();
                    break;
                    
                case 6:
                    license.EndDate = DateTime.Today.AddMonths(6);
                    //license.RenewMode = RenewMode.Biannually.ToString();
                    break;
                case 12:
                    license.EndDate = DateTime.Today.AddMonths(12);
                    //license.RenewMode = RenewMode.Annually.ToString();
                    break;
                default:
                    return BadRequest("Invalid activation period selected.");
            }
            
            if (ModelState.IsValid)
            {
                _context.Add(license);
                await _context.SaveChangesAsync();

            }
            return Ok(license);
        }


        /**************************************
        * 
        * Display All Licenses
        * 
        * ***************/

        [HttpGet("GetAllLicense")]
        public async Task<ActionResult<List<License>>> index()
        {
            return Ok(await _context.Licenses.ToListAsync());
        }


        /**************************************
         * 
         * Display One License 
         * 
         * ***************/

        [HttpGet("{id} GetLicenseByOne")]
        public async Task<ActionResult<License>> GetById(int id)
        {
            var license = await _context.Licenses.FindAsync(id);

            return Ok(license);
        }


        /**************************************
        * 
        * Update License 
        * 
        * ***************/

        [HttpPut("UpdateLicense/{id}")]
        public async Task<ActionResult<License>> UpdateLicense(int id, LicenseUpdateRequest license)
        {
            var findLicense = await _context.Licenses.FindAsync(id);

            if (findLicense == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
        
            findLicense.StartDate = license.StartDate;
            findLicense.EndDate = license.EndDate;
            findLicense.LicenseStatus = license.LicenseStatus;
            findLicense.RenewMode = license.RenewMode;
            findLicense.LastModificatedDate = license.LastModificatedDate = DateTime.Now;
           

            _context.Entry(findLicense).State = EntityState.Modified;

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

            return Ok(findLicense);
        }

        private bool LicenceExists(int id)
        {
            return _context.Licenses.Any(e => e.LicenseId == id);
        }



        /**************************************
          * 
          * Delete License 
          * 
          * ***************/
        [HttpDelete("DeleteLicense/{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Licenses == null)
            {
                return Problem("Entity set 'MyDbContext.License'  is null.");
            }
            var license = await _context.Licenses.FindAsync(id);
            if (license != null)
            {
                _context.Licenses.Remove(license);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

    }

    
}