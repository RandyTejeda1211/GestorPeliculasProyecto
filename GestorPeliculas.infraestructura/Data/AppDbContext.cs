using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


using GestorPelicula.dominio.Modelos;
namespace GestorPeliculas.infraestructura.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options){}

        public DbSet<Peliculas> peliculas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Peliculas>(entity =>
            {
                entity.ToTable("Pelicula");
                entity.HasKey(x => x.Id);

            });
        }
    }
}
