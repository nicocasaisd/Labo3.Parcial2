import {
  validarString,
  validarRango,
  validarOpciones,
} from "./validaciones.js";
import {armas} from "./armas.js";
import { SuperHeroe } from "./superheroe.js";


const $mensajeFormulario = document.getElementById("mensaje-formulario");

export function CrearNuevoElemento($formulario) {
  // Desestructuracion de formulario
  const { txtId, txtNombre, txtAlias, rdoEditorial, rdoFuerza, lstArma } =
    $formulario;
  // Validaciones
  console.log("Validacion");
  if (
    !(
      validarString(txtNombre.value) &&
      validarOpciones(rdoEditorial.value, "Marvel", "DC") &&
      validarString(txtAlias.value) &&
      validarRango(rdoFuerza.value, 0, 100) &&
      validarRango(lstArma.value, 1, armas.length)
    )
  ) {
    $mensajeFormulario.textContent = "Se han ingresado datos inválidos.";
    return;
  } else {
    $mensajeFormulario.textContent = "";
  }
  // Creacion del elemento
  let nuevoElemento;

  console.log('id',txtId.value);
  
  if (txtId.value === "") {
    console.log("Alta de elemento..");
    nuevoElemento = new SuperHeroe(
      Date.now(),
      txtNombre.value,
      txtAlias.value,
      rdoEditorial.value,
      parseInt(rdoFuerza.value),
      parseInt(lstArma.value)
    );
  } else {
    console.log("Actualización de elemento..");
    nuevoElemento = new SuperHeroe(
      parseInt(txtId.value),
      txtNombre.value,
      txtAlias.value,
      rdoEditorial.value,
      parseInt(rdoFuerza.value),
      parseInt(lstArma.value)
    );
  }
  return nuevoElemento;
}

export function cargarElementoEnFormulario(formulario, elemento) {
  formulario.txtId.value = elemento.id;
  formulario.txtNombre.value = elemento.children[0].textContent;
  formulario.txtAlias.value = elemento.children[1].textContent;
  formulario.rdoEditorial.value = elemento.children[2].textContent;
  formulario.rdoFuerza.value = elemento.children[3].textContent;
  formulario.lstArma.value = elemento.children[4].textContent;
}
