async function subir() {
  const payload = {
    nombre_completo: document.getElementById("nombre").value,
    nivel_estudiante: document.getElementById("nivel").value,
    url_video: document.getElementById("video_url").value
  };

  console.log("Enviando payload:", payload);

  const res = await fetch('/api/subir-video', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const json = await res.json();
  console.log("Respuesta del servidor:", json);

  if (json.ok) {
    alert("Video subido correctamente");
  } else {
    alert("Error: " + json.msg);
  }
}
