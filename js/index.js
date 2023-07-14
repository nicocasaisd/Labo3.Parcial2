import { SuperHeroe } from "./Superheroe.js";
import { handlerRead } from "./CrudControllerFetch.js";

const $articulos = document.getElementById("superheroes");
const armas = JSON.parse(localStorage.getItem("armas"));

// Evento Load

window.addEventListener("load", () => {
  console.log("load");
  handlerRead((array) => {
    console.log(array);
    propagarArticulos(array);
  });
});

// Row
function crearRow() {
  const row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("pt-5");
  // row.classList.add("row-cols-1");
  row.classList.add("row-cols-md-2");
  row.classList.add("g-4");

  return row;
}

function propagarArticulos(array) {
  const row = $articulos.appendChild(crearRow());

  array.forEach((el) => {
    // console.log(el);
    let superheroe = new SuperHeroe(
      el.id,
      el.nombre,
      el.alias,
      el.editorial,
      el.fuerza,
      el.arma
    );

    row.appendChild(crearArticulo(superheroe));
  });
}

function crearArticulo(superheroe) {
  let col = crearCardColumn();

  // const article = document.createElement("article");
  const article = document.createElement("div");
  // article.style = "width: 18rem; margin:40px;";
  article.classList.add("card"); //Boot
  article.classList.add("bg-info"); //Boot
  article.classList.add("text-center"); //Boot
  // article.classList.add("mg-50"); //Boot

  // Appends
  const cardHeader = crearCardHeader();
  const cardBody = crearCardBody();

  cardHeader.appendChild(crearNombre(superheroe));
  cardBody.appendChild(crearAlias(superheroe));
  cardBody.appendChild(crearEditorial(superheroe));
  cardBody.appendChild(crearFuerza(superheroe));
  cardBody.appendChild(crearArma(superheroe));

  article.append(cardHeader);
  article.append(cardBody);

  col.appendChild(article);

  return col;
}

// Funciones para crear cada parte

function crearCardColumn() {
  // Col
  const col = document.createElement("div");
  col.classList.add("col-sm-8");
  col.classList.add("col-md-6");
  col.classList.add("col-lg-4");

  return col;
}

function crearCardHeader() {
  let cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header"); //Boot

  return cardHeader;
}

function crearCardBody() {
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body"); //Boot

  return cardBody;
}

// nombres
function crearNombre(item) {
  let nombre = document.createElement("h2");
  nombre.classList.add("card-title");
  nombre.textContent = item.nombre;

  return nombre;
}
// alias
function crearAlias(item) {
  let alias = document.createElement("p");
  alias.classList.add("card-subtitle");
  alias.textContent = item.alias;

  return alias;
}

// editorial
function crearEditorial(item) {
  let editorial = document.createElement("p");
  editorial.classList.add("card-text");
  editorial.textContent = item.editorial;
  // Icono
  editorial.appendChild(crearIcono(' <i class="fa-solid fa-book"></i>'));

  return editorial;
}

//Fuerza
function crearFuerza(item) {
  let fuerza = document.createElement("p");
  fuerza.classList.add("card-text");
  fuerza.textContent = item.fuerza;
  // Icono
  fuerza.appendChild(crearIcono(' <i class="fa-solid fa-dumbbell"></i>'));

  return fuerza;
}

//Arma
function crearArma(item) {
  let arma = document.createElement("p");
  arma.classList.add("card-text");
  arma.textContent = armas[item.arma - 1];
  // Icono
  arma.appendChild(crearIcono(' <i class="fa-regular fa-compass"></i>'));

  return arma;
}

function crearIcono(innerHTML) {
  const icono = document.createElement("i");
  icono.innerHTML = innerHTML;

  return icono;
}
