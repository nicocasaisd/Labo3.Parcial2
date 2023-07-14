const $spinner = document.getElementById("spinner");

export function MostrarSpinner() {
  // Spinner
  $spinner.hidden = false;
}

export function OcultarSpinner() {
    // Spinner
    $spinner.hidden = true;
  }