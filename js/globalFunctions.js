//Función que añade el evento click a una equita y crea, añade o borra la película selecionada en el click de esa etiqueta del localStorage de peliculas favoritas
let addEventClickTagLStorage = (atributo, idPelicula, recargar = false) => {
    //console.log(atributo);
    let lblFavorite = document.querySelector(atributo);
    //console.log(lblFavorite);

    lblFavorite.addEventListener('click', (e) => {
        e.preventDefault();

        let pelisFavoritas = [];
        let plsFtsLocalStorage = localStorage.getItem('pelisFavoritas');

        //console.log(plsFtsLocalStorage)
        //Comprobar si existe el parámetro
        if (plsFtsLocalStorage) {
            //Si el parámetro exite, hay que añadir o eliminar la película seguún corresponda
            pelisFavoritas = JSON.parse(plsFtsLocalStorage);
            //console.log(pelisFavoritas)
            //console.log(typeof pelisFavoritas)

            //Comprobar si existe
            if (pelisFavoritas.find(peli => peli == idPelicula)) {
                //console.log('Ya es favorita')
                pelisFavoritas = pelisFavoritas.filter(peli => peli != idPelicula);
                plsFtsLocalStorage = JSON.stringify(pelisFavoritas);
                localStorage.setItem('pelisFavoritas', plsFtsLocalStorage);
            }
            else {
                //console.log('Nueva favorita')
                pelisFavoritas.push(idPelicula);
                plsFtsLocalStorage = JSON.stringify(pelisFavoritas);
                localStorage.setItem('pelisFavoritas', plsFtsLocalStorage);
            }
        }
        else {
            //Si el parámetro no existe se crea
            //console.log('Crear storage');
            pelisFavoritas.push(idPelicula);
            plsFtsLocalStorage = JSON.stringify(pelisFavoritas);
            localStorage.setItem('pelisFavoritas', plsFtsLocalStorage);
        }
        
        if(recargar){
            location.reload();
        }
        
    });
};

//Función global que permite cargar un listado relacionado con un id de película a partir de una película, el tipo de listado y el contenedor destino
const cargarListPeliculasId = (idPelicula, listado, atributoContenedor, recargar = false) => {

    const contenedor = document.querySelector(atributoContenedor);

    //let peliculas = [];
    let peliculas = '';

    let endpointSearch = `https://api.themoviedb.org/3/movie/${idPelicula}/${listado}?api_key=df84b4caeb498b71ff8908c6118a2cfc&language=es-ES&page=1`;

    fetch(endpointSearch)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            //console.log(typeof data);

            data.results.forEach(pelicula => {
                if (pelicula.poster_path) {
                    let uuidPelicula = uuid.v4();
                    //console.log(uuidPelicula);
                    const div = document.createElement('div');
                    div.classList.add('col-lg-4', 'col-12', 'mb-4', 'mb-lg-0',  'mt-2');
                    div.innerHTML = `
                                    <div class="custom-block custom-block-full">
                                        <div class="custom-block-image-wrap">
                                            <a href="detail.html?idPelicula=${pelicula.id}">
                                                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="custom-block-image img-fluid"
                                                    alt="">
                                            </a>
                                        </div>

                                        <div class="custom-block-info">
                                            <h5 class="mb-2">
                                                <a href="detail.html?idPelicula=${pelicula.id}">
                                                    ${pelicula.title}
                                                </a>
                                            </h5>

                                            <div id ="psnjPrincipal-${uuidPelicula}">

                                            </div>

                                            <p class="mb-0">${pelicula.overview.substring(0, 120)} ...</p>

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

                                        <div class="social-share d-flex flex-column ms-auto">
                                            <a href="#" class="badge ms-auto" id="heart-${uuidPelicula}">
                                                <i class="bi-heart"></i>
                                            </a>

                                            <a href="#" class="badge ms-auto">
                                                <i class="bi-bookmark"></i>
                                            </a>
                                        </div>
                                    </div> 
                            `;
                    contenedor.appendChild(div);

                    cargarPersonajePrincipal(pelicula.id, `#psnjPrincipal-${uuidPelicula}`);
                    //console.log('Entrar en addEventClick')
                    //console.log(pelicula.id)
                    addEventClickTagLStorage(`#heart-${uuidPelicula}`, pelicula.id, recargar);
                }
            });
        })
        .catch(error => console.log(error));
}


const cargarListPeliculas = (lista, atributoContenedor = '.results', page = '1') => {


    //let endpointSearch = `https://api.themoviedb.org/3/movie/550?api_key=df84b4caeb498b71ff8908c6118a2cfc&language=es-ES`
    if (lista == 'popular' || lista == 'upcoming' || lista == 'top_rated') {
        endpointSearch = `https://api.themoviedb.org/3/movie/${lista}?api_key=df84b4caeb498b71ff8908c6118a2cfc&language=es-ES&page=${page}`;
    }
    else {
        endpointSearch = `https://api.themoviedb.org/3/search/movie?api_key=df84b4caeb498b71ff8908c6118a2cfc&language=es-ES&query=${lista}`;
    }


    fetch(endpointSearch)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            let contenedor = document.querySelector(atributoContenedor);
            let endpointSearch = '';
            //console.log(contenedor)
            //console.log(atributoContenedor);

            if (atributoContenedor == '.results') {
                contenedor.innerHTML = ``;
            }
            //console.log(contenedor);

            data.results.forEach(pelicula => {
                //console.log(pelicula);
                // console.log(pelicula.title);
                // console.log(pelicula.release_date === undefined);
                if (pelicula.poster_path) {
                    let uuidPelicula = uuid.v4();
                    //console.log(uuidPelicula);
                    

                    // 1) Agregamos el contenido HTML
                    
                    const div = document.createElement("div");
                    div.classList.add("col-lg-3");
                    div.classList.add("col-md-6");
                    div.classList.add("col-12");
                    div.classList.add("mb-4");
                    div.classList.add("mb-lg-0");
                    div.classList.add("elimina");
                    div.innerHTML = `
                                    <div class="custom-block custom-block-overlay">
                                        <div class="custom-block-image-wrap">
                                            <a href="detail.html?idPelicula=${pelicula.id}" class="custom-block-image-wrap">
                                                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"
                                                    class="custom-block-image img-fluid" alt="">
                                            </a>                                                                                       
                                        </div>
                    
                                        <div class="custom-block-info custom-block-overlay-info">
                                            <h5 class="mb-1">
                                                <a href="detail.html?idPelicula=${pelicula.id}">
                                                    ${pelicula.title}
                                                </a>
                                            </h5>
                                            <p class="badge mb-0">${pelicula.vote_average}</p>
                                            <p class="badge mb-0">${pelicula.release_date != undefined ? (pelicula.release_date).substring(0, 4) : pelicula.release_date}</p>
                                            <p class="badge mb-0">${pelicula.vote_count}K</p>
                                            
                                            <a href="#" class="badge ms-auto p-2 heart" id="heart-${uuidPelicula}">
                                                <i class="bi-heart"></i>
                                            </a>

                                            <a href="#" class="badge ms-auto p-2">
                                                <i class="bi-bookmark"></i>
                                            </a> 
                                        </div>
                                    </div> 
                                    `;


                // 2) agrega el contenido al HTML (variable div)
                //contenedor.innerHTML = div;
                contenedor.appendChild(div);

                // 3) Agregar evento de click en el botón "Agregar a favoritos" de cada card
                //console.log(pelicula.id);
                //Los identificadores únicos no pueden comenzar por digito, por esa razón es necesario incluirle un texto al id
                addEventClickTagLStorage(`#heart-${uuidPelicula}`, pelicula.id);
                    
                }
            });

        })
        .catch(error => console.log(error))
}


let recuperaTrailer = (idPelicula, tagContedor) => {
    let endpointSearch = `https://api.themoviedb.org/3/movie/${idPelicula}/videos?api_key=df84b4caeb498b71ff8908c6118a2cfc&language=en-US`;

    fetch(endpointSearch)
        .then(response => response.json())
        .then(data => {
            //console.log(data.results)
           
            let contenedor = document.querySelector(tagContedor);
            //console.log(contenedor);
            let trailers = data.results.filter(video => video.type == 'Trailer' && video.official == true);
            //console.log(trailers);
            contenedor.src = `https://www.youtube.com/embed/o5LulFd6YF_Z23je`;

            if (trailers.length > 0){
                trailers.forEach(trailer => {
                    //console.log(contenedor);
                    //console.log(`https://www.youtube.com/embed/${trailer.key}`);
                    contenedor.src = `https://www.youtube.com/embed/${trailer.key}`;
                });
            }
            else{
                // console.log('No hay video oficial');
                trailers = data.results.filter(video => video.type == 'Trailer');
                //console.log(trailers)
                if (trailers.length > 0) {
                    trailers.forEach(trailer => {
                        //console.log(contenedor);
                        //console.log(`https://www.youtube.com/embed/${trailer.key}`);
                        contenedor.src = `https://www.youtube.com/embed/${trailer.key}`;
                    });
                }
                else{
                    trailers = data.results;
                    //console.log(trailers);

                    // trailers.forEach(trailer => {
                    //     //console.log(contenedor);
                    //     //console.log(`https://www.youtube.com/embed/${trailer.key}`);
                    //     contenedor.src = `https://www.youtube.com/embed/${trailer.key}`;
                    // });
                    if (trailers.length > 0){
                        for (let i = 0; i < 1; i++) {
                            console.log(trailers[i].key);
                            //contenedor.src = `https://www.youtube.com/embed/${trailer.key}`;
                        }
                    }

                }
            }

            //console.log(contenedor.src);

        })
        .catch(error => console.log(error));
};

let cargarPersonajePrincipal = (idPelicula, tagContainer) => {
    let endpointSearch = `https://api.themoviedb.org/3/movie/${idPelicula}/credits?api_key=df84b4caeb498b71ff8908c6118a2cfc&language=es-ES`;

    fetch(endpointSearch)
        .then(response => response.json())
        .then(data => {

            let divPersonajes = document.querySelector(tagContainer);
            //console.log(divPersonajes)

            //let reparto = data.cast.slice(0, 1);
            let reparto = data.cast.filter(personaje => personaje.order == 0);
            //console.log(reparto);

            reparto.forEach(personaje => {
                //console.log(personaje);
                if (personaje.profile_path) {
                    //console.log(personaje.name);
                    let div = document.createElement('div');
                    div.classList.add('profile-block', 'd-flex');
                    div.innerHTML += `
                                    <img src="https://image.tmdb.org/t/p/w500/${personaje.profile_path}" class="profile-block-image img-fluid"
                                        alt="">
                    
                                    <p>
                                        ${personaje.name}
                                        <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                        <strong>${personaje.character}</strong>
                                    </p>
                                `;

                    divPersonajes.appendChild(div);
                }

            });

        })
        .catch(error => console.log(error));
};
