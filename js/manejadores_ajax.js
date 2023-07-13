import { actualizarTabla } from "./tabla.js";

const URL = "http://localhost:3000/superheroes";
const $spinner = document.getElementById("spinner");

export function handlerRead(url) {

  // Spinner
  
  // $spinner.hidden = false;
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
      // $spinner.hidden = true;
    } else {
      console.error(`Error: ${xhr.status}- ${xhr.statusText}`);
    }
  });

  xhr.open("GET", url);
  xhr.send();
}

export function handlerCreate(array, nuevoElemento, contenedor) {
  array.push(nuevoElemento);
  actualizarStorage("array", array);
  actualizarTabla(contenedor, array);
}
export function handlerUpdate(array, editElemento, contenedor) {
  let index = array.findIndex((el) => el.id == editElemento.id);

  array.splice(index, 1, editElemento);

  actualizarStorage("array", array);
  actualizarTabla(contenedor, array);
}

export function handlerDelete(id, array, contenedor) {
  // console.log("id",id);
  let index = array.findIndex((el) => el.id == id);
  //   console.log("index",index);
  if (index > -1) {
    array.splice(index, 1);
    actualizarStorage("array", array);
    actualizarTabla(contenedor, array);
  }
}

export function actualizarStorage(clave, data) {
  localStorage.setItem(clave, JSON.stringify(data));
}
