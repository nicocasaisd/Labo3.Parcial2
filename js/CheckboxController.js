import { SuperHeroe } from "./Superheroe.js";

// CheckBox Group

// Crear CheckBox
const $chkBoxGroup = document.getElementById("chkBoxGroup");
$chkBoxGroup.appendChild(crearCheckColumnas(new SuperHeroe()));

// Eventos de actualización
window.addEventListener("checkboxChange", () => {actualizarCheckbox();});
$chkBoxGroup.addEventListener("change", () => {actualizarCheckbox();});


// Funciones

function actualizarCheckbox() {
  console.log("cambio");
  let group = [...document.querySelectorAll("#chkBoxGroup input")];
  group = group.map((e) => e.checked);
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
  const div = document.createElement("div");
  div.classList.add("row");

  for (const key in elemento) {
    if (key == "id") {
      continue;
    }
    let checkDiv = document.createElement("div");
    checkDiv.classList.add("form-check");
    checkDiv.classList.add("text-capitalize");
    checkDiv.classList.add("col");
    // let heading = key;
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
