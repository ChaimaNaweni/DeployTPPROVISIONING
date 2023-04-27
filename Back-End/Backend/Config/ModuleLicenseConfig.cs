using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

internal class ModuleLicenseConfig : IEntityTypeConfiguration<Module>
{
    /**************************************
   *  configuration class the relationship
   *  between the Module entity and 
   *  License entitie
   * 
   * 
   * ********************/
    public void Configure(EntityTypeBuilder<Module> builder)
    {
        builder.HasOne(m => m.License)
            .WithOne(l => l.Module)
            .HasForeignKey<License>(l => l.ModuleId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
