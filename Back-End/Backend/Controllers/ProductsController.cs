using Backend.DbContextBD;
using Backend.Models;
using Backend.Requests;
//using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting.Internal;
using ServiceStack.Text;
using System.Net.Http.Headers;

namespace Backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        private readonly DataContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;
       

        public ProductsController(DataContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
           
    }

               /**************************************
               * 
               * Add New Product with Upload Image
               * 
               * ***************/

        [HttpPost("addNewProduct")]
        public async Task<ActionResult<Product>> Create(ProductAddRequest request)
        {
            if (_context.Products.Any(u => u.ProductName == request.ProductName))
            {
                return BadRequest("Product already exists.");
            }

            var product = new Product
            {
                ProductName = request.ProductName,
                ProductVersion = request.ProductVersion,
                Description = request.Description,

                LastModificatedDate = request.LastModificatedDate,
                CreatedDate = request.CreatedDate = DateTime.Now,
                CodeProduct = Guid.NewGuid(),
                ProductStatus=request.ProductStatus,
              


            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(request);
        }



        /**************************************
               * 
               * Display All Products
               * 
               * ***************/

        [HttpGet("GetAllProducts")]
        public async Task<ActionResult<List<Product>>> index()
        {
            return Ok(await _context.Products.ToListAsync());
        }

        /**************************************
               * 
               * Display One Product
               * 
               * ***************/
        [HttpGet("{id} GetProductByOne") ]
        public async Task<ActionResult<Product>> GetById(int id)
        {
            var product = await _context.Products.FindAsync(id);

            return Ok(product);
        }

        /**************************************
               * 
               * Update Product
               * 
               * ***************/


        [HttpPut("UpdateProduct/{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, ProductUpdateRequest request)
        {
            var findProduct = await _context.Products.FindAsync(id);

            if (findProduct == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            findProduct.ProductName = request.ProductName;
            findProduct.ProductVersion = request.ProductVersion;
           
            findProduct.Description = request.Description;
       
            findProduct.ProductStatus = request.ProductStatus;
           
            findProduct.LastModificatedDate = request.LastModificatedDate = DateTime.Now;



            _context.Entry(findProduct).State = EntityState.Modified;

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

            return Ok(findProduct);
        }


        /**************************************
               * 
               * Delete Product
               * 
               * ***************/

        [HttpDelete("DeleteProduct/{id}")]

        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Products == null)
            {
                return Problem("Entity set 'MyDbContext.Products'  is null.");
            }
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }


       // [HttpGet("{productId}/activmodules")]
        //public async Task<ActionResult<IEnumerable<ProductModule>>> GetProductModules(int productId)
       // {
            // retrieve all modules for the specified product ID
           // var modules = await _context.ProductModules
           //     .Where(pm => pm.ProductId == productId)
               // .Include(pm => pm.Module)
                   // .ThenInclude(m => m.License)
                //.Select(pm => pm.Module)
                   // .ToListAsync();
    
            // convert modules to a DTO class for serialization
          //  var moduleDtos = modules.Select(m => new ProductModule
           // {
                //ModuleId = m.ModuleId,
                //ModuleName = m.ModuleName,
                //LicenseKey = m.License.LicenseKey
           // });

           // return Ok(moduleDtos);
        
    }
}
