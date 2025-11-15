const supabase = supabase_js.createClient(
  "https://cpmygciraogszswfzsiq.supabase.co",
  "TU_PUBLIC_ANON_KEY_AQUÍ"
);

// -----------------------
// CARGA DE DATOS
// -----------------------

async function cargarCEC() {
  const { data, error } = await supabase
    .from("personas")
    .select("*")
    .eq("cec", true);

  const cont = document.getElementById("lista-cec");
  cont.innerHTML = "";

  data?.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("person");
    div.textContent = `${p.nombre} — ${p.cargo}`;
    cont.appendChild(div);
  });
}

async function cargarTodas() {
  const { data, error } = await supabase
    .from("personas")
    .select("*");

  const cont = document.getElementById("lista-todas");
  cont.innerHTML = "";

  data?.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("person");

    div.innerHTML = `
      ${p.nombre} — ${p.cargo ?? "Sin cargo"}
      <br>
      <label>
        <input type="checkbox" class="toggleCEC" data-id="${p.id}" ${p.cec ? "checked" : ""}>
        CEC
      </label>
    `;

    cont.appendChild(div);
  });

  agregarEventosToggle();
}

// -----------------------
// AGREGAR PERSONA
// -----------------------

document.getElementById("btn-add").addEventListener("click", async () => {
  const nombre = document.getElementById("nombre").value;
  const cargo = document.getElementById("cargo").value;
  const esCec = document.getElementById("esCec").checked;

  if (!nombre) {
    alert("Debe ingresar un nombre");
    return;
  }

  const { error } = await supabase
    .from("personas")
    .insert({
      nombre,
      cargo: cargo || null,
      cec: esCec
    });

  if (error) {
    alert("Error al agregar");
    return;
  }

  document.getElementById("nombre").value = "";
  document.getElementById("cargo").value = "";
  document.getElementById("esCec").checked = false;

  cargarCEC();
  cargarTodas();
});

// -----------------------
// TOGGLE DE CEC
// -----------------------
function agregarEventosToggle() {
  const toggles = document.querySelectorAll(".toggleCEC");

  toggles.forEach(t => {
    t.addEventListener("change", async () => {
      const id = t.dataset.id;
      const nuevoValor = t.checked;

      await supabase
        .from("personas")
        .update({ cec: nuevoValor })
        .eq("id", id);

      cargarCEC();
    });
  });
}

// -----------------------
// SISTEMA DE PESTAÑAS
// -----------------------
document.getElementById("tab-cec").addEventListener("click", () => {
  activarPestaña("cec");
});
document.getElementById("tab-todas").addEventListener("click", () => {
  activarPestaña("todas");
});

function activarPestaña(nombre) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));

  document.getElementById(`tab-${nombre}`).classList.add("active");
  document.getElementById(`view-${nombre}`).classList.add("active");
}

// -----------------------
// INICIO
// -----------------------
cargarCEC();
cargarTodas();
