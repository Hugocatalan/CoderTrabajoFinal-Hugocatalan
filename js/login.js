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
    { nombreCompleto: "Hugo Catalan", nombre:"Hugo", contraseña: "123" }
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
    const nombreCompleto = document.getElementById("nombreCompleto").value;
    const nombreRegistro = document.getElementById("nombreRegistro").value;
    const contraseña = document.getElementById("contraseñaRegistro").value;

    if (!nombreCompleto || !nombreRegistro || !contraseña) {
        mostrarMensaje('mensajeRegistro', "Todos los campos son obligatorios", true);
        return;
    }

    if (usuarios.some(usuario => usuario.nombreRegistro === nombreRegistro)) {
        mostrarMensaje('mensajeRegistro', mensajes.usuarioExistente, true);
    } else {
        usuarios.push({ nombreCompleto, nombreRegistro, contraseña });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarMensaje('mensajeRegistro', mensajes.usuarioRegistrado(nombreCompleto));

        // Limpiar los campos del formulario de registro
        document.getElementById("nombreCompleto").value = "";
        document.getElementById("nombreRegistro").value = "";
        document.getElementById("contraseñaRegistro").value = "";

        // Redirigir al formulario de inicio de sesión después de 1 segundo
        setTimeout(() => {
            document.getElementById("registroForm").style.display = "none";
            document.getElementById("loginForm").style.display = "block";
            document.getElementById("tituloPrincipal").textContent = "Inicia Sesión";
        }, 1000);
    }
}


let intentosFallidos = 0;

// Función para restablecer los intentos después de un tiempo
function restablecerIntentos() {
    setTimeout(() => {
        intentosFallidos = 0;
        mostrarMensaje('mensajeLogin', "", false);
        document.getElementById("formLogin").style.display = "block";
    }, 20000); // 20 segundos
}

// Función para iniciar sesión
function iniciarSesion() {
    const nombreRegistro = document.getElementById("nombreLogin").value;
    const contraseña = document.getElementById("contraseñaLogin").value;

    if (!nombreRegistro || !contraseña) {
        mostrarMensaje('mensajeLogin', "Todos los campos son obligatorios", true);
        return;
    }

    const usuarioEncontrado = usuarios.find(usuario => usuario.nombreRegistro === nombreRegistro && usuario.contraseña === contraseña);

    if (usuarioEncontrado) {
        localStorage.setItem('nombreCompleto', usuarioEncontrado.nombreCompleto);
        mostrarMensaje('mensajeLogin', mensajes.accesoConcedido(usuarioEncontrado.nombreCompleto));
        setTimeout(() => {
            window.location.href = "./html/productos.html";
        }, 2000);
    } else {
        intentosFallidos++;
        if (intentosFallidos >= 3) {
            mostrarMensaje('mensajeLogin', mensajes.maxIntentos, true);
            document.getElementById("formLogin").style.display = "none";
            restablecerIntentos();
        } else {
            mostrarMensaje('mensajeLogin', mensajes.usuarioIncorrecto, true);
            mostrarMensaje('mensajeLogin', mensajes.intentosRestantes(intentosFallidos), true);
        }
    }
}

// Mostrar información del usuario
function mostrarUsuario() {
    const nombreCompleto = localStorage.getItem('nombreCompleto');
    if (nombreCompleto) {
        document.getElementById("nombreCompleto").textContent = nombreCompleto;
        document.getElementById("navbarUser").style.display = "block";
    } else {
        console.log("El nombre del usuario no está en localStorage");
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", mostrarUsuario);
