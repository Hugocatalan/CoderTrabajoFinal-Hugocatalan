const productos = [
    { nombre: "NOTEBOOK", precio: 100000, stock: 10, imagen: "https://via.placeholder.com/150" },
    { nombre: "COMPUTADORA", precio: 80000, stock: 20, imagen: "https://via.placeholder.com/150" },
    { nombre: "TV", precio: 50000, stock: 40, imagen: "https://via.placeholder.com/150" },
    { nombre: "SMARTPHONE", precio: 60000, stock: 25, imagen: "https://via.placeholder.com/150" },
    { nombre: "MAUSE", precio: 100000, stock: 10, imagen: "https://via.placeholder.com/150" },
    { nombre: "CONTROL", precio: 80000, stock: 20, imagen: "https://via.placeholder.com/150" },
    { nombre: "RADIO", precio: 50000, stock: 40, imagen: "https://via.placeholder.com/150" },
];

// Selectores
const contenedorUltimos = document.getElementById("ultimosTres");
const contenedorProductos = document.getElementById("todosProductos");
const contenedorCarrito = document.getElementById("carrito");
const totalCompra = document.getElementById("totalCompra");
const botonFinalizarCompra = document.getElementById("finalizarCompra");
let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Carrito de compras cargado desde localStorage

// Función para mostrar los últimos 3 productos
function mostrarUltimosProductos() {
    contenedorUltimos.innerHTML = '';
    productos.slice(-3).reverse().forEach(producto => {
        const productoDiv = crearProductoHTML(producto);
        contenedorUltimos.appendChild(productoDiv);
    });
    agregarEventosBotones();
}

// Función para mostrar todos los productos
function mostrarTodosProductos() {
    contenedorProductos.innerHTML = '';
    productos.forEach(producto => {
        const productoDiv = crearProductoHTML(producto);
        contenedorProductos.appendChild(productoDiv);
    });
    agregarEventosBotones();
}

// Función para crear HTML de un producto
function crearProductoHTML(producto) {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");
    productoDiv.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio.toLocaleString()}</p>
        <p>Stock: ${producto.stock}</p>
        <button class="btnAgregarCarrito" data-nombre="${producto.nombre}">Agregar al carrito</button>
    `;
    return productoDiv;
}

// Agregar eventos a los botones de "Agregar al carrito"
function agregarEventosBotones() {
    document.querySelectorAll(".btnAgregarCarrito").forEach(btn => {
        btn.addEventListener("click", agregarAlCarrito);
    });
}
//Actualiza  el logo del carrito
function actualizarLogoCarrito() {
    const contadorCarrito = document.getElementById("contadorCarrito");
    const cantidadProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);  // Sumamos la cantidad total de productos en el carrito
    contadorCarrito.textContent = cantidadProductos > 0 ? cantidadProductos : '';  // Mostramos el contador solo si hay productos en el carrito
}
// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
    const nombreProducto = event.target.getAttribute("data-nombre");
    const producto = productos.find(p => p.nombre === nombreProducto);

    if (producto && producto.stock > 0) {
        const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);

        if (productoEnCarrito) {
            if (productoEnCarrito.cantidad < producto.stock) {
                productoEnCarrito.cantidad++;
            }
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        producto.stock--;
        mostrarCarrito();
        mostrarUltimosProductos();
        mostrarTodosProductos();
        actualizarLogoCarrito();
    } else {
        alert("No hay suficiente stock de este producto.");
    }
}

function mostrarCarrito() {
    contenedorCarrito.innerHTML = '';
    let total = 0;



    totalCompra.textContent = total.toLocaleString();
    

    // Guardar el carrito en localStorage para que persista
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para finalizar la compra
botonFinalizarCompra.addEventListener("click", function () {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    carrito = []; // Limpiar el carrito
    
    mostrarUltimosProductos();
    mostrarTodosProductos();
    
    });

// Función para mostrar el nombre del usuario en el navbar
function mostrarUsuario() {
    const usuarioNombre = localStorage.getItem('nombreCompleto');
    if (usuarioNombre) {
        document.getElementById("usuarioNombre").textContent = usuarioNombre;
        document.getElementById("navbarUser").style.display = "block";
    } else {
        console.log("El nombre del usuario no está en localStorage");
    }
}
//////-----------------------------------------------------------------------------------

function agregarProducto() {
    const formularioContainer = document.getElementById("formularioContainer");
    formularioContainer.style.display = "block";
}

// Función para cargar un nuevo producto o actualizar uno existente
function cargarProducto() {
    const nombre = document.getElementById("nombre").value.toUpperCase(); // Convertir a mayúsculas
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);
    const imagen = document.getElementById("imagen").files[0];

    if (nombre && !isNaN(precio) && !isNaN(stock) && imagen) {
        // Verificar si el producto ya existe
        const productoExistente = productos.find(p => p.nombre === nombre);

        if (productoExistente) {
            // Si el producto ya existe, sumar el stock al existente
            productoExistente.precio = precio;
            productoExistente.stock += stock; // Aquí sumamos el stock

            const reader = new FileReader();
            reader.onload = function (e) {
                productoExistente.imagen = e.target.result;

                // Actualizar la lista de productos
                mostrarUltimosProductos();
                mostrarTodosProductos();

                // Limpiar el formulario
            };
            reader.readAsDataURL(imagen);
        } else {
            // Si el producto no existe, agregarlo
            const reader = new FileReader();
            reader.onload = function (e) {
                productos.push({
                    nombre,
                    precio,
                    stock,
                    imagen: e.target.result
                });

                // Actualizar la lista de productos
                mostrarUltimosProductos();
                mostrarTodosProductos();

                // Limpiar el formulario
            };
            reader.readAsDataURL(imagen);
        }

        // Ocultar el formulario
        document.getElementById("formularioContainer").style.display = "none";
    }
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("nombre").value = '';
    document.getElementById("precio").value = '';
    document.getElementById("stock").value = '';
    document.getElementById("imagen").value = '';
}
///---------------------------------------------------------------




// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    mostrarUsuario();
    mostrarUltimosProductos();
    mostrarTodosProductos();
});
document.getElementById("btnAgregarProducto").addEventListener("click", agregarProducto);
document.getElementById("btnCargarProducto").addEventListener("click", cargarProducto);

