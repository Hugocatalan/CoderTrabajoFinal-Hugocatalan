document.addEventListener("DOMContentLoaded", () => {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<li>Tu carrito está vacío.</li>";
    }

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - ${item.cantidad} x $${item.precio.toLocaleString()} = $${(item.cantidad * item.precio).toLocaleString()}`;
        listaCarrito.appendChild(li);
        total += item.cantidad * item.precio;
    });

    totalCarrito.textContent = total.toLocaleString();

    btnFinalizarCompra.addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        // Aquí podrías agregar lógica para procesar la compra
        alert("Compra realizada con éxito.");
        localStorage.removeItem("carrito");
        window.location.href = "./productos.html"; // Redirigir a la tienda
    });
});
