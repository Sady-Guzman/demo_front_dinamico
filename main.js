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
