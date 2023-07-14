const $tabla = document.getElementById("tabla");

// $tabla.classList.add("table-responsive");

export function limpiarTabla() {
  // Elimino todos los nodos hijos del $tabla
  while ($tabla.firstElementChild) {
    $tabla.removeChild($tabla.firstElementChild);
  }
}

export function actualizarTabla(data) {
  // Elimino todos los nodos hijos del $tabla
  while ($tabla.firstElementChild) {
    $tabla.removeChild($tabla.firstElementChild);
  }
  // Agregar la data
  $tabla.appendChild(crearTabla(data));
  console.log("Actualización de tabla..");
  dispatchEvent(new Event("calcularFuerza"));
  dispatchEvent(new Event("checkboxChange"));
  // dispatchEvent(new Event("actualizacionTabla"));
}

export const crearTabla = (data) => {
  if (!Array.isArray(data)) return null;

  const tabla = document.createElement("table");
  tabla.classList.add("table");
  tabla.classList.add("table-primary");
  tabla.classList.add("table-striped");
  tabla.classList.add("table-hover");
  tabla.classList.add("table-bordered");
  // tabla.classList.add("table-active");

  tabla.appendChild(crearCabecera(data[0]));
  tabla.appendChild(crearCuerpo(data));

  indexarColumnas(tabla, Object.keys(data[0]).length - 1);
  return tabla;
};

function indexarColumnas(tabla, numColumns) {
  const cells = [...tabla.querySelectorAll("th, td")];
  cells.forEach((cell, index) => {
    cell.setAttribute("data-column-index", index % numColumns);
  });
  // console.log(cells);
}

const crearCabecera = (elemento) => {
  const tHead = document.createElement("thead"),
    headRow = document.createElement("tr");
  // headRow.style.setProperty("background-color", "#6D3B47");
  tHead.classList.add("table-dark")

  for (const key in elemento) {
    let heading = key;

    if (key == "id") {
      continue;
    }
    const th = document.createElement("th");
    th.textContent = heading;
    headRow.appendChild(th);
  }

  tHead.appendChild(headRow);

  return tHead;
};

const crearCuerpo = (data) => {
  if (!Array.isArray(data)) return null;
  const tBody = document.createElement("tbody");

  data.forEach((element, index) => {
    const tr = document.createElement("tr");
    for (const key in element) {
      if (key === "id") {
        tr.dataset.id = element[key];
      } else {
        const td = document.createElement("td");
        td.textContent = element[key];
        td.setAttribute("data-column-index", index % element.length);

        tr.appendChild(td);
      }
    }
    tBody.appendChild(tr);
  });

  return tBody;
};
