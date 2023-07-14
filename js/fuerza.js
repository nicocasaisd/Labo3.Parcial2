const $avgFuerza = document.getElementById("avgFuerza");
const $maxFuerza = document.getElementById("maxFuerza");

export function AsignarPromedioFuerza(array) {
  // console.log('Promedio fuerza', array);
  $avgFuerza.value = calcularPromedioFuerza(array).toFixed(2);
  $maxFuerza.value = calcularMaxFuerza(array);
}

// REDUCE
function calcularPromedioFuerza(arr) {
  return arr.reduce((prev, actual) => prev + actual.fuerza, 0) / arr.length;
}

// MAX
function calcularMaxFuerza(arr) {
  let maximaFuerza;

  let arrayFuerzas = arr.map((heroe) => heroe.fuerza);

  maximaFuerza = arrayFuerzas.reduce((prev, actual) => {
    if (prev >= actual) {
      return prev;
    } else {
      return actual;
    }
  });

  return maximaFuerza;
}
