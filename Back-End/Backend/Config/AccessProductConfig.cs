using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.ComponentModel;
namespace Backend.Config
{
    /**************************************
    * 
    * 
    * configuration class the relationship
    *  between the Access entity and 
    *  Product entitie
    * 
    * 
    * ********************/
    internal class AccessProductConfig : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {

            builder.HasMany(e => e.Accesss).WithOne(e => e.product).HasForeignKey(e => e.ProductId);
        }


    }

}







