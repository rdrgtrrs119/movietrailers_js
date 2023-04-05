const btnBuscar = () =>{
    let buscar = document.querySelector('#submit');

    buscar.addEventListener('click', (e) => {
        e.preventDefault();
        let inputBuscar = document.querySelector('#search');
        //console.log(inputBuscar);
        let txtBuscar = inputBuscar.value;
        //console.log(txtBuscar);

        buscarPersonaje(txtBuscar, '.equipo');

    });

};
btnBuscar();


const buscarPersonaje = (nombre = 'Demi', clase) => {
    let contenedor = document.querySelector(clase);

    let endpointSearch = `https://api.themoviedb.org/3/search/person?api_key=df84b4caeb498b71ff8908c6118a2cfc&language=es-ES&query=${nombre}`;

    fetch(endpointSearch)
        .then(response => response.json())
        .then(data => {
            let equipo = '';

            data.results.forEach(persona => {
                //console.log(persona.name);

                if (persona.profile_path){
                    equipo += `
                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 mt-2">
                            <div class="team-thumb bg-white shadow-lg">
                                <a href="results-persons.html?idPersonaje=${persona.id}" class="custom-block-image-wrap" id="${persona.id}">
                                    <img src="https://image.tmdb.org/t/p/w500/${persona.profile_path}"
                                        class="about-image img-fluid" alt="">
                                <a/>

                                <div class="team-info">
                                    <h4 class="mb-2">
                                        ${persona.name}
                                        <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                    </h4>

                                    <span class="badge">${persona.known_for_department}</span>

                                    <span class="badge">${persona.popularity}</span>
                                </div>

                                <div class="social-share">
                                    <ul class="social-icon">
                                        <li class="social-icon-item">
                                            <a href="#" class="social-icon-link bi-twitter"></a>
                                        </li>

                                        <li class="social-icon-item">
                                            <a href="#" class="social-icon-link bi-facebook"></a>
                                        </li>

                                        <li class="social-icon-item">
                                            <a href="#" class="social-icon-link bi-pinterest"></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                `;
                }
            });

            contenedor.innerHTML = equipo;

        })
        .catch(error => console.log(error))
    
};

buscarPersonaje('rock', '.equipo');