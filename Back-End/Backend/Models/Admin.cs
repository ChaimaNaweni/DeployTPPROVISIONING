
using PasswordGenerator;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.DbContextBD;
namespace Backend.Models
{



    [Table("Admins")]
    public class Admin
    {

        [Key]
        public int AdminId { get; set; }
        [Required]
        public string Email { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }
        
        public string Level { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime? VerifiedAt { get; set; }


        public DateTime SubscribtionDate { get; set; } = DateTime.Now;
        public string PasswordResetToken { get; set; }
        public DateTime? ResetTokenExpires { get; set; }


        public string Username { get; set; }
        public byte[] PasswordHash { get; set; } = new byte[32];
        public byte[] PasswordSalt { get; set; } = new byte[32];
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
     
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public DateTime LastModificatedDate { get; set; } = DateTime.Now;

      


    }
}
