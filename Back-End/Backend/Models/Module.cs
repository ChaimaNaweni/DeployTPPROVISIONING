using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{



    [Table("Modules")]
    public class Module
    {
        internal object products;

        [Key]
        public int ModuleId { get; set; }
        public string ModuleName { get; set; }
        public string Description { get; set; }
        public string ModulePackage { get; set; }
        public virtual IList<Access> Accesss { get; set; }

        // license Module OneToOne 
        public virtual License License { get; set; }
        public bool ModuleStatut { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public DateTime LastModificatedDate { get; set; } = DateTime.Now;

        public string CreatedBy { get; set; }

       
    

    }
}
