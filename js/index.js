import { SuperHeroe } from "./clases.js";

const $superheroes = document.getElementById("superheroes");
const array = JSON.parse(localStorage.getItem("array")) || [];
const armas = JSON.parse(localStorage.getItem("armas"));

// console.log(array);

// Row
const $row = document.createElement("div");
$row.classList.add("row");
$row.classList.add("pt-5");
$row.classList.add("row-cols-1");
$row.classList.add("row-cols-md-2");
$row.classList.add("g-4");

// Append
$superheroes.appendChild($row);

array.forEach((el, index) => {
  // console.log(el);
  let superheroe = new SuperHeroe(
    el.id,
    el.nombre,
    el.alias,
    el.editorial,
    el.fuerza,
    el.arma
  );
    
  $row.appendChild(generarArticulo(superheroe));
  // $superheroes.appendChild(generarArticulo(superheroe));
  console.log(index);
});

function generarArticulo(superheroe) {
  // Col
  const col = document.createElement("div");
  col.classList.add("col-sm-8");
  col.classList.add("col-md-6");
  col.classList.add("col-lg-4");

  // const article = document.createElement("article");
  const article = document.createElement("div");
  // article.style = "width: 18rem; margin:40px;";
  article.classList.add("card"); //Boot
  article.classList.add("bg-info"); //Boot
  article.classList.add("text-center"); //Boot
  article.classList.add("mg-50"); //Boot
  console.log(superheroe);

  col.appendChild(article);

  // Card body
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header"); //Boot
  article.appendChild(cardHeader);

  // Card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body"); //Boot
  article.appendChild(cardBody);

  // nombres
  const nombre = document.createElement("h2");
  nombre.classList.add("card-title");
  // console.log(superheroe.nombre);
  nombre.textContent = superheroe.nombre;
  // article.appendChild(nombre);
  cardHeader.appendChild(nombre);

  // alias
  const alias = document.createElement("p");
  alias.classList.add("card-subtitle");
  alias.textContent = superheroe.alias;
  cardBody.appendChild(alias);

  // editorial
  const editorial = document.createElement("p");
  editorial.classList.add("card-text");
  editorial.textContent = superheroe.editorial;
  cardBody.appendChild(editorial);
  // Icono
  editorial.appendChild(crearIcono(' <i class="fa-solid fa-book"></i>'));

  //Fuerza
  const fuerza = document.createElement("p");
  fuerza.classList.add("card-text");
  fuerza.textContent = superheroe.fuerza;
  // Icono
  fuerza.appendChild(crearIcono(' <i class="fa-solid fa-dumbbell"></i>'));

  cardBody.appendChild(fuerza);

  //Arma
  const arma = document.createElement("p");
  arma.classList.add("card-text");

  arma.textContent = armas[superheroe.arma - 1];
  // Icono
  arma.appendChild(crearIcono(' <i class="fa-regular fa-compass"></i>'));

  cardBody.appendChild(arma);

  // console.log(article);

  return col;
}

function crearIcono(innerHTML) {
  const icono = document.createElement("i");
  icono.innerHTML = innerHTML;

  return icono;
}
