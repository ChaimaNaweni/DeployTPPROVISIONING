using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{



    [Table("Accesss")]
    public class Access
    {
        [Key]
        public int AccessId { get; set; }
        public string AccessName { get; set; }
       
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public DateTime LastModificatedDate { get; set; } = DateTime.Now;

        public string CreatedBy { get; set; }
      
     
     
        //public int ModuleId { get; set; }
        public List<int> ModuleIds { get; set; }
        public virtual Module module { get; set; }
        public int ProductId { get; set; }

        public virtual Product product { get; set; }
        public int ModuleId { get; internal set; }
    }
}
