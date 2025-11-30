import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://cpmygciraogszswfzsiq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwbXlnY2lyYW9nc3pzd2Z6c2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjU3ODQsImV4cCI6MjA3ODgwMTc4NH0.Nr2sCPc6-pLUJTJFputQMRy2CFvx0EicYbBvtpjNvaQ";
export const supabase = createClient(supabaseUrl, supabaseKey);


async function enviarFormulario() {
  const data = {
    nombre_completo: document.getElementById('nombre').value,
    nivel_estudiante: document.getElementById('nivel').value,
    url_video: document.getElementById('url').value
  };

  const res = await fetch('/api/guardar-video', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const json = await res.json();

  if (json.ok) {
    alert("Video guardado!");
  } else {
    alert("Error: " + json.error);
  }
}
