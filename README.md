# GestorPeliculas

API RESTful para la gestión de películas, desarrollada con .NET 8 y Entity Framework Core.

## Características

- CRUD de películas (Crear, Leer, Actualizar, Eliminar)
- Arquitectura por capas (API, Aplicación, Dominio, Infraestructura)
- Uso de DTOs para transferencia de datos
- Documentación automática con Swagger
- Configuración CORS para permitir consumo desde frontend
- Acceso a datos con Entity Framework Core y SQL Server
- Interfaz grafica web simple

## Tecnologías

- .NET 8
- C# 12
- Entity Framework Core
- SQL Server
- Swagger/OpenAPI
- HTML/CSS(BOOTSTRAP)/JS

  ## Uso

- Accede a la documentación Swagger en: `https://localhost:5001/swagger`
- Ejemplo de endpoints:
  - `GET /api/peliculas` - Listar todas las películas
  - `POST /api/peliculas` - Crear nueva película
  - `PUT /api/peliculas/{id}` - Actualizar película
  - `DELETE /api/peliculas/{id}` - Eliminar película
    
 
> Personaliza los campos como el nombre del repositorio, la cadena de conexión y los endpoints según tu implementación.
