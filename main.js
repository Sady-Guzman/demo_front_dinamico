import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://cpmygciraogszswfzsiq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwbXlnY2lyYW9nc3pzd2Z6c2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjU3ODQsImV4cCI6MjA3ODgwMTc4NH0.Nr2sCPc6-pLUJTJFputQMRy2CFvx0EicYbBvtpjNvaQ";
export const supabase = createClient(supabaseUrl, supabaseKey);

// Cargar solo CEC
export async function loadCEC() {
  const { data, error } = await supabase
    .from("personas")
    .select("*")
    .eq("cec", true);

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("person-list");
  if (!container) return;
  container.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>${p.nombre} ${p.apellido}</h2>
      <p>${p.cargo}</p>
      <p>${p.mail}</p>
      <hr>
    `;
    container.appendChild(div);
  });
}
