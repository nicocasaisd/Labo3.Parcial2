import { SuperHeroe } from "./Superheroe.js";
import { actualizarStorage } from "./localStorage.js";

// CheckBox Group

// Crear CheckBox
const $chkBoxGroup = document.getElementById("chkBoxGroup");
$chkBoxGroup.appendChild(crearCheckColumnas(new SuperHeroe()));

// Eventos de actualización
window.addEventListener("checkboxChange", () => {
  actualizarCheckbox();
});
$chkBoxGroup.addEventListener("change", () => {
  actualizarCheckbox();
});

// Funciones

export function inicializarCheckbox() {
  console.log("Inicializando checkbox..");
  let checkbox_array = JSON.parse(localStorage.getItem("checkbox_array"));

  // Asigno valores de checkBox a partir del array en localStorage
  if (checkbox_array) {
    let group = [...document.querySelectorAll("#chkBoxGroup input")];
    group.forEach((chb, index) => {
      chb.checked = checkbox_array[index];
    });
  }
}

function actualizarCheckbox() {
  console.log("Actualizando checkbox..");
  let group = [...document.querySelectorAll("#chkBoxGroup input")];
  group = group.map((e) => e.checked);
  toggleCheckbox(group);
  //Guardo en localStorage las opciones
  actualizarStorage("checkbox_array", group);
}

function toggleCheckbox(group) {
  group.forEach((bool, index) =>
    bool ? showColumn(index) : hideColumn(index)
  );
}

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

function crearCheckColumnas(elemento) {
  // Crear Row
  const div = document.createElement("div");
  div.classList.add("row");
  // Crear Check Divs
  for (const key in elemento) {
    if (key == "id") {
      continue;
    }
    // Check Div
    let checkDiv = document.createElement("div");
    checkDiv.classList.add("form-check");
    checkDiv.classList.add("text-capitalize");
    checkDiv.classList.add("col");
    // CheckBox
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("checked", true);
    check.setAttribute("id", "chk" + key);
    check.setAttribute("value", key);
    check.classList.add("form-check-input");

    // Label
    let lbl = document.createElement("label");
    lbl.setAttribute("for", "chk" + key);
    lbl.innerHTML = key;
    lbl.classList.add("form-check-label");

    checkDiv.appendChild(check);
    checkDiv.appendChild(lbl);

    div.appendChild(checkDiv);
  }

  return div;
}
