//     //https://es.stackoverflow.com/questions/509866/retorno-de-objeto-obtenido-con-fetch-en-javascript
//     //https://www.youtube.com/watch?v=PNr8-JDMinU
//     //https://lenguajejs.com/javascript/peticiones-http/fetch/
//     //https://www.freecodecamp.org/espanol/news/como-usar-async-await-para-escribir-un-codigo-mejor-en-javascript/
//     //https://midu.dev/como-resolver-todas-las-promesas-javascript/
//     //https://medium.com/pragmatic-programmers/using-promise-allsettled-to-fetch-multiple-r-esources-3fc44d1c0cff

const recuperarIdPersonaje = (paramId) => {
    //https://developer.mozilla.org/en-US/docs/Web/API/Location/search
    let queryString = window.location.search;
    let idPersonaje = new URLSearchParams(queryString).get(paramId);
    //console.log(idPelicula);
    return idPersonaje;
};

const cargarPeliculasActor = (idActor, tagContainer, fromYear = '2020') => {

    let endpointSearch = `https://api.themoviedb.org/3/person/${idActor}/movie_credits?api_key=df84b4caeb498b71ff8908c6118a2cfc&language=es-ES`;

    fetch(endpointSearch)
        .then(response => response.json())
        .then(data => {
            //console.log(peliculas);
            let divPeliculas = document.querySelector(tagContainer);
            //console.log(divPeliculas);
            // let peliculas = data.cast.slice(0, numPeliculas);
            let peliculas = data.cast.filter(peli => peli.release_date >= fromYear);
            //console.log(peliculas);

            peliculas.forEach(pelicula => {
                //console.log(pelicula);
                if (pelicula.backdrop_path) {
                    let div = document.createElement('div');
                    div.classList.add('profile-block', 'profile-detail-block', 'd-flex', 'flex-wrap', 'align-items-center', 'mt-3');
                    div.innerHTML += `
                                <div class="d-flex mb-3 mb-lg-0 mb-md-0">
                                    <img src="https://image.tmdb.org/t/p/w500/${pelicula.backdrop_path}"
                                        class="profile-block-image img-fluid" alt="">

                                    <p>
                                        ${pelicula.title}
                                        <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                        <strong>${pelicula.popularity}k</strong>
                                    </p>
                                </div>

                                <ul class="social-icon ms-lg-auto ms-md-auto">
                                    <li class="social-icon-item">
                                        <a href="#" class="social-icon-link bi-instagram"></a>
                                    </li>

                                    <li class="social-icon-item">
                                        <a href="#" class="social-icon-link bi-twitter"></a>
                                    </li>

                                    <li class="social-icon-item">
                                        <a href="#" class="social-icon-link bi-facebook"></a>
                                    </li>
                                </ul>
                                `;

                    divPeliculas.appendChild(div);
                }

            });

        })
        .catch(error => console.log(error));
};

const cargarDetallePersonaje = (idPersonaje) => {

    let endpointSearch = `https://api.themoviedb.org/3/person/${idPersonaje}?api_key=df84b4caeb498b71ff8908c6118a2cfc&language=es-ES`;
    //console.log(endpointSearch)

    fetch(endpointSearch)
        .then(response => response.json())
        .then(personaje => {
            //console.log(personaje);
            let contenedor = document.querySelector('.detalle');
            let homePage = '#';
            if (personaje.homepage != null){
                homePage = personaje.homepage;
            }

            contenedor.innerHTML = `    
                            <div class="col-lg-3 col-12">
                                <div class="custom-block-icon-wrap">
                                    <div class="custom-block-image-wrap custom-block-image-detail-page">
                                        <img src="https://image.tmdb.org/t/p/w500/${personaje.profile_path}"
                                            class="custom-block-image img-fluid" id=${personaje.id} alt="">
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-9 col-12">
                                <div class="custom-block-info">
                                     <a href="${homePage}">
                                        <h2 class="mb-2">${personaje.name}</h2>
                                    </a>

                                    <p>${personaje.biography}</p>

                                    <div class="custom-block-top d-flex mb-1">

                                        <small class="ms-auto">Fecha nacimiento <span class="badge">${personaje.birthday}</span></small>
                                        <small class="ms-auto">Lugar de nacimiento <span class="badge">${personaje.place_of_birth}</span></small>
                                        <small class="ms-auto">Popularidad <span class="badge">${(personaje.popularity)} K</span></small>

                                    </div>

                                    <h3 class="mt-5">Películas</h3>
                                    <div class="peliculas">
                                    </div>
                                </div>
                            </div>
							`;

            cargarPeliculasActor(personaje.id, '.peliculas');

            //addEventClickTagLStorage(`.heart-${uuidPelicula}`, personaje.id);
        })

        .catch(error => console.log(error));
}
cargarDetallePersonaje(recuperarIdPersonaje('idPersonaje'));
