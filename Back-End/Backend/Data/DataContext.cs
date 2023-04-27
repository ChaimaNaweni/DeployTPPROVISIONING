using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Security.Principal;
using Backend.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using Backend.Config;

namespace Backend.DbContextBD
{
    public class DataContext : DbContext
    {


        public DataContext(DbContextOptions<DataContext> options)
   : base(options)
        { }

        /**************************************
               * 
               * Display All Modules
               * 
               * ***************/

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Access> Accesss { get; set; }
        public DbSet<License> Licenses { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<LicenseHistory> LicensesHistory { get; set; }
     

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<FileUpload>()
            //.HasKey(f => f.Id);
            // modelBuilder.ApplyConfiguration(new LicenseConfig());
            modelBuilder.ApplyConfiguration(new AccessProductConfig());
            modelBuilder.ApplyConfiguration(new AccessModuleConfig());
            modelBuilder.ApplyConfiguration(new UserProduct());
            modelBuilder.ApplyConfiguration(new ModuleLicenseConfig());

        }

        /**************************************
               * 
               * Data Base Configuration 
               * 
               * ***************/
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
                    {
                optionsBuilder.UseNpgsql("Server=localhost;Port=5432;" +
                "User Id=postgres;Password=Ch*238980;Database=TP-Provisioning;");



        }

    }
}