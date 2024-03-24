$(document).ready(function (){
    //Solicitud ajax para el menu desplegable de sucursales
    $.ajax({
        url: '/SeleccionarSucursal',
        dataType: 'json',
        success: function(nombresSucursales) {
            //APARTADO DE SELECCION DE SUCURSALES EN INDEX.JSP
            let array = [];
            //Recorremos el json 'nombresSucursales' para obtener cada nombre de cada sucursal
            nombresSucursales.forEach(function(nombre){
                //Agregamos contenido html al arreglo por cada nombre
                array.push(`<option value="${nombre}">${nombre}</option>`)
            });
            //Declaramos una variable que contiene todos los elementos html agregados al arreglo
            let nombres = array.toString();
            //Agregamos los elementos a un contenedor de id 'buscar-sucursales'
            $('#seleccionar-sucursales').append(nombres);
        }
    });

    //Solicitud ajax para la cartelera inicial
    $.ajax({
        url : '/CarteleraInicio',
        dataType: 'json',
        success : function (peliculasJSON){
            let array = [];
            //Recorremos el json 'peliculasJSON' para obtener los datos de cada pelicula
            peliculasJSON.forEach(function(pelicula){
                //Declaramos un string para determinar la url del poster en la cartelera
                let poster;
                switch (pelicula.nombre){
                    case 'Ant-man and the Wasp: Quantumanía' :
                        poster = 'img/ant-man.jpg';
                        break;
                    case 'La Ballena' :
                        poster = 'img/ballena.jpg';
                        break;
                    case 'Barbie' :
                        poster = 'img/barbie.webp';
                        break;
                    case 'Blue Beetle' :
                        poster = 'img/blue-beetle.jpg';
                        break;
                    case 'Dungeons & Dragons: Honor entre Ladrones' :
                        poster = 'img/dungeons-and-dragons.jpg';
                        break;
                    case 'Guardianes de la Galaxia Volumen 3' :
                        poster = 'img/guardianes-de-la-galaxia.jpg';
                        break;
                    case 'Indiana Jones y el Día del Destino' :
                        poster = 'img/indiana-jones.webp';
                        break;
                    case 'John Wick Capítulo 4':
                        poster = 'img/john-wick.jpg';
                        break;
                    case 'Super Mario Bros. La Película' :
                        poster = 'img/mario.jpeg';
                        break;
                    case 'Oppenheimer' :
                        poster = 'img/oppenheimer.jpg';
                        break;
                    case '¡Shazam! La Furia de los Dioses' :
                        poster = 'img/shazam.jpg';
                        break;
                    default :
                        poster = 'img/spider-man.jpeg';
                        break;
                }
                //Declaramos un string que servira para agregar elementos a la cartelera
                let cartelera =
                    '<div class="carta"> ' +
                    `   <a href="VerInfoPeliculaServlet?pelicula=${pelicula.nombre}?formato=${pelicula.formato}" class="carta-enlace">` +
                    '      <div class="carta-imagen">' +
                    `          <img src="${poster}" alt = ""/>` +
                    '      </div>' +
                    '      <div class="carta-texto">' +
                    `          <p>${pelicula.nombre}</p>` +
                    `          <p>${pelicula.clasificacion}</p>` +
                    `          <p>${pelicula.genero}</p>` +
                    `          <p>${pelicula.formato}</p>` +
                    '      </div>' +
                    '   </a>' +
                    '</div>';

                array.push(cartelera);
            });

            //Declaramos una variablq ue contiene todos los elementos html agregados al arreglo
            let cartelera = array.join('');
            //Agregamos los elementos al contenedor de id '#cartelera-inicial'
            $('#cartelera-inicial').append(cartelera);
            console.log("Se agregan las cartas correctamente")
        }
    });


    $('#seleccionar-sucursal-form').submit(function (e){
        e.preventDefault();

        //Solicitud ajax para visualizar la cartelera de una determinada sucursal
        $.ajax({
            url : '/SucursalServlet',
            dataType : 'json',
            method : 'post',
            data: { sucursal: $('#seleccionar-sucursales').val() },
            success : function (sucursalJSON){
                console.log(sucursalJSON);
                let array = [];

                //Foreach para iterar sobre las salas de la sucursal
                sucursalJSON.salas.forEach(function (sala){
                    console.log(sala.numero);
                    //Foreach para iterar sobre la programacion de la sala
                    sala.programacion.forEach(function (programacion){
                        console.log('Pelicula: ' + programacion.pelicula.nombre);
                        let poster;
                        switch (programacion.pelicula.nombre){
                            case 'Ant-man and the Wasp: Quantumanía' :
                                poster = 'img/ant-man.jpg';
                                break;
                            case 'La Ballena' :
                                poster = 'img/ballena.jpg';
                                break;
                            case 'Barbie' :
                                poster = 'img/barbie.webp';
                                break;
                            case 'Blue Beetle' :
                                poster = 'img/blue-beetle.jpg';
                                break;
                            case 'Dungeons & Dragons: Honor entre Ladrones' :
                                poster = 'img/dungeons-and-dragons.jpg';
                                break;
                            case 'Guardianes de la Galaxia Volumen 3' :
                                poster = 'img/guardianes-de-la-galaxia.jpg';
                                break;
                            case 'Indiana Jones y el Día del Destino' :
                                poster = 'img/indiana-jones.webp';
                                break;
                            case 'John Wick Capítulo 4':
                                poster = 'img/john-wick.jpg';
                                break;
                            case 'Super Mario Bros. La Película' :
                                poster = 'img/mario.jpeg';
                                break;
                            case 'Oppenheimer' :
                                poster = 'img/oppenheimer.jpg';
                                break;
                            case '¡Shazam! La Furia de los Dioses' :
                                poster = 'img/shazam.jpg';
                                break;
                            default :
                                poster = 'img/spider-man.jpeg';
                                break;
                        }

                        let horarios = programacion.pelicula.horarios.map(function (horario) {
                            return `<option value="${horario}">${horario}</option>`;
                        }).join('');

                        const html =
                            '<div class="cartelera my-5">' +
                            '   <div class="cartelera-img">' +
                            `        <img src="${poster}" alt="poster de la pelicula"/>` +
                            '   </div>' +
                            '   <div class="cartelera-info">' +
                            '        <div class="separador my-4">' +
                            '             <p>' +
                            '                 <span class="cartelera-info-titulo">Función: </span>' +
                            `                 ${programacion.pelicula.nombre}` +
                            '             </p>' +
                            '             <p>' +
                            '                 <span class="cartelera-info-titulo">Formato: </span>' +
                            `                 ${programacion.pelicula.formato}` +
                            '             </p>' +
                            '             <p>' +
                            '                 <span class="cartelera-info-titulo">Género: </span>' +
                            `                 ${programacion.pelicula.genero}` +
                            '             </p>' +
                            '             <p>' +
                            '                 <span class="cartelera-info-titulo">Clasificación: </span>' +
                            `                 ${programacion.pelicula.clasificacion}` +
                            '             </p>' +
                            '             <p>' +
                            '                 <span class="cartelera-info-titulo">Sala: </span>' +
                            `                 ${programacion.numeroSala}` +
                            '             </p>' +
                            '        </div>' +
                            '        <div class="mt-3">' +
                            '            <form action="ComprarEntradasServlet" method="post">' +
                            '               <select name="horario" id="horario" class="form-control">' +
                            `                   ${horarios}` +
                            '               </select>' +
                            `               <input type="hidden" name="pelicula" value="${programacion.pelicula.nombre}"/>` +
                            `               <input type="hidden" name="formato" value="${programacion.pelicula.formato}"/>` +
                            `               <input type="hidden" name="sucursal" value="${sucursalJSON.nombre}"/>` +
                            `               <input type="hidden" name="sala" value="${sala.numero}"/>` +
                            '               <input type="hidden" name="action" value="1"/>' +
                            '               <input type="submit" value="Comprar Entradas" class="btn btn-primary mt-3"/>' +
                            '            </form>' +
                            '        </div>' +
                            '   </div>' +
                            '</div>';
                        array.push(html);
                    });
                });

                const cartelera = $('#cartelera-sucursal');

                $('#cartelera-inicial').empty();
                cartelera.empty();

                const sucursal = array.join('');
                console.log("Se agrega la cartelera de la sucursal correctamente");
                cartelera.append(sucursal);
            }
        });
    });

    $('#buscar-pelicula').click(function (e){
        e.preventDefault();

        let form = $('#busqueda-pelicula-form');

        form.css('display','flex');
    });
    $('#cancelar-busqueda').click(function (e){
        e.preventDefault();

        let form = $('#busqueda-pelicula-form');

        form.css('display','none');
    });

    let valorAdulto = 0;
    let valorTerceraEdad = 0;

    $('#btn-continuar').click(function (e) {
        e.preventDefault();

        if(valorAdulto === 0){
            valorAdulto = parseInt($('#adultos').val());
        }
        if(valorTerceraEdad === 0){
            valorTerceraEdad = parseInt($('#terceraEdad').val());
        }

        console.log("Adultos:", valorAdulto, "Tercera Edad:", valorTerceraEdad);

        if (valorAdulto === 0 && valorTerceraEdad === 0) {
            alert("Selecciona la cantidad de tickets");
            return;
        }

        if (valorAdulto + valorTerceraEdad > 10) {
            alert("La cantidad total de asientos no puede exceder 10");
            return;
        }

        $('#reservar-asientos').show();

        $.ajax({
            url: 'ReservarAsientos?action=buscar',
            dataType: 'json',
            method: 'get',
            success: function (asientos) {
                // Agrega esta línea para evitar la redirección automática
                e.stopPropagation();
                console.log(asientos);
                generarAsientos(asientos);
            }
        });
    });

    let seleccionadosFijo = [];
    let seleccionados = 0;

    function generarAsientos(asientos){
        let letrasFilas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        let contenedor = $('#asientos');

        let cantidadSeleccionados = parseInt($('#terceraEdad').val()) + parseInt($('#adultos').val());

        for (let i = 0; i < 8; i++) { // 8 filas
            for (let j = 0; j < 5; j++) { // 5 columnas
                let letra = letrasFilas[i];
                let numero = j + 1;
                let idAsiento = letra + '-' + numero;
                let boton = $('<button>').attr('id', idAsiento).addClass('btn asiento');

                if (asientos.includes(idAsiento)) {
                    boton.addClass('btn-danger').prop('disabled', true);
                    boton.html('<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-armchair-off" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 13a2 2 0 1 1 4 0v4m-2 2h-14a2 2 0 0 1 -2 -2v-4a2 2 0 1 1 4 0v2h8.036" /><path d="M5 11v-5a3 3 0 0 1 .134 -.89m1.987 -1.98a3 3 0 0 1 .879 -.13h8a3 3 0 0 1 3 3v5" /><path d="M6 19v2" /><path d="M18 19v2" /><path d="M3 3l18 18" /></svg>');
                } else {
                    boton.addClass('btn-success');
                    boton.html('<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-armchair" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 11a2 2 0 0 1 2 2v2h10v-2a2 2 0 1 1 4 0v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z" /><path d="M5 11v-5a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v5" /><path d="M6 19v2" /><path d="M18 19v2" /></svg>');
                }

                boton.on('click', function (e) {
                    e.preventDefault(); // Evitar que el botón actúe como enlace
                    if ($(this).hasClass('btn-success')) {
                        $(this).removeClass('btn-success').addClass('btn-warning');
                        seleccionados++;
                        seleccionadosFijo.push($(this).attr('id'));
                        if (seleccionados === cantidadSeleccionados) {
                            setDisable(seleccionadosFijo);
                        }
                    }
                });

                contenedor.append(boton);
            }
        }
    }

    function setDisable(seleccionadosFijo) {
        $('.asiento').each(function () {
            if ($(this).hasClass('btn-success')) {
                if (!seleccionadosFijo.includes($(this).attr('id'))) {
                    $(this).prop('disabled', true);
                }
            }
        });
    }

    function segundaVuelta(adultos, terceraEdad) {
        let cantidadSeleccionados = parseInt(adultos) + parseInt(terceraEdad);

        seleccionados = 0;
        seleccionadosFijo = [];

        $('.asiento').each(function () {
            $(this).on('click', function (e) {
                e.preventDefault();

                if (seleccionados === cantidadSeleccionados) {
                    setDisable(seleccionadosFijo);
                } else {
                    seleccionados++;
                    seleccionadosFijo.push($(this).attr('id'));
                }
            });
        });
    }

    $('#resetear').click(function () {
        $('.asiento.btn-success').removeClass('btn-warning').addClass('btn-success').prop('disabled',false);
        $('.asiento.btn-warning').removeClass('btn-warning').addClass('btn-success');
        $('#demo').addClass('btn-warning');
        $(this).addClass('btn-warning');
        let adulto = $('#adultos').val(valorAdulto);
        let terceraEdad = $('#terceraEdad').val(valorTerceraEdad);

        segundaVuelta(adulto,terceraEdad);
    });

    $('#enviar').click(function (e){
        let asientosJSON = JSON.stringify(seleccionadosFijo);

        $.ajax({
            url: '/ReservarAsientos',
            method : 'post',
            contentType: 'application/json',
            data: asientosJSON,
            success: function (response){
                console.log(response);
            }
        });
    });
});