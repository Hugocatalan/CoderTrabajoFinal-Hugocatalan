const productos = [
    {
        nombre: "NOTEBOOK",
        precio: 100000,
        stock: 10,
        imagen: "https://via.placeholder.com/150"
    },  
    {
        nombre: "COMPUTADORA",
        precio: 80000,
        stock: 20,
        imagen: "https://via.placeholder.com/150"
    },
    {
        nombre: "TV", 
        precio: 50000,
        stock: 40,
        imagen: "https://via.placeholder.com/150"
    },
    {
        nombre: "SMARTPHONE",
        precio: 60000,
        stock: 25,
        imagen: "https://via.placeholder.com/150"
    },{
        nombre: "MAUSE",
        precio: 100000,
        stock: 10,
        imagen: "https://via.placeholder.com/150"
    },  
    {
        nombre: "CONTROL",
        precio: 80000,
        stock: 20,
        imagen: "https://via.placeholder.com/150"
    },
    {
        nombre: "RADIO", 
        precio: 50000,
        stock: 40,
        imagen: "https://via.placeholder.com/150"
    },
];

const contenedorUltimos = document.getElementById("ultimosTres");
const contenedorProductos = document.getElementById("todosProductos");
const contenedorCarrito = document.getElementById("carrito");
const totalCompra = document.getElementById("totalCompra");
const botonFinalizarCompra = document.getElementById("finalizarCompra");

// Carrito de compras
let carrito = [];

// Función para mostrar los últimos 3 productos
function mostrarUltimosProductos() {
    contenedorUltimos.innerHTML = '';
    for (let i = 1; i <= 3; i++) {
        const producto = productos[productos.length - i];
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toLocaleString()}</p>
            <p>Stock: ${producto.stock}</p>
            <button class="btnAgregarCarrito" data-nombre="${producto.nombre}">Agregar al carrito</button>
        `;
        contenedorUltimos.appendChild(productoDiv);
    }

    // Agregar evento a los botones de "Agregar al carrito"
    document.querySelectorAll(".btnAgregarCarrito").forEach((btn) => {
        btn.addEventListener("click", agregarAlCarrito);
    });
}

// Función para mostrar todos los productos
function mostrarTodosProductos() {
    contenedorProductos.innerHTML = '';
    productos.forEach(pdt => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.innerHTML = `
            <img src="${pdt.imagen}" alt="${pdt.nombre}" class="producto-imagen">
            <h3>${pdt.nombre}</h3>
            <p>$${pdt.precio.toLocaleString()}</p>
            <p>Stock: ${pdt.stock}</p>
            <button class="btnAgregarCarrito" data-nombre="${pdt.nombre}">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(productoDiv);
    });

    // Agregar evento a los botones de "Agregar al carrito"
    document.querySelectorAll(".btnAgregarCarrito").forEach((btn) => {
        btn.addEventListener("click", agregarAlCarrito);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
    const nombreProducto = event.target.getAttribute("data-nombre");
    const producto = productos.find(p => p.nombre === nombreProducto);

    if (producto && producto.stock > 0) {
        // Verificar si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);

        if (productoEnCarrito) {
            // Si ya existe, incrementar la cantidad
            if (productoEnCarrito.cantidad < producto.stock) {
                productoEnCarrito.cantidad++;
            }
        } else {
            // Si no está en el carrito, agregarlo
            carrito.push({ ...producto, cantidad: 1 });
        }

        // Actualizar stock del producto
        producto.stock--;

        mostrarCarrito();
        mostrarUltimosProductos();
        mostrarTodosProductos();
    } else {
        alert("No hay suficiente stock de este producto.");
    }
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    contenedorCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - ${item.cantidad} x $${item.precio.toLocaleString()} = $${(item.cantidad * item.precio).toLocaleString()}`;
        contenedorCarrito.appendChild(li);
        total += item.cantidad * item.precio;
    });

    totalCompra.textContent = total.toLocaleString();

    // Mostrar el botón de finalizar compra si el carrito tiene productos
    botonFinalizarCompra.style.display = carrito.length > 0 ? "block" : "none";
}

// Función para finalizar la compra
botonFinalizarCompra.addEventListener("click", function() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    // Descontar el stock de los productos comprados
    carrito.forEach(item => {
        const producto = productos.find(pdt => pdt.nombre === item.nombre);
        producto.stock -= item.cantidad;
    });

    // Limpiar el carrito
    carrito = [];
    mostrarCarrito();
    mostrarUltimosProductos();
    mostrarTodosProductos();
    alert("Compra realizada con éxito.");
});

// Mostrar los productos al inicio
mostrarUltimosProductos();
mostrarTodosProductos();

// Función para mostrar el formulario de agregar producto
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

// Event listeners
document.getElementById("btnAgregarProducto").addEventListener("click", agregarProducto);
document.getElementById("btnCargarProducto").addEventListener("click", cargarProducto);
