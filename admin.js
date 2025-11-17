import { supabase } from "./main.js";

/* ============================
      CARGAR TODAS LAS PERSONAS
   ============================ */
async function loadAll() {
  const { data, error } = await supabase
    .from("personas")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  renderList(data);
}

/* ============================
        RENDERIZAR LISTA
   ============================ */
function renderList(data) {
  const container = document.getElementById("admin-list");
  container.innerHTML = "";

  data.forEach(p => {
    const item = document.createElement("div");
    const cargoVisible = p.cec ? "block" : "none";

    item.innerHTML = `
      <div style="border:1px solid #ccc; padding: 12px; border-radius: 8px; margin-bottom: 10px;">
        <strong>${p.nombre} ${p.apellido}</strong>
        <br>
        <label>Correo:</label>
        <p>${p.mail}</p>
        <br>

        <label>
          <input type="checkbox" id="cec-${p.id}" ${p.cec ? "checked" : ""}>
          ¿Miembro del CEC?
        </label>

        <br><br>

        <div id="cargo-field-${p.id}" style="display: ${cargoVisible}">
          <label>Cargo:</label>
          <input id="cargo-${p.id}" value="${p.cargo || ""}">
        </div>

        <br>
        <button id="update-${p.id}">Actualizar</button>
      </div>
    `;

    container.appendChild(item);

    // Mostrar/ocultar cargo dinámicamente
    const cecCheckbox = document.getElementById(`cec-${p.id}`);
    cecCheckbox.addEventListener("change", () => {
      const show = cecCheckbox.checked ? "block" : "none";
      document.getElementById(`cargo-field-${p.id}`).style.display = show;
    });

    // Botón actualizar
    document.getElementById(`update-${p.id}`).addEventListener("click", () => {
      updatePerson(p.id);
    });
  });
}

/* ============================
        ACTUALIZAR PERSONA
   ============================ */
async function updatePerson(id) {
  const cec = document.getElementById(`cec-${id}`).checked;
  const cargo = cec ? document.getElementById(`cargo-${id}`).value : null;

  const { error } = await supabase
    .from("personas")
    .update({
      cec,
      cargo
    })
    .eq("id", id);

  if (error) {
    alert("Error al actualizar");
    console.error(error);
    return;
  }

  alert("Persona actualizada");
  loadAll();
}

/* ============================
        AGREGAR PERSONA
   ============================ */
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

/* ============================
            FILTROS
   ============================ */
async function applyFilters() {
  const filtroNombre = document.getElementById("filtro-nombre").value.toLowerCase();
  const filtroCec = document.getElementById("filtro-cec").value;

  const { data, error } = await supabase
    .from("personas")
    .select("*");

  if (error) {
    console.error("Error cargando datos:", error);
    return;
  }

  let filtrados = data;

  // 🔍 FILTRAR POR NOMBRE
  if (filtroNombre.trim() !== "") {
    filtrados = filtrados.filter(p =>
      (p.nombre + " " + p.apellido).toLowerCase().includes(filtroNombre)
    );
  }

  // 🔍 FILTRAR POR CEC
  if (filtroCec === "true") {
    filtrados = filtrados.filter(p => p.cec === true);
  } else if (filtroCec === "false") {
    filtrados = filtrados.filter(p => p.cec === false);
  }

  renderList(filtrados);
}

/* ============================
         EVENT LISTENERS
   ============================ */

// Agregar persona
document.getElementById("add-btn").addEventListener("click", addPerson);

// Filtros
document.getElementById("btn-filtrar").addEventListener("click", applyFilters);

// Cargar datos iniciales
loadAll();
