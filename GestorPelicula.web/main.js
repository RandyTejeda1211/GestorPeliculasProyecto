const cardSection = document.getElementById("card-section");
const modalContent = document.getElementById("modal-content");
const carouselInner = document.getElementById("carousel-inner");

fetch("https://localhost:7016/api/Pelicula")
  .then((response) => response.json())
  .then((data) => {
    // Mostrar las cards
    const cardHtml = data
      .map(
        (product, index) => `
      <div class="mb-4 d-flex justify-content-center" style="width: 250px;">
        <div class="card h-100 py-2 px-2 shadow" style="height: 300px; width: 100%; overflow: hidden;">
          <div class="d-flex align-items-center justify-content-center" style="height: 140px; background-color: #f8f9fa;">
            <img src="${product.cartelPelicula}" alt="${product.titulo}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-truncate" title="${product.titulo}">${product.titulo}</h5>
            <p class="card-text small text-truncate" title="Calificación: ${product.calificacion}">Calificación: ${product.calificacion}</p>
            <p class="card-text small text-truncate" title="Género: ${product.genero}">Género: ${product.genero}</p>
            <button class="btn btn-primary btn-sm mt-auto" data-bs-toggle="modal" data-bs-target="#productModal" data-index="${index}">Mostrar</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
      if (cardSection) {
        cardSection.innerHTML = cardHtml;
      }
    

    // Eventos para abrir modal y manejar acciones dentro
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.currentTarget.getAttribute("data-index");
        const product = data[index];

        if (modalContent) {
           modalContent.innerHTML = `
          <div class="modal-header">
            <h5 class="modal-title">${product.titulo}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-5 text-center mb-3 mb-md-0">
                <img src="${product.cartelPelicula}" alt="${product.titulo}" style="max-height: 300px; max-width: 100%; object-fit: contain;">
              </div>
              <div class="col-md-7">
                <p><strong>Director:</strong> ${product.director}</p>
                <p><strong>Calificación:</strong> ${product.calificacion}</p>
                <p><strong>Género:</strong> ${product.genero}</p>
                <p><strong>URL Película:</strong> <a href="${product.urlPelicula}" target="_blank">Ver trailer</a></p>
                <button class="btn btn-success" id="btn-update">Actualizar</button>
                <button class="btn btn-danger" id="btn-delete">Eliminar</button>
              </div>
            </div>
          </div>
        `;
        }
        // Mostrar info básica y botones eliminar/actualizar
       

        // Evento eliminar
        document.getElementById("btn-delete").addEventListener("click", () => {
          if (confirm("¿Seguro que quieres eliminar esta película?")) {
            fetch(`https://localhost:7016/api/Pelicula/${product.id}`, {
              method: "DELETE",
            })
              .then((res) => {
                if (res.ok) {
                  alert("Película eliminada correctamente.");
                  location.reload();
                } else {
                  res.json().then((d) => alert(JSON.stringify(d)));
                }
              })
              .catch((err) => console.error("ERROR", err));
          }
        });

        // Evento actualizar: reemplaza modal por formulario
        document.getElementById("btn-update").addEventListener("click", () => {
          modalContent.innerHTML = `
            <div class="modal-header">
              <h5 class="modal-title">Editar: ${product.titulo}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <form id="updateForm">
                <div class="mb-3">
                  <label for="titulo" class="form-label">Título</label>
                  <input type="text" id="titulo" name="titulo" class="form-control" value="${product.titulo}" required>
                </div>
                <div class="mb-3">
                  <label for="genero" class="form-label">Género</label>
                  <input type="text" id="genero" name="genero" class="form-control" value="${product.genero}" required>
                </div>
                <div class="mb-3">
                  <label for="director" class="form-label">Director</label>
                  <input type="text" id="director" name="director" class="form-control" value="${product.director}" required>
                </div>
                <div class="mb-3">
                  <label for="calificacion" class="form-label">Calificación</label>
                  <input type="number" id="calificacion" name="calificacion" class="form-control" min="0" max="10" value="${product.calificacion}" required>
                </div>
                <div class="mb-3">
                  <label for="cartelPelicula" class="form-label">URL Cartel</label>
                  <input type="url" id="cartelPelicula" name="cartelPelicula" class="form-control" value="${product.cartelPelicula}" required>
                </div>
                <div class="mb-3">
                  <label for="urlPelicula" class="form-label">URL Trailer</label>
                  <input type="url" id="urlPelicula" name="urlPelicula" class="form-control" value="${product.urlPelicula}" required>
                </div>
                <button type="submit" class="btn btn-success">Guardar Cambios</button>
              </form>
            </div>
          `;

          // Capturar submit del formulario para actualizar
          document.getElementById("updateForm").addEventListener("submit", (e) => {
            e.preventDefault();

            const updatedProduct = {
              id: product.id,
              titulo: e.target.titulo.value.trim(),
              genero: e.target.genero.value.trim(),
              director: e.target.director.value.trim(),
              calificacion: Number(e.target.calificacion.value),
              cartelPelicula: e.target.cartelPelicula.value.trim(),
              urlPelicula: e.target.urlPelicula.value.trim(),
            };

            fetch("https://localhost:7016/api/Pelicula", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedProduct),
            })
              .then((res) => {
                if (res.ok) {
                  alert("Película actualizada correctamente.");
                  location.reload();
                } else {
                  res.json().then((d) => alert(JSON.stringify(d)));
                }
              })
              .catch((err) => console.error("ERROR", err));
          });
        });
      });
    });

  document.getElementById("formAgregarPelicula").addEventListener("submit", function (e) {
  e.preventDefault();

  const nuevaPelicula = {
    titulo: document.getElementById("titulo").value.trim(),
    genero: document.getElementById("genero").value.trim(),
    director: document.getElementById("director").value.trim(),
    calificacion: Number(document.getElementById("calificacion").value),
    cartelPelicula: document.getElementById("cartelPelicula").value.trim(),
    urlPelicula: document.getElementById("urlPelicula").value.trim()
  };

  fetch("https://localhost:7016/api/Pelicula", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaPelicula)
  })
    .then(res => {
      if (res.ok) {
        alert("Película agregada correctamente.");
        location.reload();
      } else {
        res.json().then(d => alert(JSON.stringify(d)));
      }
    })
    .catch(err => console.error("ERROR:", err));
});


    // Mostrar carousel (igual que antes)
    const filterproduct = data.slice(0, 3);
    const carouselItem = filterproduct
      .map(
        (product, index) => `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <div class="d-flex justify-content-center" style="background-color: #f8f9fa; height: 300px;">
          <img src="${product.cartelPelicula}" class="d-block" style="object-fit: contain; max-height: 100%; max-width: 100%;" alt="${product.titulo}">
        </div>
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded px-3">
          <h5>${product.titulo}</h5>
          <p>${product.genero}</p>
        </div>
      </div>
    `
      )
      .join("");

      if(carouselInner){
        carouselInner.innerHTML = carouselItem;
      }
    
  });
