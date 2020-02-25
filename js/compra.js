$(document).ready(() => {

	// Despliega lista de compras en dispositivos móbiles
	let btnLista = document.getElementById("btn-lista-compra");
	let cLista = document.getElementById("lista-compra");
	let cCompra = document.getElementById("contenedor-compra");
	let listaCerrada = true;
	btnLista.addEventListener("click", () => {
		$("#contenedor-compra").slideToggle();

		if (listaCerrada) {
			anime({ targets: "#btn-lista-compra i", rotate: "180deg", duration: 1000 });
			listaCerrada = false;
		}

		else {
			anime({ targets: "#btn-lista-compra i", rotate: "0deg", duration: 1000 });
			listaCerrada = true;
		}
	})

	// Despliega formulario de facturación
	let checbockFact = document.getElementById("checkbox-facturacion");
	checbockFact.addEventListener("click", () => $("#datos-facturacion").slideToggle() );

	// Despliega opción domicilio
	let domicilio = document.getElementById("enviar-domicilio");
	domicilio.addEventListener("click", () => {
		$("#form-domicilio").slideDown();
		$("#form-pedido").slideUp();

		domicilio.classList.add("opciones-compra-activo");
		pedido.classList.remove("opciones-compra-activo");		
	});

	// Despliega opción domicilio
	let pedido = document.getElementById("retirar-pedido");
	pedido.addEventListener("click", () => {
		$("#form-pedido").slideDown();
		$("#form-domicilio").slideUp();	

		pedido.classList.add("opciones-compra-activo");
		domicilio.classList.remove("opciones-compra-activo");
	});

});