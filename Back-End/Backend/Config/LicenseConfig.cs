using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.ComponentModel;



internal class LicenseConfig : IEntityTypeConfiguration<LicenseHistory>
{
    public void Configure(EntityTypeBuilder<LicenseHistory> builder)
    {

       // builder.HasMany(e => e.licenses).WithOne(e => e.licenseHistory).HasForeignKey(e => e.LicenseHistoryId);
    }


}

