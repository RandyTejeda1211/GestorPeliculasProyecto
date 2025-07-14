const cardSection = document.getElementById("card-section");
const modalContent = document.getElementById("modal-content");
const carouselInner = document.getElementById("carousel-inner");

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    // Generar las tarjetas dinámicamente
    const cardHtml = data
      .map(
        (product, index) => `
      <div class="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch">
        <div class="card h-100 py-2 px-2 shadow" style="height: 300px; overflow: hidden;">
          <div class="d-flex align-items-center justify-content-center" style="height: 140px; background-color: #f8f9fa;">
            <img src="${product.image}" alt="${
          product.title
        }" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-truncate" title="${product.title}">${
          product.title
        }</h5>
            <p class="card-text small text-truncate" title="${
              product.description
            }">${product.description.substring(0, 80)}...</p>
            <p class="card-text fw-bold small">$${product.price}</p>
            <button class="btn btn-primary btn-sm mt-auto" data-bs-toggle="modal" data-bs-target="#productModal" data-index="${index}">Show</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    cardSection.innerHTML = cardHtml;

    document.querySelectorAll('[data-bs-toggle="modal"]').forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.currentTarget.getAttribute("data-index");
        const product = data[index];

        modalContent.innerHTML = `
          <div class="modal-header">
            <h5 class="modal-title">${product.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-5 text-center mb-3 mb-md-0">
                <img src="${product.image}" alt="${product.title}" style="max-height: 300px; max-width: 100%; object-fit: contain;">
              </div>
              <div class="col-md-7">
                <p><strong>Categoría:</strong> ${product.category}</p>
                <p><strong>Precio:</strong> $${product.price}</p>
                <p>${product.description}</p>
                <div class="col gap-2 ">
                  <button class="btn btn-outline-info">
                  <img src="./assets/card-credit-icon.svg" alt="">
                  Agg to car</button>
                  <button class="btn btn-primary">Buy Now</button>
                </div>
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
            product.image
          }" class="d-block" style="object-fit: contain; max-height: 100%; max-width: 100%;" alt="${
          product.title
        }">
        </div>
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded px-3">
          <h5>${product.title}</h5>
          <p>$${product.price}</p>
        </div>
      </div>
    `
      )
      .join("");

    carouselInner.innerHTML = carouselItem;
  });
