using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GestorPelicula.aplicasion.DTO;

namespace GestorPelicula.aplicasion.InterfacesServicios
{
    public interface IPeliculaServices
    {
        Task<IEnumerable<GetPeliculaDTO>> ObtenerPeliculas();
        Task<GetPeliculaDTO> ObtenerPorID(int id);
        Task CrearPelicula(CreatePeliculaDTO peliculas);
        Task Actualizar(UpdatePeliculaDTO peliculas);
        Task EliminarPelicula(int id);
    }
}
