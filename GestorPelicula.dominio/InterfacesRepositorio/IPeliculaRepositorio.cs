using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GestorPelicula.dominio.Modelos;

namespace GestorPelicula.dominio.InterfacesRepositorio
{
    public interface IPeliculaRepositorio
    {
        Task<IEnumerable<Peliculas>> ObtenerPeliculas();
        Task<Peliculas> ObtenerPorID(int id);
        Task CrearPelicula(Peliculas peliculas);
        Task Actualizar(Peliculas peliculas);
        Task EliminarPelicula(int id);
    }
}
