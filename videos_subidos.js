async function cargarVideos() {
  const res = await fetch("/api/listar-videos");
  const json = await res.json();

  const contenedor = document.getElementById("lista-videos");

  if (!json.ok) {
    contenedor.innerHTML = "<p>Error al cargar videos.</p>";
    return;
  }

  const videos = json.data;

  if (videos.length === 0) {
    contenedor.innerHTML = "<p>No hay videos aún.</p>";
    return;
  }

  contenedor.innerHTML = videos
    .map(v => {
      return `
        <div class="video-card">
          <h3>${v.nombre_completo}</h3>
          <p>Nivel: ${v.nivel_estudiante}</p>
          <iframe width="420" height="236" src="${v.url_video}" frameborder="0" allowfullscreen></iframe>
        </div>
        <hr />
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", cargarVideos);
