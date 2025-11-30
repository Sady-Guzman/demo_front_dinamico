async function cargarVideos() {
  const res = await fetch('/api/listar-videos');
  const videos = await res.json();

  const contenedor = document.getElementById('lista');
  contenedor.innerHTML = "";

  videos.forEach(v => {
    const card = document.createElement("div");
    card.innerHTML = `
      <h3>${v.nombre_completo} — ${v.nivel_estudiante}</h3>
      <iframe width="560" height="315"
        src="${v.url_video}"
        allowfullscreen></iframe>
      <hr>
    `;
    contenedor.appendChild(card);
  });
}

cargarVideos();
