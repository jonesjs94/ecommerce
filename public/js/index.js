$(document).ready(function() {
	/*
		c => contenedor
		f => formuladio
		D => desplegado
	*/
	let btnIniciar = document.getElementById("btn-iniciar-sesion");
	let cGris = document.querySelector("#iniciar-sesion div");
	let cIniciar = document.getElementById("iniciar-sesion");
	let fIniciar = document.querySelector("#iniciar-sesion form");
	let fIniciarD = false;

	// Despliega formulario de inicio de sesión
	function desplegarInicioSesion() {
		if (!fIniciarD) {

			anime({ // Animación de despliegue de formulario
				targets: "#iniciar-sesion form",
				translateX: "0%",
				duration: 500,
				easing: "easeInOutCubic",
				begin: function() {
					cIniciar.classList.toggle("d-none");
				}  
			});

			anime({ // Animación del contenedor gris
				targets: "#iniciar-sesion div",
				opacity: .6,
				duration: 500,
				easing: "easeInOutCubic" 
			});

			fIniciarD = true; // Indica que el contenedor está desplegado

		} else {

			anime({ // Animación de cierre  de formulario
				targets: "#iniciar-sesion form",
				translateX: "100%",
				duration: 500,
				easing: "easeInOutCubic",
				complete: function() {
					cIniciar.classList.toggle("d-none");
				}  
			});

			anime({ // Animación del contenedor gris
				targets: "#iniciar-sesion div",
				opacity: 0,
				duration: 500,
				easing: "easeInOutCubic" 
			});

			fIniciarD = false; // Indica que el contenedor está oculto

		}

	};

	cGris.addEventListener("click", () => {
		desplegarInicioSesion();
	});


});
