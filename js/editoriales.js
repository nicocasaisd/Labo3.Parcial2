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
