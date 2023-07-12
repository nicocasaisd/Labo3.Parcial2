export const crearTabla = (data) => {
  if (!Array.isArray(data)) return null;

  const tabla = document.createElement("table");

  tabla.appendChild(crearCabecera(data[0]));
  tabla.appendChild(crearCuerpo(data));

  indexarColumnas(tabla, Object.keys(data[0]).length-1);
  return tabla;
};

function indexarColumnas(tabla, numColumns){
  const cells = [...tabla.querySelectorAll('th, td')];
  cells.forEach((cell,index)=>{
    cell.setAttribute('data-column-index', index % numColumns);
  })
  console.log(cells);
}

export function actualizarTabla(contenedor, data) {
  // Elimino todos los nodos hijos del contenedor
  while (contenedor.firstElementChild) {
    contenedor.removeChild(contenedor.firstElementChild);
  }
  // Agregar la data
  document.getElementById("spinner").hidden = false;
  setTimeout(() => {
    console.log("Delay 2000ms");
    contenedor.appendChild(crearTabla(data));
    document.getElementById("spinner").hidden = true;
    dispatchEvent(new Event("actualizar"));
  }, 2000);
}

const crearCabecera = (elemento) => {
  const tHead = document.createElement("thead"),
    headRow = document.createElement("tr");
  headRow.style.setProperty("background-color", "#6D3B47");

  for (const key in elemento) {
    let heading = key;

    switch (key) {
      case "id":
        continue;
        break;
      /*       case "numBanios":
        heading = "Cantidad de Baños";
        break;
         */
      default:
        break;
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
        td.setAttribute('data-column-index', index % element.length);

        tr.appendChild(td);
      }
    }
    tBody.appendChild(tr);
  });

  return tBody;
};

export const crearCheckColumnas = (elemento) => {
  // const tHead = document.createElement("thead"),
  //   headRow = document.createElement("tr");
  // headRow.style.setProperty("background-color", "#6D3B47");
  const div = document.createElement("div");
  div.classList.add('row');

  for (const key in elemento) {
    if (key == "id") {
      continue;
    }
    let checkDiv = document.createElement('div');
    checkDiv.classList.add('form-check');
    checkDiv.classList.add('text-capitalize');
    checkDiv.classList.add('col');
    // let heading = key;
    let check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.setAttribute('checked', true);
    check.setAttribute('id', 'chk' + key);
    check.setAttribute('value', key);
    check.classList.add('form-check-input');
    

    // Label
    let lbl = document.createElement('label');
    lbl.setAttribute('for', 'chk' + key);
    lbl.innerHTML = key;
    lbl.classList.add('form-check-label');

    checkDiv.appendChild(check);
    checkDiv.appendChild(lbl);

    div.appendChild(checkDiv);
    // const th = document.createElement("th");
    // th.textContent = heading;
    // headRow.appendChild(th);
  }

  // tHead.appendChild(headRow);

  return div;
};
