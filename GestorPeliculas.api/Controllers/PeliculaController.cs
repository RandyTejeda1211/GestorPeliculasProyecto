using GestorPelicula.aplicasion.DTO;
using GestorPelicula.aplicasion.InterfacesServicios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace GestorPeliculas.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeliculaController : ControllerBase
    {

        private readonly IPeliculaServices _services;
        public PeliculaController(IPeliculaServices services)
        {
            _services = services;
        }
        [HttpPost]
        public async Task<IActionResult> create([FromBody] CreatePeliculaDTO createPelicula)
        {
            await _services.CrearPelicula(createPelicula);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> obtenerTodo() => Ok(await _services.ObtenerPeliculas());

        [HttpPut]
        public async Task<IActionResult> actualizar([FromBody] UpdatePeliculaDTO updatePeliculaDTO)
        {
            await _services.Actualizar(updatePeliculaDTO);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> eliminar(int id)
        {
            await _services.EliminarPelicula(id);
            return Ok();
        }


    }
}
