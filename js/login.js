// Elementos de la interfaz modal
const modalContainer = document.getElementById("modal-container");
const modalAbrir = document.getElementById("modal-abrir");
const modalCerrar = document.getElementById("modal-cerrar");

modalAbrir.addEventListener("click", (e) => {
    e.preventDefault();
    modalContainer.classList.toggle("modal-activo");
});

modalCerrar.addEventListener("click", () => {
    modalContainer.classList.toggle("modal-activo");
});

// Obtener usuarios registrados desde localStorage o inicializar
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
    { nombre: "Hugo", contraseña: "123" }
];

// Mensajes del sistema
const mensajes = {
    usuarioRegistrado: (nombre) => `${nombre} ha sido registrado correctamente.`,
    usuarioExistente: "Este nombre de usuario ya está registrado. Intente con otro.",
    accesoConcedido: (nombre) => `¡Acceso concedido! Bienvenido/a, ${nombre}. ¡Este es tu espacio!`,
    usuarioIncorrecto: "Usuario o contraseña incorrectos.",
    maxIntentos: "Superaste el máximo de intentos. El acceso ha sido bloqueado. ¡HASTA LA PRÓXIMA!",
    intentosRestantes: (intentos) => `Intentos restantes: ${3 - intentos}`
};

// Mostrar mensajes de error y éxito
function mostrarMensaje(elemento, mensaje, esError = false) {
    const mensajeElemento = document.getElementById(elemento);
    mensajeElemento.style.color = esError ? 'red' : 'green';
    mensajeElemento.textContent = mensaje;
}

// Mostrar formulario específico
function mostrarFormulario(formularioId, titulo) {
    document.getElementById("menu").style.display = "none";
    document.getElementById("tituloPrincipal").textContent = titulo;
    document.getElementById(formularioId).style.display = "block";
}

// Volver al menú
function volverAlMenu() {
    document.getElementById("registroForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("menu").style.display = "block";
    document.getElementById("tituloPrincipal").textContent = "Registro e Inicio de Sesión";
}

// Registro de nuevo usuario
function registrarUsuario() {
    const nombre = document.getElementById("nombreRegistro").value;
    const contraseña = document.getElementById("contraseñaRegistro").value;

    if (!nombre || !contraseña) {
        mostrarMensaje('mensajeRegistro', "Todos los campos son obligatorios", true);
        return;
    }

    if (usuarios.some(usuario => usuario.nombre === nombre)) {
        mostrarMensaje('mensajeRegistro', mensajes.usuarioExistente, true);
    } else {
        usuarios.push({ nombre, contraseña });
        // Guardar usuarios en localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarMensaje('mensajeRegistro', mensajes.usuarioRegistrado(nombre));
        document.getElementById("nombreRegistro").value = "";
        document.getElementById("contraseñaRegistro").value = "";
    }
}

let intentosFallidos = 0;

// Inicio de sesión de usuario
function iniciarSesion() {
    const nombre = document.getElementById("nombreLogin").value;
    const contraseña = document.getElementById("contraseñaLogin").value;

    if (!nombre || !contraseña) {
        mostrarMensaje('mensajeLogin', "Todos los campos son obligatorios", true);
        return;
    }

    const usuarioEncontrado = usuarios.find(usuario => usuario.nombre === nombre && usuario.contraseña === contraseña);

    if (usuarioEncontrado) {
        mostrarMensaje('mensajeLogin', mensajes.accesoConcedido(nombre));
        setTimeout(() => {
            window.location.href = "html/productos.html";
        }, 1000);
    } else {
        intentosFallidos++;
        mostrarMensaje('mensajeLogin', `${mensajes.usuarioIncorrecto} ${mensajes.intentosRestantes(intentosFallidos)}`, true);
        document.getElementById("nombreLogin").value = "";
        document.getElementById("contraseñaLogin").value = "";

        if (intentosFallidos >= 3) {
            mostrarMensaje('mensajeLogin', mensajes.maxIntentos, true);
            document.getElementById("formLogin").style.display = "none";
        }
    }
}
