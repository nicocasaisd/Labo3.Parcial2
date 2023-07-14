const $avgFuerza = document.getElementById("avgFuerza");

// REDUCE

function calcularPromedioFuerza(arr) {
  return arr.reduce((prev, actual) => prev + actual.fuerza, 0) / arr.length;
}

// Evento Calcular Fuerza
window.addEventListener("actualizar", () => {
  $avgFuerza.value = calcularPromedioFuerza(display_array);
  $chkBoxGroup.dispatchEvent(new Event("change"));
});
