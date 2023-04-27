using Backend.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using System.Security.Policy;


[Table("Licenses")]
public class License
{
    [Key]
    public int LicenseId { get; set; }
    public string LicenseKey { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool LicenseStatus { get; set; }
    public string RenewMode { get; set; }
    // public int LicenseHistoryId { get; set;  }
    public int ModuleId { get; set; }
    // public virtual LicenseHistory licenseHistory { get; set; }

    public virtual Backend.Models.Module Module { get; set; }
    public DateTime LastModificatedDate { get; set; }
    public DateTime CreatedDate { get; set; }

    public string  CreatedBy { get; set; }


}
