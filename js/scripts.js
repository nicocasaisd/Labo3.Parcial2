import { SuperHeroe } from "./superheroe.js";
// import {
//   handlerCreate,
//   handlerUpdate,
//   actualizarStorage,
//   handlerDelete,
// } from "./manejadores.js";

import { limpiarTabla, actualizarTabla, crearCheckColumnas } from "./tabla.js";
import {
  handlerRead,
  handlerCreate,
  handlerUpdate,
  handlerDelete,
} from "./manejadores_ajax.js";
import {
  cargarElementoEnFormulario,
  CrearNuevoElemento,
} from "./FormController.js";

import "./armas.js";
import "./editoriales.js";
import "./fuerza.js";

window.addEventListener("load", () => {
  console.log("load");
  handlerRead();
});

// Obtengo punteros

const $formulario = document.forms[0];

// const array = JSON.parse(localStorage.getItem("array")) || [];
// console.log(array);
// let display_array = array;

// Botones
const $btnGuardar = document.getElementById("btnGuardar");
const $btnEliminar = document.getElementById("btnEliminar");
const $btnCancelar = document.getElementById("btnCancelar");

// Mensaje
// $mensajeFormulario = document.getElementById("mensaje-formulario")

// console.log(array);
// if (array.length > 0) actualizarTabla($tabla, array);

// WINDOW CLICK
window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    const selectedElement = e.target.parentElement;
    selectedElement.id = e.target.parentElement.getAttribute("data-id");
    cargarElementoEnFormulario($formulario, selectedElement);
    $btnEliminar.disabled = false;
    $btnGuardar.textContent = "Modificar";

    // console.log(selectedElement);
  }
});

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevoElementoForm = CrearNuevoElemento($formulario);
  limpiarTabla();
  // ABM
  if ($formulario.txtId.value == "") {
    handlerCreate(nuevoElementoForm);
    console.log("Creación de elemento..");
  } else{
    console.log("Actualización de elemento..");
    handlerUpdate(nuevoElementoForm);
  }
  $formulario.reset();
  handlerRead();
});

$btnEliminar.addEventListener("click", (e) => {
  if (confirm("Desea eliminar el elemento?")) {
    console.log("Eliminar...");
    handlerDelete(parseInt($formulario.txtId.value), array, $tabla);
    $formulario.reset();
  }
});

$btnCancelar.addEventListener("click", (e) => {
  console.log("Cancelando...");
  document.getElementById("mensaje-formulario").textContent = "";
  $formulario.txtId.value = "";
  $formulario.reset();
  $btnEliminar.disabled = true;
  // $btnGuardar.value = "Guardar";
  $btnGuardar.textContent = "Guardar";
});

// CheckBox Group

const $chkBoxGroup = document.getElementById("chkBoxGroup");
$chkBoxGroup.appendChild(crearCheckColumnas(array[0]));

$chkBoxGroup.addEventListener("change", () => {
  console.log("cambio");
  let group = [...document.querySelectorAll("#chkBoxGroup input")];
  group = group.map((e) => e.checked);
  group.forEach((e, index) => (e ? showColumn(index) : hideColumn(index)));
});

function hideColumn(index) {
  const cells = [...document.querySelectorAll("td,th")];
  cells.forEach((cell) => {
    if (cell.getAttribute("data-column-index") == index)
      cell.style.display = "none";
  });
}

function showColumn(index) {
  const cells = [...document.querySelectorAll("td,th")];
  cells.forEach((cell) => {
    if (cell.getAttribute("data-column-index") == index)
      cell.style.display = "";
  });
}
