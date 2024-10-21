class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre.toUpperCase(); // Convertir nombre a mayúsculas
        this.precio = precio;
        this.stock = stock;
    }
}

// Array para almacenar productos que se ingresan
const productos = [
    {
        nombre: "NOTEBOOK", // Cambiar a mayúsculas
        precio: 100000,
        stock: 10
    },
    {
        nombre: "COMPUTADORA", // Cambiar a mayúsculas
        precio: 80000,
        stock: 20
    },
    {
        nombre: "TV", // Cambiar a mayúsculas
        precio: 50000,
        stock: 40
    }
]

// Array de Carrito
const carrito = []

// Mensajes generales
const MENSAJE_MENU = `Selecciona una opción:
    1. Agregar.
    2. Comprar. 
    3. Salir `

const MENSAJE_SALIDA = "Gracias por usar el simulador, la próxima experiencia será mejor."
const MENSAJE_OPCION_INVALIDA = "Opción inválida. Ingrese otro valor:"
const MENSAJE_INGRESAR_NOMBRE = "Ingrese el nombre del producto:"
const MENSAJE_INGRESAR_PRECIO = "Ingrese el precio del producto:"
const MENSAJE_INGRESAR_STOCK = "Ingrese el stock del producto:"
const MENSAJE_PRODUCTO_INGRESADO = (nombre, precio, stock) => 
    `Producto ingresado correctamente. Los datos:
    . Nombre: ${nombre}
    . Precio: $${precio}
    . Stock: ${stock}`

const MENSAJE_SELECCION_INVALIDA = "Selección inválida. Por favor, selecciona un número válido."
const MENSAJE_AGREGAR_OTRO = "¿Desea agregar otro producto? (si/no)"
const MENSAJE_PRODUCTO_AGREGADO = (producto) => `${producto} ha sido agregado al carrito.`
const MENSAJE_SIN_STOCK = (producto) => `Lo siento, no hay stock suficiente de ${producto}.`
const MENSAJE_PRECIO_ACTUALIZADO = (nombre, precio) => `${nombre} ha sido actualizado a un nuevo precio de $${precio}.`
const MENSAJE_STOCK_ACTUALIZADO = (nombre, stock) => `${nombre} ha sido actualizado. Nuevo stock: ${stock}.`

// Función que muestra el menú principal
const mostrarMenu = () => {
    let opcion = ""

    do {
        opcion = prompt(MENSAJE_MENU)

        // Si el usuario presiona "Cancelar" (opción null) o selecciona "3", se sale del bucle.
        if (opcion === "3" || opcion === null) {
            alert(MENSAJE_SALIDA)
            break
        }

        switch (opcion) {
            case "1":
                agregarProductos()
                break
            case "2":
                comprarProductos()
                break
            default:
                alert(MENSAJE_OPCION_INVALIDA)
        }
    } while (true)
}

const agregarProductos = () => {
    let nombre = prompt(MENSAJE_INGRESAR_NOMBRE)
    if (nombre === null) return

    nombre = nombre.toUpperCase(); // Convertir nombre a mayúsculas
    let precio = parseInt(prompt(MENSAJE_INGRESAR_PRECIO))
    if (isNaN(precio)) return

    let stock = parseInt(prompt(MENSAJE_INGRESAR_STOCK))
    if (isNaN(stock)) return

    // Comprobar si el producto ya existe
    const productoExistente = productos.find(producto => producto.nombre === nombre);
    
    if (productoExistente) {
        // Si el producto ya existe, solo se incrementa el stock
        productoExistente.stock += stock;
        // Actualizar el precio si es diferente
        if (productoExistente.precio !== precio) {
            productoExistente.precio = precio;
            alert(MENSAJE_PRECIO_ACTUALIZADO(nombre, precio));
        } 
        alert(MENSAJE_STOCK_ACTUALIZADO(nombre, productoExistente.stock));
    } else {
        // Si el producto no existe, se crea uno nuevo
        productos.push(new Producto(nombre, precio, stock));
        alert(MENSAJE_PRODUCTO_INGRESADO(nombre, precio, stock));
    }
}

const comprarProductos = () => {
    let seguirComprando

    do {
        let mensaje = "Productos disponibles: \n"
        for (let i = 0; i < productos.length; i++) {
            mensaje += `\n${i + 1}. ${productos[i].nombre} - $${productos[i].precio}\n. Stock: ${productos[i].stock}\n`
        }

        let seleccion = parseInt(prompt(mensaje + "\nSelecciona el número del producto que deseas agregar al carrito: ")) - 1

        if (seleccion >= 0 && seleccion < productos.length) {
            if (productos[seleccion].stock > 0) {
                carrito.push({ ...productos[seleccion] })  // Clonamos el producto para evitar referencias
                productos[seleccion].stock--
                alert(MENSAJE_PRODUCTO_AGREGADO(productos[seleccion].nombre))
            } else {
                alert(MENSAJE_SIN_STOCK(productos[seleccion].nombre))
            }
        } else {
            alert(MENSAJE_SELECCION_INVALIDA)
        }

        seguirComprando = prompt(MENSAJE_AGREGAR_OTRO).toLowerCase()

    } while (seguirComprando === "si")

    mostrarTotal()
}

const mostrarTotal = () => {
    let total = 0
    let resumenCompra = "Productos en tu carrito: \n"

    carrito.forEach(producto => {
        total += producto.precio
        resumenCompra += `${producto.nombre} - $${producto.precio} \n`
    })

    alert(resumenCompra + "Total a pagar: $" + total)
}

// de esta manera tomare una lista y mostrare los ultiimos 3 elementos subidos
/*let productos = [1, 2, 3, 4, 'pero', 'casa', 'cebolla'];
for (let i = 1; i <= 3; i++) {
  console.log(productos[productos.length - i]);
}*/



mostrarMenu()
