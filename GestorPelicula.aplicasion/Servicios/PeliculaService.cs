using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GestorPelicula.aplicasion.DTO;
using GestorPelicula.aplicasion.InterfacesServicios;
using GestorPelicula.dominio.InterfacesRepositorio;
using GestorPelicula.dominio.Modelos;

namespace GestorPelicula.aplicasion.Servicios
{
    public class PeliculaService : IPeliculaServices
    {
        private readonly IPeliculaRepositorio _peliculaRepositorio;
        public PeliculaService(IPeliculaRepositorio peliculaRepositorio)
        {
            _peliculaRepositorio = peliculaRepositorio;
        }
        public async Task Actualizar(GetPeliculaDTO peliculas)
        {
            var pelicula = await _peliculaRepositorio.ObtenerPorID(peliculas.Id);

            pelicula.Titulo = peliculas.Titulo;
            pelicula.Genero = peliculas.Genero;
            pelicula.Director = peliculas.Director;
            pelicula.Calificacion = peliculas.Calificacion;
            pelicula.CartelPelicula = peliculas.CartelPelicula;
            pelicula.UrlPelicula = peliculas.UrlPelicula;

            await _peliculaRepositorio.Actualizar(pelicula);
        }

        public async Task CrearPelicula(CreatePeliculaDTO peliculas)
        {
            var pelicula = new Peliculas
            {
                Titulo = peliculas.Titulo,
                Genero = peliculas.Genero,
                Director = peliculas.Director,
                Calificacion = peliculas.Calificacion,
                CartelPelicula = peliculas.CartelPelicula,
                UrlPelicula = peliculas.UrlPelicula
            };
            await _peliculaRepositorio.CrearPelicula(pelicula);
        }

        public async Task EliminarPelicula(int id)
        {
            await _peliculaRepositorio.EliminarPelicula(id);
        }

        public async Task<IEnumerable<GetPeliculaDTO>> ObtenerPeliculas()
        {
            var peliculas = await _peliculaRepositorio.ObtenerPeliculas();
            return peliculas.Select(p => new GetPeliculaDTO
            {
                Id = p.Id,
                Titulo = p.Titulo,
                Genero = p.Genero,
                Director = p.Director,
                Calificacion = p.Calificacion,
                CartelPelicula = p.CartelPelicula,
                UrlPelicula = p.UrlPelicula
            });

        }

        public async Task<GetPeliculaDTO> ObtenerPorID(int id)
        {
            var peliculas = await _peliculaRepositorio.ObtenerPorID(id);
            return new GetPeliculaDTO
            {
                Id = peliculas.Id,
                Titulo = peliculas.Titulo,
                Genero = peliculas.Genero,
                Director = peliculas.Director,
                Calificacion = peliculas.Calificacion,
                CartelPelicula = peliculas.CartelPelicula,
                UrlPelicula = peliculas.UrlPelicula
            };
        }
    }
}
