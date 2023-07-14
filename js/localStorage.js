
export function actualizarStorage(clave, data) {
  localStorage.setItem(clave, JSON.stringify(data));
}
