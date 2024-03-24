function mostrarMensajeError(mensaje) {
    const errorContainer = document.getElementById("errorContainer");
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerHTML = `<strong>${mensaje}</strong>`;
    errorContainer.style.display = "block";
}


function ocultarMensajeError() {
    const errorContainer = document.getElementById("errorContainer");
    errorContainer.style.display = "none";
}
//Usuario
function validarFormulario1() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    const nombreCompleto = document.getElementById("nombre_Completo").value;
    const dui = document.getElementById("dui").value;
    const direccion = document.getElementById("direccion").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;

    if (!login || !password || !nombreCompleto || !dui || !direccion || !email || !telefono) {
        mostrarMensajeError("Por favor, complete todos los campos.");
        return false;
    }

    if (!/^\d{8}-\d$/.test(dui)) {
        mostrarMensajeError("El campo 'DUI' debe tener el formato ########-#.");
        return false;
    }


    if (!/^\d{4}-\d{4}$/.test(telefono)) {
        mostrarMensajeError("El campo 'Teléfono' debe tener el formato ####-####.");
        return false;
    }

    if (!email.endsWith("@gmail.com")) {
        mostrarMensajeError("El correo electrónico debe ser de dominio 'gmail.com'.");
        return false;
    }

    return true;
}

//Pelicula
function validarFormulario2() {
    const nombrePelicula = document.getElementById("nombre_pelicula").value;
    const genero = document.getElementById("genero").value;
    const clasificacion = document.getElementById("clasificacion").value;
    const formatoProyeccion = document.getElementById("formato_proyeccion").value;

    if (!nombrePelicula || !genero || !clasificacion || !formatoProyeccion) {
        mostrarMensajeError("Por favor, complete todos los campos.");
        return false;
    }

   
    
    return true;
}

//Sala
function validarFormulario3() {
    const numeroSala = document.getElementById("numeroSala").value;
    const horarioProyeccion = document.getElementById("horarioProyeccion").value;
    const fechaProyeccion = document.getElementById("fechaProyeccion").value;

    if (!numeroSala || !horarioProyeccion || !fechaProyeccion) {
        mostrarMensajeError("Por favor, complete todos los campos.");
        return false;
    }

    // Agregar las validaciones específicas para el formulario 3 aquí.
    // Por ejemplo, puedes validar el formato del número de sala, el horario y la fecha.

    // Ejemplo de validación de número de sala: debe ser un número entero positivo.
    if (!/^\d+$/.test(numeroSala) || parseInt(numeroSala) <= 0) {
        mostrarMensajeError("El campo 'Número de Sala' debe ser un número entero positivo.");
        return false;
    }

    // Ejemplo de validación de horario: debe ser en el formato HH:MM:SS.
    if (!/^\d{2}:\d{2}:\d{2}$/.test(horarioProyeccion)) {
        mostrarMensajeError("El campo 'Horario de Proyección' debe tener el formato HH:MM:SS.");
        return false;
    }

    // Ejemplo de validación de fecha: debe ser en el formato YY-MM-DD.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaProyeccion)) {
        mostrarMensajeError("El campo 'Fecha de Proyección' debe tener el formato YYYY-MM-DD.");
        return false;
    }


    return true;
}

//Sucursal
function validarFormulario4() {
    const nombreSucursal = document.getElementById("nombre_sucursal").value;
    const gerente = document.getElementById("gerente").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;

    if (!nombreSucursal || !gerente || !direccion || !telefono) {
        mostrarMensajeError("Por favor, complete todos los campos.");
        return false;
    }

    // Validación del formato de teléfono: debe tener el formato ####-####.
    if (!/^\d{4}-\d{4}$/.test(telefono)) {
        mostrarMensajeError("El campo 'Teléfono' debe tener el formato ####-####.");
        return false;
    }

    // Agregar otras validaciones específicas según tus necesidades.

    return true;
}
