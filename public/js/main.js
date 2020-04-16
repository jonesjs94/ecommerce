$(document).ready(function() {
		let libro = {
		id: "1234",
		titulo: "Libro: E-Mails, chats, WhatsApp, SMS, Facebook, filmaciones con teléfonos móviles y otras tecnologías.",
		precio: "1500,00",
		imagen: "imagen"
	}

	function aumentarCantidad(producto) {
		// let btnSumar = document.querySelector("[data-id="+  +"]")
	}

	let btnCerrarCarrito = document.getElementById("cerrar-carrito");

	btnCerrarCarrito.addEventListener("click", () => {
		$("#carrito").modal("hide");
	}); 
})