using System.ComponentModel.DataAnnotations.Schema;

public class ProductAddRequest
{
    public string ProductName { get; set; }
    public string ProductVersion { get; set; }
    public bool ProductStatus { get; set; }
    public string Description { get; set; }
    public DateTime LastModificatedDate { get; set; }
    public DateTime CreatedDate { get; set; }
    public int ImageId { get; set; }
    public string FileName { get; set; }
    public string LogoFilePath { get; set; }
    [NotMapped]
    public IFormFile Image { get; set; }
}
