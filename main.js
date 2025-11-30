document.getElementById("ver").addEventListener("click", () => {
  location.href = "/videos_subidos.html";
});

document.getElementById("guardar").addEventListener("click", async () => {
  const payload = {
    nombre_completo: document.getElementById("nombre").value.trim(),
    nivel_estudiante: document.getElementById("nivel").value.trim(),
    url_video: document.getElementById("video_url").value.trim()
  };

  console.log("Payload ->", payload);

  try {
    const res = await fetch("/api/subir-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const json = await res.json();
    console.log("Respuesta API:", json);

    if (res.ok && json.ok) {
      alert("Video guardado!");
      // limpiar form
      document.getElementById("nombre").value = "";
      document.getElementById("nivel").value = "";
      document.getElementById("video_url").value = "";
    } else {
      alert("Error: " + (json.msg || "ver consola"));
    }
  } catch (e) {
    console.error(e);
    alert("Error enviando datos (ver consola).");
  }
});
