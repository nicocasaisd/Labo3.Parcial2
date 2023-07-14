import { actualizarStorage } from "./manejadores.js";

const armas_const = [
  "Armadura",
  "Espada",
  "Martillo",
  "Escudo",
  "Arma de fuego",
  "Flechas",
];
actualizarStorage("armas", armas_const);

const $lista = document.getElementById("select-arma");
const armas = JSON.parse(localStorage.getItem("armas")) || [];

armas.forEach((el, index) => {
  // console.log(el);
  let option = document.createElement("option");
  option.textContent = el;
  option.value = index + 1;
  $lista.appendChild(option);
});

export {armas};