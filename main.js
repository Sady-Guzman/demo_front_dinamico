// create the client directly in JS
const supabase = supabase_js.createClient(
  "https://cpmygciraogszswfzsiq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwbXlnY2lyYW9nc3pzd2Z6c2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjU3ODQsImV4cCI6MjA3ODgwMTc4NH0.Nr2sCPc6-pLUJTJFputQMRy2CFvx0EicYbBvtpjNvaQ"
);

async function loadPeople() {
  const container = document.getElementById("people-container");
  container.innerHTML = "Cargando datos...";

  // Consulta filtrando solo donde cec == true
  const { data, error } = await supabase
    .from("personas")
    .select("nombre, apellido, cargo, mail, cec")
    .eq("cec", true);

  if (error) {
    container.innerHTML = `<p style="color:red;">${error.message}</p>`;
    return;
  }

  container.innerHTML = "";

  data.forEach(persona => {
    const div = document.createElement("div");
    div.className = "person-card";

    div.innerHTML = `
      <h1>${persona.cargo}</h1>
      <h2>${persona.nombre} ${persona.apellido}</h2>
      <h3>${persona.mail}</h3>
    `;

    container.appendChild(div);
  });
}

loadPeople();
