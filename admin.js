import { supabase } from "./main.js";

// Cargar todas las personas
async function loadAll() {
  const { data, error } = await supabase
    .from("personas")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("admin-list");
  container.innerHTML = "";

  data.forEach(p => {
    const item = document.createElement("div");
    item.innerHTML = `
      <strong>${p.nombre} ${p.apellido}</strong> — ${p.cargo}
      <br>${p.mail}
      <br>CEC: ${p.cec ? "Sí" : "No"}
      <hr>
    `;
    container.appendChild(item);
  });
}

// Agregar persona nueva
async function addPerson() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const mail = document.getElementById("mail").value;
  const cargo = document.getElementById("cargo").value;
  const cec = document.getElementById("cec").checked;

  const { error } = await supabase
    .from("personas")
    .insert([{ nombre, apellido, mail, cargo, cec }]);

  if (error) {
    alert("Error al agregar");
    console.error(error);
    return;
  }

  loadAll();
}

document.getElementById("add-btn").addEventListener("click", addPerson);

loadAll();
