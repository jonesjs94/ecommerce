/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------- Eventos --------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

// Despliega menú de categorías en celular
let btnCategoriasCel = document.getElementById("btn-categorias-cel");
let menuCelOculto = true;
btnCategoriasCel.addEventListener("click", () => {
  let cVacio = document.getElementById("contenedor-vacio");
  let trasladar,
      opacidad;

  if (menuCelOculto) {
    menuCelOculto = false;
    trasladar = "0%";
    opacidad = .7;
    cVacio.style.zIndex = "19";
  }
  else {
    menuCelOculto = true;
    trasladar = "-100%";
    opacidad = "0";
    cVacio.style.zIndex = "0";
  }

  anime({ targets: "#contenedor-cat-cel", translateX: trasladar, duration: 400, easing: "easeOutCubic" });
  anime({ targets: "#contenedor-vacio", opacity: opacidad, duration: 400, easing: "easeOutCubic" });

});


/* -------------------------------------------------------------------------------------------------- */
/* ----------------------------------------- Iniciar Sesión ----------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
  
/*
	c => contenedor
	f => formuladio
	D => desplegado
  i => icono
*/
let btnIniciar = document.getElementById("btn-iniciar-sesion");
let cVacio = document.getElementById("contenedor-vacio");
let cIniciar = document.getElementById("iniciar-sesion");
let fIniciar = document.querySelector("#iniciar-sesion form");
let fIniciarD = false;
let iAbrir = document.querySelector(".fa-user-tie");
let iCerrar = document.querySelector(".fa-arrow-right");

// Evento para desplegar formulario de inicio de sesión
function desplegarInicioSesion() {
	if (!fIniciarD) { // Si el formulario está oculto, lo despliega

		anime({ // Animación de despliegue de formulario
			targets: "#iniciar-sesion form",
			translateX: "0%",
			duration: 500,
			easing: "easeInOutCubic",
			begin: function() {
				cIniciar.classList.toggle("d-none");

        // Intercambio de iconos 
        iAbrir.style.display = "none";
        iCerrar.style.display = "block";
			},
			complete: function() { // Focus en primer campo al finalizar despliegue
				document.querySelector("#iniciar-sesion form input").focus();
			}
		});

		anime({ // Animación del contenedor gris
			targets: "#contenedor-vacio",
			opacity: .6,
			duration: 500,
			easing: "easeInOutCubic",
			begin: function() {
				cVacio.style.zIndex = "20";
			} 
		});

		fIniciarD = true; // Indica que el contenedor está desplegado

	} else { // Si el formulario está desplegado, lo oculta

		anime({ // Animación de cierre de formulario
			targets: "#iniciar-sesion form",
			translateX: "100%",
			duration: 500,
			easing: "easeInOutCubic",
      begin: function() {
        // Intercambio de iconos 
        iAbrir.style.display = "block";
        iCerrar.style.display = "none";
      },
			complete: function() {
				cIniciar.classList.toggle("d-none");
			}  
		});

		anime({ // Animación del contenedor gris
			targets: "#contenedor-vacio",
			opacity: 0,
			duration: 500,
			easing: "easeInOutCubic",
			complete: function() {
				cVacio.style.zIndex = "-1";
			} 
		});

		fIniciarD = false; // Indica que el contenedor está oculto

	}
};

/*
  Evento para cerrar contenedor de sesión y de menú categorias cliqueando por fuera del mismo
  En este caso es un contenedor vacío que se superpone, por lo que el click
  se realiza sobre este contenedor
*/
cVacio.addEventListener("click", () => {
	if (fIniciarD) btnIniciar.click();
  if (!menuCelOculto) btnCategoriasCel.click();
});



/* -------------------------------------------------------------------------------------------------- */
/* ------------------------------------------- Categorías ------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */


/*
  * Creador del menú de navegación a partir de una lista de objetos, la función es recursiva.
  * @param {string} lista - Lista de objetos del menú.
  * @param {string} elemento - Elemento HTML donde se incluye la lista.
*/
function crearMenu(lista, elemento) {
  let ul = document.createElement("ul");
  ul.classList.add("menu", "nav");
  elemento.appendChild(ul);
  
  for(item of lista) {
    let li = document.createElement("li");
    let a = document.createElement("a");

    li.classList.add("item-lista");
    li.setAttribute("id", "menu-" + item.id);

    a.setAttribute("href", item.link);
    a.textContent = item.title;
    li.appendChild(a);
    ul.appendChild(li);

    if(item.submenu) { 
      // Crea icono que indica que se puede desplegar otro menu
      let icon = document.createElement("i");
      icon.classList.add("fas", "fa-caret-right");
      li.appendChild(icon);

      let liCreada = document.getElementById("menu-" + item.id);
      crearMenu(item.submenu, liCreada);
    }
  }
}


/*
  * Creador del menú de navegación en celular a partir de un JSON, la función es recursiva.
  * Posee un comportamiento de acordeón.
  * @param {string} lista - Lista de objetos del menú.
  * @param {string} elemento - Elemento HTML donde se incluye la lista.
*/
function crearMenuCel(lista, elemento) {
  let ul = document.createElement("ul");

  ul.classList.add("nav", "flex-column", "accordion");
  ul.setAttribute("id", "menu-" + elemento.id);

  elemento.appendChild(ul);

  for(item of lista) {
    let li = document.createElement("li");
    li.classList.add("nav-item");

    let a = document.createElement("a");
    a.setAttribute("data-toggle", "collapse");
    a.classList.add("d-flex", "justify-content-between", "nivel-" + item.nivel);
    a.href = "#" + item.id;
    a.textContent = item.title;

    let div = document.createElement("div");
    div.classList.add("d-flex", "justify-content-between");

    div.appendChild(a);
    li.appendChild(div);
    ul.appendChild(li);

    if (item.submenu) {
      // Crea icono que indica que se puede desplegar otro menu
      let icon = document.createElement("i");
      icon.classList.add("fas", "fa-sort-down");
      a.appendChild(icon);      

      // Crea un contenedor para almacenar el submenu
      let dSubmenu = document.createElement("div");
      dSubmenu.setAttribute("data-parent", "#menu-" + elemento.id)
      dSubmenu.setAttribute("id", item.id);
      dSubmenu.classList.add("collapse");

      li.appendChild(dSubmenu);

      let eleNuevo = document.getElementById(item.id);
      crearMenuCel(item.submenu, eleNuevo);
    }
  }
}


// Menú de las categorías
let menu = [
  {
    title: "Libros", id: "libros", nivel: 1, link: "/libros", submenu: [
      {
        title: "Papel", id: "papel", nivel: 2, link: "/papel", submenu: [
          {
            title: "Códigos", id: "l-codigos", nivel: 3, link: "/codigos"
          },
          {
            title: "Civil y Comercial", id: "l-civil-y-comercial", nivel: 3, link: "/civil-y-comercial", submenu: [
              { title: "Parte General", id: "l-parte-general", nivel: 4, link: "/parte-general" },
              { title: "Contratos", id: "l-contratos", nivel: 4, link: "/contratos" },
              { title: "Familia y Sucesiones", id: "l-familia-y-sucesiones", nivel: 4, link: "/familia-y-sucesiones" },
              { title: "Consumidor", id: "l-consumidor", nivel: 4, link: "/consumidor" },
              { title: "Obligaciones y Daños", id: "l-obligaciones-y-daños", nivel: 4, link: "/obligaciones-y-daños" },
              { title: "Reales e Inmobiliario", id: "l-reales-e-inmobiliario", nivel: 4, link: "/reales-e-inmobiliario" },
              { title: "Societario y Empresarial", id: "l-societario-y-empresarial", nivel: 4, link: "/societario-y-empresarial" },
              { title: "Propiedad Intelectual", id: "l-propiedad-intelectual", nivel: 4, link: "/propiedad-intelectual" },
              { title: "Del Seguro", id: "l-del-seguro", nivel: 4, link: "/del-seguro" },
              { title: "Otros", id: "l-otros", nivel: 4, link: "/otros" }
            ]
          },
          {
            title: "Laboral y Previsional", id: "l-laboral-y-previsional", nivel: 3, link: "/laboral-y-previsional", submenu: [
              { title: "Laboral", id:"laboral", nivel: 4, link: "/laboral" },
              { title: "Previsional", id: "l-previsional", nivel: 4, link: "/previsional" },
              { title: "Modelos y práctica profesional", id: "l-modelos-y-practica-profesional", nivel: 4, link: "/modelos-y-practica-profesional" }
            ]
          },
          {
            title: "Procesal Civil y Comercial", id: "l-procesal-civil-y-comercial", nivel: 3, link: "/procesal-civil-y-comercial", submenu: [
              { title: "Procesal Civil y Comercial", id: "l-procesal-civil-y-comercial", nivel: 4, link: "/procesal-civil-y-comercial" },
              { title: "Modelos y práctica profesional", id: "l-modelos-y-practica-profesional", nivel: 4, link: "/modelos-y-practica-profesional" },
              { title: "Informático", id: "l-informatico", nivel: 4, link: "/informatico" }
            ]
          },
          {
            title: "Penal y Procesal Penal", id: "l-penal-y-procesal-penal", nivel: 3, link: "/penal-y-procesal-penal", submenu: [
              { title: "Penal", id: "l-penal", nivel: 4, link: "/penal" },
              { title: "Procesal Penal", id: "l-procesal-penal", nivel: 4, link: "/procesal-penal" },
              { title: "Violencia de género", id: "l-violencia-de-genero", nivel: 4, link: "/violencia-de-genero" }
            ]
          },
          {
            title: "Público e Internacional", id: "l-publico-e-internacional", nivel: 3, link: "/publico-e-internacional", submenu: [
              { title: "Administrativo", id:"l-administrativo", nivel: 4, link: "/administrativo" },
              { title: "Aeronáutico y Marítimo", id: "l-aeronautico-y-maritimo", nivel: 4, link: "/aeronautico-y-maritimo" },
              { title: "Aduanero", id: "l-aduanero", nivel: 4, link: "/aduanero" },
              { title: "Ambiental", id: "l-ambiental", nivel: 4, link: "/ambiental" },
              { title: "Constitucional", id: "l-constitucional", nivel: 4, link: "/constitucional" },
              { title: "Internacional", id: "l-internacional", nivel: 4, link: "/internacional" },
              { title: "Tributario", id: "l-tributario", nivel: 4, link: "/tributario" },
              { title: "Económico", id: "l-economico", nivel: 4, link: "/economico" }
            ]
          },
          {
            title: "Mod. y Práct. Profesionales", id: "l-modelos-y-practica-profesional-2", nivel: 3, link: "/modelos-y-practica-profesionales", submenu: [
              { title: "Civil y Comercial", id: "l-civil-y-comercial", nivel: 4, link: "/civil-y-comercial" },
              { title: "Laboral y Previsional", id: "l-laboral-y-previsional", nivel: 4, link: "/laboral-y-previsional" },
              { title: "Penal", id: "l-penal", nivel: 4, link: "/penal" }
            ]
          },
          {
            title: "Otros", id: "l-otros", nivel: 3, link: "/otros"
          }
        ]
      },
      {
        title: "Ebooks", id: "l-ebooks", nivel: 2, link: "/ebooks"
      },
      {
        title: "Papers", id: "l-papers", nivel: 2, link: "/papers"
      }
    ]
  },
  {
    title: "Cursos", id: "cursos", nivel: 1, link:"/cursos", submenu: [
      {
        title: "Presenciales", id: "c-presenciales", nivel: 2, link: "/presenciales"
      },
      {
        title: "Videoclases", id: "c-videoclases", nivel: 2, link: "/videoclases"
      },
      {
        title: "Cursos online", id: "c-cursos-online", nivel: 2, link: "/cursos-online", submenu: [
          {
            title: "Códigos", id: "c-cursos", nivel: 3, link: "/codigos"
          },
          {
            title: "Civil y Comercial", id: "c-civil-y-comercial", nivel: 3, link: "civil-y-comercial", submenu: [
              { title: "Parte General", id: "c-parte-general", nivel: 4, link: "/parte-general" },
              { title: "Contratos", id: "c-contratos", link: "/contratos" },
              { title: "Familia y Sucesiones", id: "c-familia-y-sucesiones", nivel: 4, link: "/familia-y-sucesiones" },
              { title: "Consumidor", id: "c-consumidor", nivel: 4, link: "/consumidor" },
              { title: "Obligaciones y Daños", id: "c-obligaciones-y-daños", nivel: 4, link: "/obligaciones-y-daños" },
              { title: "Reales e Inmobiliario", id: "c-reales-e-inmobiliario", nivel: 4, link: "/reales-e-inmobiliario" },
              { title: "Societario y Empresarial", id: "c-societario-y-empresarial", nivel: 4, link: "/societario-y-empresarial" },
              { title: "Propiedad Intelectual", id: "c-propiedad-intelectual", nivel: 4, link: "/propiedad-intelectual" },
              { title: "Del Seguro", id: "c-del-seguro", nivel: 4, link: "/del-seguro" },
              { title: "Otros", id: "c-otros", nivel: 4, link: "/otros" }
            ]
          },
          {
            title: "Laboral y Previsional", id: "c-laboral-y-previsional", nivel: 3, link: "/laboral-y-previsional", submenu: [
              { title: "Laboral", id:"c-laboral", nivel: 4, link: "/laboral" },
              { title: "Previsional", id: "c-previsional", nivel: 4, link: "/previsional" }
            ]
          },
          {
            title: "Proc. Civil y Comercial", id: "c-procesal-civil-y-comercial", nivel: 3, link: "/procesal-civil-y-comercial"
          },
          {
            title: "Penal y Procesal Penal", id: "c-penal-y-procesal-penal", nivel: 3, link: "/penal-y-procesal-penal"
          },
          {
            title: "Público e Internacional", id: "c-publico-e-internacional", nivel: 3, link: "/publico-e-internacional", submenu: [
              { title: "Aeronáutico", id: "c-aeronautico", nivel: 4, link: "/aeronautico" },
              { title: "Constitucional", id: "c-constitucional", nivel: 4, link: "/constitucional" }
            ]
          },
          {
            title: "Otros", id: "otros", nivel: 3, link: "/otros"
          } 
        ]
      }
    ]
  },
  {
    title: "Suscripciones", id: "suscripciones", nivel: 1, link: "/suscripciones"
  }
];


// Define si el menú que se utiliza es de escritorio o de celular
let navegador;
let mobile = window.matchMedia("(max-width: 768px)").matches;

if (mobile) {
  navegador = document.getElementById("contenedor-cat-cel");
  crearMenuCel(menu, navegador);
}
else {
  navegador = document.getElementById("contenedor-categorias");
  crearMenu(menu, navegador);
}