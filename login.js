let usuarios = [
    { nombre: "Hugo", contraseña: "123" },
    { nombre: "Admin", contraseña: "123" },
    { nombre: "Marco", contraseña: "1234" },
    { nombre: "Tutor", contraseña: "1234" }
];

const mensajes = {
    usuarioRegistrado: (nombre) => `${nombre} ha sido registrado correctamente.`,
    usuarioExistente: "Este nombre de usuario ya está registrado. Intente con otro.",
    accesoConcedido: (nombre) => `¡Acceso concedido! Bienvenido/a, ${nombre}. ¡Este es tu espacio!`,
    usuarioIncorrecto: "Usuario o contraseña incorrectos.",
    maxIntentos: "Superaste el máximo de intentos. El acceso ha sido bloqueado. ¡HASTA LA PRÓXIMA!",
    intentosRestantes: (intentos) => `Intentos restantes: ${3 - intentos}`,
    salir: "Has salido del programa. Lo esperamos en una próxima oportunidad.",
    opcionNoValida: "La opción no es válida. Intente de nuevo."
};

// Función para mostrar mensajes
function mostrarMensaje(elemento, mensaje, esError = false) {
    let mensajeElemento = document.getElementById(elemento);
    mensajeElemento.style.color = esError ? 'red' : 'green';
    mensajeElemento.textContent = mensaje;
}

// Función para mostrar el formulario seleccionado y ocultar el menú
function mostrarFormulario(formularioId, titulo) {
    document.getElementById("menu").style.display = "none";  // Ocultar el menú
    document.getElementById("tituloPrincipal").textContent = titulo;  // Cambiar el título
    document.getElementById(formularioId).style.display = "block";  // Mostrar el formulario seleccionado
}

// Función para volver al menú principal
function volverAlMenu() {
    document.getElementById("registroForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("menu").style.display = "block";  // Volver a mostrar el menú
    document.getElementById("tituloPrincipal").textContent = "Registro e Inicio de Sesión";  // Restaurar título
}

// Función para registrar un usuario
function registrarUsuario() {
    const nombre = document.getElementById("nombreRegistro").value;
    const contraseña = document.getElementById("contraseñaRegistro").value;

    if (!nombre || !contraseña) {
        mostrarMensaje('mensajeRegistro', "Todos los campos son obligatorios", true);
        return;
    }

    let usuarioExiste = usuarios.some(usuario => usuario.nombre === nombre);

    if (usuarioExiste) {
        mostrarMensaje('mensajeRegistro', mensajes.usuarioExistente, true);
    } else {
        usuarios.push({ nombre, contraseña });
        mostrarMensaje('mensajeRegistro', mensajes.usuarioRegistrado(nombre));
        // Limpiar campos después de registrar
        document.getElementById("nombreRegistro").value = "";
        document.getElementById("contraseñaRegistro").value = "";
    }
}

// Función para iniciar sesión
function iniciarSesion() {
    const nombre = document.getElementById("nombreLogin").value;
    const contraseña = document.getElementById("contraseñaLogin").value;
    let intentosFallidos = 0;
    let accesoConcedido = false;

    if (!nombre || !contraseña) {
        mostrarMensaje('mensajeLogin', "Todos los campos son obligatorios", true);
        return;
    }

    let usuarioEncontrado = usuarios.find(usuario => usuario.nombre === nombre && usuario.contraseña === contraseña);

    if (usuarioEncontrado) {
        mostrarMensaje('mensajeLogin', mensajes.accesoConcedido(nombre));
    } else {
        intentosFallidos++;
        mostrarMensaje('mensajeLogin', `${mensajes.usuarioIncorrecto} ${mensajes.intentosRestantes(intentosFallidos)}`, true);
        
        // Limpiar campos si el inicio de sesión falla
        document.getElementById("nombreLogin").value = "";
        document.getElementById("contraseñaLogin").value = "";

        if (intentosFallidos >= 3) {
            mostrarMensaje('mensajeLogin', `${mensajes.usuarioIncorrecto} ${mensajes.maxIntentos}`, true);
            document.getElementById("formLogin").style.display = "none";  // Ocultar el formulario si excede el límite de intentos
        }
    }
}
