using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GestorPelicula.dominio.InterfacesRepositorio;
using GestorPelicula.dominio.Modelos;
using GestorPeliculas.infraestructura.Data;
using Microsoft.EntityFrameworkCore;

namespace GestorPeliculas.infraestructura.Repositorios
{
    public class PeliculaRepositorio : IPeliculaRepositorio
    {

        private readonly AppDbContext _appDbContext;
        public PeliculaRepositorio(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task Actualizar(Peliculas peliculas)
        {
            _appDbContext.peliculas.Update(peliculas);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task CrearPelicula(Peliculas peliculas)
        {
            _appDbContext.peliculas.Add(peliculas);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task EliminarPelicula(int id)
        {
            var pelicula = await _appDbContext.peliculas.FindAsync(id);
            if (pelicula != null)
                _appDbContext.peliculas.Remove(pelicula);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Peliculas>> ObtenerPeliculas()
        {
            return await _appDbContext.peliculas.ToListAsync();
        }

        public async Task<Peliculas> ObtenerPorID(int id)
        {
            return await _appDbContext.peliculas.FindAsync(id);
        }
    }
}
