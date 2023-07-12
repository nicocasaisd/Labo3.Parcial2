import { SuperHeroe } from "./superheroe.js";
import {
  handlerCreate,
  handlerUpdate,
  actualizarStorage,
  handlerDelete,
} from "./manejadores.js";
import {
  validarString,
  validarRango,
  validarOpciones,
} from "./validaciones.js";
import { actualizarTabla, crearCheckColumnas } from "./tabla.js";

// Opciones

const armas_const = [
  "Armadura",
  "Espada",
  "Martillo",
  "Escudo",
  "Arma de fuego",
  "Flechas",
];
actualizarStorage("armas", armas_const);

const $lista = document.getElementById("select-arma");
const armas = JSON.parse(localStorage.getItem("armas")) || [];

armas.forEach((el, index) => {
  // console.log(el);
  let option = document.createElement("option");
  option.textContent = el;
  option.value = index + 1;
  $lista.appendChild(option);
});

// Opciones Editorial
const editoriales = ["Todas", "DC", "Marvel"];

const $selectEditorial = document.getElementById("select-editorial");

editoriales.forEach((el, index) => {
  // console.log(el);
  let option = document.createElement("option");
  option.textContent = el;
  option.value = index + 1;
  $selectEditorial.appendChild(option);
});

// Obtengo punteros

const $formulario = document.forms[0];
const $tabla = document.getElementById("tabla");
const $avgFuerza = document.getElementById("avgFuerza");
const array = JSON.parse(localStorage.getItem("array")) || [];
let display_array = array;

// Botones
const $btnGuardar = document.getElementById("btnGuardar");
const $btnEliminar = document.getElementById("btnEliminar");
const $btnCancelar = document.getElementById("btnCancelar");

// Mensaje
// $mensajeFormulario = document.getElementById("mensaje-formulario")

console.log(array);
if (array.length > 0) actualizarTabla($tabla, array);

// WINDOW CLICK
window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    const id = e.target.parentElement.getAttribute("data-id");
    const selectedElement = array.find((el) => el.id == id);
    cargarElementoEnFormulario($formulario, selectedElement);
    $btnEliminar.disabled = false;
    // $btnGuardar.value = "Modificar";
    $btnGuardar.textContent = "Modificar";

    console.log(selectedElement);
  }
});

// console.log($formulario);
// $formulario.txtId.value = "12";

function cargarElementoEnFormulario(formulario, elemento) {
  formulario.txtId.value = elemento.id;
  formulario.txtNombre.value = elemento.nombre;
  formulario.rdoEditorial.value = elemento.editorial;
  formulario.txtAlias.value = elemento.alias;
  formulario.rdoFuerza.value = elemento.fuerza;
  formulario.lstArma.value = elemento.arma;
}

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // Desestructuracion de formulario
  const { txtId, txtNombre, txtAlias, rdoEditorial, rdoFuerza, lstArma } =
    $formulario;
  // Validaciones
  console.log("Validacion");
  console.log(
    txtNombre.value,
    txtAlias.value,
    rdoEditorial.value,
    rdoFuerza.value,
    lstArma.value
  );
  if (
    !(
      validarString(txtNombre.value) &&
      validarOpciones(rdoEditorial.value, "Marvel", "DC") &&
      validarString(txtAlias.value) &&
      validarRango(rdoFuerza.value, 0, 100) &&
      validarRango(lstArma.value, 1, armas.length)
    )
  ) {
    document.getElementById("mensaje-formulario").textContent =
      "Se han ingresado datos inválidos.";
  } else {
    document.getElementById("mensaje-formulario").textContent = "";
    // ABM
    // console.log(txtId.value);
    if (txtId.value === "") {
      console.log("Alta de elemento..");
      const newElement = new SuperHeroe(
        Date.now(),
        txtNombre.value,
        txtAlias.value,
        rdoEditorial.value,
        parseInt(rdoFuerza.value),
        parseInt(lstArma.value)
      );
      handlerCreate(array, newElement, $tabla);
    } else {
      console.log("Actualización de elemento..");
      const editElement = new SuperHeroe(
        parseInt(txtId.value),
        txtNombre.value,
        txtAlias.value,
        rdoEditorial.value,
        parseInt(rdoFuerza.value),
        parseInt(lstArma.value)
      );
      handlerUpdate(array, editElement, $tabla);
    }
    $formulario.reset();
  }
  //   console.log("nombre", txtNombre.value);
  //   console.log("ID", txtId.value);
  //   console.log("Transaccion", rdoEditorial.value);
  //   console.log("Dormitorios", nmbDormitorios.value);
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

// FILTER

$selectEditorial.addEventListener("change", () => {
  if (!($selectEditorial.value == 1)) {
    let editorial = editoriales[$selectEditorial.value - 1];
    display_array = filtrarEditorial(array, editorial);
    actualizarTabla($tabla, display_array);
  } else {
    display_array = array;
    actualizarTabla($tabla, array);
  }
});

function filtrarEditorial(arr, editorial) {
  return arr.filter((e) => e.editorial === editorial);
}

// REDUCE

function calcularPromedioFuerza(arr) {
  return arr.reduce((prev, actual) => prev + actual.fuerza, 0) / arr.length;
}

// Evento Calcular Fuerza
window.addEventListener("actualizar", () => {
  $avgFuerza.value = calcularPromedioFuerza(display_array);
  $chkBoxGroup.dispatchEvent(new Event("change"));
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
