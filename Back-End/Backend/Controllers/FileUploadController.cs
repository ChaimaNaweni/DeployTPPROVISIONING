using Backend.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.FileProviders;
using Backend.DbContextBD;
using Microsoft.CodeAnalysis;
using System.Drawing;
using System.Text;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        public static IWebHostEnvironment _WebHostEnvironment;
        public FileUploadController(IWebHostEnvironment webHostEnvironment)
        {
            _WebHostEnvironment = webHostEnvironment;
        }

        /// <summary>
        /// Upload file
        /// </summary>
        /// <param name="file"></param>
        /// <returns> Upload file </returns>
        /// <response code="201"> uploaded  Successfullys </response>
        /// <response code="400"> Not Valid</response>   
        ///  <response code = "401"> Unauthorized  without authority or permission </response>
        ///  <response code = "403"> Not permitted or allowed</response>
        [HttpPost]
        public async Task<string> Post([FromForm] FileUploadRequest fileUpload)
        {
            try
            {
                var builder = new StringBuilder(116);

                Random _random = new Random();
                char offset = true ? 'a' : 'A';
                const int lettersOffset = 26; // A...Z or a..z: length=26

                for (var i = 0; i < 116; i++)
                {
                    var @char = (char)_random.Next(offset, offset + lettersOffset);
                    builder.Append(@char);
                }

                string GenCode = false ? builder.ToString().ToLower() : builder.ToString();

                string path = "";
                var tesst = fileUpload;
                if (fileUpload.file.Length > 0)
                {
                    path = "\\uploads\\" + Guid.NewGuid()+"\\"  + fileUpload.file.FileName;
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    using (FileStream fileStream = System.IO.File.Create(path + fileUpload.file.FileName))
                    {
                        fileUpload.file.CopyTo(fileStream);
                        fileStream.Flush();
                        return path;
                    }
                }
                else return "failed";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        /// <summary>
        /// Get file
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns>Get file</returns>
        /// <response code="200">displayed successfully</response>
        /// <response code="400">Not Valid</response>   
        /// <response code="401">Unauthorized without authority or permission</response>
        /// <response code="403">Not permitted or allowed</response>
        [HttpGet("{fileName}")]
        public async Task<IActionResult> GetFile([FromRoute] string fileName)
        {
            string path = _WebHostEnvironment.WebRootPath + "\\uploads\\";
            var filePath = path + fileName + ".png";
            if (System.IO.File.Exists(filePath))
            {
                Byte[] b = System.IO.File.ReadAllBytes(filePath);
                return File(b, "image/png");
            }
            return (null);
        }

    }
}
