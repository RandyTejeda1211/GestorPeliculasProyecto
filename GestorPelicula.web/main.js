const cardSection = document.getElementById("card-section");
const modalContent = document.getElementById("modal-content");
const carouselInner = document.getElementById("carousel-inner");

fetch("https://localhost:7016/api/Pelicula")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    
    
    const cardHtml = data
  .map((product, index) => `
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
  `)
  .join("");



    cardSection.innerHTML = cardHtml;

    document.querySelectorAll('[data-bs-toggle="modal"]').forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.currentTarget.getAttribute("data-index");
        const product = data[index];

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
      </div>
    </div>
  </div>
`;

      });
    });

    const filterproduct = data.slice(0, 3);
    const carouselItem = filterproduct
      .map(
        (product, index) => `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <div class="d-flex justify-content-center" style="background-color: #f8f9fa; height: 300px;">
          <img src="${
            product.cartelPelicula
          }" class="d-block" style="object-fit: contain; max-height: 100%; max-width: 100%;" alt="${
          product.titulo
        }">
        </div>
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded px-3">
          <h5>${product.titulo}</h5>
          <p>${product.genero}</p>
        </div>
      </div>
    `
      )
      .join("");

    carouselInner.innerHTML = carouselItem;
  });
