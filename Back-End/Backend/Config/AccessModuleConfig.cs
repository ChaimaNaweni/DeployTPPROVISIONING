using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.ComponentModel;

namespace Backend.Config
{
    /**************************************
     *  configuration class the relationship
     *  between the Module entity and 
     *  Access entitie
     * 
     * 
     * ********************/
    internal class AccessModuleConfig : IEntityTypeConfiguration<Module>
    {
        public void Configure(EntityTypeBuilder<Module> builder)
        {

            builder.HasMany(e => e.Accesss).WithOne(e => e.module).HasForeignKey(e => e.ModuleId);
        }


    }
}