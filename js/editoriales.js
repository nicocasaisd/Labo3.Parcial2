import { actualizarTabla } from "./tabla.js";

// Opciones Editorial
const editoriales = ["Todas", "DC", "Marvel"];
const $selectEditorial = document.getElementById("select-editorial");

// Crea opciones de editorial
editoriales.forEach((el, index) => {
  let option = document.createElement("option");
  option.textContent = el;
  option.value = index + 1;
  $selectEditorial.appendChild(option);
});

// Dropdown List

// Deshabilito el Menú Select
$selectEditorial.disabled = true;

const $dropdownEditorial = document.getElementById("dropdownEditorial");
const $dropdownUl = document.getElementById("dropdownUl");

// Crea opciones de editorial
editoriales.forEach((el) => {
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.classList.add("dropdown-item");
  a.text = el;
  li.appendChild(a);
  $dropdownUl.appendChild(li);
});

// Event Click
$dropdownEditorial.addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    let opcionText = e.target.innerHTML;
    let opcionNro = editoriales.indexOf(opcionText);
    $selectEditorial.value = opcionNro+1;
    $selectEditorial.dispatchEvent(new Event("change"));
  }
});


// FILTER
export function filtrarPorEditorial(array)
{
  // console.log('Array antes de filtrar', array);
  let selectedEditorial = editoriales[$selectEditorial.value - 1];
  let arrayFiltrado = filtrarEditorial(array, selectedEditorial);
  actualizarTabla(arrayFiltrado);

  // console.log('Array despues de filtrar', arrayFiltrado);
  return arrayFiltrado;
}


export function filtrarEditorial(arr, editorial) {
  return arr.filter((e) => e.editorial === editorial);
}
