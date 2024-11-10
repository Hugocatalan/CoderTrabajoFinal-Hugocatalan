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
    }
];

const contenedorUltimos = document.getElementById("ultimosTres");
const contenedorProductos = document.getElementById("todosProductos");

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
            <p>Precio: $${producto.precio}</p>
            <p>Stock: ${producto.stock}</p>
        `;
        contenedorUltimos.appendChild(productoDiv);
    }
}

// Función para mostrar todos los productos
function mostrarTodosProductos() {
    contenedorProductos.innerHTML = '';
    productos.forEach(pdt => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("todos");
        productoDiv.innerHTML = `
            <img src="${pdt.imagen}" alt="${pdt.nombre}" class="todos-imagen">
            <h3>${pdt.nombre}</h3>
            <p>$${pdt.precio}</p>
            <p>Stock: ${pdt.stock}</p>
        `;
        contenedorProductos.appendChild(productoDiv);
    });
}

// Mostrar los productos al inicio
mostrarUltimosProductos();
mostrarTodosProductos();

// Función para mostrar el formulario de agregar producto
function agregarProducto() {
    const formularioContainer = document.getElementById("formularioContainer");
    formularioContainer.style.display = "block";
}

// Función para cargar un nuevo producto
function cargarProducto() {
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;
    const imagen = document.getElementById("imagen").files[0];

    if (nombre && precio && stock && imagen) {
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
            document.getElementById("nombre").value = '';
            document.getElementById("precio").value = '';
            document.getElementById("stock").value = '';
            document.getElementById("imagen").value = '';

            // Ocultar el formulario
            document.getElementById("formularioContainer").style.display = "none";
        };
        reader.readAsDataURL(imagen);
    }
}

// Event listeners
document.getElementById("btnAgregarProducto").addEventListener("click", agregarProducto);
document.getElementById("btnCargarProducto").addEventListener("click", cargarProducto);
