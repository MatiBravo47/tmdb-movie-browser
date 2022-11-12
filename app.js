const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
let pagina = 1;

btnAnterior.addEventListener("click", ()=>{
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();  
    }
});

btnSiguiente.addEventListener("click", ()=>{
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();  
    }
});

const cargarPeliculas = async()=>{

    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${pagina}`);
        console.log(respuesta);

        if(respuesta.status === 200){

            const datos = await respuesta.json();

            let peliculas = "";
            datos.results.forEach(pelicula => {
                peliculas += `
                        <div class="card col-12 col-sm-6 col-lg-3 text-white bg-dark">
                            <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                            <h3 class="card-title">${pelicula.title} </h3>
                            <p class="overview">${pelicula.overview}</p>
                        </div> 
                `;
            });

            document.getElementById("contenedor").innerHTML = peliculas;
        }

        else if(respuesta.status === 401){ console.log("Key incorrecta");}
        else if(respuesta.status === 404){ console.log("no disponible");}
        else { console.log("no tengo idea del error");}
    }

    catch(error){
        console.log(error.message);
    }

}

cargarPeliculas();