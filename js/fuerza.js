const $avgFuerza = document.getElementById("avgFuerza");
const $maxFuerza = document.getElementById("maxFuerza");
const $minFuerza = document.getElementById("minFuerza");

export function AsignarPromedioFuerza(array) {
  // console.log('Promedio fuerza', array);
  $avgFuerza.value = calcularPromedioFuerza(array).toFixed(2);
  // Maximos y Minimos
  $maxFuerza.value = calcularMaxFuerza(array);
  $minFuerza.value = calcularMinFuerza(array);
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

// MAX
function calcularMinFuerza(arr) {
  let minimaFuerza;

  let arrayFuerzas = arr.map((heroe) => heroe.fuerza);

  minimaFuerza = arrayFuerzas.reduce((prev, actual) => {
    if (prev <= actual) {
      return prev;
    } else {
      return actual;
    }
  });

  return minimaFuerza;
}
