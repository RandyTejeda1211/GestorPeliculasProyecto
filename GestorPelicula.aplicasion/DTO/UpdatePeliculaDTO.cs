using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestorPelicula.aplicasion.DTO
{
    public class UpdatePeliculaDTO
    {
        public int Id { get; set; }
        public string? Titulo { get; set; }
        public string? Genero { get; set; }
        public string? Director { get; set; }
        public byte? Calificacion { get; set; }
        public string? CartelPelicula { get; set; }
        public string? UrlPelicula { get; set; }
    }
}
