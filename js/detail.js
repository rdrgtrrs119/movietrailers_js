//     //https://es.stackoverflow.com/questions/509866/retorno-de-objeto-obtenido-con-fetch-en-javascript
//     //https://www.youtube.com/watch?v=PNr8-JDMinU
//     //https://lenguajejs.com/javascript/peticiones-http/fetch/
//     //https://www.freecodecamp.org/espanol/news/como-usar-async-await-para-escribir-un-codigo-mejor-en-javascript/
//     //https://midu.dev/como-resolver-todas-las-promesas-javascript/
//     //https://medium.com/pragmatic-programmers/using-promise-allsettled-to-fetch-multiple-r-esources-3fc44d1c0cff

const recuperarIdPelicula = (paramId) => {
    //https://developer.mozilla.org/en-US/docs/Web/API/Location/search
    let queryString = window.location.search;
    let idPelicula = new URLSearchParams(queryString).get(paramId);
    //console.log(idPelicula);
    return idPelicula;
};

const cargarReparto = (idPelicula, tagContainer,   numReparto = 5) => {

    let endpointSearch = `https://api.themoviedb.org/3/movie/${idPelicula}/credits?api_key=df84b4caeb498b71ff8908c6118a2cfc&language=es-ES`; 

    fetch(endpointSearch)
        .then(response => response.json())
        .then(data => {
            
            let divPersonajes = document.querySelector(tagContainer);
            let reparto = data.cast.slice(0, numReparto);
            //console.log(reparto);

            reparto.forEach( personaje => {
                //console.log(personaje);
                if(personaje.profile_path){
                    let div = document.createElement('div');
                    div.classList.add('profile-block', 'profile-detail-block', 'd-flex', 'flex-wrap', 'align-items-center', 'mt-3');
                    div.innerHTML += `
                                <div class="d-flex mb-3 mb-lg-0 mb-md-0">
                                    <img src="https://image.tmdb.org/t/p/w500/${personaje.profile_path}"
                                        class="profile-block-image img-fluid" alt="">

                                    <p>
                                        ${personaje.name}
                                        <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                        <strong>${personaje.character}</strong>
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

                    divPersonajes.appendChild(div);
                }
                
            });

        })
        .catch(error => console.log(error));
};

const cargarDetallePelicula = (idPelicula) => {

    let endpointSearch = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=df84b4caeb498b71ff8908c6118a2cfc&language=es-ES`;
    //console.log(endpointSearch)

    fetch(endpointSearch)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            let contenedor = document.querySelector('.detalle');
            // console.log(contenedor)

            let txtGeneros = '';
            let uuidPelicula = uuid.v4();

            txtGeneros += `<small class="ms-auto">Genero: `;
            data.genres.forEach(genero => {
                //console.log(genero.name)
                txtGeneros += `<span class="badge">${genero.name}</span>`;
            });
            txtGeneros += `</small>`;

            //console.log(pelicula.title);
            contenedor.innerHTML = `    
                            <div class="col-lg-3 col-12">
                                <div class="custom-block-icon-wrap">
                                    <div class="custom-block-image-wrap custom-block-image-detail-page">
                                        <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}"
                                            class="custom-block-image img-fluid" id=${data.id} alt="">
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-9 col-12">
                                <div class="custom-block-info">
                                    <div class="custom-block-top d-flex mb-1">
                                        <small>
                                            <i class="bi-clock-fill custom-icon"></i>
                                            ${(data.runtime)} Minutes
                                        </small>

                                        <small class="ms-auto">Valoración <span class="badge">${data.vote_average}</span></small>
                                        <small class="ms-auto">Año <span class="badge">${(data.release_date).substring(0, 4)}</span></small>
                                        <small class="ms-auto">Vista <span class="badge">${(data.vote_count)} K</span></small>

                                    </div>

                                    <h2 class="mb-2">${data.title}</h2>

                                    <p>${data.overview}</p>
                                    ${txtGeneros}                                    
                                    <a href="#" class="badge ms-auto p-2 heart-${uuidPelicula}">
                                        <i class="bi-heart"></i>
                                    </a>

                                    <a href="#" class="badge ms-auto p-2">
                                        <i class="bi-bookmark"></i>
                                    </a>
                                    <h3 class="mt-5">Reparto principal</h3>
                                    <div class="reparto">
                                    </div>
                                </div>
                            </div>
							`;

            cargarReparto(data.id, '.reparto');

            addEventClickTagLStorage(`.heart-${uuidPelicula}`, data.id);
        })

        .catch(error => console.log(error));
}
//cargarDetallePelicula(recuperarIdPelicula('idPelicula'));
//cargarDetallePelicula(recuperarIdPelicula('idPelicula'));

//Función global que permite cargar un listado concreto a partir de una película, el listado y el contenedor
cargarListPeliculasId(recuperarIdPelicula('idPelicula'), 'similar', '.similar');




const cargarDetallePelicula2 = (idPelicula) => {

    let endpointSearch = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=df84b4caeb498b71ff8908c6118a2cfc&language=es-ES`;
    //console.log(endpointSearch)

    fetch(endpointSearch)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            let contenedor = document.querySelector('.detalle');
            // console.log(contenedor)

            let txtGeneros = '';
            let uuidPelicula = uuid.v4();

            txtGeneros += `<small class="ms-auto">Genero: `;
            data.genres.forEach(genero => {
                //console.log(genero.name)
                txtGeneros += `<span class="badge">${genero.name}</span>`;
            });
            txtGeneros += `</small>`;          

            //console.log(pelicula.title);
            contenedor.innerHTML = `    
                            <div class="col-lg-3 col-12">
                                <div class="custom-block-icon-wrap">
                                    <div class="custom-block-image-wrap custom-block-image-detail-page">
                                        <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}"
                                            class="custom-block-image img-fluid" id=${data.id} alt="">
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-9 col-12">
                                <div class="custom-block-info">
                                    <div class="custom-block-top d-flex mb-1">
                                        
                                        <small class="me-4 h5">
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <i class="bi-play"></i>
                                                Reproducir trailer
                                            </a>
                                        </small>
                                                
                                                
                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                            aria-hidden="true">
                                            <div class="modal-dialog modal-xl">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Movie Trailers</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="ratio ratio-16x9">
                                                            <iframe src="https://www.youtube.com/embed/8RBNHdG35WY" class="YouTube" title="YouTube video"
                                                                allowfullscreen></iframe>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Modal -->

                                        <small>
                                            <i class="bi-clock-fill custom-icon"></i>
                                            ${(data.runtime)} Minutes
                                        </small>

                                        <small class="ms-auto">Valoración <span class="badge">${data.vote_average}</span></small>
                                        <small class="ms-auto">Año <span class="badge">${(data.release_date).substring(0, 4)}</span></small>
                                        <small class="ms-auto">Vista <span class="badge">${(data.vote_count)} K</span></small>

                                    </div>

                                    <h2 class="mb-2">${data.title}</h2>

                                    <p>${data.overview}</p>
                                    ${txtGeneros}                                    
                                    <a href="#" class="badge ms-auto p-2 heart-${uuidPelicula}">
                                        <i class="bi-heart"></i>
                                    </a>

                                    <a href="#" class="badge ms-auto p-2">
                                        <i class="bi-bookmark"></i>
                                    </a>
                                    <h3 class="mt-5">Reparto principal</h3>
                                    <div class="reparto">
                                    </div>
                                </div>
                            </div>
							`;

            cargarReparto(data.id, '.reparto');

            recuperaTrailer(data.id, '.YouTube');

            addEventClickTagLStorage(`.heart-${uuidPelicula}`, data.id);
        })

        .catch(error => console.log(error));
}
//cargarDetallePelicula(recuperarIdPelicula('idPelicula'));
cargarDetallePelicula2(recuperarIdPelicula('idPelicula'));