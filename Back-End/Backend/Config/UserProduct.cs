
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.ComponentModel;


internal class UserProduct : IEntityTypeConfiguration<Product>
{
    /**************************************
   *  configuration class the relationship
   *  between the User entity and 
   *  Product entitie
   * 
   * 
   * ********************/
    public void Configure(EntityTypeBuilder<Product> builder)
    {

        builder.HasMany(e => e.Users).WithOne(e => e.product).HasForeignKey(e => e.ProductId);
    }

}

