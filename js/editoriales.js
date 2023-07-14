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
  