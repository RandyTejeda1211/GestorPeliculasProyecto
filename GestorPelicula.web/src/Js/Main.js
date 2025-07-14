
const cardMovieContainer = document.getElementById("cardMovieContainer");

fetch("https://localhost:7016/api/Pelicula")
    .then(response =>{
        if(!response.ok)
            throw new Error("Error en la peticion")
        return response.json();
    })
    .then(data =>{
        const cardHtml = data.map((pelicula, index) =>`
            
        `).join('');
       ;
    })
    .catch(err =>{
        console.error("Ocurrio un error", err)
    })