const productos = [
    {
        nombre: "NOTEBOOK",
        precio: 100000,
        stock: 10
    },
    {
        nombre: "COMPUTADORA",
        precio: 80000,
        stock: 20
    },
    {
        nombre: "TV", 
        precio: 50000,
        stock: 40
    },
    {
        nombre: "SMARTPHONE",
        precio: 60000,
        stock: 25
    },
    {
        nombre: "TABLET",
        precio: 45000,
        stock: 15
    },
    {
        nombre: "IMPRESORA",
        precio: 20000,
        stock: 30
    },
    {
        nombre: "CÁMARA",
        precio: 70000,
        stock: 12
    },
    {
        nombre: "PARLANTE",
        precio: 15000,
        stock: 50
    },
    {
        nombre: "MICRÓFONO",
        precio: 8000,
        stock: 35
    },
    {
        nombre: "TECLADO",
        precio: 5000,
        stock: 45
    },
    {
        nombre: "MOUSE",
        precio: 3000,
        stock: 60
    },
    {
        nombre: "MONITOR",
        precio: 40000,
        stock: 20
    },
    {
        nombre: "AURICULARES",
        precio: 12000,
        stock: 40
    },
    {
        nombre: "DISCO DURO",
        precio: 15000,
        stock: 25
    },
    {
        nombre: "MEMORIA USB",
        precio: 2000,
        stock: 70
    },
    {
        nombre: "ROUTER",
        precio: 10000,
        stock: 20
    },
    {
        nombre: "CARGADOR",
        precio: 5000,
        stock: 30
    },
    {
        nombre: "PROYECTOR",
        precio: 55000,
        stock: 10
    }
];
const contenedorUltimos = document.getElementById("ultimosTres");

for (let i = 1; i <= 3; i++) {
    const producto = productos[productos.length - i];
    
    // Crear un contenedor para cada producto
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");

    // Agregar el contenido HTML para el producto
    productoDiv.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <p>Stock: ${producto.stock}</p>
    `;

    // Añadir el producto al contenedor
    contenedorUltimos.appendChild(productoDiv);
}



const contenedorProductos= document.getElementById("todosProductos")

productos.forEach((pdt)=>{
    const producto = document.createElement("div");
    
    producto.classList.add("todos")

    producto.innerHTML= `
    <h3>${pdt.nombre}</h3>
    <p>$ ${pdt.precio}</p>
    <p>Stock: ${pdt.stock}</p>
`
    contenedorProductos.appendChild(producto)
})