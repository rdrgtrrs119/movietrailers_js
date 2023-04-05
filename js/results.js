let listado = '';
let pagina = 1;
let titulo = document.querySelector('.titulo');
let lastPag = '1';

//console.log(window.location)

const recuperarListado = (list) =>{
    let querySelector = window.location.search;
    return new URLSearchParams(querySelector).get(list);
};

listado = recuperarListado('search');
pagina = recuperarListado('page') 

//console.log(listado);
switch (listado) {
    case 'popular':
        titulo.innerText += ' Populares';
        break;
    case 'upcoming':
        titulo.innerText += ' Próximamente';
        break;
    case 'top_rated':
        titulo.innerText += ' Mejor Valoradas';
        break;
    default:
        if (titulo.innerText != 'No hay coincidencias')
            titulo.innerText = `Resultado para ${recuperarListado('search') }`;
        break;
}

cargarListPeliculas(listado, '.results', pagina);

// cargarListPeliculas('popular', 'populares');
// cargarListPeliculas('upcoming', 'proximas');
// cargarListPeliculas('top_rated', 'mejorValoradas');

let cargarPaginacion = (listado, tagContainer) => {

    let contentPags = document.querySelector(tagContainer);

    contentPags.innerHTML += `
                                <li class="page-item">
                                    <a class="page-link" href="results.html?search=${listado}&page=previous" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>

                                <li class="page-item active"><a class="page-link link-1" href="results.html?search=${listado}&page=1">1</a></li>

                                <li class="page-item"><a class="page-link link-..." href="#">...</a></li>

                                <li class="page-item"><a class="page-link link-2" href="results.html?search=${listado}&page=2">2</a></li>

                                <li class="page-item"><a class="page-link link-3" href="results.html?search=${listado}&page=3">3</a></li>

                                <li class="page-item"><a class="page-link link-4" href="results.html?search=${listado}&page=4">4</a></li>

                                <li class="page-item"><a class="page-link link-5" href="results.html?search=${listado}&page=5">5</a></li>

                                <li class="page-item"><a class="page-link" href="results.html?search=${listado}&page=6">6</a></li>

                                <li class="page-item">
                                    <a class="page-link" href="results.html?search=${listado}&page=next" aria-label="Next")">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
    `; 
};


if (listado == 'popular' || listado == 'upcoming' || listado == 'top_rated') {
    //cargarPaginacion(listado, '.pagination');
}
else{
    document.querySelector('.mx-auto').style.display = 'none';
}




let cargarPaginacion2 = (tagContainer, tagPageLink) => {

    let contentPags = document.querySelector(tagContainer);
    let contenedorList = '';

    contentPags.innerHTML += `
                                <li class="page-item">
                                      <a class="page-link" href="#" aria-label="Previous" id="1">
                                        &laquo;
                                    </a>
                                </li>

                                <li class="page-item"><a class="page-link" href="#" id="2">1</a></li>

                                <li class="page-item"><a class="page-link" href="#" id="3">...</a></li>

                                <li class="page-item"><a class="page-link" href="#" id="4">2</a></li>

                                <li class="page-item"><a class="page-link" href="#" id="5">3</a></li>

                                <li class="page-item active"><a class="page-link" href="#" id="6">4</a></li>

                                <li class="page-item"><a class="page-link" href="#" id="7">5</a></li>

                                <li class="page-item"><a class="page-link" href="#" id="8">6</a></li>

                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Next" id="9">
                                        &raquo;
                                    </a>
                                </li>
    `;

    contenedorList = document.querySelectorAll(tagPageLink);
    //console.log(contenedorList);

    contenedorList.forEach(link =>{
        //console.log(link);
        
        link.addEventListener('click', (e) =>{
            e.preventDefault();
            // //console.log(e.target);
            paginar(e.target, contenedorList);
            
        });
    });


};

cargarPaginacion2('.pagination', '.page-link');

let paginar = (e, contentList) =>{
    //console.log(e)
    //console.log(pagina)
    let nPagina = Number(e.innerText);
    if(!Number.isNaN(nPagina)){
        //console.log(nPagina)
        pagina = nPagina;
    }
    else{
        if (pagina == null) {
            pagina = 2;
        }

        if(e.id == 1){
            if(pagina > 1)
                pagina--;
        }
        if (e.id == 9) {
            if(pagina <999)                
                pagina++;
        }
    }

    let a1, a2, a3, a4, a5, a6, a7, a8, a9;
    
    contentList.forEach(etiqueta => {
        switch (etiqueta.id) {
            case '1':
                a1 = etiqueta;
                break;
            case '2':
                a2 = etiqueta;
                break;
            case '3':
                a3 = etiqueta;
                break;
            case '4':
                a4 = etiqueta;
                break;
            case '5':
                a5 = etiqueta;
                break;
            case '6':
                a6 = etiqueta;
                break;
            case '7':
                a7 = etiqueta;
                break;
            case '8':
                a8 = etiqueta;
                break;
            default:
                a9 = etiqueta;
                break;
        }
    });

    //console.log(e.id);
    //console.log(pagina);
    if (e.id >= 6 && pagina <= 998 && (pagina != 4 && pagina > 4)) {
        //console.log('mayor');
        a4.innerText = pagina - 2;
        a5.innerText = pagina - 1;
        a6.innerText = pagina;        
        a7.innerText = pagina + 1;
        a8.innerText = pagina + 2;

        //a6.classList.add('page-link', 'active');
    } else if (e.id < 6){
        if (pagina > 4){
            a4.innerText = pagina - 1;
            a5.innerText = pagina - 2;
            a6.innerText = pagina;
            a7.innerText = pagina + 1;
            a8.innerText = pagina + 2;

        }
        else{
            a4.innerText = 2;
            a5.innerText = 3;
            a6.innerText = 4;
            a7.innerText = 5;
            a8.innerText = 6;
        }
    }

    //console.log(a6);
    cargarListPeliculas(listado, '.results', pagina);
    scroll(0, 0);
};