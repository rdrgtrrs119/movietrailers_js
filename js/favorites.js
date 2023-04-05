let recuperarStorage = localStorage.getItem('pelisFavoritas');
let lstFavoritas = JSON.parse(recuperarStorage);

const cargarFavorites = () => {
    //console.log(lstFavoritas);

    lstFavoritas.forEach(idPelicula => {
        let contenedor = document.querySelector('.favoritas');

        //console.log(contenedor);
        let endpointSearch = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=df84b4caeb498b71ff8908c6118a2cfc&language=es-ES`;

        fetch(endpointSearch)
            .then(response => response.json())
            .then(pelicula => {
                const div = document.createElement('div');
                div.classList.add('col-lg-6', 'col-12', 'mb-4', 'mb-lg-0', 'mt-3');
                //div.className = 'col-lg-6';
                //div.setAttribute('id', `${pelicula.id }`);
                //div.id = `'${pelicula.id }'`;
                let uuidPelicula = uuid.v4();
                //console.log(uuidPelicula);
                div.innerHTML = `
                                        <div class="custom-block d-flex">
                                            <div class="">
                                                <div class="custom-block-icon-wrap">
                                                    <div class="section-overlay"></div>
                                                    <a href="#" data-bs-toggle="modal" data-bs-target="#ml-${uuidPelicula}" class="custom-block-image-wrap">
                                                        <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="custom-block-image img-fluid" alt="">
                                    
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#ml-${uuidPelicula}" class="custom-block-icon">
                                                            <i class="bi-play-fill"></i>
                                                        </a>
                                                    </a>

                                                    <!-- Modal -->
                                                    <div class="modal fade" id="ml-${uuidPelicula}" tabindex="-1" aria-labelledby="exampleModalLabel-${uuidPelicula}"
                                                        aria-hidden="true">
                                                        <div class="modal-dialog modal-xl">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h1 class="modal-title fs-5" id="exampleModalLabel-${uuidPelicula}">Movie Trailers</h1>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <div class="ratio ratio-16x9">
                                                                        <iframe src="https://www.youtube.com/embed/8RBNHdG35WY" class="youTube-${uuidPelicula}" title="YouTube video"
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
                                                </div>
                                    
                                                <div class="mt-2">
                                                    <a href="detail.html?idPelicula=${pelicula.id}" class="btn custom-btn">
                                                        Detalles
                                                    </a>
                                                </div>
                                            </div>
                                    
                                            <div class="custom-block-info">
                                                <div class="custom-block-top d-flex mb-1">
                                                    <small class="me-4">
                                                        <i class="bi-clock-fill custom-icon"></i>
                                                        ${(pelicula.runtime)} Minutos
                                                    </small>
                                
                                                </div>
                                    
                                                <h5 class="mb-2">
                                                    <a href="detail.html?idPelicula=${pelicula.id}">
                                                        ${pelicula.title}
                                                    </a>
                                                </h5>

                                                <div id ="psnjPrincipal-${uuidPelicula}">

                                                </div>
                                    
                                                <p class="mb-0">${pelicula.overview.substring(0, 40)} ...</p>
                                    
                                                <div class="custom-block-bottom d-flex justify-content-between mt-3">

                                                    <a href="#" class="bi-youtube me-1">
                                                        <span>${(pelicula.vote_count)}k</span>
                                                    </a>

                                                    <a href="#" class="bi-heart me-1">
                                                        <span>${(pelicula.vote_average)}k</span>
                                                    </a>

                                                    <a href="#" class="bi-chat me-1">
                                                        <span>${(pelicula.popularity)}k</span>
                                                    </a>
                                                </div>
                                            </div>
                                    
                                            <div class="d-flex flex-column ms-auto">
                                                <a href="favorites.html" class="badge ms-auto" id="heart-${uuidPelicula}">
                                                    <i class="bi-heart-fill"></i>
                                                </a>
                                    
                                                <a href="#" class="badge ms-auto">
                                                    <i class="bi-bookmark"></i>
                                                </a>
                                            </div>
                                        </div>

                                    `;
                contenedor.appendChild(div);
                
                cargarPersonajePrincipal(pelicula.id, `#psnjPrincipal-${uuidPelicula}`);
                //console.log(pelicula.id);
                //console.log(`.youTube-${uuidPelicula}`);
                recuperaTrailer(pelicula.id, `.youTube-${uuidPelicula}`);

                addEventClickTagLStorage(`#heart-${uuidPelicula}`, pelicula.id, true);
            })
            .catch(error => console.log(error));

    });
}

cargarFavorites();

let indice = Math.floor(Math.random() * lstFavoritas.length);
//console.log(lstFavoritas[indice]);
//Función global que permite cargar un listado concreto a partir de una película, el listado y el contenedor
//cargarListPeliculasId(lstFavoritas[indice],'recommendations', 'recomendadas');
cargarListPeliculasId(lstFavoritas[indice], 'recommendations', '.recomendadas', true);


