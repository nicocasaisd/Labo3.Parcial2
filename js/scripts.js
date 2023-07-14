import { limpiarTabla, actualizarTabla } from "./tabla.js";
import {
  handlerRead,
  handlerCreate,
  handlerUpdate,
  handlerDelete,
} from "./CrudControllerAjax.js";
import {
  limpiarFormulario,
  cargarElementoEnFormulario,
  CrearNuevoElemento,
} from "./FormController.js";


import { filtrarPorEditorial } from "./editoriales.js";
import "./armas.js";
import "./editoriales.js";
import "./fuerza.js";
import { AsignarPromedioFuerza } from "./fuerza.js";
import "./CheckboxController.js";
import { inicializarCheckbox } from "./CheckboxController.js";

// Obtengo punteros
let array = [];
let arrayFiltrado = [];

const $formulario = document.forms[0];
const $selectEditorial = document.getElementById("select-editorial");

window.addEventListener("load", () => {
  console.log("load");
  handlerRead((data) => {
    array = data;
    dispatchEvent(new Event("calcularFuerza"));
  });
  inicializarCheckbox();
});

// const array = JSON.parse(localStorage.getItem("array")) || [];
// console.log(array);
// let display_array = array;

// Botones
const $btnGuardar = document.getElementById("btnGuardar");
const $btnEliminar = document.getElementById("btnEliminar");
const $btnCancelar = document.getElementById("btnCancelar");

// WINDOW CLICK
window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    const selectedElement = e.target.parentElement;
    selectedElement.id = e.target.parentElement.getAttribute("data-id");
    cargarElementoEnFormulario($formulario, selectedElement);
    $btnEliminar.disabled = false;
    $btnGuardar.textContent = "Modificar";
  }
});

// Evento Submit

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevoElementoForm = CrearNuevoElemento($formulario);
  // ABM
  if (nuevoElementoForm) {
    limpiarTabla();
    if ($formulario.txtId.value == "") {
      handlerCreate(nuevoElementoForm);
      console.log("Creación de elemento..");
    } else {
      console.log("Actualización de elemento..");
      handlerUpdate(nuevoElementoForm);
    }
    limpiarFormulario();
    handlerRead((data) => {
      array = data;
    });
  }
});

// Evento Eliminar

$btnEliminar.addEventListener("click", (e) => {
  if (confirm("Desea eliminar el elemento?")) {
    console.log("Eliminar...");
    limpiarTabla();
    handlerDelete(parseInt($formulario.txtId.value));
    limpiarFormulario();
    handlerRead((data) => {
      array = data;
    });
    // console.log(array);
  }
});

// Evento Cancelar

$btnCancelar.addEventListener("click", (e) => {
  console.log("Cancelando...");
  limpiarFormulario();
});

// Eventos de Filtrado de Editorial
// window.addEventListener("actualizacionTabla", handlerFiltrarEditorial);
$selectEditorial.addEventListener("change", handlerFiltrarEditorial);

function handlerFiltrarEditorial() {
  if (!($selectEditorial.value == 1)) {
    // console.log(array);
    arrayFiltrado = filtrarPorEditorial(array);
  } else {
    arrayFiltrado = array;
    actualizarTabla(array);
  }
  dispatchEvent(new Event("calcularFuerza"));
}

// Evento Calcular Fuerza
window.addEventListener("calcularFuerza", () => {
  if (arrayFiltrado.length > 0) AsignarPromedioFuerza(arrayFiltrado);
  else AsignarPromedioFuerza(array);
});
