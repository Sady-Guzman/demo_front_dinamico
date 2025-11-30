async function cargar() {
  const cont = document.getElementById("lista");
  cont.innerHTML = "Cargando...";

  try {
    const res = await fetch("/api/listar-videos");
    if (!res.ok) {
      cont.innerHTML = "Error cargando videos: " + res.status;
      const txt = await res.text();
      console.error("API response:", txt);
      return;
    }

    const json = await res.json();
    if (!json.ok) {
      cont.innerHTML = "Error: " + (json.msg || "sin datos");
      console.error("API error:", json);
      return;
    }

    const videos = json.data;
    if (!Array.isArray(videos) || videos.length === 0) {
      cont.innerHTML = "<p>No hay videos aún.</p>";
      return;
    }

    cont.innerHTML = videos.map(v => `
      <div style="margin-bottom:24px;">
        <h3>${escapeHtml(v.nombre_completo)} — ${escapeHtml(v.nivel_estudiante)}</h3>
        <iframe width="560" height="315" src="${escapeHtml(v.url_video)}" frameborder="0" allowfullscreen></iframe>
      </div>
    `).join("");
  } catch (e) {
    console.error(e);
    cont.innerHTML = "Error cargando videos (ver consola).";
  }
}

function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

document.addEventListener("DOMContentLoaded", cargar);
