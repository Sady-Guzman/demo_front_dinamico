// create the client directly in JS
const supabase = supabase_js.createClient(
  "https://YOUR_PROJECT_ID.supabase.co",
  "YOUR_PUBLIC_ANON_KEY"
);

async function loadPeople() {
  const container = document.getElementById("people-container");
  container.innerHTML = "Loading...";

  const { data, error } = await supabase
    .from("student_center")
    .select("name, role, email");

  if (error) {
    container.innerHTML = `<p style="color:red;">${error.message}</p>`;
    return;
  }

  container.innerHTML = "";

  data.forEach(person => {
    const div = document.createElement("div");
    div.className = "person-card";
    div.innerHTML = `
      <h1>${person.role}</h1>
      <h2>${person.name}</h2>
      <h3>${person.email}</h3>
    `;
    container.appendChild(div);
  });
}

loadPeople();
