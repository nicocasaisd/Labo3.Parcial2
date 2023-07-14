import { actualizarTabla } from "./tabla.js";
import { URL } from "./config.js";
import { MostrarSpinner, OcultarSpinner } from "./spinner.js";

const contenedor = document.getElementById("tabla");

export function handlerRead() {
  MostrarSpinner();
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        OcultarSpinner();
        actualizarTabla(data);
      } else {
        console.error(`Error: ${xhr.status}- ${xhr.statusText}`);
      }
    }
  });

  xhr.open("GET", URL);
  xhr.send();
}

export function handlerCreate(nuevoElemento) {
  console.log("En handler create");
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const msg = JSON.parse(xhr.responseText);
        console.log(msg);
      } else {
        console.error(`Error: ${xhr.status}- ${xhr.statusText}`);
      }
    }
  });

  xhr.open("POST", URL);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(nuevoElemento)); // acá adentro va el body
}

export function handlerUpdate(editElemento) {
  console.log("En handler update");
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const msg = JSON.parse(xhr.responseText);
        console.log(msg);
      } else {
        console.error(`Error: ${xhr.status}- ${xhr.statusText}`);
      }
    }
  });

  xhr.open("PUT", URL + "/" + editElemento.id);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(editElemento)); // acá adentro va el body
}

export function handlerDelete(id) {
  console.log("En handler delete");
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const msg = JSON.parse(xhr.responseText);
        console.log(msg);
      } else {
        console.error(`Error: ${xhr.status}- ${xhr.statusText}`);
      }
    }
  });

  xhr.open("DELETE", URL + "/" + id);
  xhr.send();
}

export function actualizarStorage(clave, data) {
  localStorage.setItem(clave, JSON.stringify(data));
}
